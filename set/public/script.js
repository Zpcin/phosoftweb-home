document.addEventListener('DOMContentLoaded', () => {
    // 全局变量
    let sections = [];
    const sectionsContainer = document.getElementById('sectionsContainer');
    const addSectionBtn = document.getElementById('addSection');
    const saveChangesBtn = document.getElementById('saveChanges');
    const notification = document.getElementById('notification');
    const confirmModal = document.getElementById('confirmModal');
    const confirmMessage = document.getElementById('confirmMessage');
    const confirmYesBtn = document.getElementById('confirmYes');
    const confirmNoBtn = document.getElementById('confirmNo');
    
    let pendingAction = null;
    
    // 初始化 - 加载所有板块
    fetchSections();
    
    // 事件监听器
    addSectionBtn.addEventListener('click', addNewSection);
    saveChangesBtn.addEventListener('click', saveAllChanges);
    confirmNoBtn.addEventListener('click', () => closeConfirmModal());
    confirmYesBtn.addEventListener('click', handleConfirm);
    
    // HTML转Markdown
    function htmlToMarkdown(html) {
        if (!html) return '';
        
        // 创建临时DOM元素解析HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        // 预处理：将<br>标签转换为特殊标记
        let content = html.replace(/<br\s*\/?>/gi, '\n');
        
        // 转换链接
        content = content.replace(/<a\s+(?:[^>]*?\s+)?href="([^"]*)"(?:\s+[^>]*?)?>([^<]*)<\/a>/gi, '[$2]($1)');
        
        // 转换加粗
        content = content.replace(/<(?:strong|b)>(.*?)<\/(?:strong|b)>/gi, '**$1**');
        
        // 转换斜体
        content = content.replace(/<(?:em|i)>(.*?)<\/(?:em|i)>/gi, '*$1*');
        
        // 转换标题
        content = content.replace(/<h1>(.*?)<\/h1>/gi, '# $1');
        content = content.replace(/<h2>(.*?)<\/h2>/gi, '## $1');
        content = content.replace(/<h3>(.*?)<\/h3>/gi, '### $1');
        
        // 转换列表项
        content = content.replace(/<li>(.*?)<\/li>/gi, '- $1');
        
        // 转换代码
        content = content.replace(/<code>(.*?)<\/code>/gi, '`$1`');
        
        // 转换代码块
        content = content.replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/gi, '```\n$1\n```');
        
        // 移除其他HTML标签
        content = content.replace(/<[^>]*>/g, '');
        
        // 解码HTML实体
        content = content.replace(/&lt;/g, '<')
                         .replace(/&gt;/g, '>')
                         .replace(/&amp;/g, '&')
                         .replace(/&quot;/g, '"')
                         .replace(/&#39;/g, "'");
        
        return content;
    }
    
    // Markdown转HTML
    function markdownToHtml(markdown) {
        if (!markdown) return '';
        
        // 基本的Markdown转换
        let html = markdown
            // 转换换行符为<br>标签
            .replace(/\n/g, '<br>')
            // 转换加粗 **粗体** 或 __粗体__
            .replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>')
            // 转换斜体 *斜体* 或 _斜体_
            .replace(/(\*|_)(.*?)\1/g, '<em>$2</em>')
            // 转换链接 [链接文本](链接地址)
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
            // 转换标题 # 标题
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            // 转换列表 - 项目
            .replace(/^\s*-\s(.*)$/gm, '<li>$1</li>')
            // 转换代码 `代码`
            .replace(/`(.*?)`/g, '<code>$1</code>')
            // 转换代码块 ```代码块```
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
            
        return html;
    }
    
    // 应用Markdown格式到选中文本
    function applyMarkdownFormat(textarea, format) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = textarea.value.substring(start, end);
        let formattedText = '';
        
        switch (format) {
            case 'bold':
                formattedText = `**${selectedText}**`;
                break;
            case 'italic':
                formattedText = `*${selectedText}*`;
                break;
            case 'link':
                formattedText = `[${selectedText}](url)`;
                break;
            case 'h1':
                formattedText = `# ${selectedText}`;
                break;
            case 'h2':
                formattedText = `## ${selectedText}`;
                break;
            case 'h3':
                formattedText = `### ${selectedText}`;
                break;
            case 'list':
                formattedText = selectedText.split('\n').map(line => `- ${line}`).join('\n');
                break;
            case 'code':
                formattedText = `\`${selectedText}\``;
                break;
            case 'codeblock':
                formattedText = `\`\`\`\n${selectedText}\n\`\`\``;
                break;
        }
        
        textarea.value = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
        textarea.focus();
        textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }
    
    // 获取所有信息板块
    async function fetchSections() {
        try {
            const response = await fetch('/api/sections');
            if (!response.ok) throw new Error('获取数据失败');
            
            sections = await response.json();
            renderSections();
        } catch (error) {
            showNotification('获取信息板块失败: ' + error.message, 'error');
        }
    }
    
    // 渲染所有板块
    function renderSections() {
        sectionsContainer.innerHTML = '';
        
        sections.forEach((section, index) => {
            // 将HTML转换为Markdown
            const markdownContent = htmlToMarkdown(section.content);
            
            const sectionElement = document.createElement('div');
            sectionElement.className = 'section-card';
            sectionElement.dataset.id = index;
            
            sectionElement.innerHTML = `
                <div class="section-header">
                    <div class="move-handle">
                        <i class="fas fa-grip-lines"></i>
                    </div>
                    <h3>板块 #${index + 1}</h3>
                    <div class="section-actions">
                        <button class="btn btn-warning move-up" ${index === 0 ? 'disabled' : ''}>
                            <i class="fas fa-arrow-up"></i>
                        </button>
                        <button class="btn btn-warning move-down" ${index === sections.length - 1 ? 'disabled' : ''}>
                            <i class="fas fa-arrow-down"></i>
                        </button>
                        <button class="btn btn-danger delete-section">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="section-body">
                    <div class="input-group">
                        <label for="title-${index}">标题</label>
                        <input type="text" id="title-${index}" value="${section.title}" class="section-title">
                    </div>
                    <div class="markdown-toolbar">
                        <button type="button" class="md-btn" data-format="bold" title="加粗"><i class="fas fa-bold"></i></button>
                        <button type="button" class="md-btn" data-format="italic" title="斜体"><i class="fas fa-italic"></i></button>
                        <button type="button" class="md-btn" data-format="link" title="链接"><i class="fas fa-link"></i></button>
                        <button type="button" class="md-btn" data-format="h1" title="一级标题"><i class="fas fa-heading"></i>1</button>
                        <button type="button" class="md-btn" data-format="h2" title="二级标题"><i class="fas fa-heading"></i>2</button>
                        <button type="button" class="md-btn" data-format="h3" title="三级标题"><i class="fas fa-heading"></i>3</button>
                        <button type="button" class="md-btn" data-format="list" title="列表"><i class="fas fa-list"></i></button>
                        <button type="button" class="md-btn" data-format="code" title="行内代码"><i class="fas fa-code"></i></button>
                        <button type="button" class="md-btn" data-format="codeblock" title="代码块"><i class="fas fa-file-code"></i></button>
                    </div>
                    <div class="input-group">
                        <label for="content-${index}">内容 (Markdown 格式)</label>
                        <textarea id="content-${index}" class="section-content">${markdownContent}</textarea>
                    </div>
                    <div class="preview-container">
                        <label>预览</label>
                        <div class="markdown-preview"></div>
                    </div>
                </div>
            `;
            
            sectionsContainer.appendChild(sectionElement);
            
            // 添加事件监听器
            sectionElement.querySelector('.move-up').addEventListener('click', () => moveSection(index, 'up'));
            sectionElement.querySelector('.move-down').addEventListener('click', () => moveSection(index, 'down'));
            sectionElement.querySelector('.delete-section').addEventListener('click', () => confirmDeleteSection(index));
            
            // 添加Markdown工具栏事件
            const textarea = sectionElement.querySelector('.section-content');
            const preview = sectionElement.querySelector('.markdown-preview');
            
            // 实时更新预览
            textarea.addEventListener('input', () => {
                preview.innerHTML = markdownToHtml(textarea.value);
            });
            
            // 初始化预览
            preview.innerHTML = markdownToHtml(markdownContent);
            
            // Markdown按钮事件
            sectionElement.querySelectorAll('.md-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const format = btn.dataset.format;
                    applyMarkdownFormat(textarea, format);
                    // 更新预览
                    preview.innerHTML = markdownToHtml(textarea.value);
                });
            });
        });
        
        initializeDragAndDrop();
    }
    
    // 添加新板块
    function addNewSection() {
        sections.push({
            title: '新板块',
            content: '请在这里输入内容...'
        });
        renderSections();
        showNotification('已添加新板块', 'success');
    }
    
    // 移动板块
    function moveSection(index, direction) {
        if (direction === 'up' && index > 0) {
            [sections[index], sections[index - 1]] = [sections[index - 1], sections[index]];
        } else if (direction === 'down' && index < sections.length - 1) {
            [sections[index], sections[index + 1]] = [sections[index + 1], sections[index]];
        }
        renderSections();
    }
    
    // 确认删除板块
    function confirmDeleteSection(index) {
        pendingAction = () => deleteSection(index);
        confirmMessage.textContent = `确定要删除"${sections[index].title}"板块吗？此操作无法撤销。`;
        confirmModal.style.display = 'flex';
    }
    
    // 删除板块
    function deleteSection(index) {
        sections.splice(index, 1);
        renderSections();
        showNotification('已删除板块', 'success');
    }
    
    // 处理确认对话框
    function handleConfirm() {
        if (pendingAction) {
            pendingAction();
            pendingAction = null;
        }
        closeConfirmModal();
    }
    
    // 关闭确认对话框
    function closeConfirmModal() {
        confirmModal.style.display = 'none';
    }
    
    // 保存所有更改
    async function saveAllChanges() {
        // 收集当前表单中的数据，并将Markdown转为HTML
        const updatedSections = [];
        document.querySelectorAll('.section-card').forEach((card, i) => {
            const markdownContent = card.querySelector('.section-content').value;
            const htmlContent = markdownToHtml(markdownContent);
            
            updatedSections.push({
                title: card.querySelector('.section-title').value,
                content: htmlContent
            });
        });
        
        try {
            const response = await fetch('/api/sections', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedSections)
            });
            
            if (!response.ok) throw new Error('保存失败');
            
            const result = await response.json();
            if (result.success) {
                showNotification('所有更改已成功保存', 'success');
                sections = updatedSections;
            }
        } catch (error) {
            showNotification('保存失败: ' + error.message, 'error');
        }
    }
    
    // 显示通知
    function showNotification(message, type) {
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.style.display = 'block';
        
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
    
    // 初始化拖放功能
    function initializeDragAndDrop() {
        const sectionContainer = document.getElementById('sectionsContainer');
        let draggedItem = null;
        
        document.querySelectorAll('.section-card').forEach(card => {
            const handle = card.querySelector('.move-handle');
            
            handle.addEventListener('mousedown', function() {
                draggedItem = card;
                setTimeout(() => {
                    card.classList.add('sortable-ghost');
                }, 0);
            });
            
            card.addEventListener('dragstart', function(e) {
                e.preventDefault(); // 禁用默认拖拽效果
            });
            
            document.addEventListener('mouseup', function() {
                if (draggedItem) {
                    draggedItem.classList.remove('sortable-ghost');
                    draggedItem = null;
                }
            });
            
            document.addEventListener('mousemove', function(e) {
                if (!draggedItem) return;
                
                const cards = [...document.querySelectorAll('.section-card')];
                const currentIndex = cards.indexOf(draggedItem);
                
                cards.forEach((otherCard, index) => {
                    if (otherCard === draggedItem) return;
                    
                    const rect = otherCard.getBoundingClientRect();
                    const mouseInCard = e.clientY > rect.top && e.clientY < rect.bottom;
                    
                    if (mouseInCard) {
                        if (index < currentIndex) {
                            // 向上移动
                            sectionContainer.insertBefore(draggedItem, otherCard);
                        } else {
                            // 向下移动
                            sectionContainer.insertBefore(draggedItem, otherCard.nextSibling);
                        }
                        
                        // 重新排序数据数组
                        const newSections = [];
                        document.querySelectorAll('.section-card').forEach((card, idx) => {
                            const oldIndex = parseInt(card.dataset.id);
                            newSections[idx] = sections[oldIndex];
                        });
                        sections = newSections;
                        
                        // 重新渲染以更新索引和按钮状态
                        renderSections();
                    }
                });
            });
        });
    }
});
