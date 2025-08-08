const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs-extra');

// 保持对窗口对象的全局引用，如果你不这样做，当 JavaScript 对象被垃圾回收时，窗口会被自动关闭
let mainWindow;

// 文件路径配置
const ABOUT_LANG_FILE = path.join(__dirname, '..', '..', 'public', 'js', 'about-lang.js');
const BACKUP_DIR = path.join(__dirname, 'backups');

// 确保备份目录存在
async function ensureBackupDir() {
    try {
        await fs.ensureDir(BACKUP_DIR);
    } catch (error) {
        console.error('创建备份目录失败:', error);
    }
}

// 简单的 Markdown 转 HTML 函数
function markdownToHtml(text) {
    if (!text) return '';
    
    return text
        // 转换粗体 **text** 或 __text__
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/__(.*?)__/g, '<strong>$1</strong>')
        
        // 转换斜体 *text* 或 _text_
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/_(.*?)_/g, '<em>$1</em>')
        
        // 转换链接 [text](url)
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
        
        // 转换换行为 <br>
        .replace(/\n/g, '<br>')
        
        // 转换段落（双换行）
        .replace(/<br><br>/g, '<br><br>');
}

// HTML 转 Markdown 函数
function htmlToMarkdown(html) {
    if (!html) return '';
    
    return html
        // 转换粗体
        .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
        .replace(/<b>(.*?)<\/b>/g, '**$1**')
        
        // 转换斜体
        .replace(/<em>(.*?)<\/em>/g, '*$1*')
        .replace(/<i>(.*?)<\/i>/g, '*$1*')
        
        // 转换链接
        .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/g, '[$2]($1)')
        
        // 转换换行
        .replace(/<br\s*\/?>/g, '\n')
        
        // 移除其他HTML标签
        .replace(/<[^>]*>/g, '');
}

// 读取 about-lang.js 文件
async function readAboutLangFile() {
    try {
        if (!await fs.pathExists(ABOUT_LANG_FILE)) {
            return { error: `文件不存在: ${ABOUT_LANG_FILE}` };
        }
        
        const content = await fs.readFile(ABOUT_LANG_FILE, 'utf8');
        
        // 提取 ABOUT_TRANSLATIONS 对象
        const match = content.match(/const ABOUT_TRANSLATIONS = ({[\s\S]*?});/);
        if (!match) {
            return { error: '未找到 ABOUT_TRANSLATIONS 对象' };
        }
        
        // 使用 eval 解析对象（注意：在生产环境中应该使用更安全的方法）
        const translationsStr = match[1];
        const translations = eval(`(${translationsStr})`);
        
        return { success: true, content, translations };
    } catch (error) {
        return { error: `读取文件失败: ${error.message}` };
    }
}

// 创建备份
async function createBackup() {
    try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupPath = path.join(BACKUP_DIR, `about-lang-${timestamp}.js`);
        
        if (await fs.pathExists(ABOUT_LANG_FILE)) {
            await fs.copy(ABOUT_LANG_FILE, backupPath);
            return { success: true, backupPath };
        }
        return { error: '源文件不存在' };
    } catch (error) {
        return { error: `创建备份失败: ${error.message}` };
    }
}

// 保存文件
async function saveAboutLangFile(translations) {
    try {
        // 创建备份
        await createBackup();
        
        // 生成新的文件内容
        const timestamp = new Date().toISOString();
        const translationsStr = JSON.stringify(translations, null, 2);
        
        const newContent = `// 关于页面多语言内容切换脚本
// 最后更新时间: ${timestamp}
// 最后更新语言: zh-cn

// 关于页面多语言内容配置
const ABOUT_TRANSLATIONS = ${translationsStr};

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
    console.warn(\`未找到 \${currentLang} 语言的翻译数据\`);
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
      console.log(\`从URL参数检测到语言: \${langParam}\`);
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
          console.log(\`从主站同步语言设置: \${phosoftLang}\`);
        }
      }
    }

    // 记录当前语言
    console.log(\`当前使用的语言: \${getCurrentLang()}\`);
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
    console.log(\`语言已切换到: \${lang}\`);
    return true;
  }
  return false;
};`;

        await fs.writeFile(ABOUT_LANG_FILE, newContent, 'utf8');
        return { success: true };
    } catch (error) {
        return { error: `保存文件失败: ${error.message}` };
    }
}

// 获取备份列表
async function getBackupList() {
    try {
        const files = await fs.readdir(BACKUP_DIR);
        const backupFiles = files
            .filter(file => file.startsWith('about-lang-') && file.endsWith('.js'))
            .sort()
            .reverse();

        const backupList = [];
        for (const file of backupFiles) {
            const filePath = path.join(BACKUP_DIR, file);
            const stats = await fs.stat(filePath);
            backupList.push({
                name: file,
                size: stats.size,
                mtime: stats.mtime.toISOString(),
                path: filePath
            });
        }

        return { success: true, backups: backupList };
    } catch (error) {
        return { error: `读取备份列表失败: ${error.message}` };
    }
}

// 恢复备份
async function restoreBackup(backupPath) {
    try {
        // 先备份当前文件
        await createBackup();
        
        // 恢复选中的备份
        await fs.copy(backupPath, ABOUT_LANG_FILE);
        return { success: true };
    } catch (error) {
        return { error: `恢复备份失败: ${error.message}` };
    }
}

function createWindow() {
    // 创建浏览器窗口
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        icon: path.join(__dirname, 'icon.png'),
        title: 'About-lang.js 编辑器',
        show: false
    });

    // 加载应用的 index.html
    mainWindow.loadFile('index.html');

    // 当窗口准备好时显示
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // 当窗口关闭时发出
    mainWindow.on('closed', function () {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 与此同时，你应该删除相应的元素。
        mainWindow = null;
    });

    // 开发者工具
    if (process.argv.includes('--dev')) {
        mainWindow.webContents.openDevTools();
    }
}

// Electron 初始化完成，准备创建窗口
app.whenReady().then(async () => {
    await ensureBackupDir();
    createWindow();

    app.on('activate', function () {
        // 在 macOS 上，当点击 dock 图标并且没有其他窗口打开时，
        // 通常在应用程序中重新创建一个窗口。
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// 当全部窗口关闭时退出
app.on('window-all-closed', function () {
    // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
    // 否则绝大部分应用及其菜单栏会保持激活。
    if (process.platform !== 'darwin') app.quit();
});

// IPC 事件处理
ipcMain.handle('read-about-lang-file', readAboutLangFile);
ipcMain.handle('save-about-lang-file', async (event, translations) => {
    return await saveAboutLangFile(translations);
});
ipcMain.handle('markdown-to-html', (event, text) => {
    return markdownToHtml(text);
});
ipcMain.handle('html-to-markdown', (event, html) => {
    return htmlToMarkdown(html);
});
ipcMain.handle('create-backup', createBackup);
ipcMain.handle('get-backup-list', getBackupList);
ipcMain.handle('restore-backup', async (event, backupPath) => {
    return await restoreBackup(backupPath);
});

// 文件对话框
ipcMain.handle('show-open-dialog', async () => {
    const result = await dialog.showOpenDialog(mainWindow, {
        properties: ['openFile'],
        filters: [
            { name: 'Markdown Files', extensions: ['md', 'markdown'] },
            { name: 'All Files', extensions: ['*'] }
        ]
    });
    return result;
});

ipcMain.handle('show-save-dialog', async () => {
    const result = await dialog.showSaveDialog(mainWindow, {
        filters: [
            { name: 'Markdown Files', extensions: ['md'] },
            { name: 'All Files', extensions: ['*'] }
        ]
    });
    return result;
});

ipcMain.handle('read-file', async (event, filePath) => {
    try {
        const content = await fs.readFile(filePath, 'utf8');
        return { success: true, content };
    } catch (error) {
        return { error: error.message };
    }
});

ipcMain.handle('write-file', async (event, filePath, content) => {
    try {
        await fs.writeFile(filePath, content, 'utf8');
        return { success: true };
    } catch (error) {
        return { error: error.message };
    }
});
