// about页面多语言支持
const ABOUT_LANG_MAP = {
  'zh-cn': {
    about: '关于',
    prev: '上一条',
    next: '下一条',
    pageTitle: '关于 - Zpcin'
  },
  'zh-hk': {
    about: '關於',
    prev: '上一條',
    next: '下一條',
    pageTitle: '關於 - Zpcin'
  },
  'zh-tw': {
    about: '關於',
    prev: '上一則',
    next: '下一則',
    pageTitle: '關於 - Zpcin'
  },
  'en': {
    about: 'About',
    prev: 'Previous',
    next: 'Next',
    pageTitle: 'About - Zpcin'
  },
  'en-sg': {
    about: 'About',
    prev: 'Previous one',
    next: 'Next one lah',
    pageTitle: 'About - Zpcin ah'
  },
  'ja': {
    about: 'について',
    prev: '前へ',
    next: '次へ',
    pageTitle: 'Zpcinについて'
  },
  'wenyan': {
    about: '論',
    prev: '前章',
    next: '後章',
    pageTitle: '論Zpcin'
  }
};

// 应用about页面的多语言设置
function applyAboutLang() {
  // 获取当前语言
  const lang = window._forceLang || 'zh-cn';
  const langData = ABOUT_LANG_MAP[lang] || ABOUT_LANG_MAP['zh-cn'];

  // 设置页面标题
  document.title = langData.pageTitle;

  // 设置导航按钮文字
  const prevBtn = document.getElementById('prev-btn');
  if (prevBtn) prevBtn.textContent = langData.prev;

  const nextBtn = document.getElementById('next-btn');
  if (nextBtn) nextBtn.textContent = langData.next;
}

document.addEventListener('DOMContentLoaded', function() {
    // 应用多语言设置
    applyAboutLang();

    // 初始化文本动画元素
    setTimeout(function() {
        prepareTextAnimations();
    }, 200);

    // 跟踪当前按下的键
    const keysPressed = new Set();

    // 生成左侧目录
    for (let i = 0; i < document.getElementById("content").children.length; i += 1) {
        let elem = document.getElementById("content").children[i];
        let sideItem = document.createElement("div");

        sideItem.classList.add("info-section");

        // 使用多语言版本的"关于"文本
        let aboutText = window._forceLang ? ABOUT_LANG_MAP[window._forceLang]?.about || '关于' : '关于';
        sideItem.innerText = aboutText + elem.children[0].innerText + "...";

        // 防止内容初始化后被再次修改
        if (!elem.getAttribute('data-original-title')) {
            elem.setAttribute('data-original-title', elem.children[0].innerText);
            elem.children[0].innerText = aboutText + "「" + elem.children[0].innerText + "」";
        }

        if (i === 0) {
            sideItem.classList.add("active-item");
            elem.classList.add("active-content");
            // 初始激活的内容立即播放动画
            setTimeout(function() {
                playTextAnimations(elem);
            }, 300);
        }

        sideItem.addEventListener("click", (e) => {
            // 阻止默认行为和事件冒泡
            e.preventDefault();
            e.stopPropagation();
            
            // 找到当前活动元素并移除活动状态
            const currentActive = document.getElementsByClassName("active-content")[0];
            if (currentActive) {
                currentActive.classList.remove("active-content");
                // 移除当前活动元素的所有动画类
                resetTextAnimations(currentActive);
            }

            // 左侧导航状态更新
            const activeItem = document.getElementsByClassName("active-item")[0];
            if (activeItem) {
                activeItem.classList.remove("active-item");
            }
            sideItem.classList.add("active-item");
            
            // 确保激活的导航项可见
            ensureNavItemVisible(sideItem);
            
            // 延迟添加新活动元素的类，创建平滑过渡
            setTimeout(() => {
                elem.classList.add("active-content");
                // 播放新活动元素的文本动画
                playTextAnimations(elem);
            }, 50);
            
            updateButtonStates();
        });

        document.getElementById("sidebar").appendChild(sideItem);
    }

    // 确保导航项在侧边栏中可见
    function ensureNavItemVisible(navItem) {
        navItem.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "nearest"
        });
    }

    // 为所有内容区域准备文本动画
    function prepareTextAnimations() {
        if (window.innerWidth <= 800) return; // 只在桌面端应用
        
        // 处理所有info-section
        const sections = document.querySelectorAll('#content .info-section');
        sections.forEach(section => {
            // 为标题添加动画类
            const title = section.querySelector('.info-title');
            if (title) {
                title.classList.add('title-animate');
            }
            
            // 为内容文本添加动画类
            const content = section.querySelector('.info-content');
            if (content) {
                // 拆分段落和其他元素以便分别设置动画
                const children = Array.from(content.children);
                if (children.length > 0) {
                    // 如果内容有子元素(如<p>, <a>等)
                    children.forEach((child, index) => {
                        child.classList.add('text-block');
                        child.style.transitionDelay = `${(index + 1) * 0.1}s`;
                    });
                } else {
                    // 如果内容是纯文本，将文本按行分割
                    const textBlocks = content.innerHTML.split('<br>');
                    content.innerHTML = '';
                    textBlocks.forEach((block, index) => {
                        if (block.trim()) {
                            const blockElem = document.createElement('div');
                            blockElem.innerHTML = block;
                            blockElem.classList.add('text-block');
                            blockElem.style.transitionDelay = `${(index + 1) * 0.1}s`;
                            content.appendChild(blockElem);
                        } else {
                            // 保留空行
                            content.appendChild(document.createElement('br'));
                        }
                    });
                }
                content.classList.add('text-animate');
            }
        });
    }

    // 播放文本动画
    function playTextAnimations(element) {
        if (window.innerWidth <= 800) return; // 只在桌面端应用
        
        const title = element.querySelector('.title-animate');
        if (title) {
            setTimeout(() => {
                title.classList.add('animate-in');
            }, 100);
        }
        
        const content = element.querySelector('.text-animate');
        if (content) {
            setTimeout(() => {
                content.classList.add('animate-in');
                
                // 依次播放文本块动画
                const blocks = content.querySelectorAll('.text-block');
                blocks.forEach((block, index) => {
                    setTimeout(() => {
                        block.classList.add('animate-in');
                    }, 200 + index * 100);
                });
            }, 300);
        }
    }
    
    // 重置动画元素状态
    function resetTextAnimations(element) {
        if (window.innerWidth <= 800) return; // 只在桌面端应用
        
        const title = element.querySelector('.title-animate');
        if (title) {
            title.classList.remove('animate-in');
        }
        
        const content = element.querySelector('.text-animate');
        if (content) {
            content.classList.remove('animate-in');
            
            const blocks = content.querySelectorAll('.text-block');
            blocks.forEach(block => {
                block.classList.remove('animate-in');
            });
        }
    }

    // 上一条按钮事件
    document.getElementById("prev-btn").addEventListener("click", (e) => {
        e.preventDefault(); // 阻止默认行为
        navigateTo('prev');
    });

    // 下一条按钮事件
    document.getElementById("next-btn").addEventListener("click", (e) => {
        e.preventDefault(); // 阻止默认行为
        navigateTo('next');
    });

    // 导航到上一个或下一个内容
    function navigateTo(direction) {
        let currentItem = document.getElementsByClassName("active-item")[0];
        let targetItem = direction === 'next' ? 
                        currentItem.nextElementSibling : 
                        currentItem.previousElementSibling;
        
        if (targetItem) {
            // 确保导航项在侧边栏中可见
            ensureNavItemVisible(targetItem);
            
            // 只在移动端（窗口宽度 ≤ 800px）应用滑动动画
            if (window.innerWidth <= 800) {
                // 防止动画堆叠，先移除已有的动画类
                document.getElementById("content").classList.remove("slide-left", "slide-right");

                // 强制浏览器重排，确保CSS动画能正常触发
                void document.getElementById("content").offsetWidth;

                // 添加新的动画类
                document.getElementById("content").classList.add(direction === 'next' ? "slide-left" : "slide-right");
                
                // 设置适当的延迟以匹配CSS动画
                setTimeout(() => {
                    // 点击目标项切换内容
                    targetItem.click();

                    // 动画结束后移除动画类
                    setTimeout(() => {
                        document.getElementById("content").classList.remove("slide-left", "slide-right");
                    }, 400); // 与CSS动画持续时间匹配
                }, 200); // 给动画一个合适的时间执行
            } else {
                // 桌面端直接切换，无需动画
                targetItem.click();
            }
        }
    }

    // 刷新按钮状态
    function updateButtonStates() {
        if (document.getElementsByClassName("active-item")[0].previousElementSibling === undefined) {
            document.getElementById("prev-btn").classList.add("btn-disabled");
        } else {
            document.getElementById("prev-btn").classList.remove("btn-disabled");
        }

        if (document.getElementsByClassName("active-item")[0].nextElementSibling === undefined) {
            document.getElementById("next-btn").classList.add("btn-disabled");
        } else {
            document.getElementById("next-btn").classList.remove("btn-disabled");
        }
    }

    // 初始化按钮状态
    updateButtonStates();

    // 添加触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    document.getElementById("content").addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: false});

    document.getElementById("content").addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe(e);
    }, {passive: false});

    function handleSwipe(e) {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) < minSwipeDistance) return; // 滑动距离太小，忽略

        // 阻止默认行为
        if (e) e.preventDefault();

        if (swipeDistance > 0) {
            // 右滑，显示上一项
            navigateTo('prev');
        } else {
            // 左滑，显示下一项
            navigateTo('next');
        }
    }

    // 添加键盘方向键支持
    document.addEventListener('keydown', function(e) {
        // 记录按下的键
        keysPressed.add(e.key);

        if (e.key === 'ArrowUp') {
            e.preventDefault(); // 防止页面滚动
            navigateTo('prev'); // 上方向键 -> 上一条
        } else if (e.key === 'ArrowDown') {
            e.preventDefault(); // 防止页面滚动
            navigateTo('next'); // 下方向键 -> 下一条
        } else if (/^[1-9]$/.test(e.key)) {
            // 检查是否按下了1-9的数字键
            e.preventDefault();
            const index = parseInt(e.key) - 1; // 将键值转换为索引（从0开始）
            const sidebarItems = document.querySelectorAll("#sidebar .info-section");

            // 确保索引在有效范围内
            if (index < sidebarItems.length) {
                // 直接触发对应索引项的点击事件
                sidebarItems[index].click();
            }
        }

        // 检查是否同时按下了"1"和"0"键
        if (keysPressed.has('1') && keysPressed.has('0')) {
            e.preventDefault();
            const sidebarItems = document.querySelectorAll("#sidebar .info-section");
            // 如果有第10个板块，跳转到它
            if (sidebarItems.length >= 10) {
                sidebarItems[9].click(); // 索引为9的是第10个元素

                // 清除按键状态，防止重复触发
                keysPressed.clear();
            }
        }
    });

    // 清除按键记录
    document.addEventListener('keyup', function(e) {
        keysPressed.delete(e.key);
    });

    // 防止拖拽和右键
    document.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    });

    document.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });
});
