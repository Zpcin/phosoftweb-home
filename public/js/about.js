document.addEventListener('DOMContentLoaded', function() {
    // 初始化文本动画元素
    prepareTextAnimations();
    
    // 生成左侧目录
    for (let i = 0; i < document.getElementById("content").children.length; i += 1) {
        let elem = document.getElementById("content").children[i];
        let sideItem = document.createElement("div");

        sideItem.classList.add("info-section");
        sideItem.innerText = "关于" + elem.children[0].innerText + "...";
        elem.children[0].innerText = "关于「" + elem.children[0].innerText + "」";

        if (i === 0) {
            sideItem.classList.add("active-item");
            elem.classList.add("active-content");
            // 初始激活的内容立即播放动画
            playTextAnimations(elem);
        }

        sideItem.addEventListener("click", () => {
            // 找到当前活动元素并移除活动状态
            const currentActive = document.getElementsByClassName("active-content")[0];
            currentActive.classList.remove("active-content");
            
            // 移除当前活动元素的所有动画类
            resetTextAnimations(currentActive);
            
            // 左侧导航状态更新
            document.getElementsByClassName("active-item")[0].classList.remove("active-item");
            sideItem.classList.add("active-item");
            
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
    document.getElementById("prev-btn").addEventListener("click", () => {
        navigateTo('prev');
    });

    // 下一条按钮事件
    document.getElementById("next-btn").addEventListener("click", () => {
        navigateTo('next');
    });

    // 导航到上一个或下一个内容
    function navigateTo(direction) {
        let currentItem = document.getElementsByClassName("active-item")[0];
        let targetItem = direction === 'next' ? 
                        currentItem.nextElementSibling : 
                        currentItem.previousElementSibling;
        
        if (targetItem) {
            // 只在移动端（窗口宽度 ≤ 800px）应用滑动动画
            if (window.innerWidth <= 800) {
                document.getElementById("content").classList.remove("slide-left", "slide-right");
                document.getElementById("content").classList.add(direction === 'next' ? "slide-left" : "slide-right");
                
                setTimeout(() => {
                    targetItem.scrollIntoView();
                    targetItem.click();
                    
                    // 移除过渡动画类
                    setTimeout(() => {
                        document.getElementById("content").classList.remove("slide-left", "slide-right");
                    }, 300);
                }, 50);
            } else {
                // 桌面端直接切换，无需动画
                targetItem.scrollIntoView();
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
    }, false);

    document.getElementById("content").addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;
        if (Math.abs(swipeDistance) < minSwipeDistance) return; // 滑动距离太小，忽略

        if (swipeDistance > 0) {
            // 右滑，显示上一项
            navigateTo('prev');
        } else {
            // 左滑，显示下一项
            navigateTo('next');
        }
    }

    // 防止拖拽和右键
    document.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    });

    document.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });
});

