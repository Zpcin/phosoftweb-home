const express = require('express');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const app = express();
const PORT = process.env.PORT || 3000;

// 中间件设置 - 修复静态文件路径配置
// 管理系统静态文件
app.use('/', express.static(path.join(__dirname, 'public')));
// 主站静态文件 - 仅用于预览，不使用此路径提供服务
app.use('/site', express.static(path.join(__dirname, '../public')));
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
        res.status(500).json({ error: '读取文件失败', details: error.message });
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
