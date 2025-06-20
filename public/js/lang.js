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
    about: '关于'
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
    about: 'About'
  },
  'ja': {
    welcome: 'ようこそ',
    site: 'フォソフトウェブページズ',
    promo: 'こちらは フォソフトウェブ Line のプロモーションビデオです',
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
    about: 'について'
  }
};

function getPhosoftwebLang() {
  if (window._forceLang) return window._forceLang;
  const lang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  if (lang.startsWith('zh')) return 'zh-cn';
  if (lang.startsWith('ja')) return 'ja';
  return 'en';
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

// 确保 DOM 完全加载后再应用语言
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(applyPhosoftwebLang, 50); // 增加短暂延迟确保 DOM 完全准备好
});

window.setLang = function(lang) {
  if (!['zh-cn','en','ja'].includes(lang)) return;
  window._forceLang = lang;
  applyPhosoftwebLang();
};

// 额外添加直接调用，以防 DOMContentLoaded 已经触发过
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  setTimeout(applyPhosoftwebLang, 10);
}
