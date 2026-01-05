// 关于页面多语言内容切换脚本
// 最后更新时间: 2025-08-08T08:30:20.730Z
// 最后更新语言: zh-cn

// 关于页面多语言内容配置
const ABOUT_TRANSLATIONS = {
  "zh-cn": [
    {
      "title": "网站介绍",
      "content": "这是一个个人网站，弄着玩的，基于人脉和AI编写<br><br>"
    },
    {
      "title": "我的名字",
      "content": "我是溪夏坡Zpcin，这个名字中\"Zpcin\"读作 /ˈzɪpsɪn/，<br>                源于我姓氏首字母(Z)加PC(个人电脑)再加in，<br>                溪夏坡我妈开玩笑是农村西下坡的地方是新加坡，<br>                然后有我想要的感觉。<br><br><br>"
    },
    {
      "title": "所在地",
      "content": "我是吉林省松原市前郭尔罗斯<br>                蒙古族自治县人，一个小县城。<br><br>"
    },
    {
      "title": "我的学校",
      "content": "现在在前郭尔罗斯蒙古族自治县第二高级中学，<br>小学：前郭 钻井（两天）—>五小（一年）——>哈达<br><br>"
    },
    {
      "title": "我的身体",
      "content": "我闻到yān身体会很难受，脑袋疼，全身痒，<br>忍不了，没法学习，没有办法。<br><br>"
    },
    {
      "title": "我的学习",
      "content": "没办法的事情，比大部分人好<br><br>"
    },
    {
      "title": "旅游经历",
      "content": "尽管生活在小县城，但我去过不少地方，<br>                包括朝鲜、俄罗斯、香港、上海和新加坡等地。<br>                香港和上海是初中时期妈妈为鼓励我而安排的<br>                香港印象最深我喜欢刷卡和地铁<br>                新加坡也很好<br><br><br><br>"
    },
    {
      "title": "我的兴趣",
      "content": "我喜欢轨道交通，银行卡，公交卡，其他地区纸币<br><br><br><br>"
    },
    {
      "title": "我和网络",
      "content": "2019年我注册了B站账号，这对我影响很大，让我接触到了更多知识，<br>                然后我加了很多QQ群现实中没人说话，<br>                讨厌短视频和打打杀杀的游戏<br><br>"
    },
    {
      "title": "联系方式",
      "content": "如果您有任何问题或建议，可以通过以下方式联系我：<br><br>                邮箱：yi3677@qq.com<br><br>"
    }
  ],
  "zh-hk": [
    {
      "title": "網站介紹",
      "content": "呢個係個人網站，玩吓嘅，基於人脈同AI寫嘅<br><br>"
    },
    {
      "title": "我嘅名字",
      "content": "我係溪夏坡Zpcin，呢個名入面\"Zpcin\"讀作 /ˈzɪpsɪn/，<br>源於我姓氏首字母(Z)加PC(個人電腦)再加in，<br>溪夏坡我媽開玩笑係農村西下坡嘅地方係新加坡，<br>然後有我想要嘅感覺。<br><br><br>"
    },
    {
      "title": "所在地",
      "content": "我係吉林省松原市前郭爾羅斯<br>蒙古族自治縣人，一個小縣城。<br><br>"
    },
    {
      "title": "我嘅學校",
      "content": "而家喺前郭爾羅斯蒙古族自治縣第二高級中學，<br>小學：前郭 鑽井（兩日）—>五小（一年）——>哈達<br>"
    },
    {
      "title": "我嘅身體",
      "content": "我聞到yān身體會好唔舒服，頭痛，全身癢，<br>忍唔到，冇法學習，冇辦法。<br><br>"
    },
    {
      "title": "我嘅學習",
      "content": "冇辦法嘅事情，好過大部分人<br><br>"
    },
    {
      "title": "旅遊經歷",
      "content": "雖然住喺小縣城，但我去過唔少地方，<br>包括朝鮮、俄羅斯、香港、上海同新加坡等地。<br>香港同上海係初中時期媽媽為鼓勵我而安排嘅<br>香港印象最深我鍾意刷卡同地鐵<br>新加坡都好好<br><br><br><br>"
    },
    {
      "title": "我嘅興趣",
      "content": "我鍾意軌道交通，銀行卡，公交卡，其他地區紙幣<br><br><br><br>"
    },
    {
      "title": "我同網絡",
      "content": "2019年我註冊咗B站賬號，呢個對我影響好大，令我接觸到更多知識，<br>然後我加咗好多QQ群現實中冇人講嘢，<br>討厭短視頻同打打殺殺嘅遊戲<br><br>"
    },
    {
      "title": "聯繫方式",
      "content": "如果您有任何問題或建議，可以通過以下方式聯繫我：<br><br>郵箱：yi3677@qq.com<br><br>"
    }
  ],
  "zh-tw": [
    {
      "title": "網站介紹",
      "content": "這是一個個人網站，弄著玩的，基於人脈和AI編寫<br><br>"
    },
    {
      "title": "我的名字",
      "content": "我是溪夏坡Zpcin，這個名字中\"Zpcin\"讀作 /ˈzɪpsɪn/，<br>源於我姓氏首字母(Z)加PC(個人電腦)再加in，<br>溪夏坡我媽開玩笑是農村西下坡的地方是新加坡，<br>然後有我想要的感覺。<br><br><br>"
    },
    {
      "title": "所在地",
      "content": "我是吉林省松原市前郭爾羅斯<br>蒙古族自治縣人，一個小縣城。<br><br>"
    },
    {
      "title": "我的學校",
      "content": "現在在前郭爾羅斯蒙古族自治縣第二高級中學，<br>小學：前郭 鑽井（兩天）—>五小（一年）——>哈達<br><br>"
    },
    {
      "title": "我的身體",
      "content": "我聞到yān身體會很不舒服，頭痛，全身癢，<br>忍不了，沒法學習，沒有辦法。<br><br>"
    },
    {
      "title": "我的學習",
      "content": "沒辦法的事情，比大部分人好<br><br>"
    },
    {
      "title": "旅遊經歷",
      "content": "儘管生活在小縣城，但我去過不少地方，<br>包括朝鮮、俄羅斯、香港、上海和新加坡等地。<br>香港和上海是初中時期媽媽為鼓勵我而安排的<br>香港印象最深我喜歡刷卡和地鐵<br>新加坡也很好<br><br><br><br>"
    },
    {
      "title": "我的興趣",
      "content": "我喜歡軌道交通，銀行卡，公車卡，其他地區紙幣<br><br><br><br>"
    },
    {
      "title": "我和網路",
      "content": "2019年我註冊了B站帳號，這對我影響很大，讓我接觸到了更多知識，<br>然後我加了很多QQ群現實中沒人說話，<br>討厭短視頻和打打殺殺的遊戲<br><br>"
    },
    {
      "title": "聯絡方式",
      "content": "如果您有任何問題或建議，可以透過以下方式聯絡我：<br><br>電子郵件：yi3677@qq.com<br><br>"
    }
  ],
  "en": [
    {
      "title": "Website Introduction",
      "content": "This is a personal website, made for fun, based on networking and AI writing<br><br>"
    },
    {
      "title": "My Name",
      "content": "I am Xixiapo Zpcin, where \"Zpcin\" is pronounced as /ˈzɪpsɪn/,<br>derived from my surname's initial (Z) plus PC (Personal Computer) plus 'in',<br>Xixiapo was my mom's joke that the 'Western Downhill' (Xi Xia Po) village sounds like Singapore (Xin Jia Po),<br>and it gives me the feeling I want.<br><br><br>"
    },
    {
      "title": "Location",
      "content": "I'm from Qian Gorlos Mongol Autonomous County,<br>Songyuan City, Jilin Province, a small county.<br><br>"
    },
    {
      "title": "My School",
      "content": "I'm currently at the Second Senior High School of Qian Gorlos Mongol Autonomous County,<br>Elementary school: Qianguo Drilling (two days) -> No.5 Elementary (one year) -> Hada<br><br><br>"
    },
    {
      "title": "My Health",
      "content": "When I smell smoke, my body feels terrible, my head hurts, and I itch all over,<br>I can't bear it, can't study, there's no way around it.<br><br>"
    },
    {
      "title": "My Studies",
      "content": "It's a hopeless situation, it's better than most people.<br><br>"
    },
    {
      "title": "Travel Experiences",
      "content": "Despite living in a small county, I've been to many places,<br>including North Korea, Russia, Hong Kong, Shanghai, and Singapore.<br>Hong Kong and Shanghai were arranged by my mom during middle school to encourage me.<br>Hong Kong left the deepest impression; I like using cards and the subway there.<br>Singapore was also very good.<br><br><br><br>"
    },
    {
      "title": "My Interests",
      "content": "I like rail transit, bank cards, transit cards, and banknotes from different regions<br><br><br><br>"
    },
    {
      "title": "Me and the Internet",
      "content": "I registered a Bilibili account in 2019, which has greatly influenced me and exposed me to more knowledge,<br>Then I joined many QQ groups though nobody talks in real life,<br>I dislike short videos and violent games<br><br>"
    },
    {
      "title": "Contact Information",
      "content": "If you have any questions or suggestions, you can contact me through:<br><br>Email: yi3677@qq.com<br><br>"
    }
  ],
  "ja": [
    {
      "title": "ウェブサイト紹介",
      "content": "これは個人的なウェブサイトで、楽しむために作られ、人脈とAIの文章に基づいています<br><br>"
    },
    {
      "title": "私の名前",
      "content": "私は溪夏坡（シーシャポ）Zpcinです。「Zpcin」は /ˈzɪpsɪn/ と発音し、<br>私の苗字の頭文字(Z)にPC(パソコン)を加え、さらにinを付けたものです。<br>溪夏坡は母の冗談で、田舎の「西の下り坂（シーシャポ）」の発音が「シンガポール（シンジャポ）」に似ていることから来ており、<br>私が求めている感覚を与えてくれます。<br><br><br>"
    },
    {
      "title": "居住地",
      "content": "吉林省松原市前郭爾羅斯<br>モンゴル族自治県の出身で、小さな県です。<br><br>"
    },
    {
      "title": "私の学校",
      "content": "現在、前郭爾羅斯モンゴル族自治県第二高等学校に在学中です。<br>小学校：前郭 鑽井小学校（二日間）→五小（一年間）→哈達<br><br><br>"
    },
    {
      "title": "私の健康",
      "content": "けむりのにおいを嗅ぐと体調が悪くなり、頭痛がして全身がかゆくなります。<br>耐えられず、勉強もできず、どうすることもできません。<br><br>"
    },
    {
      "title": "私の勉強",
      "content": "どうしようもない状況で、それはほとんどの人より優れている。<br>"
    },
    {
      "title": "旅行経験",
      "content": "小さな県に住んでいるにもかかわらず、多くの場所を訪れました。<br>北朝鮮、ロシア、香港、上海、シンガポールなどを含みます。<br>香港と上海は中学校時代に母が私を励ますために手配してくれました。<br>香港が最も印象深く、カードの使用や地下鉄が好きです。<br>シンガポールもとても良かったです。<br><br><br><br>"
    },
    {
      "title": "私の趣味",
      "content": "鉄道交通、銀行カード、交通カード、他の地域の紙幣が好きです<br><br><br><br>"
    },
    {
      "title": "私とインターネット",
      "content": "2019年にBilibiliアカウントを登録しました。これは私に大きな影響を与え、より多くの知識に触れる機会を与えてくれました。<br>その後、多くのQQグループに参加しましたが、現実では誰も話しません。<br>短い動画や暴力的なゲームは嫌いです<br><br>"
    },
    {
      "title": "連絡先",
      "content": "ご質問やご提案がございましたら、以下の方法でご連絡ください：<br><br>メール：yi3677@qq.com<br><br><br>"
    }
  ]
};

// 从已有的翻译对象获取多语言内容
let aboutTranslations = ABOUT_TRANSLATIONS;

// 获取当前语言
function getCurrentLang() {
  // 优先检查URL参数中的lang参数
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('lang')) {
    const langParam = urlParams.get('lang');
    // 确认语言参数是有效的
    if (langParam && Object.keys(ABOUT_TRANSLATIONS).includes(langParam)) {
      return langParam;
    }
  }

  // 其次检查全局设置或window._forceLang
  if (window._forceLang) {
    return window._forceLang;
  }

  // 尝试从lang.js获取语言设置（如果已经通过IP地理位置或浏览器语言设置了）
  if (window.PHOSOFTWEB_LANG_MAP && typeof window.getPhosoftwebLang === 'function') {
    const phosoftLang = window.getPhosoftwebLang();
    if (phosoftLang && Object.keys(ABOUT_TRANSLATIONS).includes(phosoftLang)) {
      return phosoftLang;
    }
  }

  // 最后尝试从浏览器语言设置判断
  const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
  if (browserLang.startsWith('zh-tw')) {
    return 'zh-tw';
  } else if (browserLang.startsWith('zh-hk') || browserLang.startsWith('zh-mo')) {
    return 'zh-hk';
  } else if (browserLang.startsWith('zh')) {
    return 'zh-cn';
  } else if (browserLang.startsWith('ja')) {
    return 'ja';
  } else if (browserLang === 'en-sg') {
    return 'en-sg';
  } else if (browserLang.startsWith('en')) {
    return 'en';
  }

  // 默认返回中文
  return 'zh-cn';
}

// 应用内容翻译
function applyContentTranslations() {
  // 获取当前语言
  const currentLang = getCurrentLang();

  // 获取当前语言的翻译数据，如果没有则使用中文
  const translations = aboutTranslations[currentLang] || aboutTranslations['zh-cn'];

  if (!translations) {
    console.warn(`未找到 ${currentLang} 语言的翻译数据`);
    return;
  }

  // 先保存当前活动项，以便后续恢复
  const currentActiveSection = document.querySelector('.active-content');
  let activeIndex = 0;
  if (currentActiveSection) {
    const sections = Array.from(document.querySelectorAll('#content .info-section'));
    activeIndex = sections.indexOf(currentActiveSection);
    if (activeIndex < 0) activeIndex = 0;
  }

  // 获取所有信息板块
  const sections = document.querySelectorAll('#content .info-section');

  // 应用翻译
  sections.forEach((section, index) => {
    // 只处理存在的翻译项
    if (translations[index]) {
      const titleEl = section.querySelector('.info-title');
      const contentEl = section.querySelector('.info-content');

      if (titleEl && contentEl) {
        // 保存原始标题供侧边栏使用
        const originalTitle = translations[index].title;
        section.setAttribute('data-original-title', originalTitle);

        // 应用翻译的标题和内容
        titleEl.innerHTML = translations[index].title;
        contentEl.innerHTML = translations[index].content;
      }
    }
  });

  // 更新左侧导航标题
  updateSidebarTitles();

  // 确保预设的动画类被应用
  setTimeout(function() {
    // 如果prepareTextAnimations函数存在，则调用它
    if (typeof prepareTextAnimations === 'function') {
      prepareTextAnimations();

      // 恢复当前活动的内容和动画
      const newActiveSections = document.querySelectorAll('#content .info-section');
      if (newActiveSections.length > 0) {
        const newActiveSection = newActiveSections[activeIndex < newActiveSections.length ? activeIndex : 0];
        if (newActiveSection && typeof playTextAnimations === 'function') {
          playTextAnimations(newActiveSection);
        }
      }
    }
  }, 100);
}

// 更新侧边栏标题
function updateSidebarTitles() {
  const sidebarItems = document.querySelectorAll("#sidebar .info-section");
  const contentSections = document.querySelectorAll("#content .info-section");
  const currentLang = getCurrentLang();
  const langData = ABOUT_LANG_MAP[currentLang] || ABOUT_LANG_MAP['zh-cn'];
  const aboutText = langData?.about || '关于';

  sidebarItems.forEach((item, index) => {
    if (contentSections[index]) {
      const titleText = contentSections[index].getAttribute('data-original-title') ||
                       contentSections[index].querySelector('.info-title')?.textContent || '';
      item.innerText = aboutText + titleText + "...";
    }
  });
}

// 监听语言变更事件
function setupLanguageChangeListener() {
  // 创建一个自定义事件监听器，当语言改变时更新内容
  document.addEventListener('language-changed', function() {
    applyContentTranslations();
    // 应用UI元素翻译（来自about.js中的applyAboutLang函数）
    if (typeof applyAboutLang === 'function') {
      applyAboutLang();
    }
  });
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
  // 首先检查URL参数中是否有lang参数
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('lang')) {
    const langParam = urlParams.get('lang');
    if (langParam && Object.keys(ABOUT_TRANSLATIONS).includes(langParam)) {
      window._forceLang = langParam;
      console.log(`从URL参数检测到语言: ${langParam}`);
    }
  }

  // 尝试使用主站的IP地理位置检测功能
  if (typeof window.applyGeoIpLang === 'function') {
    try {
      window.applyGeoIpLang();
      console.log('正在使用主站IP地理位置检测功能...');
    } catch (error) {
      console.warn('无法使用主站IP地理位置检测功能:', error);
    }
  }

  // 确保页面完全加载后才应用翻译
  setTimeout(function() {
    applyContentTranslations();
    setupLanguageChangeListener();

    // 如果主站已经有语言设置，尝试同步
    if (window.PHOSOFTWEB_LANG_MAP && !window._forceLang) {
      // 检查是否有来自主站的语言设置
      if (typeof window.getPhosoftwebLang === 'function') {
        const phosoftLang = window.getPhosoftwebLang();
        if (phosoftLang && Object.keys(ABOUT_TRANSLATIONS).includes(phosoftLang)) {
          window._forceLang = phosoftLang;
          applyContentTranslations();
          console.log(`从主站同步语言设置: ${phosoftLang}`);
        }
      }
    }

    // 记录当前语言
    console.log(`当前使用的语言: ${getCurrentLang()}`);
  }, 300);
});

// 提供全局方法以便从其他脚本调用
window.changeAboutLanguage = function(lang) {
  if (lang && typeof lang === 'string') {
    window._forceLang = lang;
    applyContentTranslations();
    // 触发语言变更事件
    document.dispatchEvent(new CustomEvent('language-changed'));

    // 记录到控制台
    console.log(`语言已切换到: ${lang}`);
    return true;
  }
  return false;
};