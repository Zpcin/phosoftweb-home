// 页面滚动动画 - 简化版本
function animateOnScroll() {
    const elements = document.querySelectorAll('.wu-block');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// 页面加载时设置初始动画状态
function setInitialAnimationStates() {
    const elements = document.querySelectorAll('.wu-block');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
}

// 简化的滚动进度指示器
function scrollProgressIndicator() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.position = 'fixed';
    progressBar.style.top = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '3px';
    progressBar.style.backgroundColor = '#3a95e4';
    progressBar.style.zIndex = '1000';
    progressBar.style.width = '0%';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// 初始化动画 - 简化版
function initAnimations() {
    setInitialAnimationStates();
    animateOnScroll();
    scrollProgressIndicator();
    
    // 监听滚动事件
    window.addEventListener('scroll', animateOnScroll);
}

// 当DOM加载完成后初始化动画
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimations);
} else {
    initAnimations();
}

// 所有函数都是自执行的，不需要导出