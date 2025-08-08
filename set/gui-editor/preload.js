const { contextBridge, ipcRenderer } = require('electron');

// 向渲染进程暴露 API
contextBridge.exposeInMainWorld('electronAPI', {
    // 文件操作
    readAboutLangFile: () => ipcRenderer.invoke('read-about-lang-file'),
    saveAboutLangFile: (translations) => ipcRenderer.invoke('save-about-lang-file', translations),
    
    // Markdown 转换
    markdownToHtml: (text) => ipcRenderer.invoke('markdown-to-html', text),
    htmlToMarkdown: (html) => ipcRenderer.invoke('html-to-markdown', html),
    
    // 备份管理
    createBackup: () => ipcRenderer.invoke('create-backup'),
    getBackupList: () => ipcRenderer.invoke('get-backup-list'),
    restoreBackup: (backupPath) => ipcRenderer.invoke('restore-backup', backupPath),
    
    // 文件对话框
    showOpenDialog: () => ipcRenderer.invoke('show-open-dialog'),
    showSaveDialog: () => ipcRenderer.invoke('show-save-dialog'),
    readFile: (filePath) => ipcRenderer.invoke('read-file', filePath),
    writeFile: (filePath, content) => ipcRenderer.invoke('write-file', filePath, content)
});
