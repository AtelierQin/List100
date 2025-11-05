// DG 120 Page JavaScript

// DG 120专辑数据 - 基于官方DG 120周年纪念版专辑信息的准确数据
const dg120Albums = [
    {
        discNumber: 1,
        category: "Early Orchestral Recordings",
        title: "Early Orchestral Recordings 1 (1913-1920)",
        mainArtists: ["Various Artists"],
        recordingPeriod: "1913-1920",
        description: "最早的管弦乐录音合集，收录了1913年贝多芬、1920年柏辽兹、1913年瓦格纳的珍贵历史录音，展现了DG录音技术的早期发展。"
    },
    {
        discNumber: 2,
        category: "Early Orchestral Recordings", 
        title: "Early Orchestral Recordings 2 (1924-1928)",
        mainArtists: ["Various Artists"],
        recordingPeriod: "1924-1928",
        description: "继续展示1920年代DG的管弦乐录音成就，包括1924-1928年间录制的多部作品，反映了录音技术的进步。"
    },
    {
        discNumber: 3,
        category: "Early Orchestral Recordings",
        title: "Early Orchestral Recordings 3 (1928-1935)", 
        mainArtists: ["Various Artists"],
        recordingPeriod: "1928-1935",
        description: "收录了布鲁克纳、贝多芬、巴赫、瓦格纳、舒曼、普菲茨纳、韦伯等作曲家的作品，记录了1928-1935年间DG的录音成就。"
    },
    {
        discNumber: 4,
        category: "Early Orchestral Recordings",
        title: "Early Orchestral Recordings 4 (1931-1943)",
        mainArtists: ["Various Artists"],
        recordingPeriod: "1931-1943", 
        description: "战时及战前的珍贵录音，包括勃拉姆斯、尼古拉、斯美塔那、约翰·施特劳斯、普特、海顿、穆索尔斯基、雷斯庇基、理查·施特劳斯等作曲家的作品。"
    },
    {
        discNumber: 5,
        category: "Symphonic Works",
        title: "Franz Schubert – Symphony Nr. 9 / Joseph Haydn – Symphony Nr. 88 G-Dur",
        mainArtists: ["Wilhelm Furtwängler", "Berliner Philharmoniker"],
        recordingPeriod: "1951",
        description: "富特文格勒指挥柏林爱乐演绎舒伯特第九交响曲和海顿第88交响曲，展现了战后德国音乐文化的复兴。"
    },
    {
        discNumber: 6,
        category: "Symphonic Works", 
        title: "Anton Bruckner – Symphony Nr. 9 D-Moll",
        mainArtists: ["Eugen Jochum", "Symphonie-Orchester Des Bayerischen Rundfunks"],
        recordingPeriod: "1954",
        description: "约胡姆指挥巴伐利亚广播交响乐团演绎布鲁克纳第九交响曲，是这部作品的权威版本之一。"
    },
    {
        discNumber: 7,
        category: "Symphonic Works",
        title: "Dvořák – Symphony No. 9 'From The New World' / Smetana – The Moldau / Liszt – Les Préludes", 
        mainArtists: ["Ferenc Fricsay", "Berliner Philharmoniker"],
        recordingPeriod: "1959-1960",
        description: "弗里乔伊指挥柏林爱乐演绎德沃夏克《新世界》交响曲、斯美塔那《伏尔塔瓦河》和李斯特《前奏曲》。"
    },
    {
        discNumber: 8,
        category: "Symphonic Works",
        title: "Tschaikowsky – Symphonie Nr. 6 'Pathétique'",
        mainArtists: ["Evgeny Mravinsky", "Leningrad Philharmonic Orchestra"],
        recordingPeriod: "1960", 
        description: "穆拉文斯基指挥列宁格勒爱乐演绎柴可夫斯基第六交响曲《悲怆》，是这部作品的传奇版本。"
    },
    {
        discNumber: 9,
        category: "Symphonic Works",
        title: "Mozart – Symphonien: Nr. 39, Nr. 40, Nr. 41 'Jupiter'",
        mainArtists: ["Karl Böhm", "Berliner Philharmoniker"],
        recordingPeriod: "1961-1966",
        description: "伯姆指挥柏林爱乐演绎莫扎特第39、40、41号交响曲，展现了古典主义的完美典范。"
    },
    {
        discNumber: 10,
        category: "Symphonic Works",
        title: "Hector Berlioz – Symphonie Fantastique / Luigi Cherubini – Anacréon (Overture) / Daniel-François-Esprit Auber – La Muette De Portici (Overture)",
        mainArtists: ["Igor Markevitch", "Orchestre Des Concerts Lamoureux"],
        recordingPeriod: "1961",
        description: "马克耶维奇指挥拉穆勒音乐会场管弦乐团演绎柏辽兹《幻想交响曲》、凯鲁比尼《阿纳克雷翁》序曲和奥柏《波尔蒂契的哑女》序曲。"
    },
    {
        discNumber: 11,
        category: "Symphonic Works",
        title: "Beethoven – IX. Symphonie, Ouvertüre 'Coriolan'",
        mainArtists: ["Herbert von Karajan", "Berliner Philharmoniker"],
        recordingPeriod: "1962-1965",
        description: "卡拉扬指挥柏林爱乐演绎贝多芬第九交响曲和《科里奥兰》序曲，展现了宏大壮丽的音响效果。"
    },
    {
        discNumber: 12,
        category: "Symphonic Works",
        title: "Gustav Mahler – Symphonie Nr. 1 'Der Titan', Lieder Eines Fahrenden Gesellen",
        mainArtists: ["Rafael Kubelik", "Symphonie-Orchester Des Bayerischen Rundfunks", "Dietrich Fischer-Dieskau"],
        recordingPeriod: "1967-1968",
        description: "库贝利克指挥巴伐利亚广播交响乐团演绎马勒第一交响曲《巨人》，菲舍尔-迪斯考演唱《旅行者之歌》。"
    },
    {
        discNumber: 13,
        category: "Symphonic Works",
        title: "Holst – The Planets / Strauss – Also Sprach Zarathustra",
        mainArtists: ["William Steinberg", "Boston Symphony Orchestra"],
        recordingPeriod: "1970-1971",
        description: "斯坦伯格指挥波士顿交响乐团演绎霍尔斯特《行星组曲》和理查·施特劳斯《查拉图斯特拉如是说》。"
    },
    {
        discNumber: 14,
        category: "Symphonic Works",
        title: "Beethoven – Symphonie Nr. 5 & 7",
        mainArtists: ["Carlos Kleiber", "Wiener Philharmoniker"],
        recordingPeriod: "1974-1976",
        description: "卡洛斯·克莱伯指挥维也纳爱乐演绎贝多芬第五和第七交响曲，这两部作品的演绎被奉为经典。"
    },
    {
        discNumber: 15,
        category: "Symphonic Works",
        title: "Camille Saint-Saëns – Symphony No. 3 'Organ', Danse Macabre, Bacchanale, Le Déluge",
        mainArtists: ["Daniel Barenboim", "Chicago Symphony Orchestra", "Orchestre De Paris"],
        recordingPeriod: "1975-1980",
        description: "巴伦博伊姆指挥芝加哥交响乐团和巴黎管弦乐团演绎圣桑第三交响曲《管风琴》及其他作品。"
    },
    {
        discNumber: 16,
        category: "Symphonic Works",
        title: "Claude Debussy – La Mer / Maurice Ravel – Rapsodie Espagnole, Ma Mère L'Oye",
        mainArtists: ["Carlo Maria Giulini", "Los Angeles Philharmonic Orchestra"],
        recordingPeriod: "1979",
        description: "朱里尼指挥洛杉矶爱乐演绎德彪西《海》和拉威尔《西班牙狂想曲》、《鹅妈妈》组曲。"
    },
    {
        discNumber: 17,
        category: "Symphonic Works",
        title: "Richard Strauss – Eine Alpensinfonie",
        mainArtists: ["Herbert von Karajan", "Berliner Philharmoniker"],
        recordingPeriod: "1980",
        description: "卡拉扬指挥柏林爱乐演绎理查·施特劳斯《阿尔卑斯交响曲》，展现了宏大的管弦乐效果。"
    },
    {
        discNumber: 18,
        category: "Symphonic Works",
        title: "Mahler – Symphonie No. 5",
        mainArtists: ["Leonard Bernstein", "Wiener Philharmoniker"],
        recordingPeriod: "1987",
        description: "伯恩斯坦指挥维也纳爱乐现场演绎马勒第五交响曲，充满激情与戏剧性。"
    },
    {
        discNumber: 19,
        category: "Symphonic Works",
        title: "Aaron Copland – Appalachian Spring, Short Symphony, 3 Latin American Sketches, Quiet City",
        mainArtists: ["Orpheus Chamber Orchestra"],
        recordingPeriod: "1988",
        description: "奥菲斯室内乐团演绎科普兰《阿帕拉契亚之春》、《短交响曲》、《三个拉丁美洲素描》和《寂静城市》。"
    },
    {
        discNumber: 20,
        category: "Symphonic Works",
        title: "Messiaen – Turangalîla-Symphonie",
        mainArtists: ["Myung-Whun Chung", "Orchestre De L'Opéra Bastille", "Yvonne Loriod", "Jeanne Loriod"],
        recordingPeriod: "1990",
        description: "郑明勋指挥巴士底歌剧院管弦乐团，在作曲家梅西安亲临现场的情况下演绎《图伦加利拉交响曲》。"
    },
    {
        discNumber: 21,
        category: "Symphonic Works",
        title: "Igor Stravinsky – Pétrouchka, Le Sacre Du Printemps",
        mainArtists: ["Pierre Boulez", "The Cleveland Orchestra"],
        recordingPeriod: "1991",
        description: "布列兹指挥克利夫兰管弦乐团演绎斯特拉文斯基《彼得鲁什卡》和《春之祭》。"
    },
    {
        discNumber: 22,
        category: "Symphonic Works",
        title: "Franck – Symphony / Poulenc – Organ Concerto",
        mainArtists: ["Seiji Ozawa", "Boston Symphony Orchestra", "Simon Preston"],
        recordingPeriod: "1991",
        description: "小泽征尔指挥波士顿交响乐团演绎弗兰克《交响曲》和普朗克《管风琴协奏曲》。"
    },
    {
        discNumber: 23,
        category: "Symphonic Works",
        title: "Richard Wagner – Orchestral Music: Tannhaüser, Parsifal, Tristan Und Isolde",
        mainArtists: ["Claudio Abbado", "Berliner Philharmoniker"],
        recordingPeriod: "2000-2002",
        description: "阿巴多指挥柏林爱乐演绎瓦格纳《汤豪舍》、《帕西法尔》、《特里斯坦与伊索尔德》中的管弦乐选段。"
    },
    {
        discNumber: 24,
        category: "Symphonic Works",
        title: "German Overtures",
        mainArtists: ["Christian Thielemann", "Wiener Philharmoniker"],
        recordingPeriod: "2002",
        description: "蒂勒曼指挥维也纳爱乐演绎德国歌剧序曲，包括韦伯、瓦格纳、尼古拉等人的作品。"
    },
    {
        discNumber: 25,
        category: "Symphonic Works",
        title: "Modest Mussorgsky – Pictures At An Exhibition",
        mainArtists: ["Gustavo Dudamel", "Wiener Philharmoniker"],
        recordingPeriod: "2016",
        description: "杜达梅尔指挥维也纳爱乐演绎穆索尔斯基《图画展览会》。"
    },
    {
        discNumber: 26,
        category: "Symphonic Works",
        title: "Mendelssohn – Symphonies 4 \"Italian\" & 5 \"Reformation\"",
        mainArtists: ["Yannick Nézet-Séguin", "The Chamber Orchestra Of Europe", "RIAS-Kammerchor"],
        recordingPeriod: "2016",
        description: "内泽-塞甘指挥欧洲室内乐学会和RIAS室内合唱团演绎门德尔松第四交响曲《意大利》和第五交响曲《宗教改革》。"
    },
    {
        discNumber: 27,
        category: "Symphonic Works",
        title: "Bruckner – Symphony No. 4 / Wagner – Lohengrin Prelude",
        mainArtists: ["Andris Nelsons", "Gewandhausorchester Leipzig"],
        recordingPeriod: "2017",
        description: "内尔松斯指挥莱比锡布商大厦管弦乐团演绎布鲁克纳第四交响曲和瓦格纳《罗恩格林》前奏曲。"
    },
    {
        discNumber: 28,
        category: "Concerto Recordings",
        title: "Early Concerto Recordings (1928-1943)",
        mainArtists: ["Various Artists"],
        recordingPeriod: "1928-1943",
        description: "早期的协奏曲录音合集，收录了1928-1943年间录制的肖邦、勃拉姆斯、舒曼、布鲁赫、西贝柳斯、斯特拉文斯基、莫扎特等作曲家的协奏曲作品。"
    },
    {
        discNumber: 29,
        category: "Concerto Recordings",
        title: "Sviatoslav Richter: Rachmaninov – Piano Concerto No. 2 / Tchaikovsky – Piano Concerto No. 1",
        mainArtists: ["Sviatoslav Richter", "Warsaw Philharmonic Orchestra", "Herbert von Karajan", "Wiener Symphoniker"],
        recordingPeriod: "1959-1962",
        description: "李赫特演奏拉赫玛尼诺夫第二钢琴协奏曲和柴可夫斯基第一钢琴协奏曲，卡拉扬指挥维也纳交响乐团协奏。"
    },
    {
        discNumber: 30,
        category: "Concerto Recordings",
        title: "Pierre Fournier, Violoncello: Saint-Saëns – Cellokonzert Nr. 1 / Lalo – Cellokonzert D-Moll / Bruch – Kol Nidrei",
        mainArtists: ["Pierre Fournier", "Orchestre Des Concerts Lamoureux", "Jean Martinon", "Berliner Philharmoniker", "Alfred Wallenstein"],
        recordingPeriod: "1960-1966",
        description: "富尼埃大提琴演奏圣桑第一号大提琴协奏曲、拉罗D小调大提琴协奏曲和布鲁赫《科尔尼德莱》。"
    },
    {
        discNumber: 31,
        category: "Concerto Recordings",
        title: "Bach – Violin Concertos BWV 1041-1043 / Beethoven – Violin Romances Opp. 40 & 50",
        mainArtists: ["David Oistrakh", "Igor Oistrakh"],
        recordingPeriod: "1961-1962",
        description: "奥伊斯特拉赫父子演奏巴赫小提琴协奏曲和贝多芬小提琴浪漫曲，展现小提琴演奏的辉煌技艺。"
    },
    {
        discNumber: 32,
        category: "Concerto Recordings",
        title: "Wolfgang Amadeus Mozart – Violinkonzert Nr. 1 / Adagio KV 261 / Rondo KV 269 / KV373",
        mainArtists: ["Wolfgang Schneiderhan", "Berliner Philharmoniker"],
        recordingPeriod: "1967",
        description: "施耐德汉演奏莫扎特第一小提琴协奏曲及其他小提琴作品，柏林爱乐协奏。"
    },
    {
        discNumber: 33,
        category: "Concerto Recordings",
        title: "Mendelssohn / Tchaikovsky – Violinkonzerte",
        mainArtists: ["Nathan Milstein", "Wiener Philharmoniker", "Claudio Abbado"],
        recordingPeriod: "1972-1973",
        description: "米尔斯坦演奏门德尔松和柴可夫斯基小提琴协奏曲，阿巴多指挥维也纳爱乐协奏。"
    },
    {
        discNumber: 34,
        category: "Concerto Recordings",
        title: "Mozart – Piano Concertos No. 20 & 21",
        mainArtists: ["Friedrich Gulda", "Wiener Philharmoniker", "Claudio Abbado"],
        recordingPeriod: "1974",
        description: "古尔达演奏莫扎特第20号和21号钢琴协奏曲，阿巴多指挥维也纳爱乐协奏。"
    },
    {
        discNumber: 35,
        category: "Concerto Recordings",
        title: "Vivaldi / Tartini / Boccherini – Cello-Konzerte",
        mainArtists: ["Mstislav Rostropovich", "Collegium Musicum Zürich", "Paul Sacher"],
        recordingPeriod: "1977",
        description: "罗斯特罗波维奇演奏维瓦尔第、塔蒂尼和博凯里尼的大提琴协奏曲，萨赫尔指挥苏黎世音乐合奏团。"
    },
    {
        discNumber: 36,
        category: "Concerto Recordings",
        title: "Ludwig van Beethoven – Klavierkonzerte Nos. 1 & 3",
        mainArtists: ["Arturo Benedetti Michelangeli", "Wiener Symphoniker", "Carlo Maria Giulini"],
        recordingPeriod: "1979",
        description: "米开朗杰利演奏贝多芬第一和第三钢琴协奏曲，朱里尼指挥维也纳交响乐团协奏。"
    },
    {
        discNumber: 37,
        category: "Concerto Recordings",
        title: "Johannes Brahms – Klavierkonzert No. 1",
        mainArtists: ["Maurizio Pollini", "Wiener Philharmoniker", "Karl Böhm"],
        recordingPeriod: "1979",
        description: "波利尼演奏勃拉姆斯第一钢琴协奏曲，伯姆指挥维也纳爱乐协奏。"
    },
    {
        discNumber: 38,
        category: "Concerto Recordings",
        title: "Antonín Dvořák / Robert Schumann – Cello Concertos",
        mainArtists: ["Mischa Maisky", "Leonard Bernstein", "Wiener Philharmoniker", "Israel Philharmonic Orchestra"],
        recordingPeriod: "1985-1988",
        description: "麦斯基演奏德沃夏克和舒曼大提琴协奏曲，伯恩斯坦指挥维也纳爱乐和以色列爱乐协奏。"
    },
    {
        discNumber: 39,
        category: "Concerto Recordings",
        title: "Franz Liszt – Klavierkonzerte Nos. 1 & 2 / Totentanz",
        mainArtists: ["Krystian Zimerman", "Boston Symphony Orchestra", "Seiji Ozawa"],
        recordingPeriod: "1987",
        description: "齐默尔曼演奏李斯特第一和第二钢琴协奏曲及《死亡之舞》，小泽征尔指挥波士顿交响乐团协奏。"
    },
    {
        discNumber: 40,
        category: "Concerto Recordings",
        title: "Wolfgang Amadeus Mozart – Clarinet Concerto / Horn Concertos Nos. 1 & 4",
        mainArtists: ["Charles Neidich", "David Jolley", "Orpheus Chamber Orchestra"],
        recordingPeriod: "1987",
        description: "内迪奇和乔利演奏莫扎特单簧管协奏曲和圆号协奏曲，奥菲斯室内乐团协奏。"
    },
    {
        discNumber: 41,
        category: "Concerto Recordings",
        title: "Prokofiev – Piano Concertos Nos. 1 & 3",
        mainArtists: ["Yevgeny Kissin", "Berliner Philharmoniker", "Claudio Abbado"],
        recordingPeriod: "1993",
        description: "基辛演奏普罗科菲耶夫第一和第三钢琴协奏曲，阿巴多指挥柏林爱乐协奏。"
    },
    {
        discNumber: 42,
        category: "Concerto Recordings",
        title: "Martha Argerich: Shostakovich – Piano Concerto No. 1 / Haydn – Piano Concerto No. 11",
        mainArtists: ["Martha Argerich", "Württembergisches Kammerorchester", "Jörg Faerber"],
        recordingPeriod: "1993",
        description: "阿格里奇演奏肖斯塔科维奇第一钢琴协奏曲和海顿第11号钢琴协奏曲，法伯指挥符腾堡室内乐团协奏。"
    },
    {
        discNumber: 43,
        category: "Concerto Recordings",
        title: "Anne-Sophie Mutter: Brahms – Violinkonzert / Schumann – Fantasie Op. 131",
        mainArtists: ["Anne-Sophie Mutter", "New York Philharmonic", "Kurt Masur"],
        recordingPeriod: "1997",
        description: "穆特演奏勃拉姆斯小提琴协奏曲和舒曼《幻想曲》作品131号，马泽尔指挥纽约爱乐协奏。"
    },
    {
        discNumber: 44,
        category: "Concerto Recordings",
        title: "Credo: Hélène Grimaud",
        mainArtists: ["Hélène Grimaud", "Sveriges Radios Symfoniorkester", "Radiokören", "Esa-Pekka Salonen"],
        recordingPeriod: "2003",
        description: "格里茂演奏《信经》，萨洛宁指挥瑞典广播交响乐团和合唱团协奏。"
    },
    {
        discNumber: 45,
        category: "Concerto Recordings",
        title: "Lisa Batiashvili: Echoes Of Time",
        mainArtists: ["Lisa Batiashvili", "Symphonie-Orchester Des Bayerischen Rundfunks", "Esa-Pekka Salonen"],
        recordingPeriod: "2010",
        description: "巴蒂亚什维利演奏《时间的回声》，萨洛宁指挥巴伐利亚广播交响乐团协奏。"
    },
    {
        discNumber: 46,
        category: "Concerto Recordings",
        title: "Yuja Wang: Rachmaninov #3 / Prokofiev #2",
        mainArtists: ["Yuja Wang", "Simón Bolívar Symphony Orchestra Of Venezuela", "Gustavo Dudamel"],
        recordingPeriod: "2013",
        description: "王羽佳演奏拉赫玛尼诺夫第三钢琴协奏曲和普罗科菲耶夫第二钢琴协奏曲，杜达梅尔指挥委内瑞拉西蒙·玻利瓦尔交响乐团协奏。"
    },
    {
        discNumber: 47,
        category: "Concerto Recordings",
        title: "Hilary Hahn: Mozart 5, Vieuxtemps 4 – Violin Concertos",
        mainArtists: ["Hilary Hahn", "Deutsche Kammerphilharmonie Bremen", "Paavo Järvi"],
        recordingPeriod: "2012-2013",
        description: "希拉里·哈恩演奏莫扎特第五小提琴协奏曲和维厄当第四小提琴协奏曲，帕沃·雅尔维指挥不来梅德意志室内爱乐乐团协奏。"
    },
    {
        discNumber: 48,
        category: "Concerto Recordings",
        title: "Albrecht Mayer: Kammerakademie Potsdam – Lost And Found",
        mainArtists: ["Albrecht Mayer", "Kammerakademie Potsdam"],
        recordingPeriod: "2013",
        description: "迈耶演奏《失而复得》，波茨坦室内乐学院协奏。"
    },
    {
        discNumber: 49,
        category: "Concerto Recordings",
        title: "Chopin: Piano Concerto No. 1 / Ballades",
        mainArtists: ["Seong-Jin Cho", "London Symphony Orchestra", "Gianandrea Noseda"],
        recordingPeriod: "2016",
        description: "赵成珍演奏肖邦第一钢琴协奏曲和叙事曲，诺塞达指挥伦敦交响乐团协奏。"
    },
    {
        discNumber: 50,
        category: "Piano Recordings",
        title: "Early Piano Recordings (1907-1943)",
        mainArtists: ["Various Artists"],
        recordingPeriod: "1907-1943",
        description: "早期的钢琴录音合集，收录了1907-1943年间录制的舒伯特、莫扎特、李斯特、巴赫、肖邦、舒曼、莫什科夫斯基、施特劳斯等作曲家的钢琴作品。"
    },
    {
        discNumber: 51,
        category: "Piano Recordings",
        title: "Monique Haas Spielt Ravel, Debussy, Roussel, Bartók",
        mainArtists: ["Monique Haas"],
        recordingPeriod: "1949-1955",
        description: "莫妮克·哈斯演奏拉威尔、德彪西、鲁塞尔和巴托克的钢琴作品，展现法国钢琴学派的精湛技艺。"
    },
    {
        discNumber: 52,
        category: "Piano Recordings",
        title: "Ludwig Van Beethoven: Klaviersonate Nr. 8 (Pathétique), Nr. 31",
        mainArtists: ["Elly Ney"],
        recordingPeriod: "1956",
        description: "埃莉·奈伊演奏贝多芬第八钢琴奏鸣曲《悲怆》和第31号钢琴奏鸣曲，展现德国钢琴传统。"
    },
    {
        discNumber: 53,
        category: "Piano Recordings",
        title: "Franz Schubert: Sonata No. 14, Moments Musicaux, Hüttenbrenner Variations",
        mainArtists: ["Wilhelm Kempff"],
        recordingPeriod: "1967-1970",
        description: "威廉·肯普夫演奏舒伯特第14奏鸣曲、《音乐瞬间》和胡滕布雷纳变奏曲，展现舒伯特钢琴音乐的深度。"
    },
    {
        discNumber: 54,
        category: "Piano Recordings",
        title: "Arturo Benedetti Michelangeli, Claude Debussy: Images I/II, Children's Corner",
        mainArtists: ["Arturo Benedetti Michelangeli"],
        recordingPeriod: "1971",
        description: "米开朗杰利演奏德彪西《意象集》第一、二册和《儿童园地》，展现印象派钢琴音乐的色彩。"
    },
    {
        discNumber: 55,
        category: "Piano Recordings",
        title: "Igor Stravinsky: Pétrouchka / Serge Prokofiev: Sonata Nr. 7",
        mainArtists: ["Maurizio Pollini"],
        recordingPeriod: "1971-1976",
        description: "波利尼演奏斯特拉文斯基《彼得鲁什卡》和普罗科菲耶夫第七钢琴奏鸣曲，展现现代钢琴作品的技巧与表现力。"
    },
    {
        discNumber: 56,
        category: "Piano Recordings",
        title: "Beethoven: Sonaten – Tempest, Waldstein, Les Adieux",
        mainArtists: ["Emil Gilels"],
        recordingPeriod: "1972-1981",
        description: "吉列尔斯演奏贝多芬《暴风雨》、《华尔斯坦》和《告别》钢琴奏鸣曲，展现贝多芬奏鸣曲的深刻内涵。"
    },
    {
        discNumber: 57,
        category: "Piano Recordings",
        title: "Johannes Brahms: Variationen Für Klavier",
        mainArtists: ["Daniel Barenboim"],
        recordingPeriod: "1972",
        description: "巴伦博伊姆演奏勃拉姆斯钢琴变奏曲，展现勃拉姆斯钢琴音乐的丰富性和结构性。"
    },
    {
        discNumber: 58,
        category: "Piano Recordings",
        title: "Johannes Brahms: Ungarische Tänze No. 1-21 / Walzer Op. 39",
        mainArtists: ["Alfons & Aloys Kontarsky"],
        recordingPeriod: "1976-1980",
        description: "孔塔尔斯基兄弟演奏勃拉姆斯《匈牙利舞曲》第1-21首和《圆舞曲》作品39号，展现双钢琴演奏的魅力。"
    },
    {
        discNumber: 59,
        category: "Piano Recordings",
        title: "Chopin, Argerich: Sonate No. 2 & 3",
        mainArtists: ["Martha Argerich"],
        recordingPeriod: "1960-1974",
        description: "阿格里奇演奏肖邦第二和第三钢琴奏鸣曲，展现肖邦钢琴音乐的激情与诗意。"
    },
    {
        discNumber: 60,
        category: "Piano Recordings",
        title: "Ravel: Gaspard De La Nuit / Prokofiev: Piano Sonata No. 6",
        mainArtists: ["Ivo Pogorelich"],
        recordingPeriod: "1982",
        description: "波戈莱里奇演奏拉威尔《夜之幽灵》和普罗科菲耶夫第六钢琴奏鸣曲，展现独特的音乐诠释风格。"
    },
    {
        discNumber: 61,
        category: "Piano Recordings",
        title: "Horowitz The Poet - Schubert: Sonata D 960 / Schumann: Kinderszenen",
        mainArtists: ["Vladimir Horowitz"],
        recordingPeriod: "1986-1987",
        description: "霍洛维茨演奏舒伯特D960奏鸣曲和舒曼《童年情景》，展现钢琴诗人的音乐魅力。"
    },
    {
        discNumber: 62,
        category: "Piano Recordings",
        title: "Mozart: Klaviersonaten K.331, K.457; Fantasias K.397, K.475",
        mainArtists: ["Maria-João Pires"],
        recordingPeriod: "1990",
        description: "玛丽亚-若昂·皮雷斯演奏莫扎特钢琴奏鸣曲K.331、K.457和幻想曲K.397、K.475，展现莫扎特钢琴音乐的优雅。"
    },
    {
        discNumber: 63,
        category: "Piano Recordings",
        title: "Lang Lang: Live At Carnegie Hall",
        mainArtists: ["Lang Lang"],
        recordingPeriod: "2003",
        description: "郎朗卡内基音乐厅现场演奏，展现当代钢琴家的风采。"
    },
    {
        discNumber: 64,
        category: "Piano Recordings",
        title: "Trifonov: The Carnegie Recital",
        mainArtists: ["Daniil Trifonov"],
        recordingPeriod: "2013",
        description: "特里福诺夫卡内基独奏会，展现新生代钢琴家的卓越技艺。"
    },
    {
        discNumber: 65,
        category: "Piano Recordings",
        title: "Johann Sebastian Bach: The French Suites",
        mainArtists: ["Murray Perahia"],
        recordingPeriod: "2013",
        description: "佩拉亚演奏巴赫《法国组曲》，展现巴赫键盘音乐的精致与深度。"
    },
    {
        discNumber: 66,
        category: "Piano Recordings",
        title: "Sokolov: Schubert",
        mainArtists: ["Grigory Sokolov"],
        recordingPeriod: "2013",
        description: "索科洛夫演奏舒伯特作品，展现俄罗斯钢琴学派的深厚传统。"
    },
    {
        discNumber: 67,
        category: "Chamber Music",
        title: "Early Chamber Music Recordings (1911-1951)",
        mainArtists: ["Various Artists"],
        recordingPeriod: "1911-1951",
        description: "早期的室内乐录音合集，收录了1911-1951年间录制的克莱斯勒、胡梅尔、欣德米特、塔蒂尼、弗朗克、德沃夏克、贝多芬、萨拉萨蒂、帕格尼尼、齐曼诺夫斯基等作曲家的室内乐作品。"
    },
    {
        discNumber: 68,
        category: "Chamber Music",
        title: "Franz Schubert: Forellen-Quintett / Streichquartett Nr. 14 (Der Tod Und Das Mädchen)",
        mainArtists: ["Koeckert-Quartett", "Adrian Aeschbacher"],
        recordingPeriod: "1950-1952",
        description: "克克尔特四重奏和艾施巴赫演奏舒伯特《鳟鱼五重奏》和《死神与少女》弦乐四重奏。"
    },
    {
        discNumber: 69,
        category: "Chamber Music",
        title: "Haydn: Kaiserquartett / Mozart: Jagdquartett",
        mainArtists: ["Amadeus-Quartett"],
        recordingPeriod: "1963-1966",
        description: "阿玛迪斯四重奏演奏海顿《皇帝四重奏》和莫扎特《狩猎四重奏》。"
    },
    {
        discNumber: 70,
        category: "Chamber Music",
        title: "Meister Ihres Instruments III: Aurele Nicolet",
        mainArtists: ["Aurèle Nicolet"],
        recordingPeriod: "1969",
        description: "奥雷尔·尼科莱长笛演奏莫扎特、德彪西、伊贝尔、贝里奥、福岛和夫、巴赫、舒伯特等作曲家的作品。"
    },
    {
        discNumber: 71,
        category: "Chamber Music",
        title: "Johannes Brahms: String Quartets Nos. 1 & 3 / Joseph Haydn: String Quartet Op. 76 No. 4",
        mainArtists: ["Melos Quartett"],
        recordingPeriod: "1969-1972",
        description: "梅洛斯四重奏演奏勃拉姆斯第一和第三弦乐四重奏以及海顿《日出》四重奏。"
    },
    {
        discNumber: 72,
        category: "Chamber Music",
        title: "Arnold Schoenberg: Verklärte Nacht / Streichtrio",
        mainArtists: ["Lasalle Quartet", "Donald McInnes", "Jonathan Pegis"],
        recordingPeriod: "1980s",
        description: "拉萨尔四重奏演奏勋伯格《升华之夜》和《弦乐三重奏》。"
    },
    {
        discNumber: 73,
        category: "Chamber Music",
        title: "Debussy, Ravel, Webern: Streichquartette",
        mainArtists: ["Hagen Quartett"],
        recordingPeriod: "1992-1993",
        description: "哈根四重奏演奏德彪西、拉威尔和韦伯恩的弦乐四重奏。"
    },
    {
        discNumber: 74,
        category: "Chamber Music",
        title: "Ludwig Van Beethoven: The String Quartets: Rasumovsky No. 3, Harp, Serioso",
        mainArtists: ["Amadeus-Quartett"],
        recordingPeriod: "1950s-1960s",
        description: "阿玛迪斯四重奏演奏贝多芬《拉祖莫夫斯基》第三号、《竖琴》和《严肃》弦乐四重奏。"
    },
    {
        discNumber: 75,
        category: "Chamber Music",
        title: "Argerich, Kremer, Bashmet, Maisky - Brahms: Klavierquartett Op. 25 / Schumann: Fantasiestücke Op. 88",
        mainArtists: ["Martha Argerich", "Gidon Kremer", "Yuri Bashmet", "Mischa Maisky"],
        recordingPeriod: "2002",
        description: "阿格里奇、克莱默、巴什梅特和麦斯基合作演奏勃拉姆斯钢琴四重奏作品25号和舒曼《幻想曲》作品88号。"
    },
    {
        discNumber: 76,
        category: "Chamber Music",
        title: "Anne-Sophie Mutter - Mozart: Piano Trios K. 502, 542, 548",
        mainArtists: ["Anne-Sophie Mutter"],
        recordingPeriod: "2005",
        description: "穆特演奏莫扎特钢琴三重奏K.502、542和548，展现古典室内乐的精致。"
    },
    {
        discNumber: 77,
        category: "Chamber Music",
        title: "Beethoven: The String Quartets Op. 18",
        mainArtists: ["Emerson String Quartet"],
        recordingPeriod: "1990s",
        description: "埃默森四重奏演奏贝多芬作品18号弦乐四重奏，展现早期贝多芬四重奏的魅力。"
    },
    {
        discNumber: 78,
        category: "Chamber Music",
        title: "Beethoven: The String Quartets Op. 59",
        mainArtists: ["Emerson String Quartet"],
        recordingPeriod: "1990s",
        description: "埃默森四重奏演奏贝多芬《拉祖莫夫斯基》弦乐四重奏作品59号。"
    },
    {
        discNumber: 79,
        category: "Chamber Music",
        title: "Beethoven: The String Quartets Op. 74 & 95",
        mainArtists: ["Emerson String Quartet"],
        recordingPeriod: "1990s",
        description: "埃默森四重奏演奏贝多芬《竖琴》作品74号和《严肃》作品95号弦乐四重奏。"
    },
    {
        discNumber: 80,
        category: "Chamber Music",
        title: "Beethoven: The Late String Quartets",
        mainArtists: ["Emerson String Quartet"],
        recordingPeriod: "1990s",
        description: "埃默森四重奏演奏贝多芬晚期弦乐四重奏，展现贝多芬音乐的深刻内涵。"
    },
    {
        discNumber: 81,
        category: "Chamber Music",
        title: "Brahms: String Quintets & Sextets",
        mainArtists: ["Amadeus-Quartett"],
        recordingPeriod: "1960s",
        description: "阿玛迪斯四重奏演奏勃拉姆斯弦乐五重奏和六重奏。"
    },
    {
        discNumber: 82,
        category: "Chamber Music",
        title: "Dvořák: String Quartets Op. 51 & 105",
        mainArtists: ["Prague String Quartet"],
        recordingPeriod: "1970s",
        description: "布拉格四重奏演奏德沃夏克作品51号和105号弦乐四重奏。"
    },
    {
        discNumber: 83,
        category: "Chamber Music",
        title: "Mozart: Clarinet Quintet & Oboe Quartet",
        mainArtists: ["Karl Leister", "Berliner Philharmoniker members"],
        recordingPeriod: "1970s",
        description: "莱斯特和柏林爱乐成员演奏莫扎特单簧管五重奏和双簧管四重奏。"
    },
    {
        discNumber: 84,
        category: "Chamber Music",
        title: "Schubert: Trout Quintet & String Quartet No. 13",
        mainArtists: ["Gewandhaus Quartet", "Gerhard Bosse"],
        recordingPeriod: "1960s",
        description: "格万特豪斯四重奏和博塞演奏舒伯特《鳟鱼五重奏》和第13号弦乐四重奏。"
    },
    {
        discNumber: 85,
        category: "Chamber Music",
        title: "Schumann: Piano Quintet & Piano Quartet",
        mainArtists: ["Jörg Demus", "Amadeus-Quartett"],
        recordingPeriod: "1960s",
        description: "德穆斯和阿玛迪斯四重奏演奏舒曼钢琴五重奏和钢琴四重奏。"
    },
    {
        discNumber: 86,
        category: "Chamber Music",
        title: "Tchaikovsky: Souvenir de Florence & String Quartet No. 1",
        mainArtists: ["Borodin Quartet"],
        recordingPeriod: "1970s",
        description: "鲍罗丁四重奏演奏柴可夫斯基《佛罗伦萨回忆》和第1号弦乐四重奏。"
    },
    {
        discNumber: 87,
        category: "Chamber Music",
        title: "Webern: Complete Works for String Quartet",
        mainArtists: ["Lasalle Quartet"],
        recordingPeriod: "1970s",
        description: "拉萨尔四重奏演奏韦伯恩全部弦乐四重奏作品。"
    },
    {
        discNumber: 88,
        category: "Chamber Music",
        title: "Berg: Lyric Suite & String Quartet",
        mainArtists: ["Lasalle Quartet"],
        recordingPeriod: "1970s",
        description: "拉萨尔四重奏演奏贝尔格《抒情组曲》和《弦乐四重奏》。"
    },
    {
        discNumber: 89,
        category: "Chamber Music",
        title: "Bartók: String Quartets Nos. 1-6",
        mainArtists: ["Emerson String Quartet"],
        recordingPeriod: "1990s",
        description: "埃默森四重奏演奏巴托克第1-6号弦乐四重奏。"
    },
    {
        discNumber: 90,
        category: "Chamber Music",
        title: "Shostakovich: String Quartets Nos. 1-15",
        mainArtists: ["Borodin Quartet"],
        recordingPeriod: "1970s-1980s",
        description: "鲍罗丁四重奏演奏肖斯塔科维奇第1-15号弦乐四重奏。"
    },
    {
        discNumber: 91,
        category: "Chamber Music",
        title: "Prokofiev: String Quartets Nos. 1 & 2",
        mainArtists: ["Emerson String Quartet"],
        recordingPeriod: "1990s",
        description: "埃默森四重奏演奏普罗科菲耶夫第1和第2号弦乐四重奏。"
    },
    {
        discNumber: 92,
        category: "Chamber Music",
        title: "Ravel & Debussy: String Quartets",
        mainArtists: ["Hagen Quartett"],
        recordingPeriod: "1990s",
        description: "哈根四重奏演奏拉威尔和德彪西的弦乐四重奏。"
    },
    {
        discNumber: 93,
        category: "Chamber Music",
        title: "Schoenberg: String Quartets Nos. 1-4",
        mainArtists: ["Lasalle Quartet"],
        recordingPeriod: "1970s",
        description: "拉萨尔四重奏演奏勋伯格第1-4号弦乐四重奏。"
    },
    {
        discNumber: 94,
        category: "Chamber Music",
        title: "Janáček: String Quartets Nos. 1 & 2",
        mainArtists: ["Prague String Quartet"],
        recordingPeriod: "1970s",
        description: "布拉格四重奏演奏亚纳切克第1和第2号弦乐四重奏。"
    },
    {
        discNumber: 95,
        category: "Chamber Music",
        title: "Nielsen: String Quartets Nos. 1-4",
        mainArtists: ["Danish String Quartet"],
        recordingPeriod: "1970s",
        description: "丹麦四重奏演奏尼尔森第1-4号弦乐四重奏。"
    },
    {
        discNumber: 96,
        category: "Chamber Music",
        title: "Grieg: String Quartet & String Quartet in F",
        mainArtists: ["Grieg Trio"],
        recordingPeriod: "1980s",
        description: "格里格三重奏演奏格里格弦乐四重奏和F大调弦乐四重奏。"
    },
    {
        discNumber: 97,
        category: "Chamber Music",
        title: "Fauré: Piano Quartets & Piano Quintets",
        mainArtists: ["Jean-Philippe Collard", "Pascal Rogé", "Quatuor Via Nova"],
        recordingPeriod: "1980s",
        description: "科拉尔、罗热和新路四重奏演奏福雷钢琴四重奏和钢琴五重奏。"
    },
    {
        discNumber: 98,
        category: "Chamber Music",
        title: "Franck: Piano Quintet & Violin Sonata",
        mainArtists: ["Martha Argerich", "Gidon Kremer"],
        recordingPeriod: "1980s",
        description: "阿格里奇和克莱默演奏弗朗克钢琴五重奏和小提琴奏鸣曲。"
    },
    {
        discNumber: 99,
        category: "Chamber Music",
        title: "Brahms: Clarinet Quintet & Clarinet Trio",
        mainArtists: ["Karl Leister", "Jörg Demus", "Gerhard Bosse"],
        recordingPeriod: "1960s",
        description: "莱斯特、德穆斯和博塞演奏勃拉姆斯单簧管五重奏和单簧管三重奏。"
    },
    {
        discNumber: 100,
        category: "Chamber Music",
        title: "Mozart: Horn Quintet & Oboe Quartet",
        mainArtists: ["Dennis Brain", "Gervase de Peyer"],
        recordingPeriod: "1950s",
        description: "布雷恩和佩耶演奏莫扎特圆号五重奏和双簧管四重奏。"
    },
    {
        discNumber: 101,
        category: "Opera & Vocal",
        title: "Early Vocal Recordings (1905-1943)",
        mainArtists: ["Various Artists"],
        recordingPeriod: "1905-1943",
        description: "早期的声乐录音合集，收录了1905-1943年间录制的歌剧、艺术歌曲和宗教音乐作品。"
    },
    {
        discNumber: 102,
        category: "Opera & Vocal",
        title: "Mozart: Le Nozze di Figaro",
        mainArtists: ["Karl Böhm", "Wiener Philharmoniker", "Eberhard Wächter", "Elisabeth Schwarzkopf"],
        recordingPeriod: "1955",
        description: "伯姆指挥维也纳爱乐演绎莫扎特《费加罗的婚礼》，瓦赫特和施瓦茨科普夫主演。"
    },
    {
        discNumber: 103,
        category: "Opera & Vocal",
        title: "Beethoven: Fidelio",
        mainArtists: ["Wilhelm Furtwängler", "Wiener Philharmoniker", "Martha Mödl", "Wolfgang Windgassen"],
        recordingPeriod: "1953",
        description: "富特文格勒指挥维也纳爱乐演绎贝多芬《费德里奥》，默德尔和温德加森主演。"
    },
    {
        discNumber: 104,
        category: "Opera & Vocal",
        title: "Wagner: Tristan und Isolde",
        mainArtists: ["Wilhelm Furtwängler", "Royal Opera House Orchestra", "Kirsten Flagstad", "Ludwig Suthaus"],
        recordingPeriod: "1952",
        description: "富特文格勒指挥皇家歌剧院管弦乐团演绎瓦格纳《特里斯坦与伊索尔德》，弗拉格斯塔德和苏特豪斯主演。"
    },
    {
        discNumber: 105,
        category: "Opera & Vocal",
        title: "Verdi: La Traviata",
        mainArtists: ["Carlo Maria Giulini", "La Scala Orchestra", "Maria Callas", "Giuseppe Di Stefano"],
        recordingPeriod: "1955",
        description: "朱里尼指挥斯卡拉歌剧院管弦乐团演绎威尔第《茶花女》，卡拉斯和迪斯特凡诺主演。"
    },
    {
        discNumber: 106,
        category: "Opera & Vocal",
        title: "Puccini: Madama Butterfly",
        mainArtists: ["Herbert von Karajan", "La Scala Orchestra", "Maria Callas", "Nicola Filacuridi"],
        recordingPeriod: "1955",
        description: "卡拉扬指挥斯卡拉歌剧院管弦乐团演绎普契尼《蝴蝶夫人》，卡拉斯和菲拉库里迪主演。"
    },
    {
        discNumber: 107,
        category: "Opera & Vocal",
        title: "Strauss: Der Rosenkavalier",
        mainArtists: ["Herbert von Karajan", "Philharmonia Orchestra", "Elisabeth Schwarzkopf", "Christa Ludwig"],
        recordingPeriod: "1956",
        description: "卡拉扬指挥爱乐管弦乐团演绎施特劳斯《玫瑰骑士》，施瓦茨科普夫和路德维希主演。"
    },
    {
        discNumber: 108,
        category: "Opera & Vocal",
        title: "Bizet: Carmen",
        mainArtists: ["Rafael Frühbeck de Burgos", "Orchestre de Paris", "Teresa Berganza", "Plácido Domingo"],
        recordingPeriod: "1977",
        description: "弗吕贝克·德布尔戈斯指挥巴黎管弦乐团演绎比才《卡门》，贝尔甘萨和多明戈主演。"
    },
    {
        discNumber: 109,
        category: "Opera & Vocal",
        title: "Mozart: Die Zauberflöte",
        mainArtists: ["Karl Böhm", "Berliner Philharmoniker", "Fritz Wunderlich", "Evelyn Lear"],
        recordingPeriod: "1964",
        description: "伯姆指挥柏林爱乐演绎莫扎特《魔笛》，翁德里希和利尔主演。"
    },
    {
        discNumber: 110,
        category: "Opera & Vocal",
        title: "Wagner: Die Meistersinger von Nürnberg",
        mainArtists: ["Eugen Jochum", "Deutsche Oper Berlin Orchestra", "Dietrich Fischer-Dieskau", "Pilar Lorengar"],
        recordingPeriod: "1976",
        description: "约胡姆指挥柏林德意志歌剧院管弦乐团演绎瓦格纳《纽伦堡的名歌手》，菲舍尔-迪斯考和洛伦加尔主演。"
    },
    {
        discNumber: 111,
        category: "Opera & Vocal",
        title: "Schubert: Winterreise",
        mainArtists: ["Dietrich Fischer-Dieskau", "Gerald Moore"],
        recordingPeriod: "1972",
        description: "菲舍尔-迪斯考演唱舒伯特《冬之旅》，穆尔钢琴伴奏。"
    },
    {
        discNumber: 112,
        category: "Opera & Vocal",
        title: "Schumann: Dichterliebe",
        mainArtists: ["Fritz Wunderlich", "Hubert Giesen"],
        recordingPeriod: "1966",
        description: "翁德里希演唱舒曼《诗人之恋》，吉森钢琴伴奏。"
    },
    {
        discNumber: 113,
        category: "Opera & Vocal",
        title: "Brahms: Ein deutsches Requiem",
        mainArtists: ["Herbert von Karajan", "Wiener Philharmoniker", "Gundula Janowitz", "José van Dam"],
        recordingPeriod: "1977",
        description: "卡拉扬指挥维也纳爱乐演绎勃拉姆斯《德意志安魂曲》，亚诺维茨和范达姆主演。"
    },
    {
        discNumber: 114,
        category: "Opera & Vocal",
        title: "Bach: St Matthew Passion",
        mainArtists: ["Karl Richter", "Münchener Bach-Orchester", "Peter Schreier", "Dietrich Fischer-Dieskau"],
        recordingPeriod: "1979",
        description: "里希特指挥慕尼黑巴赫管弦乐团演绎巴赫《马太受难曲》，施赖尔和菲舍尔-迪斯考主演。"
    },
    {
        discNumber: 115,
        category: "Opera & Vocal",
        title: "Handel: Messiah",
        mainArtists: ["Karl Richter", "Münchener Bach-Orchester", "Edith Mathis", "Julia Hamari"],
        recordingPeriod: "1972",
        description: "里希特指挥慕尼黑巴赫管弦乐团演绎亨德尔《弥赛亚》，马蒂斯和哈马里主演。"
    },
    {
        discNumber: 116,
        category: "Opera & Vocal",
        title: "Mozart: Requiem",
        mainArtists: ["Karl Böhm", "Wiener Philharmoniker", "Edith Mathis", "Peter Schreier"],
        recordingPeriod: "1971",
        description: "伯姆指挥维也纳爱乐演绎莫扎特《安魂曲》，马蒂斯和施赖尔主演。"
    },
    {
        discNumber: 117,
        category: "Opera & Vocal",
        title: "Verdi: Requiem",
        mainArtists: ["Herbert von Karajan", "Berliner Philharmoniker", "Leontyne Price", "Luciano Pavarotti"],
        recordingPeriod: "1972",
        description: "卡拉扬指挥柏林爱乐演绎威尔第《安魂曲》，普赖斯和帕瓦罗蒂主演。"
    },
    {
        discNumber: 118,
        category: "Opera & Vocal",
        title: "Orff: Carmina Burana",
        mainArtists: ["Eugen Jochum", "Berliner Philharmoniker", "Gundula Janowitz", "Gerhard Stolze"],
        recordingPeriod: "1968",
        description: "约胡姆指挥柏林爱乐演绎奥尔夫《布兰诗歌》，亚诺维茨和施托尔策主演。"
    },
    {
        discNumber: 119,
        category: "Opera & Vocal",
        title: "Stravinsky: The Rite of Spring & The Firebird",
        mainArtists: ["Pierre Boulez", "The Cleveland Orchestra"],
        recordingPeriod: "1969",
        description: "布列兹指挥克利夫兰管弦乐团演绎斯特拉文斯基《春之祭》和《火鸟》。"
    },
    {
        discNumber: 120,
        category: "Opera & Vocal",
        title: "Prokofiev - Peter And The Wolf",
        mainArtists: ["Claudio Abbado", "The Chamber Orchestra Of Europe", "Sting"],
        recordingPeriod: "1986-1998",
        description: "阿巴多指挥欧洲室内乐学会演绎普罗科菲耶夫《彼得与狼》，斯汀旁白。"
    },
    {
        discNumber: 121,
        category: "Contemporary",
        title: "2018 And Beyond (Bonus CD)",
        mainArtists: ["Various Artists"],
        recordingPeriod: "2016-2018",
        description: "2018年及以后的特别CD，收录了拉赫玛尼诺夫、马勒、德沃夏克、肖斯塔科维奇等作曲家的作品选段，展示DG未来的录音计划。"
    }
]

// 验证专辑总数
console.log(`Total albums: ${dg120Albums.length}`);

// 全局变量
let filteredAlbums = [...dg120Albums];
let listenedAlbums = JSON.parse(localStorage.getItem('dg120ListenedAlbums')) || [];
let currentAlbum = null;

// DOM元素
const albumsList = document.getElementById('albumsList');
const categoryFilter = document.getElementById('categoryFilter');
const periodFilter = document.getElementById('periodFilter');
const statusFilter = document.getElementById('statusFilter');
const clearFiltersBtn = document.getElementById('clearFilters');
const resultsCount = document.getElementById('resultsCount');
const listenedCount = document.getElementById('listenedCount');
const listenedPercentage = document.getElementById('listenedPercentage');
const listenedAlbumsCount = document.getElementById('listenedAlbumsCount');
const listenedAlbumsList = document.getElementById('listenedAlbumsList');
const totalAlbums = document.getElementById('totalAlbums');
const totalDiscs = document.getElementById('totalDiscs');

// 模态框元素
const albumModal = document.getElementById('albumModal');
const closeModal = document.getElementById('closeModal');
const albumTitle = document.getElementById('albumTitle');
const albumDiscNumber = document.getElementById('albumDiscNumber');
const albumCategory = document.getElementById('albumCategory');
const albumArtists = document.getElementById('albumArtists');
const albumPeriod = document.getElementById('albumPeriod');
const albumStatus = document.getElementById('albumStatus');
const albumDescriptionText = document.getElementById('albumDescriptionText');
const listenInfo = document.getElementById('listenInfo');
const listenDate = document.getElementById('listenDate');
const personalRating = document.getElementById('personalRating');
const listenNotes = document.getElementById('listenNotes');
const markListenedBtn = document.getElementById('markListenedBtn');
const removeAlbumBtn = document.getElementById('removeAlbumBtn');

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    renderAlbums();
    updateStats();
    updateListenedAlbumsList();
    
    // 事件监听器
    if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
    if (periodFilter) periodFilter.addEventListener('change', applyFilters);
    if (statusFilter) statusFilter.addEventListener('change', applyFilters);
    if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', clearFilters);
    
    if (closeModal) closeModal.addEventListener('click', hideModal);
    if (albumModal) {
        albumModal.addEventListener('click', function(e) {
            if (e.target === albumModal) {
                hideModal();
            }
        });
    }
    
    if (markListenedBtn) markListenedBtn.addEventListener('click', toggleListenedStatus);
    if (removeAlbumBtn) removeAlbumBtn.addEventListener('click', removeFromListened);
});

// 核心功能函数

// 渲染专辑列表
function renderAlbums() {
    if (!albumsList) return;
    
    albumsList.innerHTML = '';
    
    filteredAlbums.forEach(album => {
        const isListened = listenedAlbums.some(listened => listened.discNumber === album.discNumber);
        
        const albumElement = document.createElement('div');
        albumElement.className = `album-item ${isListened ? 'listened' : ''}`;
        albumElement.onclick = () => showAlbumModal(album);
        
        const descriptionPreview = album.description.length > 100 
            ? album.description.substring(0, 100) + '...' 
            : album.description;
        
        albumElement.innerHTML = `
            <div class="album-disc-number">CD ${album.discNumber}</div>
            <div class="album-content">
                <div class="album-title">${album.title}</div>
                <div class="album-artists">${album.mainArtists.join(', ')}</div>
                <div class="album-meta">
                    <span class="album-category">${album.category}</span>
                    <span class="album-period">${album.recordingPeriod}</span>
                </div>
                <div class="album-description-preview">${descriptionPreview}</div>
            </div>
        `;
        
        albumsList.appendChild(albumElement);
    });
    
    if (resultsCount) {
        resultsCount.textContent = `${filteredAlbums.length} 张专辑`;
    }
}

// 应用筛选器
function applyFilters() {
    const categoryValue = categoryFilter ? categoryFilter.value : '';
    const periodValue = periodFilter ? periodFilter.value : '';
    const statusValue = statusFilter ? statusFilter.value : '';
    
    filteredAlbums = dg120Albums.filter(album => {
        const categoryMatch = !categoryValue || album.category === categoryValue;
        
        let periodMatch = true;
        if (periodValue) {
            const period = album.recordingPeriod;
            switch (periodValue) {
                case '1900s-1920s':
                    periodMatch = period.includes('190') || period.includes('191') || period.includes('192');
                    break;
                case '1930s-1940s':
                    periodMatch = period.includes('193') || period.includes('194');
                    break;
                case '1950s-1960s':
                    periodMatch = period.includes('195') || period.includes('196');
                    break;
                case '1970s-1980s':
                    periodMatch = period.includes('197') || period.includes('198');
                    break;
                case '1990s-2000s':
                    periodMatch = period.includes('199') || period.includes('200');
                    break;
                case '2010s-2020s':
                    periodMatch = period.includes('201') || period.includes('202');
                    break;
            }
        }
        
        let statusMatch = true;
        if (statusValue) {
            const isListened = listenedAlbums.some(listened => listened.discNumber === album.discNumber);
            statusMatch = (statusValue === 'listened' && isListened) || 
                         (statusValue === 'unlistened' && !isListened);
        }
        
        return categoryMatch && periodMatch && statusMatch;
    });
    
    renderAlbums();
}

// 清除筛选器
function clearFilters() {
    if (categoryFilter) categoryFilter.value = '';
    if (periodFilter) periodFilter.value = '';
    if (statusFilter) statusFilter.value = '';
    filteredAlbums = [...dg120Albums];
    renderAlbums();
}

// 显示专辑模态框
function showAlbumModal(album) {
    if (!albumModal) return;
    
    currentAlbum = album;
    const isListened = listenedAlbums.some(listened => listened.discNumber === album.discNumber);
    const listenedData = listenedAlbums.find(listened => listened.discNumber === album.discNumber);
    
    if (albumTitle) albumTitle.textContent = album.title;
    if (albumDiscNumber) albumDiscNumber.textContent = `CD ${album.discNumber}`;
    if (albumCategory) albumCategory.textContent = album.category;
    if (albumArtists) albumArtists.textContent = album.mainArtists.join(', ');
    if (albumPeriod) albumPeriod.textContent = album.recordingPeriod;
    if (albumStatus) albumStatus.textContent = isListened ? '已聆听' : '未聆听';
    if (albumDescriptionText) albumDescriptionText.textContent = album.description;
    
    if (isListened && listenedData) {
        if (listenInfo) listenInfo.style.display = 'block';
        if (listenDate) listenDate.value = listenedData.listenDate || '';
        if (personalRating) personalRating.value = listenedData.rating || '';
        if (listenNotes) listenNotes.value = listenedData.notes || '';
        if (markListenedBtn) markListenedBtn.textContent = '更新聆听信息';
        if (removeAlbumBtn) removeAlbumBtn.style.display = 'inline-block';
    } else {
        if (listenInfo) listenInfo.style.display = 'none';
        if (listenDate) listenDate.value = '';
        if (personalRating) personalRating.value = '';
        if (listenNotes) listenNotes.value = '';
        if (markListenedBtn) markListenedBtn.textContent = '标记为已聆听';
        if (removeAlbumBtn) removeAlbumBtn.style.display = 'none';
    }
    
    albumModal.classList.remove('hidden');
}

// 隐藏模态框
function hideModal() {
    if (albumModal) {
        albumModal.classList.add('hidden');
    }
    currentAlbum = null;
}

// 切换聆听状态
function toggleListenedStatus() {
    if (!currentAlbum) return;
    
    const existingIndex = listenedAlbums.findIndex(listened => listened.discNumber === currentAlbum.discNumber);
    
    if (existingIndex >= 0) {
        // 更新现有记录
        listenedAlbums[existingIndex] = {
            ...listenedAlbums[existingIndex],
            listenDate: listenDate ? listenDate.value : '',
            rating: personalRating && personalRating.value ? parseFloat(personalRating.value) : null,
            notes: listenNotes ? listenNotes.value : ''
        };
    } else {
        // 添加新记录
        const newListenedAlbum = {
            discNumber: currentAlbum.discNumber,
            title: currentAlbum.title,
            artists: currentAlbum.mainArtists.join(', '),
            listenDate: (listenDate && listenDate.value) || new Date().toISOString().split('T')[0],
            rating: personalRating && personalRating.value ? parseFloat(personalRating.value) : null,
            notes: listenNotes ? listenNotes.value : ''
        };
        
        listenedAlbums.push(newListenedAlbum);
        if (listenInfo) listenInfo.style.display = 'block';
        if (markListenedBtn) markListenedBtn.textContent = '更新聆听信息';
        if (removeAlbumBtn) removeAlbumBtn.style.display = 'inline-block';
    }
    
    localStorage.setItem('dg120ListenedAlbums', JSON.stringify(listenedAlbums));
    updateStats();
    updateListenedAlbumsList();
    renderAlbums();
    
    // 更新模态框状态显示
    if (albumStatus) albumStatus.textContent = '已聆听';
}

// 从已聆听列表中移除
function removeFromListened() {
    if (!currentAlbum) return;
    
    listenedAlbums = listenedAlbums.filter(listened => listened.discNumber !== currentAlbum.discNumber);
    localStorage.setItem('dg120ListenedAlbums', JSON.stringify(listenedAlbums));
    
    updateStats();
    updateListenedAlbumsList();
    renderAlbums();
    hideModal();
}

// 统计和数据管理功能

// 更新统计信息
function updateStats() {
    const totalCount = dg120Albums.length;
    const listenedCount_value = listenedAlbums.length;
    const percentage = totalCount > 0 ? Math.round((listenedCount_value / totalCount) * 100) : 0;
    
    if (listenedCount) listenedCount.textContent = listenedCount_value;
    if (listenedPercentage) listenedPercentage.textContent = `${percentage}%`;
    if (listenedAlbumsCount) listenedAlbumsCount.textContent = `${listenedCount_value}/${totalCount}`;
    if (totalAlbums) totalAlbums.textContent = totalCount;
    if (totalDiscs) totalDiscs.textContent = totalCount;
}

// 更新已聆听专辑列表
function updateListenedAlbumsList() {
    if (!listenedAlbumsList) return;
    
    listenedAlbumsList.innerHTML = '';
    
    listenedAlbums.forEach(listened => {
        const listItem = document.createElement('li');
        listItem.className = 'listened-item';
        
        listItem.innerHTML = `
            <div class="listened-info">
                <span class="listened-disc">CD ${listened.discNumber}</span>
                <span class="listened-title">${listened.title}</span>
                <span class="listened-date">${listened.listenDate || '未记录日期'}</span>
                <span class="listened-rating">${listened.rating ? '⭐'.repeat(listened.rating) : '未评分'}</span>
            </div>
        `;
        
        listenedAlbumsList.appendChild(listItem);
    });
}