// phosoftweb-home 主站首页多语言脚本
const PHOSOFTWEB_LANG_MAP = {
  'zh-cn': {
    welcome: '欢迎来到',
    site: 'PhosoftWebPages',
    promo: '下面是 PhosoftWeb Line 宣传片',
    bilibili: '进入bilibili，一起交流！',
    notice: '公告',
    noticeEn: 'Notice',
    noticeContent: ['QwQ~', '这是公告'],
    friends: '友情链接',
    friendsTip: '以下链接均有可能挂掉，请谅解！',
    // 链接文字翻译
    linkTexts: {
      'bullshit': '狗屁不通文章生成器',
      'hitokoto': 'Hitokoto - 一言',
      'youget': '视频解析下载工具',
      'sponsor': '赞助我们',
      'search': 'Phosoft搜索页',
      'forum': 'Phosoft论坛页',
      'game': 'Phosoft游戏页-扫草',
      'ugly': '丑备用论坛页',
      // 添加个人网站链接翻译
      'official': 'PhosoftStudio 官方网站',
      'chensite': 'ChenZR的小破站',
      'damonsite': 'What_Damon的窝',
      'zpcin': 'Zpcin个人网站',
      'pigeon': '鸽子的屑网站',
      'grassdev': '生草開發組',
      'grasstheme': '生草主题官方博客',
      'awesome': 'Awesome IWB',
      'chenxinlei': '陈鑫磊的博客'
    },
    footer: '版权所有',
    powered: '此网站由 <a href="https://vercel.com/">Vercel</a>&nbsp;强力驱动',
    year: new Date().getFullYear(),
    about: '关于',
    // 额外配置
    config: {
      enableGeoIp: false,          // 是否启用 IP 地理位置检测
      disableBrowserLangDetect: false  // 是否禁用浏览器语言检测
    },
    // 控制台输出
    console: {
      logo: `
____  _                      __ _
|  _ \\| |__   ___  ___  ___  / _| |_
| |_) | '_ \\ / _ \\/ __|/ _ \\| |_| __|
|  __/| | | | (_) \\__ \\ (_) |  _| |_
|_|   |_| |_|\\___/|___/\\___/|_|  \\__|
      `,
      slogan: '不断创新，永不停息',
      intro: 'We always innovate, never stop!，我们是 PhosoftStudio，点击链接加入群聊【Phosoft 工作室官方公开】：https://jq.qq.com/?_wv=1027&k=STqaquQz'
    }
  },
  'zh-hk': {
    welcome: '歡迎來到',
    site: 'PhosoftWebPages',
    promo: '呢度係 PhosoftWeb Line 嘅宣傳片',
    bilibili: '入去bilibili，一齊交流啦！',
    notice: '公告',
    noticeEn: 'Notice',
    noticeContent: ['QwQ~', '呢個係公告'],
    friends: '友情連結',
    friendsTip: '以下連結可能會死，請見諒！',
    // 链接文字翻译
    linkTexts: {
      'bullshit': '垃圾文章生成器',
      'hitokoto': 'Hitokoto - 一言',
      'youget': '影片下載工具',
      'sponsor': '贊助我哋',
      'search': 'Phosoft搜索頁',
      'forum': 'Phosoft論壇頁',
      'game': 'Phosoft遊戲頁-掃草',
      'ugly': '醜備用論壇頁',
      // 添加个人网站链接翻译
      'official': 'PhosoftStudio 官方網站',
      'chensite': 'ChenZR嘅小破站',
      'damonsite': 'What_Damon嘅窩',
      'zpcin': 'Zpcin個人網站',
      'pigeon': '鴿子嘅屑網站',
      'grassdev': '生草開發組',
      'grasstheme': '生草主題官方博客',
      'awesome': 'Awesome IWB',
      'chenxinlei': '陳鑫磊嘅博客'
    },
    footer: '版權所有',
    powered: '呢個網站由 <a href="https://vercel.com/">Vercel</a>&nbsp;強力驅動',
    year: new Date().getFullYear(),
    about: '關於',
    // 额外配置
    config: {
      enableGeoIp: true,          // 是否启用 IP 地理位置检测
      disableBrowserLangDetect: false  // 是否禁用浏览器语言检测
    },
    // 控制台输出
    console: {
      logo: `
____  _                      __ _
|  _ \\| |__   ___  ___  ___  / _| |_
| |_) | '_ \\ / _ \\/ __|/ _ \\| |_| __|
|  __/| | | | (_) \\__ \\ (_) |  _| |_
|_|   |_| |_|\\___/|___/\\___/|_|  \\__|
      `,
      slogan: '不斷創新，永不停息',
      intro: 'We always innovate, never stop!，我哋係 PhosoftStudio，撳連結加入群聊【Phosoft 工作室官方公開】：https://jq.qq.com/?_wv=1027&k=STqaquQz'
    }
  },
  'zh-tw': {
    welcome: '歡迎來到',
    site: 'PhosoftWebPages',
    promo: '下面是 PhosoftWeb Line 宣傳片',
    bilibili: '進入bilibili，一起交流！',
    notice: '公告',
    noticeEn: 'Notice',
    noticeContent: ['QwQ~', '這是公告'],
    friends: '友情連結',
    friendsTip: '以下連結可能無法訪問，請見諒！',
    // 链接文字翻译
    linkTexts: {
      'bullshit': '無意義文章生成器',
      'hitokoto': 'Hitokoto - 一言',
      'youget': '影片下載工具',
      'sponsor': '贊助我們',
      'search': 'Phosoft搜索頁',
      'forum': 'Phosoft論壇頁',
      'game': 'Phosoft遊戲頁-掃草',
      'ugly': '備用論壇頁',
      // 添加个人网站链接翻译
      'official': 'PhosoftStudio 官方網站',
      'chensite': 'ChenZR的小破站',
      'damonsite': 'What_Damon的窩',
      'zpcin': 'Zpcin個人網站',
      'pigeon': '鴿子的垃圾網站',
      'grassdev': '生草開發組',
      'grasstheme': '生草主題官方部落格',
      'awesome': 'Awesome IWB',
      'chenxinlei': '陳鑫磊的部落格'
    },
    footer: '版權所有',
    powered: '本網站由 <a href="https://vercel.com/">Vercel</a>&nbsp;強力驅動',
    year: new Date().getFullYear(),
    about: '關於',
    // 额外配置
    config: {
      enableGeoIp: true,          // 是否启用 IP 地理位置检测
      disableBrowserLangDetect: false  // 是否禁用浏览器语言检测
    },
    // 控制台输出
    console: {
      logo: `
____  _                      __ _
|  _ \\| |__   ___  ___  ___  / _| |_
| |_) | '_ \\ / _ \\/ __|/ _ \\| |_| __|
|  __/| | | | (_) \\__ \\ (_) |  _| |_
|_|   |_| |_|\\___/|___/\\___/|_|  \\__|
      `,
      slogan: '不斷創新，永不停息',
      intro: 'We always innovate, never stop!，我們是 PhosoftStudio，點擊連結加入群聊【Phosoft 工作室官方公開】：https://jq.qq.com/?_wv=1027&k=STqaquQz'
    }
  },
  'en': {
    welcome: 'Welcome to',
    site: 'PhosoftWebPages',
    promo: 'Here is the PhosoftWeb Line promo video',
    bilibili: 'Go to Bilibili and let’s interact!',
    notice: 'Announcement',
    noticeEn: 'Notice',
    noticeContent: ['QwQ~', 'This is an announcement'],
    friends: 'Links',
    friendsTip: 'The following links may be unavailable at times, please understand!',
    // 链接文字翻译
    linkTexts: {
      'bullshit': 'Bullshit Generator',
      'hitokoto': 'Hitokoto - One Sentence',
      'youget': 'Video Download Tool',
      'sponsor': 'Sponsor Us',
      'search': 'Phosoft Search',
      'forum': 'Phosoft Forum',
      'game': 'Phosoft Game - Scan Grass',
      'ugly': 'Ugly Backup Forum',
      // 添加个人网站链接翻译
      'official': 'PhosoftStudio Official Website',
      'chensite': "ChenZR's Little Site",
      'damonsite': "What_Damon's Home",
      'zpcin': "Zpcin's Personal Website",
      'pigeon': "Pigeon's Humble Website",
      'grassdev': 'Grass Development Group',
      'grasstheme': 'Grass Theme Official Blog',
      'awesome': 'Awesome IWB',
      'chenxinlei': "Chen Xinlei's Blog"
    },
    footer: 'All rights reserved',
    powered: 'Powered by <a href="https://vercel.com/">Vercel</a>',
    year: new Date().getFullYear(),
    about: 'About',
    // 额外配置
    config: {
      enableGeoIp: false,          // 英文版默认不启用 IP 检测
      disableBrowserLangDetect: false  // 是否禁用浏览器语言检测
    },
    // 控制台输出
    console: {
      logo: `
____  _                      __ _
|  _ \\| |__   ___  ___  ___  / _| |_
| |_) | '_ \\ / _ \\/ __|/ _ \\| |_| __|
|  __/| | | | (_) \\__ \\ (_) |  _| |_
|_|   |_| |_|\\___/|___/\\___/|_|  \\__|
      `,
      slogan: 'Constant Innovation, Never Stopping',
      intro: 'We always innovate, never stop! We are PhosoftStudio, click the link to join our QQ group [Phosoft Studio Official]: https://jq.qq.com/?_wv=1027&k=STqaquQz'
    }
  },
  'en-sg': {
    welcome: 'Welcome lah to',
    site: 'PhosoftWebPages',
    promo: 'Here got PhosoftWeb Line promo video lor',
    bilibili: 'Go Bilibili together can?',
    notice: 'Announcement',
    noticeEn: 'Notice',
    noticeContent: ['QwQ~', 'Got announcement here'],
    friends: 'Friend Links',
    friendsTip: 'These links sometimes die one, please understand!',
    // 链接文字翻译
    linkTexts: {
      'bullshit': 'Nonsense Generator lor',
      'hitokoto': 'Hitokoto - One Word ah',
      'youget': 'Video Downloader Tool',
      'sponsor': 'Support Us lah',
      'search': 'Phosoft Search Page',
      'forum': 'Phosoft Forum',
      'game': 'Phosoft Game - Scan Grass',
      'ugly': 'Backup Forum Page lah',
      // 添加个人网站链接翻译
      'official': 'PhosoftStudio Official Website lah',
      'chensite': "ChenZR's Small Site one",
      'damonsite': "What_Damon's Crib",
      'zpcin': "Zpcin Personal Page",
      'pigeon': "Pigeon's Simple Website lah",
      'grassdev': 'Grass Dev Group ah',
      'grasstheme': 'Grass Theme Blog',
      'awesome': 'Awesome IWB',
      'chenxinlei': "Chen Xinlei Blog"
    },
    footer: 'All rights reserved',
    powered: 'Powered by <a href="https://vercel.com/">Vercel</a> one',
    year: new Date().getFullYear(),
    about: 'About',
    // 额外配置
    config: {
      enableGeoIp: true,          // 新加坡英语启用 IP 检测
      disableBrowserLangDetect: true   // 新加坡英语禁用浏览器语言检测
    },
    // 控制台输出
    console: {
      logo: `
____  _                      __ _
|  _ \\| |__   ___  ___  ___  / _| |_
| |_) | '_ \\ / _ \\/ __|/ _ \\| |_| __|
|  __/| | | | (_) \\__ \\ (_) |  _| |_
|_|   |_| |_|\\___/|___/\\___/|_|  \\__|
      `,
      slogan: 'Always Innovating lah, Never Stopping one',
      intro: 'We always innovate, never stop! We are PhosoftStudio, click link to join our QQ group [Phosoft Studio Official] can?: https://jq.qq.com/?_wv=1027&k=STqaquQz'
    }
  },
  'ja': {
    welcome: 'ようこそ',
    site: 'フォソフトウェブページズ',
    promo: 'フォソフトウェブ Line 紹介映像',
    bilibili: 'Bilibiliで一緒に交流しましょう！',
    notice: 'お知らせ',
    noticeEn: 'Nōtisu',
    noticeContent: ['QwQ~', 'これはお知らせです'],
    friends: 'サイトリンクス',
    friendsTip: '以下のリンクは利用できない場合があります。ご了承ください。',
    // 链接文字翻译
    linkTexts: {
      'bullshit': 'ナンセンス文章ジェネレーター',
      'hitokoto': 'ヒトコト - 一言',
      'youget': '動画ダウンロードツール',
      'sponsor': '私たちを支援する',
      'search': 'フォソフト検索ページ',
      'forum': 'フォソフトフォーラム',
      'game': 'フォソフトゲーム-草スキャン',
      'ugly': 'バックアップフォーラム',
      // 添加个人网站链接翻译
      'official': 'フォソフトスタジオ公式サイト',
      'chensite': 'ChenZRの小さなサイト',
      'damonsite': 'What_Damonの巣',
      'zpcin': 'Zpcinの個人サイト',
      'pigeon': '鳩の簡素なサイト',
      'grassdev': '草開発グループ',
      'grasstheme': '草テーマ公式ブログ',
      'awesome': 'Awesome IWB',
      'chenxinlei': '陳鑫磊のブログ'
    },
    footer: '著作権所有',
    powered: '<a href="https://vercel.com/">Vercel</a> により強力に提供',
    // 日本年号换算
    year: function() {
      const currentYear = new Date().getFullYear();
      // 令和元年从2019年5月1日开始
      const reiwaYear = currentYear - 2019 + 1;
      return `令和${reiwaYear}年`;
    }(),
    about: 'について',
    // 额外配置
    config: {
      enableGeoIp: true,          // 是否启用 IP 地理位置检测
      disableBrowserLangDetect: false  // 是否禁用浏览器语言检测
    },
    // 控制台输出
    console: {
      logo: `
  _____                __       _        
 |  ___|__  ___  ___  / _|_   _| |_ ___  
 | |_ / _ \\/ __|/ _ \\| |_| | | | __/ _ \\ 
 |  _| (_) \\__ \\ (_) |  _| |_| | || (_) |
 |_|  \\___/|___/\\___/|_|  \\__,_|\\__\\___/ 
      `,
      slogan: '絶え間ない革新、決して止まらない',
      intro: '常に革新し、決して止まりません！私たちはPhosoftStudioです。リンクをクリックしてQQグループ【Phosoft スタジオ公式】に参加してください：https://jq.qq.com/?_wv=1027&k=STqaquQz'
    }
  },
  'wenyan': {
    welcome: '有客至',
    site: '鳳梭軟閣',
    promo: '觀鳳梭線焉',
    bilibili: '入哔哩哔哩，與諸君共語矣！',
    notice: '示',
    noticeEn: 'Notitia',
    noticeContent: ['嗟乎', '是爲告示'],
    friends: '友朋之址',
    friendsTip: '諸址或有不通者，望君恕之！',
    linkTexts: {
      'bullshit': '妄言生成之術',
      'hitokoto': '一言堂',
      'youget': '影像擷取之器',
      'sponsor': '贊襄吾輩',
      'search': '鳳梭搜索',
      'forum': '鳳梭論壇',
      'game': '鳳梭遊戲-掃草',
      'ugly': '備用論壇',
      // 添加个人网站链接翻译
      'official': '鳳梭軟閣正室',
      'chensite': '臣贈儒之陋室',
      'damonsite': '何大夢之居所',
      'zpcin': '志平臣之私居',
      'pigeon': '鴿者之陋址',
      'grassdev': '草生之工坊',
      'grasstheme': '草題之官志',
      'awesome': '妙筆教板錦集',
      'chenxinlei': '陳鑫磊之文苑'
    },
    footer: '版權所屬',
    powered: '賴 <a href="https://vercel.com/">Vercel</a> 之力而行',
    year: new Date().getFullYear(),
    about: '關於',
    config: {
      enableGeoIp: false,
      disableBrowserLangDetect: false
    },
    // 控制台输出
    console: {
      logo: `鳳梭軟`,
      logoStyle: 'font-size: 60px; font-weight: bold; color: #000;',
      slogan: '創新不息，行進不止',
      intro: '吾輩日新又新，未嘗稍歇。鳳梭工坊是也，按此入群【鳳梭工坊官方】：https://jq.qq.com/?_wv=1027&k=STqaquQz'
    }
  },
  'pinyin': {
    welcome: 'Huānyíng lái dào',
    site: 'PhosoftWebPages',
    promo: 'Xiàmiàn shì PhosoftWeb Line xuānchuánpiàn',
    bilibili: 'Jìnrù bilibili, yìqǐ jiāoliú!',
    notice: 'Gōnggào',
    noticeEn: 'Notice',
    noticeContent: ['QwQ~', 'Zhè shì gōnggào'],
    friends: 'Yǒuqíng liánjiē',
    friendsTip: 'Yǐxià liánjiē jūn yǒu kěnéng guà diào, qǐng liàngjiě!',
    // 链接文字翻译
    linkTexts: {
      'bullshit': 'Gǒupì bùtōng wénzhāng shēngchéngqì',
      'hitokoto': 'Hitokoto - Yīyán',
      'youget': 'Shìpín jiěxī xiàzǎi gōngjù',
      'sponsor': 'Zànzhù wǒmen',
      'search': 'Phosoft sōusuǒ yè',
      'forum': 'Phosoft lùntán yè',
      'game': 'Phosoft yóuxì yè - Sǎocǎo',
      'ugly': 'Chǒu bèiyòng lùntán yè',
      // 添加个人网站链接翻译
      'official': 'PhosoftStudio guānfāng wǎngzhàn',
      'chensite': 'ChenZR de xiǎopò zhàn',
      'damonsite': 'What_Damon de wō',
      'zpcin': 'Zpcin gèrén wǎngzhàn',
      'pigeon': 'Gēzi de xiè wǎngzhàn',
      'grassdev': 'Shēngcǎo kāifā zǔ',
      'grasstheme': 'Shēngcǎo zhǔtí guānfāng bókè',
      'awesome': 'Awesome IWB',
      'chenxinlei': 'Chén Xīnlěi de bókè'
    },
    footer: 'Bǎnquán suǒyǒu',
    powered: 'Cǐ wǎngzhàn yóu <a href="https://vercel.com/">Vercel</a>&nbsp;qiánglì qūdòng',
    year: new Date().getFullYear(),
    about: 'Guānyú',
    // 额外配置
    config: {
      enableGeoIp: false,
      disableBrowserLangDetect: false
    },
    // 控制台输出
    console: {
      logo: `
____  _                      __ _
|  _ \\| |__   ___  ___  ___  / _| |_
| |_) | '_ \\ / _ \\/ __|/ _ \\| |_| __|
|  __/| | | | (_) \\__ \\ (_) |  _| |_
|_|   |_| |_|\\___/|___/\\___/|_|  \\__|
      `,
      slogan: 'Bùduàn chuàngxīn, yǒngbù tíngxī',
      intro: 'We always innovate, never stop!, wǒmen shì PhosoftStudio, diǎnjī liánjiē jiārù qúnliáo [Phosoft gōngzuòshì guānfāng gōngkāi]: https://jq.qq.com/?_wv=1027&k=STqaquQz'
    }
  },
  'zhuyin': {
    welcome: 'ㄏㄨㄢ ㄧㄥˊ ㄌㄞˊ ㄉㄠˋ',
    site: 'PhosoftWebPages',
    promo: 'ㄒㄧㄚˋ ㄇㄧㄢˋ ㄕˋ PhosoftWeb Line ㄒㄩㄢ ㄔㄨㄢˊ ㄆㄧㄢˋ',
    bilibili: 'ㄐㄧㄣˋ ㄖㄨˋ bilibili，ㄧˊ ㄑㄧˇ ㄐㄧㄠ ㄌㄧㄡˊ！',
    notice: 'ㄍㄨㄥ ㄍㄠˋ',
    noticeEn: 'Notice',
    noticeContent: ['QwQ~', 'ㄓㄜˋ ㄕˋ ㄍㄨㄥ ㄍㄠˋ'],
    friends: 'ㄧㄡˇ ㄑㄧㄥˊ ㄌㄧㄢˊ ㄐㄧㄝ',
    friendsTip: 'ㄧˇ ㄒㄧㄚˋ ㄌㄧㄢˊ ㄐㄧㄝ ㄐㄩㄣ ㄧㄡˇ ㄎㄜˇ ㄋㄥˊ ㄍㄨㄚˋ ㄉㄧㄠˋ，ㄑㄧㄥˇ ㄌㄧㄤˋ ㄐㄧㄝˇ！',
    // 链接文字翻译
    linkTexts: {
      'bullshit': 'ㄍㄡˇ ㄆㄧˊ ㄅㄨˋ ㄊㄨㄥ ㄨㄣˊ ㄓㄤ ㄕㄥ ㄔㄥˊ ㄑㄧˋ',
      'hitokoto': 'Hitokoto - ㄧˊ ㄧㄢˊ',
      'youget': 'ㄕˋ ㄆㄧㄣˊ ㄐㄧㄝˇ ㄒㄧ ㄒㄧㄚˋ ㄗㄞˇ ㄍㄨㄥ ㄐㄩˋ',
      'sponsor': 'ㄗㄢˋ ㄓㄨˋ ㄨㄛˇ ㄇㄣˊ',
      'search': 'Phosoft ㄙㄡ ㄙㄨㄛˇ ㄧㄝˋ',
      'forum': 'Phosoft ㄌㄨㄣˊ ㄊㄢˊ ㄧㄝˋ',
      'game': 'Phosoft ㄧㄡˊ ㄒㄧˋ ㄧㄝˋ - ㄙㄠˇ ㄘㄠˇ',
      'ugly': 'ㄔㄡˇ ㄅㄟˋ ㄩㄥˋ ㄌㄨㄣˊ ㄊㄢˊ ㄧㄝˋ',
      // 添加个人网站链接翻译
      'official': 'PhosoftStudio ㄍㄨㄢ ㄈㄤ ㄨㄤˇ ㄓㄢˋ',
      'chensite': 'ChenZR ㄉㄜ˙ ㄒㄧㄠˇ ㄆㄛˋ ㄓㄢˋ',
      'damonsite': 'What_Damon ㄉㄜ˙ ㄨㄛ',
      'zpcin': 'Zpcin ㄍㄜˋ ㄖㄣˊ ㄨㄤˇ ㄓㄢˋ',
      'pigeon': 'ㄍㄜ ㄗ˙ ㄉㄜ˙ ㄒㄧㄝˋ ㄨㄤˇ ㄓㄢˋ',
      'grassdev': 'ㄕㄥ ㄘㄠˇ ㄎㄞ ㄈㄚ ㄗㄨˇ',
      'grasstheme': 'ㄕㄥ ㄘㄠˇ ㄓㄨˇ ㄊㄧˊ ㄍㄨㄢ ㄈㄤ ㄅㄛˊ ㄎㄜˋ',
      'chenxinlei': 'ㄔㄣˊ ㄒㄧㄣ ㄌㄟˇ ㄉㄜ˙ ㄅㄛˊ ㄎㄜˋ'
    },
    footer: 'ㄅㄢˇ ㄑㄩㄢˊ ㄙㄨㄛˇ ㄧㄡˇ',
    powered: 'ㄘˊ ㄨㄤˇ ㄓㄢˋ ㄧㄡˇ <a href="https://vercel.com/">Vercel</a>&nbsp;ㄑㄧㄤˊ ㄌㄧˋ ㄑㄩˋ ㄉㄨㄥˋ',
    year: new Date().getFullYear(),
    about: 'ㄍㄨㄢ ㄩˊ',
    // 额外配置
    config: {
      enableGeoIp: false,
      disableBrowserLangDetect: false
    },
    // 控制台输出
    console: {
      logo: `
____  _                      __ _
|  _ \\| |__   ___  ___  ___  / _| |_
| |_) | '_ \\ / _ \\/ __|/ _ \\| |_| __|
|  __/| | | | (_) \\__ \\ (_) |  _| |_
|_|   |_| |_|\\___/|___/\\___/|_|  \\__|
      `,
      slogan: 'ㄅㄨˋ ㄉㄨㄢˋ ㄔㄨㄤˋ ㄒㄧㄣ，ㄩㄥˇ ㄅㄨˋ ㄊㄧㄥˊ ㄒㄧ',
      intro: 'We always innovate, never stop!, ㄨㄛˇ ㄇㄣˊ ㄕˋ PhosoftStudio，ㄉㄧㄢˇ ㄐㄧ ㄌㄧㄢˊ ㄐㄧㄝ ㄐㄧㄚ ㄖㄨˋ ㄑㄩㄣˊ ㄌㄧㄠˊ【Phosoft ㄍㄨㄥ ㄗㄨㄛˋ ㄕˋ ㄍㄨㄢ ㄈㄤ ㄍㄨㄥ ㄎㄞ】：https://jq.qq.com/?_wv=1027&k=STqaquQz'
    }
  },
};

// IP地址和地区映射到语言的配置
const REGION_LANG_MAP = {
  // 大中华地区
  'CN': 'zh-cn',  // 中国大陆
  'TW': 'zh-tw',  // 台湾
  'HK': 'zh-hk',  // 香港
  'MO': 'zh-hk',  // 澳门
  // 日本
  'JP': 'ja',     // 日本
  // 新加坡（支持新加坡英语）
  'SG': 'en-sg',  // 新加坡
  // 其他地区默认使用标准英语
};

// 获取当前语言的配置
function getLangConfig(lang) {
  const defaultConfig = { enableGeoIp: false };
  if (!lang || !PHOSOFTWEB_LANG_MAP[lang]) return defaultConfig;
  return PHOSOFTWEB_LANG_MAP[lang].config || defaultConfig;
}

// 检查URL参数
function checkUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  // 检查是否指定了语言
  if (urlParams.has('lang')) {
    const langValue = urlParams.get('lang');
    if (Object.keys(PHOSOFTWEB_LANG_MAP).includes(langValue)) {
      window._forceLang = langValue;
    }
  }
}

// 从ipapi.co获取IP信息
function fetchIpInfo() {
  return new Promise((resolve) => {
    // 检查当前语言配置是否启用IP检测
    const currentLang = getPhosoftwebLang();
    const config = getLangConfig(currentLang);

    if (!config.enableGeoIp) {
      console.log(`语言 ${currentLang} 未启用IP地理位置检测`);
      resolve(null);
      return;
    }

    fetch('https://ipapi.co/json/')
      .then(response => {
        if (!response.ok) {
          throw new Error('IP API响应错误');
        }
        return response.json();
      })
      .then(data => {
        // 自动替换tw为CN（tw）
        if (data.region_code === 'TW' || data.region === 'Taiwan') {
          data.region_code = 'CN(tw)';
          data.region = 'CN(tw)';
        }
        // 控制台输出时将country相关字段全部映射为region相关字段，避免未解析变量
        const dataForLog = { ...data };
        if (typeof dataForLog.country !== 'undefined') dataForLog.region = dataForLog.country;
        if (typeof dataForLog.country_code !== 'undefined') dataForLog.region_code = dataForLog.country_code;
        if (typeof dataForLog.country_name !== 'undefined') dataForLog.region_name = dataForLog.country_name;
        if (typeof dataForLog.country_code_iso3 !== 'undefined') dataForLog.region_code_iso3 = dataForLog.country_code_iso3;
        if (typeof dataForLog.country_capital !== 'undefined') dataForLog.region_capital = dataForLog.country_capital;
        if (typeof dataForLog.country_tld !== 'undefined') dataForLog.region_tld = dataForLog.country_tld;
        if (typeof dataForLog.country_area !== 'undefined') dataForLog.region_area = dataForLog.country_area;
        if (typeof dataForLog.country_population !== 'undefined') dataForLog.region_population = dataForLog.country_population;
        // 删除country相关字段，保证控制台只显示region，避免未解析变量
        delete dataForLog.country;
        delete dataForLog.country_code;
        delete dataForLog.country_name;
        delete dataForLog.country_code_iso3;
        delete dataForLog.country_capital;
        delete dataForLog.country_tld;
        delete dataForLog.country_area;
        delete dataForLog.country_population;
        console.log('IP地理位置信息:', dataForLog);
        // 验证API返回的数据格式
        if (!data || !('country_code' in data)) {
          console.warn('IP API返回数据格式不正确:', data);
          resolve(null);
          return;
        }
        resolve(data);
      })
      .catch(error => {
        console.error('获取IP信息失败:', error);
        resolve(null);
      });
  });
}

function getPhosoftwebLang() {
  // 如果已经强制设置了语言，直接返回
  if (window._forceLang) return window._forceLang;

  // 从浏览器语言设置获取语言偏好
  const browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();

  // 默认语言识别结果
  let detectedLang = 'en';

  // 根据浏览器语言初步判断
  if (browserLang === 'zh-tw') detectedLang = 'zh-tw';
  else if (browserLang === 'zh-hk' || browserLang === 'zh-mo') detectedLang = 'zh-hk';
  else if (browserLang.startsWith('zh')) detectedLang = 'zh-cn';
  else if (browserLang.startsWith('ja')) detectedLang = 'ja';
  else if (browserLang === 'en-sg') detectedLang = 'en-sg';

  // 检查语言配置是否禁用浏览器语言检测
  const config = getLangConfig(detectedLang);
  if (config.disableBrowserLangDetect) {
    console.log(`语言 ${detectedLang} 已禁用浏览器语言检测，使用默认英语`);
    return 'en'; // 如果禁用浏览器语言检测，返回默认英语
  }

  return detectedLang;
}

// 根据IP地理位置设置语言
async function applyGeoIpLang() {
  // 检查URL参数
  checkUrlParams();

  // 如果已经强制设置了语言，直接应用语言
  if (window._forceLang) {
    applyPhosoftwebLang();
    return;
  }

  try {
    // 获取IP信息
    const ipInfo = await fetchIpInfo();

    if (ipInfo && ipInfo.country_code) {
      // 根据国家/地区代码选择语言
      const countryCode = ipInfo.country_code;
      const regionLang = REGION_LANG_MAP[countryCode];

      if (regionLang) {
        console.log(`根据IP地址(${ipInfo.ip})检测到地区: ${countryCode}, 应用语言: ${regionLang}`);
        window._forceLang = regionLang;
      } else {
        // 检查次要语言信息
        if (ipInfo.languages) {
          const languages = ipInfo.languages.split(',');
          console.log(`检测到支持的语言: ${languages}`);

          // 检查是否有支持的语言
          for (const lang of languages) {
            const normalizedLang = lang.toLowerCase().trim();
            if (normalizedLang === 'zh-cn' || normalizedLang === 'zh') {
              window._forceLang = 'zh-cn';
              break;
            } else if (normalizedLang === 'zh-tw') {
              window._forceLang = 'zh-tw';
              break;
            } else if (normalizedLang === 'zh-hk' || normalizedLang === 'yue') {
              window._forceLang = 'zh-hk';
              break;
            } else if (normalizedLang === 'ja') {
              window._forceLang = 'ja';
              break;
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('IP语言检测失败:', error);
  }

  // 无论IP检测成功与否，都应用语言
  applyPhosoftwebLang();
}

function applyPhosoftwebLang() {
  const lang = getPhosoftwebLang();
  const map = PHOSOFTWEB_LANG_MAP[lang];
  if (!map) return;

  document.documentElement.lang = lang;

  // 标题区
  const welcome = document.querySelector('.wu-h2.no-wrap');
  if (welcome) welcome.textContent = map.welcome;
  const site = document.querySelector('.wu-h1.no-wrap');
  if (site) site.textContent = map.site;

  // 宣传片区
  const promo = document.querySelector('#video .wu-h2.no-wrap');
  if (promo) promo.textContent = map.promo;
  const bilibili = document.querySelector('#video a span');
  if (bilibili) bilibili.textContent = map.bilibili;

  // 公告区
  const notice = document.querySelector('#notice .wu-h1');
  if (notice) notice.textContent = map.notice;
  const noticeEn = document.querySelector('#notice .wu-h3');
  if (noticeEn) noticeEn.textContent = map.noticeEn;
  const noticeContent = document.querySelectorAll('#notice .wu-not p');
  if (noticeContent.length >= 2) {
    noticeContent[0].textContent = map.noticeContent[0];
    noticeContent[1].textContent = map.noticeContent[1];
  }

  // 友情链接区
  // 使用 ID 选择器直接定位友情链接区块
  const friendsBlock = document.getElementById('friendLinks');
  if (friendsBlock) {
    const friendsTitle = friendsBlock.querySelector('.wu-h2');
    if (friendsTitle) {
      friendsTitle.textContent = map.friends;
    }

    // 友情链接提示文本
    const friendsTip = friendsBlock.querySelector('.wu-notice.wu-mw');
    if (friendsTip) {
      friendsTip.textContent = map.friendsTip;
    }

    // 链接文字翻译
    if (map.linkTexts) {
      const links = friendsBlock.querySelectorAll('.wu-links a');
      links.forEach(link => {
        // 获取链接URL
        const href = link.getAttribute('href');

        // 根据URL判断链接类型并应用对应翻译
        if (href.includes('BullshitGenerator')) {
          link.textContent = map.linkTexts.bullshit;
        } else if (href.includes('hitokoto.cn')) {
          link.textContent = map.linkTexts.hitokoto;
        } else if (href.includes('you-get')) {
          link.textContent = map.linkTexts.youget;
        } else if (href.includes('sponsor.phosoft.cn')) {
          link.textContent = map.linkTexts.sponsor;
        } else if (href.includes('dsp.html')) {
          link.textContent = map.linkTexts.search;
        } else if (href.includes('forum.phosoft.cn')) {
          link.textContent = map.linkTexts.forum;
        } else if (href.includes('game.phosoft.cn')) {
          link.textContent = map.linkTexts.game;
        } else if (href.includes('ugly-standby')) {
          link.textContent = map.linkTexts.ugly;
        } else if (href.includes('awesome-iwb')) {
          link.textContent = map.linkTexts.awesome;
        }
        // 添加个人网站链接翻译
        else if (href.includes('about.phosoft.cn')) {
          link.textContent = map.linkTexts.official;
        } else if (href.includes('chenzr')) {
          link.textContent = map.linkTexts.chensite;
        } else if (href.includes('damon233')) {
          link.textContent = map.linkTexts.damonsite;
        } else if (href.includes('zhang2333')) {
          link.textContent = map.linkTexts.zpcin;
        } else if (href.includes('imfmkli')) {
          link.textContent = map.linkTexts.pigeon;
        } else if (href.includes('gdt.im')) {
          link.textContent = map.linkTexts.grassdev;
        } else if (href.includes('theme.estu.site')) {
          link.textContent = map.linkTexts.grasstheme;
        } else if (href.includes('cxl2020mc')) {
          link.textContent = map.linkTexts.chenxinlei;
        } else if (href.includes('awesome-iwb')) {
          link.textContent = map.linkTexts.awesome;
        }
      });
    }
  }

  // 页脚
  const footer = document.querySelector('.wu-block.wu-mw:last-child .wu-box.wu-shadow p.no-wrap a');
  if (footer) footer.innerHTML = `&copy;${map.year} - 张一&Phosoft ${map.footer}`;
  const powered = document.querySelectorAll('.wu-block.wu-mw:last-child .wu-box.wu-shadow p.no-wrap')[1];
  if (powered) powered.innerHTML = map.powered;

  // 页脚关于
  const about = document.querySelector('.wu-block.wu-mw:last-child .wu-box.wu-shadow p.no-wrap a');
  if (about && about.textContent.includes('版权所有')) {
    about.textContent = about.textContent.replace('版权所有', map.footer);
  }

  // 控制台输出
  const consoleInfo = map.console;
  if (consoleInfo) {
    // 如果有定义 ASCII 艺术 Logo，则先输出 Logo
    if (consoleInfo.logo) {
      // 检查是否有自定义样式
      if (consoleInfo.logoStyle) {
        console.log(`%c${consoleInfo.logo}`, consoleInfo.logoStyle);
      } else {
        console.log(consoleInfo.logo);
      }
    }
    console.log(`%c${consoleInfo.slogan}`, 'font-size: 16px; font-weight: bold;');
    console.log(consoleInfo.intro);
  }
}

// 确保DOM完全加载后应用语言，使用IP检测
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(applyGeoIpLang, 50); // 增加短暂延迟确保DOM完全准备好
});

window.setLang = function(lang) {
  if (!['zh-cn','zh-hk','zh-tw','en','en-sg','ja','wenyan','pinyin','zhuyin'].includes(lang)) return;
  window._forceLang = lang;
  applyPhosoftwebLang();
};

// 额外添加直接调用，以防DOMContentLoaded已经触发过
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(applyGeoIpLang, 10);
}
