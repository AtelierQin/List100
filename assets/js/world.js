class TravelMap {
    constructor() {
        this.visitedCountries = new Map();
        this.countries = new Map();
        this.init();
    }

    async init() {
        await this.loadData();
        this.createCountriesList();
        this.bindEvents();
        // 检查emoji支持并应用备用方案
        this.checkEmojiSupport();
        // 使用新的同步方法确保初始化时数据一致
        // 添加小延迟确保DOM完全渲染
        setTimeout(() => {
            this.syncAllPanels();
        }, 100);
    }

    async loadData() {
        try {
            const visitedData = localStorage.getItem('travel-visited-countries');
            
            if (visitedData) {
                const visited = JSON.parse(visitedData);
                this.visitedCountries = new Map(visited);
            }
        } catch (error) {
            console.error('Error loading travel data:', error);
        }
    }

    saveData() {
        try {
            localStorage.setItem('travel-visited-countries', JSON.stringify([...this.visitedCountries]));
        } catch (error) {
            console.error('Error saving travel data:', error);
        }
    }

    createCountriesList() {
        const continentsList = document.getElementById('continentsList');

        // 定义国家数据（包含中英文名称）
        const countriesData = {
            'North America': {
                'US': { name: 'United States', nameCn: '美国', flag: '🇺🇸', capital: 'Washington D.C.' },
                'CA': { name: 'Canada', nameCn: '加拿大', flag: '🇨🇦', capital: 'Ottawa' },
                'MX': { name: 'Mexico', nameCn: '墨西哥', flag: '🇲🇽', capital: 'Mexico City' },
                'GT': { name: 'Guatemala', nameCn: '危地马拉', flag: '🇬🇹', capital: 'Guatemala City' },
                'CR': { name: 'Costa Rica', nameCn: '哥斯达黎加', flag: '🇨🇷', capital: 'San José' },
                'PA': { name: 'Panama', nameCn: '巴拿马', flag: '🇵🇦', capital: 'Panama City' },
                'CU': { name: 'Cuba', nameCn: '古巴', flag: '🇨🇺', capital: 'Havana' },
                'JM': { name: 'Jamaica', nameCn: '牙买加', flag: '🇯🇲', capital: 'Kingston' },
                'BZ': { name: 'Belize', nameCn: '伯利兹', flag: '🇧🇿', capital: 'Belmopan' },
                'SV': { name: 'El Salvador', nameCn: '萨尔瓦多', flag: '🇸🇻', capital: 'San Salvador' },
                'HN': { name: 'Honduras', nameCn: '洪都拉斯', flag: '🇭🇳', capital: 'Tegucigalpa' },
                'NI': { name: 'Nicaragua', nameCn: '尼加拉瓜', flag: '🇳🇮', capital: 'Managua' },
                'HT': { name: 'Haiti', nameCn: '海地', flag: '🇭🇹', capital: 'Port-au-Prince' },
                'DO': { name: 'Dominican Republic', nameCn: '多米尼加', flag: '🇩🇴', capital: 'Santo Domingo' },
                'BS': { name: 'Bahamas', nameCn: '巴哈马', flag: '🇧🇸', capital: 'Nassau' },
                'BB': { name: 'Barbados', nameCn: '巴巴多斯', flag: '🇧🇧', capital: 'Bridgetown' },
                'TT': { name: 'Trinidad and Tobago', nameCn: '特立尼达和多巴哥', flag: '🇹🇹', capital: 'Port of Spain' },
                'GD': { name: 'Grenada', nameCn: '格林纳达', flag: '🇬🇩', capital: 'St. George\'s' },
                'LC': { name: 'Saint Lucia', nameCn: '圣卢西亚', flag: '🇱🇨', capital: 'Castries' },
                'VC': { name: 'Saint Vincent and the Grenadines', nameCn: '圣文森特和格林纳丁斯', flag: '🇻🇨', capital: 'Kingstown' },
                'AG': { name: 'Antigua and Barbuda', nameCn: '安提瓜和巴布达', flag: '🇦🇬', capital: 'St. John\'s' },
                'KN': { name: 'Saint Kitts and Nevis', nameCn: '圣基茨和尼维斯', flag: '🇰🇳', capital: 'Basseterre' },
                'DM': { name: 'Dominica', nameCn: '多米尼克', flag: '🇩🇲', capital: 'Roseau' }
            },
            'South America': {
                'BR': { name: 'Brazil', nameCn: '巴西', flag: '🇧🇷', capital: 'Brasília' },
                'AR': { name: 'Argentina', nameCn: '阿根廷', flag: '🇦🇷', capital: 'Buenos Aires' },
                'CL': { name: 'Chile', nameCn: '智利', flag: '🇨🇱', capital: 'Santiago' },
                'PE': { name: 'Peru', nameCn: '秘鲁', flag: '🇵🇪', capital: 'Lima' },
                'CO': { name: 'Colombia', nameCn: '哥伦比亚', flag: '🇨🇴', capital: 'Bogotá' },
                'VE': { name: 'Venezuela', nameCn: '委内瑞拉', flag: '🇻🇪', capital: 'Caracas' },
                'EC': { name: 'Ecuador', nameCn: '厄瓜多尔', flag: '🇪🇨', capital: 'Quito' },
                'UY': { name: 'Uruguay', nameCn: '乌拉圭', flag: '🇺🇾', capital: 'Montevideo' },
                'PY': { name: 'Paraguay', nameCn: '巴拉圭', flag: '🇵🇾', capital: 'Asunción' },
                'BO': { name: 'Bolivia', nameCn: '玻利维亚', flag: '🇧🇴', capital: 'Sucre' },
                'GY': { name: 'Guyana', nameCn: '圭亚那', flag: '🇬🇾', capital: 'Georgetown' },
                'SR': { name: 'Suriname', nameCn: '苏里南', flag: '🇸🇷', capital: 'Paramaribo' }
            },
            'Europe': {
                'GB': { name: 'United Kingdom', nameCn: '英国', flag: '🇬🇧', capital: 'London' },
                'FR': { name: 'France', nameCn: '法国', flag: '🇫🇷', capital: 'Paris' },
                'DE': { name: 'Germany', nameCn: '德国', flag: '🇩🇪', capital: 'Berlin' },
                'IT': { name: 'Italy', nameCn: '意大利', flag: '🇮🇹', capital: 'Rome' },
                'ES': { name: 'Spain', nameCn: '西班牙', flag: '🇪🇸', capital: 'Madrid' },
                'PT': { name: 'Portugal', nameCn: '葡萄牙', flag: '🇵🇹', capital: 'Lisbon' },
                'NL': { name: 'Netherlands', nameCn: '荷兰', flag: '🇳🇱', capital: 'Amsterdam' },
                'BE': { name: 'Belgium', nameCn: '比利时', flag: '🇧🇪', capital: 'Brussels' },
                'CH': { name: 'Switzerland', nameCn: '瑞士', flag: '🇨🇭', capital: 'Bern' },
                'AT': { name: 'Austria', nameCn: '奥地利', flag: '🇦🇹', capital: 'Vienna' },
                'SE': { name: 'Sweden', nameCn: '瑞典', flag: '🇸🇪', capital: 'Stockholm' },
                'NO': { name: 'Norway', nameCn: '挪威', flag: '🇳🇴', capital: 'Oslo' },
                'DK': { name: 'Denmark', nameCn: '丹麦', flag: '🇩🇰', capital: 'Copenhagen' },
                'FI': { name: 'Finland', nameCn: '芬兰', flag: '🇫🇮', capital: 'Helsinki' },
                'PL': { name: 'Poland', nameCn: '波兰', flag: '🇵🇱', capital: 'Warsaw' },
                'CZ': { name: 'Czech Republic', nameCn: '捷克', flag: '🇨🇿', capital: 'Prague' },
                'HU': { name: 'Hungary', nameCn: '匈牙利', flag: '🇭🇺', capital: 'Budapest' },
                'GR': { name: 'Greece', nameCn: '希腊', flag: '🇬🇷', capital: 'Athens' },
                'TR': { name: 'Turkey', nameCn: '土耳其', flag: '🇹🇷', capital: 'Ankara' },
                'RU': { name: 'Russia', nameCn: '俄罗斯', flag: '🇷🇺', capital: 'Moscow' },
                'IE': { name: 'Ireland', nameCn: '爱尔兰', flag: '🇮🇪', capital: 'Dublin' },
                'IS': { name: 'Iceland', nameCn: '冰岛', flag: '🇮🇸', capital: 'Reykjavik' },
                'LU': { name: 'Luxembourg', nameCn: '卢森堡', flag: '🇱🇺', capital: 'Luxembourg' },
                'MT': { name: 'Malta', nameCn: '马耳他', flag: '🇲🇹', capital: 'Valletta' },
                'CY': { name: 'Cyprus', nameCn: '塞浦路斯', flag: '🇨🇾', capital: 'Nicosia' },
                'SK': { name: 'Slovakia', nameCn: '斯洛伐克', flag: '🇸🇰', capital: 'Bratislava' },
                'SI': { name: 'Slovenia', nameCn: '斯洛文尼亚', flag: '🇸🇮', capital: 'Ljubljana' },
                'HR': { name: 'Croatia', nameCn: '克罗地亚', flag: '🇭🇷', capital: 'Zagreb' },
                'BA': { name: 'Bosnia and Herzegovina', nameCn: '波黑', flag: '🇧🇦', capital: 'Sarajevo' },
                'RS': { name: 'Serbia', nameCn: '塞尔维亚', flag: '🇷🇸', capital: 'Belgrade' },
                'ME': { name: 'Montenegro', nameCn: '黑山', flag: '🇲🇪', capital: 'Podgorica' },
                'MK': { name: 'North Macedonia', nameCn: '北马其顿', flag: '🇲🇰', capital: 'Skopje' },
                'AL': { name: 'Albania', nameCn: '阿尔巴尼亚', flag: '🇦🇱', capital: 'Tirana' },
                'BG': { name: 'Bulgaria', nameCn: '保加利亚', flag: '🇧🇬', capital: 'Sofia' },
                'RO': { name: 'Romania', nameCn: '罗马尼亚', flag: '🇷🇴', capital: 'Bucharest' },
                'MD': { name: 'Moldova', nameCn: '摩尔多瓦', flag: '🇲🇩', capital: 'Chisinau' },
                'UA': { name: 'Ukraine', nameCn: '乌克兰', flag: '🇺🇦', capital: 'Kyiv' },
                'BY': { name: 'Belarus', nameCn: '白俄罗斯', flag: '🇧🇾', capital: 'Minsk' },
                'LT': { name: 'Lithuania', nameCn: '立陶宛', flag: '🇱🇹', capital: 'Vilnius' },
                'LV': { name: 'Latvia', nameCn: '拉脱维亚', flag: '🇱🇻', capital: 'Riga' },
                'EE': { name: 'Estonia', nameCn: '爱沙尼亚', flag: '🇪🇪', capital: 'Tallinn' },
                'GE': { name: 'Georgia', nameCn: '格鲁吉亚', flag: '🇬🇪', capital: 'Tbilisi' },
                'AM': { name: 'Armenia', nameCn: '亚美尼亚', flag: '🇦🇲', capital: 'Yerevan' },
                'AZ': { name: 'Azerbaijan', nameCn: '阿塞拜疆', flag: '🇦🇿', capital: 'Baku' },
                'AD': { name: 'Andorra', nameCn: '安道尔', flag: '🇦🇩', capital: 'Andorra la Vella' },
                'MC': { name: 'Monaco', nameCn: '摩纳哥', flag: '🇲🇨', capital: 'Monaco' },
                'SM': { name: 'San Marino', nameCn: '圣马力诺', flag: '🇸🇲', capital: 'San Marino' },
                'VA': { name: 'Vatican City', nameCn: '梵蒂冈', flag: '🇻🇦', capital: 'Vatican City' }
            },
            'Africa': {
                'EG': { name: 'Egypt', nameCn: '埃及', flag: '🇪🇬', capital: 'Cairo' },
                'ZA': { name: 'South Africa', nameCn: '南非', flag: '🇿🇦', capital: 'Cape Town' },
                'NG': { name: 'Nigeria', nameCn: '尼日利亚', flag: '🇳🇬', capital: 'Abuja' },
                'KE': { name: 'Kenya', nameCn: '肯尼亚', flag: '🇰🇪', capital: 'Nairobi' },
                'MA': { name: 'Morocco', nameCn: '摩洛哥', flag: '🇲🇦', capital: 'Rabat' },
                'TN': { name: 'Tunisia', nameCn: '突尼斯', flag: '🇹🇳', capital: 'Tunis' },
                'GH': { name: 'Ghana', nameCn: '加纳', flag: '🇬🇭', capital: 'Accra' },
                'ET': { name: 'Ethiopia', nameCn: '埃塞俄比亚', flag: '🇪🇹', capital: 'Addis Ababa' },
                'TZ': { name: 'Tanzania', nameCn: '坦桑尼亚', flag: '🇹🇿', capital: 'Dodoma' },
                'UG': { name: 'Uganda', nameCn: '乌干达', flag: '🇺🇬', capital: 'Kampala' },
                'RW': { name: 'Rwanda', nameCn: '卢旺达', flag: '🇷🇼', capital: 'Kigali' },
                'SN': { name: 'Senegal', nameCn: '塞内加尔', flag: '🇸🇳', capital: 'Dakar' },
                'CI': { name: 'Ivory Coast', nameCn: '科特迪瓦', flag: '🇨🇮', capital: 'Yamoussoukro' },
                'BW': { name: 'Botswana', nameCn: '博茨瓦纳', flag: '🇧🇼', capital: 'Gaborone' },
                'NA': { name: 'Namibia', nameCn: '纳米比亚', flag: '🇳🇦', capital: 'Windhoek' },
                'ZM': { name: 'Zambia', nameCn: '赞比亚', flag: '🇿🇲', capital: 'Lusaka' },
                'ZW': { name: 'Zimbabwe', nameCn: '津巴布韦', flag: '🇿🇼', capital: 'Harare' },
                'DZ': { name: 'Algeria', nameCn: '阿尔及利亚', flag: '🇩🇿', capital: 'Algiers' },
                'LY': { name: 'Libya', nameCn: '利比亚', flag: '🇱🇾', capital: 'Tripoli' },
                'SD': { name: 'Sudan', nameCn: '苏丹', flag: '🇸🇩', capital: 'Khartoum' },
                'SS': { name: 'South Sudan', nameCn: '南苏丹', flag: '🇸🇸', capital: 'Juba' },
                'CM': { name: 'Cameroon', nameCn: '喀麦隆', flag: '🇨🇲', capital: 'Yaoundé' },
                'CF': { name: 'Central African Republic', nameCn: '中非', flag: '🇨🇫', capital: 'Bangui' },
                'TD': { name: 'Chad', nameCn: '乍得', flag: '🇹🇩', capital: 'N\'Djamena' },
                'NE': { name: 'Niger', nameCn: '尼日尔', flag: '🇳🇪', capital: 'Niamey' },
                'ML': { name: 'Mali', nameCn: '马里', flag: '🇲🇱', capital: 'Bamako' },
                'BF': { name: 'Burkina Faso', nameCn: '布基纳法索', flag: '🇧🇫', capital: 'Ouagadougou' },
                'MR': { name: 'Mauritania', nameCn: '毛里塔尼亚', flag: '🇲🇷', capital: 'Nouakchott' },
                'GM': { name: 'Gambia', nameCn: '冈比亚', flag: '🇬🇲', capital: 'Banjul' },
                'GW': { name: 'Guinea-Bissau', nameCn: '几内亚比绍', flag: '🇬🇼', capital: 'Bissau' },
                'GN': { name: 'Guinea', nameCn: '几内亚', flag: '🇬🇳', capital: 'Conakry' },
                'SL': { name: 'Sierra Leone', nameCn: '塞拉利昂', flag: '🇸🇱', capital: 'Freetown' },
                'LR': { name: 'Liberia', nameCn: '利比里亚', flag: '🇱🇷', capital: 'Monrovia' },
                'TG': { name: 'Togo', nameCn: '多哥', flag: '🇹🇬', capital: 'Lomé' },
                'BJ': { name: 'Benin', nameCn: '贝宁', flag: '🇧🇯', capital: 'Porto-Novo' },
                'AO': { name: 'Angola', nameCn: '安哥拉', flag: '🇦🇴', capital: 'Luanda' },
                'MZ': { name: 'Mozambique', nameCn: '莫桑比克', flag: '🇲🇿', capital: 'Maputo' },
                'MW': { name: 'Malawi', nameCn: '马拉维', flag: '🇲🇼', capital: 'Lilongwe' },
                'SZ': { name: 'Eswatini', nameCn: '斯威士兰', flag: '🇸🇿', capital: 'Mbabane' },
                'LS': { name: 'Lesotho', nameCn: '莱索托', flag: '🇱🇸', capital: 'Maseru' },
                'MG': { name: 'Madagascar', nameCn: '马达加斯加', flag: '🇲🇬', capital: 'Antananarivo' },
                'MU': { name: 'Mauritius', nameCn: '毛里求斯', flag: '🇲🇺', capital: 'Port Louis' },
                'SC': { name: 'Seychelles', nameCn: '塞舌尔', flag: '🇸🇨', capital: 'Victoria' },
                'KM': { name: 'Comoros', nameCn: '科摩罗', flag: '🇰🇲', capital: 'Moroni' },
                'CV': { name: 'Cape Verde', nameCn: '佛得角', flag: '🇨🇻', capital: 'Praia' },
                'ST': { name: 'São Tomé and Príncipe', nameCn: '圣多美和普林西比', flag: '🇸🇹', capital: 'São Tomé' },
                'GQ': { name: 'Equatorial Guinea', nameCn: '赤道几内亚', flag: '🇬🇶', capital: 'Malabo' },
                'GA': { name: 'Gabon', nameCn: '加蓬', flag: '🇬🇦', capital: 'Libreville' },
                'CG': { name: 'Republic of the Congo', nameCn: '刚果共和国', flag: '🇨🇬', capital: 'Brazzaville' },
                'CD': { name: 'Democratic Republic of the Congo', nameCn: '刚果民主共和国', flag: '🇨🇩', capital: 'Kinshasa' },
                'BI': { name: 'Burundi', nameCn: '布隆迪', flag: '🇧🇮', capital: 'Gitega' },
                'DJ': { name: 'Djibouti', nameCn: '吉布提', flag: '🇩🇯', capital: 'Djibouti' },
                'ER': { name: 'Eritrea', nameCn: '厄立特里亚', flag: '🇪🇷', capital: 'Asmara' },
                'SO': { name: 'Somalia', nameCn: '索马里', flag: '🇸🇴', capital: 'Mogadishu' }
            },
            'Asia': {
                'CN': { name: 'China', nameCn: '中国', flag: '🇨🇳', capital: 'Beijing' },
                'IN': { name: 'India', nameCn: '印度', flag: '🇮🇳', capital: 'New Delhi' },
                'JP': { name: 'Japan', nameCn: '日本', flag: '🇯🇵', capital: 'Tokyo' },
                'KR': { name: 'South Korea', nameCn: '韩国', flag: '🇰🇷', capital: 'Seoul' },
                'KP': { name: 'North Korea', nameCn: '朝鲜', flag: '🇰🇵', capital: 'Pyongyang' },
                'TH': { name: 'Thailand', nameCn: '泰国', flag: '🇹🇭', capital: 'Bangkok' },
                'VN': { name: 'Vietnam', nameCn: '越南', flag: '🇻🇳', capital: 'Hanoi' },
                'SG': { name: 'Singapore', nameCn: '新加坡', flag: '🇸🇬', capital: 'Singapore' },
                'MY': { name: 'Malaysia', nameCn: '马来西亚', flag: '🇲🇾', capital: 'Kuala Lumpur' },
                'ID': { name: 'Indonesia', nameCn: '印度尼西亚', flag: '🇮🇩', capital: 'Jakarta' },
                'PH': { name: 'Philippines', nameCn: '菲律宾', flag: '🇵🇭', capital: 'Manila' },
                'AE': { name: 'UAE', nameCn: '阿联酋', flag: '🇦🇪', capital: 'Abu Dhabi' },
                'SA': { name: 'Saudi Arabia', nameCn: '沙特阿拉伯', flag: '🇸🇦', capital: 'Riyadh' },
                'IL': { name: 'Israel', nameCn: '以色列', flag: '🇮🇱', capital: 'Jerusalem' },
                'IR': { name: 'Iran', nameCn: '伊朗', flag: '🇮🇷', capital: 'Tehran' },
                'PK': { name: 'Pakistan', nameCn: '巴基斯坦', flag: '🇵🇰', capital: 'Islamabad' },
                'BD': { name: 'Bangladesh', nameCn: '孟加拉国', flag: '🇧🇩', capital: 'Dhaka' },
                'LK': { name: 'Sri Lanka', nameCn: '斯里兰卡', flag: '🇱🇰', capital: 'Colombo' },
                'MM': { name: 'Myanmar', nameCn: '缅甸', flag: '🇲🇲', capital: 'Naypyidaw' },
                'KH': { name: 'Cambodia', nameCn: '柬埔寨', flag: '🇰🇭', capital: 'Phnom Penh' },
                'LA': { name: 'Laos', nameCn: '老挝', flag: '🇱🇦', capital: 'Vientiane' },
                'MN': { name: 'Mongolia', nameCn: '蒙古', flag: '🇲🇳', capital: 'Ulaanbaatar' },
                'KZ': { name: 'Kazakhstan', nameCn: '哈萨克斯坦', flag: '🇰🇿', capital: 'Nur-Sultan' },
                'UZ': { name: 'Uzbekistan', nameCn: '乌兹别克斯坦', flag: '🇺🇿', capital: 'Tashkent' },
                'TJ': { name: 'Tajikistan', nameCn: '塔吉克斯坦', flag: '🇹🇯', capital: 'Dushanbe' },
                'KG': { name: 'Kyrgyzstan', nameCn: '吉尔吉斯斯坦', flag: '🇰🇬', capital: 'Bishkek' },
                'TM': { name: 'Turkmenistan', nameCn: '土库曼斯坦', flag: '🇹🇲', capital: 'Ashgabat' },
                'AF': { name: 'Afghanistan', nameCn: '阿富汗', flag: '🇦🇫', capital: 'Kabul' },
                'IQ': { name: 'Iraq', nameCn: '伊拉克', flag: '🇮🇶', capital: 'Baghdad' },
                'SY': { name: 'Syria', nameCn: '叙利亚', flag: '🇸🇾', capital: 'Damascus' },
                'LB': { name: 'Lebanon', nameCn: '黎巴嫩', flag: '🇱🇧', capital: 'Beirut' },
                'JO': { name: 'Jordan', nameCn: '约旦', flag: '🇯🇴', capital: 'Amman' },
                'YE': { name: 'Yemen', nameCn: '也门', flag: '🇾🇪', capital: 'Sana\'a' },
                'OM': { name: 'Oman', nameCn: '阿曼', flag: '🇴🇲', capital: 'Muscat' },
                'QA': { name: 'Qatar', nameCn: '卡塔尔', flag: '🇶🇦', capital: 'Doha' },
                'BH': { name: 'Bahrain', nameCn: '巴林', flag: '🇧🇭', capital: 'Manama' },
                'KW': { name: 'Kuwait', nameCn: '科威特', flag: '🇰🇼', capital: 'Kuwait City' },
                'NP': { name: 'Nepal', nameCn: '尼泊尔', flag: '🇳🇵', capital: 'Kathmandu' },
                'BT': { name: 'Bhutan', nameCn: '不丹', flag: '🇧🇹', capital: 'Thimphu' },
                'MV': { name: 'Maldives', nameCn: '马尔代夫', flag: '🇲🇻', capital: 'Malé' },
                'BN': { name: 'Brunei', nameCn: '文莱', flag: '🇧🇳', capital: 'Bandar Seri Begawan' },
                'TL': { name: 'East Timor', nameCn: '东帝汶', flag: '🇹🇱', capital: 'Dili' }
            },
            'Oceania': {
                'AU': { name: 'Australia', nameCn: '澳大利亚', flag: '🇦🇺', capital: 'Canberra' },
                'NZ': { name: 'New Zealand', nameCn: '新西兰', flag: '🇳🇿', capital: 'Wellington' },
                'FJ': { name: 'Fiji', nameCn: '斐济', flag: '🇫🇯', capital: 'Suva' },
                'PG': { name: 'Papua New Guinea', nameCn: '巴布亚新几内亚', flag: '🇵🇬', capital: 'Port Moresby' },
                'WS': { name: 'Samoa', nameCn: '萨摩亚', flag: '🇼🇸', capital: 'Apia' },
                'TO': { name: 'Tonga', nameCn: '汤加', flag: '🇹🇴', capital: 'Nuku\'alofa' },
                'VU': { name: 'Vanuatu', nameCn: '瓦努阿图', flag: '🇻🇺', capital: 'Port Vila' },
                'SB': { name: 'Solomon Islands', nameCn: '所罗门群岛', flag: '🇸🇧', capital: 'Honiara' },
                'PW': { name: 'Palau', nameCn: '帕劳', flag: '🇵🇼', capital: 'Ngerulmud' },
                'FM': { name: 'Micronesia', nameCn: '密克罗尼西亚', flag: '🇫🇲', capital: 'Palikir' },
                'MH': { name: 'Marshall Islands', nameCn: '马绍尔群岛', flag: '🇲🇭', capital: 'Majuro' },
                'KI': { name: 'Kiribati', nameCn: '基里巴斯', flag: '🇰🇮', capital: 'Tarawa' },
                'NR': { name: 'Nauru', nameCn: '瑙鲁', flag: '🇳🇷', capital: 'Yaren' },
                'TV': { name: 'Tuvalu', nameCn: '图瓦卢', flag: '🇹🇻', capital: 'Funafuti' }
            }
        };

        // 存储国家数据
        Object.entries(countriesData).forEach(([continent, countries]) => {
            Object.entries(countries).forEach(([code, data]) => {
                this.countries.set(code, { ...data, continent });
            });
        });

        // 定义大洲信息（包含表情符号）
        const continentInfo = {
            'North America': { emoji: '🌎', name: 'North America' },
            'South America': { emoji: '🌎', name: 'South America' },
            'Europe': { emoji: '🌍', name: 'Europe' },
            'Africa': { emoji: '🌍', name: 'Africa' },
            'Asia': { emoji: '🌏', name: 'Asia' },
            'Oceania': { emoji: '🌏', name: 'Oceania' }
        };

        // 渲染各大洲的国家列表
        continentsList.innerHTML = Object.entries(countriesData).map(([continent, countries]) => {
            const visitedInContinent = Object.keys(countries).filter(code => this.visitedCountries.has(code)).length;
            const totalInContinent = Object.keys(countries).length;
            const continentData = continentInfo[continent];
            
            const countriesHtml = Object.entries(countries).map(([code, country]) => {
                const isVisited = this.visitedCountries.has(code);
                
                let statusClass = 'unvisited';
                if (isVisited) {
                    statusClass = 'visited';
                }
                
                return `
                    <div class="country-item-row ${statusClass}" data-country="${code}">
                        <div class="country-flag-large" data-flag="${country.flag}" data-code="${code}">${country.flag}</div>
                        <div class="country-info">
                            <div class="country-names">
                                <div class="country-name-en">${country.name}</div>
                                <div class="country-name-cn">${country.nameCn}</div>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
            
            return `
                <div class="continent-section collapsed" data-continent="${continent}">
                    <div class="continent-header" onclick="travelMap.toggleContinent('${continent}')">
                        <div class="continent-title">
                            <span class="continent-emoji">${continentData.emoji}</span>
                            <span>${continentData.name}</span>
                        </div>
                        <div class="continent-info">
                            <div class="continent-stats">${visitedInContinent}/${totalInContinent}</div>
                            <div class="continent-toggle">▼</div>
                        </div>
                    </div>
                    <div class="countries-list">
                        <div class="countries-grid">
                            ${countriesHtml}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    bindEvents() {
        // 国家行点击事件
        document.addEventListener('click', (e) => {
            const countryRow = e.target.closest('.country-item-row');
            if (countryRow) {
                const countryCode = countryRow.getAttribute('data-country');
                this.showCountryModal(countryCode);
            }
        });



        // 快速操作按钮
        document.getElementById('addCountryBtn').addEventListener('click', () => {
            this.showAddCountryDialog();
        });

        document.getElementById('clearAllBtn').addEventListener('click', () => {
            this.clearAllData();
        });

        document.getElementById('exportMapBtn').addEventListener('click', () => {
            this.exportData();
        });

        // 模态框事件
        document.getElementById('closeModal').addEventListener('click', () => {
            this.hideCountryModal();
        });

        document.getElementById('markVisitedBtn').addEventListener('click', () => {
            this.markCountryAsVisited();
        });

        document.getElementById('removeCountryBtn').addEventListener('click', () => {
            this.removeCountry();
        });

        // 点击模态框外部关闭
        document.getElementById('countryModal').addEventListener('click', (e) => {
            if (e.target.id === 'countryModal') {
                this.hideCountryModal();
            }
        });
    }

    showCountryModal(countryCode) {
        const country = this.countries.get(countryCode);
        if (!country) return;

        const modal = document.getElementById('countryModal');
        const visitInfo = document.getElementById('visitInfo');
        const removeBtn = document.getElementById('removeCountryBtn');
        
        // 填充国家信息
        document.getElementById('countryName').textContent = country.name;
        document.getElementById('countryFlag').textContent = country.flag;
        document.getElementById('countryCapital').textContent = country.capital;
        document.getElementById('countryContinent').textContent = country.continent;
        
        // 设置状态和按钮
        const isVisited = this.visitedCountries.has(countryCode);
        
        if (isVisited) {
            document.getElementById('countryStatus').textContent = 'Visited';
            visitInfo.style.display = 'block';
            removeBtn.style.display = 'block';
            
            const visitData = this.visitedCountries.get(countryCode);
            document.getElementById('visitDate').value = visitData.date || '';
            document.getElementById('visitNotes').value = visitData.notes || '';
        } else {
            document.getElementById('countryStatus').textContent = 'Not Visited';
            visitInfo.style.display = 'none';
            removeBtn.style.display = 'none';
        }
        
        modal.dataset.countryCode = countryCode;
        modal.classList.remove('hidden');
    }

    hideCountryModal() {
        document.getElementById('countryModal').classList.add('hidden');
    }

    markCountryAsVisited() {
        const modal = document.getElementById('countryModal');
        const countryCode = modal.dataset.countryCode;
        const visitDate = document.getElementById('visitDate').value;
        const visitNotes = document.getElementById('visitNotes').value;
        
        // 添加到已访问
        this.visitedCountries.set(countryCode, {
            date: visitDate || new Date().toISOString().slice(0, 7), // YYYY-MM format
            notes: visitNotes,
            addedAt: new Date().toISOString()
        });
        
        // 使用新的同步方法
        this.syncAllPanels();
        this.hideCountryModal();
        this.showToast(`${this.countries.get(countryCode).name} marked as visited! ✈️`);
    }



    removeCountry() {
        const modal = document.getElementById('countryModal');
        const countryCode = modal.dataset.countryCode;
        const countryName = this.countries.get(countryCode).name;
        
        if (confirm(`Remove ${countryName} from your travel records?`)) {
            this.visitedCountries.delete(countryCode);
            
            // 使用新的同步方法
            this.syncAllPanels();
            this.hideCountryModal();
            this.showToast(`${countryName} removed from travel records`);
        }
    }



    updateCountryVisual(countryCode) {
        const countryRow = document.querySelector(`[data-country="${countryCode}"]`);
        if (!countryRow) return;
        
        // 移除所有状态类
        countryRow.classList.remove('visited', 'unvisited');
        
        // 更新状态类
        if (this.visitedCountries.has(countryCode)) {
            countryRow.classList.add('visited');
        } else {
            countryRow.classList.add('unvisited');
        }
        
        // 更新大洲统计
        this.updateContinentStats();
    }

    updateContinentStats() {
        document.querySelectorAll('.continent-section').forEach((section, index) => {
            const continentName = Object.keys({
                'North America': {},
                'South America': {},
                'Europe': {},
                'Africa': {},
                'Asia': {},
                'Oceania': {}
            })[index];
            
            const countryRows = section.querySelectorAll('.country-item-row');
            const visitedCount = section.querySelectorAll('.country-item-row.visited').length;
            const totalCount = countryRows.length;
            
            const statsElement = section.querySelector('.continent-stats');
            if (statsElement) {
                statsElement.textContent = `${visitedCount}/${totalCount}`;
            }
        });
    }

    // 新增：手风琴式大洲切换
    toggleContinent(continentName) {
        const allSections = document.querySelectorAll('.continent-section');
        const targetSection = document.querySelector(`[data-continent="${continentName}"]`);
        
        if (!targetSection) return;
        
        const isCurrentlyCollapsed = targetSection.classList.contains('collapsed');
        
        // 先收起所有大洲
        allSections.forEach(section => {
            section.classList.add('collapsed');
        });
        
        // 如果目标大洲之前是收起的，则展开它
        if (isCurrentlyCollapsed) {
            targetSection.classList.remove('collapsed');
        }
        
        // 添加一个小延迟来确保动画效果
        setTimeout(() => {
            if (!isCurrentlyCollapsed) {
                // 如果是关闭操作，滚动到顶部
                document.querySelector('.continents-list').scrollTop = 0;
            } else {
                // 如果是展开操作，滚动到该大洲
                targetSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }, 100);
    }

    // 新增：全面同步左右面板数据的方法
    syncAllPanels() {
        try {
            // 同步左侧面板的所有国家状态
            document.querySelectorAll('.country-item-row').forEach(row => {
                const countryCode = row.getAttribute('data-country');
                if (countryCode && this.countries.has(countryCode)) {
                    this.updateCountryVisual(countryCode);
                }
            });
            
            // 同步右侧面板
            this.updateStats();
            this.renderCountryLists();
            
            // 保存数据
            this.saveData();
            
            // 验证数据一致性
            this.validateDataConsistency();
        } catch (error) {
            console.error('Error syncing panels:', error);
            this.showToast('Error syncing data. Please refresh the page.');
        }
    }

    // 验证数据一致性的方法
    validateDataConsistency() {
        // 检查DOM状态是否与数据一致
        document.querySelectorAll('.country-item-row').forEach(row => {
            const countryCode = row.getAttribute('data-country');
            if (countryCode) {
                const isVisited = this.visitedCountries.has(countryCode);
                const hasVisitedClass = row.classList.contains('visited');
                
                if (isVisited !== hasVisitedClass) {
                    console.warn(`DOM inconsistency for ${countryCode}, fixing...`);
                    this.updateCountryVisual(countryCode);
                }
            }
        });
    }

    updateStats() {
        const visitedCount = this.visitedCountries.size;
        const totalCountries = this.countries.size;
        const percentage = Math.round((visitedCount / totalCountries) * 100);
        
        // 安全地更新元素，检查元素是否存在
        const visitedCountEl = document.getElementById('visitedCount');
        const visitedPercentageEl = document.getElementById('visitedPercentage');
        const totalCountriesEl = document.getElementById('totalCountries');
        const continentsVisitedEl = document.getElementById('continentsVisited');
        
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
        
        if (totalCountriesEl) {
            totalCountriesEl.textContent = totalCountries;
        } else {
            console.warn('totalCountries element not found');
        }
        
        // 计算访问的大洲数量
        const visitedContinents = new Set();
        this.visitedCountries.forEach((_, countryCode) => {
            const country = this.countries.get(countryCode);
            if (country) {
                visitedContinents.add(country.continent);
            }
        });
        
        if (continentsVisitedEl) {
            continentsVisitedEl.textContent = visitedContinents.size;
        } else {
            console.warn('continentsVisited element not found');
        }
    }

    renderCountryLists() {
        this.renderVisitedCountries();
    }

    renderVisitedCountries() {
        const container = document.getElementById('visitedCountriesList');
        
        if (this.visitedCountries.size === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <p>No countries visited yet</p>
                    <small>Click on countries to mark them as visited</small>
                </div>
            `;
            return;
        }
        
        const sortedCountries = [...this.visitedCountries.entries()].sort((a, b) => {
            return new Date(b[1].date || b[1].addedAt) - new Date(a[1].date || a[1].addedAt);
        });
        
        container.innerHTML = sortedCountries.map(([code, data]) => {
            const country = this.countries.get(code);
            const date = data.date ? this.formatMonthDate(data.date) : 'No date';
            
            return `
                <div class="country-item">
                    <div class="country-name">
                        <span class="country-flag-small" data-flag="${country.flag}" data-code="${code}">${country.flag}</span>
                        <span>${country.name}</span>
                    </div>
                    <div class="country-date">${date}</div>
                </div>
            `;
        }).join('');
    }



    showAddCountryDialog() {
        const countryList = [...this.countries.entries()]
            .filter(([code]) => !this.visitedCountries.has(code))
            .map(([code, country]) => `${country.flag} ${country.name}`)
            .join('\n');
        
        const input = prompt(`Enter country name:\n\nAvailable countries:\n${countryList.slice(0, 500)}...`);
        
        if (input) {
            const countryCode = this.findCountryCode(input.trim());
            if (countryCode) {
                this.showCountryModal(countryCode);
            } else {
                alert('Country not found. Please try again.');
            }
        }
    }

    findCountryCode(input) {
        const upperInput = input.toUpperCase();
        
        // 直接匹配国家代码
        if (this.countries.has(upperInput)) {
            return upperInput;
        }
        
        // 匹配国家名称
        for (const [code, country] of this.countries) {
            if (country.name.toUpperCase().includes(upperInput)) {
                return code;
            }
        }
        
        return null;
    }

    clearAllData() {
        if (confirm('Are you sure you want to clear all travel data? This action cannot be undone.')) {
            this.visitedCountries.clear();
            
            // 完全重新渲染左侧面板以确保同步
            this.createCountriesList();
            
            // 使用新的同步方法
            this.syncAllPanels();
            this.showToast('All travel data cleared');
        }
    }

    exportData() {
        const data = {
            visitedCountries: Object.fromEntries(this.visitedCountries),
            exportedAt: new Date().toISOString(),
            stats: {
                visitedCount: this.visitedCountries.size,
                totalCountries: this.countries.size
            }
        };
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        const filename = `travel-map-${timestamp}.json`;
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
        
        this.showToast(`Travel data exported as ${filename}`);
    }

    filterCountries(searchTerm) {
        const term = searchTerm.toLowerCase().trim();
        const countryRows = document.querySelectorAll('.country-item-row');
        
        countryRows.forEach(row => {
            const countryCode = row.getAttribute('data-country');
            const country = this.countries.get(countryCode);
            
            if (country) {
                const matchesSearch = 
                    country.name.toLowerCase().includes(term) ||
                    country.nameCn.includes(term) ||
                    countryCode.toLowerCase().includes(term);
                
                row.style.display = matchesSearch ? 'flex' : 'none';
            }
        });
        
        // 隐藏空的大洲
        document.querySelectorAll('.continent-section').forEach(section => {
            const visibleCountries = section.querySelectorAll('.country-item-row[style*="flex"]');
            section.style.display = visibleCountries.length > 0 ? 'block' : 'none';
        });
    }

    switchView(viewType) {
        const continentBtn = document.getElementById('continentViewBtn');
        const listBtn = document.getElementById('listViewBtn');
        
        if (viewType === 'continent') {
            continentBtn.classList.add('active');
            listBtn.classList.remove('active');
            // 实现大洲视图逻辑
        } else {
            listBtn.classList.add('active');
            continentBtn.classList.remove('active');
            // 实现列表视图逻辑
        }
    }



    formatMonthDate(dateString) {
        // 将YYYY-MM格式转换为更友好的显示格式
        if (!dateString) return 'No date';
        
        try {
            const [year, month] = dateString.split('-');
            const date = new Date(year, month - 1); // month is 0-indexed
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long' 
            });
        } catch (error) {
            return dateString; // 如果解析失败，返回原始字符串
        }
    }

    checkEmojiSupport() {
        // 创建一个测试元素来检查emoji是否正确渲染
        const testElement = document.createElement('span');
        testElement.style.position = 'absolute';
        testElement.style.left = '-9999px';
        testElement.style.fontSize = '20px';
        testElement.textContent = '🇺🇸';
        document.body.appendChild(testElement);
        
        // 检查渲染的宽度，如果emoji不支持，通常宽度会很小
        const rect = testElement.getBoundingClientRect();
        const emojiSupported = rect.width > 10;
        
        document.body.removeChild(testElement);
        
        console.log('Emoji support detected:', emojiSupported);
        
        // 如果不支持emoji，使用备用方案
        if (!emojiSupported) {
            this.applyFallbackFlags();
        }
    }
    
    applyFallbackFlags() {
        console.log('Applying fallback flags...');
        // 找到所有国旗元素并替换为国家代码
        document.querySelectorAll('.country-flag-large, .country-flag-small').forEach(flagElement => {
            const code = flagElement.getAttribute('data-code');
            if (code) {
                flagElement.textContent = code;
                flagElement.style.fontSize = '12px';
                flagElement.style.fontWeight = 'bold';
                flagElement.style.color = '#666';
                flagElement.style.border = '1px solid #ccc';
                flagElement.style.padding = '2px 4px';
                flagElement.style.borderRadius = '3px';
                flagElement.style.backgroundColor = '#f5f5f5';
            }
        });
        
        this.showToast('Your system doesn\'t support flag emojis. Showing country codes instead.');
    }

    showToast(message) {
        const existingToast = document.getElementById('travelToast');
        if (existingToast) {
            existingToast.remove();
        }
        
        const toast = document.createElement('div');
        toast.id = 'travelToast';
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
let travelMap;

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    travelMap = new TravelMap();
});