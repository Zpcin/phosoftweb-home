const specialDayResult = PublicSacrificeDay();
if(specialDayResult){
    // 设置黑白滤镜
    document.getElementsByTagName("html")[0].setAttribute("style","filter:gray !important;filter:grayscale(100%);-webkit-filter:grayscale(100%);-moz-filter:grayscale(100%);-ms-filter:grayscale(100%);-o-filter:grayscale(100%);");

    // 设置标题和控制台信息
    if(specialDayResult.message) {
        // 在标题前添加哀悼信息
        const originalTitle = document.title;
        document.title = `【${specialDayResult.message}】${originalTitle}`;

        // 在控制台输出信息
        console.log(`%c${specialDayResult.message}`, 'color: white; background-color: black; padding: 10px; font-size: 18px; font-weight: bold;');
    }
}

function PublicSacrificeDay(){
    const PSFarr = ["0403", "0404", "0405", "0406", "0414", "0512", "0707", "0610", "0814", "0909", "0918", "0930", "1025", "1213"];
    // 特殊日期对应的纪念信息
    const specialDayMessages = {
        "0403": "哀悼中国台湾花莲县海域7.3级地震遇难同胞。",
        "0404": "清明追思，缅怀逝者，致敬抗疫英雄。",
        "0405": "清明祭祖，慎终追远，哀悼故人。",
        "0406": "清明时节，寄托哀思，愿逝者安息。",
        "0414": "沉痛悼念青海玉树地震遇难同胞。",
        "0512": "铭记汶川之痛，哀悼逝去的生命。",
        "0707": "勿忘国耻，哀悼七七事变牺牲的英烈。",
        "0610": "悼念利迪策惨案的无辜受害者。",
        "0814": "铭记历史，哀悼慰安妇制度受害者。",
        "0909": "深切缅怀伟大领袖毛主席。",
        "0918": "警钟长鸣，哀悼九一八事变死难同胞。",
        "0930": "致敬英烈，哀悼为民族献身的英雄。",
        "1025": "缅怀抗美援朝战争中牺牲的志愿军将士。",
        "1213": "国家公祭，哀悼南京大屠杀遇难同胞。"
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
        // 返回对象，包含日期代码和对应的纪念信息
        return {
            date: str,
            message: specialDayMessages[str]
        };
    }else{
        return 0;
    }
}
