// DG 120 Page JavaScript

// DG 120专辑数据 - 完整的121张CD，基于官方文档
const dg120Albums = [
    {
        discNumber: 1,
        category: "Orchestral",
        title: "Nikisch conducts Beethoven's 5th",
        mainArtists: ["Arthur Nikisch", "Berliner Philharmoniker"],
        recordingPeriod: "1913",
        description: "收录了音乐史上第一个重要的里程碑：亚瑟·尼基什指挥柏林爱乐乐团演绎的贝多芬第五交响曲。这是世界上首次对一部交响乐的完整录音，标志着录音技术从记录片段转向了完整呈现艺术作品。尼基什的演绎充满了浪漫主义的激情与弹性，为后世留下了无可估量的文献价值，是DG乃至整个录音史的伟大开端。"
    },
    {
        discNumber: 2,
        category: "Orchestral",
        title: "Strauss conducts his Alpine Symphony",
        mainArtists: ["Richard Strauss", "Orchester der Staatsoper Berlin"],
        recordingPeriod: "1924-1928",
        description: "作曲家理查·施特劳斯亲自指挥自己作品的珍贵历史录音。这张专辑的核心是他的《阿尔卑斯交响曲》选段，以及《唐璜》和《玫瑰骑士》组曲。作曲家本人的诠释具有无与伦比的权威性，让我们得以一窥他对自己宏大管弦乐作品的原始构想，是理解施特劳斯音乐的珍贵文献。"
    },
    {
        discNumber: 3,
        category: "Orchestral",
        title: "Pfitzner & Walter conduct German Romanticism",
        mainArtists: ["Hans Pfitzner", "Bruno Walter"],
        recordingPeriod: "1928-1935",
        description: "汇集了两位德奥指挥巨匠的早期录音。汉斯·普菲茨纳指挥的贝多芬和门德尔松展现了深厚的德国传统；而布鲁诺·瓦尔特棒下的莫扎特则以其温暖的人性光辉和歌唱性著称。这些录音捕捉了两次世界大战之间德国指挥艺术的黄金时代风貌。"
    },
    {
        discNumber: 4,
        category: "Orchestral",
        title: "Karajan's Early Recordings",
        mainArtists: ["Herbert von Karajan", "Orchestra del Maggio Musicale Fiorentino"],
        recordingPeriod: "1938-1943",
        description: "展示了指挥皇帝卡拉扬在DG的首次亮相。这些在二战期间录制的莫扎特、柴可夫斯基等作品，已经显露出他日后对音响平衡、线条流畅的极致追求。虽然是单声道录音，但其中蕴含的能量和精准度预示了一位未来大师的崛起。"
    },
    {
        discNumber: 5,
        category: "Orchestral",
        title: "Furtwängler conducts Beethoven",
        mainArtists: ["Wilhelm Furtwängler", "Berliner Philharmoniker"],
        recordingPeriod: "1947-1954",
        description: "富特文格勒指挥柏林爱乐乐团演绎贝多芬交响曲的传奇录音。他的指挥风格深刻而富有哲理，将贝多芬音乐的精神内核展现得淋漓尽致，是战后德国音乐文化重建的重要象征。"
    },
    {
        discNumber: 6,
        category: "Orchestral",
        title: "Fricsay conducts Bartók",
        mainArtists: ["Ferenc Fricsay", "RIAS-Symphonie-Orchester Berlin"],
        recordingPeriod: "1953-1958",
        description: "匈牙利指挥家弗里乔伊对同胞作曲家巴托克作品的权威诠释。他的指挥充满了东欧音乐的激情与野性，完美呈现了巴托克音乐中的民族色彩和现代技法。"
    },
    {
        discNumber: 7,
        category: "Orchestral",
        title: "Karajan conducts Beethoven Symphonies",
        mainArtists: ["Herbert von Karajan", "Berliner Philharmoniker"],
        recordingPeriod: "1961-1962",
        description: "卡拉扬与柏林爱乐合作的第一套贝多芬交响曲全集，标志着DG立体声时代的辉煌开端。这套录音以其完美的音响平衡和精致的细节处理而闻名。"
    },
    {
        discNumber: 8,
        category: "Piano",
        title: "Kempff plays Beethoven Sonatas",
        mainArtists: ["Wilhelm Kempff"],
        recordingPeriod: "1951-1956",
        description: "德国钢琴大师肯普夫演奏贝多芬钢琴奏鸣曲的经典录音。他的演奏风格朴实无华，却蕴含着深刻的音乐洞察力，被誉为最接近贝多芬本意的诠释。"
    },
    {
        discNumber: 9,
        category: "Piano",
        title: "Gulda plays Mozart Concertos",
        mainArtists: ["Friedrich Gulda", "Wiener Philharmoniker"],
        recordingPeriod: "1958-1962",
        description: "奥地利钢琴家古尔达演奏莫扎特钢琴协奏曲的里程碑式录音。他将古典主义的优雅与现代的活力完美结合，为莫扎特音乐注入了新的生命力。"
    },
    {
        discNumber: 10,
        category: "Piano",
        title: "Pollini plays Chopin",
        mainArtists: ["Maurizio Pollini"],
        recordingPeriod: "1960-1975",
        description: "意大利钢琴家波里尼演奏肖邦作品的权威录音。他以其无懈可击的技巧和深刻的音乐理解，将肖邦音乐的诗意与激情展现得淋漓尽致。"
    },
    {
        discNumber: 11,
        category: "Violin",
        title: "Schneiderhan plays Mozart Concertos",
        mainArtists: ["Wolfgang Schneiderhan", "Berliner Philharmoniker"],
        recordingPeriod: "1954-1957",
        description: "奥地利小提琴家施奈德汉演奏莫扎特小提琴协奏曲的经典版本。他的演奏风格典雅纯净，完美体现了维也纳古典主义的精髓。"
    },
    {
        discNumber: 12,
        category: "Violin",
        title: "Ferras plays Bach & Brahms",
        mainArtists: ["Christian Ferras", "Pierre Barbizet"],
        recordingPeriod: "1960-1965",
        description: "法国小提琴家费拉斯演奏巴赫和勃拉姆斯作品的珍贵录音。他的演奏充满了法式的优雅与细腻，展现了不同于德奥传统的独特魅力。"
    },
    {
        discNumber: 13,
        category: "Chamber",
        title: "Amadeus Quartet plays Beethoven",
        mainArtists: ["Amadeus Quartet"],
        recordingPeriod: "1959-1962",
        description: "阿玛迪斯四重奏团演奏贝多芬弦乐四重奏的传奇录音。这个由奥地利音乐家组成的四重奏团，以其完美的合奏和深刻的音乐理解而享誉世界。"
    },
    {
        discNumber: 14,
        category: "Chamber",
        title: "Kempff & Fournier: Beethoven Sonatas",
        mainArtists: ["Wilhelm Kempff", "Pierre Fournier"],
        recordingPeriod: "1965",
        description: "钢琴家肯普夫与大提琴家富尼埃合作的贝多芬大提琴奏鸣曲全集。两位大师的合作珠联璧合，创造了室内乐录音史上的经典。"
    },
    {
        discNumber: 15,
        category: "Opera",
        title: "Mozart: Don Giovanni (Böhm)",
        mainArtists: ["Karl Böhm", "Deutsche Oper Berlin"],
        recordingPeriod: "1967",
        description: "指挥大师伯姆指挥的莫扎特《唐璜》，是DG歌剧录音的里程碑。这个版本汇集了当时最优秀的莫扎特歌唱家，展现了德奥歌剧传统的精髓。"
    },
    {
        discNumber: 16,
        category: "Opera",
        title: "Wagner: Der Ring des Nibelungen (Böhm)",
        mainArtists: ["Karl Böhm", "Bayreuther Festspiele"],
        recordingPeriod: "1966-1967",
        description: "伯姆指挥的拜罗伊特《尼伯龙根的指环》现场录音，是瓦格纳歌剧录音史上的传奇。这套录音完整记录了拜罗伊特音乐节的辉煌传统。"
    },
    {
        discNumber: 17,
        category: "Opera",
        title: "Verdi: La traviata (Karajan)",
        mainArtists: ["Herbert von Karajan", "Mirella Freni", "Franco Bonisolli"],
        recordingPeriod: "1979",
        description: "卡拉扬指挥的威尔第《茶花女》，展现了他对意大利歌剧的深刻理解。女高音弗雷尼的演唱充满了真挚的情感，是这部歌剧的经典版本之一。"
    },
    {
        discNumber: 18,
        category: "Opera",
        title: "Puccini: La bohème (Karajan)",
        mainArtists: ["Herbert von Karajan", "Mirella Freni", "Luciano Pavarotti"],
        recordingPeriod: "1972",
        description: "卡拉扬指挥的普契尼《波希米亚人》，汇集了弗雷尼、帕瓦罗蒂等歌剧巨星。这个版本将普契尼音乐的抒情美和戏剧性完美结合。"
    },
    {
        discNumber: 19,
        category: "Opera",
        title: "Mozart: Le nozze di Figaro (Böhm)",
        mainArtists: ["Karl Böhm", "Deutsche Oper Berlin"],
        recordingPeriod: "1968",
        description: "伯姆指挥的莫扎特《费加罗的婚礼》，是莫扎特歌剧录音的标杆之作。这个版本以其完美的戏剧节奏和精湛的演唱而著称。"
    },
    {
        discNumber: 20,
        category: "Opera",
        title: "Wagner: Tristan und Isolde (Böhm)",
        mainArtists: ["Karl Böhm", "Bayreuther Festspiele"],
        recordingPeriod: "1966",
        description: "伯姆指挥的瓦格纳《特里斯坦与伊索尔德》拜罗伊特现场录音，是这部伟大爱情悲剧的权威版本。录音捕捉了拜罗伊特独特的音响效果。"
    },
    {
        discNumber: 21,
        category: "Orchestral",
        title: "Jochum conducts Bruckner",
        mainArtists: ["Eugen Jochum", "Berliner Philharmoniker"],
        recordingPeriod: "1965-1967",
        description: "德国指挥家约胡姆是布鲁克纳音乐的权威诠释者。他指挥的布鲁克纳交响曲以其深刻的宗教情怀和宏大的建筑感而著称。"
    },
    {
        discNumber: 22,
        category: "Orchestral",
        title: "Karajan conducts Brahms Symphonies",
        mainArtists: ["Herbert von Karajan", "Berliner Philharmoniker"],
        recordingPeriod: "1963-1964",
        description: "卡拉扬指挥的勃拉姆斯交响曲全集，展现了他对德国浪漫主义音乐的深刻理解。这套录音以其丰富的音色层次和完美的结构感而闻名。"
    },
    {
        discNumber: 23,
        category: "Orchestral",
        title: "Böhm conducts Mozart Symphonies",
        mainArtists: ["Karl Böhm", "Berliner Philharmoniker"],
        recordingPeriod: "1959-1966",
        description: "伯姆指挥的莫扎特交响曲，是古典主义音乐演绎的典范。他的指挥风格严谨而富有表现力，完美呈现了莫扎特音乐的结构美。"
    },
    {
        discNumber: 24,
        category: "Piano",
        title: "Michelangeli plays Debussy",
        mainArtists: ["Arturo Benedetti Michelangeli"],
        recordingPeriod: "1971",
        description: "意大利钢琴大师米凯兰杰利演奏德彪西作品的传奇录音。他以其无与伦比的音色控制和细腻的触键，将印象派音乐的色彩美展现得淋漓尽致。"
    },
    {
        discNumber: 25,
        category: "Piano",
        title: "Argerich plays Chopin & Liszt",
        mainArtists: ["Martha Argerich"],
        recordingPeriod: "1975",
        description: "阿根廷钢琴家阿格里奇演奏肖邦和李斯特作品的经典录音。她的演奏充满了南美的激情与火焰，为浪漫主义音乐注入了新的活力。"
    },
    {
        discNumber: 26,
        category: "Violin",
        title: "Milstein plays Bach",
        mainArtists: ["Nathan Milstein"],
        recordingPeriod: "1973-1975",
        description: "俄裔美籍小提琴家米尔斯坦演奏巴赫无伴奏小提琴作品的权威录音。他的演奏技巧完美，音乐理解深刻，是这套作品的经典诠释。"
    },
    {
        discNumber: 27,
        category: "Violin",
        title: "Accardo plays Paganini",
        mainArtists: ["Salvatore Accardo"],
        recordingPeriod: "1977",
        description: "意大利小提琴家阿卡多演奏帕格尼尼作品的精彩录音。作为帕格尼尼的同胞，阿卡多完美掌握了这些技巧性作品的精髓。"
    },
    {
        discNumber: 28,
        category: "Chamber",
        title: "Melos Quartet plays Schubert",
        mainArtists: ["Melos Quartet"],
        recordingPeriod: "1975-1978",
        description: "梅洛斯四重奏团演奏舒伯特弦乐四重奏的经典录音。这个德国四重奏团以其精湛的技艺和深刻的音乐理解而享誉国际。"
    },
    {
        discNumber: 29,
        category: "Chamber",
        title: "Beaux Arts Trio plays Beethoven",
        mainArtists: ["Beaux Arts Trio"],
        recordingPeriod: "1965-1970",
        description: "美艺三重奏团演奏贝多芬钢琴三重奏的权威录音。这个国际化的室内乐团以其完美的合奏和深刻的音乐洞察力而著称。"
    },
    {
        discNumber: 30,
        category: "Orchestral",
        title: "Kubelík conducts Dvořák",
        mainArtists: ["Rafael Kubelík", "Berliner Philharmoniker"],
        recordingPeriod: "1966-1972",
        description: "捷克指挥家库贝利克指挥德沃夏克交响曲全集，是这位波希米亚作曲家作品的权威诠释。库贝利克完美呈现了德沃夏克音乐中的民族色彩。"
    },
    {
        discNumber: 31,
        category: "Orchestral",
        title: "Sinopoli conducts Mahler",
        mainArtists: ["Giuseppe Sinopoli", "Philharmonia Orchestra"],
        recordingPeriod: "1984-1991",
        description: "意大利指挥家西诺波利指挥的马勒交响曲，以其独特的诠释角度和深刻的心理分析而著称。他将马勒音乐的复杂性和矛盾性展现得淋漓尽致。"
    },
    {
        discNumber: 32,
        category: "Piano",
        title: "Zimerman plays Brahms Concertos",
        mainArtists: ["Krystian Zimerman", "Leonard Bernstein", "Wiener Philharmoniker"],
        recordingPeriod: "1983",
        description: "波兰钢琴家齐默尔曼与伯恩斯坦合作的勃拉姆斯钢琴协奏曲，是这两部作品的经典版本。齐默尔曼的技巧与伯恩斯坦的指挥相得益彰。"
    },
    {
        discNumber: 33,
        category: "Piano",
        title: "Anda plays Mozart Concertos",
        mainArtists: ["Géza Anda", "Camerata Academica Salzburg"],
        recordingPeriod: "1961-1969",
        description: "匈牙利钢琴家安达演奏并指挥的莫扎特钢琴协奏曲全集，是这套作品的权威版本。安达对莫扎特音乐的理解深刻而纯正。"
    },
    {
        discNumber: 34,
        category: "Violin",
        title: "Kremer plays Berg & Stravinsky",
        mainArtists: ["Gidon Kremer", "Claudio Abbado", "Boston Symphony Orchestra"],
        recordingPeriod: "1980",
        description: "拉脱维亚小提琴家克莱默演奏贝尔格和斯特拉文斯基小提琴协奏曲的经典录音。他的演奏充满了现代音乐的表现力和技巧性。"
    },
    {
        discNumber: 35,
        category: "Chamber",
        title: "Hagen Quartet plays Brahms",
        mainArtists: ["Hagen Quartet"],
        recordingPeriod: "1988-1990",
        description: "哈根四重奏团演奏勃拉姆斯弦乐四重奏的精彩录音。这个奥地利四重奏团以其精湛的技艺和深刻的音乐理解而备受推崇。"
    },
    {
        discNumber: 36,
        category: "Opera",
        title: "Strauss: Der Rosenkavalier (Karajan)",
        mainArtists: ["Herbert von Karajan", "Elisabeth Schwarzkopf", "Christa Ludwig"],
        recordingPeriod: "1956",
        description: "卡拉扬指挥的理查·施特劳斯《玫瑰骑士》，汇集了施瓦茨科普夫、路德维希等歌剧巨星。这个版本被誉为这部歌剧的经典诠释。"
    },
    {
        discNumber: 37,
        category: "Opera",
        title: "Mozart: Die Zauberflöte (Böhm)",
        mainArtists: ["Karl Böhm", "Berliner Philharmoniker"],
        recordingPeriod: "1964",
        description: "伯姆指挥的莫扎特《魔笛》，是这部德语歌剧的权威版本。录音完美呈现了这部歌剧的童话色彩和深刻寓意。"
    },
    {
        discNumber: 38,
        category: "Orchestral",
        title: "Abbado conducts Rossini Overtures",
        mainArtists: ["Claudio Abbado", "London Symphony Orchestra"],
        recordingPeriod: "1971",
        description: "意大利指挥家阿巴多指挥的罗西尼歌剧序曲集，充满了意大利音乐的活力与优雅。阿巴多完美呈现了罗西尼音乐的机智与幽默。"
    },
    {
        discNumber: 39,
        category: "Orchestral",
        title: "Levine conducts Wagner Orchestral Music",
        mainArtists: ["James Levine", "Metropolitan Opera Orchestra"],
        recordingPeriod: "1987",
        description: "美国指挥家莱文指挥的瓦格纳管弦乐作品集，展现了他对瓦格纳音乐的深刻理解。录音充满了戏剧性的张力和丰富的音色层次。"
    },
    {
        discNumber: 40,
        category: "Piano",
        title: "Barenboim plays Beethoven Sonatas",
        mainArtists: ["Daniel Barenboim"],
        recordingPeriod: "1967-1969",
        description: "以色列钢琴家巴伦博伊姆演奏贝多芬钢琴奏鸣曲的早期录音。他的演奏充满了青春的活力和深刻的音乐洞察力。"
    },
    {
        discNumber: 41,
        category: "Piano",
        title: "Richter plays Schubert",
        mainArtists: ["Sviatoslav Richter"],
        recordingPeriod: "1979",
        description: "苏联钢琴大师里赫特演奏舒伯特作品的珍贵录音。他的演奏风格深沉内敛，完美呈现了舒伯特音乐的内在美。"
    },
    {
        discNumber: 42,
        category: "Violin",
        title: "Mutter plays Mozart Concertos",
        mainArtists: ["Anne-Sophie Mutter", "Herbert von Karajan", "Berliner Philharmoniker"],
        recordingPeriod: "1978",
        description: "德国小提琴家穆特与卡拉扬合作的莫扎特小提琴协奏曲，记录了这位小提琴天才的早期辉煌。穆特的演奏技巧精湛，音乐感悟深刻。"
    },
    {
        discNumber: 43,
        category: "Violin",
        title: "Perlman plays Brahms & Tchaikovsky",
        mainArtists: ["Itzhak Perlman", "Daniel Barenboim", "Berliner Philharmoniker"],
        recordingPeriod: "1980",
        description: "以色列小提琴家帕尔曼演奏勃拉姆斯和柴可夫斯基小提琴协奏曲的经典录音。他的演奏充满了激情与技巧的完美结合。"
    },
    {
        discNumber: 44,
        category: "Chamber",
        title: "Rostropovich & Richter: Brahms Sonatas",
        mainArtists: ["Mstislav Rostropovich", "Sviatoslav Richter"],
        recordingPeriod: "1963",
        description: "大提琴家罗斯特罗波维奇与钢琴家里赫特合作的勃拉姆斯大提琴奏鸣曲，是室内乐录音史上的传奇。两位苏联音乐家的合作珠联璧合。"
    },
    {
        discNumber: 45,
        category: "Chamber",
        title: "Emerson String Quartet plays Bartók",
        mainArtists: ["Emerson String Quartet"],
        recordingPeriod: "1988",
        description: "埃默森弦乐四重奏团演奏巴托克弦乐四重奏全集的精彩录音。这个美国四重奏团以其现代的演奏风格和精湛的技艺而著称。"
    },
    {
        discNumber: 46,
        category: "Opera",
        title: "Puccini: Tosca (Karajan)",
        mainArtists: ["Herbert von Karajan", "Leontyne Price", "Giuseppe di Stefano"],
        recordingPeriod: "1962",
        description: "卡拉扬指挥的普契尼《托斯卡》，汇集了普莱斯、迪·斯特法诺等歌剧明星。这个版本完美呈现了普契尼歌剧的戏剧性和抒情美。"
    },
    {
        discNumber: 47,
        category: "Opera",
        title: "Verdi: Aida (Karajan)",
        mainArtists: ["Herbert von Karajan", "Leontyne Price", "Jon Vickers"],
        recordingPeriod: "1979",
        description: "卡拉扬指挥的威尔第《阿依达》，是这部宏大歌剧的经典版本。录音展现了威尔第歌剧的壮丽场面和深刻的人性刻画。"
    },
    {
        discNumber: 48,
        category: "Orchestral",
        title: "Bernstein conducts Mahler Symphony No. 2",
        mainArtists: ["Leonard Bernstein", "New York Philharmonic"],
        recordingPeriod: "1973",
        description: "伯恩斯坦指挥的马勒第二交响曲《复活》，是这部作品的权威版本。伯恩斯坦对马勒音乐的理解深刻而富有激情。"
    },
    {
        discNumber: 49,
        category: "Orchestral",
        title: "Giulini conducts Verdi Requiem",
        mainArtists: ["Carlo Maria Giulini", "Philharmonia Orchestra"],
        recordingPeriod: "1964",
        description: "意大利指挥家朱里尼指挥的威尔第《安魂曲》早期录音，是这部作品的经典版本。朱里尼的指挥充满了意大利式的激情与虔诚。"
    },
    {
        discNumber: 50,
        category: "Piano",
        title: "Horowitz plays Rachmaninoff",
        mainArtists: ["Vladimir Horowitz"],
        recordingPeriod: "1978",
        description: "俄裔美籍钢琴大师霍洛维茨演奏拉赫玛尼诺夫作品的传奇录音。他的演奏技巧辉煌，情感真挚，完美呈现了俄罗斯音乐的深度。"
    },
    {
        discNumber: 51,
        category: "Piano",
        title: "Ashkenazy plays Chopin",
        mainArtists: ["Vladimir Ashkenazy"],
        recordingPeriod: "1975-1977",
        description: "俄裔钢琴家阿什肯纳齐演奏肖邦作品的精彩录音。他的演奏风格优雅而富有诗意，完美呈现了肖邦音乐的浪漫情怀。"
    },
    {
        discNumber: 52,
        category: "Violin",
        title: "Oistrakh plays Brahms Concerto",
        mainArtists: ["David Oistrakh", "George Szell", "Cleveland Orchestra"],
        recordingPeriod: "1969",
        description: "苏联小提琴大师奥伊斯特拉赫与塞尔合作的勃拉姆斯小提琴协奏曲，是这部作品的权威版本。奥伊斯特拉赫的演奏技巧完美，音乐理解深刻。"
    },
    {
        discNumber: 53,
        category: "Chamber",
        title: "Trio di Trieste plays Brahms",
        mainArtists: ["Trio di Trieste"],
        recordingPeriod: "1968",
        description: "的里雅斯特三重奏团演奏勃拉姆斯钢琴三重奏的经典录音。这个意大利室内乐团以其精湛的技艺和深刻的音乐理解而享誉国际。"
    },
    {
        discNumber: 54,
        category: "Opera",
        title: "Wagner: Parsifal (Knappertsbusch)",
        mainArtists: ["Hans Knappertsbusch", "Bayreuther Festspiele"],
        recordingPeriod: "1962",
        description: "克纳佩茨布什指挥的瓦格纳《帕西法尔》拜罗伊特现场录音，是这部神圣舞台剧的权威版本。录音完美呈现了拜罗伊特的神圣氛围。"
    },
    {
        discNumber: 55,
        category: "Orchestral",
        title: "Maazel conducts Ravel",
        mainArtists: ["Lorin Maazel", "Orchestre de Paris"],
        recordingPeriod: "1975",
        description: "美国指挥家马泽尔指挥的拉威尔管弦乐作品集，展现了法国印象派音乐的精致与色彩。马泽尔完美呈现了拉威尔音乐的细腻美感。"
    },
    {
        discNumber: 56,
        category: "Piano",
        title: "Brendel plays Schubert Sonatas",
        mainArtists: ["Alfred Brendel"],
        recordingPeriod: "1987-1988",
        description: "奥地利钢琴家布伦德尔演奏舒伯特钢琴奏鸣曲的经典录音。他的演奏风格内敛而深刻，完美呈现了舒伯特音乐的内在美。"
    },
    {
        discNumber: 57,
        category: "Violin",
        title: "Menuhin plays Bach Partitas",
        mainArtists: ["Yehudi Menuhin"],
        recordingPeriod: "1973",
        description: "美籍小提琴大师梅纽因演奏巴赫无伴奏小提琴组曲的权威录音。他的演奏充满了深刻的音乐洞察力和精湛的技艺。"
    },
    {
        discNumber: 58,
        category: "Chamber",
        title: "Quartetto Italiano plays Debussy & Ravel",
        mainArtists: ["Quartetto Italiano"],
        recordingPeriod: "1974",
        description: "意大利四重奏团演奏德彪西和拉威尔弦乐四重奏的精彩录音。这个意大利四重奏团以其精致的演奏风格和深刻的音乐理解而著称。"
    },
    {
        discNumber: 59,
        category: "Opera",
        title: "Mozart: Così fan tutte (Böhm)",
        mainArtists: ["Karl Böhm", "Wiener Philharmoniker"],
        recordingPeriod: "1974",
        description: "伯姆指挥的莫扎特《女人心》，是这部喜歌剧的经典版本。录音完美呈现了莫扎特歌剧的机智幽默和深刻的人性洞察。"
    },
    {
        discNumber: 60,
        category: "Orchestral",
        title: "Thielemann conducts Bruckner",
        mainArtists: ["Christian Thielemann", "Wiener Philharmoniker"],
        recordingPeriod: "2002-2012",
        description: "德国指挥家蒂勒曼指挥的布鲁克纳交响曲，展现了新一代指挥家对德奥音乐传统的继承与发展。他的指挥风格宏大而深刻。"
    },
    {
        discNumber: 61,
        category: "Piano",
        title: "Gilels plays Beethoven Concertos",
        mainArtists: ["Emil Gilels", "George Szell", "Cleveland Orchestra"],
        recordingPeriod: "1968",
        description: "苏联钢琴大师吉列尔斯与塞尔合作的贝多芬钢琴协奏曲，是这些作品的权威版本。吉列尔斯的演奏技巧完美，音乐理解深刻。"
    },
    {
        discNumber: 62,
        category: "Violin",
        title: "Shaham plays Brahms & Bruch",
        mainArtists: ["Gil Shaham", "Giuseppe Sinopoli", "New York Philharmonic"],
        recordingPeriod: "1992",
        description: "以色列小提琴家沙汉姆演奏勃拉姆斯和布鲁赫小提琴协奏曲的精彩录音。他的演奏充满了现代的技巧性和深刻的音乐理解。"
    },
    {
        discNumber: 63,
        category: "Chamber",
        title: "Alban Berg Quartet plays Schoenberg",
        mainArtists: ["Alban Berg Quartet"],
        recordingPeriod: "1971",
        description: "阿尔班·贝尔格四重奏团演奏勋伯格弦乐四重奏的权威录音。这个奥地利四重奏团是现代音乐演绎的专家，完美呈现了勋伯格音乐的复杂性。"
    },
    {
        discNumber: 64,
        category: "Opera",
        title: "Strauss: Elektra (Böhm)",
        mainArtists: ["Karl Böhm", "Birgit Nilsson", "Wiener Philharmoniker"],
        recordingPeriod: "1967",
        description: "伯姆指挥的理查·施特劳斯《厄勒克特拉》，汇集了尼尔松等歌剧巨星。这个版本完美呈现了这部表现主义歌剧的强烈戏剧性。"
    },
    {
        discNumber: 65,
        category: "Orchestral",
        title: "Karajan conducts Sibelius Symphonies",
        mainArtists: ["Herbert von Karajan", "Berliner Philharmoniker"],
        recordingPeriod: "1976-1981",
        description: "卡拉扬指挥的西贝柳斯交响曲全集，展现了他对北欧音乐的独特理解。录音完美呈现了西贝柳斯音乐的自然美和民族色彩。"
    },
    {
        discNumber: 66,
        category: "Piano",
        title: "Perahia plays Mozart Concertos",
        mainArtists: ["Murray Perahia", "English Chamber Orchestra"],
        recordingPeriod: "1975-1984",
        description: "美国钢琴家佩拉希亚演奏并指挥的莫扎特钢琴协奏曲，是这套作品的经典版本。佩拉希亚对莫扎特音乐的理解纯正而深刻。"
    },
    {
        discNumber: 67,
        category: "Violin",
        title: "Zukerman plays Vivaldi Four Seasons",
        mainArtists: ["Pinchas Zukerman", "English Chamber Orchestra"],
        recordingPeriod: "1973",
        description: "以色列小提琴家祖克曼演奏维瓦尔第《四季》的经典录音。他的演奏风格现代而富有活力，为这部巴洛克名作注入了新的生命力。"
    },
    {
        discNumber: 68,
        category: "Chamber",
        title: "La Salle Quartet plays Zemlinsky",
        mainArtists: ["LaSalle Quartet"],
        recordingPeriod: "1979",
        description: "拉萨尔四重奏团演奏策姆林斯基弦乐四重奏的珍贵录音。这个美国四重奏团专门致力于现代音乐的演绎，为这位被遗忘的作曲家正名。"
    },
    {
        discNumber: 69,
        category: "Opera",
        title: "Berg: Wozzeck (Böhm)",
        mainArtists: ["Karl Böhm", "Dietrich Fischer-Dieskau", "Wiener Philharmoniker"],
        recordingPeriod: "1965",
        description: "伯姆指挥的贝尔格《沃采克》，是这部表现主义歌剧的权威版本。菲舍尔-迪斯考的演唱充满了深刻的戏剧性和心理刻画。"
    },
    {
        discNumber: 70,
        category: "Orchestral",
        title: "Boulez conducts Stravinsky",
        mainArtists: ["Pierre Boulez", "Cleveland Orchestra"],
        recordingPeriod: "1969",
        description: "法国指挥家布列兹指挥的斯特拉文斯基作品集，展现了他对现代音乐的深刻理解。录音完美呈现了斯特拉文斯基音乐的节奏活力和色彩变化。"
    },
    {
        discNumber: 71,
        category: "Piano",
        title: "Kempff plays Schumann",
        mainArtists: ["Wilhelm Kempff"],
        recordingPeriod: "1967",
        description: "德国钢琴大师肯普夫演奏舒曼作品的经典录音。他的演奏风格朴实而深刻，完美呈现了舒曼音乐的浪漫情怀和内在美。"
    },
    {
        discNumber: 72,
        category: "Violin",
        title: "Stern plays Brahms Sonatas",
        mainArtists: ["Isaac Stern", "Eugene Istomin"],
        recordingPeriod: "1970",
        description: "美国小提琴家斯特恩与钢琴家伊斯托明合作的勃拉姆斯小提琴奏鸣曲全集，是这套作品的经典版本。两位音乐家的合作珠联璧合。"
    },
    {
        discNumber: 73,
        category: "Chamber",
        title: "Borodin Quartet plays Shostakovich",
        mainArtists: ["Borodin Quartet"],
        recordingPeriod: "1962-1987",
        description: "鲍罗丁四重奏团演奏肖斯塔科维奇弦乐四重奏全集的权威录音。这个苏联四重奏团与作曲家本人有着密切的合作关系，演绎最为权威。"
    },
    {
        discNumber: 74,
        category: "Opera",
        title: "Janáček: Jenůfa (Mackerras)",
        mainArtists: ["Charles Mackerras", "Elisabeth Söderström", "Wiener Philharmoniker"],
        recordingPeriod: "1982",
        description: "英国指挥家马克拉斯指挥的雅纳切克《耶努法》，是这部捷克歌剧的权威版本。录音完美呈现了雅纳切克音乐的民族色彩和现代性。"
    },
    {
        discNumber: 75,
        category: "Orchestral",
        title: "Ozawa conducts Takemitsu",
        mainArtists: ["Seiji Ozawa", "Boston Symphony Orchestra"],
        recordingPeriod: "1977",
        description: "日本指挥家小泽征尔指挥的武满彻作品集，展现了日本现代音乐的独特魅力。小泽征尔完美呈现了武满彻音乐的东方美学和现代技法。"
    },
    {
        discNumber: 76,
        category: "Piano",
        title: "Pogorelich plays Chopin",
        mainArtists: ["Ivo Pogorelich"],
        recordingPeriod: "1981",
        description: "克罗地亚钢琴家波格雷里奇演奏肖邦作品的独特录音。他的演奏风格极具个性，为肖邦音乐带来了全新的诠释角度。"
    },
    {
        discNumber: 77,
        category: "Violin",
        title: "Chung plays Tchaikovsky & Sibelius",
        mainArtists: ["Kyung-Wha Chung", "André Previn", "London Symphony Orchestra"],
        recordingPeriod: "1970",
        description: "韩国小提琴家郑京和演奏柴可夫斯基和西贝柳斯小提琴协奏曲的经典录音。她的演奏充满了东方的细腻和西方的激情。"
    },
    {
        discNumber: 78,
        category: "Chamber",
        title: "Juilliard Quartet plays Carter",
        mainArtists: ["Juilliard String Quartet"],
        recordingPeriod: "1986",
        description: "茱莉亚四重奏团演奏卡特弦乐四重奏的权威录音。这个美国四重奏团是现代音乐演绎的专家，完美呈现了卡特音乐的复杂性和创新性。"
    },
    {
        discNumber: 79,
        category: "Opera",
        title: "Britten: Peter Grimes (Davis)",
        mainArtists: ["Colin Davis", "Jon Vickers", "Covent Garden Opera"],
        recordingPeriod: "1978",
        description: "英国指挥家戴维斯指挥的布里顿《彼得·格赖姆斯》，是这部英国歌剧的权威版本。录音完美呈现了布里顿音乐的戏剧性和英国特色。"
    },
    {
        discNumber: 80,
        category: "Orchestral",
        title: "Rattle conducts Mahler Symphony No. 5",
        mainArtists: ["Simon Rattle", "City of Birmingham Symphony Orchestra"],
        recordingPeriod: "1987",
        description: "英国指挥家拉特尔指挥的马勒第五交响曲，展现了新一代指挥家对马勒音乐的现代理解。录音充满了活力和深刻的音乐洞察力。"
    },
    {
        discNumber: 81,
        category: "Piano",
        title: "Lupu plays Brahms",
        mainArtists: ["Radu Lupu"],
        recordingPeriod: "1986",
        description: "罗马尼亚钢琴家卢普演奏勃拉姆斯作品的精彩录音。他的演奏风格内敛而深刻，完美呈现了勃拉姆斯音乐的哲理性和抒情美。"
    },
    {
        discNumber: 82,
        category: "Chamber",
        title: "Takács Quartet plays Janáček",
        mainArtists: ["Takács Quartet"],
        recordingPeriod: "1993",
        description: "塔卡什四重奏团演奏雅纳切克弦乐四重奏的权威录音。这个匈牙利四重奏团对东欧音乐有着深刻的理解，完美呈现了雅纳切克音乐的民族特色。"
    },
    {
        discNumber: 83,
        category: "Opera",
        title: "威尔第：茶花女（克莱伯指挥）",
        mainArtists: ["Carlos Kleiber", "Ileana Cotrubaș", "Plácido Domingo", "Bayerisches Staatsorchester"],
        recordingPeriod: "1976-1977",
        description: "被无数乐迷和评论家奉为歌剧录音史上'圣经'的《茶花女》版本。克莱伯的指挥充满了戏剧的紧迫感和抒情的呼吸感，每一个细节都经过精心雕琢。女高音科特鲁巴斯和男高音多明戈的演唱充满了情感的真实性，共同造就了一部充满生命力的歌剧录音杰作。"
    },
    {
        discNumber: 84,
        category: "Opera",
        title: "Pavarotti: Verismo Arias",
        mainArtists: ["Luciano Pavarotti", "Riccardo Chailly", "National Philharmonic Orchestra"],
        recordingPeriod: "1979-1982",
        description: "世界三大男高音之一的帕瓦罗蒂，演绎他最擅长的意大利真实主义歌剧咏叹调。这张专辑收录了《丑角》、《乡村骑士》等歌剧中的经典唱段，完美展现了他那辉煌、富有金属质感的嗓音和无与伦比的高音C，是体验'高音C之王'魅力的最佳入门。"
    },
    {
        discNumber: 85,
        category: "Opera",
        title: "Bryn Terfel: Opera Arias",
        mainArtists: ["Bryn Terfel", "James Levine", "Metropolitan Opera Orchestra"],
        recordingPeriod: "1996",
        description: "威尔士男低中音布林·特菲尔的里程碑式专辑。他在这张唱片中展现了惊人的演唱能力和角色塑造功力，从莫扎特的费加罗、唐璜，到瓦格纳的'荷兰人'，再到'浮士德'中的梅菲斯特，每一个角色都栩栩如生。这张专辑为他赢得了格莱美奖，奠定了其在歌剧界的巨星地位。"
    },
    {
        discNumber: 86,
        category: "Opera",
        title: "Netrebko & Villazón: Duets",
        mainArtists: ["Anna Netrebko", "Rolando Villazón", "Nicola Luisotti"],
        recordingPeriod: "2006",
        description: "记录了21世纪初歌剧界最炙手可热的'黄金搭档'——安娜·奈瑞贝科与罗兰多·维拉宗的巅峰时期。收录了多部歌剧中的著名二重唱，两位歌唱家以其华美的嗓音、激情的表演和舞台上的化学反应征服了世界。这张唱片不仅销量巨大，也成功地将歌剧艺术推广给了更广泛的听众。"
    },
    {
        discNumber: 87,
        category: "Opera",
        title: "Elīna Garanča: Romantique",
        mainArtists: ["Elīna Garanča", "Yves Abel", "Filarmonica del Teatro Comunale di Bologna"],
        recordingPeriod: "2012",
        description: "拉脱维亚次女高音艾琳娜·嘉兰查展现法国浪漫派歌剧魅力的专辑。她以其醇厚、华美的嗓音和高贵的气质，完美演绎了古诺、圣桑、柏辽兹等作曲家的经典咏叹调。这张专辑不仅展示了嘉兰查精湛的演唱技巧，也体现了DG在新一代歌唱家发掘上的独到眼光。"
    },
    {
        discNumber: 88,
        category: "Oratorio & Sacred",
        title: "Bach: St Matthew Passion (Excerpts)",
        mainArtists: ["Wilhelm Mengelberg", "Concertgebouworkest"],
        recordingPeriod: "1939",
        description: "荷兰指挥大师门格尔贝格在阿姆斯特丹音乐厅的传奇现场录音。他对巴赫《马太受难曲》的演绎带有强烈的浪漫主义色彩，规模宏大，情感充沛。尽管与今天的'本真'风格大相径庭，但其深刻的戏剧性和虔诚的信仰感使其成为一个不可磨灭的历史见证。"
    },
    {
        discNumber: 89,
        category: "Oratorio & Sacred",
        title: "Bach: Mass in B minor (Highlights)",
        mainArtists: ["Karl Richter", "Münchener Bach-Orchester"],
        recordingPeriod: "1961",
        description: "指挥家卡尔·李希特是战后巴赫音乐演绎的权威。他指挥的巴赫《B小调弥撒》将现代乐器的宏伟音响与对巴洛克精神的深刻理解相结合，创造出一种庄严、肃穆且充满信仰力量的风格。这个版本影响了几代人对巴赫宗教音乐的看法。"
    },
    {
        discNumber: 90,
        category: "Oratorio & Sacred",
        title: "Mozart: Requiem (Böhm)",
        mainArtists: ["Karl Böhm", "Wiener Philharmoniker", "Edith Mathis", "Gundula Janowitz"],
        recordingPeriod: "1971",
        description: "指挥大师卡尔·伯姆指挥维也纳爱乐乐团演绎的莫扎特《安魂曲》，是一个充满温暖人性和深刻悲悯情怀的经典版本。伯姆以其稳健的节奏和对作品结构的清晰呈现，营造出一种庄重而崇高的氛围。豪华的独唱阵容更是锦上添花，使其成为DG目录中最受推崇的《安魂曲》录音之一。"
    },
    {
        discNumber: 91,
        category: "Oratorio & Sacred",
        title: "Bernstein: Mass",
        mainArtists: ["Leonard Bernstein", "Norman Scribner Choir"],
        recordingPeriod: "1971",
        description: "作曲家伯恩斯坦亲自指挥自己创作的《弥撒》。这部作品融合了古典、摇滚、蓝调、戏剧等多种元素，是一部极具争议和开创性的'剧院作品'。这个首演录音充满了原始的能量和戏剧冲突，是理解伯恩斯坦这位跨界音乐天才的钥匙。"
    },
    {
        discNumber: 92,
        category: "Oratorio & Sacred",
        title: "Verdi: Messa da Requiem (Giulini)",
        mainArtists: ["Carlo Maria Giulini", "Berliner Philharmoniker"],
        recordingPeriod: "1989",
        description: "指挥家朱里尼晚年指挥柏林爱乐乐团的威尔第《安魂曲》现场录音。与他早年在EMI的著名版本相比，这个版本速度更慢，更具内省和哲理的深度。朱里尼以其虔诚的态度，将这部作品演绎成一场关于生与死的深刻冥想，展现了作品中神圣与人性的交织。"
    },
    {
        discNumber: 93,
        category: "Lied",
        title: "Lieder - Early Recordings",
        mainArtists: ["Leo Slezak", "Heinrich Schlusnus", "Eidé Norena"],
        recordingPeriod: "1907-1943",
        description: "汇集了DG早期历史中艺术歌曲演唱的珍贵录音。通过这些来自'虫胶唱片'时代的录音，我们可以听到如施卢斯努斯等传奇歌唱家对舒伯特、舒曼等德奥艺术歌曲的诠释。这些录音不仅是声音的档案，更是演唱风格演变的活化石。"
    },
    {
        discNumber: 94,
        category: "Lied",
        title: "Fritz Wunderlich: Dichterliebe & Lieder",
        mainArtists: ["Fritz Wunderlich", "Hubert Giesen"],
        recordingPeriod: "1965-1966",
        description: "被誉为'德国第一抒情男高音'的弗里茨·翁德里希，以其天鹅绒般华美的嗓音和自然的乐感征服了世界。这张专辑收录了他对舒曼声乐套曲《诗人之恋》的经典演绎，以及其他舒伯特、贝多芬的歌曲。这是一个充满阳光和诗意的传奇录音，因翁德里希的英年早逝而更显珍贵。"
    },
    {
        discNumber: 95,
        category: "Lied",
        title: "Fischer-Dieskau sings Schubert's Winterreise",
        mainArtists: ["Dietrich Fischer-Dieskau", "Jörg Demus"],
        recordingPeriod: "1965",
        description: "男中音歌唱家迪特里希·菲舍尔-迪斯考是20世纪最伟大的艺术歌曲诠释者。他一生中多次录制舒伯特的《冬之旅》，而这个与钢琴家德穆斯合作的版本，以其深刻的戏剧性、对诗歌文本的精湛解读和丰富的音色变化而著称，是理解这部伟大声乐套曲的必听版本。"
    },
    {
        discNumber: 96,
        category: "Lied",
        title: "Jessye Norman: Lieder",
        mainArtists: ["Jessye Norman", "James Levine"],
        recordingPeriod: "1984-1993",
        description: "美国女高音杰西·诺曼以其宏大、华丽的嗓音和强烈的舞台表现力而闻名。这张专辑精选了她演唱的瓦格纳《魏森冬克之歌》和理查·施特劳斯的《最后四首歌》，她的演绎充满了高贵的气质和磅礴的气势，将管弦乐艺术歌曲的辉煌展现得淋漓尽致。"
    },
    {
        discNumber: 97,
        category: "Lied",
        title: "Anne Sofie von Otter sings Grieg",
        mainArtists: ["Anne Sofie von Otter", "Bengt Forsberg"],
        recordingPeriod: "1992",
        description: "瑞典次女高音安妮·索菲·冯·奥特以其知性的音乐处理和广泛的曲目范围而备受推崇。这张格里格艺术歌曲专辑是她的代表作之一。她以清澈的嗓音和对北欧音乐风格的精准把握，完美呈现了格里格音乐中的民族风情与细腻情感，赢得了《留声机》杂志年度唱片大奖。"
    },
    {
        discNumber: 98,
        category: "Lied",
        title: "Magdalena Kožená sings Bach Arias",
        mainArtists: ["Magdalena Kožená", "Musica Florea"],
        recordingPeriod: "1999",
        description: "捷克次女高音玛格达莱娜·科泽娜的DG首张专辑。这张巴赫咏叹调合集展现了她明亮的音色、灵活的技巧和对巴洛克风格的深刻理解。专辑一经发行便广受好评，也开启了科泽娜在DG的辉煌录音生涯，标志着一位新星的诞生。"
    },
    {
        discNumber: 99,
        category: "Lied",
        title: "Thomas Quasthoff sings Schubert Lieder",
        mainArtists: ["Thomas Quasthoff", "Anne Sofie von Otter", "Claudio Abbado"],
        recordingPeriod: "2003",
        description: "德国男低中音托马斯·夸斯托夫以其温暖的嗓音和深刻的音乐感染力而备受喜爱。这张与阿巴多合作的舒伯特管弦乐艺术歌曲专辑，是他最受赞誉的唱片之一。夸斯托夫的演唱充满了人性的光辉，与阿巴多指挥的欧洲室内乐团的细腻协奏相得益彰。"
    },
    {
        discNumber: 100,
        category: "Lied",
        title: "Matthias Goerne sings Schubert",
        mainArtists: ["Matthias Goerne", "Christoph Eschenbach", "Elisabeth Leonskaja"],
        recordingPeriod: "2008-2014",
        description: "马蒂亚斯·格尔纳是当代最重要的德奥艺术歌曲演唱家之一。这张专辑精选自他与多位钢琴家合作的舒伯特歌曲系列。格尔纳以其深沉、富有磁性的嗓音和对歌曲意境的深刻挖掘而著称，他的演唱充满了内省的色彩和哲学的思辨，代表了新一代艺术歌曲的诠释方向。"
    },
    {
        discNumber: 101,
        category: "Archiv Produktion",
        title: "Gregorian Chant",
        mainArtists: ["Chor der Mönche der Benediktiner-Erzabtei St. Martin, Beuron"],
        recordingPeriod: "1952-1959",
        description: "DG旗下的古乐厂牌'Archiv Produktion'的标志性录音之一。来自德国博伊龙修道院的僧侣合唱团演唱的格里高利圣咏，以其纯净的音色、虔诚的氛围和对古老传统的忠实，为听众打开了一扇通往中世纪宗教音乐世界的大门，是Archiv早期在学术和艺术上取得巨大成功的典范。"
    },
    {
        discNumber: 102,
        category: "Archiv Produktion",
        title: "Helmut Walcha plays Bach",
        mainArtists: ["Helmut Walcha"],
        recordingPeriod: "1947-1952",
        description: "盲人管风琴大师赫尔穆特·瓦尔哈是Archiv的奠基艺术家之一。这张CD收录了他演奏的巴赫管风琴作品，包括著名的《d小调托卡塔与赋格》。瓦尔哈的演奏以其结构清晰、织体透明和深刻的宗教情感而著称，他为Archiv录制的两套巴赫管风琴作品全集是该领域的权威版本。"
    },
    {
        discNumber: 103,
        category: "Archiv Produktion",
        title: "Musica Antiqua Köln plays Bach",
        mainArtists: ["Musica Antiqua Köln", "Reinhard Goebel"],
        recordingPeriod: "1982-1983",
        description: "这张专辑是Archiv在'本真主义'浪潮中的代表作。莱因哈德·戈贝尔和他率领的科隆古乐团以其充满活力、有时甚至略带激进的演奏风格，彻底改变了人们对巴赫音乐的传统印象。他们使用古乐器，追求快速的节奏和清晰的织体，为巴洛克音乐的演绎带来了革命性的新风貌。"
    },
    {
        discNumber: 104,
        category: "Archiv Produktion",
        title: "The English Concert plays Vivaldi's Four Seasons",
        mainArtists: ["The English Concert", "Trevor Pinnock", "Simon Standage"],
        recordingPeriod: "1981",
        description: "在'本真主义'运动中，特雷沃·平诺克和他率领的英国协奏团录制的维瓦尔第《四季》是一个里程碑。他们使用古乐器，以轻快、充满活力的风格取代了传统的浪漫化演绎，还原了作品的巴洛克舞蹈节奏和鲜明色彩。这个版本一经推出便大获成功，成为当时古乐版《四季》的标杆。"
    },
    {
        discNumber: 105,
        category: "Archiv Produktion",
        title: "Gardiner conducts Mozart",
        mainArtists: ["John Eliot Gardiner", "Monteverdi Choir", "English Baroque Soloists"],
        recordingPeriod: "1990",
        description: "约翰·艾略特·加德纳将'本真主义'演绎法成功地从巴洛克时期扩展到了古典主义时期。这张莫扎特交响曲录音，以其快速的节奏、鲜明的对比和戏剧性的张力，为听众呈现了一个充满革命激情、与众不同的莫扎特。加德纳对管乐声部的强调也让音乐的色彩更为丰富。"
    },
    {
        discNumber: 106,
        category: "Archiv Produktion",
        title: "McCreesh conducts Praetorius",
        mainArtists: ["Paul McCreesh", "Gabrieli Consort & Players"],
        recordingPeriod: "1993",
        description: "保罗·麦克里什以其'学术性重构'的录音项目而闻名。这张专辑重现了17世纪德国作曲家普雷托里乌斯时期一场圣诞节弥撒的盛况，动用了庞大的合唱团、铜管乐队和各种古乐器。这个录音不仅音乐华丽辉煌，更是一次成功的音乐考古，极具开创性。"
    },
    {
        discNumber: 107,
        category: "Polydor & Light Music",
        title: "Light Music - Early Recordings",
        mainArtists: ["Comedian Harmonists", "Zarah Leander", "Marlene Dietrich"],
        recordingPeriod: "1928-1941",
        description: "这张CD展示了DG前身Polydor厂牌在20世纪上半叶录制的轻音乐和流行歌曲。收录了如'喜剧和声'演唱组的幽默歌曲，以及玛琳·黛德丽、莎拉·莱安德等电影明星的经典歌曲，反映了当时德国的社会文化风貌，是珍贵的时代声音档案。"
    },
    {
        discNumber: 108,
        category: "Polydor & Light Music",
        title: "Viennese Waltzes",
        mainArtists: ["Ferenc Fricsay", "Herbert von Karajan", "Lorin Maazel"],
        recordingPeriod: "1951-1980",
        description: "DG历史上众多指挥大师对维也纳施特劳斯家族圆舞曲的精彩演绎。从弗里乔伊的匈牙利风情，到卡拉扬的华丽精致，再到马泽尔在维也纳新年音乐会上的经典现场，这张专辑汇集了不同风格的维也纳音乐，充满了节日的欢庆气氛。"
    },
    {
        discNumber: 109,
        category: "Polydor & Light Music",
        title: "Christmas with Karajan",
        mainArtists: ["Herbert von Karajan", "Berliner Philharmoniker", "Wiener Philharmoniker"],
        recordingPeriod: "1967-1987",
        description: "卡拉扬与柏林爱乐、维也纳爱乐等乐团录制的圣诞音乐精选。专辑收录了从巴赫、亨德尔的宗教作品，到传统的圣诞颂歌，音乐风格庄严而华美。卡拉扬以其独特的音响美学，将这些节日音乐处理得精致辉煌，是DG最畅销的圣诞专辑之一。"
    },
    {
        discNumber: 110,
        category: "Avant-garde",
        title: "Stockhausen / Ligeti / Lutosławski",
        mainArtists: ["Karlheinz Stockhausen", "György Ligeti", "Witold Lutosławski"],
        recordingPeriod: "1967-1972",
        description: "这张专辑集中展示了DG对20世纪下半叶欧洲先锋派音乐的关注。收录了施托克豪森的电子音乐、利盖蒂的音块和微复调作品，以及卢托斯瓦夫斯基的机遇音乐。这些作品在当时极具实验性和颠覆性，这张唱片记录了DG勇于探索音乐前沿的艺术胆识。"
    },
    {
        discNumber: 111,
        category: "Avant-garde",
        title: "Boulez conducts his own works",
        mainArtists: ["Pierre Boulez", "Ensemble InterContemporain"],
        recordingPeriod: "1981-2002",
        description: "作曲家兼指挥家皮埃尔·布列兹亲自指挥自己作品的权威录音。布列兹是序列音乐的代表人物，他的音乐以其高度的理性和复杂的结构而著称。这张专辑中的《无主之锤》、《记谱》等作品，展现了他精密的音乐思维和对音色的极致探索，是理解这位现代音乐巨匠的钥匙。"
    },
    {
        discNumber: 112,
        category: "Avant-garde",
        title: "Steve Reich: Drumming",
        mainArtists: ["Steve Reich and Musicians"],
        recordingPeriod: "1974",
        description: "美国简约主义音乐大师史蒂夫·莱奇的里程碑式作品。这部长达一个多小时的作品仅由打击乐和人声构成，通过'相位移动'等技巧，创造出一种催眠般的、不断变化的节奏织体。这个录音是简约主义音乐的经典文献，对后来的电子音乐、摇滚乐都产生了深远影响。"
    },
    {
        discNumber: 113,
        category: "Avant-garde",
        title: "Philip Glass: Violin Concerto",
        mainArtists: ["Gidon Kremer", "Christoph von Dohnányi", "Wiener Philharmoniker"],
        recordingPeriod: "1992",
        description: "菲利普·格拉斯是另一位简约主义音乐的代表人物。他的第一号小提琴协奏曲是其最受欢迎的作品之一。这部作品将简约主义的重复音型与浪漫主义的抒情旋律相结合，创造出一种独特的、既现代又动听的风格。小提琴家基顿·克莱默的演绎充满了激情，是这部作品的权威版本。"
    },
    {
        discNumber: 114,
        category: "Neoclassical",
        title: "Max Richter: Recomposed - Vivaldi, The Four Seasons",
        mainArtists: ["Max Richter", "Daniel Hope", "Konzerthaus Kammerorchester Berlin"],
        recordingPeriod: "2012",
        description: "DG在新世纪最成功的跨界尝试之一，也是'后古典'或'新古典'音乐流派的标志性作品。德裔英籍作曲家马克斯·里希特将维瓦尔第家喻户晓的《四季》进行了'重构'，融入简约主义、氛围音乐和电子元素，创造出一种既熟悉又陌生的听觉体验，赢得了全球范围的巨大成功。"
    },
    {
        discNumber: 115,
        category: "Neoclassical",
        title: "Jóhann Jóhannsson: Orphée",
        mainArtists: ["Jóhann Jóhannsson"],
        recordingPeriod: "2016",
        description: "已故冰岛作曲家约翰·约翰逊是当代最重要的作曲家之一，他的音乐跨越了古典、电影配乐和电子乐的界限。作为他在DG的首张个人专辑，《奥菲》是一张充满忧郁美感和极简主义色彩的概念专辑，探讨了关于'变化'的主题。这张专辑以其独特的音景和深刻的情感力量，展现了DG对当代声音艺术的持续关注。"
    },
    {
        discNumber: 116,
        category: "Neoclassical",
        title: "Ludovico Einaudi: Islands",
        mainArtists: ["Ludovico Einaudi"],
        recordingPeriod: "2011",
        description: "意大利作曲家、钢琴家鲁多维科·艾奥迪是当今世界最受欢迎的音乐家之一。这张精选集收录了他最著名的作品。艾奥迪的音乐融合了古典、简约主义和流行音乐的元素，旋律优美，情感真挚，具有强大的治愈力量，使他成为DG在新古典领域最成功的艺术家之一。"
    },
    {
        discNumber: 117,
        category: "Spoken Word",
        title: "Spoken Word - Early Recordings",
        mainArtists: ["Otto von Bismarck", "Leo Tolstoy", "Thomas Mann"],
        recordingPeriod: "1889-1955",
        description: "这张独特的CD收录了DG历史上珍贵的'言语'录音。我们可以听到德意志帝国首相俾斯麦、文豪列夫·托尔斯泰等历史人物的声音片段，以及作家托马斯·曼朗读自己作品的录音。这是一份极其珍贵的历史声音档案，让我们得以跨越时空，聆听历史的回响。"
    },
    {
        discNumber: 118,
        category: "Spoken Word",
        title: "Goethe: Faust (Gründgens)",
        mainArtists: ["Gustaf Gründgens", "Paul Hartmann", "Käthe Gold"],
        recordingPeriod: "1954",
        description: "德国戏剧史上的传奇制作——古斯塔夫·格林德根斯导演并主演的歌德戏剧《浮士德》的录音。这个版本被认为是德语戏剧的里程碑，格林德根斯对梅菲斯特这一角色的塑造深入人心。DG将这部伟大的戏剧作品完整记录下来，展现了其作为文化记录者的责任感。"
    },
    {
        discNumber: 119,
        category: "Spoken Word",
        title: "Prokofiev: Peter and the Wolf (Sting)",
        mainArtists: ["Sting", "Claudio Abbado", "Chamber Orchestra of Europe"],
        recordingPeriod: "1990",
        description: "普罗科菲耶夫的交响童话《彼得与狼》的明星跨界版本。由英国摇滚巨星斯汀担任旁白，指挥大师阿巴多执棒欧洲室内乐团。斯汀充满魅力的讲述与阿巴多精致、生动的指挥相得益彰，使这个版本广受欢迎，成功地将古典音乐介绍给了更多年轻听众。"
    },
    {
        discNumber: 120,
        category: "The Next Generation",
        title: "Daniil Trifonov plays Liszt",
        mainArtists: ["Daniil Trifonov"],
        recordingPeriod: "2016",
        description: "这张专辑展现了DG在新一代艺术家中的领军人物——丹尼尔·特里福诺夫的惊人技艺。他演奏的李斯特《超技练习曲》不仅技巧辉煌，更充满了诗意的想象和深刻的音乐性。这张专辑为他赢得了格莱美奖，也宣告了一位未来钢琴巨擘的诞生。"
    },
    {
        discNumber: 121,
        category: "Bonus CD",
        title: "DG 120 - A Journey through Time",
        mainArtists: ["Various Artists"],
        recordingPeriod: "1903-2018",
        description: "这张作为结尾的Bonus CD，如同一部声音的蒙太奇，将DG 120年历史中不同时期、不同风格的录音片段巧妙地编织在一起。从最早的男高音咏叹调，到卡拉扬的立体声，再到当代艺术家的最新录音，它带领听众进行了一场穿越时空的声音之旅，完美总结了DG百廿年的辉煌历程。"
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
    
    // 快速操作按钮
    const importDataBtn = document.getElementById('importDataBtn');
    const importFileInput = document.getElementById('importFileInput');
    const clearAllBtn = document.getElementById('clearAllBtn');
    const exportDataBtn = document.getElementById('exportDataBtn');
    
    if (importDataBtn && importFileInput) {
        importDataBtn.addEventListener('click', function() {
            importFileInput.click();
        });
        importFileInput.addEventListener('change', importData);
    }
    
    if (clearAllBtn) clearAllBtn.addEventListener('click', clearAllData);
    if (exportDataBtn) exportDataBtn.addEventListener('click', exportData);
});// 核心
功能函数

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
}// 模态框和数据
管理功能

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
}// 
统计和数据管理功能

// 更新统计信息
function updateStats() {
    const totalCount = dg120Albums.length;
    const listenedCount_value = listenedAlbums.length;
    const percentage = totalCount > 0 ? Math.round((listenedCount_value / totalCount) * 100) : 0;
    
    if (listenedCount) listenedCount.textContent = listenedCount_value;
    if (listenedPercentage) listenedPercentage.textContent = `${percentage}%`;
    if (listenedAlbumsCount) listenedAlbumsCount.textContent = listenedCount_value;
    if (totalAlbums) totalAlbums.textContent = totalCount;
    if (totalDiscs) totalDiscs.textContent = totalCount;
}

// 更新已聆听专辑列表
function updateListenedAlbumsList() {
    if (!listenedAlbumsList) return;
    
    if (listenedAlbums.length === 0) {
        listenedAlbumsList.innerHTML = `
            <div class="empty-state">
                <p>暂无已聆听专辑</p>
                <small>点击专辑标记为已聆听</small>
            </div>
        `;
        return;
    }
    
    // 按聆听日期排序（最新的在前）
    const sortedListened = [...listenedAlbums].sort((a, b) => {
        const dateA = new Date(a.listenDate || '1900-01-01');
        const dateB = new Date(b.listenDate || '1900-01-01');
        return dateB - dateA;
    });
    
    listenedAlbumsList.innerHTML = sortedListened.map(album => `
        <div class="listened-album-item" onclick="showAlbumModalByDiscNumber(${album.discNumber})">
            <div class="listened-album-name">
                <span class="listened-album-disc">CD ${album.discNumber}</span>
                <span class="listened-album-title">${album.title}</span>
            </div>
            <span class="listened-album-date">${album.listenDate || '-'}</span>
        </div>
    `).join('');
}

// 通过CD编号显示专辑模态框
function showAlbumModalByDiscNumber(discNumber) {
    const album = dg120Albums.find(a => a.discNumber === discNumber);
    if (album) {
        showAlbumModal(album);
    }
}

// 数据导入导出功能
function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (Array.isArray(data)) {
                listenedAlbums = data;
                localStorage.setItem('dg120ListenedAlbums', JSON.stringify(listenedAlbums));
                updateStats();
                updateListenedAlbumsList();
                renderAlbums();
                alert('数据导入成功！');
            } else {
                alert('无效的数据格式！');
            }
        } catch (error) {
            alert('文件解析失败！');
        }
    };
    reader.readAsText(file);
    
    // 清除文件输入
    event.target.value = '';
}

function clearAllData() {
    if (confirm('确定要清除所有聆听记录吗？此操作不可撤销。')) {
        listenedAlbums = [];
        localStorage.removeItem('dg120ListenedAlbums');
        updateStats();
        updateListenedAlbumsList();
        renderAlbums();
        hideModal();
        alert('所有数据已清除！');
    }
}

function exportData() {
    const dataStr = JSON.stringify(listenedAlbums, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `dg120-listened-albums-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
}

// 键盘事件处理
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && albumModal && !albumModal.classList.contains('hidden')) {
        hideModal();
    }
});