// IMDb Top 250 电影数据（基于准确的IMDB数据，包含完整信息）
// 数据来源：docs/imdb 250.md，补充了导演和类型信息
const top250Movies = [
    { rank: 1, titleEn: "The Shawshank Redemption", titleCn: "肖申克的救赎", year: 1994, director: "Frank Darabont", rating: 9.3, genres: ["drama"] },
    { rank: 2, titleEn: "The Godfather", titleCn: "教父", year: 1972, director: "Francis Ford Coppola", rating: 9.2, genres: ["crime", "drama"] },
    { rank: 3, titleEn: "The Dark Knight", titleCn: "黑暗骑士", year: 2008, director: "Christopher Nolan", rating: 9.0, genres: ["action", "crime", "drama"] },
    { rank: 4, titleEn: "The Godfather Part II", titleCn: "教父2", year: 1974, director: "Francis Ford Coppola", rating: 9.0, genres: ["crime", "drama"] },
    { rank: 5, titleEn: "12 Angry Men", titleCn: "十二怒汉", year: 1957, director: "Sidney Lumet", rating: 9.0, genres: ["drama"] },
    { rank: 6, titleEn: "Schindler's List", titleCn: "辛德勒的名单", year: 1993, director: "Steven Spielberg", rating: 8.9, genres: ["drama", "war"] },
    { rank: 7, titleEn: "The Lord of the Rings: The Return of the King", titleCn: "指环王3：王者归来", year: 2003, director: "Peter Jackson", rating: 8.9, genres: ["action", "fantasy"] },
    { rank: 8, titleEn: "Pulp Fiction", titleCn: "低俗小说", year: 1994, director: "Quentin Tarantino", rating: 8.9, genres: ["crime", "drama"] },
    { rank: 9, titleEn: "The Lord of the Rings: The Fellowship of the Ring", titleCn: "指环王1：护戒使者", year: 2001, director: "Peter Jackson", rating: 8.8, genres: ["action", "fantasy"] },
    { rank: 10, titleEn: "The Good, the Bad and the Ugly", titleCn: "黄金三镖客", year: 1966, director: "Sergio Leone", rating: 8.8, genres: ["western"] },
    { rank: 11, titleEn: "Forrest Gump", titleCn: "阿甘正传", year: 1994, director: "Robert Zemeckis", rating: 8.8, genres: ["drama", "romance"] },
    { rank: 12, titleEn: "Fight Club", titleCn: "搏击俱乐部", year: 1999, director: "David Fincher", rating: 8.7, genres: ["drama"] },
    { rank: 13, titleEn: "The Lord of the Rings: The Two Towers", titleCn: "指环王2：双塔奇兵", year: 2002, director: "Peter Jackson", rating: 8.7, genres: ["action", "fantasy"] },
    { rank: 14, titleEn: "Inception", titleCn: "盗梦空间", year: 2010, director: "Christopher Nolan", rating: 8.7, genres: ["action", "sci-fi", "thriller"] },
    { rank: 15, titleEn: "Star Wars: Episode V - The Empire Strikes Back", titleCn: "星球大战5：帝国反击战", year: 1980, director: "Irvin Kershner", rating: 8.7, genres: ["action", "fantasy", "sci-fi"] },
    { rank: 16, titleEn: "The Matrix", titleCn: "黑客帝国", year: 1999, director: "Lana Wachowski, Lilly Wachowski", rating: 8.7, genres: ["action", "sci-fi"] },
    { rank: 17, titleEn: "Goodfellas", titleCn: "好家伙", year: 1990, director: "Martin Scorsese", rating: 8.7, genres: ["crime", "drama"] },
    { rank: 18, titleEn: "One Flew Over the Cuckoo's Nest", titleCn: "飞越疯人院", year: 1975, director: "Miloš Forman", rating: 8.6, genres: ["drama"] },
    { rank: 19, titleEn: "Se7en", titleCn: "七宗罪", year: 1995, director: "David Fincher", rating: 8.6, genres: ["crime", "drama", "thriller"] },
    { rank: 20, titleEn: "It's a Wonderful Life", titleCn: "生活多美好", year: 1946, director: "Frank Capra", rating: 8.6, genres: ["drama", "fantasy"] },
    { rank: 21, titleEn: "The Silence of the Lambs", titleCn: "沉默的羔羊", year: 1991, director: "Jonathan Demme", rating: 8.6, genres: ["crime", "drama", "thriller"] },
    { rank: 22, titleEn: "City of God", titleCn: "上帝之城", year: 2002, director: "Fernando Meirelles", rating: 8.6, genres: ["crime", "drama"] },
    { rank: 23, titleEn: "Saving Private Ryan", titleCn: "拯救大兵瑞恩", year: 1998, director: "Steven Spielberg", rating: 8.6, genres: ["drama", "war"] },
    { rank: 24, titleEn: "Life Is Beautiful", titleCn: "美丽人生", year: 1997, director: "Roberto Benigni", rating: 8.6, genres: ["comedy", "drama", "romance"] },
    { rank: 25, titleEn: "The Green Mile", titleCn: "绿里奇迹", year: 1999, director: "Frank Darabont", rating: 8.6, genres: ["crime", "drama", "fantasy"] },
    { rank: 26, titleEn: "Star Wars: Episode IV - A New Hope", titleCn: "星球大战4：新希望", year: 1977, director: "George Lucas", rating: 8.6, genres: ["action", "fantasy", "sci-fi"] },
    { rank: 27, titleEn: "Terminator 2: Judgment Day", titleCn: "终结者2：审判日", year: 1991, director: "James Cameron", rating: 8.5, genres: ["action", "sci-fi"] },
    { rank: 28, titleEn: "Back to the Future", titleCn: "回到未来", year: 1985, director: "Robert Zemeckis", rating: 8.5, genres: ["comedy", "sci-fi"] },
    { rank: 29, titleEn: "Spirited Away", titleCn: "千与千寻", year: 2001, director: "Hayao Miyazaki", rating: 8.5, genres: ["fantasy"] },
    { rank: 30, titleEn: "The Pianist", titleCn: "钢琴家", year: 2002, director: "Roman Polanski", rating: 8.5, genres: ["drama", "war"] },
    { rank: 31, titleEn: "Psycho", titleCn: "惊魂记", year: 1960, director: "Alfred Hitchcock", rating: 8.5, genres: ["thriller"] },
    { rank: 32, titleEn: "Parasite", titleCn: "寄生虫", year: 2019, director: "Bong Joon Ho", rating: 8.5, genres: ["comedy", "drama", "thriller"] },
    { rank: 33, titleEn: "Léon: The Professional", titleCn: "这个杀手不太冷", year: 1994, director: "Luc Besson", rating: 8.5, genres: ["action", "crime", "drama"] },
    { rank: 34, titleEn: "The Lion King", titleCn: "狮子王", year: 1994, director: "Roger Allers, Rob Minkoff", rating: 8.5, genres: ["fantasy"] },
    { rank: 35, titleEn: "Gladiator", titleCn: "角斗士", year: 2000, director: "Ridley Scott", rating: 8.5, genres: ["action", "drama"] },
    { rank: 36, titleEn: "American History X", titleCn: "美国X档案", year: 1998, director: "Tony Kaye", rating: 8.5, genres: ["drama"] },
    { rank: 37, titleEn: "The Departed", titleCn: "无间道风云", year: 2006, director: "Martin Scorsese", rating: 8.5, genres: ["crime", "drama", "thriller"] },
    { rank: 38, titleEn: "The Usual Suspects", titleCn: "非常嫌疑犯", year: 1995, director: "Bryan Singer", rating: 8.5, genres: ["crime", "drama", "thriller"] },
    { rank: 39, titleEn: "The Prestige", titleCn: "致命魔术", year: 2006, director: "Christopher Nolan", rating: 8.5, genres: ["drama", "thriller"] },
    { rank: 40, titleEn: "Whiplash", titleCn: "爆裂鼓手", year: 2014, director: "Damien Chazelle", rating: 8.5, genres: ["drama"] },
    { rank: 41, titleEn: "Casablanca", titleCn: "卡萨布兰卡", year: 1942, director: "Michael Curtiz", rating: 8.5, genres: ["drama", "romance", "war"] },
    { rank: 42, titleEn: "Harakiri", titleCn: "切腹", year: 1962, director: "Masaki Kobayashi", rating: 8.5, genres: ["action", "drama"] },
    { rank: 43, titleEn: "The Intouchables", titleCn: "触不可及", year: 2011, director: "Olivier Nakache, Éric Toledano", rating: 8.5, genres: ["comedy", "drama"] },
    { rank: 44, titleEn: "Modern Times", titleCn: "摩登时代", year: 1936, director: "Charlie Chaplin", rating: 8.4, genres: ["comedy", "drama", "romance"] },
    { rank: 45, titleEn: "Once Upon a Time in the West", titleCn: "西部往事", year: 1968, director: "Sergio Leone", rating: 8.4, genres: ["western"] },
    { rank: 46, titleEn: "Grave of the Fireflies", titleCn: "萤火虫之墓", year: 1988, director: "Isao Takahata", rating: 8.4, genres: ["drama", "war"] },
    { rank: 47, titleEn: "Rear Window", titleCn: "后窗", year: 1954, director: "Alfred Hitchcock", rating: 8.4, genres: ["thriller"] },
    { rank: 48, titleEn: "Alien", titleCn: "异形", year: 1979, director: "Ridley Scott", rating: 8.4, genres: ["sci-fi", "thriller"] },
    { rank: 49, titleEn: "City Lights", titleCn: "城市之光", year: 1931, director: "Charlie Chaplin", rating: 8.4, genres: ["comedy", "drama", "romance"] },
    { rank: 50, titleEn: "Cinema Paradiso", titleCn: "天堂电影院", year: 1988, director: "Giuseppe Tornatore", rating: 8.4, genres: ["drama", "romance"] },
    { rank: 51, titleEn: "Apocalypse Now", titleCn: "现代启示录", year: 1979, director: "Francis Ford Coppola", rating: 8.4, genres: ["drama", "war"] },
    { rank: 52, titleEn: "Memento", titleCn: "记忆碎片", year: 2000, director: "Christopher Nolan", rating: 8.4, genres: ["thriller"] },
    { rank: 53, titleEn: "Raiders of the Lost Ark", titleCn: "夺宝奇兵", year: 1981, director: "Steven Spielberg", rating: 8.4, genres: ["action"] },
    { rank: 54, titleEn: "Django Unchained", titleCn: "被解救的姜戈", year: 2012, director: "Quentin Tarantino", rating: 8.4, genres: ["action", "drama", "western"] },
    { rank: 55, titleEn: "WALL·E", titleCn: "机器人总动员", year: 2008, director: "Andrew Stanton", rating: 8.4, genres: ["fantasy", "sci-fi"] },
    { rank: 56, titleEn: "The Lives of Others", titleCn: "窃听风暴", year: 2006, director: "Florian Henckel von Donnersmarck", rating: 8.4, genres: ["drama", "thriller"] },
    { rank: 57, titleEn: "Sunset Blvd.", titleCn: "日落大道", year: 1950, director: "Billy Wilder", rating: 8.4, genres: ["drama"] },
    { rank: 58, titleEn: "Paths of Glory", titleCn: "光荣之路", year: 1957, director: "Stanley Kubrick", rating: 8.4, genres: ["drama", "war"] },
    { rank: 59, titleEn: "The Shining", titleCn: "闪灵", year: 1980, director: "Stanley Kubrick", rating: 8.4, genres: ["thriller"] },
    { rank: 60, titleEn: "The Great Dictator", titleCn: "大独裁者", year: 1940, director: "Charlie Chaplin", rating: 8.4, genres: ["comedy", "drama", "war"] },
    { rank: 61, titleEn: "Avengers: Infinity War", titleCn: "复仇者联盟3：无限战争", year: 2018, director: "Anthony Russo, Joe Russo", rating: 8.4, genres: ["action", "sci-fi"] },
    { rank: 62, titleEn: "Witness for the Prosecution", titleCn: "控方证人", year: 1957, director: "Billy Wilder", rating: 8.4, genres: ["crime", "drama", "thriller"] },
    { rank: 63, titleEn: "Aliens", titleCn: "异形2", year: 1986, director: "James Cameron", rating: 8.3, genres: ["action", "sci-fi", "thriller"] },
    { rank: 64, titleEn: "American Beauty", titleCn: "美国丽人", year: 1999, director: "Sam Mendes", rating: 8.3, genres: ["drama"] },
    { rank: 65, titleEn: "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb", titleCn: "奇爱博士", year: 1964, director: "Stanley Kubrick", rating: 8.3, genres: ["comedy", "war"] },
    { rank: 66, titleEn: "The Dark Knight Rises", titleCn: "黑暗骑士崛起", year: 2012, director: "Christopher Nolan", rating: 8.3, genres: ["action", "crime", "drama"] },
    { rank: 67, titleEn: "Joker", titleCn: "小丑", year: 2019, director: "Todd Phillips", rating: 8.3, genres: ["crime", "drama", "thriller"] },
    { rank: 68, titleEn: "Oldboy", titleCn: "老男孩", year: 2003, director: "Park Chan-wook", rating: 8.3, genres: ["action", "drama", "thriller"] },
    { rank: 69, titleEn: "Amadeus", titleCn: "莫扎特传", year: 1984, director: "Miloš Forman", rating: 8.3, genres: ["drama"] },
    { rank: 70, titleEn: "Inglourious Basterds", titleCn: "无耻混蛋", year: 2009, director: "Quentin Tarantino", rating: 8.3, genres: ["action", "drama", "war"] },
    { rank: 71, titleEn: "Toy Story", titleCn: "玩具总动员", year: 1995, director: "John Lasseter", rating: 8.3, genres: ["comedy", "fantasy"] },
    { rank: 72, titleEn: "Coco", titleCn: "寻梦环游记", year: 2017, director: "Lee Unkrich", rating: 8.3, genres: ["comedy", "fantasy"] },
    { rank: 73, titleEn: "The Boat", titleCn: "从海底出击", year: 1981, director: "Wolfgang Petersen", rating: 8.3, genres: ["drama", "war"] },
    { rank: 74, titleEn: "Braveheart", titleCn: "勇敢的心", year: 1995, director: "Mel Gibson", rating: 8.3, genres: ["drama", "war"] },
    { rank: 75, titleEn: "Avengers: Endgame", titleCn: "复仇者联盟4：终局之战", year: 2019, director: "Anthony Russo, Joe Russo", rating: 8.3, genres: ["action", "sci-fi"] },
    { rank: 76, titleEn: "Princess Mononoke", titleCn: "幽灵公主", year: 1997, director: "Hayao Miyazaki", rating: 8.3, genres: ["fantasy"] },
    { rank: 77, titleEn: "Once Upon a Time in America", titleCn: "美国往事", year: 1984, director: "Sergio Leone", rating: 8.3, genres: ["crime", "drama"] },
    { rank: 78, titleEn: "Good Will Hunting", titleCn: "心灵捕手", year: 1997, director: "Gus Van Sant", rating: 8.3, genres: ["drama"] },
    { rank: 79, titleEn: "Your Name.", titleCn: "你的名字", year: 2016, director: "Makoto Shinkai", rating: 8.3, genres: ["drama", "romance"] },
    { rank: 80, titleEn: "3 Idiots", titleCn: "三傻大闹宝莱坞", year: 2009, director: "Rajkumar Hirani", rating: 8.3, genres: ["comedy", "drama"] },
    { rank: 81, titleEn: "Toy Story 3", titleCn: "玩具总动员3", year: 2010, director: "Lee Unkrich", rating: 8.3, genres: ["comedy", "fantasy"] },
    { rank: 82, titleEn: "High and Low", titleCn: "天国与地狱", year: 1963, director: "Akira Kurosawa", rating: 8.3, genres: ["crime", "drama", "thriller"] },
    { rank: 83, titleEn: "Singin' in the Rain", titleCn: "雨中曲", year: 1952, director: "Gene Kelly, Stanley Donen", rating: 8.3, genres: ["comedy", "musical", "romance"] },
    { rank: 84, titleEn: "Capernaum", titleCn: "何以为家", year: 2018, director: "Nadine Labaki", rating: 8.3, genres: ["drama"] },
    { rank: 85, titleEn: "Requiem for a Dream", titleCn: "梦之安魂曲", year: 2000, director: "Darren Aronofsky", rating: 8.3, genres: ["drama"] },
    { rank: 86, titleEn: "Star Wars: Episode VI - Return of the Jedi", titleCn: "星球大战6：绝地归来", year: 1983, director: "Richard Marquand", rating: 8.3, genres: ["action", "fantasy", "sci-fi"] },
    { rank: 87, titleEn: "Come and See", titleCn: "来了就看", year: 1985, director: "Elem Klimov", rating: 8.3, genres: ["drama", "war"] },
    { rank: 88, titleEn: "Eternal Sunshine of the Spotless Mind", titleCn: "暖暖内含光", year: 2004, director: "Michel Gondry", rating: 8.3, genres: ["drama", "romance", "sci-fi"] },
    { rank: 89, titleEn: "2001: A Space Odyssey", titleCn: "2001太空漫游", year: 1968, director: "Stanley Kubrick", rating: 8.3, genres: ["sci-fi"] },
    { rank: 90, titleEn: "Reservoir Dogs", titleCn: "落水狗", year: 1992, director: "Quentin Tarantino", rating: 8.3, genres: ["crime", "thriller"] },
    { rank: 91, titleEn: "The Hunt", titleCn: "狩猎", year: 2012, director: "Thomas Vinterberg", rating: 8.3, genres: ["drama"] },
    { rank: 92, titleEn: "Citizen Kane", titleCn: "公民凯恩", year: 1941, director: "Orson Welles", rating: 8.3, genres: ["drama"] },
    { rank: 93, titleEn: "Lawrence of Arabia", titleCn: "阿拉伯的劳伦斯", year: 1962, director: "David Lean", rating: 8.3, genres: ["drama", "war"] },
    { rank: 94, titleEn: "M", titleCn: "M就是凶手", year: 1931, director: "Fritz Lang", rating: 8.3, genres: ["crime", "thriller"] },
    { rank: 95, titleEn: "Ikiru", titleCn: "生之欲", year: 1952, director: "Akira Kurosawa", rating: 8.3, genres: ["drama"] },
    { rank: 96, titleEn: "North by Northwest", titleCn: "西北偏北", year: 1959, director: "Alfred Hitchcock", rating: 8.2, genres: ["action", "thriller"] },
    { rank: 97, titleEn: "The Apartment", titleCn: "公寓春光", year: 1960, director: "Billy Wilder", rating: 8.2, genres: ["comedy", "drama", "romance"] },
    { rank: 98, titleEn: "Vertigo", titleCn: "迷魂记", year: 1958, director: "Alfred Hitchcock", rating: 8.2, genres: ["thriller"] },
    { rank: 99, titleEn: "A Clockwork Orange", titleCn: "发条橙", year: 1971, director: "Stanley Kubrick", rating: 8.2, genres: ["crime", "drama", "sci-fi"] },
    { rank: 100, titleEn: "Double Indemnity", titleCn: "双重赔偿", year: 1944, director: "Billy Wilder", rating: 8.2, genres: ["crime", "drama", "thriller"] },
    { rank: 101, titleEn: "Amélie", titleCn: "天使爱美丽", year: 2001, director: "Jean-Pierre Jeunet", rating: 8.2, genres: ["comedy", "romance"] },
    { rank: 102, titleEn: "Full Metal Jacket", titleCn: "全金属外壳", year: 1987, director: "Stanley Kubrick", rating: 8.2, genres: ["drama", "war"] },
    { rank: 103, titleEn: "Scarface", titleCn: "疤面煞星", year: 1983, director: "Brian De Palma", rating: 8.2, genres: ["crime", "drama"] },
    { rank: 104, titleEn: "Hamilton", titleCn: "汉密尔顿", year: 2020, director: "Thomas Kail", rating: 8.2, genres: ["drama", "musical"] },
    { rank: 105, titleEn: "Incendies", titleCn: "烈火焚身", year: 2010, director: "Denis Villeneuve", rating: 8.2, genres: ["drama", "thriller"] },
    { rank: 106, titleEn: "A Separation", titleCn: "一次别离", year: 2011, director: "Asghar Farhadi", rating: 8.2, genres: ["drama"] },
    { rank: 107, titleEn: "The Sting", titleCn: "骗中骗", year: 1973, director: "George Roy Hill", rating: 8.2, genres: ["comedy", "crime", "drama"] },
    { rank: 108, titleEn: "Indiana Jones and the Last Crusade", titleCn: "夺宝奇兵3：圣战奇兵", year: 1989, director: "Steven Spielberg", rating: 8.2, genres: ["action"] },
    { rank: 109, titleEn: "Metropolis", titleCn: "大都会", year: 1927, director: "Fritz Lang", rating: 8.2, genres: ["drama", "sci-fi"] },
    { rank: 110, titleEn: "Snatch", titleCn: "偷拐抢骗", year: 2000, director: "Guy Ritchie", rating: 8.2, genres: ["comedy", "crime"] },
    { rank: 111, titleEn: "Like Stars on Earth", titleCn: "地球上的星星", year: 2007, director: "Aamir Khan", rating: 8.2, genres: ["drama"] },
    { rank: 112, titleEn: "To Kill a Mockingbird", titleCn: "杀死一只知更鸟", year: 1962, director: "Robert Mulligan", rating: 8.2, genres: ["crime", "drama"] },
    { rank: 113, titleEn: "Bicycle Thieves", titleCn: "偷自行车的人", year: 1948, director: "Vittorio De Sica", rating: 8.2, genres: ["drama"] },
    { rank: 114, titleEn: "The Kid", titleCn: "寻子遇仙记", year: 1921, director: "Charlie Chaplin", rating: 8.2, genres: ["comedy", "drama"] },
    { rank: 115, titleEn: "1917", titleCn: "1917", year: 2019, director: "Sam Mendes", rating: 8.2, genres: ["drama", "war"] },
    { rank: 116, titleEn: "Dangal", titleCn: "摔跤吧！爸爸", year: 2016, director: "Nitesh Tiwari", rating: 8.2, genres: ["drama"] },
    { rank: 117, titleEn: "The Father", titleCn: "困在时间里的父亲", year: 2020, director: "Florian Zeller", rating: 8.2, genres: ["drama"] },
    { rank: 118, titleEn: "Green Book", titleCn: "绿皮书", year: 2018, director: "Peter Farrelly", rating: 8.2, genres: ["comedy", "drama"] },
    { rank: 119, titleEn: "The Great Escape", titleCn: "大逃亡", year: 1963, director: "John Sturges", rating: 8.2, genres: ["action", "drama", "war"] },
    { rank: 120, titleEn: "The Thing", titleCn: "怪形", year: 1982, director: "John Carpenter", rating: 8.2, genres: ["sci-fi", "thriller"] },
    { rank: 121, titleEn: "All About Eve", titleCn: "彗星美人", year: 1950, director: "Joseph L. Mankiewicz", rating: 8.2, genres: ["drama"] },
    { rank: 122, titleEn: "Judgment at Nuremberg", titleCn: "纽伦堡的审判", year: 1961, director: "Stanley Kramer", rating: 8.2, genres: ["drama", "war"] },
    { rank: 123, titleEn: "Heat", titleCn: "盗火线", year: 1995, director: "Michael Mann", rating: 8.2, genres: ["action", "crime", "drama"] },
    { rank: 124, titleEn: "Casino", titleCn: "赌城风云", year: 1995, director: "Martin Scorsese", rating: 8.2, genres: ["crime", "drama"] },
    { rank: 125, titleEn: "There Will Be Blood", titleCn: "血色将至", year: 2007, director: "Paul Thomas Anderson", rating: 8.2, genres: ["drama"] },
    { rank: 126, titleEn: "Pan's Labyrinth", titleCn: "潘神的迷宫", year: 2006, director: "Guillermo del Toro", rating: 8.2, genres: ["drama", "fantasy", "war"] },
    { rank: 127, titleEn: "The Secret in Their Eyes", titleCn: "谜一样的双眼", year: 2009, director: "Juan José Campanella", rating: 8.2, genres: ["crime", "drama", "thriller"] },
    { rank: 128, titleEn: "Unforgiven", titleCn: "不可饶恕", year: 1992, director: "Clint Eastwood", rating: 8.2, genres: ["drama", "western"] },
    { rank: 129, titleEn: "Shutter Island", titleCn: "禁闭岛", year: 2010, director: "Martin Scorsese", rating: 8.2, genres: ["thriller"] },
    { rank: 130, titleEn: "Good Bye, Lenin!", titleCn: "再见列宁", year: 2003, director: "Wolfgang Becker", rating: 8.2, genres: ["comedy", "drama"] },
    { rank: 131, titleEn: "My Neighbor Totoro", titleCn: "龙猫", year: 1988, director: "Hayao Miyazaki", rating: 8.1, genres: ["fantasy"] },
    { rank: 132, titleEn: "The Seventh Seal", titleCn: "第七封印", year: 1957, director: "Ingmar Bergman", rating: 8.1, genres: ["drama", "fantasy"] },
    { rank: 133, titleEn: "A Beautiful Mind", titleCn: "美丽心灵", year: 2001, director: "Ron Howard", rating: 8.1, genres: ["drama"] },
    { rank: 134, titleEn: "The Sixth Sense", titleCn: "第六感", year: 1999, director: "M. Night Shyamalan", rating: 8.1, genres: ["drama", "thriller"] },
    { rank: 135, titleEn: "Blade Runner", titleCn: "银翼杀手", year: 1982, director: "Ridley Scott", rating: 8.1, genres: ["action", "sci-fi", "thriller"] },
    { rank: 136, titleEn: "Lock, Stock and Two Smoking Barrels", titleCn: "两杆大烟枪", year: 1998, director: "Guy Ritchie", rating: 8.1, genres: ["comedy", "crime"] },
    { rank: 137, titleEn: "Three Billboards Outside Ebbing, Missouri", titleCn: "三块广告牌", year: 2017, director: "Martin McDonagh", rating: 8.1, genres: ["comedy", "crime", "drama"] },
    { rank: 138, titleEn: "Yojimbo", titleCn: "用心棒", year: 1961, director: "Akira Kurosawa", rating: 8.1, genres: ["action", "drama", "thriller"] },
    { rank: 139, titleEn: "The Treasure of the Sierra Madre", titleCn: "碧血金沙", year: 1948, director: "John Huston", rating: 8.1, genres: ["action", "drama", "western"] },
    { rank: 140, titleEn: "No Country for Old Men", titleCn: "老无所依", year: 2007, director: "Ethan Coen, Joel Coen", rating: 8.1, genres: ["crime", "drama", "thriller"] },
    { rank: 141, titleEn: "Kill Bill: Vol. 1", titleCn: "杀死比尔", year: 2003, director: "Quentin Tarantino", rating: 8.1, genres: ["action", "crime", "thriller"] },
    { rank: 142, titleEn: "Howl's Moving Castle", titleCn: "哈尔的移动城堡", year: 2004, director: "Hayao Miyazaki", rating: 8.1, genres: ["fantasy", "romance"] },
    { rank: 143, titleEn: "Finding Nemo", titleCn: "海底总动员", year: 2003, director: "Andrew Stanton", rating: 8.1, genres: ["comedy", "fantasy"] },
    { rank: 144, titleEn: "Chinatown", titleCn: "唐人街", year: 1974, director: "Roman Polanski", rating: 8.1, genres: ["crime", "drama", "thriller"] },
    { rank: 145, titleEn: "The Wolf of Wall Street", titleCn: "华尔街之狼", year: 2013, director: "Martin Scorsese", rating: 8.1, genres: ["comedy", "crime", "drama"] },
    { rank: 146, titleEn: "V for Vendetta", titleCn: "V字仇杀队", year: 2005, director: "James McTeigue", rating: 8.1, genres: ["action", "drama", "thriller"] },
    { rank: 147, titleEn: "Raging Bull", titleCn: "愤怒的公牛", year: 1980, director: "Martin Scorsese", rating: 8.1, genres: ["drama"] },
    { rank: 148, titleEn: "Dial M for Murder", titleCn: "电话谋杀案", year: 1954, director: "Alfred Hitchcock", rating: 8.1, genres: ["crime", "thriller"] },
    { rank: 149, titleEn: "Ran", titleCn: "乱", year: 1985, director: "Akira Kurosawa", rating: 8.1, genres: ["action", "drama", "war"] },
    { rank: 150, titleEn: "Wild Strawberries", titleCn: "野草莓", year: 1957, director: "Ingmar Bergman", rating: 8.1, genres: ["drama"] },
    { rank: 151, titleEn: "Downfall", titleCn: "帝国的毁灭", year: 2004, director: "Oliver Hirschbiegel", rating: 8.1, genres: ["drama", "war"] },
    { rank: 152, titleEn: "The Elephant Man", titleCn: "象人", year: 1980, director: "David Lynch", rating: 8.1, genres: ["drama"] },
    { rank: 153, titleEn: "Some Like It Hot", titleCn: "热情似火", year: 1959, director: "Billy Wilder", rating: 8.1, genres: ["comedy", "romance"] },
    { rank: 154, titleEn: "On the Waterfront", titleCn: "码头风云", year: 1954, director: "Elia Kazan", rating: 8.1, genres: ["crime", "drama"] },
    { rank: 155, titleEn: "The Third Man", titleCn: "第三人", year: 1949, director: "Carol Reed", rating: 8.1, genres: ["thriller"] },
    { rank: 156, titleEn: "Prisoners", titleCn: "囚徒", year: 2013, director: "Denis Villeneuve", rating: 8.1, genres: ["crime", "drama", "thriller"] },
    { rank: 157, titleEn: "The Grand Budapest Hotel", titleCn: "布达佩斯大饭店", year: 2014, director: "Wes Anderson", rating: 8.1, genres: ["comedy", "crime", "drama"] },
    { rank: 158, titleEn: "Gran Torino", titleCn: "老爷车", year: 2008, director: "Clint Eastwood", rating: 8.1, genres: ["drama"] },
    { rank: 159, titleEn: "Fargo", titleCn: "冰血暴", year: 1996, director: "Joel Coen, Ethan Coen", rating: 8.1, genres: ["crime", "thriller"] },
    { rank: 160, titleEn: "Catch Me If You Can", titleCn: "逍遥法外", year: 2002, director: "Steven Spielberg", rating: 8.1, genres: ["crime", "drama"] },
    { rank: 161, titleEn: "Gone Girl", titleCn: "消失的爱人", year: 2014, director: "David Fincher", rating: 8.1, genres: ["crime", "drama", "thriller"] },
    { rank: 162, titleEn: "Trainspotting", titleCn: "猜火车", year: 1996, director: "Danny Boyle", rating: 8.1, genres: ["drama"] },
    { rank: 163, titleEn: "Warrior", titleCn: "勇士", year: 2011, director: "Gavin O'Connor", rating: 8.1, genres: ["drama"] },
    { rank: 164, titleEn: "My Father and My Son", titleCn: "我的父亲和我的儿子", year: 2005, director: "Çağan Irmak", rating: 8.1, genres: ["drama"] },
    { rank: 165, titleEn: "Stand by Me", titleCn: "伴我同行", year: 1986, director: "Rob Reiner", rating: 8.1, genres: ["drama"] },
    { rank: 166, titleEn: "The General", titleCn: "将军号", year: 1926, director: "Clyde Bruckman, Buster Keaton", rating: 8.1, genres: ["action", "comedy", "war"] },
    { rank: 167, titleEn: "Hotel Rwanda", titleCn: "卢旺达饭店", year: 2004, director: "Terry George", rating: 8.1, genres: ["drama", "war"] },
    { rank: 168, titleEn: "Wild Tales", titleCn: "荒蛮故事", year: 2014, director: "Damián Szifron", rating: 8.1, genres: ["comedy", "drama", "thriller"] },
    { rank: 169, titleEn: "Ben-Hur", titleCn: "宾虚", year: 1959, director: "William Wyler", rating: 8.1, genres: ["drama"] },
    { rank: 170, titleEn: "The Deer Hunter", titleCn: "猎鹿人", year: 1978, director: "Michael Cimino", rating: 8.1, genres: ["drama", "war"] },
    { rank: 171, titleEn: "The Bridge on the River Kwai", titleCn: "桂河大桥", year: 1957, director: "David Lean", rating: 8.1, genres: ["drama", "war"] },
    { rank: 172, titleEn: "Barry Lyndon", titleCn: "巴里·林登", year: 1975, director: "Stanley Kubrick", rating: 8.1, genres: ["drama", "war"] },
    { rank: 173, titleEn: "In the Name of the Father", titleCn: "因父之名", year: 1993, director: "Jim Sheridan", rating: 8.1, genres: ["drama"] },
    { rank: 174, titleEn: "The Bandit", titleCn: "土匪", year: 1996, director: "Yavuz Turgul", rating: 8.0, genres: ["crime", "drama"] },
    { rank: 175, titleEn: "The Gold Rush", titleCn: "淘金记", year: 1925, director: "Charlie Chaplin", rating: 8.0, genres: ["comedy", "drama"] },
    { rank: 176, titleEn: "Memories of Murder", titleCn: "杀人回忆", year: 2003, director: "Bong Joon Ho", rating: 8.0, genres: ["crime", "drama", "thriller"] },
    { rank: 177, titleEn: "Rush", titleCn: "极速风流", year: 2013, director: "Ron Howard", rating: 8.0, genres: ["action", "drama"] },
    { rank: 178, titleEn: "The Truman Show", titleCn: "楚门的世界", year: 1998, director: "Peter Weir", rating: 8.0, genres: ["comedy", "drama", "sci-fi"] },
    { rank: 179, titleEn: "Amores Perros", titleCn: "爱情是狗娘", year: 2000, director: "Alejandro G. Iñárritu", rating: 8.0, genres: ["drama", "thriller"] },
    { rank: 180, titleEn: "Before Sunrise", titleCn: "爱在黎明破晓前", year: 1995, director: "Richard Linklater", rating: 8.0, genres: ["drama", "romance"] },
    { rank: 181, titleEn: "The 400 Blows", titleCn: "四百击", year: 1959, director: "François Truffaut", rating: 8.0, genres: ["crime", "drama"] },
    { rank: 182, titleEn: "Platoon", titleCn: "野战排", year: 1986, director: "Oliver Stone", rating: 8.0, genres: ["drama", "war"] },
    { rank: 183, titleEn: "Mad Max: Fury Road", titleCn: "疯狂的麦克斯：狂暴之路", year: 2015, director: "George Miller", rating: 8.0, genres: ["action", "sci-fi", "thriller"] },
    { rank: 184, titleEn: "Spotlight", titleCn: "聚焦", year: 2015, director: "Tom McCarthy", rating: 8.0, genres: ["crime", "drama"] },
    { rank: 185, titleEn: "Room", titleCn: "房间", year: 2015, director: "Lenny Abrahamson", rating: 8.0, genres: ["drama", "thriller"] },
    { rank: 186, titleEn: "The Handmaiden", titleCn: "小姐", year: 2016, director: "Park Chan-wook", rating: 8.0, genres: ["drama", "romance", "thriller"] },
    { rank: 187, titleEn: "Dead Poets Society", titleCn: "死亡诗社", year: 1989, director: "Peter Weir", rating: 8.0, genres: ["comedy", "drama"] },
    { rank: 188, titleEn: "The Princess Bride", titleCn: "公主新娘", year: 1987, director: "Rob Reiner", rating: 8.0, genres: ["comedy", "fantasy", "romance"] },
    { rank: 189, titleEn: "Rocky", titleCn: "洛奇", year: 1976, director: "John G. Avildsen", rating: 8.0, genres: ["drama"] },
    { rank: 190, titleEn: "Into the Wild", titleCn: "荒野生存", year: 2007, director: "Sean Penn", rating: 8.0, genres: ["drama"] },
    { rank: 191, titleEn: "The Passion of Joan of Arc", titleCn: "圣女贞德蒙难记", year: 1928, director: "Carl Theodor Dreyer", rating: 8.0, genres: ["drama"] },
    { rank: 192, titleEn: "Logan", titleCn: "金刚狼3：殊死一战", year: 2017, director: "James Mangold", rating: 8.0, genres: ["action", "drama", "sci-fi"] },
    { rank: 193, titleEn: "Network", titleCn: "电视台风云", year: 1976, director: "Sidney Lumet", rating: 8.0, genres: ["drama"] },
    { rank: 194, titleEn: "Life of Brian", titleCn: "布莱恩的一生", year: 1979, director: "Terry Jones", rating: 8.0, genres: ["comedy"] },
    { rank: 195, titleEn: "How to Train Your Dragon", titleCn: "驯龙高手", year: 2010, director: "Dean DeBlois, Chris Sanders", rating: 8.0, genres: ["comedy", "fantasy"] },
    { rank: 196, titleEn: "La haine", titleCn: "仇恨", year: 1995, director: "Mathieu Kassovitz", rating: 8.0, genres: ["crime", "drama"] },
    { rank: 197, titleEn: "Gangs of Wasseypur", titleCn: "瓦塞浦黑帮", year: 2012, director: "Anurag Kashyap", rating: 8.0, genres: ["action", "crime", "drama"] },
    { rank: 198, titleEn: "Mary and Max", titleCn: "玛丽和马克思", year: 2009, director: "Adam Elliot", rating: 8.0, genres: ["comedy", "drama"] },
    { rank: 199, titleEn: "Klaus", titleCn: "克劳斯：圣诞节的秘密", year: 2019, director: "Sergio Pablos", rating: 8.0, genres: ["comedy", "fantasy"] },
    { rank: 200, titleEn: "Mandariinid", titleCn: "橘子", year: 2013, director: "Zaza Urushadze", rating: 8.0, genres: ["drama", "war"] },
    { rank: 201, titleEn: "Ford v Ferrari", titleCn: "极速车王", year: 2019, director: "James Mangold", rating: 8.0, genres: ["action", "drama"] },
    { rank: 202, titleEn: "Persona", titleCn: "假面", year: 1966, director: "Ingmar Bergman", rating: 8.0, genres: ["drama", "thriller"] },
    { rank: 203, titleEn: "The Celebration", titleCn: "庆典", year: 1998, director: "Thomas Vinterberg", rating: 8.0, genres: ["drama"] },
    { rank: 204, titleEn: "Tokyo Story", titleCn: "东京物语", year: 1953, director: "Yasujirō Ozu", rating: 8.0, genres: ["drama"] },
    { rank: 205, titleEn: "A Silent Voice: The Movie", titleCn: "声之形", year: 2016, director: "Naoko Yamada", rating: 8.0, genres: ["drama"] },
    { rank: 206, titleEn: "It Happened One Night", titleCn: "一夜风流", year: 1934, director: "Frank Capra", rating: 8.0, genres: ["comedy", "romance"] },
    { rank: 207, titleEn: "The Wages of Fear", titleCn: "恐惧的代价", year: 1953, director: "Henri-Georges Clouzot", rating: 8.0, genres: ["drama", "thriller"] },
    { rank: 208, titleEn: "Stalker", titleCn: "潜行者", year: 1979, director: "Andrei Tarkovsky", rating: 8.0, genres: ["drama", "sci-fi"] },
    { rank: 209, titleEn: "The Battle of Algiers", titleCn: "阿尔及尔之战", year: 1966, director: "Gillo Pontecorvo", rating: 8.0, genres: ["drama", "war"] },
    { rank: 210, titleEn: "Dog Day Afternoon", titleCn: "热天午后", year: 1975, director: "Sidney Lumet", rating: 8.0, genres: ["crime", "drama", "thriller"] },
    { rank: 211, titleEn: "Andrei Rublev", titleCn: "安德烈·卢布廖夫", year: 1966, director: "Andrei Tarkovsky", rating: 8.0, genres: ["drama"] },
    { rank: 212, titleEn: "Cool Hand Luke", titleCn: "铁窗喋血", year: 1967, director: "Stuart Rosenberg", rating: 8.0, genres: ["crime", "drama"] },
    { rank: 213, titleEn: "The Sound of Music", titleCn: "音乐之声", year: 1965, director: "Robert Wise", rating: 8.0, genres: ["drama", "musical", "romance"] },
    { rank: 214, titleEn: "Mr. Smith Goes to Washington", titleCn: "史密斯先生到华盛顿", year: 1939, director: "Frank Capra", rating: 8.0, genres: ["comedy", "drama"] },
    { rank: 215, titleEn: "Fanny and Alexander", titleCn: "芬妮与亚历山大", year: 1982, director: "Ingmar Bergman", rating: 8.0, genres: ["drama"] },
    { rank: 216, titleEn: "The Big Lebowski", titleCn: "谋杀绿脚趾", year: 1998, director: "Joel Coen, Ethan Coen", rating: 8.0, genres: ["comedy", "crime"] },
    { rank: 217, titleEn: "The Seventh Continent", titleCn: "第七大陆", year: 1989, director: "Michael Haneke", rating: 8.0, genres: ["drama"] },
    { rank: 218, titleEn: "Rebecca", titleCn: "蝴蝶梦", year: 1940, director: "Alfred Hitchcock", rating: 8.0, genres: ["drama", "thriller"] },
    { rank: 219, titleEn: "La Strada", titleCn: "大路", year: 1954, director: "Federico Fellini", rating: 8.0, genres: ["drama"] },
    { rank: 220, titleEn: "The Exorcist", titleCn: "驱魔人", year: 1973, director: "William Friedkin", rating: 8.0, genres: ["thriller"] },
    { rank: 221, titleEn: "Throne of Blood", titleCn: "蜘蛛巢城", year: 1957, director: "Akira Kurosawa", rating: 8.0, genres: ["drama", "war"] },
    { rank: 222, titleEn: "The Grapes of Wrath", titleCn: "愤怒的葡萄", year: 1940, director: "John Ford", rating: 8.0, genres: ["drama"] },
    { rank: 223, titleEn: "The Maltese Falcon", titleCn: "马耳他之鹰", year: 1941, director: "John Huston", rating: 8.0, genres: ["crime", "thriller"] },
    { rank: 224, titleEn: "To Be or Not to Be", titleCn: "你逃我也逃", year: 1942, director: "Ernst Lubitsch", rating: 8.0, genres: ["comedy", "war"] },
    { rank: 225, titleEn: "Young Frankenstein", titleCn: "新科学怪人", year: 1974, director: "Mel Brooks", rating: 8.0, genres: ["comedy"] },
    { rank: 226, titleEn: "The Best Years of Our Lives", titleCn: "黄金时代", year: 1946, director: "William Wyler", rating: 8.0, genres: ["drama", "romance", "war"] },
    { rank: 227, titleEn: "The Great Beauty", titleCn: "绝美之城", year: 2013, director: "Paolo Sorrentino", rating: 7.9, genres: ["drama"] },
    { rank: 228, titleEn: "Underground", titleCn: "地下", year: 1995, director: "Emir Kusturica", rating: 7.9, genres: ["comedy", "drama", "war"] },
    { rank: 229, titleEn: "8½", titleCn: "八部半", year: 1963, director: "Federico Fellini", rating: 7.9, genres: ["drama"] },
    { rank: 230, titleEn: "The Blue Angel", titleCn: "蓝天使", year: 1930, director: "Josef von Sternberg", rating: 7.9, genres: ["drama"] },
    { rank: 231, titleEn: "Three Colors: Red", titleCn: "红色", year: 1994, director: "Krzysztof Kieślowski", rating: 7.9, genres: ["drama", "romance"] },
    { rank: 232, titleEn: "About Elly", titleCn: "关于伊丽", year: 2009, director: "Asghar Farhadi", rating: 7.9, genres: ["drama", "thriller"] },
    { rank: 233, titleEn: "Million Dollar Baby", titleCn: "百万美元宝贝", year: 2004, director: "Clint Eastwood", rating: 7.9, genres: ["drama"] },
    { rank: 234, titleEn: "Before Sunset", titleCn: "日落之前", year: 2004, director: "Richard Linklater", rating: 7.9, genres: ["drama", "romance"] },
    { rank: 235, titleEn: "Blade Runner 2049", titleCn: "银翼杀手2049", year: 2017, director: "Denis Villeneuve", rating: 7.9, genres: ["action", "sci-fi", "thriller"] },
    { rank: 236, titleEn: "Harry Potter and the Deathly Hallows: Part 2", titleCn: "哈利·波特与死亡圣器(下)", year: 2011, director: "David Yates", rating: 7.9, genres: ["fantasy"] },
    { rank: 237, titleEn: "The Wizard of Oz", titleCn: "绿野仙踪", year: 1939, director: "Victor Fleming", rating: 7.9, genres: ["fantasy"] },
    { rank: 238, titleEn: "Hacksaw Ridge", titleCn: "血战钢锯岭", year: 2016, director: "Mel Gibson", rating: 7.9, genres: ["drama", "war"] },
    { rank: 239, titleEn: "The 39 Steps", titleCn: "三十九级台阶", year: 1935, director: "Alfred Hitchcock", rating: 7.9, genres: ["crime", "thriller"] },
    { rank: 240, titleEn: "Who's Afraid of Virginia Woolf?", titleCn: "谁怕弗吉尼亚·伍尔夫？", year: 1966, director: "Mike Nichols", rating: 7.9, genres: ["drama"] },
    { rank: 241, titleEn: "The Man Who Shot Liberty Valance", titleCn: "射杀自由瓦伦斯的人", year: 1962, director: "John Ford", rating: 7.9, genres: ["drama", "western"] },
    { rank: 242, titleEn: "The Straight Story", titleCn: "史崔特先生的故事", year: 1999, director: "David Lynch", rating: 7.9, genres: ["drama"] },
    { rank: 243, titleEn: "The Last Picture Show", titleCn: "最后一场电影", year: 1971, director: "Peter Bogdanovich", rating: 7.9, genres: ["drama"] },
    { rank: 244, titleEn: "Children of Heaven", titleCn: "天堂的孩子", year: 1997, director: "Majid Majidi", rating: 7.9, genres: ["drama"] },
    { rank: 245, titleEn: "Pink Floyd: The Wall", titleCn: "迷墙", year: 1982, director: "Alan Parker", rating: 7.9, genres: ["drama"] },
    { rank: 246, titleEn: "The Wild Bunch", titleCn: "日落黄沙", year: 1969, director: "Sam Peckinpah", rating: 7.9, genres: ["action", "western"] },
    { rank: 247, titleEn: "Monsters, Inc.", titleCn: "怪兽电力公司", year: 2001, director: "Pete Docter", rating: 7.9, genres: ["comedy", "fantasy"] },
    { rank: 248, titleEn: "Paris, Texas", titleCn: "德州巴黎", year: 1984, director: "Wim Wenders", rating: 7.9, genres: ["drama"] },
    { rank: 249, titleEn: "The Nights of Cabiria", titleCn: "卡比利亚之夜", year: 1957, director: "Federico Fellini", rating: 7.9, genres: ["drama"] },
    { rank: 250, titleEn: "Paper Moon", titleCn: "纸月亮", year: 1973, director: "Peter Bogdanovich", rating: 7.9, genres: ["comedy", "crime", "drama"] }
];

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
    
    // 初始化筛选后的电影列表
    filteredMovies = [...top250Movies];
    
    // 渲染电影列表
    renderMovies();
    updateStats();
    updateWatchedMoviesList();
    
    // 绑定事件监听器
    bindEventListeners();
});// 绑定事
件监听器
function bindEventListeners() {
    // 筛选器事件
    document.getElementById('genreFilter').addEventListener('change', handleFilterChange);
    document.getElementById('yearFilter').addEventListener('change', handleFilterChange);
    document.getElementById('ratingFilter').addEventListener('change', handleFilterChange);
    document.getElementById('statusFilter').addEventListener('change', handleFilterChange);
    document.getElementById('clearFilters').addEventListener('click', clearFilters);
    
    // 模态框事件
    closeModal.addEventListener('click', closeMovieModal);
    markWatchedBtn.addEventListener('click', toggleWatchedStatus);
    removeMovieBtn.addEventListener('click', removeFromWatched);
    
    // 数据管理事件
    clearAllBtn.addEventListener('click', clearAllData);
    exportDataBtn.addEventListener('click', exportData);
    importDataBtn.addEventListener('click', () => importFileInput.click());
    importFileInput.addEventListener('change', importData);
    
    // 点击模态框外部关闭
    movieModal.addEventListener('click', function(e) {
        if (e.target === movieModal) {
            closeMovieModal();
        }
    });
}

// 渲染电影列表
function renderMovies() {
    if (!moviesList) return;
    
    moviesList.innerHTML = '';
    
    filteredMovies.forEach(movie => {
        const isWatched = watchedMovies.some(w => w.rank === movie.rank);
        const movieCard = createMovieCard(movie, isWatched);
        moviesList.appendChild(movieCard);
    });
    
    // 更新结果计数
    const resultsCount = document.getElementById('resultsCount');
    if (resultsCount) {
        resultsCount.textContent = `${filteredMovies.length} movies`;
    }
}

// 创建电影卡片
function createMovieCard(movie, isWatched) {
    const card = document.createElement('div');
    card.className = `movie-item ${isWatched ? 'watched' : 'unwatched'}`;
    card.addEventListener('click', () => openMovieModal(movie));
    
    card.innerHTML = `
        <div class="movie-rank">#${movie.rank}</div>
        <div class="movie-content">
            <div class="movie-titles">
                <div class="movie-title-en">${movie.titleEn}</div>
                <div class="movie-title-cn">${movie.titleCn}</div>
            </div>
            <div class="movie-meta">
                <span class="movie-year">${movie.year}</span>
                <span class="movie-rating">⭐ ${movie.rating}</span>
                <span class="movie-director">${movie.director}</span>
            </div>
            <div class="movie-genres">
                ${movie.genres.map(genre => `<span class="genre-tag">${genre}</span>`).join('')}
            </div>
        </div>
    `;
    
    return card;
}

// 处理筛选器变化
function handleFilterChange() {
    currentFilters.genre = document.getElementById('genreFilter').value;
    currentFilters.year = document.getElementById('yearFilter').value;
    currentFilters.rating = document.getElementById('ratingFilter').value;
    currentFilters.status = document.getElementById('statusFilter').value;
    
    applyFilters();
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
            if (!isInRatingRange(movie.rating, currentFilters.rating)) {
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
    
    renderMovies();
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

// 检查评分范围
function isInRatingRange(rating, range) {
    switch (range) {
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

// 清除筛选器
function clearFilters() {
    currentFilters = {
        genre: '',
        year: '',
        rating: '',
        status: ''
    };
    
    document.getElementById('genreFilter').value = '';
    document.getElementById('yearFilter').value = '';
    document.getElementById('ratingFilter').value = '';
    document.getElementById('statusFilter').value = '';
    
    filteredMovies = [...top250Movies];
    renderMovies();
}

// 打开电影详情模态框
function openMovieModal(movie) {
    currentMovie = movie;
    const isWatched = watchedMovies.some(w => w.rank === movie.rank);
    const watchedMovie = watchedMovies.find(w => w.rank === movie.rank);
    
    document.getElementById('movieTitle').textContent = movie.titleEn;
    document.getElementById('movieYear').textContent = movie.year;
    document.getElementById('movieDirector').textContent = movie.director;
    document.getElementById('movieRating').textContent = movie.rating;
    document.getElementById('movieStatus').textContent = isWatched ? 'Watched' : 'Not Watched';
    
    // 更新按钮状态
    markWatchedBtn.textContent = isWatched ? 'Mark as Unwatched' : 'Mark as Watched';
    markWatchedBtn.className = isWatched ? 'modal-btn btn-secondary' : 'modal-btn btn-primary';
    removeMovieBtn.style.display = isWatched ? 'inline-block' : 'none';
    
    // 显示/隐藏观看信息
    const watchInfo = document.getElementById('watchInfo');
    if (isWatched && watchedMovie) {
        watchInfo.style.display = 'block';
        document.getElementById('watchDate').value = watchedMovie.watchDate || '';
        document.getElementById('personalRating').value = watchedMovie.personalRating || '';
        document.getElementById('watchNotes').value = watchedMovie.notes || '';
    } else {
        watchInfo.style.display = 'none';
    }
    
    movieModal.classList.remove('hidden');
}

// 关闭电影详情模态框
function closeMovieModal() {
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
        const watchedMovie = {
            rank: currentMovie.rank,
            titleEn: currentMovie.titleEn,
            titleCn: currentMovie.titleCn,
            year: currentMovie.year,
            rating: currentMovie.rating,
            watchDate: document.getElementById('watchDate').value || new Date().toISOString().split('T')[0],
            personalRating: document.getElementById('personalRating').value || '',
            notes: document.getElementById('watchNotes').value || ''
        };
        watchedMovies.push(watchedMovie);
    }
    
    // 保存到本地存储
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
    
    // 更新界面
    renderMovies();
    updateStats();
    updateWatchedMoviesList();
    openMovieModal(currentMovie); // 重新打开模态框以更新状态
}

// 从观看列表中移除
function removeFromWatched() {
    if (!currentMovie) return;
    
    watchedMovies = watchedMovies.filter(w => w.rank !== currentMovie.rank);
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
    
    renderMovies();
    updateStats();
    updateWatchedMoviesList();
    closeMovieModal();
}

// 更新统计信息
function updateStats() {
    if (!watchedCount || !watchedPercentage || !totalMovies || !averageRating) return;
    
    const watched = watchedMovies.length;
    const total = top250Movies.length;
    const percentage = Math.round((watched / total) * 100);
    
    watchedCount.textContent = watched;
    watchedPercentage.textContent = `${percentage}%`;
    totalMovies.textContent = total;
    
    // 计算平均评分
    if (watched > 0) {
        const totalRating = watchedMovies.reduce((sum, movie) => {
            const movieData = top250Movies.find(m => m.rank === movie.rank);
            return sum + (movieData ? movieData.rating : 0);
        }, 0);
        const avgRating = (totalRating / watched).toFixed(1);
        averageRating.textContent = avgRating;
    } else {
        averageRating.textContent = '0.0';
    }
}

// 更新已观看电影列表
function updateWatchedMoviesList() {
    if (!watchedMoviesList) return;
    
    if (watchedMovies.length === 0) {
        watchedMoviesList.innerHTML = `
            <div class="empty-state">
                <p>No movies watched yet</p>
                <small>Click on movies to mark them as watched</small>
            </div>
        `;
        document.getElementById('watchedMoviesCount').textContent = '0';
        return;
    }
    
    // 按排名排序
    const sortedWatched = [...watchedMovies].sort((a, b) => a.rank - b.rank);
    
    watchedMoviesList.innerHTML = sortedWatched.map(movie => `
        <div class="watched-movie-item" onclick="openMovieModalByRank(${movie.rank})">
            <div class="watched-movie-name">
                <div class="watched-movie-rank">#${movie.rank}</div>
                <div class="watched-movie-title">${movie.titleEn}</div>
            </div>
            <div class="watched-movie-date">${movie.year}</div>
        </div>
    `).join('');
    
    document.getElementById('watchedMoviesCount').textContent = watchedMovies.length;
}

// 通过排名打开电影模态框
function openMovieModalByRank(rank) {
    const movie = top250Movies.find(m => m.rank === rank);
    if (movie) {
        openMovieModal(movie);
    }
}

// 清除所有数据
function clearAllData() {
    if (confirm('Are you sure you want to clear all watched movies data? This action cannot be undone.')) {
        watchedMovies = [];
        localStorage.removeItem('watchedMovies');
        renderMovies();
        updateStats();
        updateWatchedMoviesList();
    }
}

// 导出数据
function exportData() {
    const data = {
        watchedMovies: watchedMovies,
        exportDate: new Date().toISOString(),
        version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `imdb-top250-watched-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// 导入数据
function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.watchedMovies && Array.isArray(data.watchedMovies)) {
                watchedMovies = data.watchedMovies;
                localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
                renderMovies();
                updateStats();
                updateWatchedMoviesList();
                alert('Data imported successfully!');
            } else {
                alert('Invalid file format. Please select a valid export file.');
            }
        } catch (error) {
            alert('Error reading file. Please make sure it\'s a valid JSON file.');
        }
    };
    reader.readAsText(file);
    
    // 清除文件输入
    event.target.value = '';
}