const express = require('express');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const { ABOUT_TRANSLATIONS } = require('./about-translations');
const app = express();
const PORT = process.env.PORT || 3000;

// 中间件设置 - 修复静态文件路径配置
// 管理系统静态文件
app.use('/', express.static(path.join(__dirname, 'public')));
// 主站静态文件 - 仅用于预览，不使用此路径提供服务
app.use('/site', express.static(path.join(__dirname, '../public')));
app.use(express.json());

// 获取支持的语言列表
app.get('/api/languages', (req, res) => {
    try {
        const languages = Object.keys(ABOUT_TRANSLATIONS);

        // 构建带有语言名称的列表
        const languageList = languages.map(code => {
            const names = {
                'zh-cn': '简体中文',
                'zh-hk': '繁体中文(香港)',
                'zh-tw': '繁体中文(台湾)',
                'en': 'English',
                'ja': '日本語',
                'en-sg': 'Singlish',
                'wenyan': '文言文'
            };

            return {
                code: code,
                name: names[code] || code
            };
        });

        res.json(languageList);
    } catch (error) {
        console.error('获取语言列表失败:', error);
        res.status(500).json({ error: '获取语言列表失败', details: error.message });
    }
});

// 获取 about.html 中的所有信息板块，支持指定语言
app.get('/api/sections', (req, res) => {
    try {
        // 检查是否指定了语言
        const lang = req.query.lang || 'zh-cn';

        // 如果有多语言内容，则从多语言内容中获取
        if (ABOUT_TRANSLATIONS[lang]) {
            // 如果请求的是默认语言（简体中文），仍从HTML文件读取以确保最新
            if (lang === 'zh-cn') {
                const aboutHtmlPath = path.join(__dirname, '../public/about.html');
                const html = fs.readFileSync(aboutHtmlPath, 'utf-8');
                const $ = cheerio.load(html);

                const sections = [];
                $('.info-section').each((index, element) => {
                    sections.push({
                        id: index,
                        title: $(element).find('.info-title').text(),
                        content: $(element).find('.info-content').html()
                    });
                });

                res.json(sections);
            } else {
                // 从翻译文件中获取指定语言的内容
                res.json(ABOUT_TRANSLATIONS[lang]);
            }
        } else {
            res.status(404).json({ error: '不支持的语言', lang: lang });
        }
    } catch (error) {
        console.error('读取文件失败:', error);
        res.status(500).json({ error: '读取文件失败', details: error.message });
    }
});

// 保存更新后的信息板块，支持指定语言
app.post('/api/sections', (req, res) => {
    try {
        // 检查是否指定了语言
        const lang = req.query.lang || 'zh-cn';

        // 默认语言内容更新到HTML文件
        if (lang === 'zh-cn') {
            const aboutHtmlPath = path.join(__dirname, '../public/about.html');
            let html = fs.readFileSync(aboutHtmlPath, 'utf-8');
            const $ = cheerio.load(html);

            // 清空现有信息板块
            $('#content').empty();

            // 添加更新后的信息板块
            req.body.forEach(section => {
                $('#content').append(`
                    <div class="info-section">
                        <div class="info-title">${section.title}</div>
                        <div class="info-content">${section.content}</div>
                    </div>
                `);
            });

            // 保存修改后的HTML
            fs.writeFileSync(aboutHtmlPath, $.html());

            // 同时更新多语言内容
            ABOUT_TRANSLATIONS[lang] = req.body;
        } else {
            // 非默认语言只更新多语言内容
            if (ABOUT_TRANSLATIONS[lang]) {
                ABOUT_TRANSLATIONS[lang] = req.body;
            } else {
                return res.status(404).json({ error: '不支持的语言', lang: lang });
            }
        }

        // 将所有多语言内容保存到文件
        const translationsPath = path.join(__dirname, 'about-translations.js');
        const translationsContent = `// about页面多语言内容配置
const ABOUT_TRANSLATIONS = ${JSON.stringify(ABOUT_TRANSLATIONS, null, 2)};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ABOUT_TRANSLATIONS };
}`;

        fs.writeFileSync(translationsPath, translationsContent);

        // 同时更新 about-lang.js 文件，使页面可以直接加载多语言内容
        const aboutLangPath = path.join(__dirname, '../public/js/about-lang.js');
        const aboutLangContent = `// 关于页面多语言内容切换脚本

// 关于页面多语言内容配置
const ABOUT_TRANSLATIONS = ${JSON.stringify(ABOUT_TRANSLATIONS, null, 2)};

// 从已有的翻译对象获取多语言内容
let aboutTranslations = ABOUT_TRANSLATIONS;

// 获取当前语言
function getCurrentLang() {
  // 从全局设置或window._forceLang获取语言
  return window._forceLang || 'zh-cn';
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
  // 确保页面完全加载后才应用翻译
  setTimeout(function() {
    applyContentTranslations();
    setupLanguageChangeListener();
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
};
`;

        fs.writeFileSync(aboutLangPath, aboutLangContent);

        res.json({ success: true, lang: lang });
    } catch (error) {
        console.error('保存文件失败:', error);
        res.status(500).json({ error: '保存文件失败', details: error.message });
    }
});

// 添加一个调试端点
app.get('/api/debug', (req, res) => {
    res.json({
        aboutHtmlPath: path.resolve(__dirname, '../public/about.html'),
        exists: fs.existsSync(path.resolve(__dirname, '../public/about.html')),
        dirname: __dirname
    });
});

app.listen(PORT, () => {
    console.log(`管理服务器运行在 http://localhost:${PORT}`);
    console.log(`主站静态预览: http://localhost:${PORT}/site`);
});
