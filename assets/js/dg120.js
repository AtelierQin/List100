// DG 120 - Deutsche Grammophon 120th Anniversary Edition
// Source: docs/DG 120 The Anniversary Edition.md
// 121 CDs covering the history of Deutsche Grammophon

const dg120Albums = [
    // CD 1-4: Early Orchestral Recordings
    { disc: 1, title: "Early Orchestral Recordings 1 (1913-1920)", artists: "Various", period: "1913-1920", category: ["Early Recordings", "Symphony"], composers: ["Beethoven", "Berlioz", "Wagner"], format: "MONO" },
    { disc: 2, title: "Early Orchestral Recordings 2 (1924-1928)", artists: "Various", period: "1924-1928", category: ["Early Recordings", "Symphony"], composers: ["Various"], format: "MONO" },
    { disc: 3, title: "Early Orchestral Recordings 3 (1928-1935)", artists: "Various", period: "1928-1935", category: ["Early Recordings", "Symphony"], composers: ["Bruckner", "Beethoven", "Bach", "Wagner", "Schumann", "Pfitzner", "Weber"], format: "MONO" },
    { disc: 4, title: "Early Orchestral Recordings 4 (1931-1943)", artists: "Various", period: "1931-1943", category: ["Early Recordings", "Symphony"], composers: ["Brahms", "Nicolai", "Smetana", "J. Strauss", "Haydn", "Mussorgsky", "Respighi", "R. Strauss", "Poot"], format: "MONO" },

    // CD 5-27: Symphonic Works
    { disc: 5, title: "Schubert: Symphony No. 9 / Haydn: Symphony No. 88", artists: "Wilhelm Furtwängler, Berliner Philharmoniker", period: "1951", category: ["Symphony", "Classical", "Romantic"], composers: ["Schubert", "Haydn"], format: "MONO" },
    { disc: 6, title: "Bruckner: Symphony No. 9", artists: "Eugen Jochum, Symphonie-Orchester Des Bayerischen Rundfunks", period: "1954", category: ["Symphony", "Romantic"], composers: ["Bruckner"], format: "MONO" },
    { disc: 7, title: "Dvořák: Symphony No. 9 'From The New World' / Smetana: The Moldau / Liszt: Les Préludes", artists: "Ferenc Fricsay, Berliner Philharmoniker", period: "1959-1960", category: ["Symphony", "Romantic"], composers: ["Dvořák", "Smetana", "Liszt"], format: "ADD" },
    { disc: 8, title: "Tchaikovsky: Symphony No. 6 'Pathétique'", artists: "Evgeny Mravinsky, Leningrad Philharmonic", period: "1960", category: ["Symphony", "Romantic"], composers: ["Tchaikovsky"], format: "ADD" },
    { disc: 9, title: "Mozart: Symphonies Nos. 39, 40, 41 'Jupiter'", artists: "Karl Böhm, Berliner Philharmoniker", period: "1961-1966", category: ["Symphony", "Classical"], composers: ["Mozart"], format: "ADD" },
    { disc: 10, title: "Berlioz: Symphonie Fantastique / Cherubini & Auber: Overtures", artists: "Igor Markevitch, Orchestre Des Concerts Lamoureux", period: "1961", category: ["Symphony", "Romantic"], composers: ["Berlioz", "Cherubini", "Auber"], format: "ADD" },
    { disc: 11, title: "Beethoven: Symphony No. 9 / Coriolan Overture", artists: "Herbert von Karajan, Berliner Philharmoniker", period: "1962-1965", category: ["Symphony", "Classical"], composers: ["Beethoven"], format: "ADD" },
    { disc: 12, title: "Mahler: Symphony No. 1 'Titan' / Lieder eines fahrenden Gesellen", artists: "Rafael Kubelik, Dietrich Fischer-Dieskau, Symphonie-Orchester Des Bayerischen Rundfunks", period: "1967-1968", category: ["Symphony", "Romantic"], composers: ["Mahler"], format: "ADD" },
    { disc: 13, title: "Holst: The Planets / Strauss: Also Sprach Zarathustra", artists: "William Steinberg, Boston Symphony Orchestra", period: "1970-1971", category: ["Symphony", "Modern"], composers: ["Holst", "R. Strauss"], format: "ADD" },
    { disc: 14, title: "Beethoven: Symphonies Nos. 5 & 7", artists: "Carlos Kleiber, Wiener Philharmoniker", period: "1974-1976", category: ["Symphony", "Classical"], composers: ["Beethoven"], format: "ADD" },
    { disc: 15, title: "Saint-Saëns: Symphony No. 3 'Organ' / Danse Macabre / Bacchanale / Le Déluge", artists: "Daniel Barenboim, Chicago Symphony Orchestra, Orchestre De Paris", period: "1975-1980", category: ["Symphony", "Romantic"], composers: ["Saint-Saëns"], format: "ADD" },
    { disc: 16, title: "Debussy: La Mer / Ravel: Rapsodie Espagnole, Ma Mère L'Oye", artists: "Carlo Maria Giulini, Los Angeles Philharmonic", period: "1979", category: ["Symphony", "Modern"], composers: ["Debussy", "Ravel"], format: "ADD" },
    { disc: 17, title: "Richard Strauss: Eine Alpensinfonie", artists: "Herbert von Karajan, Berliner Philharmoniker", period: "1980", category: ["Symphony", "Romantic"], composers: ["R. Strauss"], format: "DDD" },
    { disc: 18, title: "Mahler: Symphony No. 5", artists: "Leonard Bernstein, Wiener Philharmoniker", period: "1987", category: ["Symphony", "Romantic"], composers: ["Mahler"], format: "DDD" },
    { disc: 19, title: "Copland: Appalachian Spring / Short Symphony / 3 Latin American Sketches / Quiet City", artists: "Orpheus Chamber Orchestra", period: "1988", category: ["Symphony", "Modern"], composers: ["Copland"], format: "DDD" },
    { disc: 20, title: "Messiaen: Turangalîla-Symphonie", artists: "Myung-Whun Chung, Yvonne Loriod, Jeanne Loriod, Orchestre De L'Opéra Bastille", period: "1990", category: ["Symphony", "Modern"], composers: ["Messiaen"], format: "DDD" },
    { disc: 21, title: "Stravinsky: Pétrouchka / Le Sacre Du Printemps", artists: "Pierre Boulez, The Cleveland Orchestra", period: "1991", category: ["Symphony", "Modern"], composers: ["Stravinsky"], format: "DDD" },
    { disc: 22, title: "Franck: Symphony / Poulenc: Organ Concerto", artists: "Seiji Ozawa, Simon Preston, Boston Symphony Orchestra", period: "1991", category: ["Symphony", "Romantic"], composers: ["Franck", "Poulenc"], format: "DDD" },
    { disc: 23, title: "Wagner: Orchestral Music - Tannhäuser, Parsifal, Tristan Und Isolde", artists: "Claudio Abbado, Berliner Philharmoniker", period: "2000-2002", category: ["Symphony", "Romantic", "Opera"], composers: ["Wagner"], format: "DDD" },
    { disc: 24, title: "German Overtures", artists: "Christian Thielemann, Wiener Philharmoniker", period: "2002", category: ["Symphony", "Romantic"], composers: ["Various"], format: "DDD" },
    { disc: 25, title: "Mussorgsky: Pictures At An Exhibition", artists: "Gustavo Dudamel, Wiener Philharmoniker", period: "2016", category: ["Symphony", "Romantic"], composers: ["Mussorgsky"], format: "DDD" },
    { disc: 26, title: "Mendelssohn: Symphonies 4 'Italian' & 5 'Reformation'", artists: "Yannick Nézet-Séguin, The Chamber Orchestra Of Europe", period: "2016", category: ["Symphony", "Romantic"], composers: ["Mendelssohn"], format: "DDD" },
    { disc: 27, title: "Bruckner: Symphony No. 4 / Wagner: Lohengrin Prelude", artists: "Andris Nelsons, Gewandhausorchester Leipzig", period: "2017", category: ["Symphony", "Romantic"], composers: ["Bruckner", "Wagner"], format: "DDD" },

    // CD 28-49: Concertos
    { disc: 28, title: "Early Concerto Recordings (1928-1943)", artists: "Various", period: "1928-1943", category: ["Early Recordings", "Concerto"], composers: ["Chopin", "Brahms", "Schumann", "Bruch", "Sibelius", "Stravinsky", "Mozart"], format: "MONO" },
    { disc: 29, title: "Sviatoslav Richter: Rachmaninov Piano Concerto No. 2 / Tchaikovsky Piano Concerto No. 1", artists: "Sviatoslav Richter, Herbert von Karajan", period: "1959-1962", category: ["Concerto", "Piano", "Romantic"], composers: ["Rachmaninov", "Tchaikovsky"], format: "ADD" },
    { disc: 30, title: "Pierre Fournier: Saint-Saëns Cello Concerto No. 1 / Lalo Cello Concerto / Bruch Kol Nidrei / Bloch Schelomo", artists: "Pierre Fournier, Jean Martinon, Alfred Wallenstein", period: "1960-1966", category: ["Concerto", "Cello", "Romantic"], composers: ["Saint-Saëns", "Lalo", "Bruch", "Bloch"], format: "ADD" },
    { disc: 31, title: "Bach: Violin Concertos BWV 1041-1043 / Beethoven: Violin Romances", artists: "David Oistrakh, Igor Oistrakh", period: "1961-1962", category: ["Concerto", "Violin", "Baroque", "Classical"], composers: ["Bach", "Beethoven"], format: "ADD" },
    { disc: 32, title: "Mozart: Violin Concerto No. 1 / Adagio K.261 / Rondo K.269 / K.373", artists: "Wolfgang Schneiderhan, Berliner Philharmoniker", period: "1967", category: ["Concerto", "Violin", "Classical"], composers: ["Mozart"], format: "ADD" },
    { disc: 33, title: "Mendelssohn & Tchaikovsky: Violin Concertos", artists: "Nathan Milstein, Claudio Abbado, Wiener Philharmoniker", period: "1972-1973", category: ["Concerto", "Violin", "Romantic"], composers: ["Mendelssohn", "Tchaikovsky"], format: "ADD" },
    { disc: 34, title: "Mozart: Piano Concertos Nos. 20 & 21", artists: "Friedrich Gulda, Claudio Abbado, Wiener Philharmoniker", period: "1974", category: ["Concerto", "Piano", "Classical"], composers: ["Mozart"], format: "ADD" },
    { disc: 35, title: "Vivaldi / Tartini / Boccherini: Cello Concertos", artists: "Mstislav Rostropovich, Paul Sacher, Collegium Musicum Zürich", period: "1977", category: ["Concerto", "Cello", "Baroque"], composers: ["Vivaldi", "Tartini", "Boccherini"], format: "ADD" },
    { disc: 36, title: "Beethoven: Piano Concertos Nos. 1 & 3", artists: "Arturo Benedetti Michelangeli, Carlo Maria Giulini, Wiener Symphoniker", period: "1979", category: ["Concerto", "Piano", "Classical"], composers: ["Beethoven"], format: "ADD" },
    { disc: 37, title: "Brahms: Piano Concerto No. 1", artists: "Maurizio Pollini, Karl Böhm, Wiener Philharmoniker", period: "1979", category: ["Concerto", "Piano", "Romantic"], composers: ["Brahms"], format: "ADD" },
    { disc: 38, title: "Dvořák & Schumann: Cello Concertos", artists: "Mischa Maisky, Leonard Bernstein, Wiener Philharmoniker, Israel Philharmonic", period: "1985-1988", category: ["Concerto", "Cello", "Romantic"], composers: ["Dvořák", "Schumann"], format: "DDD" },
    { disc: 39, title: "Liszt: Piano Concertos Nos. 1 & 2 / Totentanz", artists: "Krystian Zimerman, Seiji Ozawa, Boston Symphony Orchestra", period: "1987", category: ["Concerto", "Piano", "Romantic"], composers: ["Liszt"], format: "DDD" },
    { disc: 40, title: "Mozart: Clarinet Concerto / Horn Concertos Nos. 1 & 4", artists: "Charles Neidich, David Jolley, Orpheus Chamber Orchestra", period: "1987", category: ["Concerto", "Clarinet", "Horn", "Classical"], composers: ["Mozart"], format: "DDD" },
    { disc: 41, title: "Prokofiev: Piano Concertos Nos. 1 & 3", artists: "Yevgeny Kissin, Claudio Abbado, Berliner Philharmoniker", period: "1993", category: ["Concerto", "Piano", "Modern"], composers: ["Prokofiev"], format: "DDD" },
    { disc: 42, title: "Martha Argerich: Shostakovich Piano Concerto No. 1 / Haydn Piano Concerto No. 11", artists: "Martha Argerich, Jörg Faerber, Württembergisches Kammerorchester", period: "1993", category: ["Concerto", "Piano", "Classical", "Modern"], composers: ["Shostakovich", "Haydn"], format: "DDD" },
    { disc: 43, title: "Anne-Sophie Mutter: Brahms Violin Concerto / Schumann Fantasie", artists: "Anne-Sophie Mutter, Kurt Masur, New York Philharmonic", period: "1997", category: ["Concerto", "Violin", "Romantic"], composers: ["Brahms", "Schumann"], format: "DDD" },
    { disc: 44, title: "Credo: Hélène Grimaud - Beethoven / Pärt / Corigliano", artists: "Hélène Grimaud, Esa-Pekka Salonen, Sveriges Radios Symfoniorkester", period: "2003", category: ["Concerto", "Piano", "Modern"], composers: ["Beethoven", "Pärt", "Corigliano"], format: "DDD" },
    { disc: 45, title: "Lisa Batiashvili: Echoes Of Time", artists: "Lisa Batiashvili, Esa-Pekka Salonen, Symphonie-Orchester Des Bayerischen Rundfunks", period: "2010", category: ["Concerto", "Violin", "Modern"], composers: ["Shostakovich", "Kancheli", "Pärt", "Rachmaninov"], format: "DDD" },
    { disc: 46, title: "Yuja Wang: Rachmaninov Piano Concerto No. 3 / Prokofiev Piano Concerto No. 2", artists: "Yuja Wang, Gustavo Dudamel, Simón Bolívar Symphony Orchestra", period: "2013", category: ["Concerto", "Piano", "Romantic", "Modern"], composers: ["Rachmaninov", "Prokofiev"], format: "DDD" },
    { disc: 47, title: "Hilary Hahn: Mozart Violin Concerto No. 5 / Vieuxtemps Violin Concerto No. 4", artists: "Hilary Hahn, Paavo Järvi, Deutsche Kammerphilharmonie Bremen", period: "2012-2013", category: ["Concerto", "Violin", "Classical", "Romantic"], composers: ["Mozart", "Vieuxtemps"], format: "DDD" },
    { disc: 48, title: "Albrecht Mayer: Lost And Found - Oboe Concertos", artists: "Albrecht Mayer, Kammerakademie Potsdam", period: "2013", category: ["Concerto", "Miscellaneous"], composers: ["Hoffmeister", "Lebrun", "Fiala", "Koželuh"], format: "DDD" },
    { disc: 49, title: "Chopin: Piano Concerto No. 1 / Ballades", artists: "Seong-Jin Cho, Gianandrea Noseda, London Symphony Orchestra", period: "2016", category: ["Concerto", "Piano", "Romantic"], composers: ["Chopin"], format: "DDD" },

    // CD 50-66: Solo Piano
    { disc: 50, title: "Early Piano Recordings (1907-1943)", artists: "Various", period: "1907-1943", category: ["Early Recordings", "Piano", "Sonata"], composers: ["Schubert", "Mozart", "Liszt", "Bach", "Chopin", "Schumann", "Moszkowski", "Strauss"], format: "MONO" },
    { disc: 51, title: "Monique Haas: Ravel, Debussy, Roussel, Bartók", artists: "Monique Haas", period: "1949-1955", category: ["Piano", "Modern"], composers: ["Ravel", "Debussy", "Roussel", "Bartók"], format: "MONO" },
    { disc: 52, title: "Elly Ney: Beethoven Sonatas (Pathétique, Op. 110, Moonlight, Appassionata)", artists: "Elly Ney", period: "1956", category: ["Piano", "Sonata", "Classical"], composers: ["Beethoven"], format: "MONO" },
    { disc: 53, title: "Wilhelm Kempff: Schubert Sonata D.664 / Moments Musicaux / Hüttenbrenner Variations", artists: "Wilhelm Kempff", period: "1967-1970", category: ["Piano", "Sonata", "Romantic"], composers: ["Schubert"], format: "ADD" },
    { disc: 54, title: "Arturo Benedetti Michelangeli: Debussy - Images I/II, Children's Corner", artists: "Arturo Benedetti Michelangeli", period: "1971", category: ["Piano", "Modern"], composers: ["Debussy"], format: "ADD" },
    { disc: 55, title: "Maurizio Pollini: Stravinsky Pétrouchka / Prokofiev Sonata No. 7 / Webern / Boulez", artists: "Maurizio Pollini", period: "1971-1976", category: ["Piano", "Modern"], composers: ["Stravinsky", "Prokofiev", "Webern", "Boulez"], format: "ADD" },
    { disc: 56, title: "Emil Gilels: Beethoven Sonatas (Tempest, Waldstein, Les Adieux)", artists: "Emil Gilels", period: "1972-1981", category: ["Piano", "Sonata", "Classical"], composers: ["Beethoven"], format: "ADD/DDD" },
    { disc: 57, title: "Daniel Barenboim: Brahms Variations for Piano", artists: "Daniel Barenboim", period: "1972", category: ["Piano", "Romantic"], composers: ["Brahms"], format: "ADD" },
    { disc: 58, title: "Kontarsky: Brahms Hungarian Dances / Waltzes Op. 39", artists: "Alfons & Aloys Kontarsky", period: "1976-1980", category: ["Piano", "Romantic"], composers: ["Brahms"], format: "ADD" },
    { disc: 59, title: "Martha Argerich: Chopin Sonatas Nos. 2 & 3 / Scherzo / Andante Spianato", artists: "Martha Argerich", period: "1960-1974", category: ["Piano", "Sonata", "Romantic"], composers: ["Chopin"], format: "ADD" },
    { disc: 60, title: "Ivo Pogorelich: Ravel Gaspard De La Nuit / Prokofiev Piano Sonata No. 6", artists: "Ivo Pogorelich", period: "1982", category: ["Piano", "Modern"], composers: ["Ravel", "Prokofiev"], format: "DDD" },
    { disc: 61, title: "Vladimir Horowitz: The Poet - Schubert Sonata D.960 / Schumann Kinderszenen", artists: "Vladimir Horowitz", period: "1986-1987", category: ["Piano", "Sonata", "Romantic"], composers: ["Schubert", "Schumann"], format: "DDD" },
    { disc: 62, title: "Maria-João Pires: Mozart Piano Sonatas K.331, K.457 / Fantasias K.397, K.475", artists: "Maria-João Pires", period: "1990", category: ["Piano", "Sonata", "Classical"], composers: ["Mozart"], format: "DDD" },
    { disc: 63, title: "Lang Lang: Live At Carnegie Hall", artists: "Lang Lang", period: "2003", category: ["Piano", "Miscellaneous"], composers: ["Chopin", "Haydn", "Schubert", "Tan Dun"], format: "DDD" },
    { disc: 64, title: "Daniil Trifonov: The Carnegie Recital", artists: "Daniil Trifonov", period: "2013", category: ["Piano", "Miscellaneous"], composers: ["Liszt", "Chopin", "Medtner", "Scriabin"], format: "DDD" },
    { disc: 65, title: "Murray Perahia: Bach The French Suites", artists: "Murray Perahia", period: "2013", category: ["Piano", "Baroque"], composers: ["Bach"], format: "DDD" },
    { disc: 66, title: "Grigory Sokolov: Schubert", artists: "Grigory Sokolov", period: "2013", category: ["Piano", "Romantic"], composers: ["Schubert"], format: "DDD" },

    // CD 67-77: Chamber Music
    { disc: 67, title: "Early Chamber Music Recordings (1911-1951)", artists: "Various", period: "1911-1951", category: ["Early Recordings", "String Quartet"], composers: ["Kreisler", "Hummel", "Hindemith", "Tartini", "Franck", "Dvořák", "Beethoven", "Sarasate", "Handel", "Debussy", "Paganini", "Szymanowski"], format: "MONO" },
    { disc: 68, title: "Schubert: Trout Quintet / String Quartet No. 14 'Death and the Maiden'", artists: "Adrian Aeschbacher, Koeckert-Quartett", period: "1950-1952", category: ["String Quartet", "Romantic"], composers: ["Schubert"], format: "MONO" },
    { disc: 69, title: "Haydn: Emperor Quartet / Mozart: Hunt Quartet", artists: "Amadeus-Quartett", period: "1963-1966", category: ["String Quartet", "Classical"], composers: ["Haydn", "Mozart"], format: "ADD" },
    { disc: 70, title: "Aurèle Nicolet: Flute Works", artists: "Aurèle Nicolet", period: "1969", category: ["Miscellaneous"], composers: ["Mozart", "Debussy", "Ibert", "Berio", "Fukushima", "Bach", "Schubert"], format: "ADD" },
    { disc: 71, title: "Brahms: String Quartets Nos. 1 & 3 / Haydn: Quartet Op. 76 No. 4 'Sunrise'", artists: "Melos Quartett", period: "1969-1972", category: ["String Quartet", "Romantic", "Classical"], composers: ["Brahms", "Haydn"], format: "ADD" },
    { disc: 72, title: "Schoenberg: Verklärte Nacht / String Trio", artists: "LaSalle Quartet", period: "1983", category: ["String Quartet", "Modern"], composers: ["Schoenberg"], format: "DDD" },
    { disc: 73, title: "Debussy / Ravel / Webern: String Quartets", artists: "Hagen Quartett", period: "1992-1993", category: ["String Quartet", "Modern"], composers: ["Debussy", "Ravel", "Webern"], format: "DDD" },
    { disc: 74, title: "Beethoven: String Quartets (Rasumovsky No. 3, Harp, Serioso)", artists: "Emerson String Quartet", period: "1994", category: ["String Quartet", "Classical"], composers: ["Beethoven"], format: "DDD" },
    { disc: 75, title: "Argerich, Kremer, Bashmet, Maisky: Brahms Piano Quartet / Schumann Fantasiestücke", artists: "Martha Argerich, Gidon Kremer, Yuri Bashmet, Mischa Maisky", period: "2002", category: ["String Quartet", "Romantic"], composers: ["Brahms", "Schumann"], format: "DDD" },
    { disc: 76, title: "Anne-Sophie Mutter: Mozart Piano Trios K.502, 542, 548", artists: "Anne-Sophie Mutter, André Previn, Daniel Müller-Schott", period: "2005", category: ["String Quartet", "Classical"], composers: ["Mozart"], format: "DDD" },
    { disc: 77, title: "Daniel Hope: Mendelssohn Violin Concerto (1844) / Octet / Lieder", artists: "Daniel Hope, The Chamber Orchestra Of Europe, Thomas Hengelbrock", period: "2007", category: ["Concerto", "Violin", "String Quartet", "Romantic"], composers: ["Mendelssohn"], format: "DDD" },

    // CD 78-88: Opera
    { disc: 78, title: "Early Opera Recordings 1 (1903-1942)", artists: "Various", period: "1903-1942", category: ["Early Recordings", "Opera"], composers: ["Various"], format: "MONO" },
    { disc: 79, title: "Early Opera Recordings 2 (1925-1942)", artists: "Various", period: "1925-1942", category: ["Early Recordings", "Opera"], composers: ["R. Strauss", "Various"], format: "MONO" },
    { disc: 80, title: "Weber: Der Freischütz (Highlights)", artists: "Paul van Kempen, Orchester Der Staatsoper Berlin", period: "1939-1943", category: ["Opera", "Romantic"], composers: ["Weber"], format: "MONO" },
    { disc: 81, title: "Rita Streich: Opera Arias", artists: "Rita Streich", period: "1953-1958", category: ["Opera", "Miscellaneous"], composers: ["Mozart", "Donizetti", "Rossini", "Weber", "Verdi", "Schubert"], format: "MONO" },
    { disc: 82, title: "Verdi: La Traviata (Part 1)", artists: "Ileana Cotrubas, Plácido Domingo, Sherrill Milnes, Carlos Kleiber, Bayerisches Staatsorchester", period: "1976", category: ["Opera", "Romantic"], composers: ["Verdi"], format: "ADD" },
    { disc: 83, title: "Verdi: La Traviata (Part 2)", artists: "Ileana Cotrubas, Plácido Domingo, Sherrill Milnes, Carlos Kleiber, Bayerisches Staatsorchester", period: "1976", category: ["Opera", "Romantic"], composers: ["Verdi"], format: "ADD" },
    { disc: 84, title: "Plácido Domingo: Gala Opera Concert", artists: "Plácido Domingo, Carlo Maria Giulini, Los Angeles Philharmonic", period: "1980", category: ["Opera", "Miscellaneous"], composers: ["Donizetti", "Verdi", "Meyerbeer", "Halévy", "Bizet"], format: "DDD" },
    { disc: 85, title: "Bryn Terfel: Wagner", artists: "Bryn Terfel, Claudio Abbado, Berliner Philharmoniker", period: "2000-2001", category: ["Opera", "Romantic"], composers: ["Wagner"], format: "DDD" },
    { disc: 86, title: "Magdalena Kožená: Mozart Arias", artists: "Magdalena Kožená, Simon Rattle, Orchestra Of The Age Of Enlightenment", period: "2005", category: ["Opera", "Classical"], composers: ["Mozart"], format: "DDD" },
    { disc: 87, title: "Anna Netrebko & Rolando Villazón: Duets", artists: "Anna Netrebko, Rolando Villazón, Nicola Luisotti, Staatskapelle Dresden", period: "2006", category: ["Opera", "Miscellaneous"], composers: ["Various"], format: "DDD" },
    { disc: 88, title: "Elīna Garanča: Bel Canto", artists: "Elīna Garanča, Roberto Abbado, Filarmonica Del Teatro Comunale Di Bologna", period: "2008", category: ["Opera", "Miscellaneous"], composers: ["Donizetti", "Bellini", "Rossini"], format: "DDD" },

    // CD 89-93: Sacred Music
    { disc: 89, title: "Haydn: Die Schöpfung (Part 1)", artists: "Herbert von Karajan, Gundula Janowitz, Christa Ludwig, Fritz Wunderlich, Werner Krenn, Dietrich Fischer-Dieskau, Walter Berry, Berliner Philharmoniker", period: "1966-1969", category: ["Sacred Music", "Classical"], composers: ["Haydn"], format: "ADD" },
    { disc: 90, title: "Haydn: Die Schöpfung (Part 2)", artists: "Herbert von Karajan, Gundula Janowitz, Christa Ludwig, Fritz Wunderlich, Werner Krenn, Dietrich Fischer-Dieskau, Walter Berry, Berliner Philharmoniker", period: "1966-1969", category: ["Sacred Music", "Classical"], composers: ["Haydn"], format: "ADD" },
    { disc: 91, title: "Mozart: Requiem", artists: "Karl Böhm, Edith Mathis, Julia Hamari, Wiesław Ochman, Karl Ridderbusch, Wiener Philharmoniker", period: "1971", category: ["Sacred Music", "Classical"], composers: ["Mozart"], format: "ADD" },
    { disc: 92, title: "Bach: Magnificat BWV 243 / Cantata 'Wachet auf' BWV 140", artists: "Karl Richter, Münchener Bach-Chor, Münchener Bach-Orchester", period: "1961-1978", category: ["Sacred Music", "Baroque"], composers: ["Bach"], format: "ADD" },
    { disc: 93, title: "Biber: Missa Salisburgensis", artists: "Reinhard Goebel, Paul McCreesh, Musica Antiqua Köln, Gabrieli Consort", period: "1997", category: ["Sacred Music", "Baroque"], composers: ["Biber"], format: "DDD" },

    // CD 94-101: Lieder
    { disc: 94, title: "Early Lied Recordings 1 (1903-1938)", artists: "Various", period: "1903-1938", category: ["Early Recordings", "Lieder"], composers: ["Various"], format: "MONO" },
    { disc: 95, title: "Early Lied Recordings 2 (1930-1942)", artists: "Various", period: "1930-1942", category: ["Early Recordings", "Lieder"], composers: ["Various"], format: "MONO" },
    { disc: 96, title: "Peter Anders: Schubert - Winterreise", artists: "Peter Anders, Michael Raucheisen", period: "1945", category: ["Lieder", "Romantic"], composers: ["Schubert"], format: "MONO" },
    { disc: 97, title: "Fritz Wunderlich: Schumann Dichterliebe / Beethoven / Schubert", artists: "Fritz Wunderlich, Hubert Giesen", period: "1965-1966", category: ["Lieder", "Romantic"], composers: ["Schumann", "Beethoven", "Schubert"], format: "ADD" },
    { disc: 98, title: "Christa Ludwig: Schumann Liederkreis / Wolf Lieder", artists: "Christa Ludwig, Daniel Barenboim, Eric Werba", period: "1968-1975", category: ["Lieder", "Romantic"], composers: ["Schumann", "Wolf"], format: "ADD" },
    { disc: 99, title: "Dietrich Fischer-Dieskau: Schubert Lieder", artists: "Dietrich Fischer-Dieskau, Gerald Moore", period: "1966-1972", category: ["Lieder", "Romantic"], composers: ["Schubert"], format: "ADD" },
    { disc: 100, title: "Jessye Norman: Brahms Lieder", artists: "Jessye Norman, Daniel Barenboim", period: "1978-1982", category: ["Lieder", "Romantic"], composers: ["Brahms"], format: "ADD" },
    { disc: 101, title: "Anne Sofie Von Otter: Chaminade - Mots D'Amour", artists: "Anne Sofie Von Otter, Bengt Forsberg", period: "2000", category: ["Lieder", "Romantic"], composers: ["Chaminade"], format: "DDD" },

    // CD 102-107: Archiv / Baroque
    { disc: 102, title: "Helmut Walcha: Bach Organ Works", artists: "Helmut Walcha", period: "1947", category: ["Baroque", "Miscellaneous"], composers: ["Bach"], format: "MONO" },
    { disc: 103, title: "Handel: Utrecht Te Deum & Jubilate / Zadok The Priest", artists: "August Wenzinger", period: "1958", category: ["Baroque", "Sacred Music"], composers: ["Handel"], format: "ADD" },
    { disc: 104, title: "Music Of The Gothic Era", artists: "David Munrow, The Early Music Consort Of London", period: "1975", category: ["Baroque", "Miscellaneous"], composers: ["Various Medieval"], format: "ADD" },
    { disc: 105, title: "Vivaldi: The Four Seasons", artists: "Trevor Pinnock, Simon Standage, The English Concert", period: "1981", category: ["Baroque", "Concerto"], composers: ["Vivaldi"], format: "DDD" },
    { disc: 106, title: "Bach: Ascension Cantatas BWV 11, 37, 43, 128", artists: "John Eliot Gardiner, The Monteverdi Choir, The English Baroque Soloists", period: "1993-1999", category: ["Baroque", "Sacred Music"], composers: ["Bach"], format: "DDD" },
    { disc: 107, title: "Giuliano Carmignola: Concerto Italiano", artists: "Giuliano Carmignola, Andrea Marcon, Venice Baroque Orchestra", period: "2009", category: ["Baroque", "Concerto"], composers: ["Various Italian Baroque"], format: "DDD" },

    // CD 108-117: Other
    { disc: 108, title: "Early Light Music Recordings", artists: "Various", period: "1927-1951", category: ["Early Recordings", "Miscellaneous"], composers: ["Various"], format: "MONO" },
    { disc: 109, title: "Kaiserwalzer - Wiener Ball-Orchester", artists: "Franz Marszalek, Wiener Ball-Orchester", period: "1960-1964", category: ["Miscellaneous"], composers: ["J. Strauss", "Various"], format: "ADD" },
    { disc: 110, title: "Eine Weihnachtsmusik", artists: "Hermann Prey, Fritz Wunderlich, Will Quadflieg", period: "1966", category: ["Miscellaneous", "Sacred Music"], composers: ["Various"], format: "ADD" },
    { disc: 111, title: "Mauricio Kagel: '1898' / Musik für Renaissance-Instrumente", artists: "Mauricio Kagel", period: "1967-1973", category: ["Modern", "Miscellaneous"], composers: ["Kagel"], format: "ADD" },
    { disc: 112, title: "Steve Reich: Six Pianos / Music For Mallet Instruments, Voices And Organ", artists: "Steve Reich and Musicians", period: "1974", category: ["Modern", "Miscellaneous"], composers: ["Reich"], format: "ADD" },
    { disc: 113, title: "Wien Modern: Ligeti, Nono, Boulez, Rihm", artists: "Claudio Abbado, Wiener Philharmoniker", period: "1988", category: ["Modern", "Symphony"], composers: ["Ligeti", "Nono", "Boulez", "Rihm"], format: "DDD" },
    { disc: 114, title: "Philip Glass: Violin Concerto / Schnittke: Concerto Grosso No. 5", artists: "Gidon Kremer, Christoph von Dohnányi, Wiener Philharmoniker", period: "1991-1992", category: ["Modern", "Concerto"], composers: ["Glass", "Schnittke"], format: "DDD" },
    { disc: 115, title: "Vangelis: Invisible Connections", artists: "Vangelis", period: "1985", category: ["Modern", "Miscellaneous"], composers: ["Vangelis"], format: "DDD" },
    { disc: 116, title: "Max Richter: Recomposed - Vivaldi The Four Seasons", artists: "Max Richter, Daniel Hope, Konzerthaus Kammerorchester Berlin", period: "2012", category: ["Modern", "Miscellaneous"], composers: ["Richter", "Vivaldi"], format: "DDD" },
    { disc: 117, title: "Jóhann Jóhannsson: Orphée", artists: "Jóhann Jóhannsson", period: "2016", category: ["Modern", "Miscellaneous"], composers: ["Jóhannsson"], format: "DDD" },

    // CD 118-119: Spoken Word
    { disc: 118, title: "Goethe: Faust (Part 1)", artists: "Gustaf Gründgens, Schauspielhaus Düsseldorf", period: "1954", category: ["Miscellaneous"], composers: ["Goethe"], format: "MONO" },
    { disc: 119, title: "Goethe: Faust (Part 2)", artists: "Gustaf Gründgens, Schauspielhaus Düsseldorf", period: "1954", category: ["Miscellaneous"], composers: ["Goethe"], format: "MONO" },

    // CD 120-121: Final CDs
    { disc: 120, title: "Prokofiev: Peter And The Wolf (Sting) / Classical Symphony / Marches", artists: "Sting, Claudio Abbado, The Chamber Orchestra Of Europe", period: "1986-1998", category: ["Symphony", "Miscellaneous"], composers: ["Prokofiev"], format: "DDD" },
    { disc: 121, title: "2018 And Beyond (Bonus CD)", artists: "Various", period: "2016-2018", category: ["Miscellaneous"], composers: ["Rachmaninov", "Mahler", "Dvořák", "Shostakovich"], format: "DDD" }
];

/**
 * DG120 Page - extends CollectionPage
 * Uses shared modules for storage, filters, modal, and list rendering
 */
class DG120Page extends CollectionPage {
    constructor() {
        super({
            namespace: 'dg120',
            items: dg120Albums,
            itemIdField: 'disc',
            itemTitleField: 'title',

            // Labels
            markedLabel: 'Listened',
            unmarkedLabel: 'Not Listened',
            markBtnText: 'Mark as Listened',
            unmarkBtnText: 'Mark as Unlistened',
            resultsCountSuffix: ' Albums',
            emptyListMessage: 'No albums found',
            emptySidebarMessage: 'No albums listened yet',

            // Element IDs
            elementIds: {
                listContainer: 'albumsList',
                resultsCount: 'resultsCount',
                modal: 'albumModal',
                closeModal: 'closeModal',
                markBtn: 'markListenedBtn',
                removeBtn: 'removeAlbumBtn',
                sidebarList: 'listenedAlbumsList',
                sidebarCount: 'listenedAlbumsCount',
                markedCount: 'listenedCount',
                markedPercentage: 'listenedPercentage',
                totalItems: 'totalAlbums',
                exportBtn: 'exportDataBtn',
                importBtn: 'importDataBtn',
                importInput: 'importFileInput',
                clearAllBtn: 'clearAllBtn'
            },

            // Filter configuration
            filterConfig: {
                musicTypeFilter: FilterConfigs.category('category'),
                periodFilter: FilterConfigs.period('period'),
                composerFilter: FilterConfigs.category('composers'),
                statusFilter: FilterConfigs.status(
                    (album) => this.isItemMarked(album),
                    'listened',
                    'unlistened'
                )
            },

            // Custom render functions
            renderItemCard: (album, isListened) => this._renderAlbumCard(album, isListened),
            renderSidebarItem: (album) => this._renderSidebarAlbum(album),
            populateModal: (album, isListened, listenedData) => this._populateAlbumModal(album, isListened, listenedData)
        });
    }

    /**
     * Override init to add extra functionality
     */
    init() {
        // Migrate from old localStorage key if needed
        this._migrateOldData();

        // Populate filter options dynamically
        this._populateComposerFilter();
        this._populateCategoryFilter();

        // Call parent init
        super.init();
    }

    /**
     * Populate composer filter dropdown from data
     * @private
     */
    _populateComposerFilter() {
        const composerSelect = document.getElementById('composerFilter');
        if (!composerSelect) return;

        // Extract all unique composers
        const allComposers = new Set();
        this.allItems.forEach(album => {
            if (album.composers && Array.isArray(album.composers)) {
                album.composers.forEach(c => allComposers.add(c));
            } else if (album.composers) {
                allComposers.add(album.composers);
            }
        });

        // Convert to array and sort
        const sortedComposers = Array.from(allComposers).sort();

        // Add options
        sortedComposers.forEach(composer => {
            const option = document.createElement('option');
            option.value = composer;
            option.textContent = composer;
            composerSelect.appendChild(option);
        });
    }

    /**
     * Populate category (music type) filter dropdown from data
     * @private
     */
    _populateCategoryFilter() {
        const categorySelect = document.getElementById('musicTypeFilter');
        if (!categorySelect) return;

        // Extract all unique categories
        const allCategories = new Set();
        this.allItems.forEach(album => {
            if (album.category && Array.isArray(album.category)) {
                album.category.forEach(c => allCategories.add(c));
            } else if (album.category) {
                allCategories.add(album.category);
            }
        });

        // Convert to array and sort
        const sortedCategories = Array.from(allCategories).sort();

        // Add options
        sortedCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }

    /**
     * Migrate data from old localStorage format
     * @private
     */
    _migrateOldData() {
        const oldData = localStorage.getItem('listenedAlbums');
        if (oldData && !localStorage.getItem('list100_dg120_markedItems')) {
            try {
                const albums = JSON.parse(oldData);
                if (Array.isArray(albums) && albums.length > 0) {
                    this.store.saveMarkedItems(albums);
                }
            } catch (e) {
                console.warn('Failed to migrate old listenedAlbums data:', e);
            }
        }
    }

    /**
     * Render an album card
     * @private
     */
    _renderAlbumCard(album, isListened) {
        const categories = Array.isArray(album.category) ? album.category : [album.category];
        const categoryTags = categories.slice(0, 3).map(cat =>
            `<span class="category-tag">${cat}</span>`
        ).join('');

        return `
            <div class="album-item collection-item ${isListened ? 'listened' : 'unlistened'}" data-item-id="${album.disc}">
                <div class="album-disc-number">CD ${album.disc}</div>
                <div class="album-content">
                    <div class="album-title">${album.title}</div>
                    <div class="album-artists">${album.artists}</div>
                    <div class="album-meta">
                        <span class="album-period">${album.period}</span>
                        <span class="album-format">${album.format}</span>
                    </div>
                    <div class="album-categories">
                        ${categoryTags}
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Render a sidebar album item
     * @private
     */
    _renderSidebarAlbum(album) {
        return `
            <div class="listened-album-item" data-item-id="${album.disc}">
                <div class="listened-album-name">
                    <div class="listened-album-disc">CD ${album.disc}</div>
                    <div class="listened-album-title">${album.title}</div>
                </div>
                <div class="listened-album-date">${album.period || ''}</div>
            </div>
        `;
    }

    /**
     * Populate the album modal
     * @private
     */
    _populateAlbumModal(album, isListened, listenedData) {
        const categories = Array.isArray(album.category) ? album.category.join(', ') : album.category;

        // Update text content
        this.modal.updateElements({
            albumTitle: album.title,
            albumDiscNumber: `CD ${album.disc}`,
            albumCategory: categories,
            albumArtists: album.artists,
            albumPeriod: album.period || '-',
            albumStatus: isListened ? 'Listened' : 'Unlistened'
        });

        // Update description if there's a composers field
        const descEl = document.getElementById('albumDescriptionText');
        if (descEl) {
            const composers = Array.isArray(album.composers) ? album.composers.join(', ') : (album.composers || '-');
            descEl.textContent = `Composers: ${composers}`;
        }

        // Update mark button
        this.modal.updateButton('markListenedBtn', {
            text: isListened ? 'Mark as Unlistened' : 'Mark as Listened',
            className: isListened ? 'modal-btn btn-secondary' : 'modal-btn btn-primary'
        });

        // Show/hide remove button
        this.modal.updateButton('removeAlbumBtn', {
            visible: isListened
        });

        // Show/hide and populate listen info
        this.modal.toggleElement('listenInfo', isListened);
        if (isListened && listenedData) {
            this.modal.setFormValues({
                listenDate: listenedData.listenDate || '',
                personalRating: listenedData.personalRating || '',
                listenNotes: listenedData.notes || ''
            });
        }
    }

    /**
     * Override _buildMarkedItemData to include custom fields
     * @private
     */
    _buildMarkedItemData(album) {
        const formValues = this.modal.getFormValues(['listenDate', 'personalRating', 'listenNotes']);

        return {
            disc: album.disc,
            title: album.title,
            artists: album.artists,
            period: album.period,
            category: album.category,
            listenDate: formValues.listenDate || getTodayISO(),
            personalRating: formValues.personalRating || '',
            notes: formValues.listenNotes || ''
        };
    }
}

// Global page instance (needed for onclick handlers in sidebar)
let dg120Page = null;

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function () {
    try {
        dg120Page = new DG120Page();
        dg120Page.init();
    } catch (error) {
        console.error('Failed to initialize DG120 page:', error);
    }
});

// Global function for sidebar item clicks (onclick handler compatibility)
function openAlbumModalByDisc(disc) {
    if (dg120Page) {
        const album = dg120Albums.find(a => a.disc === disc);
        if (album) {
            dg120Page.openModal(album);
        }
    }
}
