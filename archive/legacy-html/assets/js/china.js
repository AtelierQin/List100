class ChinaMap {
    constructor() {
        this.visitedCities = new Map();
        this.cities = new Map();
        this.init();
    }

    async init() {
        await this.loadData();
        this.createProvincesList();
        this.bindEvents();
        // 添加小延迟确保DOM完全渲染
        setTimeout(() => {
            this.syncAllPanels();
        }, 100);
    }

    async loadData() {
        try {
            const visitedData = localStorage.getItem('china-visited-cities');
            
            if (visitedData) {
                const visited = JSON.parse(visitedData);
                this.visitedCities = new Map(visited);
            }
        } catch (error) {
            console.error('Error loading china travel data:', error);
        }
    }

    saveData() {
        try {
            localStorage.setItem('china-visited-cities', JSON.stringify([...this.visitedCities]));
        } catch (error) {
            console.error('Error saving china travel data:', error);
        }
    }

    createProvincesList() {
        const provincesList = document.getElementById('provincesList');

        // 定义中国各省份及主要城市数据
        const provincesData = {
            '北京市': {
                emoji: '🏛️',
                cities: {
                    'BJ001': { name: '北京', level: '直辖市', icon: '🏛️' }
                }
            },
            '上海市': {
                emoji: '🏙️',
                cities: {
                    'SH001': { name: '上海', level: '直辖市', icon: '🏙️' }
                }
            },
            '天津市': {
                emoji: '🌊',
                cities: {
                    'TJ001': { name: '天津', level: '直辖市', icon: '🌊' }
                }
            },
            '重庆市': {
                emoji: '🏔️',
                cities: {
                    'CQ001': { name: '重庆', level: '直辖市', icon: '🏔️' }
                }
            },
            '广东省': {
                emoji: '🌴',
                cities: {
                    'GD001': { name: '广州', level: '省会', icon: '🌸' },
                    'GD002': { name: '深圳', level: '副省级', icon: '🏢' },
                    'GD003': { name: '珠海', level: '地级市', icon: '🏖️' },
                    'GD004': { name: '汕头', level: '地级市', icon: '🌊' },
                    'GD005': { name: '佛山', level: '地级市', icon: '🏭' },
                    'GD006': { name: '韶关', level: '地级市', icon: '⛰️' },
                    'GD007': { name: '湛江', level: '地级市', icon: '🚢' },
                    'GD008': { name: '肇庆', level: '地级市', icon: '🏞️' },
                    'GD009': { name: '江门', level: '地级市', icon: '🏘️' },
                    'GD010': { name: '茂名', level: '地级市', icon: '🌾' },
                    'GD011': { name: '惠州', level: '地级市', icon: '🏞️' },
                    'GD012': { name: '梅州', level: '地级市', icon: '🍃' },
                    'GD013': { name: '汕尾', level: '地级市', icon: '🏖️' },
                    'GD014': { name: '河源', level: '地级市', icon: '💧' },
                    'GD015': { name: '阳江', level: '地级市', icon: '☀️' },
                    'GD016': { name: '清远', level: '地级市', icon: '🌲' },
                    'GD017': { name: '东莞', level: '地级市', icon: '🏭' },
                    'GD018': { name: '中山', level: '地级市', icon: '🌺' },
                    'GD019': { name: '潮州', level: '地级市', icon: '🍵' },
                    'GD020': { name: '揭阳', level: '地级市', icon: '🌾' },
                    'GD021': { name: '云浮', level: '地级市', icon: '☁️' }
                }
            },
            '江苏省': {
                emoji: '🌊',
                cities: {
                    'JS001': { name: '南京', level: '省会', icon: '🏛️' },
                    'JS002': { name: '苏州', level: '地级市', icon: '🏞️' },
                    'JS003': { name: '无锡', level: '地级市', icon: '🏭' },
                    'JS004': { name: '常州', level: '地级市', icon: '🏘️' },
                    'JS005': { name: '镇江', level: '地级市', icon: '⛰️' },
                    'JS006': { name: '南通', level: '地级市', icon: '🌊' },
                    'JS007': { name: '泰州', level: '地级市', icon: '🌸' },
                    'JS008': { name: '扬州', level: '地级市', icon: '🌺' },
                    'JS009': { name: '盐城', level: '地级市', icon: '🧂' },
                    'JS010': { name: '连云港', level: '地级市', icon: '🚢' },
                    'JS011': { name: '徐州', level: '地级市', icon: '🏔️' },
                    'JS012': { name: '淮安', level: '地级市', icon: '💧' },
                    'JS013': { name: '宿迁', level: '地级市', icon: '🌾' }
                }
            },
            '浙江省': {
                emoji: '🏞️',
                cities: {
                    'ZJ001': { name: '杭州', level: '省会', icon: '🌸' },
                    'ZJ002': { name: '宁波', level: '副省级', icon: '🚢' },
                    'ZJ003': { name: '温州', level: '地级市', icon: '🌊' },
                    'ZJ004': { name: '嘉兴', level: '地级市', icon: '🌾' },
                    'ZJ005': { name: '湖州', level: '地级市', icon: '🏞️' },
                    'ZJ006': { name: '绍兴', level: '地级市', icon: '🍷' },
                    'ZJ007': { name: '金华', level: '地级市', icon: '🌺' },
                    'ZJ008': { name: '衢州', level: '地级市', icon: '⛰️' },
                    'ZJ009': { name: '舟山', level: '地级市', icon: '🏝️' },
                    'ZJ010': { name: '台州', level: '地级市', icon: '🌊' },
                    'ZJ011': { name: '丽水', level: '地级市', icon: '💧' }
                }
            },
            '山东省': {
                emoji: '⛰️',
                cities: {
                    'SD001': { name: '济南', level: '省会', icon: '⛲' },
                    'SD002': { name: '青岛', level: '副省级', icon: '🌊' },
                    'SD003': { name: '淄博', level: '地级市', icon: '🏭' },
                    'SD004': { name: '枣庄', level: '地级市', icon: '🌰' },
                    'SD005': { name: '东营', level: '地级市', icon: '🛢️' },
                    'SD006': { name: '烟台', level: '地级市', icon: '🍎' },
                    'SD007': { name: '潍坊', level: '地级市', icon: '🪁' },
                    'SD008': { name: '济宁', level: '地级市', icon: '🏛️' },
                    'SD009': { name: '泰安', level: '地级市', icon: '⛰️' },
                    'SD010': { name: '威海', level: '地级市', icon: '🏖️' },
                    'SD011': { name: '日照', level: '地级市', icon: '☀️' },
                    'SD012': { name: '临沂', level: '地级市', icon: '🌲' },
                    'SD013': { name: '德州', level: '地级市', icon: '🌾' },
                    'SD014': { name: '聊城', level: '地级市', icon: '🏘️' },
                    'SD015': { name: '滨州', level: '地级市', icon: '🌊' },
                    'SD016': { name: '菏泽', level: '地级市', icon: '🌺' }
                }
            },
            '河南省': {
                emoji: '🏛️',
                cities: {
                    'HN001': { name: '郑州', level: '省会', icon: '🚄' },
                    'HN002': { name: '开封', level: '地级市', icon: '🏛️' },
                    'HN003': { name: '洛阳', level: '地级市', icon: '🌸' },
                    'HN004': { name: '平顶山', level: '地级市', icon: '⛰️' },
                    'HN005': { name: '安阳', level: '地级市', icon: '📜' },
                    'HN006': { name: '鹤壁', level: '地级市', icon: '🕊️' },
                    'HN007': { name: '新乡', level: '地级市', icon: '🌾' },
                    'HN008': { name: '焦作', level: '地级市', icon: '⛰️' },
                    'HN009': { name: '濮阳', level: '地级市', icon: '🛢️' },
                    'HN010': { name: '许昌', level: '地级市', icon: '🌸' },
                    'HN011': { name: '漯河', level: '地级市', icon: '💧' },
                    'HN012': { name: '三门峡', level: '地级市', icon: '🏔️' },
                    'HN013': { name: '南阳', level: '地级市', icon: '🌿' },
                    'HN014': { name: '商丘', level: '地级市', icon: '🏪' },
                    'HN015': { name: '信阳', level: '地级市', icon: '🍃' },
                    'HN016': { name: '周口', level: '地级市', icon: '🌾' },
                    'HN017': { name: '驻马店', level: '地级市', icon: '🐎' }
                }
            },
            '四川省': {
                emoji: '🐼',
                cities: {
                    'SC001': { name: '成都', level: '省会', icon: '🐼' },
                    'SC002': { name: '自贡', level: '地级市', icon: '🧂' },
                    'SC003': { name: '攀枝花', level: '地级市', icon: '🌺' },
                    'SC004': { name: '泸州', level: '地级市', icon: '🍷' },
                    'SC005': { name: '德阳', level: '地级市', icon: '🏭' },
                    'SC006': { name: '绵阳', level: '地级市', icon: '🚀' },
                    'SC007': { name: '广元', level: '地级市', icon: '⛰️' },
                    'SC008': { name: '遂宁', level: '地级市', icon: '🌾' },
                    'SC009': { name: '内江', level: '地级市', icon: '🍯' },
                    'SC010': { name: '乐山', level: '地级市', icon: '🗿' },
                    'SC011': { name: '南充', level: '地级市', icon: '🌸' },
                    'SC012': { name: '眉山', level: '地级市', icon: '👁️' },
                    'SC013': { name: '宜宾', level: '地级市', icon: '🍷' },
                    'SC014': { name: '广安', level: '地级市', icon: '🌾' },
                    'SC015': { name: '达州', level: '地级市', icon: '🏔️' },
                    'SC016': { name: '雅安', level: '地级市', icon: '🐼' },
                    'SC017': { name: '巴中', level: '地级市', icon: '⛰️' },
                    'SC018': { name: '资阳', level: '地级市', icon: '☀️' }
                }
            },
            '湖北省': {
                emoji: '🌊',
                cities: {
                    'HB001': { name: '武汉', level: '省会', icon: '🌸' },
                    'HB002': { name: '黄石', level: '地级市', icon: '⛰️' },
                    'HB003': { name: '十堰', level: '地级市', icon: '🚗' },
                    'HB004': { name: '宜昌', level: '地级市', icon: '🏔️' },
                    'HB005': { name: '襄阳', level: '地级市', icon: '🏛️' },
                    'HB006': { name: '鄂州', level: '地级市', icon: '🌊' },
                    'HB007': { name: '荆门', level: '地级市', icon: '🚪' },
                    'HB008': { name: '孝感', level: '地级市', icon: '❤️' },
                    'HB009': { name: '荆州', level: '地级市', icon: '🏛️' },
                    'HB010': { name: '黄冈', level: '地级市', icon: '📚' },
                    'HB011': { name: '咸宁', level: '地级市', icon: '🌿' },
                    'HB012': { name: '随州', level: '地级市', icon: '🎵' }
                }
            },
            '湖南省': {
                emoji: '🌶️',
                cities: {
                    'HUN001': { name: '长沙', level: '省会', icon: '🎆' },
                    'HUN002': { name: '株洲', level: '地级市', icon: '🚄' },
                    'HUN003': { name: '湘潭', level: '地级市', icon: '🌸' },
                    'HUN004': { name: '衡阳', level: '地级市', icon: '🕊️' },
                    'HUN005': { name: '邵阳', level: '地级市', icon: '⛰️' },
                    'HUN006': { name: '岳阳', level: '地级市', icon: '🌊' },
                    'HUN007': { name: '常德', level: '地级市', icon: '🌾' },
                    'HUN008': { name: '张家界', level: '地级市', icon: '🏔️' },
                    'HUN009': { name: '益阳', level: '地级市', icon: '☀️' },
                    'HUN010': { name: '郴州', level: '地级市', icon: '💎' },
                    'HUN011': { name: '永州', level: '地级市', icon: '🌿' },
                    'HUN012': { name: '怀化', level: '地级市', icon: '🌲' },
                    'HUN013': { name: '娄底', level: '地级市', icon: '⛰️' }
                }
            },
            '安徽省': {
                emoji: '🏔️',
                cities: {
                    'AH001': { name: '合肥', level: '省会', icon: '🌸' },
                    'AH002': { name: '芜湖', level: '地级市', icon: '🌊' },
                    'AH003': { name: '蚌埠', level: '地级市', icon: '🐚' },
                    'AH004': { name: '淮南', level: '地级市', icon: '⛰️' },
                    'AH005': { name: '马鞍山', level: '地级市', icon: '🐎' },
                    'AH006': { name: '淮北', level: '地级市', icon: '⛰️' },
                    'AH007': { name: '铜陵', level: '地级市', icon: '🔔' },
                    'AH008': { name: '安庆', level: '地级市', icon: '🏛️' },
                    'AH009': { name: '黄山', level: '地级市', icon: '⛰️' },
                    'AH010': { name: '滁州', level: '地级市', icon: '🌾' },
                    'AH011': { name: '阜阳', level: '地级市', icon: '☀️' },
                    'AH012': { name: '宿州', level: '地级市', icon: '🌙' },
                    'AH013': { name: '六安', level: '地级市', icon: '🍃' },
                    'AH014': { name: '亳州', level: '地级市', icon: '💊' },
                    'AH015': { name: '池州', level: '地级市', icon: '🏞️' },
                    'AH016': { name: '宣城', level: '地级市', icon: '📜' }
                }
            },
            '江西省': {
                emoji: '🌸',
                cities: {
                    'JX001': { name: '南昌', level: '省会', icon: '🌸' },
                    'JX002': { name: '景德镇', level: '地级市', icon: '🏺' },
                    'JX003': { name: '萍乡', level: '地级市', icon: '🌿' },
                    'JX004': { name: '九江', level: '地级市', icon: '🌊' },
                    'JX005': { name: '新余', level: '地级市', icon: '✨' },
                    'JX006': { name: '鹰潭', level: '地级市', icon: '🦅' },
                    'JX007': { name: '赣州', level: '地级市', icon: '🍊' },
                    'JX008': { name: '吉安', level: '地级市', icon: '🕊️' },
                    'JX009': { name: '宜春', level: '地级市', icon: '🌸' },
                    'JX010': { name: '抚州', level: '地级市', icon: '📚' },
                    'JX011': { name: '上饶', level: '地级市', icon: '⛰️' }
                }
            },
            '福建省': {
                emoji: '🌊',
                cities: {
                    'FJ001': { name: '福州', level: '省会', icon: '🌸' },
                    'FJ002': { name: '厦门', level: '副省级', icon: '🏖️' },
                    'FJ003': { name: '莆田', level: '地级市', icon: '🌺' },
                    'FJ004': { name: '三明', level: '地级市', icon: '🌲' },
                    'FJ005': { name: '泉州', level: '地级市', icon: '⛲' },
                    'FJ006': { name: '漳州', level: '地级市', icon: '🌸' },
                    'FJ007': { name: '南平', level: '地级市', icon: '🏔️' },
                    'FJ008': { name: '龙岩', level: '地级市', icon: '🐉' },
                    'FJ009': { name: '宁德', level: '地级市', icon: '🌊' }
                }
            },
            '河北省': {
                emoji: '🏔️',
                cities: {
                    'HEB001': { name: '石家庄', level: '省会', icon: '🏛️' },
                    'HEB002': { name: '唐山', level: '地级市', icon: '⛰️' },
                    'HEB003': { name: '秦皇岛', level: '地级市', icon: '🏖️' },
                    'HEB004': { name: '邯郸', level: '地级市', icon: '🏛️' },
                    'HEB005': { name: '邢台', level: '地级市', icon: '🌾' },
                    'HEB006': { name: '保定', level: '地级市', icon: '🏞️' },
                    'HEB007': { name: '张家口', level: '地级市', icon: '🎿' },
                    'HEB008': { name: '承德', level: '地级市', icon: '🏔️' },
                    'HEB009': { name: '沧州', level: '地级市', icon: '🌊' },
                    'HEB010': { name: '廊坊', level: '地级市', icon: '🏘️' },
                    'HEB011': { name: '衡水', level: '地级市', icon: '💧' }
                }
            },
            '山西省': {
                emoji: '⛰️',
                cities: {
                    'SX001': { name: '太原', level: '省会', icon: '🏛️' },
                    'SX002': { name: '大同', level: '地级市', icon: '⛰️' },
                    'SX003': { name: '阳泉', level: '地级市', icon: '☀️' },
                    'SX004': { name: '长治', level: '地级市', icon: '🏔️' },
                    'SX005': { name: '晋城', level: '地级市', icon: '🏰' },
                    'SX006': { name: '朔州', level: '地级市', icon: '🌾' },
                    'SX007': { name: '晋中', level: '地级市', icon: '🏞️' },
                    'SX008': { name: '运城', level: '地级市', icon: '🚢' },
                    'SX009': { name: '忻州', level: '地级市', icon: '⛰️' },
                    'SX010': { name: '临汾', level: '地级市', icon: '🌸' },
                    'SX011': { name: '吕梁', level: '地级市', icon: '🏔️' }
                }
            },
            '内蒙古自治区': {
                emoji: '🐎',
                cities: {
                    'NMG001': { name: '呼和浩特', level: '首府', icon: '🏛️' },
                    'NMG002': { name: '包头', level: '地级市', icon: '🏭' },
                    'NMG003': { name: '乌海', level: '地级市', icon: '⛰️' },
                    'NMG004': { name: '赤峰', level: '地级市', icon: '🦅' },
                    'NMG005': { name: '通辽', level: '地级市', icon: '🌾' },
                    'NMG006': { name: '鄂尔多斯', level: '地级市', icon: '🏜️' },
                    'NMG007': { name: '呼伦贝尔', level: '地级市', icon: '🐎' },
                    'NMG008': { name: '巴彦淖尔', level: '地级市', icon: '🌊' },
                    'NMG009': { name: '乌兰察布', level: '地级市', icon: '🌸' }
                }
            },
            '辽宁省': {
                emoji: '🌊',
                cities: {
                    'LN001': { name: '沈阳', level: '省会', icon: '🏛️' },
                    'LN002': { name: '大连', level: '副省级', icon: '🌊' },
                    'LN003': { name: '鞍山', level: '地级市', icon: '⛰️' },
                    'LN004': { name: '抚顺', level: '地级市', icon: '🏔️' },
                    'LN005': { name: '本溪', level: '地级市', icon: '💎' },
                    'LN006': { name: '丹东', level: '地级市', icon: '🌸' },
                    'LN007': { name: '锦州', level: '地级市', icon: '🌊' },
                    'LN008': { name: '营口', level: '地级市', icon: '🚢' },
                    'LN009': { name: '阜新', level: '地级市', icon: '⛰️' },
                    'LN010': { name: '辽阳', level: '地级市', icon: '☀️' },
                    'LN011': { name: '盘锦', level: '地级市', icon: '🛢️' },
                    'LN012': { name: '铁岭', level: '地级市', icon: '🚂' },
                    'LN013': { name: '朝阳', level: '地级市', icon: '🌅' },
                    'LN014': { name: '葫芦岛', level: '地级市', icon: '🏝️' }
                }
            },
            '吉林省': {
                emoji: '🌲',
                cities: {
                    'JL001': { name: '长春', level: '省会', icon: '🌸' },
                    'JL002': { name: '吉林', level: '地级市', icon: '🌲' },
                    'JL003': { name: '四平', level: '地级市', icon: '🌾' },
                    'JL004': { name: '辽源', level: '地级市', icon: '💧' },
                    'JL005': { name: '通化', level: '地级市', icon: '🌿' },
                    'JL006': { name: '白山', level: '地级市', icon: '⛰️' },
                    'JL007': { name: '松原', level: '地级市', icon: '🌲' },
                    'JL008': { name: '白城', level: '地级市', icon: '🏰' }
                }
            },
            '黑龙江省': {
                emoji: '❄️',
                cities: {
                    'HLJ001': { name: '哈尔滨', level: '省会', icon: '❄️' },
                    'HLJ002': { name: '齐齐哈尔', level: '地级市', icon: '🌾' },
                    'HLJ003': { name: '鸡西', level: '地级市', icon: '🐔' },
                    'HLJ004': { name: '鹤岗', level: '地级市', icon: '🕊️' },
                    'HLJ005': { name: '双鸭山', level: '地级市', icon: '🦆' },
                    'HLJ006': { name: '大庆', level: '地级市', icon: '🛢️' },
                    'HLJ007': { name: '伊春', level: '地级市', icon: '🌲' },
                    'HLJ008': { name: '佳木斯', level: '地级市', icon: '🌾' },
                    'HLJ009': { name: '七台河', level: '地级市', icon: '⛰️' },
                    'HLJ010': { name: '牡丹江', level: '地级市', icon: '🌸' },
                    'HLJ011': { name: '黑河', level: '地级市', icon: '🌊' },
                    'HLJ012': { name: '绥化', level: '地级市', icon: '🌾' }
                }
            },
            '陕西省': {
                emoji: '🏛️',
                cities: {
                    'SAX001': { name: '西安', level: '省会', icon: '🏛️' },
                    'SAX002': { name: '铜川', level: '地级市', icon: '🔔' },
                    'SAX003': { name: '宝鸡', level: '地级市', icon: '🏺' },
                    'SAX004': { name: '咸阳', level: '地级市', icon: '🏛️' },
                    'SAX005': { name: '渭南', level: '地级市', icon: '🌊' },
                    'SAX006': { name: '延安', level: '地级市', icon: '🏔️' },
                    'SAX007': { name: '汉中', level: '地级市', icon: '🌸' },
                    'SAX008': { name: '榆林', level: '地级市', icon: '🌲' },
                    'SAX009': { name: '安康', level: '地级市', icon: '🕊️' },
                    'SAX010': { name: '商洛', level: '地级市', icon: '⛰️' }
                }
            },
            '甘肃省': {
                emoji: '🏜️',
                cities: {
                    'GS001': { name: '兰州', level: '省会', icon: '🌊' },
                    'GS002': { name: '嘉峪关', level: '地级市', icon: '🏰' },
                    'GS003': { name: '金昌', level: '地级市', icon: '✨' },
                    'GS004': { name: '白银', level: '地级市', icon: '🥈' },
                    'GS005': { name: '天水', level: '地级市', icon: '💧' },
                    'GS006': { name: '武威', level: '地级市', icon: '🏔️' },
                    'GS007': { name: '张掖', level: '地级市', icon: '🌈' },
                    'GS008': { name: '平凉', level: '地级市', icon: '🌾' },
                    'GS009': { name: '酒泉', level: '地级市', icon: '🍷' },
                    'GS010': { name: '庆阳', level: '地级市', icon: '☀️' },
                    'GS011': { name: '定西', level: '地级市', icon: '⛰️' },
                    'GS012': { name: '陇南', level: '地级市', icon: '🏔️' }
                }
            },
            '青海省': {
                emoji: '🏔️',
                cities: {
                    'QH001': { name: '西宁', level: '省会', icon: '🏔️' },
                    'QH002': { name: '海东', level: '地级市', icon: '🌊' }
                }
            },
            '宁夏回族自治区': {
                emoji: '🌙',
                cities: {
                    'NX001': { name: '银川', level: '首府', icon: '🌙' },
                    'NX002': { name: '石嘴山', level: '地级市', icon: '⛰️' },
                    'NX003': { name: '吴忠', level: '地级市', icon: '🌾' },
                    'NX004': { name: '固原', level: '地级市', icon: '🏔️' },
                    'NX005': { name: '中卫', level: '地级市', icon: '🏜️' }
                }
            },
            '新疆维吾尔自治区': {
                emoji: '🏜️',
                cities: {
                    'XJ001': { name: '乌鲁木齐', level: '首府', icon: '🏔️' },
                    'XJ002': { name: '克拉玛依', level: '地级市', icon: '🛢️' },
                    'XJ003': { name: '吐鲁番', level: '地级市', icon: '🍇' },
                    'XJ004': { name: '哈密', level: '地级市', icon: '🍈' },
                    'XJ005': { name: '昌吉', level: '州府', icon: '🌾' },
                    'XJ006': { name: '博尔塔拉', level: '州府', icon: '🏔️' },
                    'XJ007': { name: '巴音郭楞', level: '州府', icon: '🏜️' },
                    'XJ008': { name: '阿克苏', level: '地区', icon: '🌰' },
                    'XJ009': { name: '克孜勒苏', level: '州府', icon: '⛰️' },
                    'XJ010': { name: '喀什', level: '地区', icon: '🕌' },
                    'XJ011': { name: '和田', level: '地区', icon: '💎' },
                    'XJ012': { name: '伊犁', level: '州府', icon: '🌸' },
                    'XJ013': { name: '塔城', level: '地区', icon: '🏔️' },
                    'XJ014': { name: '阿勒泰', level: '地区', icon: '❄️' }
                }
            },
            '西藏自治区': {
                emoji: '🏔️',
                cities: {
                    'XZ001': { name: '拉萨', level: '首府', icon: '🏔️' },
                    'XZ002': { name: '日喀则', level: '地级市', icon: '⛰️' },
                    'XZ003': { name: '昌都', level: '地级市', icon: '🏔️' },
                    'XZ004': { name: '林芝', level: '地级市', icon: '🌸' },
                    'XZ005': { name: '山南', level: '地级市', icon: '⛰️' },
                    'XZ006': { name: '那曲', level: '地级市', icon: '🏔️' },
                    'XZ007': { name: '阿里', level: '地区', icon: '🏔️' }
                }
            },
            '云南省': {
                emoji: '🌸',
                cities: {
                    'YN001': { name: '昆明', level: '省会', icon: '🌸' },
                    'YN002': { name: '曲靖', level: '地级市', icon: '🌾' },
                    'YN003': { name: '玉溪', level: '地级市', icon: '🏺' },
                    'YN004': { name: '保山', level: '地级市', icon: '⛰️' },
                    'YN005': { name: '昭通', level: '地级市', icon: '🏔️' },
                    'YN006': { name: '丽江', level: '地级市', icon: '🏔️' },
                    'YN007': { name: '普洱', level: '地级市', icon: '🍃' },
                    'YN008': { name: '临沧', level: '地级市', icon: '🌊' },
                    'YN009': { name: '楚雄', level: '州府', icon: '🌸' },
                    'YN010': { name: '红河', level: '州府', icon: '🌊' },
                    'YN011': { name: '文山', level: '州府', icon: '📚' },
                    'YN012': { name: '西双版纳', level: '州府', icon: '🐘' },
                    'YN013': { name: '大理', level: '州府', icon: '🏔️' },
                    'YN014': { name: '德宏', level: '州府', icon: '🌺' },
                    'YN015': { name: '怒江', level: '州府', icon: '🌊' },
                    'YN016': { name: '迪庆', level: '州府', icon: '🏔️' }
                }
            },
            '贵州省': {
                emoji: '⛰️',
                cities: {
                    'GZ001': { name: '贵阳', level: '省会', icon: '🌸' },
                    'GZ002': { name: '六盘水', level: '地级市', icon: '💧' },
                    'GZ003': { name: '遵义', level: '地级市', icon: '🏛️' },
                    'GZ004': { name: '安顺', level: '地级市', icon: '⛰️' },
                    'GZ005': { name: '毕节', level: '地级市', icon: '🌸' },
                    'GZ006': { name: '铜仁', level: '地级市', icon: '🔔' },
                    'GZ007': { name: '黔西南', level: '州府', icon: '🌺' },
                    'GZ008': { name: '黔东南', level: '州府', icon: '🎵' },
                    'GZ009': { name: '黔南', level: '州府', icon: '🌿' }
                }
            },
            '广西壮族自治区': {
                emoji: '🌴',
                cities: {
                    'GX001': { name: '南宁', level: '首府', icon: '🌸' },
                    'GX002': { name: '柳州', level: '地级市', icon: '🌊' },
                    'GX003': { name: '桂林', level: '地级市', icon: '🏔️' },
                    'GX004': { name: '梧州', level: '地级市', icon: '🌸' },
                    'GX005': { name: '北海', level: '地级市', icon: '🌊' },
                    'GX006': { name: '防城港', level: '地级市', icon: '🚢' },
                    'GX007': { name: '钦州', level: '地级市', icon: '🌊' },
                    'GX008': { name: '贵港', level: '地级市', icon: '🚢' },
                    'GX009': { name: '玉林', level: '地级市', icon: '🌸' },
                    'GX010': { name: '百色', level: '地级市', icon: '🌈' },
                    'GX011': { name: '贺州', level: '地级市', icon: '🎉' },
                    'GX012': { name: '河池', level: '地级市', icon: '🌊' },
                    'GX013': { name: '来宾', level: '地级市', icon: '👋' },
                    'GX014': { name: '崇左', level: '地级市', icon: '⛰️' }
                }
            },
            '海南省': {
                emoji: '🏝️',
                cities: {
                    'HAN001': { name: '海口', level: '省会', icon: '🌊' },
                    'HAN002': { name: '三亚', level: '地级市', icon: '🏖️' },
                    'HAN003': { name: '三沙', level: '地级市', icon: '🏝️' },
                    'HAN004': { name: '儋州', level: '地级市', icon: '🌴' }
                }
            },
            '香港特别行政区': {
                emoji: '🏙️',
                cities: {
                    'HK001': { name: '香港', level: '特别行政区', icon: '🏙️' }
                }
            },
            '澳门特别行政区': {
                emoji: '🎰',
                cities: {
                    'MO001': { name: '澳门', level: '特别行政区', icon: '🎰' }
                }
            },
            '台湾省': {
                emoji: '🏝️',
                cities: {
                    'TW001': { name: '台北', level: '省会', icon: '🏙️' },
                    'TW002': { name: '高雄', level: '直辖市', icon: '🚢' },
                    'TW003': { name: '台中', level: '直辖市', icon: '🌸' },
                    'TW004': { name: '台南', level: '直辖市', icon: '🏛️' },
                    'TW005': { name: '新北', level: '直辖市', icon: '🏘️' },
                    'TW006': { name: '桃园', level: '直辖市', icon: '🍑' }
                }
            }
        };

        // 存储城市数据
        Object.entries(provincesData).forEach(([province, data]) => {
            Object.entries(data.cities).forEach(([code, cityData]) => {
                this.cities.set(code, { ...cityData, province });
            });
        });

        // 渲染各省份的城市列表
        provincesList.innerHTML = Object.entries(provincesData).map(([province, data]) => {
            const visitedInProvince = Object.keys(data.cities).filter(code => this.visitedCities.has(code)).length;
            const totalInProvince = Object.keys(data.cities).length;
            
            const citiesHtml = Object.entries(data.cities).map(([code, city]) => {
                const isVisited = this.visitedCities.has(code);
                
                let statusClass = 'unvisited';
                if (isVisited) {
                    statusClass = 'visited';
                }
                
                return `
                    <div class="city-item-row ${statusClass}" data-city="${code}">
                        <div class="city-icon-large">${city.icon}</div>
                        <div class="city-info">
                            <div class="city-names">
                                <div class="city-name-zh">${city.name}</div>
                                <div class="city-level">${city.level}</div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            
            return `
                <div class="province-section collapsed" data-province="${province}">
                    <div class="province-header" onclick="chinaMap.toggleProvince('${province}')">
                        <div class="province-title">
                            <span class="province-emoji">${data.emoji}</span>
                            <span>${province}</span>
                        </div>
                        <div class="province-info">
                            <div class="province-stats">${visitedInProvince}/${totalInProvince}</div>
                            <div class="province-toggle">▼</div>
                        </div>
                    </div>
                    <div class="cities-list">
                        <div class="cities-grid">
                            ${citiesHtml}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    bindEvents() {
        // 城市行点击事件
        document.addEventListener('click', (e) => {
            const cityRow = e.target.closest('.city-item-row');
            if (cityRow) {
                const cityCode = cityRow.getAttribute('data-city');
                this.showCityModal(cityCode);
            }
        });

        // 快速操作按钮
        document.getElementById('addCityBtn').addEventListener('click', () => {
            this.showAddCityDialog();
        });

        document.getElementById('clearAllBtn').addEventListener('click', () => {
            this.clearAllData();
        });

        document.getElementById('exportMapBtn').addEventListener('click', () => {
            this.exportData();
        });

        // 模态框事件
        document.getElementById('closeModal').addEventListener('click', () => {
            this.hideCityModal();
        });

        document.getElementById('markVisitedBtn').addEventListener('click', () => {
            this.markCityAsVisited();
        });

        document.getElementById('removeCityBtn').addEventListener('click', () => {
            this.removeCity();
        });

        // 点击模态框外部关闭
        document.getElementById('cityModal').addEventListener('click', (e) => {
            if (e.target.id === 'cityModal') {
                this.hideCityModal();
            }
        });
    }

    showCityModal(cityCode) {
        const city = this.cities.get(cityCode);
        if (!city) return;

        const modal = document.getElementById('cityModal');
        const visitInfo = document.getElementById('visitInfo');
        const removeBtn = document.getElementById('removeCityBtn');
        
        // 填充城市信息
        document.getElementById('cityName').textContent = city.name;
        document.getElementById('cityIcon').textContent = city.icon;
        document.getElementById('cityProvince').textContent = city.province;
        document.getElementById('cityLevel').textContent = city.level;
        
        // 设置状态和按钮
        const isVisited = this.visitedCities.has(cityCode);
        
        if (isVisited) {
            document.getElementById('cityStatus').textContent = '已访问';
            visitInfo.style.display = 'block';
            removeBtn.style.display = 'block';
            
            const visitData = this.visitedCities.get(cityCode);
            document.getElementById('visitDate').value = visitData.date || '';
            document.getElementById('visitNotes').value = visitData.notes || '';
        } else {
            document.getElementById('cityStatus').textContent = '未访问';
            visitInfo.style.display = 'none';
            removeBtn.style.display = 'none';
        }
        
        modal.dataset.cityCode = cityCode;
        modal.classList.remove('hidden');
    }

    hideCityModal() {
        document.getElementById('cityModal').classList.add('hidden');
    }

    markCityAsVisited() {
        const modal = document.getElementById('cityModal');
        const cityCode = modal.dataset.cityCode;
        const visitDate = document.getElementById('visitDate').value;
        const visitNotes = document.getElementById('visitNotes').value;
        
        // 添加到已访问
        this.visitedCities.set(cityCode, {
            date: visitDate || new Date().toISOString().slice(0, 7), // YYYY-MM format
            notes: visitNotes,
            addedAt: new Date().toISOString()
        });
        
        this.syncAllPanels();
        this.hideCityModal();
        this.showToast(`${this.cities.get(cityCode).name} 已标记为访问过！ 🏙️`);
    }

    removeCity() {
        const modal = document.getElementById('cityModal');
        const cityCode = modal.dataset.cityCode;
        const cityName = this.cities.get(cityCode).name;
        
        if (confirm(`确定要从旅行记录中移除 ${cityName} 吗？`)) {
            this.visitedCities.delete(cityCode);
            
            this.syncAllPanels();
            this.hideCityModal();
            this.showToast(`${cityName} 已从旅行记录中移除`);
        }
    }

    updateCityVisual(cityCode) {
        const cityRow = document.querySelector(`[data-city="${cityCode}"]`);
        if (!cityRow) return;
        
        // 移除所有状态类
        cityRow.classList.remove('visited', 'unvisited');
        
        // 更新状态类
        if (this.visitedCities.has(cityCode)) {
            cityRow.classList.add('visited');
        } else {
            cityRow.classList.add('unvisited');
        }
        
        // 更新省份统计
        this.updateProvinceStats();
    }

    updateProvinceStats() {
        document.querySelectorAll('.province-section').forEach(section => {
            const provinceName = section.getAttribute('data-province');
            const cityRows = section.querySelectorAll('.city-item-row');
            const visitedCount = section.querySelectorAll('.city-item-row.visited').length;
            const totalCount = cityRows.length;
            
            const statsElement = section.querySelector('.province-stats');
            if (statsElement) {
                statsElement.textContent = `${visitedCount}/${totalCount}`;
            }
        });
    }

    // 手风琴式省份切换
    toggleProvince(provinceName) {
        const allSections = document.querySelectorAll('.province-section');
        const targetSection = document.querySelector(`[data-province="${provinceName}"]`);
        
        if (!targetSection) return;
        
        // 防止快速连续点击
        if (targetSection.classList.contains('transitioning')) {
            return;
        }
        
        // 检查当前是否有展开的省份
        const currentlyExpandedSection = document.querySelector('.province-section:not(.collapsed)');
        const isTargetCurrentlyExpanded = !targetSection.classList.contains('collapsed');
        
        // 添加过渡状态标记
        targetSection.classList.add('transitioning');
        
        // 先收起所有省份
        allSections.forEach(section => {
            section.classList.add('collapsed');
        });
        
        // 决定是否展开目标省份
        let shouldExpand = false;
        
        if (!currentlyExpandedSection) {
            // 如果没有展开的省份，展开目标省份
            shouldExpand = true;
        } else if (currentlyExpandedSection !== targetSection) {
            // 如果点击的是不同的省份，展开新省份
            shouldExpand = true;
        } else {
            // 如果点击的是当前展开的省份，保持收起状态（关闭操作）
            shouldExpand = false;
        }
        
        if (shouldExpand) {
            const provincesContainer = document.querySelector('.provinces-list');
            
            // 在展开前计算所有前面省份的高度（收起状态）
            const allSections = Array.from(provincesContainer.querySelectorAll('.province-section'));
            const targetIndex = allSections.indexOf(targetSection);
            
            let scrollTop = 0;
            for (let i = 0; i < targetIndex; i++) {
                // 获取收起状态下的省份高度（只有header的高度）
                const header = allSections[i].querySelector('.province-header');
                scrollTop += header ? header.offsetHeight : 60; // 默认60px如果获取不到
                scrollTop += 4; // 加上margin
            }
            
            // 立即展开目标省份
            targetSection.classList.remove('collapsed');
            
            // 立即滚动到计算的位置
            provincesContainer.scrollTo({
                top: scrollTop,
                behavior: 'smooth'
            });
            
            // 移除过渡状态标记
            setTimeout(() => {
                targetSection.classList.remove('transitioning');
            }, 400);
        } else {
            // 如果是关闭操作，平滑滚动到顶部
            setTimeout(() => {
                document.querySelector('.provinces-list').scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                // 移除过渡状态标记
                setTimeout(() => {
                    targetSection.classList.remove('transitioning');
                }, 300);
            }, 150);
        }
    }



    // 全面同步左右面板数据的方法
    syncAllPanels() {
        try {
            // 同步左侧面板的所有城市状态
            document.querySelectorAll('.city-item-row').forEach(row => {
                const cityCode = row.getAttribute('data-city');
                if (cityCode && this.cities.has(cityCode)) {
                    this.updateCityVisual(cityCode);
                }
            });
            
            // 同步右侧面板
            this.updateStats();
            this.renderCityLists();
            
            // 保存数据
            this.saveData();
            
            // 验证数据一致性
            this.validateDataConsistency();
        } catch (error) {
            console.error('Error syncing panels:', error);
            this.showToast('数据同步出错，请刷新页面。');
        }
    }

    // 验证数据一致性的方法
    validateDataConsistency() {
        // 检查DOM状态是否与数据一致
        document.querySelectorAll('.city-item-row').forEach(row => {
            const cityCode = row.getAttribute('data-city');
            if (cityCode) {
                const isVisited = this.visitedCities.has(cityCode);
                const hasVisitedClass = row.classList.contains('visited');
                
                if (isVisited !== hasVisitedClass) {
                    console.warn(`DOM inconsistency for ${cityCode}, fixing...`);
                    this.updateCityVisual(cityCode);
                }
            }
        });
    }

    updateStats() {
        const visitedCount = this.visitedCities.size;
        const totalCities = this.cities.size;
        const percentage = Math.round((visitedCount / totalCities) * 100);
        
        // 安全地更新元素，检查元素是否存在
        const visitedCountEl = document.getElementById('visitedCount');
        const visitedPercentageEl = document.getElementById('visitedPercentage');
        const totalCitiesEl = document.getElementById('totalCities');
        const provincesVisitedEl = document.getElementById('provincesVisited');
        
        if (visitedCountEl) {
            visitedCountEl.textContent = visitedCount;
        } else {
            console.warn('visitedCount element not found');
        }
        
        if (visitedPercentageEl) {
            visitedPercentageEl.textContent = `${percentage}%`;
        } else {
            console.warn('visitedPercentage element not found');
        }
        
        if (totalCitiesEl) {
            totalCitiesEl.textContent = totalCities;
        } else {
            console.warn('totalCities element not found');
        }
        
        // 计算访问的省份数量
        const visitedProvinces = new Set();
        this.visitedCities.forEach((_, cityCode) => {
            const city = this.cities.get(cityCode);
            if (city) {
                visitedProvinces.add(city.province);
            }
        });
        
        if (provincesVisitedEl) {
            provincesVisitedEl.textContent = visitedProvinces.size;
        } else {
            console.warn('provincesVisited element not found');
        }
    }

    renderCityLists() {
        this.renderVisitedCities();
    }

    formatMonthDate(dateString) {
        // 将YYYY-MM格式转换为更友好的显示格式
        if (!dateString) return '无日期';
        
        try {
            const [year, month] = dateString.split('-');
            const date = new Date(year, month - 1); // month is 0-indexed
            return `${year}年${month}月`;
        } catch (error) {
            return dateString; // 如果解析失败，返回原始字符串
        }
    }

    renderVisitedCities() {
        const container = document.getElementById('visitedCitiesList');
        
        if (this.visitedCities.size === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>还没有访问过任何城市</p>
                    <small>点击城市来标记为已访问</small>
                </div>
            `;
            return;
        }
        
        const sortedCities = [...this.visitedCities.entries()].sort((a, b) => {
            return new Date(b[1].date || b[1].addedAt) - new Date(a[1].date || a[1].addedAt);
        });
        
        container.innerHTML = sortedCities.map(([code, data]) => {
            const city = this.cities.get(code);
            const date = data.date ? this.formatMonthDate(data.date) : '无日期';
            
            return `
                <div class="city-item">
                    <div class="city-name">
                        <span class="city-icon-small">${city.icon}</span>
                        <span>${city.name}</span>
                    </div>
                    <div class="city-date">${date}</div>
                </div>
            `;
        }).join('');
    }

    showAddCityDialog() {
        const cityList = [...this.cities.entries()]
            .filter(([code]) => !this.visitedCities.has(code))
            .map(([code, city]) => `${city.name} (${city.province})`)
            .join('\n');
        
        const input = prompt(`输入城市名称：\n\n可选城市：\n${cityList.slice(0, 500)}...`);
        
        if (input) {
            const cityCode = this.findCityCode(input.trim());
            if (cityCode) {
                this.showCityModal(cityCode);
            } else {
                alert('未找到该城市，请重试。');
            }
        }
    }

    findCityCode(input) {
        const upperInput = input.toUpperCase();
        
        // 直接匹配城市代码
        if (this.cities.has(upperInput)) {
            return upperInput;
        }
        
        // 匹配城市名称
        for (const [code, city] of this.cities) {
            if (city.name.includes(input)) {
                return code;
            }
        }
        
        return null;
    }

    clearAllData() {
        if (confirm('确定要清空所有旅行数据吗？此操作无法撤销。')) {
            this.visitedCities.clear();
            
            // 完全重新渲染左侧面板以确保同步
            this.createProvincesList();
            
            this.syncAllPanels();
            this.showToast('所有旅行数据已清空');
        }
    }

    exportData() {
        const data = {
            visitedCities: Object.fromEntries(this.visitedCities),
            exportedAt: new Date().toISOString(),
            stats: {
                visitedCount: this.visitedCities.size,
                totalCities: this.cities.size
            }
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        const filename = `china-travel-map-${timestamp}.json`;
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        
        this.showToast(`旅行数据已导出为 ${filename}`);
    }

    showToast(message) {
        const existingToast = document.getElementById('chinaToast');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toast = document.createElement('div');
        toast.id = 'chinaToast';
        toast.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: rgba(16, 185, 129, 0.9);
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            max-width: 300px;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => toast.style.opacity = '1', 100);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
}

// 全局变量用于手风琴功能
let chinaMap;

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    chinaMap = new ChinaMap();
});