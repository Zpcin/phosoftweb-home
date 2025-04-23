const express = require('express');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

// 中间件设置
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// 获取 about.html 中的所有信息板块
app.get('/api/sections', (req, res) => {
    try {
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
    } catch (error) {
        console.error('读取文件失败:', error);
        res.status(500).json({ error: '读取文件失败' });
    }
});

// 保存更新后的信息板块
app.post('/api/sections', (req, res) => {
    try {
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
        res.json({ success: true });
    } catch (error) {
        console.error('保存文件失败:', error);
        res.status(500).json({ error: '保存文件失败' });
    }
});

app.listen(PORT, () => {
    console.log(`管理服务器运行在 http://localhost:${PORT}`);
});
