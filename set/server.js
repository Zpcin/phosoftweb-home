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
        console.log(`正在保存 ${lang} 语言内容 - 请求URL: ${req.originalUrl}`);

        // 保存前创建一个备份，确保不会丢失其他语言的内容
        const originalTranslations = JSON.parse(JSON.stringify(ABOUT_TRANSLATIONS));

        // 在修改前验证内容结构是否正确
        if (!Array.isArray(req.body) || req.body.length === 0) {
            throw new Error('无效的内容格式，必须是包含标题和内容的数组');
        }

        // 验证每个部分是否都有title和content字段
        req.body.forEach((section, index) => {
            if (!section.title || !section.content) {
                throw new Error(`第${index + 1}个部分缺少标题或内容`);
            }
        });

        // 语言内容特征检测，防止错误保存
        const isJapanese = (text) => {
            // 检测日语特有字符（平假名、片假名、一部分汉字）
            return /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(text) &&
                   /[\u3040-\u309F\u30A0-\u30FF]/.test(text); // 必须包含假名
        };

        const isChinese = (text) => {
            // 检测中文字符
            return /[\u4E00-\u9FFF\u3400-\u4DBF]/.test(text) &&
                   !/[\u3040-\u309F\u30A0-\u30FF]/.test(text); // 不应包含假名
        };

        const isEnglish = (text) => {
            // 检测英文内容（主要是拉丁字母）
            return /[a-zA-Z]/.test(text) &&
                   text.length > 20 &&
                   !/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(text);
        };

        // 通过内容特征检测实际语言
        const sampleTitle = req.body[0]?.title || '';
        const sampleContent = req.body[0]?.content || '';
        const detectedSample = sampleTitle + sampleContent;

        if (isJapanese(detectedSample) && lang !== 'ja') {
            console.warn(`⚠️ 警告: 检测到内容可能是日语，但当前选择的语言是${lang}`);

            // 如果用户真的想修改非日语内容，需要确认
            if (!req.query.forceLanguage) {
                return res.status(400).json({
                    error: '内容与选择的语言不匹配',
                    details: '检测到内容可能是日语，但您选择的语言是' + lang,
                    suggestion: '如果您确定要将日语内容保存为' + lang + '语言，请添加参数forceLanguage=true',
                    detectedLanguage: 'ja'
                });
            }
        } else if (isChinese(detectedSample) && !['zh-cn', 'zh-tw', 'zh-hk'].includes(lang)) {
            console.warn(`⚠️ 警告: 检测到内容可能是中文，但当前选择的语言是${lang}`);

            // 如果用户真的想修改非中文内容，需要确认
            if (!req.query.forceLanguage) {
                return res.status(400).json({
                    error: '内容与选择的语言不匹配',
                    details: '检测到内容可能是中文，但您选择的语言是' + lang,
                    suggestion: '如果您确定要将中文内容保存为' + lang + '语言，请添加参数forceLanguage=true',
                    detectedLanguage: 'zh'
                });
            }
        } else if (isEnglish(detectedSample) && lang !== 'en' && lang !== 'en-sg') {
            console.warn(`⚠️ 警告: 检测到内容可能是英文，但当前选择的语言是${lang}`);

            // 如果用户真的想修改非英文内容，需要确认
            if (!req.query.forceLanguage) {
                return res.status(400).json({
                    error: '内容与选择的语言不匹配',
                    details: '检测到内容可能是英文，但您选择的语言是' + lang,
                    suggestion: '如果您确定要将英文内容保存为' + lang + '语言，请添加参数forceLanguage=true',
                    detectedLanguage: 'en'
                });
            }
        }

        console.log(`✅ 语言检测通过或已强制确认，继续保存${lang}语言内容`);

        // 默认语言内容更新到HTML文件
        if (lang === 'zh-cn') {
            const aboutHtmlPath = path.join(__dirname, '../public/about.html');

            // 首先备份HTML文件
            const backupPath = path.join(__dirname, '../public/about.html.bak');
            try {
                fs.copyFileSync(aboutHtmlPath, backupPath);
                console.log('已创建about.html备份文件');
            } catch (backupError) {
                console.warn('创建备份文件失败:', backupError);
                // 继续执行，不中断流程
            }

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

            // 只更新当前语言的内容，不影响其他语言
            ABOUT_TRANSLATIONS[lang] = req.body;
            console.log(`成功更新HTML文件和${lang}语言内容`);
        } else {
            // 非默认语言只更新多语言内容
            if (ABOUT_TRANSLATIONS[lang]) {
                // 只更新当前语言的内容，不影响其他语言
                ABOUT_TRANSLATIONS[lang] = req.body;
                console.log(`成功更新${lang}语言内容`);
            } else {
                return res.status(404).json({ error: '不支持的语言', lang: lang });
            }
        }

        // 检查各语言内容结构，确保格式一致
        const sectionCount = ABOUT_TRANSLATIONS['zh-cn'].length;
        Object.keys(ABOUT_TRANSLATIONS).forEach(langKey => {
            if (ABOUT_TRANSLATIONS[langKey].length !== sectionCount) {
                console.warn(`警告: ${langKey}语言的部分数量(${ABOUT_TRANSLATIONS[langKey].length})与中文不一致(${sectionCount})`);
            }
        });

        // 防止语言内容错误交叉（检查语言内容是否被错误混淆）
        Object.keys(ABOUT_TRANSLATIONS).forEach(langKey => {
            if (langKey === lang) return; // 跳过当前正在编辑的语言

            // 检查内容是否与当前编辑的语言完全相同（可能表示错误覆盖）
            if (JSON.stringify(ABOUT_TRANSLATIONS[langKey]) === JSON.stringify(ABOUT_TRANSLATIONS[lang])) {
                // 如果内容完全相同且不是同一语言，恢复原始内容
                console.warn(`检测到${langKey}语言内容与${lang}完全相同，可能是错误覆盖，正在恢复...`);
                ABOUT_TRANSLATIONS[langKey] = originalTranslations[langKey];
            }
        });

        // 特别检查日语和中文内容
        if (lang === 'ja' && JSON.stringify(ABOUT_TRANSLATIONS['zh-cn']) === JSON.stringify(ABOUT_TRANSLATIONS['ja'])) {
            console.log('检测到zh-cn内容被错误设置为日语内容，正在恢复...');
            // 恢复中文内容
            ABOUT_TRANSLATIONS['zh-cn'] = originalTranslations['zh-cn'];
        }

        // 额外检查: 通过内容特征二次验证所有语言
        for (const checkLang of Object.keys(ABOUT_TRANSLATIONS)) {
            if (checkLang === lang) continue; // 跳过当前编辑的语言

            const sampleText = ABOUT_TRANSLATIONS[checkLang][0]?.title + ABOUT_TRANSLATIONS[checkLang][0]?.content;

            // 检查是否有语言错位
            if (isJapanese(sampleText) && checkLang !== 'ja') {
                console.warn(`检测到${checkLang}中包含日语内容，可能错误覆盖，正在恢复...`);
                ABOUT_TRANSLATIONS[checkLang] = originalTranslations[checkLang];
            } else if (isChinese(sampleText) && !['zh-cn', 'zh-tw', 'zh-hk'].includes(checkLang)) {
                console.warn(`检测到${checkLang}中包含中文内容，可能错误覆盖，正在恢复...`);
                ABOUT_TRANSLATIONS[checkLang] = originalTranslations[checkLang];
            } else if (isEnglish(sampleText) && !['en', 'en-sg'].includes(checkLang)) {
                console.warn(`检测到${checkLang}中包含英文内容，可能错误覆盖，正在恢复...`);
                ABOUT_TRANSLATIONS[checkLang] = originalTranslations[checkLang];
            }
        }

        // 创建about-translations.js备份
        const translationsBackupPath = path.join(__dirname, 'about-translations.js.bak');
        try {
            fs.writeFileSync(translationsBackupPath, `// 备份时间: ${new Date().toISOString()}
// about页面多语言内容配置备份
const ABOUT_TRANSLATIONS = ${JSON.stringify(originalTranslations, null, 2)};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ABOUT_TRANSLATIONS };
}`);
            console.log('已创建translations备份文件');
        } catch (backupError) {
            console.warn('创建translations备份文件失败:', backupError);
            // 继续执行，不中断流程
        }

        // 保存所有语言内容到文件
        const translationsPath = path.join(__dirname, 'about-translations.js');
        const translationsContent = `// about页面多语言内容配置
// 最后更新时间: ${new Date().toISOString()}
// 最后更新语言: ${lang}
const ABOUT_TRANSLATIONS = ${JSON.stringify(ABOUT_TRANSLATIONS, null, 2)};

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ABOUT_TRANSLATIONS };
}`;

        fs.writeFileSync(translationsPath, translationsContent);

        // 同时更新 about-lang.js 文件，使页面可以直接加载多语言内容
        const aboutLangPath = path.join(__dirname, '../public/js/about-lang.js');

        // 首先备份 about-lang.js 文件
        const langBackupPath = path.join(__dirname, '../public/js/about-lang.js.bak');
        try {
            fs.copyFileSync(aboutLangPath, langBackupPath);
            console.log('已创建about-lang.js备份文件');
        } catch (backupError) {
            console.warn('创建about-lang.js备份文件失败:', backupError);
            // 继续执行，不中断流程
        }

        // 生成前端脚本，注意这是写入文件的内容，不是要在服务器执行的代码
        const aboutLangContent = `// 关于页面多语言内容切换脚本
// 最后更新时间: ${new Date().toISOString()}
// 最后更新语言: ${lang}

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
};`;

        // 写入about-lang.js文件
        fs.writeFileSync(aboutLangPath, aboutLangContent);

        // 记录已保存的语言
        console.log(`✅ ${lang} 语言内容已成功保存`);
        res.json({
            success: true,
            lang: lang,
            info: '成功保存并更新所有相关文件，并创建了备份文件'
        });
    } catch (error) {
        console.error('保存文件失败:', error);

        // 提供更详细的错误信息
        const errorDetails = {
            message: error.message,
            stack: error.stack,
            time: new Date().toISOString()
        };

        // 记录详细错误日志
        try {
            const errorLogPath = path.join(__dirname, 'error.log');
            fs.appendFileSync(errorLogPath,
                `\n[${new Date().toISOString()}] 保存错误:\n${JSON.stringify(errorDetails, null, 2)}\n`);
        } catch (logError) {
            console.error('无法记录错误日志:', logError);
        }

        res.status(500).json({
            error: '保存文件失败',
            details: error.message,
            suggestion: '请检查内容格式是否正确，如果问题持续存在，请联系管理员'
        });
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
