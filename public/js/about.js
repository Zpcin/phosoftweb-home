// About Modal Logic
(function() {
    // 多语言配置
    const ABOUT_LANG_MAP = {
        'zh-cn': { about: '关于', prev: '上一条', next: '下一条', pageTitle: '关于 - Zpcin' },
        'zh-hk': { about: '關於', prev: '上一條', next: '下一條', pageTitle: '關於 - Zpcin' },
        'zh-tw': { about: '關於', prev: '上一則', next: '下一則', pageTitle: '關於 - Zpcin' },
        'en': { about: 'About', prev: 'Previous', next: 'Next', pageTitle: 'About - Zpcin' },
        'en-sg': { about: 'About', prev: 'Previous one', next: 'Next one lah', pageTitle: 'About - Zpcin ah' },
        'ja': { about: 'について', prev: '前へ', next: '次へ', pageTitle: 'Zpcinについて' },
        'wenyan': { about: '論', prev: '前章', next: '後章', pageTitle: '論Zpcin' }
    };

    let isInitialized = false;

    // 初始化模态框
    function initAboutModal() {
        if (isInitialized) return;

        const modal = document.getElementById('aboutModal');
        const btn = document.getElementById('aboutLink');
        const span = document.getElementsByClassName('close-btn')[0];
        const contentSource = document.getElementById('aboutContentSource');
        const mainContent = document.getElementById('aboutMainContent');
        const sidebar = document.getElementById('aboutSidebar');

        if (!modal || !btn || !contentSource || !mainContent || !sidebar) return;

        // 移动内容到主容器
        const sections = Array.from(contentSource.children);
        sections.forEach(section => {
            section.classList.add('about-content-item');
            mainContent.appendChild(section);
        });

        // 生成侧边栏
        sections.forEach((elem, i) => {
            let sideItem = document.createElement("div");
            sideItem.classList.add("info-section");

            // 获取标题
            let titleElem = elem.querySelector('.info-title');
            let originalTitle = titleElem ? titleElem.innerText : '';
            
            // 保存原始标题以便多语言切换
            elem.setAttribute('data-original-title', originalTitle);

            // 设置侧边栏文本
            updateSidebarText(sideItem, originalTitle);

            // 点击事件
            sideItem.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                
                // 移除旧的激活状态
                const currentActiveContent = mainContent.querySelector(".active-content");
                if (currentActiveContent) {
                    currentActiveContent.classList.remove("active-content");
                    resetTextAnimations(currentActiveContent);
                }

                const currentActiveSidebar = sidebar.querySelector(".active-item");
                if (currentActiveSidebar) {
                    currentActiveSidebar.classList.remove("active-item");
                }

                // 激活新状态
                sideItem.classList.add("active-item");
                elem.classList.add("active-content");
                
                ensureNavItemVisible(sideItem);
                
                // 播放动画
                setTimeout(() => {
                    playTextAnimations(elem);
                }, 50);
                
                updateButtonStates();
            });

            sidebar.appendChild(sideItem);

            // 默认激活第一个
            if (i === 0) {
                sideItem.click();
            }
        });

        // 打开模态框
        btn.onclick = function(e) {
            e.preventDefault();
            modal.classList.add('show');
            applyAboutLang(); // 应用语言
            // 重新触发当前激活项的动画
            const activeContent = mainContent.querySelector(".active-content");
            if (activeContent) {
                playTextAnimations(activeContent);
            }
        }

        // 关闭模态框
        span.onclick = function() {
            modal.classList.remove('show');
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.classList.remove('show');
            }
        }

        // 导航按钮
        document.getElementById("modal-prev-btn").addEventListener("click", (e) => {
            e.preventDefault();
            navigateTo('prev');
        });

        document.getElementById("modal-next-btn").addEventListener("click", (e) => {
            e.preventDefault();
            navigateTo('next');
        });

        // 键盘支持
        document.addEventListener('keydown', function(e) {
            if (!modal.classList.contains('show')) return;
            
            if (e.key === 'Escape') {
                modal.classList.remove('show');
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                navigateTo('prev');
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                navigateTo('next');
            }
        });

        isInitialized = true;
    }

    function updateSidebarText(sideItem, originalTitle) {
        const lang = window._forceLang || 'zh-cn';
        const langData = ABOUT_LANG_MAP[lang] || ABOUT_LANG_MAP['zh-cn'];
        sideItem.innerText = langData.about + originalTitle + "...";
    }

    function applyAboutLang() {
        const lang = window._forceLang || 'zh-cn';
        const langData = ABOUT_LANG_MAP[lang] || ABOUT_LANG_MAP['zh-cn'];

        // 更新按钮文字
        const prevBtn = document.getElementById('modal-prev-btn');
        if (prevBtn) prevBtn.textContent = langData.prev;

        const nextBtn = document.getElementById('modal-next-btn');
        if (nextBtn) nextBtn.textContent = langData.next;

        // 更新内容翻译
        if (typeof ABOUT_TRANSLATIONS !== 'undefined') {
            const translations = ABOUT_TRANSLATIONS[lang] || ABOUT_TRANSLATIONS['zh-cn'];
            const contentItems = document.querySelectorAll('#aboutMainContent .about-content-item');
            
            if (translations && contentItems.length > 0) {
                contentItems.forEach((item, index) => {
                    if (translations[index]) {
                        const titleElem = item.querySelector('.info-title');
                        const contentElem = item.querySelector('.info-content');
                        
                        if (titleElem) titleElem.innerHTML = translations[index].title;
                        if (contentElem) contentElem.innerHTML = translations[index].content;
                        
                        // 更新原始标题属性，供侧边栏使用
                        item.setAttribute('data-original-title', translations[index].title);
                    }
                });
            }
        }

        // 更新侧边栏和标题文字
        const sidebarItems = document.querySelectorAll('#aboutSidebar .info-section');
        const contentItems = document.querySelectorAll('#aboutMainContent .about-content-item');
        
        sidebarItems.forEach((item, index) => {
            const contentItem = contentItems[index];
            if (contentItem) {
                const originalTitle = contentItem.getAttribute('data-original-title');
                if (originalTitle) {
                    item.innerText = langData.about + originalTitle + "...";
                    
                    const titleElem = contentItem.querySelector('.info-title');
                    if (titleElem) {
                        // 如果已经通过 ABOUT_TRANSLATIONS 更新了标题，这里就不需要再加 "关于" 前缀了
                        // 或者保持原样，看设计需求。原设计是 "关于[标题]"
                        // 检查一下原逻辑：
                        // sideItem.innerText = aboutText + elem.children[0].innerText + "...";
                        // elem.children[0].innerText = aboutText + "「" + elem.children[0].innerText + "」";
                        
                        // 这里我们保持一致
                        titleElem.innerText = langData.about + "「" + originalTitle + "」";
                    }
                }
            }
        });
    }

    function navigateTo(direction) {
        const sidebar = document.getElementById('aboutSidebar');
        let currentItem = sidebar.querySelector(".active-item");
        if (!currentItem) return;

        let targetItem = direction === 'next' ? 
                        currentItem.nextElementSibling : 
                        currentItem.previousElementSibling;
        
        if (targetItem) {
            targetItem.click();
        }
    }

    function updateButtonStates() {
        const sidebar = document.getElementById('aboutSidebar');
        const currentItem = sidebar.querySelector(".active-item");
        if (!currentItem) return;

        const prevBtn = document.getElementById("modal-prev-btn");
        const nextBtn = document.getElementById("modal-next-btn");

        if (!currentItem.previousElementSibling) {
            prevBtn.classList.add("btn-disabled");
        } else {
            prevBtn.classList.remove("btn-disabled");
        }

        if (!currentItem.nextElementSibling) {
            nextBtn.classList.add("btn-disabled");
        } else {
            nextBtn.classList.remove("btn-disabled");
        }
    }

    function ensureNavItemVisible(navItem) {
        navItem.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "nearest"
        });
    }

    // 动画相关函数 (简化版)
    function playTextAnimations(element) {
        // 简单淡入效果，如果需要复杂动画可以恢复之前的逻辑
        element.style.opacity = '0';
        element.style.transform = 'translateY(10px)';
        element.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 50);
    }

    function resetTextAnimations(element) {
        element.style.opacity = '0';
    }

    // 监听 DOM 加载
    document.addEventListener('DOMContentLoaded', initAboutModal);

    // 监听语言变化
    document.addEventListener('languageChanged', function() {
        const modal = document.getElementById('aboutModal');
        if (modal && modal.classList.contains('show')) {
            applyAboutLang();
        }
    });
})();
