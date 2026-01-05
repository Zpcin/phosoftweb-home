const fs = require('fs');
const path = require('path');

// 配置路径
const MD_FILE = path.join(__dirname, 'about-content.md');
const JS_FILE = path.join(__dirname, '../public/js/about-lang.js');

// 读取 JS 文件并提取 ABOUT_TRANSLATIONS 对象
function extractTranslationsFromJs() {
    if (!fs.existsSync(JS_FILE)) {
        console.error('JS file not found:', JS_FILE);
        return null;
    }
    const content = fs.readFileSync(JS_FILE, 'utf8');
    const match = content.match(/const ABOUT_TRANSLATIONS = ({[\s\S]*?});/);
    if (match && match[1]) {
        try {
            // 使用 eval 解析对象 (注意：仅在受信任的本地环境中使用)
            // 为了安全起见，我们可以用 new Function
            const translations = new Function('return ' + match[1])();
            return translations;
        } catch (e) {
            console.error('Failed to parse JS object:', e);
            return null;
        }
    }
    return null;
}

// 将翻译对象转换为 Markdown
function translationsToMd(translations) {
    let mdContent = '';
    for (const lang in translations) {
        mdContent += `# ${lang}\n\n`;
        translations[lang].forEach(item => {
            mdContent += `## ${item.title}\n`;
            // 将 <br> 转换为换行符，方便编辑
            let content = item.content.replace(/<br>/g, '\n');
            mdContent += `${content}\n\n`;
        });
        mdContent += '---\n\n'; // 语言分隔符
    }
    return mdContent;
}

// 将 Markdown 转换为翻译对象
function mdToTranslations(mdContent) {
    const translations = {};
    const lines = mdContent.split('\n');
    let currentLang = null;
    let currentTitle = null;
    let currentContent = [];

    lines.forEach(line => {
        const trimmedLine = line.trim();
        if (line.startsWith('# ')) {
            // 保存上一个部分
            if (currentLang && currentTitle) {
                translations[currentLang].push({
                    title: currentTitle,
                    content: currentContent.join('<br>')
                });
                currentContent = [];
                currentTitle = null;
            }
            
            currentLang = line.substring(2).trim();
            translations[currentLang] = [];
            currentTitle = null;
            currentContent = [];
        } else if (line.startsWith('## ')) {
            // 保存上一个部分
            if (currentLang && currentTitle) {
                translations[currentLang].push({
                    title: currentTitle,
                    content: currentContent.join('<br>')
                });
                currentContent = [];
            }
            currentTitle = line.substring(3).trim();
        } else if (line.startsWith('---')) {
            // 分隔符，忽略或处理结束
        } else {
            if (currentLang && currentTitle) {
                // 只有非空行才添加，或者保留空行作为 <br>
                // 这里我们保留所有行，除了开头结尾的空行可能需要处理
                // 简单起见，直接添加
                if (line.trim() !== '') {
                     currentContent.push(line);
                } else if (currentContent.length > 0) {
                     // 如果内容中间有空行，也保留（作为换行）
                     currentContent.push('');
                }
            }
        }
    });

    // 保存最后一个部分
    if (currentLang && currentTitle) {
        translations[currentLang].push({
            title: currentTitle,
            content: currentContent.join('<br>')
        });
    }

    return translations;
}

// 更新 JS 文件
function updateJsFile(newTranslations) {
    if (!fs.existsSync(JS_FILE)) {
        console.error('JS file not found:', JS_FILE);
        return;
    }
    let content = fs.readFileSync(JS_FILE, 'utf8');
    
    // 格式化新的对象字符串
    const newObjStr = JSON.stringify(newTranslations, null, 2);
    // 调整 JSON 字符串使其看起来像 JS 对象 (去掉键的引号等，可选，但 JSON.stringify 足够好了)
    // 为了保持原文件风格，我们可以简单处理一下
    
    // 替换原内容
    // 使用正则找到 const ABOUT_TRANSLATIONS = { ... };
    // 注意：这里假设原文件格式规范
    const regex = /(const ABOUT_TRANSLATIONS = )({[\s\S]*?})(;)/;
    
    if (regex.test(content)) {
        const newContent = content.replace(regex, `$1${newObjStr}$3`);
        fs.writeFileSync(JS_FILE, newContent, 'utf8');
        console.log('Successfully updated about-lang.js');
    } else {
        console.error('Could not find ABOUT_TRANSLATIONS object in JS file.');
    }
}

// 主逻辑
const args = process.argv.slice(2);
const command = args[0];

if (command === 'extract') {
    const translations = extractTranslationsFromJs();
    if (translations) {
        const md = translationsToMd(translations);
        fs.writeFileSync(MD_FILE, md, 'utf8');
        console.log(`Extracted translations to ${MD_FILE}`);
    }
} else if (command === 'update') {
    if (!fs.existsSync(MD_FILE)) {
        console.error('Markdown file not found. Run "extract" first.');
    } else {
        const md = fs.readFileSync(MD_FILE, 'utf8');
        const translations = mdToTranslations(md);
        updateJsFile(translations);
    }
} else {
    console.log('Usage: node update-about.js [extract|update]');
    console.log('  extract: Read JS and generate Markdown');
    console.log('  update:  Read Markdown and update JS');
}
