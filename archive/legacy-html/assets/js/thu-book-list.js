// THU Book List Data and Functionality
const BOOKS_DATA = [
    { number: 1, title: "马克思恩格斯全集 . 第四十四-四十六卷 , 资本论", author: "中共中央马克思 恩格斯 列宁 斯大林著作编译局编译", publisher: "北京 人民出版社 2001-2003", description: "马克思主义政治经济学奠基之作,深刻剖析资本主义生产方式与历史规律.", category: "Philosophy" },
    { number: 2, title: "共产党宣言", author: "马克思, 恩格斯 ; 中共中央马克思恩格斯列宁斯大林著作编译局编译", publisher: "北京 人民出版社 2018", description: "科学社会主义纲领性文献,以激昂笔触宣告无产阶级革命的历史使命.", category: "Politics" },
    { number: 3, title: "中国哲学简史", author: "冯友兰著 ; 涂又光译", publisher: "北京 北京大学出版社 2013", description: "冯友兰先生以通透笔法系统梳理中国哲学三千年的演进脉络与精神内核.", category: "Philosophy" },
    { number: 4, title: "周易译注", author: "黄寿祺, 张善文译注", publisher: "上海 上海古籍出版社 2016", description: "群经之首,蕴含东方辩证智慧与宇宙人生哲思的权威注译本.", category: "Philosophy" },
    { number: 5, title: "四书章句集注", author: "(宋) 朱熹撰", publisher: "北京 中华书局 2011", description: "朱熹集毕生心力打造的儒家经典权威注本,宋明理学的核心文献.", category: "Philosophy" },
    { number: 6, title: "論語正義", author: "(清) 劉寶楠撰 ; 高流水點校", publisher: "北京 中華書局 1990", description: "清代'论语'研究的集大成之作,考证精详,义理深厚.", category: "Philosophy" },
    { number: 7, title: "论语浅解", author: "钱逊 编著", publisher: "北京 北京古籍出版社 1988", description: "钱逊先生编著的'论语入门读本,以平易注释通达圣哲智慧.", category: "Philosophy" },
    { number: 8, title: "论语译注", author: "杨伯峻译注", publisher: "北京 中华书局 2015", description: "杨伯峻经典译注,以通俗晓畅的现代汉语推广'论语的通行版本.", category: "Philosophy" },
    { number: 9, title: "孟子譯注", author: "楊伯峻譯注", publisher: "北京 中華書局 2010", description: "杨伯峻译注,精准传达孟子仁政思想与雄辩风格的权威读本.", category: "Philosophy" },
    { number: 10, title: "荀子新探", author: "廖名春著", publisher: "北京 中国人民大学出版社 2014", description: "廖名春以现代学术方法对荀子思想作出的创新性研究阐释.", category: "Philosophy" },
    { number: 11, title: "老子道德經注校釋", author: "(魏) 王弼注 ; 樓宇烈校釋", publisher: "北京 中华书局 2016", description: "王弼注本为底,楼宇烈精校详释,回归'道德经'思想本源.", category: "Philosophy" },
    { number: 12, title: "庄子今注今译", author: "陈鼓应注译", publisher: "北京 商务印书馆 2016", description: "陈鼓应以现代视角精注精译,引领读者通达庄子逍遥之境.", category: "Philosophy" },
    { number: 13, title: "墨子校释", author: "王焕镳 著 ; 朱渊等 释", publisher: "杭州 浙江文艺出版社 1984", description: "王焕镳对墨家思想与逻辑学说的系统整理与现代阐释.", category: "Philosophy" },
    { number: 14, title: "墨子閒詁", author: "(清) 孫詒讓撰 ; 孫啟治點校", publisher: "北京 中華書局 2017", description: "孙诒让集清代墨学研究之大成,考据精审的权威版本.", category: "Philosophy" },
    { number: 15, title: "韓非子集解", author: "(清) 王先慎撰 ; 鐘哲點校", publisher: "北京 中華書局 2016", description: "王先慎集解法家思想精髓,揭示韩非子权术法治理论.", category: "Philosophy" },
    { number: 16, title: "论衡注释", author: "(东汉) 王充著 ; 北京大学历史系论衡注释小组注释", publisher: "北京 中华书局 1979", description: "王充以'疾虚妄'精神写作的唯物主义哲学杰作,批判谶纬迷信.", category: "Philosophy" },
    { number: 17, title: "王陽明全集", author: "(明) 王守仁撰 ; 吴光 ... [等] 編校", publisher: "上海 上海古籍出版社 2014", description: "心学宗师王守仁'致良知'与'知行合一'思想的完整体现.", category: "Philosophy" },
    { number: 18, title: "清代学术概论", author: "梁启超撰", publisher: "上海 上海古籍出版社 2011", description: "梁启超以宏阔视野梳理清代学术思潮变迁的开创性著作.", category: "History" },
    { number: 19, title: "读通鉴论", author: "(清) 王夫之著 ; 舒士彦点校", publisher: "北京 中华书局 2013", description: "王夫之借古讽今的历史哲学巨著,充满现实关怀的史论典范.", category: "History" },
    { number: 20, title: "明夷待访录", author: "(明) 黄宗羲著 ; 段志强译注", publisher: "北京 中华书局 2011", description: "黄宗羲批判君主专制,倡导民本思想的启蒙先声.", category: "Politics" },
    { number: 21, title: "康有为大同论二种", author: "康有为著 ; 朱维铮编校", publisher: "上海 中西书局 2012", description: "康有为融合中西思想阐发乌托邦理想与变法维新的理论纲领.", category: "Politics" },
    { number: 22, title: "理想国", author: "(古希腊) 柏拉图著 ; 郭斌和, 张竹明译", publisher: "北京 商务印书馆 2009", description: "柏拉图构建正义城邦的哲学对话录,西方政治哲学与形而上学的源头.", category: "Philosophy" },
    { number: 23, title: "沉思录", author: "(古罗马) 马可·奥勒留著 ; 何怀宏译", publisher: "北京 中华书局 2015", description: "罗马皇帝奥勒留以斯多葛哲学反思人生与职责的内心独白.", category: "Philosophy" },
    { number: 24, title: "论自由意志 : 奥古斯丁对话录二篇", author: "(古罗马)奥古斯丁著 ; 成官泯译", publisher: "上海 上海人民出版社 2010", description: "奥古斯丁围绕恶的起源与自由意志展开的神学哲学核心对话.", category: "Philosophy" },
    { number: 25, title: "哲学史讲演录", author: "(德) 黑格尔著 ; 贺麟, 王太庆等译", publisher: "上海 上海人民出版社 2013", description: "黑格尔以辩证法重构哲学史的宏大叙事,展现思想发展的内在逻辑.", category: "Philosophy" },
    { number: 26, title: "历史理性批判文集", author: "(德) 伊曼努尔·康德著", publisher: "天津 天津人民出版社 2014", description: "康德批判哲学体系中关于历史目的论与进步观的重要文集.", category: "Philosophy" },
    { number: 27, title: "新工具", author: "(英)培根 著 ; 许宝骙译", publisher: "北京 商务印书馆 1984", description: "培根提出经验归纳法与科学方法论,为近代科学革命奠定哲学基础.", category: "Philosophy" },
    { number: 28, title: "论法的精神", author: "(法)孟德斯鸠著 ; 张雁深译", publisher: "北京 商务印书馆 1961-1963", description: "孟德斯鸠系统阐述三权分立与法治原则,现代政治学的奠基之作.", category: "Politics" },
    { number: 29, title: "谈谈方法", author: "(法) 笛卡尔著 ; 王太庆译", publisher: "北京 商务印书馆 2000", description: "笛卡尔以'我思故我在'为核心,确立理性主义认识论方法.", category: "Philosophy" },
    { number: 30, title: "思想录 : 论宗教和其他主题的思想", author: "(法) 帕斯卡尔著 ; 何兆武译", publisher: "北京 商务印书馆 1985", description: "帕斯卡尔以理性与信仰交织的哲思,探讨人类存在的根本问题.", category: "Philosophy" },
    { number: 31, title: "社会契约论, 一名, 政治权利的原理", author: "(法) 卢梭著 ; 何兆武译", publisher: "北京 商务印书馆 2003", description: "卢梭提出'主权在民'思想,现代民主政治的理论基石.", category: "Politics" },
    { number: 32, title: "疯癫与文明 : 理性时代的疯癫史", author: "(法)米歇尔.福柯著 ; 刘北成,杨远婴译", publisher: "北京 三联书店 1999", description: "福柯解构理性标准,揭示疯癫如何被历史与文化建构的社会史杰作.", category: "Philosophy" },
    { number: 33, title: "尼各马可伦理学", author: "(古希腊) 亚里士多德著 ; 廖申白译注", publisher: "北京 商务印书馆 2017", description: "亚里士多德系统阐述德性伦理学,西方伦理学的奠基性著作.", category: "Philosophy" },
    { number: 34, title: "美的历史", author: "(意大利) 翁贝托·艾柯编著 ; 彭淮栋译", publisher: "北京 中央编译出版社 2011", description: "艾柯以宏阔视野与精美图文,纵览西方美学观念的历史演变.", category: "Philosophy" },
    { number: 35, title: "精神分析引论", author: "(奥) 弗洛伊德著 ; 高觉敷译", publisher: "北京 商务印书馆 1984", description: "弗洛伊德系统阐释潜意识,梦与性欲理论的经典心理学著作.", category: "Science" },
    { number: 36, title: "新教伦理与资本主义精神", author: "(德) 马克斯·韦伯著 ; (美) 斯蒂芬·卡尔伯格英译 ; 苏国勋 ... [等] 中译", publisher: "北京 社会科学文献出版社 2010", description: "韦伯揭示资本主义精神与新教伦理的亲和关系,现代社会学奠基作.", category: "Economics" },
    { number: 37, title: "坛经校释", author: "(唐) 慧能 著 ; 郭朋 校释", publisher: "北京 中华书局 1983", description: "禅宗六祖慧能顿悟法门的核心经典,中国化佛教思想的里程碑.", category: "Philosophy" },
    { number: 38, title: "六祖壇經箋註", author: "丁福保著 ; 能進點校", publisher: "上海 華東師范大學出版社 2013", description: "丁福保详注的禅宗根本典籍,深入阐释顿悟思想的精义.", category: "Philosophy" },
    { number: 39, title: "坛经导读", author: "郭朋著", publisher: "北京 中国国际广播出版社 2008", description: "郭朋为初学者指引理解禅宗智慧与实践的入门读物.", category: "Philosophy" },
    { number: 40, title: "论道德的谱系 : 一本论战著作", author: "(德) 尼采著 ; 赵千帆译", publisher: "北京 商务印书馆 2017", description: "尼采颠覆基督教道德,追溯其奴隶意志起源的哲学檄文.", category: "Philosophy" },
    { number: 41, title: "乡土中国", author: "费孝通著", publisher: "北京 北京大学出版社 2012", description: "费孝通以'差序格局'精准剖析中国传统社会结构的经典.", category: "History" },
    { number: 42, title: "第二性", author: "西蒙·德·波娃著 ; 邱瑞鑾譯", publisher: "台北 貓頭鷹出版 2015", description: "波伏娃揭示女性作为'他者'的生存境遇,女性主义理论基石.", category: "Philosophy" },
    { number: 43, title: "正义论", author: "(美)约翰·罗尔斯著 ; 何怀宏, 何包钢, 廖申白译", publisher: "北京 中国社会科学出版社 2009", description: "罗尔斯以'无知之幕'论证正义原则,当代政治哲学的扛鼎之作.", category: "Politics" },
    { number: 44, title: "政府论", author: "(英)洛克著 ; 瞿菊农, 叶启芳译", publisher: "北京 商务印书馆 1982", description: "洛克系统论证天赋人权与有限政府,自由主义政治思想的奠基文本.", category: "Politics" },
    { number: 45, title: "国际政治理论", author: "(美) 肯尼思·华尔兹著 ; 信强译", publisher: "上海 上海人民出版社 2003", description: "华尔兹创立结构现实主义理论,国际关系学的经典教科书.", category: "Politics" },
    { number: 46, title: "孙子兵法", author: "(春秋) 孙武撰", publisher: "上海 上海古籍出版社 2012", description: "东方谋略智慧的千古兵经,影响深远的战略思想典籍.", category: "History" },
    { number: 47, title: "国民财富的原因和性质的研究", author: "(英) 亚当·斯密著 ; 杨敬年译", publisher: "西安 陕西人民出版社 2001", description: "亚当·斯密创立现代经济学体系,'看不见的手'理论的源头.", category: "Economics" },
    { number: 48, title: "甜与权力 : 糖在近代历史上的地位", author: "(美) 西敏司著 ; 王超, 朱健刚译", publisher: "北京 商务印书馆 2010", description: "西敏司从糖的消费透析资本主义全球化与权力关系的微观史杰作.", category: "History" },
    { number: 49, title: "名家精译古文观止", author: "中华书局编辑部编", publisher: "北京 中华书局 2007", description: "吴楚材叔侄编选的古文精华集,学习古代散文的入门宝库.", category: "Literature" },
    { number: 50, title: "哈姆雷特 : 中英双语本", author: "(英) 莎士比亚著 ; 朱生豪译", publisher: "北京 中华书局 2016", description: "莎士比亚悲剧艺术的巅峰,用双语文本呈现复仇王子的永恒困惑.", category: "Literature" },
    { number: 51, title: "美的历程", author: "李泽厚著", publisher: "北京 生活·读书·新知三联书店 2009", description: "李泽厚以诗意笔触巡礼中国审美意识演进的哲学美学佳作.", category: "Philosophy" },
    { number: 52, title: "诗经选", author: "余冠英选注", publisher: "北京 中华书局 2012", description: "余冠英精选中国诗歌源头,展现先民情感与生活的不朽篇章.", category: "Literature" },
    { number: 53, title: "楚辞补注", author: "(宋) 洪兴祖撰 ; 白化文等点校", publisher: "北京 中华书局 2015", description: "洪兴祖补注'楚辞',考证翔实,是楚辞研究的权威版本.", category: "Literature" },
    { number: 54, title: "楚辞选", author: "马茂元选注", publisher: "北京 人民文学出版社 2002", description: "马茂元精选屈原与楚辞浪漫诗章,展现南国巫风的美学特质.", category: "Literature" },
    { number: 55, title: "楚辭集注", author: "(宋) 朱熹撰", publisher: "北京 中国书店 2015", description: "朱熹集注'楚辞',以理学视角解读,为楚辞学重要版本.", category: "Literature" },
    { number: 56, title: "汉魏六朝诗选", author: "余冠英选注", publisher: "北京 中华书局 2012", description: "余冠英精选汉魏六朝诗歌瑰宝,呈现乱世中的文人心史.", category: "Literature" },
    { number: 57, title: "唐诗三百首详析", author: "喻守真编注", publisher: "北京 中华书局 1985", description: "喻守真详解唐诗名篇,是进入盛唐气象的最佳入门读物.", category: "Literature" },
    { number: 58, title: "宋诗选注", author: "钱钟书选注", publisher: "北京 人民文学出版社 2005", description: "钱钟书以独特眼光精评宋诗,展现宋代文人的理性与哲思.", category: "Literature" },
    { number: 59, title: "唐宋词选释", author: "俞平伯 著", publisher: "北京 人民文学出版社 1979", description: "俞平伯阐释唐宋词学精义,品味中国古典词艺的典范选本.", category: "Literature" },
    { number: 60, title: "北京人", author: "曹 禺著", publisher: "北京 人民文学出版社 1994", description: "曹禺现代话剧艺术的成熟标志,在传统文化衰落中拷问人性.", category: "Literature" },
    { number: 61, title: "中国十大古典名剧", author: "翁敏华, 冯裳, 范发声标校", publisher: "上海 上海古籍出版社 2012", description: "元明清戏曲经典的精华荟萃,展现中国戏剧艺术的独特魅力.", category: "Literature" },
    { number: 62, title: "长生殿", author: "(清) 洪升著 ; 徐朔方校注", publisher: "北京 人民文学出版社 1958", description: "洪昇以李杨爱情为主线,交织历史与浪漫的传奇杰作.", category: "Literature" },
    { number: 63, title: "世说新语校笺", author: "徐震 著 . 上", publisher: "北京 中华书局 1984", description: "魏晋风度与名士精神的传神写照,中国志人小说的典范.", category: "Literature" },
    { number: 64, title: "三国演义", author: "罗贯中著", publisher: "北京 人民文学出版社 1973", description: "罗贯中演绎三国历史的英雄史诗,忠臣义士与权谋智慧的永恒传奇.", category: "Literature" },
    { number: 65, title: "水浒传", author: "施耐庵, 罗贯中 传 . 下", publisher: "北京 人民文学出版社 1975", description: "施耐庵塑造梁山好汉的英雄传奇,展现官逼民反的悲壮史诗.", category: "Literature" },
    { number: 66, title: "红楼梦", author: "曹雪芹,高鄂著", publisher: "北京 人民文学出版社 1982", description: "曹雪芹写就的封建末世百科全书,中国人情社会的巅峰之作.", category: "Literature" },
    { number: 67, title: "儒林外史", author: "吴敬梓著 ; 张慧剑校注", publisher: "北京 人民文学出版社 1962", description: "吴敬梓讽刺科举制度与功名富贵的批判现实主义杰作.", category: "Literature" },
    { number: 68, title: "骆驼祥子", author: "老舍著 ; 丁聪插图", publisher: "北京 人民文学出版社 2012", description: "老舍描绘北平人力车夫奋斗与堕落的悲剧命运,城市贫民的哀歌.", category: "Literature" },
    { number: 69, title: "围城", author: "钱锺书著", publisher: "北京 人民文学出版社 1980", description: "钱钟书讽刺知识分子彷徨处境的现代经典,'婚姻如围城'的永恒隐喻.", category: "Literature" },
    { number: 70, title: "生死场", author: "萧红著", publisher: "北京 人民文学出版社 1981", description: "萧红书写东北人民在生死边缘挣扎的乡土悲歌,女性视角的抗战叙事.", category: "Literature" },
    { number: 71, title: "家", author: "巴金", publisher: "北京 人民文学出版社 1981", description: "巴金控诉封建大家庭罪恶的青春呐喊,点燃几代人反叛激情的火炬.", category: "Literature" },
    { number: 72, title: "金锁记", author: "张爱玲著", publisher: "哈尔滨 哈尔滨出版社 2005", description: "张爱玲洞察人性扭曲与欲望沉沦的心理小说精品,苍凉的手势.", category: "Literature" },
    { number: 73, title: "格萨尔王全传", author: "降边嘉措, 吴伟编撰", publisher: "北京 五洲传播出版社 2006", description: "藏族英雄史诗的民间文学瑰宝,世界最长的活形态史诗.", category: "Literature" },
    { number: 74, title: "子夜", author: "茅盾著", publisher: "北京 人民文学出版社 1960", description: "茅盾刻画民族资本家命运的中国现代文学史上第一部成熟长篇小说.", category: "Literature" },
    { number: 75, title: "青春之歌", author: "杨沫著", publisher: "北京 人民文学出版社 1958", description: "杨沫记录知识分子在革命中成长的红色经典,一代人的青春记忆.", category: "Literature" },
    { number: 76, title: "平凡的世界", author: "路遥著", publisher: "北京 北京十月文艺出版社 2012", description: "路遥献给平凡奋斗者的时代史诗,激励亿万青年的精神灯塔.", category: "Literature" },
    { number: 77, title: "莫言中篇小说选", author: "莫言著", publisher: "上海 上海社会科学院出版社 2004", description: "莫言融合魔幻现实与乡土叙事,展现高密东北乡的传奇与野性.", category: "Literature" },
    { number: 78, title: "死水微澜", author: "李劼人著", publisher: "北京 人民文学出版社 1995", description: "李劼人展现清末川西风情与时代动荡的历史小说,地方史诗的典范.", category: "Literature" },
    { number: 79, title: "赵树理选集", author: "赵树理著", publisher: "北京 人民文学出版社 2002", description: "赵树理开创山药蛋派,以质朴语言书写农村变革的乡土文学大师.", category: "Literature" },
    { number: 80, title: "福乐智慧", author: "尤素甫·哈斯·哈吉甫著 ; 耿世民, 魏萃一译", publisher: "北京 华文出版社 2018", description: "维吾尔族古典长诗的智慧结晶,探讨治国理政与人生哲理的哲理诗.", category: "Literature" },
    { number: 81, title: "雪国 千鹤 古都", author: "(日) 川端康成著 ; 高慧勤译", publisher: "桂林 漓江出版社 2012", description: "川端康成以细腻笔触展现日本物哀美学,荣获诺奖的代表作.", category: "Literature" },
    { number: 82, title: "罗摩衍那", author: "(印度) 蚁垤著 ; 季羡林译", publisher: "长春 吉林出版集团股份有限公司 2016", description: "印度两大史诗之一,融合英雄传奇,宗教智慧与道德教诲的不朽篇章.", category: "Literature" },
    { number: 83, title: "冰心译吉檀迦利 先知", author: "(印) 泰戈尔, (黎) 纪伯伦著 ; 冰心译", publisher: "北京 人民文学出版社 2015", description: "泰戈尔与纪伯伦诗意哲思的合集,冰心传神译文呈现东方智慧.", category: "Literature" },
    { number: 84, title: "泰戈尔诗选", author: "(印度) 泰戈尔著 ; 冰心等译", publisher: "北京 人民文学出版社 2015", description: "东方哲思与西方诗歌形式完美融合,歌颂生命与自然的诺奖诗篇.", category: "Literature" },
    { number: 85, title: "契诃夫小说选", author: "(俄)契诃夫著 ; 汝龙译", publisher: "北京 人民文学出版社 1992", description: "俄国短篇小说大师的批判现实主义杰作,以简练笔触刻画灵魂的麻木.", category: "Literature" },
    { number: 86, title: "托尔斯泰中短篇小说选", author: "(俄) 列夫·托尔斯泰著 ; 臧仲伦译", publisher: "南京 译林出版社 2014", description: "托翁探索人性,道德与信仰的经典叙事,饱含人道主义关怀.", category: "Literature" },
    { number: 87, title: "卡拉马佐夫兄弟", author: "(俄) 陀思妥耶夫斯基著 ; 荣如德译", publisher: "上海 上海译文出版社 2011", description: "陀思妥耶夫斯基宗教哲学的巅峰巨著,拷问信仰,自由与恶的终极意义.", category: "Literature" },
    { number: 88, title: "金人译静静的顿河", author: "(苏) 肖洛霍夫著 ; 金人译", publisher: "北京 人民文学出版社 2017", description: "肖洛霍夫描绘哥萨克在战争与革命中命运的史诗画卷,诺贝尔获奖作.", category: "Literature" },
    { number: 89, title: "浮士德", author: "(德) 歌德著 ; 钱春绮译", publisher: "上海 上海译文出版社 2013", description: "歌德探索人性,知识,爱情与真理的六十年诗剧心血结晶.", category: "Literature" },
    { number: 90, title: "城堡", author: "(奥地利) 卡夫卡著; 赵蓉恒译", publisher: "上海 上海译文出版社 2011", description: "卡夫卡表现异化,荒诞与现代人困境的现代主义寓言.", category: "Literature" },
    { number: 91, title: "迪伦马特喜剧选", author: "(瑞士)迪伦马特 (Durrenmatt, F.) 著 ; 叶廷芳 等译", publisher: "北京 人民文学出版社 1981", description: "瑞士戏剧家以怪诞风格揭示人性阴暗与社会荒诞的喜剧精品.", category: "Literature" },
    { number: 92, title: "老妇还乡", author: "(瑞士) 迪伦马特著 ; 叶廷芳, 韩瑞祥译", publisher: "北京 人民文学出版社 2002", description: "迪伦马特以黑色幽默暴露人性贪婪与道德堕落的悲喜剧杰作.", category: "Literature" },
    { number: 93, title: "潘家洵译易卜生戏剧", author: "(挪威) 易卜生著 ; 潘家洵译", publisher: "北京 人民文学出版社 2015", description: "现代戏剧之父易卜生社会问题剧的精选,深刻批判资产阶级虚伪.", category: "Literature" },
    { number: 94, title: "荷马史诗·伊利亚特", author: "(古希腊) 荷马著 ; 罗念生, 王焕生译", publisher: "北京 人民文学出版社 1994", description: "西方文学源头的不朽英雄史诗,描绘特洛伊战争的壮丽与悲剧.", category: "Literature" },
    { number: 95, title: "古希腊悲剧经典", author: "(古希腊) 埃斯库罗斯,索福克勒斯,欧里庇德斯 ; 罗念生译", publisher: "北京 作家出版社 1998", description: "三大悲剧诗人探索命运,人性与神性的经典,西方戏剧的奠基.", category: "Literature" },
    { number: 96, title: "神曲", author: "(意大利) 但丁著; 朱维基译", publisher: "上海 上海译文出版社 2011", description: "但丁梦游三界的中世纪百科全书,融神学,哲学与文学于一体的长诗.", category: "Literature" },
    { number: 97, title: "堂吉诃德", author: "(西班牙) 塞万提斯著 ; 杨绛译", publisher: "北京 人民文学出版社 2013", description: "塞万提斯讽刺骑士小说的现代小说鼻祖,理想主义者的永恒寓言.", category: "Literature" },
    { number: 98, title: "荒原 : 艾略特诗选", author: "(英) T.S.艾略特著 ; 赵萝蕤译", publisher: "北京 人民文学出版社 2016", description: "艾略特以破碎意象展现现代精神荒原,开创英语诗歌新时代.", category: "Literature" },
    { number: 99, title: "傲慢与偏见", author: "(英) 简·奥斯丁著 ; 孙致礼译", publisher: "南京 译林出版社 2016", description: "奥斯丁以机智讽刺洞察婚恋,阶级与个性,英国小说的典范.", category: "Literature" },
    { number: 100, title: "都柏林人", author: "(爱尔兰) 詹姆斯·乔伊斯著 ; 苏福忠等译", publisher: "北京 人民文学出版社 2017", description: "乔伊斯以十五个故事描绘都柏林精神瘫痪,现代主义短篇巅峰.", category: "Literature" },
    { number: 101, title: "悲惨世界", author: "(法)雨果 著 ; 李丹 译 . 上", publisher: "北京 人民文学出版社 1994", description: "雨果以人道主义思想描绘十九世纪法国社会百态的鸿篇巨制.", category: "Literature" },
    { number: 102, title: "高老头", author: "(法) 巴尔扎克著 ; 张冠尧译", publisher: "北京 人民文学出版社 2002", description: "巴尔扎克批判拜金主义腐蚀人性的现实主义杰作,'人间喜剧'代表作.", category: "Literature" },
    { number: 103, title: "包法利夫人", author: "(法) 福楼拜著 ; 李健吾译", publisher: "北京 人民文学出版社 2003", description: "福楼拜以完美形式呈现人性悲剧,批判浪漫幻想的经典小说.", category: "Literature" },
    { number: 104, title: "草叶集 : 沃尔特·惠特曼诗全集", author: "(美) 沃尔特·惠特曼著 ; 邹仲之译", publisher: "上海 上海译文出版社 2015", description: "惠特曼歌唱民主,自由与生命的自由体诗集,美国精神的颂歌.", category: "Literature" },
    { number: 105, title: "海明威短篇小说全集", author: "陈良廷等译", publisher: "上海 上海译文出版社 1995", description: "海明威以'冰山理论'创作的硬汉文学经典,简洁而有力.", category: "Literature" },
    { number: 106, title: "百年孤独", author: "(哥伦比亚) 马尔克斯 著;高长荣 译", publisher: "北京 北京十月文艺出版社 1993", description: "马尔克斯以魔幻现实主义描绘布恩迪亚家族七代人的孤独史诗.", category: "Literature" },
    { number: 107, title: "人类简史 : 从动物到上帝", author: "(以) 尤瓦尔·赫拉利著; 林俊宏译", publisher: "北京 中信出版集团 2017", description: "赫拉利以宏阔视角审视人类从智人到今天的演进历程,颠覆性的认知革命.", category: "History" },
    { number: 108, title: "青铜时代", author: "郭沫若著", publisher: "北京 中国人民大学出版社 2005", description: "郭沫若运用唯物史观研究中国古代社会,开创史学新范式的力作.", category: "History" },
    { number: 109, title: "國史大綱", author: "錢穆著", publisher: "北京 商务印书馆 2015", description: "钱穆承袭传统史学精神撰写的通史,强调对本国历史的温情与敬意.", category: "History" },
    { number: 110, title: "史记", author: "韩兆琦译注", publisher: "北京 中华书局 2007", description: "司马迁纪传体史书典范,韩兆琦译注让无韵之离骚更贴近现代读者.", category: "History" },
    { number: 111, title: "左傳紀事本末", author: "(清) 高士奇", publisher: "北京 中华书局 2015", description: "高士奇改编'左传'为纪事本末体,方便读者把握历史事件全貌.", category: "History" },
    { number: 112, title: "春秋左傳注", author: "楊伯峻編著", publisher: "北京 中华书局 2016", description: "杨伯峻详注编年体史学与文学名著,左氏春秋学的集大成之作.", category: "History" },
    { number: 113, title: "兩漢魏晉南北朝正史西域傳要注", author: "余太山著", publisher: "北京 商务印书馆 2013", description: "余太山梳理西域历史,考证两汉魏晋南北朝正史西域传的力作.", category: "History" },
    { number: 114, title: "旧制度与大革命", author: "(法) 托克维尔著 ; 冯棠译", publisher: "北京 商务印书馆 2013", description: "托克维尔剖析法国大革命根源,揭示革命与旧制度复杂关系的经典史著.", category: "History" },
    { number: 115, title: "礼记译注", author: "杨天宇译注", publisher: "上海 上海古籍出版社 2016", description: "杨天宇译注儒家礼制经典,展现古代社会规范与伦理秩序的典籍.", category: "Philosophy" },
    { number: 116, title: "从混沌到有序 : 人与自然的新对话", author: "(比) 普里戈金,(法) 斯唐热著 ; 曾庆宏, 沈小峰 译", publisher: "上海 上海译文出版社 1987", description: "普里戈金阐述耗散结构理论,揭示宇宙从混沌到有序的自组织奥秘.", category: "Science" },
    { number: 117, title: "中国古代科学思想史", author: "(英) 李约瑟著 ; 陈立夫主译", publisher: "南昌 江西人民出版社 2006", description: "李约瑟巨著研究中国科技文明,探讨'李约瑟问题'的权威文本.", category: "Science" },
    { number: 118, title: "时间简史 : 插图版", author: "(英) 史蒂芬·霍金著; 许明贤, 吴忠超译", publisher: "长沙 湖南科学技术出版社 2007", description: "霍金以通俗文笔解读宇宙起源,黑洞与时间本质的科普经典.", category: "Science" },
    { number: 119, title: "鲁迅选集", author: "鲁迅著", publisher: "北京 人民文学出版社 2004", description: "现代中国文学与思想的革命旗手,匕首与投枪般的战斗檄文集.", category: "Literature" },
    { number: 120, title: "顧炎武全集", author: "顧炎武著", publisher: "上海 上海古籍出版社 2011", description: "明清之际经世致用思想的集大成,清代朴学精神的开创者全集.", category: "Philosophy" },
];

// State management
let booksState = {
    allBooks: [],
    filteredBooks: [],
    readBooks: new Set(),
    filters: {
        category: '',
        status: ''
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeBooks();
    loadReadBooks();
    setupEventListeners();
    renderBooks();
    updateStats();
});

function initializeBooks() {
    booksState.allBooks = BOOKS_DATA.map(book => ({
        ...book,
        id: `book-${book.number}`
    }));
    booksState.filteredBooks = [...booksState.allBooks];
}

function loadReadBooks() {
    const saved = localStorage.getItem('thuBookList_readBooks');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            booksState.readBooks = new Set(data.map(item => item.id));
        } catch (e) {
            console.error('Error loading read books:', e);
        }
    }
}

function saveReadBooks() {
    const data = Array.from(booksState.readBooks).map(id => {
        const book = booksState.allBooks.find(b => b.id === id);
        return {
            id,
            number: book.number,
            title: book.title,
            readDate: new Date().toISOString().split('T')[0]
        };
    });
    localStorage.setItem('thuBookList_readBooks', JSON.stringify(data));
}

function setupEventListeners() {
    // Filter listeners
    document.getElementById('categoryFilter').addEventListener('change', applyFilters);
    document.getElementById('statusFilter').addEventListener('change', applyFilters);
    document.getElementById('clearFilters').addEventListener('click', clearFilters);

    // Modal listeners
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('markReadBtn').addEventListener('click', toggleReadStatus);

    // Quick action listeners
    document.getElementById('importDataBtn').addEventListener('click', () => {
        document.getElementById('importFileInput').click();
    });
    document.getElementById('importFileInput').addEventListener('change', importData);
    document.getElementById('exportDataBtn').addEventListener('click', exportData);
    document.getElementById('clearAllBtn').addEventListener('click', clearAllData);

    document.getElementById('bookModal').addEventListener('click', (e) => {
        if (e.target.id === 'bookModal') closeModal();
    });

    // Filter toggle
    const toggleFiltersBtn = document.getElementById('toggleFiltersBtn');
    const filtersContainer = document.getElementById('filtersContainer');
    if (toggleFiltersBtn && filtersContainer) {
        toggleFiltersBtn.addEventListener('click', () => {
            filtersContainer.classList.toggle('hidden');
            const isHidden = filtersContainer.classList.contains('hidden');

            if (isHidden) {
                toggleFiltersBtn.innerHTML = '<span class="btn-icon">⚙️</span> Filters';
                toggleFiltersBtn.classList.remove('active');
            } else {
                toggleFiltersBtn.innerHTML = '<span class="btn-icon">✖️</span> Close';
                toggleFiltersBtn.classList.add('active');
            }
        });
    }
}

function applyFilters() {
    booksState.filters.category = document.getElementById('categoryFilter').value;
    booksState.filters.status = document.getElementById('statusFilter').value;

    booksState.filteredBooks = booksState.allBooks.filter(book => {
        const categoryMatch = !booksState.filters.category || book.category === booksState.filters.category;
        const statusMatch = !booksState.filters.status ||
            (booksState.filters.status === 'read' && booksState.readBooks.has(book.id)) ||
            (booksState.filters.status === 'unread' && !booksState.readBooks.has(book.id));

        return categoryMatch && statusMatch;
    });

    renderBooks();
    updateStats();
}

function clearFilters() {
    document.getElementById('categoryFilter').value = '';
    document.getElementById('statusFilter').value = '';
    booksState.filters = { category: '', status: '' };
    booksState.filteredBooks = [...booksState.allBooks];
    renderBooks();
    updateStats();
}

function renderBooks() {
    const container = document.getElementById('booksList');
    const resultsCount = document.getElementById('resultsCount');

    resultsCount.textContent = `${booksState.filteredBooks.length} books`;

    if (booksState.filteredBooks.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No books found</p><small>Try adjusting your filters</small></div>';
        return;
    }

    container.innerHTML = booksState.filteredBooks.map(book => {
        const isRead = booksState.readBooks.has(book.id);
        return `
            <div class="book-item ${isRead ? 'read' : ''}" data-book-id="${book.id}">
                <div class="book-number">${book.number}</div>
                <div class="book-content">
                    <div class="book-title">${book.title}</div>
                    <div class="book-author">${book.author}</div>
                    <div class="book-meta">
                        <span class="book-publisher">${book.publisher}</span>
                    </div>
                    <div class="book-description-preview">${book.description}</div>
                </div>
            </div>
        `;
    }).join('');

    // Add click listeners to book items
    container.querySelectorAll('.book-item').forEach(item => {
        item.addEventListener('click', () => {
            const bookId = item.dataset.bookId;
            openBookModal(bookId);
        });
    });
}

function openBookModal(bookId) {
    const book = booksState.allBooks.find(b => b.id === bookId);
    if (!book) return;

    const isRead = booksState.readBooks.has(bookId);

    document.getElementById('bookTitle').textContent = book.title;
    document.getElementById('bookNumber').textContent = book.number;
    document.getElementById('bookAuthor').textContent = book.author;
    document.getElementById('bookPublisher').textContent = book.publisher;
    document.getElementById('bookDescription').textContent = book.description;
    document.getElementById('bookStatus').textContent = isRead ? 'Read' : 'Not Read';

    const markReadBtn = document.getElementById('markReadBtn');
    markReadBtn.textContent = isRead ? 'Mark as Unread' : 'Mark as Read';
    markReadBtn.dataset.bookId = bookId;

    document.getElementById('bookModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('bookModal').classList.add('hidden');
}

function toggleReadStatus() {
    const bookId = document.getElementById('markReadBtn').dataset.bookId;

    if (booksState.readBooks.has(bookId)) {
        booksState.readBooks.delete(bookId);
    } else {
        booksState.readBooks.add(bookId);
    }

    saveReadBooks();
    renderBooks();
    updateStats();
    updateReadBooksList();
    closeModal();
}

function updateStats() {
    const readCount = booksState.readBooks.size;
    const totalBooks = booksState.allBooks.length;
    const percentage = totalBooks > 0 ? Math.round((readCount / totalBooks) * 100) : 0;

    document.getElementById('readCount').textContent = readCount;
    document.getElementById('readPercentage').textContent = `${percentage}%`;
    document.getElementById('totalBooks').textContent = totalBooks;

    // Calculate unique authors
    const uniqueAuthors = new Set(booksState.allBooks.map(b => b.author)).size;
    document.getElementById('uniqueAuthors').textContent = uniqueAuthors;

    updateReadBooksList();
}

function updateReadBooksList() {
    const container = document.getElementById('readBooksList');
    const countElement = document.getElementById('readBooksCount');

    const readBooksArray = Array.from(booksState.readBooks)
        .map(id => booksState.allBooks.find(b => b.id === id))
        .filter(Boolean)
        .sort((a, b) => a.number - b.number);

    countElement.textContent = readBooksArray.length;

    if (readBooksArray.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No books read yet</p><small>Click on books to mark them as read</small></div>';
        return;
    }

    container.innerHTML = readBooksArray.map(book => `
        <div class="read-book-item" data-book-id="${book.id}">
            <div class="read-book-name">
                <span class="read-book-number">${book.number}</span>
                <span class="read-book-title">${book.title}</span>
            </div>
        </div>
    `).join('');

    container.querySelectorAll('.read-book-item').forEach(item => {
        item.addEventListener('click', () => {
            openBookModal(item.dataset.bookId);
        });
    });
}

function exportData() {
    const data = {
        readBooks: Array.from(booksState.readBooks).map(id => {
            const book = booksState.allBooks.find(b => b.id === id);
            return {
                id,
                number: book.number,
                title: book.title,
                author: book.author,
                exportDate: new Date().toISOString()
            };
        }),
        exportDate: new Date().toISOString(),
        totalBooks: booksState.allBooks.length,
        readCount: booksState.readBooks.size
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `thu-book-list-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (data.readBooks && Array.isArray(data.readBooks)) {
                booksState.readBooks = new Set(data.readBooks.map(item => item.id));
                saveReadBooks();
                renderBooks();
                updateStats();
                alert('Data imported successfully!');
            }
        } catch (error) {
            alert('Error importing data. Please check the file format.');
            console.error('Import error:', error);
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

function clearAllData() {
    if (confirm('Are you sure you want to clear all reading progress? This cannot be undone.')) {
        booksState.readBooks.clear();
        saveReadBooks();
        renderBooks();
        updateStats();
    }
}
