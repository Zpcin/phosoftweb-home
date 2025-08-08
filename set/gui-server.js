#!/usr/bin/env node

/**
 * About-lang.js Web GUI 编辑器服务器
 * 基于 Express.js 的 Web 界面编辑器
 */

const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 8899;

// 文件路径配置
const ABOUT_LANG_FILE = path.join(__dirname, '..', 'public', 'js', 'about-lang.js');
const BACKUP_DIR = path.join(__dirname, 'backups');
const UPLOAD_DIR = path.join(__dirname, 'uploads');

// 确保目录存在
[BACKUP_DIR, UPLOAD_DIR].forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

// 中间件配置
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'gui')));

// 配置文件上传
const upload = multer({ dest: UPLOAD_DIR });

// 简单的 Markdown 转 HTML 函数（增强版）
function markdownToHtml(text) {
    if (!text) return '';
    
    // 预处理：标准化换行符
    text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    
    // 处理段落分隔（两个换行符表示段落）
    const paragraphs = text.split(/\n\s*\n/);
    
    return paragraphs.map(paragraph => {
        if (!paragraph.trim()) return '';
        
        let html = paragraph
            // 转换标题 (支持 # ## ### 等)
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            
            // 转换引用 > text (需要在其他处理之前)
            .replace(/^> (.+)/gm, '<blockquote>$1</blockquote>')
            
            // 转换分隔线 ---
            .replace(/^---$/gm, '<hr>')
            
            // 转换有序列表 (需要在无序列表之前处理)
            .replace(/^(\d+)\. (.+)/gm, '<li class="ordered">$2</li>')
            
            // 转换无序列表
            .replace(/^[-*+] (.+)/gm, '<li class="unordered">$1</li>')
            
            // 转换粗体 **text** 或 __text__
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/__(.*?)__/g, '<strong>$1</strong>')
            
            // 转换斜体 *text* 或 _text_ (需要在粗体之后)
            .replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>')
            .replace(/(?<!_)_([^_]+)_(?!_)/g, '<em>$1</em>')
            
            // 转换代码 `code`
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            
            // 转换链接 [text](url)
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
            
            // 转换图片 ![alt](url)
            .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width: 100%;">')
            
            // 处理强制换行 (行末两个空格 + 换行)
            .replace(/  \n/g, '<br>\n')
            
            // 处理单个换行符 (在同一段落内)
            .replace(/\n/g, ' ');
        
        // 后处理：包装列表
        html = html
            // 包装有序列表
            .replace(/(<li class="ordered">.*?<\/li>)/gs, (match) => {
                const items = match.replace(/ class="ordered"/g, '');
                return `<ol>${items}</ol>`;
            })
            
            // 包装无序列表
            .replace(/(<li class="unordered">.*?<\/li>)/gs, (match) => {
                const items = match.replace(/ class="unordered"/g, '');
                return `<ul>${items}</ul>`;
            })
            
            // 清理连续的列表标签
            .replace(/<\/ol>\s*<ol>/g, '')
            .replace(/<\/ul>\s*<ul>/g, '');
        
        // 如果不是特殊块级元素，包装为段落
        if (!html.match(/^<(h[1-6]|blockquote|hr|ul|ol)/)) {
            html = `<p>${html}</p>`;
        }
        
        return html;
    }).filter(p => p.trim()).join('\n\n');
}

// HTML 转 Markdown 函数（增强版）
function htmlToMarkdown(html) {
    if (!html) return '';
    
    return html
        // 预处理：标准化空白字符
        .replace(/\s+/g, ' ')
        .replace(/>\s+</g, '><')
        
        // 转换段落 (段落之间插入双换行)
        .replace(/<\/p>\s*<p>/g, '\n\n')
        .replace(/<p>/g, '').replace(/<\/p>/g, '\n\n')
        
        // 转换标题
        .replace(/<h1>(.*?)<\/h1>/g, '# $1\n\n')
        .replace(/<h2>(.*?)<\/h2>/g, '## $1\n\n')
        .replace(/<h3>(.*?)<\/h3>/g, '### $1\n\n')
        .replace(/<h4>(.*?)<\/h4>/g, '#### $1\n\n')
        .replace(/<h5>(.*?)<\/h5>/g, '##### $1\n\n')
        .replace(/<h6>(.*?)<\/h6>/g, '###### $1\n\n')
        
        // 转换格式
        .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
        .replace(/<em>(.*?)<\/em>/g, '*$1*')
        .replace(/<code>(.*?)<\/code>/g, '`$1`')
        
        // 转换链接和图片
        .replace(/<a href="([^"]*)"[^>]*>(.*?)<\/a>/g, '[$2]($1)')
        .replace(/<img src="([^"]*)" alt="([^"]*)"[^>]*>/g, '![$2]($1)')
        
        // 转换引用和分隔线
        .replace(/<blockquote>(.*?)<\/blockquote>/g, '> $1\n\n')
        .replace(/<hr\s*\/?>/g, '---\n\n')
        
        // 转换列表 (改进版)
        .replace(/<ul>(.*?)<\/ul>/gs, (match, content) => {
            const items = content.match(/<li>(.*?)<\/li>/g);
            if (!items) return match;
            return items.map(item => {
                const text = item.replace(/<\/?li>/g, '').trim();
                return `- ${text}`;
            }).join('\n') + '\n\n';
        })
        .replace(/<ol>(.*?)<\/ol>/gs, (match, content) => {
            const items = content.match(/<li>(.*?)<\/li>/g);
            if (!items) return match;
            return items.map((item, index) => {
                const text = item.replace(/<\/?li>/g, '').trim();
                return `${index + 1}. ${text}`;
            }).join('\n') + '\n\n';
        })
        
        // 转换强制换行
        .replace(/<br\s*\/?>/g, '  \n')
        
        // 移除其他HTML标签
        .replace(/<[^>]*>/g, '')
        
        // 后处理：清理多余的空白
        .replace(/\n{3,}/g, '\n\n')  // 多个换行压缩为双换行
        .replace(/^\s+|\s+$/g, '')   // 去除首尾空白
        .replace(/ {3,}/g, ' ')      // 多个空格压缩为单空格
        .replace(/\t/g, '    ')      // 制表符转换为4个空格
        
        // 确保列表项之间有适当的间距
        .replace(/^([-*+]|\d+\.)\s/gm, '$&')
        
        // 处理引用的换行
        .replace(/^>\s*/gm, '> ');
}

// 读取 about-lang.js 文件
function readAboutLangFile() {
    try {
        if (!fs.existsSync(ABOUT_LANG_FILE)) {
            return { error: `文件不存在: ${ABOUT_LANG_FILE}` };
        }
        
        const content = fs.readFileSync(ABOUT_LANG_FILE, 'utf8');
        const match = content.match(/const ABOUT_TRANSLATIONS = ({[\s\S]*?});/);
        
        if (!match) {
            return { error: '未找到 ABOUT_TRANSLATIONS 对象' };
        }
        
        const translationsStr = match[1];
        const translations = eval(`(${translationsStr})`);
        
        return { translations };
    } catch (error) {
        return { error: error.message };
    }
}

// 创建备份
function createBackup() {
    try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupPath = path.join(BACKUP_DIR, `about-lang-${timestamp}.js`);
        
        if (fs.existsSync(ABOUT_LANG_FILE)) {
            fs.copyFileSync(ABOUT_LANG_FILE, backupPath);
            return backupPath;
        }
    } catch (error) {
        console.error('创建备份失败:', error.message);
    }
    return null;
}

// 保存文件
function saveAboutLangFile(translations) {
    try {
        createBackup();
        
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

        fs.writeFileSync(ABOUT_LANG_FILE, newContent, 'utf8');
        return { success: true };
    } catch (error) {
        return { error: error.message };
    }
}

// API 路由

// 获取所有翻译数据
app.get('/api/translations', (req, res) => {
    const result = readAboutLangFile();
    if (result.error) {
        return res.status(500).json(result);
    }
    res.json(result);
});

// 保存翻译数据
app.post('/api/translations', (req, res) => {
    const { translations } = req.body;
    if (!translations) {
        return res.status(400).json({ error: '缺少翻译数据' });
    }
    
    const result = saveAboutLangFile(translations);
    if (result.error) {
        return res.status(500).json(result);
    }
    
    res.json({ success: true, message: '保存成功' });
});

// 获取备份列表
app.get('/api/backups', (req, res) => {
    try {
        const files = fs.readdirSync(BACKUP_DIR)
            .filter(file => file.startsWith('about-lang-') && file.endsWith('.js'))
            .map(file => {
                const filePath = path.join(BACKUP_DIR, file);
                const stats = fs.statSync(filePath);
                return {
                    name: file,
                    size: stats.size,
                    created: stats.mtime.toISOString()
                };
            })
            .sort((a, b) => new Date(b.created) - new Date(a.created));
        
        res.json({ backups: files });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 恢复备份
app.post('/api/restore/:filename', (req, res) => {
    try {
        const filename = req.params.filename;
        const backupPath = path.join(BACKUP_DIR, filename);
        
        if (!fs.existsSync(backupPath)) {
            return res.status(404).json({ error: '备份文件不存在' });
        }
        
        createBackup(); // 先备份当前文件
        fs.copyFileSync(backupPath, ABOUT_LANG_FILE);
        
        res.json({ success: true, message: '恢复成功' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Markdown 转换
app.post('/api/markdown-to-html', (req, res) => {
    const { text } = req.body;
    const html = markdownToHtml(text || '');
    res.json({ html });
});

app.post('/api/html-to-markdown', (req, res) => {
    const { html } = req.body;
    const markdown = htmlToMarkdown(html || '');
    res.json({ markdown });
});

// 文件上传 (Markdown 导入)
app.post('/api/import-markdown', upload.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: '没有上传文件' });
        }
        
        const content = fs.readFileSync(req.file.path, 'utf8');
        
        // 解析 Markdown 内容
        const sections = content.split(/^## /m).filter(section => section.trim());
        const parsedSections = sections.map(section => {
            const lines = section.split('\n');
            const title = lines[0].trim();
            const content = lines.slice(1).join('\n').trim();
            return {
                title: title,
                content: markdownToHtml(content)
            };
        });
        
        // 清理上传的文件
        fs.unlinkSync(req.file.path);
        
        res.json({ sections: parsedSections });
    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(500).json({ error: error.message });
    }
});

// 导出为 Markdown
app.post('/api/export-markdown', (req, res) => {
    try {
        const { language, sections } = req.body;
        
        if (!sections || !Array.isArray(sections)) {
            return res.status(400).json({ error: '无效的数据格式' });
        }
        
        let markdown = `# About - ${language.toUpperCase()}\n\n`;
        
        sections.forEach(item => {
            markdown += `## ${item.title}\n\n`;
            const textContent = htmlToMarkdown(item.content);
            markdown += `${textContent}\n\n`;
        });
        
        res.setHeader('Content-Type', 'text/markdown');
        res.setHeader('Content-Disposition', `attachment; filename="about-${language}.md"`);
        res.send(markdown);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`About-lang.js Web GUI 编辑器已启动`);
    console.log(`访问地址: http://localhost:${PORT}`);
    console.log(`Node.js 版本: ${process.version}`);
    console.log(`编辑文件: ${ABOUT_LANG_FILE}`);
});

module.exports = app;
