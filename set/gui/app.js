/**
 * About-lang.js Web GUI 编辑器前端应用
 */

class AboutLangEditor {
    constructor() {
        this.translations = {};
        this.currentLanguage = null;
        this.isModified = false;
        this.editors = new Map(); // 存储 CodeMirror 编辑器实例
        this.editMode = 'split'; // 'split', 'write', 'preview'
        this.init();
    }

    async init() {
        this.bindEvents();
        await this.loadTranslations();
        this.renderLanguageList();
    }

    bindEvents() {
        // 保存按钮
        document.getElementById('save-btn').addEventListener('click', () => this.saveTranslations());
        
        // 备份按钮
        document.getElementById('backup-btn').addEventListener('click', () => this.showBackupModal());
        
        // 添加语言按钮
        document.getElementById('add-lang-btn').addEventListener('click', () => this.showAddLanguageModal());
        
        // 添加内容块按钮
        document.getElementById('add-section-btn').addEventListener('click', () => this.addSection());
        
        // 导入按钮
        document.getElementById('import-btn').addEventListener('click', () => {
            document.getElementById('import-file').click();
        });
        
        // 文件导入
        document.getElementById('import-file').addEventListener('change', (e) => this.handleFileImport(e));
        
        // 模态框关闭
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => this.closeModal(e.target.closest('.modal')));
        });
        
        // 模态框外点击关闭
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });
        
        // 添加语言确认
        document.getElementById('add-lang-confirm').addEventListener('click', () => this.addLanguage());
        
        // 删除语言按钮
        document.getElementById('delete-lang-btn').addEventListener('click', () => this.deleteLanguage());
        
        // 导出语言按钮
        document.getElementById('export-lang-btn').addEventListener('click', () => this.exportLanguage());
        
        // 导入确认
        document.getElementById('import-confirm').addEventListener('click', () => this.confirmImport());
        
        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.saveTranslations();
            }
            // Markdown 快捷键
            if (e.ctrlKey && e.key === 'b') {
                e.preventDefault();
                this.insertMarkdown('**', '**');
            }
            if (e.ctrlKey && e.key === 'i') {
                e.preventDefault();
                this.insertMarkdown('*', '*');
            }
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                this.insertLink();
            }
        });
    }

    async loadTranslations() {
        try {
            this.showLoading(true);
            const response = await fetch('/api/translations');
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }
            
            this.translations = data.translations;
            this.isModified = false;
            this.updateSaveButton();
        } catch (error) {
            this.showNotification(`加载失败: ${error.message}`, 'error');
        } finally {
            this.showLoading(false);
        }
    }

    async saveTranslations() {
        try {
            this.showLoading(true);
            const response = await fetch('/api/translations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ translations: this.translations })
            });
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }
            
            this.isModified = false;
            this.updateSaveButton();
            this.showNotification('保存成功!', 'success');
        } catch (error) {
            this.showNotification(`保存失败: ${error.message}`, 'error');
        } finally {
            this.showLoading(false);
        }
    }

    renderLanguageList() {
        const listElement = document.getElementById('language-list');
        listElement.innerHTML = '';
        
        Object.keys(this.translations).forEach(lang => {
            const item = document.createElement('div');
            item.className = `language-item ${lang === this.currentLanguage ? 'active' : ''}`;
            item.innerHTML = `
                <div class="language-code">${lang}</div>
                <div class="language-count">${this.translations[lang].length} 个条目</div>
            `;
            item.addEventListener('click', () => this.selectLanguage(lang));
            listElement.appendChild(item);
        });
    }

    selectLanguage(lang) {
        this.currentLanguage = lang;
        this.renderLanguageList();
        this.renderEditor();
        
        // 更新标题
        document.getElementById('current-lang-title').textContent = `编辑语言: ${lang}`;
        document.getElementById('lang-actions').style.display = 'flex';
        document.getElementById('add-section-btn').disabled = false;
    }

    renderEditor() {
        const editorContent = document.getElementById('editor-content');
        const sections = this.translations[this.currentLanguage] || [];
        
        // 清理旧的编辑器实例
        this.editors.forEach(editor => {
            editor.toTextArea();
        });
        this.editors.clear();
        
        editorContent.innerHTML = '';
        
        sections.forEach((section, index) => {
            const sectionElement = this.createSectionElement(section, index);
            editorContent.appendChild(sectionElement);
        });
    }

    createSectionElement(section, index) {
        const div = document.createElement('div');
        div.className = 'section-item';
        div.innerHTML = `
            <div class="section-header">
                <span class="section-title">内容块 ${index + 1}</span>
                <div class="section-actions">
                    <button class="btn btn-small btn-info" onclick="editor.moveSection(${index}, -1)" ${index === 0 ? 'disabled' : ''}>
                        <i class="fas fa-arrow-up"></i>
                    </button>
                    <button class="btn btn-small btn-info" onclick="editor.moveSection(${index}, 1)" ${index === this.translations[this.currentLanguage].length - 1 ? 'disabled' : ''}>
                        <i class="fas fa-arrow-down"></i>
                    </button>
                    <button class="btn btn-small btn-danger" onclick="editor.deleteSection(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <div class="section-body">
                <div class="form-group">
                    <label>标题:</label>
                    <input type="text" class="form-control" value="${this.escapeHtml(section.title)}" 
                           onchange="editor.updateSection(${index}, 'title', this.value)">
                </div>
                
                <!-- 编辑模式切换 -->
                <div class="edit-mode-toggle">
                    <button class="mode-btn active" onclick="editor.setEditMode(${index}, 'split')">
                        <i class="fas fa-columns"></i> 分屏
                    </button>
                    <button class="mode-btn" onclick="editor.setEditMode(${index}, 'write')">
                        <i class="fas fa-edit"></i> 编辑
                    </button>
                    <button class="mode-btn" onclick="editor.setEditMode(${index}, 'preview')">
                        <i class="fas fa-eye"></i> 预览
                    </button>
                </div>
                
                <!-- Markdown 编辑器容器 -->
                <div class="editor-container split-view" id="editor-container-${index}">
                    <!-- 编辑面板 -->
                    <div class="editor-pane">
                        <div class="editor-toolbar">
                            <button class="toolbar-btn" onclick="editor.insertMarkdown(${index}, '**', '**')" title="粗体 (Ctrl+B)">
                                <i class="fas fa-bold"></i>
                            </button>
                            <button class="toolbar-btn" onclick="editor.insertMarkdown(${index}, '*', '*')" title="斜体 (Ctrl+I)">
                                <i class="fas fa-italic"></i>
                            </button>
                            <div class="toolbar-separator"></div>
                            <button class="toolbar-btn" onclick="editor.insertLink(${index})" title="链接 (Ctrl+K)">
                                <i class="fas fa-link"></i>
                            </button>
                            <button class="toolbar-btn" onclick="editor.insertMarkdown(${index}, '\`', '\`')" title="代码">
                                <i class="fas fa-code"></i>
                            </button>
                            <div class="toolbar-separator"></div>
                            <button class="toolbar-btn" onclick="editor.insertList(${index}, '-')" title="无序列表">
                                <i class="fas fa-list-ul"></i>
                            </button>
                            <button class="toolbar-btn" onclick="editor.insertList(${index}, '1.')" title="有序列表">
                                <i class="fas fa-list-ol"></i>
                            </button>
                            <div class="toolbar-separator"></div>
                            <button class="toolbar-btn" onclick="editor.insertMarkdown(${index}, '> ', '')" title="引用">
                                <i class="fas fa-quote-right"></i>
                            </button>
                            <button class="toolbar-btn" onclick="editor.insertMarkdown(${index}, '\\n---\\n', '')" title="分隔线">
                                <i class="fas fa-minus"></i>
                            </button>
                        </div>
                        <textarea id="editor-${index}" class="form-control markdown-editor">${this.htmlToMarkdown(section.content)}</textarea>
                    </div>
                    
                    <!-- 预览面板 -->
                    <div class="preview-pane">
                        <div class="preview-header">
                            <span>预览</span>
                            <span class="word-count" id="word-count-${index}">0 字符</span>
                        </div>
                        <div class="preview-content-wrapper">
                            <div class="preview-content" id="preview-${index}">${section.content}</div>
                        </div>
                    </div>
                </div>
                
                <div class="shortcuts-hint">
                    <strong>快捷键:</strong> Ctrl+B (粗体), Ctrl+I (斜体), Ctrl+K (链接), Ctrl+S (保存)
                </div>
            </div>
        `;
        
        // 初始化 CodeMirror 编辑器
        setTimeout(() => {
            this.initCodeMirror(index);
        }, 100);
        
        return div;
    }

    updateSection(index, field, value) {
        if (!this.currentLanguage) return;
        
        if (field === 'title') {
            this.translations[this.currentLanguage][index][field] = value;
            this.markModified();
        }
        // 内容更新现在通过 CodeMirror 的 change 事件处理
    }

    moveSection(index, direction) {
        if (!this.currentLanguage) return;
        
        const sections = this.translations[this.currentLanguage];
        const newIndex = index + direction;
        
        if (newIndex < 0 || newIndex >= sections.length) return;
        
        // 交换位置
        [sections[index], sections[newIndex]] = [sections[newIndex], sections[index]];
        
        this.markModified();
        this.renderEditor();
    }

    deleteSection(index) {
        if (!this.currentLanguage) return;
        
        if (confirm('确定要删除这个内容块吗？')) {
            this.translations[this.currentLanguage].splice(index, 1);
            this.markModified();
            this.renderEditor();
        }
    }

    addSection() {
        if (!this.currentLanguage) return;
        
        const newSection = {
            title: '新标题',
            content: '新内容'
        };
        
        this.translations[this.currentLanguage].push(newSection);
        this.markModified();
        this.renderEditor();
        this.renderLanguageList();
    }

    showAddLanguageModal() {
        document.getElementById('add-lang-modal').classList.add('show');
        document.getElementById('new-lang-code').value = '';
        document.getElementById('new-lang-code').focus();
    }

    addLanguage() {
        const langCode = document.getElementById('new-lang-code').value.trim();
        
        if (!langCode) {
            this.showNotification('请输入语言代码', 'warning');
            return;
        }
        
        if (this.translations[langCode]) {
            this.showNotification('该语言已存在', 'warning');
            return;
        }
        
        // 复制中文内容作为模板
        const template = this.translations['zh-cn'] || [];
        this.translations[langCode] = JSON.parse(JSON.stringify(template));
        
        this.markModified();
        this.renderLanguageList();
        this.selectLanguage(langCode);
        this.closeModal(document.getElementById('add-lang-modal'));
        this.showNotification(`已添加语言: ${langCode}`, 'success');
    }

    deleteLanguage() {
        if (!this.currentLanguage) return;
        
        if (confirm(`确定要删除语言 "${this.currentLanguage}" 吗？这将删除该语言的所有内容。`)) {
            delete this.translations[this.currentLanguage];
            this.markModified();
            this.currentLanguage = null;
            this.renderLanguageList();
            
            // 重置编辑器
            document.getElementById('editor-content').innerHTML = `
                <div class="welcome-message">
                    <i class="fas fa-arrow-left"></i>
                    <p>请从左侧选择一个语言开始编辑，或者添加新的语言。</p>
                </div>
            `;
            document.getElementById('current-lang-title').textContent = '选择一个语言开始编辑';
            document.getElementById('lang-actions').style.display = 'none';
            document.getElementById('add-section-btn').disabled = true;
            
            this.showNotification('语言已删除', 'success');
        }
    }

    exportLanguage() {
        if (!this.currentLanguage) return;
        
        const sections = this.translations[this.currentLanguage];
        
        fetch('/api/export-markdown', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                language: this.currentLanguage,
                sections: sections
            })
        })
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `about-${this.currentLanguage}.md`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            this.showNotification('导出成功', 'success');
        })
        .catch(error => {
            this.showNotification(`导出失败: ${error.message}`, 'error');
        });
    }

    async showBackupModal() {
        try {
            const response = await fetch('/api/backups');
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }
            
            const backupList = document.getElementById('backup-list');
            backupList.innerHTML = '';
            
            if (data.backups.length === 0) {
                backupList.innerHTML = '<p style="text-align: center; color: #6c757d;">暂无备份文件</p>';
            } else {
                data.backups.forEach(backup => {
                    const item = document.createElement('div');
                    item.className = 'backup-item';
                    item.innerHTML = `
                        <div class="backup-info">
                            <h4>${backup.name}</h4>
                            <small>创建时间: ${new Date(backup.created).toLocaleString()}</small>
                            <small>大小: ${(backup.size / 1024).toFixed(1)} KB</small>
                        </div>
                        <button class="btn btn-small btn-primary" onclick="editor.restoreBackup('${backup.name}')">
                            <i class="fas fa-undo"></i> 恢复
                        </button>
                    `;
                    backupList.appendChild(item);
                });
            }
            
            document.getElementById('backup-modal').classList.add('show');
        } catch (error) {
            this.showNotification(`加载备份失败: ${error.message}`, 'error');
        }
    }

    async restoreBackup(filename) {
        if (!confirm('确定要恢复此备份吗？当前的修改将会丢失。')) {
            return;
        }
        
        try {
            this.showLoading(true);
            const response = await fetch(`/api/restore/${filename}`, {
                method: 'POST'
            });
            
            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }
            
            await this.loadTranslations();
            this.renderLanguageList();
            
            // 重置编辑器
            this.currentLanguage = null;
            document.getElementById('editor-content').innerHTML = `
                <div class="welcome-message">
                    <i class="fas fa-arrow-left"></i>
                    <p>请从左侧选择一个语言开始编辑，或者添加新的语言。</p>
                </div>
            `;
            document.getElementById('current-lang-title').textContent = '选择一个语言开始编辑';
            document.getElementById('lang-actions').style.display = 'none';
            document.getElementById('add-section-btn').disabled = true;
            
            this.closeModal(document.getElementById('backup-modal'));
            this.showNotification('备份恢复成功', 'success');
        } catch (error) {
            this.showNotification(`恢复失败: ${error.message}`, 'error');
        } finally {
            this.showLoading(false);
        }
    }

    handleFileImport(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const formData = new FormData();
        formData.append('file', file);
        
        fetch('/api/import-markdown', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            
            this.showImportPreview(data.sections);
        })
        .catch(error => {
            this.showNotification(`导入失败: ${error.message}`, 'error');
        });
        
        // 清空文件输入
        event.target.value = '';
    }

    showImportPreview(sections) {
        // 填充语言选择下拉框
        const targetSelect = document.getElementById('import-target-lang');
        targetSelect.innerHTML = '';
        
        Object.keys(this.translations).forEach(lang => {
            const option = document.createElement('option');
            option.value = lang;
            option.textContent = lang;
            targetSelect.appendChild(option);
        });
        
        // 显示预览
        const preview = document.getElementById('import-preview');
        preview.innerHTML = '';
        
        sections.forEach((section, index) => {
            const item = document.createElement('div');
            item.className = 'preview-section';
            item.innerHTML = `
                <div class="preview-title">${index + 1}. ${this.escapeHtml(section.title)}</div>
                <div class="preview-content">${section.content}</div>
            `;
            preview.appendChild(item);
        });
        
        // 保存导入数据
        this.importData = sections;
        
        document.getElementById('import-modal').classList.add('show');
    }

    confirmImport() {
        const targetLang = document.getElementById('import-target-lang').value;
        
        if (!targetLang || !this.importData) {
            this.showNotification('请选择目标语言', 'warning');
            return;
        }
        
        if (confirm(`确定要将导入的内容覆盖到语言 "${targetLang}" 吗？`)) {
            this.translations[targetLang] = this.importData;
            this.markModified();
            this.renderLanguageList();
            
            if (this.currentLanguage === targetLang) {
                this.renderEditor();
            }
            
            this.closeModal(document.getElementById('import-modal'));
            this.showNotification(`导入成功，已覆盖语言 "${targetLang}"`, 'success');
        }
    }

    async markdownToHtml(text) {
        try {
            const response = await fetch('/api/markdown-to-html', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text })
            });
            
            const data = await response.json();
            return data.html || text;
        } catch (error) {
            return text;
        }
    }

    htmlToMarkdown(html) {
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
            
            // 转换列表
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
            .replace(/\n{3,}/g, '\n\n')
            .replace(/^\s+|\s+$/g, '')
            .replace(/ {3,}/g, ' ')
            .replace(/\t/g, '    ');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    markModified() {
        this.isModified = true;
        this.updateSaveButton();
    }

    updateSaveButton() {
        const saveBtn = document.getElementById('save-btn');
        saveBtn.disabled = !this.isModified;
        saveBtn.innerHTML = this.isModified 
            ? '<i class="fas fa-save"></i> 保存 *' 
            : '<i class="fas fa-save"></i> 保存';
    }

    showLoading(show) {
        const loading = document.getElementById('loading');
        if (show) {
            loading.classList.add('show');
        } else {
            loading.classList.remove('show');
        }
    }

    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const messageElement = notification.querySelector('.notification-message');
        
        messageElement.textContent = message;
        notification.className = `notification ${type} show`;
        
        // 自动隐藏
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
        
        // 手动关闭
        notification.querySelector('.notification-close').onclick = () => {
            notification.classList.remove('show');
        };
    }

    closeModal(modal) {
        modal.classList.remove('show');
    }

    // 初始化 CodeMirror 编辑器
    initCodeMirror(index) {
        const textarea = document.getElementById(`editor-${index}`);
        if (!textarea) return;

        const editor = CodeMirror.fromTextArea(textarea, {
            mode: 'markdown',
            theme: 'github',
            lineNumbers: false,
            lineWrapping: true,
            styleActiveLine: true,
            indentWithTabs: false,
            indentUnit: 4,
            smartIndent: true,
            extraKeys: {
                'Ctrl-B': () => this.insertMarkdown(index, '**', '**'),
                'Ctrl-I': () => this.insertMarkdown(index, '*', '*'),
                'Ctrl-K': () => this.insertLink(index),
                'Enter': 'newlineAndIndentContinueMarkdownList',
                'Shift-Enter': (cm) => {
                    // Shift+Enter 插入强制换行（两个空格 + 换行）
                    cm.replaceSelection('  \n');
                },
                'Tab': (cm) => {
                    // Tab 键处理：在列表中增加缩进，否则插入空格
                    const cursor = cm.getCursor();
                    const line = cm.getLine(cursor.line);
                    if (line.match(/^\s*([-*+]|\d+\.)\s/)) {
                        cm.indentLine(cursor.line);
                    } else {
                        cm.replaceSelection('    ');
                    }
                },
                'Shift-Tab': (cm) => {
                    // Shift+Tab 减少缩进
                    cm.indentLine(cm.getCursor().line, 'subtract');
                }
            }
        });

        // 监听内容变化
        editor.on('change', (cm, change) => {
            // 防抖处理，避免频繁更新
            clearTimeout(this.updateTimeout);
            this.updateTimeout = setTimeout(() => {
                this.updateSectionFromEditor(index, cm.getValue());
            }, 300);
        });

        // 监听光标位置变化，自动格式化
        editor.on('cursorActivity', (cm) => {
            this.handleCursorActivity(cm, index);
        });

        // 存储编辑器实例
        this.editors.set(index, editor);

        // 初始更新
        this.updateWordCount(index, editor.getValue());
    }

    // 设置编辑模式
    setEditMode(index, mode) {
        const container = document.getElementById(`editor-container-${index}`);
        const modeButtons = container.parentElement.querySelectorAll('.mode-btn');
        
        // 更新按钮状态
        modeButtons.forEach(btn => btn.classList.remove('active'));
        modeButtons.forEach(btn => {
            if (btn.textContent.includes('分屏') && mode === 'split') btn.classList.add('active');
            if (btn.textContent.includes('编辑') && mode === 'write') btn.classList.add('active');
            if (btn.textContent.includes('预览') && mode === 'preview') btn.classList.add('active');
        });

        // 更新容器类
        container.className = `editor-container ${mode === 'split' ? 'split-view' : mode === 'write' ? 'write-only' : 'preview-only'}`;

        // 刷新编辑器
        const editorInstance = this.editors.get(index);
        if (editorInstance) {
            setTimeout(() => editorInstance.refresh(), 100);
        }
    }

    // 插入 Markdown 语法
    insertMarkdown(index, before, after) {
        const editorInstance = this.editors.get(index);
        if (!editorInstance) return;

        const doc = editorInstance.getDoc();
        const cursor = doc.getCursor();
        const selection = doc.getSelection();

        if (selection) {
            // 有选中文本，包围选中内容
            doc.replaceSelection(before + selection + after);
        } else {
            // 没有选中文本，插入语法并定位光标
            doc.replaceRange(before + after, cursor);
            doc.setCursor({
                line: cursor.line,
                ch: cursor.ch + before.length
            });
        }

        editorInstance.focus();
    }

    // 插入链接
    insertLink(index) {
        const editorInstance = this.editors.get(index);
        if (!editorInstance) return;

        const doc = editorInstance.getDoc();
        const selection = doc.getSelection();
        const linkText = selection || '链接文本';
        const linkUrl = prompt('请输入链接地址:', 'https://');

        if (linkUrl) {
            doc.replaceSelection(`[${linkText}](${linkUrl})`);
        }

        editorInstance.focus();
    }

    // 插入列表
    insertList(index, listType) {
        const editorInstance = this.editors.get(index);
        if (!editorInstance) return;

        const doc = editorInstance.getDoc();
        const cursor = doc.getCursor();
        const line = doc.getLine(cursor.line);

        if (line.trim() === '') {
            // 空行，直接插入列表项
            doc.replaceRange(`${listType} `, cursor);
        } else {
            // 非空行，在行首插入列表标记
            doc.replaceRange(`${listType} `, { line: cursor.line, ch: 0 });
        }

        editorInstance.focus();
    }

    // 从编辑器更新内容
    updateSectionFromEditor(index, content) {
        if (!this.currentLanguage) return;

        // 将 Markdown 转换为 HTML
        this.markdownToHtml(content).then(html => {
            this.translations[this.currentLanguage][index].content = html;
            this.markModified();

            // 更新预览
            const previewElement = document.getElementById(`preview-${index}`);
            if (previewElement) {
                previewElement.innerHTML = html;
            }

            // 更新字数统计
            this.updateWordCount(index, content);
        });
    }

    // 更新字数统计
    updateWordCount(index, content) {
        const wordCountElement = document.getElementById(`word-count-${index}`);
        if (wordCountElement) {
            const charCount = content.length;
            const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
            const lineCount = content.split('\n').length;
            wordCountElement.textContent = `${charCount} 字符, ${wordCount} 词, ${lineCount} 行`;
        }
    }

    // 处理光标活动
    handleCursorActivity(cm, index) {
        const cursor = cm.getCursor();
        const line = cm.getLine(cursor.line);
        
        // 自动格式化当前行
        this.autoFormatLine(cm, cursor.line);
        
        // 更新状态栏信息
        this.updateEditorStatus(index, cursor, line);
    }

    // 自动格式化行
    autoFormatLine(cm, lineNum) {
        const line = cm.getLine(lineNum);
        if (!line) return;

        // 自动调整列表缩进
        const listMatch = line.match(/^(\s*)([-*+]|\d+\.)\s+/);
        if (listMatch) {
            const [, indent, marker] = listMatch;
            const properIndent = this.calculateListIndent(cm, lineNum);
            if (indent.length !== properIndent) {
                const newLine = ' '.repeat(properIndent) + marker + ' ' + line.replace(/^(\s*)([-*+]|\d+\.)\s+/, '');
                cm.replaceRange(newLine, {line: lineNum, ch: 0}, {line: lineNum, ch: line.length});
            }
        }

        // 自动处理引用格式
        const quoteMatch = line.match(/^(\s*)>\s*/);
        if (quoteMatch && !line.match(/^(\s*)>\s+\S/)) {
            const [, indent] = quoteMatch;
            const newLine = indent + '> ';
            if (line !== newLine) {
                cm.replaceRange(newLine, {line: lineNum, ch: 0}, {line: lineNum, ch: line.length});
            }
        }
    }

    // 计算列表应该的缩进级别
    calculateListIndent(cm, lineNum) {
        let indent = 0;
        for (let i = lineNum - 1; i >= 0; i--) {
            const prevLine = cm.getLine(i);
            if (!prevLine.trim()) continue;
            
            const listMatch = prevLine.match(/^(\s*)([-*+]|\d+\.)\s+/);
            if (listMatch) {
                return listMatch[1].length;
            } else if (!prevLine.match(/^\s/)) {
                break;
            }
        }
        return indent;
    }

    // 更新编辑器状态
    updateEditorStatus(index, cursor, line) {
        // 可以在这里添加状态栏显示光标位置、当前模式等信息
        // 暂时保留接口，供将来扩展使用
    }

    // 智能插入段落
    insertParagraph(index) {
        const editorInstance = this.editors.get(index);
        if (!editorInstance) return;

        const doc = editorInstance.getDoc();
        const cursor = doc.getCursor();
        
        // 插入两个换行符创建新段落
        doc.replaceRange('\n\n', cursor);
        doc.setCursor({
            line: cursor.line + 2,
            ch: 0
        });

        editorInstance.focus();
    }

    // 智能格式化选中文本
    formatSelection(index, type) {
        const editorInstance = this.editors.get(index);
        if (!editorInstance) return;

        const doc = editorInstance.getDoc();
        const selection = doc.getSelection();
        
        if (!selection) return;

        let formatted = '';
        switch (type) {
            case 'trim':
                // 清理多余空白
                formatted = selection.replace(/\s+/g, ' ').trim();
                break;
            case 'paragraph':
                // 格式化为段落
                formatted = selection.split(/\n\s*\n/).map(p => p.trim()).filter(p => p).join('\n\n');
                break;
            case 'lines':
                // 格式化行
                formatted = selection.split('\n').map(line => line.trim()).join('\n');
                break;
        }

        if (formatted !== selection) {
            doc.replaceSelection(formatted);
        }

        editorInstance.focus();
    }
}

// 全局实例
let editor;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    editor = new AboutLangEditor();
});

// 页面离开前提醒保存
window.addEventListener('beforeunload', (e) => {
    if (editor && editor.isModified) {
        e.preventDefault();
        e.returnValue = '';
    }
});
