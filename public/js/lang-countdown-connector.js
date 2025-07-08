/**
 * 倒计时多语言连接器
 * 提供倒计时功能所需的多语言翻译
 */

// 倒计时多语言翻译
const COUNTDOWN_TRANSLATIONS = {
  'zh-cn': {
    jilinZhongkao: '距吉林中考',
    zhongkao: '距Zpcin中考',
    gaokao: '距Zpcin高考',
    days: '天',
    hours: '时',
    minutes: '分',
    seconds: '秒',
    over: '已过'
  },
  'zh-hk': {
    jilinZhongkao: '距吉林中考',
    zhongkao: '距Zpcin中考',
    gaokao: '距Zpcin高考',
    days: '日',
    hours: '時',
    minutes: '分',
    seconds: '秒',
    over: '已過'
  },
  'zh-tw': {
    jilinZhongkao: '距吉林中考',
    zhongkao: '距Zpcin中考',
    gaokao: '距Zpcin高考',
    days: '天',
    hours: '時',
    minutes: '分',
    seconds: '秒',
    over: '已過'
  },
  'en': {
    jilinZhongkao: 'Until Jilin ZhongKao',
    zhongkao: 'Until Zpcin ZhongKao',
    gaokao: 'Until Zpcin GaoKao',
    days: 'd',
    hours: 'h',
    minutes: 'm',
    seconds: 's',
    over: 'Past'
  },
  'en-sg': {
    jilinZhongkao: 'Until Jilin ZhongKao lah',
    zhongkao: 'Until Zpcin ZhongKao lor',
    gaokao: 'Until Zpcin GaoKao ah',
    days: 'd',
    hours: 'h',
    minutes: 'm',
    seconds: 's',
    over: 'Already past'
  },
  'ja': {
    jilinZhongkao: '吉林中考まで',
    zhongkao: 'Zpcin年中考まで',
    gaokao: 'Zpcin年高考まで',
    days: '日',
    hours: '時',
    minutes: '分',
    seconds: '秒',
    over: '過ぎた'
  },
  'wenyan': {
    jilinZhongkao: '距吉林中試',
    zhongkao: '距Zpcin中試',
    gaokao: '距Zpcin高試',
    days: '日',
    hours: '時',
    minutes: '刻',
    seconds: '秒',
    over: '已逾'
  },
  'pinyin': {
    jilinZhongkao: 'Jù Jílín Zhōngkǎo',
    zhongkao: 'Jù Zpcin Zhōngkǎo',
    gaokao: 'Jù Zpcin Gāokǎo',
    days: 'tiān',
    hours: 'shí',
    minutes: 'fēn',
    seconds: 'miǎo',
    over: 'Yǐ guò'
  },
  'zhuyin': {
    jilinZhongkao: 'ㄐㄩˋ ㄐㄧˊ ㄌㄧㄣˊ ㄓㄨㄥ ㄎㄠˇ',
    zhongkao: 'ㄐㄩˋ Zpcin ㄓㄨㄥ ㄎㄠˇ',
    gaokao: 'ㄐㄩˋ Zpcin ㄍㄠ ㄎㄠˇ',
    days: 'ㄊㄧㄢ',
    hours: 'ㄕˊ',
    minutes: 'ㄈㄣ',
    seconds: 'ㄇㄧㄠˇ',
    over: 'ㄧˇ ㄍㄨㄛˋ'
  }
};

/**
 * 获取当前语言的倒计时翻译
 * @param {string} lang - 语言代码
 * @returns {Object} 翻译对象
 */
window.getCountdownTranslation = function(lang) {
  // 检查 URL 参数中是否有语言设置
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang');

  // 优先使用 URL 参数中的语言
  const finalLang = urlLang || lang || 'zh-cn';

  // 如果提供的语言不存在，则使用英语作为默认语言
  if (!COUNTDOWN_TRANSLATIONS[finalLang]) {
    console.log('[倒计时多语言] 未找到语言:', finalLang, '使用默认语言:zh-cn');
    return COUNTDOWN_TRANSLATIONS['zh-cn'];
  }

  console.log('[倒计时多语言] 使用语言:', finalLang);
  return COUNTDOWN_TRANSLATIONS[finalLang];
};

/**
 * 立即更新倒计时语言
 * @param {string} lang - 语言代码
 */
function updateCountdownLanguage(lang) {
  if (!lang) return;

  console.log('[倒计时多语言] 更新倒计时语言:', lang);
  window.currentLang = lang;

  // 触发自定义事件通知倒计时组件更新语言
  const event = new CustomEvent('languageChanged', {
    detail: { lang: lang }
  });
  document.dispatchEvent(event);
}

/**
 * 监听语言变化事件，并通知倒计时组件
 */
document.addEventListener('DOMContentLoaded', function() {
  // 保存原始setLang函数的引用
  const originalSetLang = window.setLang;

  // 如果setLang函数存在，则替换它
  if (typeof originalSetLang === 'function') {
    window.setLang = function(lang) {
      // 调用原始的setLang函数
      const result = originalSetLang(lang);

      // 更新倒计时语言
      updateCountdownLanguage(lang);

      return result;
    };

    console.log('[倒计时多语言] 已成功挂载语言切换钩子');
  } else {
    console.warn('[倒计时多语言] 无法找到setLang函数，语言切换可能不会影响倒计时');
  }

  // 初始化时，从全局获取当前语言
  if (window.getPhosoftwebLang) {
    const currentLang = window.getPhosoftwebLang();
    window.currentLang = currentLang;
    console.log('[倒计时多语言] 初始语言:', currentLang);
  }
});

// 在控制台输出调试信息
console.log('[倒计时多语言] 倒计时多语言连接器已加载');
