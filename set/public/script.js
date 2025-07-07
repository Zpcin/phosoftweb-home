document.addEventListener('DOMContentLoaded', () => {
    // 全局变量
    let sections = [];
    let currentLang = 'zh-cn'; // 当前编辑的语言
    let availableLanguages = []; // 可用语言列表
    const sectionsContainer = document.getElementById('sectionsContainer');
    const addSectionBtn = document.getElementById('addSection');
    const saveChangesBtn = document.getElementById('saveChanges');
    const notification = document.getElementById('notification');
    const confirmModal = document.getElementById('confirmModal');
    const confirmMessage = document.getElementById('confirmMessage');
    const confirmYesBtn = document.getElementById('confirmYes');
    const confirmNoBtn = document.getElementById('confirmNo');
    
    let pendingAction = null;
    let lastSaveTime = null;
    let changesMade = false;
    let autoSaveInterval = null;

    // 应用多语言
    applyLang();

    // 获取可用语言列表
    fetchLanguages();

    // 初始化 - 加载所有板块
    fetchSections(currentLang);

    // 事件监听器
    addSectionBtn.addEventListener('click', addNewSection);
    saveChangesBtn.addEventListener('click', saveAllChanges);
    confirmNoBtn.addEventListener('click', () => closeConfirmModal());
    confirmYesBtn.addEventListener('click', handleConfirm);
    
    // 键盘快捷键支持
    document.addEventListener('keydown', handleKeyboardShortcuts);

    // 启动自动保存
    enableAutoSave();

    // 离开页面前确认
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 获取可用语言列表
    async function fetchLanguages() {
        try {
            const response = await fetch('/api/languages');
            if (!response.ok) throw new Error('获取语言列表失败');

            availableLanguages = await response.json();
            renderLanguageSwitcher();
        } catch (error) {
            showNotification('获取语言列表失败: ' + error.message, 'error');
        }
    }

    // 渲染语言切换器
    function renderLanguageSwitcher() {
        const header = document.querySelector('header');

        // 创建语言切换器容器
        const langSwitcherContainer = document.createElement('div');
        langSwitcherContainer.className = 'content-lang-switcher';
        langSwitcherContainer.innerHTML = `
            <label>${LANG_MAP[getLang()]?.contentLanguage || '内容语言'}:</label>
            <select id="contentLangSelect">
                ${availableLanguages.map(lang => 
                    `<option value="${lang.code}" ${lang.code === currentLang ? 'selected' : ''}>${lang.name}</option>`
                ).join('')}
            </select>
        `;

        // 添加到标题下方
        const title = header.querySelector('h1');
        if (title && title.nextSibling) {
            header.insertBefore(langSwitcherContainer, title.nextSibling);
        } else {
            header.appendChild(langSwitcherContainer);
        }

        // 添加语言切换事件
        const langSelect = document.getElementById('contentLangSelect');
        langSelect.addEventListener('change', () => {
            // 如果有未保存的更改，询问用户是否继续
            if (changesMade) {
                if (confirm(LANG_MAP[getLang()]?.unsavedChangesLangSwitch || '您有未保存的更改，切换语言将丢失这些更改。是否继续？')) {
                    switchContentLanguage(langSelect.value);
                } else {
                    // 恢复选择
                    langSelect.value = currentLang;
                }
            } else {
                switchContentLanguage(langSelect.value);
            }
        });
    }

    // 切换内容语言
    function switchContentLanguage(lang) {
        if (lang === currentLang) return;

        currentLang = lang;
        fetchSections(currentLang);
        changesMade = false;
        resetSaveButton();

        // 更新UI提示
        const langNames = {
            'zh-cn': '简体中文',
            'zh-hk': '繁体中文(香港)',
            'zh-tw': '繁体中文(台湾)',
            'en': 'English',
            'ja': '日本語'
        };

        showNotification(`已切换到${langNames[lang] || lang}内容编辑`, 'info');
    }

    // 处理键盘快捷键
    function handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + S 保存
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveAllChanges();
            return;
        }

        // Ctrl/Cmd + N 添加新板块
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            addNewSection();
            return;
        }

        // Esc关闭模态窗口
        if (e.key === 'Escape' && confirmModal.style.display === 'flex') {
            e.preventDefault();
            closeConfirmModal();
            return;
        }

        // 检查是否在编辑器内
        const activeElement = document.activeElement;
        if (activeElement && activeElement.classList.contains('section-content')) {
            // Tab键缩进
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = activeElement.selectionStart;
                const end = activeElement.selectionEnd;

                // 插入两个空格作为缩进
                activeElement.value = activeElement.value.substring(0, start) + '  ' + activeElement.value.substring(end);
                activeElement.selectionStart = activeElement.selectionEnd = start + 2;

                // 触发input事件以更新预览
                activeElement.dispatchEvent(new Event('input'));
                setChangesMade();
            }

            // Ctrl+B 加粗
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                applyMarkdownFormat(activeElement, 'bold');
                // 更新预览
                const previewEl = activeElement.closest('.section-body').querySelector('.markdown-preview');
                previewEl.innerHTML = markdownToHtml(activeElement.value);
                setChangesMade();
                return;
            }

            // Ctrl+I 斜体
            if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
                e.preventDefault();
                applyMarkdownFormat(activeElement, 'italic');
                // 更新预览
                const previewEl = activeElement.closest('.section-body').querySelector('.markdown-preview');
                previewEl.innerHTML = markdownToHtml(activeElement.value);
                setChangesMade();
                return;
            }

            // Ctrl+K 链接
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                applyMarkdownFormat(activeElement, 'link');
                // 更新预览
                const previewEl = activeElement.closest('.section-body').querySelector('.markdown-preview');
                previewEl.innerHTML = markdownToHtml(activeElement.value);
                setChangesMade();
                return;
            }
        }
    }

    // 设置变更状态
    function setChangesMade() {
        changesMade = true;

        // 更新保存按钮状态
        if (saveChangesBtn.classList.contains('btn-success')) {
            saveChangesBtn.classList.remove('btn-success');
            saveChangesBtn.classList.add('btn-warning');

            // 更新按钮图标和文本
            const currentLang = getLang();
            const text = LANG_MAP[currentLang]?.saveChangesModified || '保存未保存的更改';
            saveChangesBtn.innerHTML = `<i class="fas fa-save"></i> ${text} *`;
        }
    }

    // 离开页面前确认
    function handleBeforeUnload(e) {
        if (changesMade) {
            const currentLang = getLang();
            const message = LANG_MAP[currentLang]?.unsavedChanges || '您有未保存的更改，确定要离开吗？';
            e.returnValue = message;
            return message;
        }
    }

    // 启用自动保存
    function enableAutoSave() {
        if (autoSaveInterval) {
            clearInterval(autoSaveInterval);
        }

        // 每2分钟自动保存一次
        autoSaveInterval = setInterval(() => {
            if (changesMade) {
                autoSave();
            }
        }, 120000);
    }

    // 自动保存
    async function autoSave() {
        try {
            // 收集当前表单中的数据，并将Markdown转为HTML
            const updatedSections = collectSectionData();

            const response = await fetch('/api/sections?auto=true', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedSections)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                lastSaveTime = new Date();
                changesMade = false;

                const currentLang = getLang();
                const timeString = lastSaveTime.toLocaleTimeString();
                const message = currentLang === 'zh-cn' ?
                    `自动保存成功 (${timeString})` :
                    `Auto-saved successfully (${timeString})`;

                showNotification(message, 'info', 2000);

                // 恢复保存按钮状态
                resetSaveButton();
            }
        } catch (error) {
            console.error('自动保存错误:', error);
        }
    }

    // 重置保存按钮状态
    function resetSaveButton() {
        saveChangesBtn.classList.remove('btn-warning');
        saveChangesBtn.classList.add('btn-success');

        // 更新按钮文本
        const currentLang = getLang();
        const text = LANG_MAP[currentLang]?.saveChanges || '保存所有更改';
        saveChangesBtn.innerHTML = `<i class="fas fa-save"></i> ${text}`;
    }

    // 收集板块数据
    function collectSectionData() {
        const updatedSections = [];
        document.querySelectorAll('.section-card').forEach((card) => {
            const markdownContent = card.querySelector('.section-content').value;
            const htmlContent = markdownToHtml(markdownContent);

            updatedSections.push({
                title: card.querySelector('.section-title').value,
                content: htmlContent
            });
        });
        return updatedSections;
    }

    // HTML转Markdown - 改进版
    function htmlToMarkdown(html) {
        if (!html) return '';
        
        // 清理HTML中的多余空格
        let content = html.trim();
        
        // 预处理：将<br>标签转换为换行符
        content = content.replace(/<br\s*\/?>/gi, '\n');
        
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
                         .replace(/&#39;/g, "'")
                         .replace(/&nbsp;/g, ' ');
        
        return content;
    }
    
    // Markdown转HTML - 改进版
    function markdownToHtml(markdown) {
        if (!markdown) return '';
        
        // 基本的Markdown转换
        let html = markdown
            // 转换换行符为<br>标签
            .replace(/\n/g, '<br>')
            // 转换加粗 **粗体** 或 __粗体__
            .replace(/(\*\*|__)(.*?)\1/g, '<strong>$2</strong>')
            // 转换斜体 *斜体* 或 _斜体_
            .replace(/([*_])((?!\1).+?)\1/g, '<em>$2</em>')
            // 转换链接 [链接文本](链接地址)
            .replace(/\[([^\]]+)]\(([^)]+)\)/g, '<a href="${2}">${1}</a>')
            // 转换标题 # 标题
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            // 转换列表 - 项目
            .replace(/^\s*-\s(.*)$/gm, '<li>$1</li>')
            // 转换代码 `代码`
            .replace(/`([^`]+)`/g, '<code>$1</code>')
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
    async function fetchSections(lang) {
        try {
            const response = await fetch('/api/sections?lang=' + lang);
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
        
        if (sections.length === 0) {
            // 显示空状态提示
            const currentLang = getLang();
            const emptyText = LANG_MAP[currentLang]?.noSections || '没有信息板块，点击"添加新板块"按钮创建';

            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <i class="fas fa-info-circle"></i>
                <p>${emptyText}</p>
                <button class="btn btn-primary add-first-section">
                    <i class="fas fa-plus"></i> ${LANG_MAP[currentLang]?.addSection || '添加新板块'}
                </button>
            `;
            sectionsContainer.appendChild(emptyState);

            // 添加点击事件
            emptyState.querySelector('.add-first-section').addEventListener('click', addNewSection);
            return;
        }

        sections.forEach((section, index) => {
            // 将HTML转换为Markdown
            const markdownContent = htmlToMarkdown(section.content);
            
            const sectionElement = document.createElement('div');
            sectionElement.className = 'section-card';
            sectionElement.dataset.id = index;
            
            // 获取当前语言
            const currentLang = getLang();
            const langData = LANG_MAP[currentLang] || LANG_MAP['zh-cn'];

            sectionElement.innerHTML = `
                <div class="section-header">
                    <div class="move-handle" title="${langData.dragToMove || '拖动调整顺序'}">
                        <i class="fas fa-grip-lines"></i>
                    </div>
                    <h3>${langData.section || '板块'} #${index + 1}</h3>
                    <div class="section-actions">
                        <button class="btn btn-warning move-up" ${index === 0 ? 'disabled' : ''} 
                                title="${langData.moveUp || '上移'}">
                            <i class="fas fa-arrow-up"></i>
                        </button>
                        <button class="btn btn-warning move-down" ${index === sections.length - 1 ? 'disabled' : ''} 
                                title="${langData.moveDown || '下移'}">
                            <i class="fas fa-arrow-down"></i>
                        </button>
                        <button class="btn btn-danger delete-section" title="${langData.delete || '删除'}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="section-body">
                    <div class="input-group">
                        <label for="title-${index}">${langData.sectionTitle || '标题'}</label>
                        <input type="text" id="title-${index}" value="${section.title}" class="section-title">
                    </div>
                    <div class="markdown-toolbar">
                        <button type="button" class="md-btn" data-format="bold" title="${langData.guideBold || '加粗'}"><i class="fas fa-bold"></i></button>
                        <button type="button" class="md-btn" data-format="italic" title="${langData.guideItalic || '斜体'}"><i class="fas fa-italic"></i></button>
                        <button type="button" class="md-btn" data-format="link" title="${langData.guideLink || '链接'}"><i class="fas fa-link"></i></button>
                        <button type="button" class="md-btn" data-format="h1" title="${langData.guideH1 || '一级标题'}"><i class="fas fa-heading"></i>1</button>
                        <button type="button" class="md-btn" data-format="h2" title="${langData.guideH2 || '二级标题'}"><i class="fas fa-heading"></i>2</button>
                        <button type="button" class="md-btn" data-format="h3" title="${langData.guideH3 || '三级标题'}"><i class="fas fa-heading"></i>3</button>
                        <button type="button" class="md-btn" data-format="list" title="${langData.guideList || '列表'}"><i class="fas fa-list"></i></button>
                        <button type="button" class="md-btn" data-format="code" title="${langData.guideInlineCode || '行内代码'}"><i class="fas fa-code"></i></button>
                        <button type="button" class="md-btn" data-format="codeblock" title="${langData.guideCodeBlock || '代码块'}"><i class="fas fa-file-code"></i></button>
                    </div>
                    <div class="input-group">
                        <label for="content-${index}">${langData.sectionContent || '内容 (Markdown 格式)'}</label>
                        <textarea id="content-${index}" class="section-content">${markdownContent}</textarea>
                    </div>
                    <div class="preview-container">
                        <label>${langData.preview || '预览'}</label>
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
                setChangesMade();
            });

            // 监听标题变化
            const titleInput = sectionElement.querySelector('.section-title');
            titleInput.addEventListener('input', () => {
                setChangesMade();
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
                    setChangesMade();
                });
            });

            // 添加自动调整高度
            textarea.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = (this.scrollHeight) + 'px';
            });
            // 初始化高度
            textarea.style.height = 'auto';
            textarea.style.height = (textarea.scrollHeight) + 'px';
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
    
    // 保存所有更改 - 添加错误处理和调试信息
    async function saveAllChanges() {
        try {
            // 获取当前语言
            const currentLang = getLang();
            const langData = LANG_MAP[currentLang] || LANG_MAP['zh-cn'];

            // 显示保存中通知
            showNotification(langData.saving || '正在保存更改...', 'info');

            // 重置保存按钮状态
            saveChangesBtn.disabled = true;

            // 收集当前表单中的数据，并将Markdown转为HTML
            const updatedSections = collectSectionData();

            // 确保正确传递当前编辑的语言
            const response = await fetch(`/api/sections?lang=${currentLang}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedSections)
            });
            
            const result = await response.json();
            
            // 恢复保存按钮状态
            saveChangesBtn.disabled = false;

            if (!response.ok) {
                throw new Error(result.error || (langData.saveFailed || '保存失败'));
            }
            
            if (result.success) {
                changesMade = false;
                resetSaveButton();
                showNotification(langData.saveSuccess || `${getLanguageName(currentLang)}内容已成功保存`, 'success');
                sections = updatedSections;
                lastSaveTime = new Date();

                // 更新标题，显示已保存状态
                document.title = (langData.title || 'about.html 内容管理') + ' - ' + (langData.saved || '已保存');

                // 5秒后恢复原标题
                setTimeout(() => {
                    document.title = langData.title || 'about.html 内容管理';
                }, 5000);
            } else {
                throw new Error(langData.saveError || '保存出现问题');
            }
        } catch (error) {
            console.error('保存错误:', error);

            // 获取当前语言
            const currentLang = getLang();
            const langData = LANG_MAP[currentLang] || LANG_MAP['zh-cn'];

            showNotification((langData.saveFailedDetail || '保存失败') + ': ' + error.message, 'error');
        }
    }
    
    // 获取语言名称
    function getLanguageName(langCode) {
        const langNames = {
            'zh-cn': '简体中文',
            'zh-hk': '繁体中文(香港)',
            'zh-tw': '繁体中文(台湾)',
            'en': 'English',
            'ja': '日本語',
            'en-sg': 'Singlish',
            'wenyan': '文言文'
        };
        return langNames[langCode] || langCode;
    }

    // 显示通知
    function showNotification(message, type, duration = 3000) {
        // 清除之前的定时器
        if (notification.timeoutId) {
            clearTimeout(notification.timeoutId);
            notification.timeoutId = null;
        }

        notification.textContent = message;
        notification.className = `notification ${type}`;

        // 添加图标
        let icon = '';
        switch (type) {
            case 'success':
                icon = '<i class="fas fa-check-circle"></i> ';
                break;
            case 'error':
                icon = '<i class="fas fa-exclamation-circle"></i> ';
                break;
            case 'info':
                icon = '<i class="fas fa-info-circle"></i> ';
                break;
            case 'warning':
                icon = '<i class="fas fa-exclamation-triangle"></i> ';
                break;
        }

        notification.innerHTML = icon + message;

        // 显示通知
        notification.style.display = 'block';
        notification.style.opacity = 1;

        // 添加关闭按钮
        const closeBtn = document.createElement('span');
        closeBtn.className = 'notification-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => {
            notification.style.display = 'none';
        });
        notification.appendChild(closeBtn);

        // 设置定时器自动隐藏
        notification.timeoutId = setTimeout(() => {
            notification.style.opacity = 0;
            setTimeout(() => {
                notification.style.display = 'none';
            }, 300); // 等待淡出动画完成
        }, duration);
    }
    
    // 初始化拖放功能
    function initializeDragAndDrop() {
        let draggingElement = null;
        
        // 为所有移动手柄添加事件
        document.querySelectorAll('.section-card .move-handle').forEach(handle => {
            handle.addEventListener('mousedown', e => {
                e.preventDefault();
                
                // 获取整个卡片元素
                const card = handle.closest('.section-card');
                draggingElement = card;
                card.classList.add('dragging');
                
                // 开始拖动时记录鼠标位置
                document.addEventListener('mousemove', onMouseMove);
                document.addEventListener('mouseup', onMouseUp);
            });
        });
        
        function onMouseMove(e) {
            if (!draggingElement) return;
            
            const container = document.getElementById('sectionsContainer');
            const cards = [...container.querySelectorAll('.section-card:not(.dragging)')];
            
            // 找到要插入的位置
            const cardBelow = cards.find(card => {
                const box = card.getBoundingClientRect();
                return e.clientY < box.top + box.height / 2;
            });
            
            // 移动元素
            if (cardBelow) {
                container.insertBefore(draggingElement, cardBelow);
            } else {
                container.appendChild(draggingElement);
            }
        }
        
        function onMouseUp() {
            if (!draggingElement) return;
            
            // 移除拖动样式
            draggingElement.classList.remove('dragging');
            
            // 更新数据模型
            const newSections = [];
            document.querySelectorAll('.section-card').forEach(card => {
                const index = parseInt(card.dataset.id);
                newSections.push(sections[index]);
            });
            
            sections = newSections;
            renderSections();
            
            // 清理
            draggingElement = null;
            
            // 移除事件监听器
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }
    }
});
