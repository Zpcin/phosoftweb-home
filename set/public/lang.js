// phosoftweb-home 后台管理多语言包
const LANG_MAP = {
  'zh-cn': {
    title: 'about.html 内容管理',
    addSection: '添加新板块',
    saveChanges: '保存所有更改',
    saveChangesModified: '保存未保存的更改',
    checkConnection: '检查连接',
    guideTitle: 'Markdown编辑指南',
    guideBold: '加粗文本',
    guideItalic: '斜体文本',
    guideLink: '链接',
    guideH: '标题',
    guideH1: '一级标题',
    guideH2: '二级标题',
    guideH3: '三级标题',
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
    newContent: '请在这里输入内容...',
    dragToMove: '拖动调整顺序',
    moveUp: '上移',
    moveDown: '下移',
    delete: '删除',
    unsavedChanges: '您有未保存的更改，确定要离开吗？',
    saving: '正在保存更改...',
    saveFailed: '保存失败',
    saveSuccess: '所有更改已成功保存',
    saveError: '保存出现问题',
    saveFailedDetail: '保存失败',
    saved: '已保存',
    autoSaved: '自动保存成功',
    noSections: '没有信息板块，点击"添加新板块"按钮创建',
    shortcuts: '键盘快捷键',
    shortcutSave: 'Ctrl+S: 保存更改',
    shortcutAdd: 'Ctrl+N: 添加新板块',
    shortcutBold: 'Ctrl+B: 加粗文本',
    shortcutItalic: 'Ctrl+I: 斜体文本',
    shortcutLink: 'Ctrl+K: 插入链接'
  },
  'zh-hk': {
    title: 'about.html 內容管理',
    addSection: '添加新板塊',
    saveChanges: '儲存所有更改',
    saveChangesModified: '儲存未保存的更改',
    checkConnection: '檢查連接',
    guideTitle: 'Markdown編輯指南',
    guideBold: '粗體文本',
    guideItalic: '斜體文本',
    guideLink: '連結',
    guideH: '標題',
    guideH1: '一級標題',
    guideH2: '二級標題',
    guideH3: '三級標題',
    guideList: '列表',
    guideInlineCode: '行內代碼',
    guideCodeBlock: '代碼塊',
    guideBr: '所有換行會自動轉換為<br>標籤',
    loading: '正在加載內容...',
    confirmTitle: '確認操作',
    confirmYes: '確認',
    confirmNo: '取消',
    confirmMsg: '確定要刪除"{title}"板塊嗎？此操作無法撤銷。',
    apiStatus: 'API狀態',
    aboutPath: 'About.html路徑',
    fileExists: '文件存在',
    yes: '是',
    no: '否',
    error: '錯誤信息',
    section: '板塊',
    sectionTitle: '標題',
    sectionContent: '內容 (Markdown 格式)',
    preview: '預覽',
    newSection: '新板塊',
    newContent: '請在這裡輸入內容...',
    dragToMove: '拖動調整順序',
    moveUp: '上移',
    moveDown: '下移',
    delete: '刪除',
    unsavedChanges: '您有未保存的更改，確定要離開嗎？',
    saving: '正在儲存更改...',
    saveFailed: '儲存失敗',
    saveSuccess: '所有更改已成功儲存',
    saveError: '儲存出現問題',
    saveFailedDetail: '儲存失敗',
    saved: '已儲存',
    autoSaved: '自動儲存成功',
    noSections: '沒有信息板塊，點擊"添加新板塊"按鈕創建',
    shortcuts: '鍵盤快捷鍵',
    shortcutSave: 'Ctrl+S: 儲存更改',
    shortcutAdd: 'Ctrl+N: 添加新板塊',
    shortcutBold: 'Ctrl+B: 粗體文本',
    shortcutItalic: 'Ctrl+I: 斜體文本',
    shortcutLink: 'Ctrl+K: 插入連結'
  },
  'zh-tw': {
    title: 'about.html 內容管理',
    addSection: '新增板塊',
    saveChanges: '儲存所有變更',
    saveChangesModified: '儲存未保存的變更',
    checkConnection: '檢查連線',
    guideTitle: 'Markdown編輯指南',
    guideBold: '粗體文字',
    guideItalic: '斜體文字',
    guideLink: '連結',
    guideH: '標題',
    guideH1: '一級標題',
    guideH2: '二級標題',
    guideH3: '三級標題',
    guideList: '清單',
    guideInlineCode: '行內程式碼',
    guideCodeBlock: '程式碼區塊',
    guideBr: '所有換行會自動轉換為<br>標籤',
    loading: '正在載入內容...',
    confirmTitle: '確認操作',
    confirmYes: '確認',
    confirmNo: '取消',
    confirmMsg: '確定要刪除"{title}"板塊嗎？此操作無法復原。',
    apiStatus: 'API狀態',
    aboutPath: 'About.html路徑',
    fileExists: '檔案存在',
    yes: '是',
    no: '否',
    error: '錯誤訊息',
    section: '板塊',
    sectionTitle: '標題',
    sectionContent: '內容 (Markdown 格式)',
    preview: '預覽',
    newSection: '新板塊',
    newContent: '請在這裡輸入內容...',
    dragToMove: '拖動調整順序',
    moveUp: '上移',
    moveDown: '下移',
    delete: '刪除',
    unsavedChanges: '您有未保存的變更，確定要離開嗎？',
    saving: '正在儲存變更...',
    saveFailed: '儲存失敗',
    saveSuccess: '所有變更已成功儲存',
    saveError: '儲存出現問題',
    saveFailedDetail: '儲存失敗',
    saved: '已儲存',
    autoSaved: '自動儲存成功',
    noSections: '沒有資訊板塊，點擊"新增板塊"按鈕建立',
    shortcuts: '鍵盤快捷鍵',
    shortcutSave: 'Ctrl+S: 儲存變更',
    shortcutAdd: 'Ctrl+N: 新增板塊',
    shortcutBold: 'Ctrl+B: 粗體文字',
    shortcutItalic: 'Ctrl+I: 斜體文字',
    shortcutLink: 'Ctrl+K: 插入連結'
  },
  'en': {
    title: 'about.html Content Management',
    addSection: 'Add Section',
    saveChanges: 'Save All Changes',
    saveChangesModified: 'Save Unsaved Changes',
    checkConnection: 'Check Connection',
    guideTitle: 'Markdown Editing Guide',
    guideBold: 'Bold Text',
    guideItalic: 'Italic Text',
    guideLink: 'Link',
    guideH: 'Heading',
    guideH1: 'Heading 1',
    guideH2: 'Heading 2',
    guideH3: 'Heading 3',
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
    newContent: 'Please enter content here...',
    dragToMove: 'Drag to reorder',
    moveUp: 'Move up',
    moveDown: 'Move down',
    delete: 'Delete',
    unsavedChanges: 'You have unsaved changes. Are you sure you want to leave?',
    saving: 'Saving changes...',
    saveFailed: 'Save failed',
    saveSuccess: 'All changes saved successfully',
    saveError: 'Problem occurred during save',
    saveFailedDetail: 'Save failed',
    saved: 'Saved',
    autoSaved: 'Auto-saved successfully',
    noSections: 'No sections found. Click "Add Section" to create one.',
    shortcuts: 'Keyboard Shortcuts',
    shortcutSave: 'Ctrl+S: Save changes',
    shortcutAdd: 'Ctrl+N: Add new section',
    shortcutBold: 'Ctrl+B: Bold text',
    shortcutItalic: 'Ctrl+I: Italic text',
    shortcutLink: 'Ctrl+K: Insert link'
  },
  'en-sg': {
    title: 'about.html Content Management lah',
    addSection: 'Add Section ah',
    saveChanges: 'Save All Changes lor',
    saveChangesModified: 'Save Unsaved Changes now',
    checkConnection: 'Check Connection can?',
    guideTitle: 'Markdown Editing Guide lor',
    guideBold: 'Bold Text one',
    guideItalic: 'Italic Text ah',
    guideLink: 'Link',
    guideH: 'Heading',
    guideH1: 'Heading 1 ah',
    guideH2: 'Heading 2 lor',
    guideH3: 'Heading 3 can',
    guideList: 'List',
    guideInlineCode: 'Inline Code lor',
    guideCodeBlock: 'Code Block ah',
    guideBr: 'All line breaks will become <br> tags one',
    loading: 'Loading content lah...',
    confirmTitle: 'Confirm Action ah',
    confirmYes: 'Confirm lah',
    confirmNo: 'Cancel',
    confirmMsg: 'Sure want to delete section "{title}" or not? Cannot undo one.',
    apiStatus: 'API Status lor',
    aboutPath: 'About.html Path',
    fileExists: 'File Exists ah',
    yes: 'Yes',
    no: 'No lah',
    error: 'Error',
    section: 'Section',
    sectionTitle: 'Title',
    sectionContent: 'Content (Markdown) lor',
    preview: 'Preview ah',
    newSection: 'New Section',
    newContent: 'Please enter content here lah...',
    dragToMove: 'Drag to reorder lah',
    moveUp: 'Move up lor',
    moveDown: 'Move down can',
    delete: 'Delete ah',
    unsavedChanges: 'Got unsaved changes. Sure want to leave or not?',
    saving: 'Saving changes lah...',
    saveFailed: 'Save failed lor',
    saveSuccess: 'All changes saved already',
    saveError: 'Got problem saving ah',
    saveFailedDetail: 'Save failed lah',
    saved: 'Saved already',
    autoSaved: 'Auto-saved already lor',
    noSections: 'No sections found. Click "Add Section" to create one lah.',
    shortcuts: 'Keyboard Shortcuts ah',
    shortcutSave: 'Ctrl+S: Save changes lor',
    shortcutAdd: 'Ctrl+N: Add new section can',
    shortcutBold: 'Ctrl+B: Bold text one',
    shortcutItalic: 'Ctrl+I: Italic text ah',
    shortcutLink: 'Ctrl+K: Insert link lor'
  },
  'ja': {
    title: 'about.html コンテンツ管理',
    addSection: '新しいセクションを追加',
    saveChanges: 'すべて保存',
    saveChangesModified: '未保存の変更を保存',
    checkConnection: '接続を確認',
    guideTitle: 'Markdown編集ガイド',
    guideBold: '太字テキスト',
    guideItalic: '斜体テキスト',
    guideLink: 'リンク',
    guideH: '見出し',
    guideH1: '見出し1',
    guideH2: '見出し2',
    guideH3: '見出し3',
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
    newContent: 'ここに内容を入力してください...',
    dragToMove: 'ドラッグして順序を変更',
    moveUp: '上に移動',
    moveDown: '下に移動',
    delete: '削除',
    unsavedChanges: '保存されていない変更があります。本当に離れますか？',
    saving: '保存中...',
    saveFailed: '保存に失敗しました',
    saveSuccess: 'すべての変更が保存されました',
    saveError: '保存中に問題が発生しました',
    saveFailedDetail: '保存に失敗しました',
    saved: '保存済み',
    autoSaved: '自動保存されました',
    noSections: 'セクションがありません。「新しいセクションを追加」をクリックして作成してください。',
    shortcuts: 'キーボードショートカット',
    shortcutSave: 'Ctrl+S: 変更を保存',
    shortcutAdd: 'Ctrl+N: 新しいセクションを追加',
    shortcutBold: 'Ctrl+B: 太字テキスト',
    shortcutItalic: 'Ctrl+I: 斜体テキスト',
    shortcutLink: 'Ctrl+K: リンクを挿入'
  },
  'wenyan': {
    title: 'about.html 之管理',
    addSection: '增一板塊',
    saveChanges: '存諸更改',
    saveChangesModified: '存未存之更改',
    checkConnection: '察聯結',
    guideTitle: 'Markdown編撰指引',
    guideBold: '粗體文字',
    guideItalic: '斜體文字',
    guideLink: '連結',
    guideH: '標題',
    guideH1: '一級標題',
    guideH2: '二級標題',
    guideH3: '三級標題',
    guideList: '列表',
    guideInlineCode: '行內碼',
    guideCodeBlock: '碼塊',
    guideBr: '凡換行皆轉為<br>標籤',
    loading: '載入中...',
    confirmTitle: '確認',
    confirmYes: '是',
    confirmNo: '否',
    confirmMsg: '欲刪"{title}"板塊乎？此舉不可逆也。',
    apiStatus: 'API之狀',
    aboutPath: 'About.html之址',
    fileExists: '檔案存在',
    yes: '是',
    no: '否',
    error: '誤',
    section: '板塊',
    sectionTitle: '標題',
    sectionContent: '內容 (Markdown 格式)',
    preview: '預覽',
    newSection: '新板塊',
    newContent: '請輸入內容於此...',
    dragToMove: '拖之以調序',
    moveUp: '上移',
    moveDown: '下移',
    delete: '刪',
    unsavedChanges: '子有未存之更改，確欲離去乎？',
    saving: '存更改中...',
    saveFailed: '存更改失敗',
    saveSuccess: '諸更改已存',
    saveError: '存更改有誤',
    saveFailedDetail: '存更改失敗',
    saved: '已存',
    autoSaved: '自動已存',
    noSections: '無板塊，請點「增一板塊」以新增',
    shortcuts: '捷鍵',
    shortcutSave: 'Ctrl+S: 存更改',
    shortcutAdd: 'Ctrl+N: 增一板塊',
    shortcutBold: 'Ctrl+B: 粗體文',
    shortcutItalic: 'Ctrl+I: 斜體文',
    shortcutLink: 'Ctrl+K: 插連結'
  }
};

// 获取当前语言
function getLang() {
  // 优先使用本地存储的语言设置
  const savedLang = localStorage.getItem('setLang');
  if (savedLang && LANG_MAP[savedLang]) {
    return savedLang;
  }

  // 其次使用URL参数
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  if (langParam && LANG_MAP[langParam]) {
    return langParam;
  }

  // 如果主站已设置强制语言，使用主站语言
  if (window.parent && window.parent._forceLang && LANG_MAP[window.parent._forceLang]) {
    return window.parent._forceLang;
  }

  // 最后使用浏览器语言
  const browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();

  // 根据浏览器语言选择合适的语言
  if (browserLang === 'zh-tw') return 'zh-tw';
  else if (browserLang === 'zh-hk' || browserLang === 'zh-mo') return 'zh-hk';
  else if (browserLang.startsWith('zh')) return 'zh-cn';
  else if (browserLang.startsWith('ja')) return 'ja';
  else if (browserLang === 'en-sg') return 'en-sg';

  // 默认使用英语
  return 'en';
}

// 设置语言
function setLang(lang) {
  if (!LANG_MAP[lang]) return;

  // 保存语言设置到本地存储
  localStorage.setItem('setLang', lang);

  // 应用语言设置
  applyLang();
}

// 应用语言设置到UI
function applyLang() {
  const lang = getLang();
  const langData = LANG_MAP[lang];

  if (!langData) return;

  // 设置HTML的lang属性
  document.documentElement.lang = lang;

  // 处理所有带有data-i18n属性的元素
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (langData[key]) {
      el.innerHTML = langData[key];
    }
  });

  // 处理Markdown指南的特殊项
  const guideItems = document.querySelectorAll('[data-i18n-guide]');
  if (guideItems.length >= 8) {
    guideItems[0].innerHTML = `<strong>${langData.guideBold}</strong>: **文本** 或 __文本__`;
    guideItems[1].innerHTML = `<em>${langData.guideItalic}</em>: *文本* 或 _文本_`;
    guideItems[2].innerHTML = `<a href="#">${langData.guideLink}</a>: [链接文字](链接地址)`;
    guideItems[3].innerHTML = `${langData.guideH}: # 一级标题, ## 二级标题, ### 三级标题`;
    guideItems[4].innerHTML = `${langData.guideList}: - 列表项`;
    guideItems[5].innerHTML = `${langData.guideInlineCode}: \`代码\``;
    guideItems[6].innerHTML = `${langData.guideCodeBlock}: \`\`\`代码块内容\`\`\``;
    guideItems[7].innerHTML = `${langData.guideBr}`;
  }

  // 处理加载提示
  const loadingEl = document.querySelector('.loading');
  if (loadingEl) {
    loadingEl.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${langData.loading}`;
  }

  // 处理确认对话框
  const confirmTitle = document.querySelector('#confirmModal h2');
  if (confirmTitle) confirmTitle.textContent = langData.confirmTitle;

  const confirmYes = document.querySelector('#confirmYes');
  if (confirmYes) confirmYes.textContent = langData.confirmYes;

  const confirmNo = document.querySelector('#confirmNo');
  if (confirmNo) confirmNo.textContent = langData.confirmNo;

  // 更新动态生成的内容
  updateDynamicContent();
}

// 更新动态生成的内容
function updateDynamicContent() {
  // 在脚本.js中调用此函数以更新动态生成的内容
}

// 添加语言切换器
function addLangSwitcher() {
  // 创建语言切换器容器
  const switcherContainer = document.createElement('div');
  switcherContainer.className = 'lang-switcher';

  // 添加语言选项
  const languages = {
    'zh-cn': '简体中文',
    'zh-hk': '繁體中文(香港)',
    'zh-tw': '繁體中文(台灣)',
    'en': 'English',
    'en-sg': 'Singlish',
    'ja': '日本語',
    'wenyan': '文言文'
  };

  for (const [langCode, langName] of Object.entries(languages)) {
    const langOption = document.createElement('button');
    langOption.textContent = langName;
    langOption.className = 'lang-option';
    langOption.setAttribute('data-lang', langCode);

    // 如果是当前语言，添加active类
    if (langCode === getLang()) {
      langOption.classList.add('active');
    }

    // 添加点击事件
    langOption.addEventListener('click', () => {
      setLang(langCode);
      // 更新active类
      document.querySelectorAll('.lang-option').forEach(opt => opt.classList.remove('active'));
      langOption.classList.add('active');
    });

    switcherContainer.appendChild(langOption);
  }

  // 将语言切换器添加到页面
  const header = document.querySelector('header');
  if (header) {
    header.appendChild(switcherContainer);
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  // 应用语言设置
  applyLang();

  // 添加语言切换器
  addLangSwitcher();
});

// 导出全局函数
window.setLang = setLang;
window.getLang = getLang;
window.applyLang = applyLang;
window.updateDynamicContent = updateDynamicContent;
