const fs = require('fs');
const path = require('path');

const INDEX_PATH = path.join(__dirname, '../public/index.html');
const LANG_PATH = path.join(__dirname, '../public/js/lang.js');
const DATA_PATH = path.join(__dirname, 'links.json');

const LANGUAGES = ['zh-cn', 'zh-hk', 'zh-tw', 'en', 'en-sg', 'ja', 'wenyan', 'pinyin', 'zhuyin'];

// Extract Helper
function extract() {
    console.log('Extracting links data...');
    
    // 1. Read index.html to get order and URLs
    const indexContent = fs.readFileSync(INDEX_PATH, 'utf8');
    const linkRegex = /<a href="([^"]*)"[^>]*data-i18n="linkTexts\.([^"]*)"[^>]*><\/a>/g;
    let match;
    const linksMap = new Map(); // id -> { url, id, translations: {} }
    const order = [];

    // Special handling for the zpcin link which has an id attribute and href="javascript:void(0)"
    // The regex above might miss it if attributes are in different order or format
    // Let's use a more robust regex or specific one for standard links
    
    // Standard links loop
    while ((match = linkRegex.exec(indexContent)) !== null) {
        const url = match[1];
        const id = match[2];
        linksMap.set(id, { id, url, translations: {} });
        order.push(id);
    }

    // Handle special Zpcin link manually or via regex if not caught
    if (!linksMap.has('zpcin')) {
         const zpcinMatch = /<a href="([^"]*)" id="zpcinLink" data-i18n="linkTexts\.([^"]*)"><\/a>/g.exec(indexContent);
         if (zpcinMatch) {
             const url = zpcinMatch[1]; // likely javascript:void(0)
             const id = zpcinMatch[2];
             linksMap.set(id, { id, url, translations: {} });
             // Insert in correct order position if possible, but for now append or try to find index
             // For simplicity, we might just append if not found, but we want to preserve order.
             // Let's re-scan index.html finding ALL data-i18n="linkTexts.xxx" to preserve order
         }
    }
    
    // Re-scan for order to be sure
    const allLinksRegex = /data-i18n="linkTexts\.([^"]*)"/g;
    const fullOrder = [];
    while ((match = allLinksRegex.exec(indexContent)) !== null) {
        fullOrder.push(match[1]);
    }

    // 2. Read lang.js to get translations
    const langContent = fs.readFileSync(LANG_PATH, 'utf8');
    
    LANGUAGES.forEach(lang => {
        // Regex to find the linkTexts block for each language
        // Pattern: 'zh-cn': { ... linkTexts: { ... } ... }
        // This is tricky with regex. Better approach for a script:
        // Load the JS object? No, it's safer to regex match the specific linkTexts block within the lang block.
        
        // Simplified approach: Find `linkTexts: {` and read util `}`
        // But there are multiple `linkTexts` blocks.
        // We assume the order of languages in lang.js is roughly known or we find them by context.
        
        // Let's find the start of the language block
        const langBlockStart = langContent.indexOf(`'${lang}':`);
        if (langBlockStart !== -1) {
            const nextLangIndex = findNextLangIndex(langContent, langBlockStart);
            const langBlock = langContent.substring(langBlockStart, nextLangIndex);
            
            const linkTextsMatch = /linkTexts:\s*\{([\s\S]*?)\}/.exec(langBlock);
            if (linkTextsMatch) {
                const linkTextsBody = linkTextsMatch[1];
                const lines = linkTextsBody.split('\n');
                lines.forEach(line => {
                    const lineMatch = /'([^']+)':\s*'([^']*)'/.exec(line);
                    if (lineMatch) {
                        const id = lineMatch[1];
                        const text = lineMatch[2];
                        if (linksMap.has(id)) {
                            if (!linksMap.get(id).translations) linksMap.get(id).translations = {};
                            linksMap.get(id).translations[lang] = text;
                        } else {
                            // Link exists in lang.js but not index.html (orphan), add it?
                            // Better not, or add to a separte list. For now ignore or add.
                            // Let's add it to preserve data
                            if (!fullOrder.includes(id)) fullOrder.push(id);
                             linksMap.set(id, { id, url: '', translations: { [lang]: text } });
                        }
                    }
                });
            }
        }
    });

    // Construct final list based on fullOrder
    const result = fullOrder.map(id => {
        const item = linksMap.get(id);
        if (!item) return null;
        // Default URL for zpcin if not captured correctly
        if (id === 'zpcin' && !item.url) item.url = 'javascript:void(0)';
        return item;
    }).filter(item => item !== null);

    fs.writeFileSync(DATA_PATH, JSON.stringify(result, null, 2), 'utf8');
    console.log(`Successfully extracted ${result.length} links to ${DATA_PATH}`);
}

function findNextLangIndex(content, startIndex) {
    // Helper to find roughly where the current language block ends
    // This is naive, relies on the structure `'lang': {` being at the root of the object
    // We can search for the next `'lang':` 
    let minIndex = content.length;
    LANGUAGES.forEach(l => {
        const idx = content.indexOf(`'${l}':`, startIndex + 5); 
        if (idx !== -1 && idx < minIndex) {
            minIndex = idx;
        }
    });
    return minIndex;
}

// Update Helper
function update() {
    console.log('Updating project files from data...');
    if (!fs.existsSync(DATA_PATH)) {
        console.error('Data file not found. Run extract first.');
        return;
    }

    const links = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
    let indexContent = fs.readFileSync(INDEX_PATH, 'utf8');
    let langContent = fs.readFileSync(LANG_PATH, 'utf8');

    // 1. Update index.html
    // Construct the HTML string
    // Special case for zpcin: it has id="zpcinLink" and no href (or javascript:void(0))
    const htmlLines = links.map(link => {
        if (link.id === 'zpcin') {
            return `<a href="${link.url || 'javascript:void(0)'}" id="zpcinLink" data-i18n="linkTexts.${link.id}"></a>`;
        }
        return `<a href="${link.url}" data-i18n="linkTexts.${link.id}"></a>`;
    }).join(' '); // Using space joined as per original file style (or empty string/newline)
    
    // Replace the content inside <div class="wu-links">
    const linksDivRegex = /(<div class="wu-links">\s*)([\s\S]*?)(\s*<\/div>)/;
    indexContent = indexContent.replace(linksDivRegex, `$1${htmlLines}$3`);
    fs.writeFileSync(INDEX_PATH, indexContent, 'utf8');

    // 2. Update lang.js
    LANGUAGES.forEach(lang => {
        const langBlockStart = langContent.indexOf(`'${lang}':`);
        if (langBlockStart !== -1) {
            const nextLangIndex = findNextLangIndex(langContent, langBlockStart);
            // We need to match the linkTexts block within this range
            // We'll extract the substring, replace, and put it back
            const langBlockStr = langContent.substring(langBlockStart, nextLangIndex);
            
            // Generate new linkTexts content
            const newLinkTextsLines = links.map(link => {
                const text = link.translations[lang] || link.translations['zh-cn'] || ''; // Fallback
                return `      '${link.id}': '${text}'`;
            }).join(',\n');
            
            const newLinkTextsBlock = `linkTexts: {\n${newLinkTextsLines}\n    }`;
            
            // Replace in the block
            const updatedLangBlock = langBlockStr.replace(/linkTexts:\s*\{[\s\S]*?\}/, newLinkTextsBlock);
            
            // Replace in the main content. NOTE: replace only the first occurrence in the substring context
            // String.replace on the whole file with a global regex for this block is safer if unique
            // Since we know the range, we can slice
            langContent = langContent.substring(0, langBlockStart) + updatedLangBlock + langContent.substring(nextLangIndex);
        }
    });

    fs.writeFileSync(LANG_PATH, langContent, 'utf8');
    console.log('Successfully updated index.html and lang.js');
}

// CLI
const args = process.argv.slice(2);
const command = args[0];

if (command === 'extract') {
    extract();
} else if (command === 'update') {
    update();
} else {
    console.log('Usage: node set/update-links.js [extract|update]');
    console.log('  extract: Pulls current links from HTML/JS into links.json');
    console.log('  update:  Pushes changes from links.json to HTML/JS');
}
