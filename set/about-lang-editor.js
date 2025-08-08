#!/usr/bin/env node

/**
 * About-lang.js 编辑工具
 * 支持 Markdown 转 HTML，方便编辑多语言内容
 * 使用 Node.js: C:\Users\11694\AppData\Roaming\JetBrains\WebStorm2025.1\node\versions\22.16.0\node.exe
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// 文件路径配置
const ABOUT_LANG_FILE = path.join(__dirname, '..', 'public', 'js', 'about-lang.js');
const BACKUP_DIR = path.join(__dirname, 'backups');

// 确保备份目录存在
if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
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

// 读取当前的 about-lang.js 文件
function readAboutLangFile() {
    try {
        if (!fs.existsSync(ABOUT_LANG_FILE)) {
            console.error(`文件不存在: ${ABOUT_LANG_FILE}`);
            return null;
        }
        
        const content = fs.readFileSync(ABOUT_LANG_FILE, 'utf8');
        
        // 提取 ABOUT_TRANSLATIONS 对象
        const match = content.match(/const ABOUT_TRANSLATIONS = ({[\s\S]*?});/);
        if (!match) {
            console.error('未找到 ABOUT_TRANSLATIONS 对象');
            return null;
        }
        
        // 使用 eval 解析对象（注意：在生产环境中应该使用更安全的方法）
        const translationsStr = match[1];
        const translations = eval(`(${translationsStr})`);
        
        return { content, translations };
    } catch (error) {
        console.error('读取文件失败:', error.message);
        return null;
    }
}

// 创建备份
function createBackup() {
    try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupPath = path.join(BACKUP_DIR, `about-lang-${timestamp}.js`);
        
        if (fs.existsSync(ABOUT_LANG_FILE)) {
            fs.copyFileSync(ABOUT_LANG_FILE, backupPath);
            console.log(`✓ 已创建备份: ${backupPath}`);
            return backupPath;
        }
    } catch (error) {
        console.error('创建备份失败:', error.message);
    }
    return null;
}

// 保存更新后的文件
function saveAboutLangFile(translations) {
    try {
        // 创建备份
        createBackup();
        
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

        fs.writeFileSync(ABOUT_LANG_FILE, newContent, 'utf8');
        console.log(`✓ 文件已保存: ${ABOUT_LANG_FILE}`);
        return true;
    } catch (error) {
        console.error('保存文件失败:', error.message);
        return false;
    }
}

// 显示菜单
function showMenu() {
    console.log('\n=== About-lang.js 编辑工具 ===');
    console.log('1. 查看所有语言');
    console.log('2. 编辑指定语言');
    console.log('3. 添加新语言');
    console.log('4. 删除语言');
    console.log('5. 从 Markdown 导入内容');
    console.log('6. 导出为 Markdown');
    console.log('7. 查看备份列表');
    console.log('8. 恢复备份');
    console.log('0. 退出');
    console.log('=============================');
}

// 显示语言列表
function showLanguages(translations) {
    console.log('\n当前支持的语言:');
    Object.keys(translations).forEach((lang, index) => {
        console.log(`${index + 1}. ${lang} (${translations[lang].length} 个条目)`);
    });
}

// 编辑指定语言
async function editLanguage(translations, lang) {
    if (!translations[lang]) {
        console.log(`语言 "${lang}" 不存在`);
        return translations;
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log(`\n编辑语言: ${lang}`);
    console.log('当前内容:');
    translations[lang].forEach((item, index) => {
        console.log(`${index + 1}. ${item.title}`);
        console.log(`   ${item.content.replace(/<br>/g, '\\n')}`);
    });

    console.log('\n选择要编辑的条目 (输入数字，0 返回):');
    
    return new Promise((resolve) => {
        rl.question('> ', (answer) => {
            const index = parseInt(answer) - 1;
            if (answer === '0') {
                rl.close();
                resolve(translations);
                return;
            }

            if (index >= 0 && index < translations[lang].length) {
                console.log(`\n编辑条目 ${index + 1}:`);
                console.log(`当前标题: ${translations[lang][index].title}`);
                
                rl.question('新标题 (回车保持不变): ', (newTitle) => {
                    if (newTitle.trim()) {
                        translations[lang][index].title = newTitle.trim();
                    }

                    console.log(`当前内容: ${translations[lang][index].content.replace(/<br>/g, '\\n')}`);
                    console.log('新内容 (支持 Markdown，回车保持不变):');
                    
                    rl.question('> ', (newContent) => {
                        if (newContent.trim()) {
                            const htmlContent = markdownToHtml(newContent.trim());
                            translations[lang][index].content = htmlContent;
                            console.log(`✓ 内容已更新`);
                        }
                        
                        rl.close();
                        resolve(translations);
                    });
                });
            } else {
                console.log('无效的选择');
                rl.close();
                resolve(translations);
            }
        });
    });
}

// 添加新语言
async function addNewLanguage(translations) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question('输入新语言代码 (如: fr, de, es): ', (langCode) => {
            if (!langCode.trim()) {
                console.log('语言代码不能为空');
                rl.close();
                resolve(translations);
                return;
            }

            if (translations[langCode.trim()]) {
                console.log('该语言已存在');
                rl.close();
                resolve(translations);
                return;
            }

            // 复制中文内容作为模板
            const template = JSON.parse(JSON.stringify(translations['zh-cn'] || []));
            translations[langCode.trim()] = template;
            
            console.log(`✓ 已添加新语言: ${langCode.trim()}`);
            console.log('请使用编辑功能修改内容');
            
            rl.close();
            resolve(translations);
        });
    });
}

// 从 Markdown 文件导入
async function importFromMarkdown(translations) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        rl.question('输入 Markdown 文件路径: ', (filePath) => {
            try {
                if (!fs.existsSync(filePath)) {
                    console.log('文件不存在');
                    rl.close();
                    resolve(translations);
                    return;
                }

                const content = fs.readFileSync(filePath, 'utf8');
                
                rl.question('输入目标语言代码: ', (langCode) => {
                    if (!langCode.trim()) {
                        console.log('语言代码不能为空');
                        rl.close();
                        resolve(translations);
                        return;
                    }

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

                    translations[langCode.trim()] = parsedSections;
                    console.log(`✓ 已从 Markdown 导入 ${parsedSections.length} 个条目到语言 ${langCode.trim()}`);
                    
                    rl.close();
                    resolve(translations);
                });
            } catch (error) {
                console.error('导入失败:', error.message);
                rl.close();
                resolve(translations);
            }
        });
    });
}

// 导出为 Markdown
async function exportToMarkdown(translations) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        showLanguages(translations);
        rl.question('\n选择要导出的语言代码: ', (langCode) => {
            if (!translations[langCode.trim()]) {
                console.log('语言不存在');
                rl.close();
                resolve();
                return;
            }

            const lang = langCode.trim();
            let markdown = `# About - ${lang.toUpperCase()}\n\n`;
            
            translations[lang].forEach(item => {
                markdown += `## ${item.title}\n\n`;
                // 将 HTML 转回文本格式
                const textContent = item.content
                    .replace(/<br>/g, '\n')
                    .replace(/<[^>]*>/g, '')
                    .trim();
                markdown += `${textContent}\n\n`;
            });

            const outputPath = path.join(__dirname, `about-${lang}.md`);
            fs.writeFileSync(outputPath, markdown, 'utf8');
            console.log(`✓ 已导出到: ${outputPath}`);
            
            rl.close();
            resolve();
        });
    });
}

// 查看备份列表
function showBackups() {
    try {
        const files = fs.readdirSync(BACKUP_DIR)
            .filter(file => file.startsWith('about-lang-') && file.endsWith('.js'))
            .sort()
            .reverse();

        if (files.length === 0) {
            console.log('没有找到备份文件');
            return;
        }

        console.log('\n备份文件列表:');
        files.forEach((file, index) => {
            const filePath = path.join(BACKUP_DIR, file);
            const stats = fs.statSync(filePath);
            console.log(`${index + 1}. ${file} (${stats.size} bytes, ${stats.mtime.toLocaleString()})`);
        });
    } catch (error) {
        console.error('读取备份目录失败:', error.message);
    }
}

// 恢复备份
async function restoreBackup() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    try {
        const files = fs.readdirSync(BACKUP_DIR)
            .filter(file => file.startsWith('about-lang-') && file.endsWith('.js'))
            .sort()
            .reverse();

        if (files.length === 0) {
            console.log('没有找到备份文件');
            rl.close();
            return;
        }

        showBackups();

        return new Promise((resolve) => {
            rl.question('\n选择要恢复的备份 (输入数字): ', (answer) => {
                const index = parseInt(answer) - 1;
                if (index >= 0 && index < files.length) {
                    const backupFile = path.join(BACKUP_DIR, files[index]);
                    
                    // 先备份当前文件
                    createBackup();
                    
                    // 恢复选中的备份
                    fs.copyFileSync(backupFile, ABOUT_LANG_FILE);
                    console.log(`✓ 已恢复备份: ${files[index]}`);
                } else {
                    console.log('无效的选择');
                }
                
                rl.close();
                resolve();
            });
        });
    } catch (error) {
        console.error('恢复备份失败:', error.message);
        rl.close();
    }
}

// 主程序
async function main() {
    console.log('About-lang.js 编辑工具启动');
    console.log('Node.js 版本:', process.version);
    console.log('文件路径:', ABOUT_LANG_FILE);

    const data = readAboutLangFile();
    if (!data) {
        console.error('无法读取文件，程序退出');
        return;
    }

    let { translations } = data;
    let modified = false;

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    while (true) {
        showMenu();
        
        const choice = await new Promise((resolve) => {
            rl.question('\n请选择操作: ', resolve);
        });

        switch (choice) {
            case '1':
                showLanguages(translations);
                break;

            case '2':
                showLanguages(translations);
                const langChoice = await new Promise((resolve) => {
                    rl.question('\n输入要编辑的语言代码: ', resolve);
                });
                if (translations[langChoice.trim()]) {
                    translations = await editLanguage(translations, langChoice.trim());
                    modified = true;
                } else {
                    console.log('语言不存在');
                }
                break;

            case '3':
                translations = await addNewLanguage(translations);
                modified = true;
                break;

            case '4':
                showLanguages(translations);
                const delLang = await new Promise((resolve) => {
                    rl.question('\n输入要删除的语言代码: ', resolve);
                });
                if (translations[delLang.trim()]) {
                    delete translations[delLang.trim()];
                    console.log(`✓ 已删除语言: ${delLang.trim()}`);
                    modified = true;
                } else {
                    console.log('语言不存在');
                }
                break;

            case '5':
                translations = await importFromMarkdown(translations);
                modified = true;
                break;

            case '6':
                await exportToMarkdown(translations);
                break;

            case '7':
                showBackups();
                break;

            case '8':
                await restoreBackup();
                // 重新读取文件
                const reloadData = readAboutLangFile();
                if (reloadData) {
                    translations = reloadData.translations;
                    console.log('✓ 文件已重新加载');
                }
                break;

            case '0':
                if (modified) {
                    const saveChoice = await new Promise((resolve) => {
                        rl.question('\n检测到修改，是否保存? (y/n): ', resolve);
                    });
                    if (saveChoice.toLowerCase() === 'y' || saveChoice.toLowerCase() === 'yes') {
                        if (saveAboutLangFile(translations)) {
                            console.log('✓ 修改已保存');
                        }
                    }
                }
                console.log('程序退出');
                rl.close();
                return;

            default:
                console.log('无效的选择');
        }
    }
}

// 处理程序退出
process.on('SIGINT', () => {
    console.log('\n程序被中断');
    process.exit(0);
});

// 启动程序
if (require.main === module) {
    main().catch(console.error);
}

module.exports = {
    readAboutLangFile,
    saveAboutLangFile,
    markdownToHtml,
    createBackup
};
