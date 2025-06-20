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
      'ugly': '丑备用论坛页'
    },
    footer: '版权所有',
    powered: '此网站由 <a href="https://vercel.com/">Vercel</a>&nbsp;强力驱动',
    year: new Date().getFullYear(),
    about: '关于',
    // 额外配置
    config: {
      enableGeoIp: false,          // 是否启用 IP 地理位置检测
      disableBrowserLangDetect: false  // 是否禁用浏览器语言检测
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
      'game': 'Phosoft遊戲頁-掃���',
      'ugly': '醜備用論壇頁'
    },
    footer: '版權所有',
    powered: '呢個網站由 <a href="https://vercel.com/">Vercel</a>&nbsp;強力驅動',
    year: new Date().getFullYear(),
    about: '關於',
    // 额外配置
    config: {
      enableGeoIp: true,          // 是否启用 IP 地理位置检测
      disableBrowserLangDetect: false  // 是否禁用浏览器语言检测
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
      'ugly': '備用論壇頁'
    },
    footer: '版權所有',
    powered: '本網站由 <a href="https://vercel.com/">Vercel</a>&nbsp;強力驅動',
    year: new Date().getFullYear(),
    about: '關於',
    // 额外配置
    config: {
      enableGeoIp: true,          // 是否启用 IP 地理位置检测
      disableBrowserLangDetect: false  // 是否禁用浏览器语言检测
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
      'ugly': 'Ugly Backup Forum'
    },
    footer: 'All rights reserved',
    powered: 'Powered by <a href="https://vercel.com/">Vercel</a>',
    year: new Date().getFullYear(),
    about: 'About',
    // 额外配置
    config: {
      enableGeoIp: false,          // 英文版默认不启用 IP 检测
      disableBrowserLangDetect: false  // 是否禁用浏览器语言检测
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
      'ugly': 'Backup Forum Page lah'
    },
    footer: 'All rights reserved',
    powered: 'Powered by <a href="https://vercel.com/">Vercel</a> one',
    year: new Date().getFullYear(),
    about: 'About',
    // 额外配置
    config: {
      enableGeoIp: true,          // 新加坡英语启用 IP 检测
      disableBrowserLangDetect: true   // 新加坡英语禁用浏览器语言检测
    }
  },
  'ja': {
    welcome: 'ようこそ',
    site: 'フォソフトウェブページズ',
    promo: 'こちらは フォソフトウェブ Line のプ��モーションビデオです',
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
      'ugly': 'バックアップフォーラム'
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
    }
  }
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
  return new Promise((resolve, reject) => {
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
        // 控制台输出时将country相关字段全部映射为region相关字段
        const dataForLog = { ...data };
        if (dataForLog.country) dataForLog.region = dataForLog.country;
        if (dataForLog.country_code) dataForLog.region_code = dataForLog.country_code;
        if (dataForLog.country_name) dataForLog.region_name = dataForLog.country_name;
        // 删除country相关字段，保证控制台只显示region
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
        if (!data || !data.country_code) {
          console.warn('IP API返回数据格式不正确:', data);
          resolve(null);
          return;
        }
        resolve(data);
      })
      .catch(error => {
        console.error('获取IP信息失败:', error);
        resolve(null); // 失败时返回null但不中断流程
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
        }
        // 专有名词和个人网站保持原样
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
}

// 确保DOM完全加载后应用语言，使用IP检测
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(applyGeoIpLang, 50); // 增加短暂延迟确保DOM完全准备好
});

window.setLang = function(lang) {
  if (!['zh-cn','zh-hk','zh-tw','en','en-sg','ja'].includes(lang)) return;
  window._forceLang = lang;
  applyPhosoftwebLang();
};

// 额外添加直接调用，以防DOMContentLoaded已经触发过
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(applyGeoIpLang, 10);
}
