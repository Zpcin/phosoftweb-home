/**
 * 特殊纪念日黑白滤镜和多语言支持脚本
 * 在特殊日期自动应用黑白滤镜并显示多语言纪念信息
 */

const specialDayResult = PublicSacrificeDay();
if(specialDayResult){
    // 设置黑白滤镜
    document.getElementsByTagName("html")[0].setAttribute("style","filter:gray !important;filter:grayscale(100%);-webkit-filter:grayscale(100%);-moz-filter:grayscale(100%);-ms-filter:grayscale(100%);-o-filter:grayscale(100%);");

    // 设置标题和控制台信息
    if(specialDayResult.message) {
        // 获取当前语言
        const currentLang = getCurrentLanguage();
        const message = specialDayResult.messages[currentLang] || specialDayResult.messages['zh-cn'];

        // 在标题前添加哀悼信息
        const originalTitle = document.title;
        document.title = `【${message}】${originalTitle}`;

        // 在控制台输出信息
        console.log(`%c${message}`, 'color: white; background-color: black; padding: 10px; font-size: 18px; font-weight: bold;');
    }
}

// 获取当前页面语言
function getCurrentLanguage() {
    // 首先尝试从URL参数获取语言
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang) {
        return urlLang;
    }

    // 其次尝试从全局变量获取语言
    if (window.currentLang) {
        return window.currentLang;
    }

    // 如果是index.html并且有getPhosoftwebLang函数
    if (typeof window.getPhosoftwebLang === 'function') {
        return window.getPhosoftwebLang();
    }

    // 默认返回简体中文
    return 'zh-cn';
}

function PublicSacrificeDay(){
    const PSFarr = ["0403", "0404", "0405", "0406", "0414", "0512", "0707", "0610", "0814", "0909", "0918", "0930", "1025", "1213"];
    // 特殊日期对应的多语言纪念信息
    const specialDayMessages = {
        "0403": {
            "zh-cn": "哀悼中国台湾花莲县海域7.3级地震遇难同胞。",
            "en": "Mourning for the victims of the 7.3 magnitude earthquake in Hualien, Taiwan.",
            "ja": "台湾花蓮県海域の7.3級地震の犠牲者を追悼します。",
            "zh-hk": "哀悼中國台灣花蓮縣海域7.3級地震遇難同胞。",
            "zh-tw": "哀悼中國台灣花蓮縣海域7.3級地震遇難同胞。"
        },
        "0404": {
            "zh-cn": "清明追思，缅怀逝者，致敬抗疫英雄。",
            "en": "Qingming Festival, remembering the deceased and paying tribute to anti-epidemic heroes.",
            "ja": "清明節に故人を偲び、感染症対策の英雄に敬意を表します。",
            "zh-hk": "清明追思，緬懷逝者，致敬抗疫英雄。",
            "zh-tw": "清明追思，緬懷逝者，致敬抗疫英雄。"
        },
        "0405": {
            "zh-cn": "清明祭祖，慎终追远，哀悼故人。",
            "en": "Qingming Festival, ancestral worship and mourning the deceased.",
            "ja": "清明節に先祖を祀り、故人を悼みます。",
            "zh-hk": "清明祭祖，慎終追遠，哀悼故人。",
            "zh-tw": "清明祭祖，慎終追遠，哀悼故人。"
        },
        "0406": {
            "zh-cn": "清明时节，寄托哀思，愿逝者安息。",
            "en": "Qingming Festival, expressing condolences, may the deceased rest in peace.",
            "ja": "清明節の時期に哀悼の意を表し、故人の安らかな眠りを願います。",
            "zh-hk": "清明時節，寄托哀思，願逝者安息。",
            "zh-tw": "清明時節，寄托哀思，願逝者安息。"
        },
        "0414": {
            "zh-cn": "沉痛悼念青海玉树地震遇难同胞。",
            "en": "Deep mourning for the victims of the Qinghai Yushu earthquake.",
            "ja": "青海省玉樹地震の犠牲者を深く追悼します。",
            "zh-hk": "沉痛悼念青海玉樹地震遇難同胞。",
            "zh-tw": "沉痛悼念青海玉樹地震遇難同胞。"
        },
        "0512": {
            "zh-cn": "铭记汶川之痛，哀悼逝去的生命。",
            "en": "Remembering the pain of Wenchuan and mourning the lost lives.",
            "ja": "汶川の痛みを銘記し、失われた命を悼みます。",
            "zh-hk": "銘記汶川之痛，哀悼逝去的生命。",
            "zh-tw": "銘記汶川之痛，哀悼逝去的生命。"
        },
        "0707": {
            "zh-cn": "勿忘国耻，哀悼七七事变牺牲的英烈。",
            "en": "Never forget national humiliation, mourning the martyrs of the July 7th Incident.",
            "ja": "国の恥を忘れず、七七事変で犠牲になった英霊を追悼します。",
            "zh-hk": "勿忘國恥，哀悼七七事變犧牲的英烈。",
            "zh-tw": "勿忘國恥，哀悼七七事變犧牲的英烈。"
        },
        "0610": {
            "zh-cn": "悼念利迪策惨案的无辜受害者。",
            "en": "Mourning the innocent victims of the Lidice massacre.",
            "ja": "リディツェ虐殺事件の罪のない犠牲者を追悼します。",
            "zh-hk": "悼念利迪策慘案的無辜受害者。",
            "zh-tw": "悼念利迪策慘案的無辜受害者。"
        },
        "0814": {
            "zh-cn": "铭记历史，哀悼慰安妇制度受害者。",
            "en": "Remember history, mourning the victims of the comfort women system.",
            "ja": "歴史を銘記し、慰安婦制度の被害者を追悼します。",
            "zh-hk": "銘記歷史，哀悼慰安婦制度受害者。",
            "zh-tw": "銘記歷史，哀悼慰安婦制度受害者。"
        },
        "0909": {
            "zh-cn": "深切缅怀伟大领袖毛主席。",
            "en": "Deep remembrance of the great leader Chairman Mao.",
            "ja": "偉大な指導者毛主席を深く偲びます。",
            "zh-hk": "深切緬懷偉大領袖毛主席。",
            "zh-tw": "深切緬懷偉大領袖毛主席。"
        },
        "0918": {
            "zh-cn": "警钟长鸣，哀悼九一八事变死难同胞。",
            "en": "Remember the warning bell, mourning compatriots who died in the September 18th Incident.",
            "ja": "警鐘を鳴らし続け、九一八事変で亡くなった同胞を追悼します。",
            "zh-hk": "警鐘長鳴，哀悼九一八事變死難同胞。",
            "zh-tw": "警鐘長鳴，哀悼九一八事變死難同胞。"
        },
        "0930": {
            "zh-cn": "致敬英烈，哀悼为民族献身的英雄。",
            "en": "Salute to the martyrs, mourning the heroes who sacrificed for the nation.",
            "ja": "英霊に敬意を表し、民族のために身を捧げた英雄を追悼します。",
            "zh-hk": "致敬英烈，哀悼為民族獻身的英雄。",
            "zh-tw": "致敬英烈，哀悼為民族獻身的英雄。"
        },
        "1025": {
            "zh-cn": "缅怀抗美援朝战争中牺牲的志愿军将士。",
            "en": "Remembering the soldiers who sacrificed in the War to Resist US Aggression and Aid Korea.",
            "ja": "朝鮮戦争で犠牲になった中国人民志願軍の将兵を偲びます。",
            "zh-hk": "緬懷抗美援朝戰爭中犧牲的志願軍將士。",
            "zh-tw": "緬懷抗美援朝戰爭中犧牲的志願軍將士。"
        },
        "1213": {
            "zh-cn": "国家公祭，哀悼南京大屠杀遇难同胞。",
            "en": "National Memorial Day, mourning the victims of the Nanjing Massacre.",
            "ja": "国家追悼日、南京大虐殺の犠牲者を追悼します。",
            "zh-hk": "國家公祭，哀悼南京大屠殺遇難同胞。",
            "zh-tw": "國家公祭，哀悼南京大屠殺遇難同胞。"
        }
    };

    //2020年4月4日 新冠肺炎哀悼日，清明节
    //2010年4月14日，青海玉树地震
    //2008年5月12日，四川汶川地震
    //1937年7月7日,七七事变 又称卢沟桥事变
    //1942年6月10日,利迪策惨案
    //8月14日，世界慰安妇纪念日
    //1976年9月9日，毛主席逝世
    //1931年9月18日，九一八事变
    //烈士纪念日为每年9月30日
    //1950年10月25日，抗美援朝纪念日
    //1937年12月13日，南京大屠杀

    let currentdate = new Date();
    let str = "";
    let mm = currentdate.getMonth() + 1;
    if(currentdate.getMonth()>9){
        str += mm;
    }else{
        str += "0" + mm;
    }
    if(currentdate.getDate()>9){
        str += currentdate.getDate();
    }else{
        str += "0" + currentdate.getDate();
    }

    if(PSFarr.indexOf(str)>-1){
        // 返回对象，包含日期代码和对应的多语言纪念信息
        return {
            date: str,
            messages: specialDayMessages[str] || { 'zh-cn': '今日特殊纪念日' },
            message: specialDayMessages[str]['zh-cn'] // 兼容旧版，默认中文信息
        };
    }else{
        return 0;
    }
}
