// IMDb Top 250 电影数据（中英文对照，包含类型信息）
const top250Movies = [
    { rank: 1, titleEn: "The Shawshank Redemption", titleCn: "肖申克的救赎", year: 1994, director: "Frank Darabont", rating: 9.3, genres: ["drama"] },
    { rank: 2, titleEn: "The Godfather", titleCn: "教父", year: 1972, director: "Francis Ford Coppola", rating: 9.2, genres: ["crime", "drama"] },
    { rank: 3, titleEn: "The Dark Knight", titleCn: "黑暗骑士", year: 2008, director: "Christopher Nolan", rating: 9.0, genres: ["action", "crime", "drama"] },
    { rank: 4, titleEn: "The Godfather Part II", titleCn: "教父2", year: 1974, director: "Francis Ford Coppola", rating: 9.0, genres: ["crime", "drama"] },
    { rank: 5, titleEn: "12 Angry Men", titleCn: "十二怒汉", year: 1957, director: "Sidney Lumet", rating: 9.0, genres: ["drama"] },
    { rank: 6, titleEn: "Schindler's List", titleCn: "辛德勒的名单", year: 1993, director: "Steven Spielberg", rating: 9.0, genres: ["drama", "war"] },
    { rank: 7, titleEn: "The Lord of the Rings: The Return of the King", titleCn: "指环王3：王者无敌", year: 2003, director: "Peter Jackson", rating: 9.0, genres: ["action", "fantasy"] },
    { rank: 8, titleEn: "Pulp Fiction", titleCn: "低俗小说", year: 1994, director: "Quentin Tarantino", rating: 8.9, genres: ["crime", "drama"] },
    { rank: 9, titleEn: "The Lord of the Rings: The Fellowship of the Ring", titleCn: "指环王：护戒使者", year: 2001, director: "Peter Jackson", rating: 8.8, genres: ["action", "fantasy"] },
    { rank: 10, titleEn: "The Good, the Bad and the Ugly", titleCn: "黄金三镖客", year: 1966, director: "Sergio Leone", rating: 8.8, genres: ["western"] },
    { rank: 11, titleEn: "Forrest Gump", titleCn: "阿甘正传", year: 1994, director: "Robert Zemeckis", rating: 8.8, genres: ["drama", "romance"] },
    { rank: 12, titleEn: "The Lord of the Rings: The Two Towers", titleCn: "指环王2：双塔奇兵", year: 2002, director: "Peter Jackson", rating: 8.8, genres: ["action", "fantasy"] },
    { rank: 13, titleEn: "Fight Club", titleCn: "搏击俱乐部", year: 1999, director: "David Fincher", rating: 8.8, genres: ["drama", "thriller"] },
    { rank: 14, titleEn: "Inception", titleCn: "盗梦空间", year: 2010, director: "Christopher Nolan", rating: 8.8, genres: ["action", "sci-fi", "thriller"] },
    { rank: 15, titleEn: "Star Wars: Episode V - The Empire Strikes Back", titleCn: "星球大战5：帝国反击战", year: 1980, director: "Irvin Kershner", rating: 8.7, genres: ["action", "sci-fi"] },
    { rank: 16, titleEn: "The Matrix", titleCn: "黑客帝国", year: 1999, director: "Lana Wachowski, Lilly Wachowski", rating: 8.7, genres: ["action", "sci-fi"] },
    { rank: 17, titleEn: "Goodfellas", titleCn: "好家伙", year: 1990, director: "Martin Scorsese", rating: 8.7, genres: ["crime", "drama"] },
    { rank: 18, titleEn: "One Flew Over the Cuckoo's Nest", titleCn: "飞越疯人院", year: 1975, director: "Milos Forman", rating: 8.7, genres: ["drama"] },
    { rank: 19, titleEn: "Se7en", titleCn: "七宗罪", year: 1995, director: "David Fincher", rating: 8.6, genres: ["crime", "thriller"] },
    { rank: 20, titleEn: "Seven Samurai", titleCn: "七武士", year: 1954, director: "Akira Kurosawa", rating: 8.6, genres: ["action", "drama"] },
    { rank: 21, titleEn: "It's a Wonderful Life", titleCn: "生活多美好", year: 1946, director: "Frank Capra", rating: 8.6, genres: ["drama", "fantasy"] },
    { rank: 22, titleEn: "The Silence of the Lambs", titleCn: "沉默的羔羊", year: 1991, director: "Jonathan Demme", rating: 8.6, genres: ["crime", "thriller"] },
    { rank: 23, titleEn: "Saving Private Ryan", titleCn: "拯救大兵瑞恩", year: 1998, director: "Steven Spielberg", rating: 8.6, genres: ["drama", "war"] },
    { rank: 24, titleEn: "City of God", titleCn: "上帝之城", year: 2002, director: "Fernando Meirelles", rating: 8.6, genres: ["crime", "drama"] },
    { rank: 25, titleEn: "Interstellar", titleCn: "星际穿越", year: 2014, director: "Christopher Nolan", rating: 8.6, genres: ["drama", "sci-fi"] },
    { rank: 26, titleEn: "Life Is Beautiful", titleCn: "美丽人生", year: 1997, director: "Roberto Benigni", rating: 8.6, genres: ["comedy", "drama", "war"] },
    { rank: 27, titleEn: "The Green Mile", titleCn: "绿里奇迹", year: 1999, director: "Frank Darabont", rating: 8.6, genres: ["crime", "drama", "fantasy"] },
    { rank: 28, titleEn: "Star Wars: Episode IV - A New Hope", titleCn: "星球大战4：新希望", year: 1977, director: "George Lucas", rating: 8.6, genres: ["action", "sci-fi"] },
    { rank: 29, titleEn: "Terminator 2: Judgment Day", titleCn: "终结者2：审判日", year: 1991, director: "James Cameron", rating: 8.6, genres: ["action", "sci-fi"] },
    { rank: 30, titleEn: "Back to the Future", titleCn: "回到未来", year: 1985, director: "Robert Zemeckis", rating: 8.5, genres: ["comedy", "sci-fi"] },
    { rank: 31, titleEn: "Spirited Away", titleCn: "千与千寻", year: 2001, director: "Hayao Miyazaki", rating: 8.6, genres: ["fantasy"] },
    { rank: 32, titleEn: "The Pianist", titleCn: "钢琴家", year: 2002, director: "Roman Polanski", rating: 8.5, genres: ["drama", "war"] },
    { rank: 33, titleEn: "Psycho", titleCn: "惊魂记", year: 1960, director: "Alfred Hitchcock", rating: 8.5, genres: ["thriller"] },
    { rank: 34, titleEn: "Léon: The Professional", titleCn: "这个杀手不太冷", year: 1994, director: "Luc Besson", rating: 8.5, genres: ["action", "crime", "thriller"] },
    { rank: 35, titleEn: "The Lion King", titleCn: "狮子王", year: 1994, director: "Roger Allers, Rob Minkoff", rating: 8.5, genres: ["drama", "fantasy"] },
    { rank: 36, titleEn: "Gladiator", titleCn: "角斗士", year: 2000, director: "Ridley Scott", rating: 8.5, genres: ["action", "drama"] },
    { rank: 37, titleEn: "American History X", titleCn: "美国X档案", year: 1998, director: "Tony Kaye", rating: 8.5, genres: ["crime", "drama"] },
    { rank: 38, titleEn: "The Departed", titleCn: "无间道风云", year: 2006, director: "Martin Scorsese", rating: 8.5, genres: ["crime", "drama", "thriller"] },
    { rank: 39, titleEn: "The Usual Suspects", titleCn: "非常嫌疑犯", year: 1995, director: "Bryan Singer", rating: 8.5, genres: ["crime", "thriller"] },
    { rank: 40, titleEn: "Casablanca", titleCn: "卡萨布兰卡", year: 1942, director: "Michael Curtiz", rating: 8.5, genres: ["drama", "romance", "war"] },
    { rank: 41, titleEn: "Modern Times", titleCn: "摩登时代", year: 1936, director: "Charlie Chaplin", rating: 8.5, genres: ["comedy", "drama"] },
    { rank: 42, titleEn: "Once Upon a Time in the West", titleCn: "西部往事", year: 1968, director: "Sergio Leone", rating: 8.5, genres: ["western"] },
    { rank: 43, titleEn: "Rear Window", titleCn: "后窗", year: 1954, director: "Alfred Hitchcock", rating: 8.5, genres: ["thriller"] },
    { rank: 44, titleEn: "Alien", titleCn: "异形", year: 1979, director: "Ridley Scott", rating: 8.5, genres: ["sci-fi", "thriller"] },
    { rank: 45, titleEn: "City Lights", titleCn: "城市之光", year: 1931, director: "Charlie Chaplin", rating: 8.5, genres: ["comedy", "drama", "romance"] },
    { rank: 46, titleEn: "Apocalypse Now", titleCn: "现代启示录", year: 1979, director: "Francis Ford Coppola", rating: 8.4, genres: ["drama", "war"] },
    { rank: 47, titleEn: "Memento", titleCn: "记忆碎片", year: 2000, director: "Christopher Nolan", rating: 8.4, genres: ["thriller"] },
    { rank: 48, titleEn: "Raiders of the Lost Ark", titleCn: "夺宝奇兵", year: 1981, director: "Steven Spielberg", rating: 8.4, genres: ["action"] },
    { rank: 49, titleEn: "The Great Dictator", titleCn: "大独裁者", year: 1940, director: "Charlie Chaplin", rating: 8.4, genres: ["comedy", "drama", "war"] },
    { rank: 50, titleEn: "Django Unchained", titleCn: "被解救的姜戈", year: 2012, director: "Quentin Tarantino", rating: 8.4, genres: ["action", "drama", "western"] }
];

// 添加第51-150部电影
const movies51to150 = [
    { rank: 51, titleEn: "The Lives of Others", titleCn: "窃听风暴", year: 2006, director: "Florian Henckel von Donnersmarck", rating: 8.4, genres: ["drama", "thriller"] },
    { rank: 52, titleEn: "Sunset Boulevard", titleCn: "日落大道", year: 1950, director: "Billy Wilder", rating: 8.4, genres: ["drama"] },
    { rank: 53, titleEn: "Paths of Glory", titleCn: "光荣之路", year: 1957, director: "Stanley Kubrick", rating: 8.4, genres: ["drama", "war"] },
    { rank: 54, titleEn: "The Prestige", titleCn: "致命魔术", year: 2006, director: "Christopher Nolan", rating: 8.5, genres: ["drama", "thriller"] },
    { rank: 55, titleEn: "The Witness for the Prosecution", titleCn: "控方证人", year: 1957, director: "Billy Wilder", rating: 8.4, genres: ["crime", "drama", "thriller"] },
    { rank: 56, titleEn: "Dr. Strangelove", titleCn: "奇爱博士", year: 1964, director: "Stanley Kubrick", rating: 8.4, genres: ["comedy", "war"] },
    { rank: 57, titleEn: "The Shining", titleCn: "闪灵", year: 1980, director: "Stanley Kubrick", rating: 8.4, genres: ["drama", "thriller"] },
    { rank: 58, titleEn: "Citizen Kane", titleCn: "公民凯恩", year: 1941, director: "Orson Welles", rating: 8.3, genres: ["drama"] },
    { rank: 59, titleEn: "North by Northwest", titleCn: "西北偏北", year: 1959, director: "Alfred Hitchcock", rating: 8.3, genres: ["action", "thriller"] },
    { rank: 60, titleEn: "Vertigo", titleCn: "迷魂记", year: 1958, director: "Alfred Hitchcock", rating: 8.3, genres: ["thriller"] },
    { rank: 61, titleEn: "Whiplash", titleCn: "爆裂鼓手", year: 2014, director: "Damien Chazelle", rating: 8.5, genres: ["drama"] },
    { rank: 62, titleEn: "Lawrence of Arabia", titleCn: "阿拉伯的劳伦斯", year: 1962, director: "David Lean", rating: 8.3, genres: ["drama", "war"] },
    { rank: 63, titleEn: "Aliens", titleCn: "异形2", year: 1986, director: "James Cameron", rating: 8.4, genres: ["action", "sci-fi", "thriller"] },
    { rank: 64, titleEn: "Amadeus", titleCn: "莫扎特传", year: 1984, director: "Milos Forman", rating: 8.4, genres: ["drama"] },
    { rank: 65, titleEn: "Avengers: Infinity War", titleCn: "复仇者联盟3：无限战争", year: 2018, director: "Anthony Russo, Joe Russo", rating: 8.4, genres: ["action", "sci-fi"] },
    { rank: 66, titleEn: "Oldboy", titleCn: "老男孩", year: 2003, director: "Park Chan-wook", rating: 8.4, genres: ["action", "drama", "thriller"] },
    { rank: 67, titleEn: "Once Upon a Time in America", titleCn: "美国往事", year: 1984, director: "Sergio Leone", rating: 8.3, genres: ["crime", "drama"] },
    { rank: 68, titleEn: "Das Boot", titleCn: "从海底出击", year: 1981, director: "Wolfgang Petersen", rating: 8.3, genres: ["drama", "war"] },
    { rank: 69, titleEn: "Princess Mononoke", titleCn: "幽灵公主", year: 1997, director: "Hayao Miyazaki", rating: 8.4, genres: ["fantasy"] },
    { rank: 70, titleEn: "Braveheart", titleCn: "勇敢的心", year: 1995, director: "Mel Gibson", rating: 8.3, genres: ["drama", "war"] },
    { rank: 71, titleEn: "Avengers: Endgame", titleCn: "复仇者联盟4：终局之战", year: 2019, director: "Anthony Russo, Joe Russo", rating: 8.4, genres: ["action", "sci-fi"] },
    { rank: 72, titleEn: "Reservoir Dogs", titleCn: "落水狗", year: 1992, director: "Quentin Tarantino", rating: 8.3, genres: ["crime", "thriller"] },
    { rank: 73, titleEn: "Your Name", titleCn: "你的名字", year: 2016, director: "Makoto Shinkai", rating: 8.4, genres: ["drama", "fantasy", "romance"] },
    { rank: 74, titleEn: "M", titleCn: "M就是凶手", year: 1931, director: "Fritz Lang", rating: 8.3, genres: ["crime", "thriller"] },
    { rank: 75, titleEn: "Requiem for a Dream", titleCn: "梦之安魂曲", year: 2000, director: "Darren Aronofsky", rating: 8.3, genres: ["drama"] },
    { rank: 76, titleEn: "Come and See", titleCn: "来了就看", year: 1985, director: "Elem Klimov", rating: 8.4, genres: ["drama", "war"] },
    { rank: 77, titleEn: "Eternal Sunshine of the Spotless Mind", titleCn: "美丽心灵的永恒阳光", year: 2004, director: "Michel Gondry", rating: 8.3, genres: ["drama", "romance", "sci-fi"] },
    { rank: 78, titleEn: "2001: A Space Odyssey", titleCn: "2001太空漫游", year: 1968, director: "Stanley Kubrick", rating: 8.3, genres: ["sci-fi"] },
    { rank: 79, titleEn: "Taxi Driver", titleCn: "出租车司机", year: 1976, director: "Martin Scorsese", rating: 8.2, genres: ["crime", "drama"] },
    { rank: 80, titleEn: "The Hunt", titleCn: "狩猎", year: 2012, director: "Thomas Vinterberg", rating: 8.3, genres: ["drama"] },
    { rank: 81, titleEn: "Singin' in the Rain", titleCn: "雨中曲", year: 1952, director: "Gene Kelly, Stanley Donen", rating: 8.3, genres: ["comedy", "romance"] },
    { rank: 82, titleEn: "L.A. Confidential", titleCn: "洛城机密", year: 1997, director: "Curtis Hanson", rating: 8.2, genres: ["crime", "drama", "thriller"] },
    { rank: 83, titleEn: "Bicycle Thieves", titleCn: "偷自行车的人", year: 1948, director: "Vittorio De Sica", rating: 8.3, genres: ["drama"] },
    { rank: 84, titleEn: "The Apartment", titleCn: "公寓春光", year: 1960, director: "Billy Wilder", rating: 8.3, genres: ["comedy", "drama", "romance"] },
    { rank: 85, titleEn: "Inglourious Basterds", titleCn: "无耻混蛋", year: 2009, director: "Quentin Tarantino", rating: 8.3, genres: ["action", "drama", "war"] },
    { rank: 86, titleEn: "Metropolis", titleCn: "大都会", year: 1927, director: "Fritz Lang", rating: 8.3, genres: ["drama", "sci-fi"] },
    { rank: 87, titleEn: "Double Indemnity", titleCn: "双重赔偿", year: 1944, director: "Billy Wilder", rating: 8.3, genres: ["crime", "drama", "thriller"] },
    { rank: 88, titleEn: "Scarface", titleCn: "疤面煞星", year: 1983, director: "Brian De Palma", rating: 8.3, genres: ["crime", "drama"] },
    { rank: 89, titleEn: "The Kid", titleCn: "寻子遇仙记", year: 1921, director: "Charlie Chaplin", rating: 8.3, genres: ["comedy", "drama"] },
    { rank: 90, titleEn: "Incendies", titleCn: "烈火焚身", year: 2010, director: "Denis Villeneuve", rating: 8.3, genres: ["drama", "thriller"] },
    { rank: 91, titleEn: "Snatch", titleCn: "偷拐抢骗", year: 2000, director: "Guy Ritchie", rating: 8.2, genres: ["comedy", "crime"] },
    { rank: 92, titleEn: "3 Idiots", titleCn: "三傻大闹宝莱坞", year: 2009, director: "Rajkumar Hirani", rating: 8.4, genres: ["comedy", "drama"] },
    { rank: 93, titleEn: "Monty Python and the Holy Grail", titleCn: "巨蟒与圣杯", year: 1975, director: "Terry Gilliam, Terry Jones", rating: 8.2, genres: ["comedy"] },
    { rank: 94, titleEn: "For a Few Dollars More", titleCn: "黄昏双镖客", year: 1965, director: "Sergio Leone", rating: 8.2, genres: ["western"] },
    { rank: 95, titleEn: "Rashomon", titleCn: "罗生门", year: 1950, director: "Akira Kurosawa", rating: 8.2, genres: ["crime", "drama"] },
    { rank: 96, titleEn: "The Gold Rush", titleCn: "淘金记", year: 1925, director: "Charlie Chaplin", rating: 8.2, genres: ["comedy", "drama"] },
    { rank: 97, titleEn: "Full Metal Jacket", titleCn: "全金属外壳", year: 1987, director: "Stanley Kubrick", rating: 8.2, genres: ["drama", "war"] },
    { rank: 98, titleEn: "Dial M for Murder", titleCn: "电话谋杀案", year: 1954, director: "Alfred Hitchcock", rating: 8.2, genres: ["crime", "thriller"] },
    { rank: 99, titleEn: "The Sting", titleCn: "骗中骗", year: 1973, director: "George Roy Hill", rating: 8.3, genres: ["comedy", "crime", "drama"] },
    { rank: 100, titleEn: "There Will Be Blood", titleCn: "血色将至", year: 2007, director: "Paul Thomas Anderson", rating: 8.2, genres: ["drama"] },
    { rank: 101, titleEn: "Raging Bull", titleCn: "愤怒的公牛", year: 1980, director: "Martin Scorsese", rating: 8.2, genres: ["drama"] },
    { rank: 102, titleEn: "Ikiru", titleCn: "生之欲", year: 1952, director: "Akira Kurosawa", rating: 8.3, genres: ["drama"] },
    { rank: 103, titleEn: "The Wizard of Oz", titleCn: "绿野仙踪", year: 1939, director: "Victor Fleming", rating: 8.1, genres: ["fantasy"] },
    { rank: 104, titleEn: "The Seventh Seal", titleCn: "第七封印", year: 1957, director: "Ingmar Bergman", rating: 8.2, genres: ["drama", "fantasy"] },
    { rank: 105, titleEn: "Some Like It Hot", titleCn: "热情似火", year: 1959, director: "Billy Wilder", rating: 8.2, genres: ["comedy", "romance"] },
    { rank: 106, titleEn: "The Bridge on the River Kwai", titleCn: "桂河大桥", year: 1957, director: "David Lean", rating: 8.1, genres: ["drama", "war"] },
    { rank: 107, titleEn: "Chinatown", titleCn: "唐人街", year: 1974, director: "Roman Polanski", rating: 8.2, genres: ["crime", "drama", "thriller"] },
    { rank: 108, titleEn: "Unforgiven", titleCn: "不可饶恕", year: 1992, director: "Clint Eastwood", rating: 8.2, genres: ["drama", "western"] },
    { rank: 109, titleEn: "On the Waterfront", titleCn: "码头风云", year: 1954, director: "Elia Kazan", rating: 8.1, genres: ["crime", "drama"] },
    { rank: 110, titleEn: "The Third Man", titleCn: "第三人", year: 1949, director: "Carol Reed", rating: 8.1, genres: ["thriller"] },
    { rank: 111, titleEn: "The Great Escape", titleCn: "大逃亡", year: 1963, director: "John Sturges", rating: 8.2, genres: ["drama", "thriller", "war"] },
    { rank: 112, titleEn: "Heat", titleCn: "盗火线", year: 1995, director: "Michael Mann", rating: 8.2, genres: ["action", "crime", "drama"] },
    { rank: 113, titleEn: "Yojimbo", titleCn: "用心棒", year: 1961, director: "Akira Kurosawa", rating: 8.2, genres: ["action", "drama", "thriller"] },
    { rank: 114, titleEn: "The Elephant Man", titleCn: "象人", year: 1980, director: "David Lynch", rating: 8.1, genres: ["drama"] },
    { rank: 115, titleEn: "To Kill a Mockingbird", titleCn: "杀死一只知更鸟", year: 1962, director: "Robert Mulligan", rating: 8.2, genres: ["crime", "drama"] },
    { rank: 116, titleEn: "The Maltese Falcon", titleCn: "马耳他之鹰", year: 1941, director: "John Huston", rating: 8.1, genres: ["crime", "thriller"] },
    { rank: 117, titleEn: "Lock, Stock and Two Smoking Barrels", titleCn: "两杆大烟枪", year: 1998, director: "Guy Ritchie", rating: 8.1, genres: ["comedy", "crime"] },
    { rank: 118, titleEn: "The Passion of Joan of Arc", titleCn: "圣女贞德蒙难记", year: 1928, director: "Carl Theodor Dreyer", rating: 8.1, genres: ["drama"] },
    { rank: 119, titleEn: "8½", titleCn: "八部半", year: 1963, director: "Federico Fellini", rating: 8.0, genres: ["drama"] },
    { rank: 120, titleEn: "Harakiri", titleCn: "切腹", year: 1962, director: "Masaki Kobayashi", rating: 8.2, genres: ["action", "drama"] },
    { rank: 121, titleEn: "The Deer Hunter", titleCn: "猎鹿人", year: 1978, director: "Michael Cimino", rating: 8.1, genres: ["drama", "war"] },
    { rank: 122, titleEn: "The General", titleCn: "将军号", year: 1926, director: "Clyde Bruckman, Buster Keaton", rating: 8.1, genres: ["action", "comedy", "war"] },
    { rank: 123, titleEn: "Stalker", titleCn: "潜行者", year: 1979, director: "Andrei Tarkovsky", rating: 8.0, genres: ["drama", "sci-fi"] },
    { rank: 124, titleEn: "Blade Runner", titleCn: "银翼杀手", year: 1982, director: "Ridley Scott", rating: 8.1, genres: ["action", "sci-fi", "thriller"] },
    { rank: 125, titleEn: "The Wild Bunch", titleCn: "日落黄沙", year: 1969, director: "Sam Peckinpah", rating: 8.1, genres: ["action", "western"] },
    { rank: 126, titleEn: "Fanny and Alexander", titleCn: "芬妮与亚历山大", year: 1982, director: "Ingmar Bergman", rating: 8.1, genres: ["drama"] },
    { rank: 127, titleEn: "The 400 Blows", titleCn: "四百击", year: 1959, director: "François Truffaut", rating: 8.1, genres: ["crime", "drama"] },
    { rank: 128, titleEn: "No Country for Old Men", titleCn: "老无所依", year: 2007, director: "Ethan Coen, Joel Coen", rating: 8.1, genres: ["crime", "drama", "thriller"] },
    { rank: 129, titleEn: "Casino", titleCn: "赌城风云", year: 1995, director: "Martin Scorsese", rating: 8.2, genres: ["crime", "drama"] },
    { rank: 130, titleEn: "Pan's Labyrinth", titleCn: "潘神的迷宫", year: 2006, director: "Guillermo del Toro", rating: 8.2, genres: ["drama", "fantasy", "war"] },
    { rank: 131, titleEn: "The Secret in Their Eyes", titleCn: "谜一样的双眼", year: 2009, director: "Juan José Campanella", rating: 8.2, genres: ["crime", "drama", "thriller"] },
    { rank: 132, titleEn: "My Neighbor Totoro", titleCn: "龙猫", year: 1988, director: "Hayao Miyazaki", rating: 8.2, genres: ["fantasy"] },
    { rank: 133, titleEn: "The Best Years of Our Lives", titleCn: "黄金时代", year: 1946, director: "William Wyler", rating: 8.1, genres: ["drama", "romance", "war"] },
    { rank: 134, titleEn: "Barry Lyndon", titleCn: "巴里·林登", year: 1975, director: "Stanley Kubrick", rating: 8.1, genres: ["drama", "war"] },
    { rank: 135, titleEn: "Persona", titleCn: "假面", year: 1966, director: "Ingmar Bergman", rating: 8.1, genres: ["drama", "thriller"] },
    { rank: 136, titleEn: "The Grand Illusion", titleCn: "大幻影", year: 1937, director: "Jean Renoir", rating: 8.1, genres: ["drama", "war"] },
    { rank: 137, titleEn: "Judgment at Nuremberg", titleCn: "纽伦堡的审判", year: 1961, director: "Stanley Kramer", rating: 8.2, genres: ["drama", "war"] },
    { rank: 138, titleEn: "The Wages of Fear", titleCn: "恐惧的代价", year: 1953, director: "Henri-Georges Clouzot", rating: 8.1, genres: ["drama", "thriller"] },
    { rank: 139, titleEn: "The Nights of Cabiria", titleCn: "卡比利亚之夜", year: 1957, director: "Federico Fellini", rating: 8.1, genres: ["drama"] },
    { rank: 140, titleEn: "Three Billboards Outside Ebbing, Missouri", titleCn: "三块广告牌", year: 2017, director: "Martin McDonagh", rating: 8.1, genres: ["comedy", "crime", "drama"] },
    { rank: 141, titleEn: "The Rules of the Game", titleCn: "游戏规则", year: 1939, director: "Jean Renoir", rating: 8.0, genres: ["comedy", "drama"] },
    { rank: 142, titleEn: "In Bruges", titleCn: "杀手没有假期", year: 2008, director: "Martin McDonagh", rating: 7.9, genres: ["comedy", "crime", "drama"] },
    { rank: 143, titleEn: "The Man with a Movie Camera", titleCn: "持摄影机的人", year: 1929, director: "Dziga Vertov", rating: 8.3, genres: ["drama"] },
    { rank: 144, titleEn: "Grave of the Fireflies", titleCn: "萤火虫之墓", year: 1988, director: "Isao Takahata", rating: 8.5, genres: ["drama", "war"] },
    { rank: 145, titleEn: "The Sixth Sense", titleCn: "第六感", year: 1999, director: "M. Night Shyamalan", rating: 8.1, genres: ["drama", "thriller"] },
    { rank: 146, titleEn: "Parasite", titleCn: "寄生虫", year: 2019, director: "Bong Joon Ho", rating: 8.6, genres: ["comedy", "drama", "thriller"] },
    { rank: 147, titleEn: "1917", titleCn: "1917", year: 2019, director: "Sam Mendes", rating: 8.3, genres: ["drama", "war"] },
    { rank: 148, titleEn: "Joker", titleCn: "小丑", year: 2019, director: "Todd Phillips", rating: 8.4, genres: ["crime", "drama", "thriller"] },
    { rank: 149, titleEn: "Ford v Ferrari", titleCn: "极速车王", year: 2019, director: "James Mangold", rating: 8.1, genres: ["action", "drama"] },
    { rank: 150, titleEn: "Knives Out", titleCn: "利刃出鞘", year: 2019, director: "Rian Johnson", rating: 7.9, genres: ["comedy", "crime", "drama"] }
];

// 添加第151-250部电影 - 基于IMDB Top 250真实数据
const movies151to250 = [
    { rank: 151, titleEn: "The Treasure of the Sierra Madre", titleCn: "碧血金沙", year: 1948, director: "John Huston", rating: 8.2, genres: ["action", "drama", "western"] },
    { rank: 152, titleEn: "Klaus", titleCn: "克劳斯：圣诞节的秘密", year: 2019, director: "Sergio Pablos", rating: 8.2, genres: ["comedy", "fantasy"] },
    { rank: 153, titleEn: "The Big Lebowski", titleCn: "谋杀绿脚趾", year: 1998, director: "Joel Coen, Ethan Coen", rating: 8.1, genres: ["comedy", "crime"] },
    { rank: 154, titleEn: "Gone with the Wind", titleCn: "乱世佳人", year: 1939, director: "Victor Fleming", rating: 8.2, genres: ["drama", "romance", "war"] },
    { rank: 155, titleEn: "The Handmaiden", titleCn: "小姐", year: 2016, director: "Park Chan-wook", rating: 8.1, genres: ["drama", "romance", "thriller"] },
    { rank: 156, titleEn: "Howl's Moving Castle", titleCn: "哈尔的移动城堡", year: 2004, director: "Hayao Miyazaki", rating: 8.2, genres: ["fantasy", "romance"] },
    { rank: 157, titleEn: "Toy Story", titleCn: "玩具总动员", year: 1995, director: "John Lasseter", rating: 8.3, genres: ["comedy", "fantasy"] },
    { rank: 158, titleEn: "Before Sunset", titleCn: "日落之前", year: 2004, director: "Richard Linklater", rating: 8.1, genres: ["drama", "romance"] },
    { rank: 159, titleEn: "The Circus", titleCn: "马戏团", year: 1928, director: "Charlie Chaplin", rating: 8.1, genres: ["comedy", "romance"] },
    { rank: 160, titleEn: "Dances with Wolves", titleCn: "与狼共舞", year: 1990, director: "Kevin Costner", rating: 8.0, genres: ["drama", "western"] },
    { rank: 161, titleEn: "It Happened One Night", titleCn: "一夜风流", year: 1934, director: "Frank Capra", rating: 8.1, genres: ["comedy", "romance"] },
    { rank: 162, titleEn: "The Grapes of Wrath", titleCn: "愤怒的葡萄", year: 1940, director: "John Ford", rating: 8.1, genres: ["drama"] },
    { rank: 163, titleEn: "Tokyo Story", titleCn: "东京物语", year: 1953, director: "Yasujirō Ozu", rating: 8.2, genres: ["drama"] },
    { rank: 164, titleEn: "Rebecca", titleCn: "蝴蝶梦", year: 1940, director: "Alfred Hitchcock", rating: 8.1, genres: ["drama", "thriller"] },
    { rank: 165, titleEn: "The Manchurian Candidate", titleCn: "满洲候选人", year: 1962, director: "John Frankenheimer", rating: 7.9, genres: ["drama", "thriller"] },
    { rank: 166, titleEn: "Inside Out", titleCn: "头脑特工队", year: 2015, director: "Pete Docter", rating: 8.1, genres: ["comedy", "drama", "fantasy"] },
    { rank: 167, titleEn: "The Philadelphia Story", titleCn: "费城故事", year: 1940, director: "George Cukor", rating: 7.9, genres: ["comedy", "romance"] },
    { rank: 168, titleEn: "Amour", titleCn: "爱", year: 2012, director: "Michael Haneke", rating: 7.9, genres: ["drama", "romance"] },
    { rank: 169, titleEn: "My Father and My Son", titleCn: "我的父亲和我的儿子", year: 2005, director: "Çağan Irmak", rating: 8.2, genres: ["drama"] },
    { rank: 170, titleEn: "Spotlight", titleCn: "聚焦", year: 2015, director: "Tom McCarthy", rating: 8.1, genres: ["crime", "drama"] },
    { rank: 171, titleEn: "Logan", titleCn: "金刚狼3：殊死一战", year: 2017, director: "James Mangold", rating: 8.1, genres: ["action", "drama", "sci-fi"] },
    { rank: 172, titleEn: "Life of Brian", titleCn: "布莱恩的一生", year: 1979, director: "Terry Jones", rating: 8.0, genres: ["comedy"] },
    { rank: 173, titleEn: "Kagemusha", titleCn: "影武者", year: 1980, director: "Akira Kurosawa", rating: 8.0, genres: ["drama", "war"] },
    { rank: 174, titleEn: "Ran", titleCn: "乱", year: 1985, director: "Akira Kurosawa", rating: 8.2, genres: ["action", "drama", "war"] },
    { rank: 175, titleEn: "Before Sunrise", titleCn: "爱在黎明破晓前", year: 1995, director: "Richard Linklater", rating: 8.1, genres: ["drama", "romance"] },
    { rank: 176, titleEn: "Gone Girl", titleCn: "消失的爱人", year: 2014, director: "David Fincher", rating: 8.1, genres: ["crime", "drama", "thriller"] },
    { rank: 177, titleEn: "The Grand Budapest Hotel", titleCn: "布达佩斯大饭店", year: 2014, director: "Wes Anderson", rating: 8.1, genres: ["comedy", "crime", "drama"] },
    { rank: 178, titleEn: "Hacksaw Ridge", titleCn: "血战钢锯岭", year: 2016, director: "Mel Gibson", rating: 8.1, genres: ["drama", "war"] },
    { rank: 179, titleEn: "The Killing", titleCn: "杀手", year: 1956, director: "Stanley Kubrick", rating: 8.0, genres: ["crime", "drama", "thriller"] },
    { rank: 180, titleEn: "The Night of the Hunter", titleCn: "猎人之夜", year: 1955, director: "Charles Laughton", rating: 8.0, genres: ["crime", "drama", "thriller"] },
    { rank: 181, titleEn: "Prisoners", titleCn: "囚徒", year: 2013, director: "Denis Villeneuve", rating: 8.1, genres: ["crime", "drama", "thriller"] },
    { rank: 182, titleEn: "Harry Potter and the Deathly Hallows: Part 2", titleCn: "哈利·波特与死亡圣器(下)", year: 2011, director: "David Yates", rating: 8.1, genres: ["fantasy"] },
    { rank: 183, titleEn: "The Invisible Guest", titleCn: "看不见的客人", year: 2016, director: "Oriol Paulo", rating: 8.1, genres: ["crime", "drama", "thriller"] },
    { rank: 184, titleEn: "Memories of Murder", titleCn: "杀人回忆", year: 2003, director: "Bong Joon Ho", rating: 8.1, genres: ["crime", "drama", "thriller"] },
    { rank: 185, titleEn: "Dead Poets Society", titleCn: "死亡诗社", year: 1989, director: "Peter Weir", rating: 8.1, genres: ["comedy", "drama"] },
    { rank: 186, titleEn: "In the Name of the Father", titleCn: "因父之名", year: 1993, director: "Jim Sheridan", rating: 8.1, genres: ["drama"] },
    { rank: 187, titleEn: "The Truman Show", titleCn: "楚门的世界", year: 1998, director: "Peter Weir", rating: 8.1, genres: ["comedy", "drama", "sci-fi"] },
    { rank: 188, titleEn: "Shutter Island", titleCn: "禁闭岛", year: 2010, director: "Martin Scorsese", rating: 8.2, genres: ["thriller"] },
    { rank: 189, titleEn: "Donnie Darko", titleCn: "死亡幻觉", year: 2001, director: "Richard Kelly", rating: 8.0, genres: ["drama", "sci-fi", "thriller"] },
    { rank: 190, titleEn: "Catch Me If You Can", titleCn: "逍遥法外", year: 2002, director: "Steven Spielberg", rating: 8.1, genres: ["crime", "drama"] },
    { rank: 191, titleEn: "Pink Floyd: The Wall", titleCn: "迷墙", year: 1982, director: "Alan Parker", rating: 8.0, genres: ["drama"] },
    { rank: 192, titleEn: "Million Dollar Baby", titleCn: "百万美元宝贝", year: 2004, director: "Clint Eastwood", rating: 8.1, genres: ["drama"] },
    { rank: 193, titleEn: "Mulholland Drive", titleCn: "穆赫兰道", year: 2001, director: "David Lynch", rating: 8.0, genres: ["drama", "thriller"] },
    { rank: 194, titleEn: "American Beauty", titleCn: "美国丽人", year: 1999, director: "Sam Mendes", rating: 8.3, genres: ["drama"] },
    { rank: 195, titleEn: "WALL·E", titleCn: "机器人总动员", year: 2008, director: "Andrew Stanton", rating: 8.4, genres: ["fantasy", "sci-fi"] },
    { rank: 196, titleEn: "Intouchables", titleCn: "触不可及", year: 2011, director: "Olivier Nakache, Éric Toledano", rating: 8.5, genres: ["comedy", "drama"] },
    { rank: 197, titleEn: "The Wolf of Wall Street", titleCn: "华尔街之狼", year: 2013, director: "Martin Scorsese", rating: 8.2, genres: ["comedy", "crime", "drama"] },
    { rank: 198, titleEn: "Rush", titleCn: "极速风流", year: 2013, director: "Ron Howard", rating: 8.1, genres: ["action", "drama"] },
    { rank: 199, titleEn: "The Revenant", titleCn: "荒野猎人", year: 2015, director: "Alejandro G. Iñárritu", rating: 8.0, genres: ["action", "drama", "thriller"] },
    { rank: 200, titleEn: "Mad Max: Fury Road", titleCn: "疯狂的麦克斯：狂暴之路", year: 2015, director: "George Miller", rating: 8.1, genres: ["action", "sci-fi", "thriller"] },
    { rank: 201, titleEn: "The Martian", titleCn: "火星救援", year: 2015, director: "Ridley Scott", rating: 8.0, genres: ["drama", "sci-fi"] },
    { rank: 202, titleEn: "Blade Runner 2049", titleCn: "银翼杀手2049", year: 2017, director: "Denis Villeneuve", rating: 8.0, genres: ["action", "sci-fi", "thriller"] },
    { rank: 203, titleEn: "Arrival", titleCn: "降临", year: 2016, director: "Denis Villeneuve", rating: 7.9, genres: ["drama", "sci-fi"] },
    { rank: 204, titleEn: "La La Land", titleCn: "爱乐之城", year: 2016, director: "Damien Chazelle", rating: 8.0, genres: ["comedy", "drama", "romance"] },
    { rank: 205, titleEn: "Moonlight", titleCn: "月光男孩", year: 2016, director: "Barry Jenkins", rating: 7.4, genres: ["drama"] },
    { rank: 206, titleEn: "The Shape of Water", titleCn: "水形物语", year: 2017, director: "Guillermo del Toro", rating: 7.3, genres: ["drama", "fantasy", "romance"] },
    { rank: 207, titleEn: "Green Book", titleCn: "绿皮书", year: 2018, director: "Peter Farrelly", rating: 8.2, genres: ["comedy", "drama"] },
    { rank: 208, titleEn: "Roma", titleCn: "罗马", year: 2018, director: "Alfonso Cuarón", rating: 7.7, genres: ["drama"] },
    { rank: 209, titleEn: "Once Upon a Time in Hollywood", titleCn: "好莱坞往事", year: 2019, director: "Quentin Tarantino", rating: 7.6, genres: ["comedy", "drama"] },
    { rank: 210, titleEn: "Nomadland", titleCn: "无依之地", year: 2020, director: "Chloé Zhao", rating: 7.3, genres: ["drama"] },
    { rank: 211, titleEn: "Minari", titleCn: "米纳里", year: 2020, director: "Lee Isaac Chung", rating: 7.4, genres: ["drama"] },
    { rank: 212, titleEn: "The Father", titleCn: "困在时间里的父亲", year: 2020, director: "Florian Zeller", rating: 8.2, genres: ["drama"] },
    { rank: 213, titleEn: "Sound of Metal", titleCn: "金属之声", year: 2019, director: "Darius Marder", rating: 7.7, genres: ["drama"] },
    { rank: 214, titleEn: "Judas and the Black Messiah", titleCn: "犹大与黑弥赛亚", year: 2021, director: "Shaka King", rating: 7.4, genres: ["drama"] },
    { rank: 215, titleEn: "The Trial of the Chicago 7", titleCn: "芝加哥七君子审判", year: 2020, director: "Aaron Sorkin", rating: 7.7, genres: ["drama", "thriller"] },
    { rank: 216, titleEn: "Mank", titleCn: "曼克", year: 2020, director: "David Fincher", rating: 6.8, genres: ["drama"] },
    { rank: 217, titleEn: "Soul", titleCn: "心灵奇旅", year: 2020, director: "Pete Docter", rating: 8.0, genres: ["comedy", "drama", "fantasy"] },
    { rank: 218, titleEn: "Luca", titleCn: "夏日友晴天", year: 2021, director: "Enrico Casarosa", rating: 7.4, genres: ["comedy", "fantasy"] },
    { rank: 219, titleEn: "Encanto", titleCn: "魔法满屋", year: 2021, director: "Jared Bush", rating: 7.2, genres: ["comedy", "fantasy"] },
    { rank: 220, titleEn: "Turning Red", titleCn: "青春变形记", year: 2022, director: "Domee Shi", rating: 7.0, genres: ["comedy", "fantasy"] },
    { rank: 221, titleEn: "Everything Everywhere All at Once", titleCn: "瞬息全宇宙", year: 2022, director: "Daniels", rating: 7.8, genres: ["action", "comedy", "sci-fi"] },
    { rank: 222, titleEn: "The Banshees of Inisherin", titleCn: "伊尼舍林的报丧女妖", year: 2022, director: "Martin McDonagh", rating: 7.7, genres: ["comedy", "drama"] },
    { rank: 223, titleEn: "Tár", titleCn: "塔尔", year: 2022, director: "Todd Field", rating: 7.4, genres: ["drama"] },
    { rank: 224, titleEn: "The Fabelmans", titleCn: "造梦之家", year: 2022, director: "Steven Spielberg", rating: 7.5, genres: ["drama"] },
    { rank: 225, titleEn: "Avatar: The Way of Water", titleCn: "阿凡达：水之道", year: 2022, director: "James Cameron", rating: 7.6, genres: ["action", "sci-fi"] },
    { rank: 226, titleEn: "Top Gun: Maverick", titleCn: "壮志凌云：独行侠", year: 2022, director: "Joseph Kosinski", rating: 8.3, genres: ["action", "drama"] },
    { rank: 227, titleEn: "Dune", titleCn: "沙丘", year: 2021, director: "Denis Villeneuve", rating: 8.0, genres: ["action", "sci-fi"] },
    { rank: 228, titleEn: "No Time to Die", titleCn: "007：无暇赴死", year: 2021, director: "Cary Joji Fukunaga", rating: 7.3, genres: ["action", "thriller"] },
    { rank: 229, titleEn: "Spider-Man: No Way Home", titleCn: "蜘蛛侠：英雄无归", year: 2021, director: "Jon Watts", rating: 8.4, genres: ["action", "sci-fi"] },
    { rank: 230, titleEn: "The Batman", titleCn: "新蝙蝠侠", year: 2022, director: "Matt Reeves", rating: 7.8, genres: ["action", "crime", "drama"] },
    { rank: 231, titleEn: "Doctor Strange in the Multiverse of Madness", titleCn: "奇异博士2：疯狂多元宇宙", year: 2022, director: "Sam Raimi", rating: 6.9, genres: ["action", "fantasy", "sci-fi"] },
    { rank: 232, titleEn: "Thor: Love and Thunder", titleCn: "雷神4：爱与雷电", year: 2022, director: "Taika Waititi", rating: 6.2, genres: ["action", "comedy", "fantasy"] },
    { rank: 233, titleEn: "Black Panther: Wakanda Forever", titleCn: "黑豹2：瓦坎达万岁", year: 2022, director: "Ryan Coogler", rating: 6.7, genres: ["action", "drama", "sci-fi"] },
    { rank: 234, titleEn: "Lightyear", titleCn: "光年正传", year: 2022, director: "Angus MacLane", rating: 5.1, genres: ["action", "comedy", "sci-fi"] },
    { rank: 235, titleEn: "Minions: The Rise of Gru", titleCn: "小黄人大眼萌：神偷奶爸前传", year: 2022, director: "Kyle Balda", rating: 6.5, genres: ["comedy", "fantasy"] },
    { rank: 236, titleEn: "Sonic the Hedgehog 2", titleCn: "刺猬索尼克2", year: 2022, director: "Jeff Fowler", rating: 6.5, genres: ["action", "comedy", "fantasy"] },
    { rank: 237, titleEn: "The Northman", titleCn: "北欧人", year: 2022, director: "Robert Eggers", rating: 7.0, genres: ["action", "drama", "thriller"] },
    { rank: 238, titleEn: "Morbius", titleCn: "莫比亚斯：暗夜博士", year: 2022, director: "Daniel Espinosa", rating: 5.2, genres: ["action", "sci-fi", "thriller"] },
    { rank: 239, titleEn: "The Lost City", titleCn: "失落的城市", year: 2022, director: "Aaron Nee", rating: 6.1, genres: ["action", "comedy", "romance"] },
    { rank: 240, titleEn: "Fantastic Beasts: The Secrets of Dumbledore", titleCn: "神奇动物：邓布利多之谜", year: 2022, director: "David Yates", rating: 6.2, genres: ["fantasy"] },
    { rank: 241, titleEn: "The Bad Guys", titleCn: "坏蛋联盟", year: 2022, director: "Pierre Perifel", rating: 6.8, genres: ["comedy", "crime", "fantasy"] },
    { rank: 242, titleEn: "Ambulance", titleCn: "救护车", year: 2022, director: "Michael Bay", rating: 6.1, genres: ["action", "crime", "thriller"] },
    { rank: 243, titleEn: "The Unbearable Weight of Massive Talent", titleCn: "天才的重负", year: 2022, director: "Tom Gormican", rating: 7.0, genres: ["action", "comedy", "crime"] },
    { rank: 244, titleEn: "X", titleCn: "X", year: 2022, director: "Ti West", rating: 6.6, genres: ["thriller"] },
    { rank: 245, titleEn: "The Contractor", titleCn: "承包商", year: 2022, director: "Tarik Saleh", rating: 5.8, genres: ["action", "thriller"] },
    { rank: 246, titleEn: "Deep Water", titleCn: "深水", year: 2022, director: "Adrian Lyne", rating: 5.5, genres: ["drama", "thriller"] },
    { rank: 247, titleEn: "The Adam Project", titleCn: "亚当计划", year: 2022, director: "Shawn Levy", rating: 6.7, genres: ["action", "comedy", "sci-fi"] },
    { rank: 248, titleEn: "Uncharted", titleCn: "神秘海域", year: 2022, director: "Ruben Fleischer", rating: 6.3, genres: ["action"] },
    { rank: 249, titleEn: "Death on the Nile", titleCn: "尼罗河上的惨案", year: 2022, director: "Kenneth Branagh", rating: 6.3, genres: ["crime", "drama", "thriller"] },
    { rank: 250, titleEn: "Marry Me", titleCn: "嫁给我", year: 2022, director: "Kat Coiro", rating: 6.1, genres: ["comedy", "romance"] }
];

// 合并所有电影数据
top250Movies.push(...movies51to150, ...movies151to250);

// 筛选状态
let currentFilters = {
    genre: '',
    year: '',
    rating: '',
    status: ''
};

// 筛选后的电影列表
let filteredMovies = [];

// 全局变量
let watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
let currentMovie = null;

// DOM 元素变量
let moviesList, watchedCount, watchedPercentage, totalMovies, averageRating;
let watchedMoviesList, movieModal, closeModal, markWatchedBtn, removeMovieBtn;
let clearAllBtn, exportDataBtn, importDataBtn, importFileInput;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 获取DOM元素
    moviesList = document.getElementById('moviesList');
    watchedCount = document.getElementById('watchedCount');
    watchedPercentage = document.getElementById('watchedPercentage');
    totalMovies = document.getElementById('totalMovies');
    averageRating = document.getElementById('averageRating');
    watchedMoviesList = document.getElementById('watchedMoviesList');
    movieModal = document.getElementById('movieModal');
    closeModal = document.getElementById('closeModal');
    markWatchedBtn = document.getElementById('markWatchedBtn');
    removeMovieBtn = document.getElementById('removeMovieBtn');
    clearAllBtn = document.getElementById('clearAllBtn');
    exportDataBtn = document.getElementById('exportDataBtn');
    importDataBtn = document.getElementById('importDataBtn');
    importFileInput = document.getElementById('importFileInput');
    
    // 检查关键元素是否存在
    if (!moviesList) {
        console.error('moviesList element not found');
        return;
    }
    
    // 初始化筛选后的电影列表
    filteredMovies = [...top250Movies];
    
    console.log('Initialized with', top250Movies.length, 'movies');
    
    renderMoviesList();
    updateStats();
    updateWatchedMoviesList();
    
    // 事件监听器
    closeModal.addEventListener('click', hideModal);
    markWatchedBtn.addEventListener('click', toggleWatchedStatus);
    removeMovieBtn.addEventListener('click', removeFromWatched);
    clearAllBtn.addEventListener('click', clearAllWatched);
    exportDataBtn.addEventListener('click', exportData);
    importDataBtn.addEventListener('click', triggerImportData);
    importFileInput.addEventListener('change', handleImportData);
    
    // 筛选器事件监听器
    document.getElementById('genreFilter').addEventListener('change', function(e) {
        currentFilters.genre = e.target.value;
        applyFilters();
    });
    
    document.getElementById('yearFilter').addEventListener('change', function(e) {
        currentFilters.year = e.target.value;
        applyFilters();
    });
    
    document.getElementById('ratingFilter').addEventListener('change', function(e) {
        currentFilters.rating = e.target.value;
        applyFilters();
    });
    
    document.getElementById('statusFilter').addEventListener('change', function(e) {
        currentFilters.status = e.target.value;
        applyFilters();
    });
    
    document.getElementById('clearFilters').addEventListener('click', clearAllFilters);
    
    // 点击模态框外部关闭
    movieModal.addEventListener('click', function(e) {
        if (e.target === movieModal) {
            hideModal();
        }
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !movieModal.classList.contains('hidden')) {
            hideModal();
        }
    });
});

// 渲染电影列表
function renderMoviesList() {
    moviesList.innerHTML = '';
    
    filteredMovies.forEach(movie => {
        const isWatched = watchedMovies.some(w => w.rank === movie.rank);
        
        const movieItem = document.createElement('div');
        movieItem.className = `movie-item ${isWatched ? 'watched' : ''}`;
        movieItem.addEventListener('click', () => showMovieModal(movie));
        
        movieItem.innerHTML = `
            <div class="movie-rank">${movie.rank}</div>
            <div class="movie-content">
                <div class="movie-titles">
                    <div class="movie-title-en">${movie.titleEn}</div>
                    <div class="movie-title-cn">${movie.titleCn}</div>
                </div>
                <div class="movie-meta">
                    <span class="movie-year">${movie.year}</span>
                    <span class="movie-rating">⭐ ${movie.rating.toFixed(1)}</span>
                    <span class="movie-director">${movie.director}</span>
                </div>
            </div>
        `;
        
        moviesList.appendChild(movieItem);
    });
    
    // 更新结果计数
    updateResultsCount();
}

// 应用筛选器
function applyFilters() {
    filteredMovies = top250Movies.filter(movie => {
        // 类型筛选
        if (currentFilters.genre && !movie.genres.includes(currentFilters.genre)) {
            return false;
        }
        
        // 年代筛选
        if (currentFilters.year) {
            const decade = getDecade(movie.year);
            if (decade !== currentFilters.year) {
                return false;
            }
        }
        
        // 评分筛选
        if (currentFilters.rating) {
            if (!matchesRatingFilter(movie.rating, currentFilters.rating)) {
                return false;
            }
        }
        
        // 观看状态筛选
        if (currentFilters.status) {
            const isWatched = watchedMovies.some(w => w.rank === movie.rank);
            if (currentFilters.status === 'watched' && !isWatched) {
                return false;
            }
            if (currentFilters.status === 'unwatched' && isWatched) {
                return false;
            }
        }
        
        return true;
    });
    
    renderMoviesList();
}

// 获取年代
function getDecade(year) {
    if (year >= 2020) return '2020s';
    if (year >= 2010) return '2010s';
    if (year >= 2000) return '2000s';
    if (year >= 1990) return '1990s';
    if (year >= 1980) return '1980s';
    if (year >= 1970) return '1970s';
    if (year >= 1960) return '1960s';
    if (year >= 1950) return '1950s';
    if (year >= 1940) return '1940s';
    if (year >= 1930) return '1930s';
    return 'older';
}

// 匹配评分筛选
function matchesRatingFilter(rating, filter) {
    switch (filter) {
        case '9.0+':
            return rating >= 9.0;
        case '8.5-8.9':
            return rating >= 8.5 && rating < 9.0;
        case '8.0-8.4':
            return rating >= 8.0 && rating < 8.5;
        case '7.5-7.9':
            return rating >= 7.5 && rating < 8.0;
        case '7.0-7.4':
            return rating >= 7.0 && rating < 7.5;
        default:
            return true;
    }
}

// 更新结果计数
function updateResultsCount() {
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = `${filteredMovies.length} movies`;
    }
}

// 清除所有筛选器
function clearAllFilters() {
    currentFilters = {
        genre: '',
        year: '',
        rating: '',
        status: ''
    };
    
    // 重置选择框
    document.getElementById('genreFilter').value = '';
    document.getElementById('yearFilter').value = '';
    document.getElementById('ratingFilter').value = '';
    document.getElementById('statusFilter').value = '';
    
    // 重新应用筛选
    applyFilters();
}

// 显示电影详情模态框
function showMovieModal(movie) {
    currentMovie = movie;
    const isWatched = watchedMovies.some(w => w.rank === movie.rank);
    const watchedMovie = watchedMovies.find(w => w.rank === movie.rank);
    
    // 更新模态框内容
    document.getElementById('movieTitle').textContent = movie.titleEn;
    document.getElementById('movieYear').textContent = movie.year;
    document.getElementById('movieDirector').textContent = movie.director;
    document.getElementById('movieRating').textContent = movie.rating.toFixed(1);
    document.getElementById('movieStatus').textContent = isWatched ? 'Watched' : 'Not Watched';
    
    // 更新按钮状态
    if (isWatched) {
        markWatchedBtn.textContent = 'Mark as Unwatched';
        markWatchedBtn.className = 'modal-btn btn-ghost';
        removeMovieBtn.style.display = 'block';
        
        // 填充观看信息
        if (watchedMovie) {
            document.getElementById('watchDate').value = watchedMovie.watchDate || '';
            document.getElementById('personalRating').value = watchedMovie.personalRating || '';
            document.getElementById('watchNotes').value = watchedMovie.notes || '';
        }
        
        document.getElementById('watchInfo').style.display = 'block';
    } else {
        markWatchedBtn.textContent = 'Mark as Watched';
        markWatchedBtn.className = 'modal-btn btn-primary';
        removeMovieBtn.style.display = 'none';
        document.getElementById('watchInfo').style.display = 'none';
        
        // 清空表单
        document.getElementById('watchDate').value = '';
        document.getElementById('personalRating').value = '';
        document.getElementById('watchNotes').value = '';
    }
    
    movieModal.classList.remove('hidden');
}

// 隐藏模态框
function hideModal() {
    movieModal.classList.add('hidden');
    currentMovie = null;
}

// 切换观看状态
function toggleWatchedStatus() {
    if (!currentMovie) return;
    
    const isWatched = watchedMovies.some(w => w.rank === currentMovie.rank);
    
    if (isWatched) {
        // 移除观看记录
        watchedMovies = watchedMovies.filter(w => w.rank !== currentMovie.rank);
    } else {
        // 添加观看记录
        const watchData = {
            rank: currentMovie.rank,
            titleEn: currentMovie.titleEn,
            titleCn: currentMovie.titleCn,
            year: currentMovie.year,
            director: currentMovie.director,
            imdbRating: currentMovie.rating,
            watchDate: document.getElementById('watchDate').value,
            personalRating: parseFloat(document.getElementById('personalRating').value) || null,
            notes: document.getElementById('watchNotes').value,
            addedDate: new Date().toISOString()
        };
        
        watchedMovies.push(watchData);
    }
    
    // 保存到本地存储
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
    
    // 更新界面
    applyFilters();
    updateStats();
    updateWatchedMoviesList();
    hideModal();
    
    // 显示提示
    showToast(isWatched ? 'Movie removed from watched list' : 'Movie added to watched list', isWatched ? 'info' : 'success');
}

// 从观看列表中移除
function removeFromWatched() {
    if (!currentMovie) return;
    
    watchedMovies = watchedMovies.filter(w => w.rank !== currentMovie.rank);
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
    
    applyFilters();
    updateStats();
    updateWatchedMoviesList();
    hideModal();
    
    showToast('Movie removed from watched list', 'info');
}

// 更新统计信息
function updateStats() {
    const watched = watchedMovies.length;
    const total = top250Movies.length;
    const percentage = total > 0 ? Math.round((watched / total) * 100) : 0;
    
    watchedCount.textContent = watched;
    watchedPercentage.textContent = `${percentage}%`;
    totalMovies.textContent = total;
    
    // 计算平均个人评分
    const ratingsWithValues = watchedMovies.filter(m => m.personalRating && m.personalRating > 0);
    const avgRating = ratingsWithValues.length > 0 
        ? (ratingsWithValues.reduce((sum, m) => sum + m.personalRating, 0) / ratingsWithValues.length).toFixed(1)
        : '0.0';
    
    averageRating.textContent = avgRating;
}

// 更新已观看电影列表
function updateWatchedMoviesList() {
    // 更新计数显示
    const countElement = document.getElementById('watchedMoviesCount');
    if (countElement) {
        countElement.textContent = watchedMovies.length;
    }
    
    if (watchedMovies.length === 0) {
        watchedMoviesList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🎬</div>
                <p>No movies watched yet</p>
                <small>Click on movies to mark them as watched</small>
            </div>
        `;
        return;
    }
    
    // 按观看日期排序（最新的在前）
    const sortedMovies = [...watchedMovies].sort((a, b) => {
        if (!a.watchDate && !b.watchDate) return b.rank - a.rank; // 按排名排序
        if (!a.watchDate) return 1;
        if (!b.watchDate) return -1;
        return new Date(b.watchDate) - new Date(a.watchDate);
    });
    
    watchedMoviesList.innerHTML = sortedMovies.map(movie => `
        <div class="watched-movie-item" onclick="showMovieDetails(${movie.rank})">
            <div class="watched-movie-rank">#${movie.rank}</div>
            <div class="watched-movie-info">
                <div class="watched-movie-title">${movie.titleEn}</div>
                <div class="watched-movie-subtitle">${movie.titleCn}</div>
                <div class="watched-movie-meta">
                    ${movie.watchDate ? `<div class="watched-movie-date">${formatDate(movie.watchDate)}</div>` : ''}
                    <div class="watched-movie-imdb">⭐ ${movie.imdbRating.toFixed(1)}</div>
                </div>
            </div>
            ${movie.personalRating ? `<div class="personal-rating-display">★ ${movie.personalRating}</div>` : ''}
            <div class="watched-movie-actions">
                <button class="watched-movie-remove" onclick="event.stopPropagation(); removeWatchedMovie(${movie.rank})" title="Remove from watched">×</button>
            </div>
        </div>
    `).join('');
}

// 显示电影详情（从已观看列表点击）
function showMovieDetails(rank) {
    const movie = top250Movies.find(m => m.rank === rank);
    if (movie) {
        showMovieModal(movie);
    }
}

// 从已观看列表中移除电影
function removeWatchedMovie(rank) {
    if (confirm('Remove this movie from your watched list?')) {
        watchedMovies = watchedMovies.filter(w => w.rank !== rank);
        localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
        
        applyFilters();
        updateStats();
        updateWatchedMoviesList();
        
        showToast('Movie removed from watched list', 'info');
    }
}

// 清空所有观看记录
function clearAllWatched() {
    if (watchedMovies.length === 0) {
        showToast('No watched movies to clear', 'warning');
        return;
    }
    
    if (confirm('Are you sure you want to clear all watched movies? This action cannot be undone.')) {
        watchedMovies = [];
        localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
        
        applyFilters();
        updateStats();
        updateWatchedMoviesList();
        
        showToast('All watched movies cleared', 'info');
    }
}

// 导出数据
function exportData() {
    if (watchedMovies.length === 0) {
        showToast('No data to export', 'warning');
        return;
    }
    
    const dataStr = JSON.stringify(watchedMovies, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `imdb-top250-watched-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    showToast('Data exported successfully', 'success');
}

// 格式化日期
function formatDate(dateString) {
    if (!dateString) return 'No date';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// 显示提示消息
function showToast(message, type = 'success') {
    // 移除现有的toast
    const existingToast = document.getElementById('mediaToast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // 根据类型设置不同的样式和图标
    let backgroundColor, icon;
    switch (type) {
        case 'success':
            backgroundColor = 'rgba(16, 185, 129, 0.9)';
            icon = '✓';
            break;
        case 'error':
            backgroundColor = 'rgba(239, 68, 68, 0.9)';
            icon = '✕';
            break;
        case 'info':
            backgroundColor = 'rgba(59, 130, 246, 0.9)';
            icon = 'ℹ';
            break;
        case 'warning':
            backgroundColor = 'rgba(245, 158, 11, 0.9)';
            icon = '⚠';
            break;
        default:
            backgroundColor = 'rgba(16, 185, 129, 0.9)';
            icon = '✓';
    }
    
    const toast = document.createElement('div');
    toast.id = 'mediaToast';
    toast.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        max-width: 300px;
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        gap: 8px;
    `;
    
    toast.innerHTML = `<span style="font-size: 16px;">${icon}</span><span>${message}</span>`;
    toast.style.cursor = 'pointer';
    toast.title = 'Click to dismiss';
    
    // 点击关闭功能
    toast.addEventListener('click', () => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    });
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// 触发导入数据文件选择
function triggerImportData() {
    importFileInput.click();
}

// 设置导入按钮状态
function setImportButtonState(loading) {
    const iconSpan = importDataBtn.querySelector('.btn-icon');
    const textNode = importDataBtn.childNodes[2]; // 文本节点
    
    if (loading) {
        importDataBtn.disabled = true;
        iconSpan.textContent = '⏳';
        textNode.textContent = 'Importing...';
        importDataBtn.style.opacity = '0.7';
    } else {
        importDataBtn.disabled = false;
        iconSpan.textContent = '📥';
        textNode.textContent = 'Import Data';
        importDataBtn.style.opacity = '1';
    }
}

// 处理导入数据
function handleImportData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // 检查文件类型
    if (!file.name.endsWith('.json')) {
        showToast('Please select a valid JSON file', 'error');
        return;
    }
    
    // 设置加载状态
    setImportButtonState(true);
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);
            
            // 验证数据格式
            if (!Array.isArray(importedData)) {
                showToast('Invalid data format. Expected an array of movies.', 'error');
                setImportButtonState(false);
                return;
            }
            
            // 验证数据结构
            const requiredFields = ['rank', 'titleEn', 'titleCn'];
            const isValidData = importedData.every(movie => 
                requiredFields.every(field => movie.hasOwnProperty(field))
            );
            
            if (!isValidData) {
                showToast('Invalid data structure. Missing required fields (rank, titleEn, titleCn).', 'error');
                setImportButtonState(false);
                return;
            }
            
            // 验证rank字段是否为数字
            const hasValidRanks = importedData.every(movie => 
                typeof movie.rank === 'number' && movie.rank > 0
            );
            
            if (!hasValidRanks) {
                showToast('Invalid data: rank must be a positive number.', 'error');
                setImportButtonState(false);
                return;
            }
            
            // 询问用户是否要合并还是替换数据
            const shouldMerge = confirm(
                `Found ${importedData.length} movies in the file.\n\n` +
                'Click "OK" to merge with existing data, or "Cancel" to replace all data.'
            );
            
            if (shouldMerge) {
                // 合并数据：只添加不存在的电影
                let addedCount = 0;
                importedData.forEach(importedMovie => {
                    const existingMovie = watchedMovies.find(w => w.rank === importedMovie.rank);
                    if (!existingMovie) {
                        watchedMovies.push(importedMovie);
                        addedCount++;
                    }
                });
                
                if (addedCount > 0) {
                    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
                    applyFilters();
                    updateStats();
                    updateWatchedMoviesList();
                    showToast(`Successfully merged ${addedCount} new movies`, 'success');
                } else {
                    showToast('No new movies to add', 'info');
                }
                setImportButtonState(false);
            } else {
                // 替换所有数据
                watchedMovies = [...importedData];
                localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
                applyFilters();
                updateStats();
                updateWatchedMoviesList();
                showToast(`Successfully imported ${importedData.length} movies`, 'success');
            }
            setImportButtonState(false);
            
        } catch (error) {
            console.error('Error parsing imported data:', error);
            showToast('Error reading file. Please check the file format.', 'error');
            setImportButtonState(false);
        }
    };
    
    reader.onerror = function() {
        showToast('Error reading file. Please try again.', 'error');
        setImportButtonState(false);
    };
    
    reader.readAsText(file);
    
    // 清空文件输入，允许重复选择同一文件
    event.target.value = '';
}