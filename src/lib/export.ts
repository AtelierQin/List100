"use client";

import type { Goal } from "./data";

/* ============================================================
 *  Export formats for List100 goals.
 *  Pure, side-effect-free string generators + one client-side
 *  download trigger. No server round-trip — works offline.
 * ============================================================ */

export type ExportFormat = "json" | "csv" | "md" | "ics";

/* ---------- shared envelope ---------- */

interface ExportEnvelope {
    version: 1;
    exportedAt: string;
    source: string;
    count: number;
    completed: number;
    goals: Goal[];
}

function envelope(goals: Goal[]): ExportEnvelope {
    return {
        version: 1,
        exportedAt: new Date().toISOString(),
        source: "FutureCast List100",
        count: goals.length,
        completed: goals.filter((g) => g.completed).length,
        goals,
    };
}

/* ============================================================
 *  JSON — full data, schema-versioned, re-importable.
 * ============================================================ */

export function toJSON(goals: Goal[]): string {
    return JSON.stringify(envelope(goals), null, 2);
}

/* ============================================================
 *  CSV — RFC 4180 escaping, CRLF line endings, header row.
 *  Tags joined with "|" so the column is one cell.
 *  Milestones / habits collapsed to "done/total" + summary text.
 * ============================================================ */

const CSV_COLUMNS = [
    "id",
    "text",
    "description",
    "tags",
    "status",
    "pinned",
    "createdAt",
    "completedAt",
    "notes",
    "milestoneCount",
    "milestoneProgress",
    "habitCount",
    "habitSummary",
] as const;

function csvEscape(value: string | number | boolean | null | undefined): string {
    if (value === null || value === undefined) return "";
    const s = String(value);
    if (/[",\r\n]/.test(s)) {
        return `"${s.replace(/"/g, '""')}"`;
    }
    return s;
}

export function toCSV(goals: Goal[]): string {
    const rows = goals.map((g) => {
        const milestoneCount = g.milestones?.length ?? 0;
        const milestoneDone = g.milestones?.filter((m) => m.completed).length ?? 0;
        const habitCount = g.habits?.length ?? 0;
        const habitSummary = (g.habits ?? [])
            .map((h) => `${h.frequency}:${h.title} (${h.completedDates.length}d)`)
            .join(" | ");

        return [
            csvEscape(g.id),
            csvEscape(g.text),
            csvEscape(g.description ?? ""),
            csvEscape((g.tags ?? []).join("|")),
            csvEscape(g.completed ? "completed" : "active"),
            csvEscape(g.pinned ? "true" : "false"),
            csvEscape(g.createdAt),
            csvEscape(g.completedAt ?? ""),
            csvEscape(g.notes ?? ""),
            csvEscape(milestoneCount),
            csvEscape(`${milestoneDone}/${milestoneCount}`),
            csvEscape(habitCount),
            csvEscape(habitSummary),
        ].join(",");
    });

    return [CSV_COLUMNS.join(","), ...rows].join("\r\n") + "\r\n";
}

/* ============================================================
 *  Markdown — Obsidian-friendly, YAML frontmatter, grouped by
 *  Pinned / Active / Completed. Inline #tags, sub-bullets for
 *  milestones and habits.
 * ============================================================ */

function dateOnly(iso: string | null | undefined): string {
    if (!iso) return "";
    return iso.split("T")[0] ?? "";
}

function renderMarkdownGoal(g: Goal): string[] {
    const lines: string[] = [];
    const checkbox = g.completed ? "[x]" : "[ ]";
    const tags = g.tags?.length ? ` · ${g.tags.map((t) => `#${t}`).join(" ")}` : "";
    const completedSuffix = g.completed && g.completedAt
        ? ` · ✓ ${dateOnly(g.completedAt)}`
        : "";
    const createdSuffix = g.createdAt ? ` · added ${dateOnly(g.createdAt)}` : "";

    lines.push(`- ${checkbox} **${g.text}**${tags}${completedSuffix}${createdSuffix}`);

    if (g.description) {
        lines.push(`  - ${g.description}`);
    }
    if (g.notes) {
        for (const noteLine of g.notes.split(/\r?\n/)) {
            lines.push(`  - > ${noteLine}`);
        }
    }
    if (g.milestones && g.milestones.length > 0) {
        const done = g.milestones.filter((m) => m.completed).length;
        lines.push(`  - Milestones: ${done}/${g.milestones.length}`);
        for (const m of g.milestones) {
            lines.push(`    - ${m.completed ? "[x]" : "[ ]"} ${m.text}`);
        }
    }
    if (g.habits && g.habits.length > 0) {
        for (const h of g.habits) {
            lines.push(
                `  - Habit: ${h.title} (${h.frequency}, ${h.completedDates.length}d logged)`
            );
        }
    }
    return lines;
}

export function toMarkdown(goals: Goal[]): string {
    const dateStr = dateOnly(new Date().toISOString());
    const env = envelope(goals);
    const allTags = Array.from(new Set(goals.flatMap((g) => g.tags ?? []))).sort();

    const pinned = goals.filter((g) => g.pinned && !g.completed);
    const active = goals.filter((g) => !g.completed && !g.pinned);
    const completed = goals.filter((g) => g.completed);

    const out: string[] = [];

    // YAML frontmatter
    out.push("---");
    out.push("source: FutureCast List100");
    out.push(`exported: ${dateStr}`);
    out.push(`total: ${env.count}`);
    out.push(`completed: ${env.completed}`);
    if (allTags.length > 0) {
        out.push(`tags: [${allTags.join(", ")}]`);
    }
    out.push("---");
    out.push("");

    // Title + motto
    out.push("# FutureCast · List100");
    out.push("");
    out.push(`> 100 things I want to do before I die. Exported ${dateStr}.`);
    out.push("");

    const section = (title: string, items: Goal[]) => {
        if (items.length === 0) return;
        out.push(`## ${title} (${items.length})`);
        out.push("");
        for (const g of items) out.push(...renderMarkdownGoal(g));
        out.push("");
    };

    section("Pinned", pinned);
    section("Active", active);
    section("Completed", completed);

    return out.join("\n");
}

/* ============================================================
 *  iCalendar (VTODO) — the universal task format. CRLF line
 *  endings, line folding at 75 octets, RFC 5545 escaping.
 *  Most task managers (Apple Reminders, Things, Todoist,
 *  Google Tasks) accept this on import.
 * ============================================================ */

function icsDate(iso: string | null | undefined): string {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    // YYYYMMDDTHHMMSSZ
    return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function icsEscape(text: string): string {
    return text
        .replace(/\\/g, "\\\\")
        .replace(/;/g, "\\;")
        .replace(/,/g, "\\,")
        .replace(/\r?\n/g, "\\n");
}

function icsFold(line: string): string {
    // RFC 5545 §3.1: lines must be ≤ 75 octets; fold with CRLF + space.
    if (line.length <= 75) return line;
    const chunks: string[] = [line.slice(0, 75)];
    let rest = line.slice(75);
    while (rest.length > 0) {
        chunks.push(" " + rest.slice(0, 74));
        rest = rest.slice(74);
    }
    return chunks.join("\r\n");
}

export function toICS(goals: Goal[]): string {
    const out: string[] = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//FutureCast//List100 1.0//EN",
        "CALSCALE:GREGORIAN",
        "METHOD:PUBLISH",
        "X-WR-CALNAME:FutureCast List100",
        "X-WR-TIMEZONE:UTC",
    ];

    const nowStamp = icsDate(new Date().toISOString());

    for (const g of goals) {
        const descParts: string[] = [];
        if (g.description) descParts.push(g.description);
        if (g.notes) descParts.push(`Notes: ${g.notes}`);
        if (g.milestones && g.milestones.length > 0) {
            const done = g.milestones.filter((m) => m.completed).length;
            descParts.push(`Milestones (${done}/${g.milestones.length}):`);
            for (const m of g.milestones) {
                descParts.push(`  ${m.completed ? "[x]" : "[ ]"} ${m.text}`);
            }
        }
        if (g.habits && g.habits.length > 0) {
            descParts.push("Habits:");
            for (const h of g.habits) {
                descParts.push(
                    `  ${h.title} (${h.frequency}, ${h.completedDates.length}d logged)`
                );
            }
        }

        const lines: string[] = [
            "BEGIN:VTODO",
            `UID:${g.id}@futurecast.list100`,
            `DTSTAMP:${nowStamp}`,
            `CREATED:${icsDate(g.createdAt)}`,
            `SUMMARY:${icsEscape(g.text)}`,
        ];

        if (descParts.length > 0) {
            lines.push(`DESCRIPTION:${icsEscape(descParts.join("\n"))}`);
        }

        if (g.tags && g.tags.length > 0) {
            lines.push(`CATEGORIES:${g.tags.map(icsEscape).join(",")}`);
        }

        lines.push(`STATUS:${g.completed ? "COMPLETED" : "NEEDS-ACTION"}`);

        if (g.pinned) {
            lines.push("PRIORITY:1");
        }

        if (g.completed && g.completedAt) {
            lines.push(`COMPLETED:${icsDate(g.completedAt)}`);
        }

        lines.push("END:VTODO");

        for (const line of lines) {
            out.push(icsFold(line));
        }
    }

    out.push("END:VCALENDAR");
    return out.join("\r\n") + "\r\n";
}

/* ============================================================
 *  Format metadata for the UI.
 * ============================================================ */

export const EXPORT_FORMATS: ReadonlyArray<{
    format: ExportFormat;
    label: string;
    description: string;
    mime: string;
    extension: string;
}> = [
    { format: "json", label: "JSON",  description: "Full data · re-importable", mime: "application/json",  extension: "json" },
    { format: "csv",  label: "CSV",   description: "Spreadsheet-ready",          mime: "text/csv",           extension: "csv"  },
    { format: "md",   label: "MD",    description: "Obsidian · Notion · Bear",  mime: "text/markdown",      extension: "md"   },
    { format: "ics",  label: "ICS",   description: "Reminders · Things · Todoist", mime: "text/calendar",   extension: "ics"  },
] as const;

/* ============================================================
 *  Format dispatch + browser download.
 * ============================================================ */

export function generateExport(goals: Goal[], format: ExportFormat): string {
    switch (format) {
        case "json": return toJSON(goals);
        case "csv":  return toCSV(goals);
        case "md":   return toMarkdown(goals);
        case "ics":  return toICS(goals);
    }
}

export function downloadExport(goals: Goal[], format: ExportFormat): { filename: string; size: number } {
    const meta = EXPORT_FORMATS.find((f) => f.format === format);
    if (!meta) throw new Error(`Unknown export format: ${format}`);

    const content = generateExport(goals, format);
    const blob = new Blob([content], { type: `${meta.mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const dateStr = dateOnly(new Date().toISOString());
    const filename = `list100-${dateStr}.${meta.extension}`;

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    // Revoke after the click has been processed by the browser.
    setTimeout(() => URL.revokeObjectURL(url), 0);

    return { filename, size: blob.size };
}
