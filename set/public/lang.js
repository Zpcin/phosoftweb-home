// phosoftweb-home 后台管理多语言包
const LANG_MAP = {
  'zh-cn': {
    title: 'about.html 内容管理',
    addSection: '添加新板块',
    saveChanges: '保存所有更改',
    checkConnection: '检查连接',
    guideTitle: 'Markdown编辑指南',
    guideBold: '加粗文本',
    guideItalic: '斜体文本',
    guideLink: '链接',
    guideH: '标题',
    guideList: '列表',
    guideInlineCode: '行内代码',
    guideCodeBlock: '代码块',
    guideBr: '所有换行会自动转换为<br>标签',
    loading: '正在加载内容...',
    confirmTitle: '确认操作',
    confirmYes: '确认',
    confirmNo: '取消',
    confirmMsg: '确定要删除"{title}"板块吗？此操作无法撤销。',
    apiStatus: 'API状态',
    aboutPath: 'About.html路径',
    fileExists: '文件存在',
    yes: '是',
    no: '否',
    error: '错误信息',
    section: '板块',
    sectionTitle: '标题',
    sectionContent: '内容 (Markdown 格式)',
    preview: '预览',
    newSection: '新板块',
    newContent: '请在这里输入内容...'
  },
  'en': {
    title: 'about.html Content Management',
    addSection: 'Add Section',
    saveChanges: 'Save All Changes',
    checkConnection: 'Check Connection',
    guideTitle: 'Markdown Editing Guide',
    guideBold: 'Bold Text',
    guideItalic: 'Italic Text',
    guideLink: 'Link',
    guideH: 'Heading',
    guideList: 'List',
    guideInlineCode: 'Inline Code',
    guideCodeBlock: 'Code Block',
    guideBr: 'All line breaks will be converted to <br> tags',
    loading: 'Loading content...',
    confirmTitle: 'Confirm Action',
    confirmYes: 'Confirm',
    confirmNo: 'Cancel',
    confirmMsg: 'Are you sure to delete section "{title}"? This action cannot be undone.',
    apiStatus: 'API Status',
    aboutPath: 'About.html Path',
    fileExists: 'File Exists',
    yes: 'Yes',
    no: 'No',
    error: 'Error',
    section: 'Section',
    sectionTitle: 'Title',
    sectionContent: 'Content (Markdown)',
    preview: 'Preview',
    newSection: 'New Section',
    newContent: 'Please enter content here...'
  },
  'ja': {
    title: 'about.html コンテンツ管理',
    addSection: '新しいセクションを追加',
    saveChanges: 'すべて保存',
    checkConnection: '接続を確認',
    guideTitle: 'Markdown編集ガイド',
    guideBold: '太字テキスト',
    guideItalic: '斜体テキスト',
    guideLink: 'リンク',
    guideH: '見出し',
    guideList: 'リスト',
    guideInlineCode: 'インラインコード',
    guideCodeBlock: 'コードブロック',
    guideBr: 'すべての改行は<br>タグに変換されます',
    loading: 'コンテンツを読み込み中...',
    confirmTitle: '操作の確認',
    confirmYes: '確認',
    confirmNo: 'キャンセル',
    confirmMsg: '「{title}」セクションを削除しますか？この操作は元に戻せません。',
    apiStatus: 'APIステータス',
    aboutPath: 'About.htmlパス',
    fileExists: 'ファイル存在',
    yes: 'はい',
    no: 'いいえ',
    error: 'エラー',
    section: 'セクション',
    sectionTitle: 'タイトル',
    sectionContent: '内容 (Markdown形式)',
    preview: 'プレビュー',
    newSection: '新しいセクション',
    newContent: 'ここに内容を入力してください...'
  }
};

function getLang() {
  if (window._forceLang) return window._forceLang;
  const lang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  if (lang.startsWith('zh')) return 'zh-cn';
  if (lang.startsWith('ja')) return 'ja';
  return 'en';
}

function applyLang() {
  const lang = getLang();
  const map = LANG_MAP[lang];
  if (!map) return;
  // 标题
  const h1 = document.querySelector('[data-i18n="title"]');
  if (h1) h1.innerHTML = map.title;
  // 按钮
  const btnAdd = document.querySelector('[data-i18n="addSection"]');
  if (btnAdd) btnAdd.innerHTML = '<i class="fas fa-plus"></i> ' + map.addSection;
  const btnSave = document.querySelector('[data-i18n="saveChanges"]');
  if (btnSave) btnSave.innerHTML = '<i class="fas fa-save"></i> ' + map.saveChanges;
  const btnCheck = document.querySelector('[data-i18n="checkConnection"]');
  if (btnCheck) btnCheck.innerHTML = '<i class="fas fa-sync"></i> ' + map.checkConnection;
  // 指南
  const guideTitle = document.querySelector('[data-i18n="guideTitle"]');
  if (guideTitle) guideTitle.innerHTML = '<i class="fas fa-info-circle"></i> ' + map.guideTitle;
  const guideLis = document.querySelectorAll('[data-i18n-guide]');
  const guideKeys = ['guideBold','guideItalic','guideLink','guideH','guideList','guideInlineCode','guideCodeBlock','guideBr'];
  guideLis.forEach((li, i) => { if(map[guideKeys[i]]) li.innerHTML = li.innerHTML.replace(/:.*/, ': ' + map[guideKeys[i]]); });
  // 加载中
  const loading = document.querySelector('.loading');
  if (loading) loading.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ' + map.loading;
  // 确认弹窗
  const confirmTitle = document.querySelector('#confirmModal h2');
  if (confirmTitle) confirmTitle.textContent = map.confirmTitle;
  const confirmYes = document.querySelector('#confirmYes');
  if (confirmYes) confirmYes.textContent = map.confirmYes;
  const confirmNo = document.querySelector('#confirmNo');
  if (confirmNo) confirmNo.textContent = map.confirmNo;
}

// 控制台切换语言
window.setLang = function(lang) {
  if (!['zh-cn','en','ja'].includes(lang)) return;
  window._forceLang = lang;
  applyLang();
};

document.addEventListener('DOMContentLoaded', applyLang);

