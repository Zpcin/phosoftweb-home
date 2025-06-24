/**
 * 隐形水印生成器
 * 生成肉眼几乎不可见的水印，使用极低不透明度的文本
 */
(function() {
    // 创建几乎不可见的水印
    function createLightWatermark() {
        const watermarkText = "原罪_超凡开发";

        // 在DOM中的各个位置插入水印
        insertLightWatermarks(watermarkText);
    }

    // 在页面不同位置插入几乎不可见的水印
    function insertLightWatermarks(watermarkText) {
        // 在页面上创建多个随机位置的水印
        const watermarkCount = 5; // 创建的水印数量

        for (let i = 0; i < watermarkCount; i++) {
            // 创建水印元素
            const watermark = document.createElement('div');
            watermark.textContent = watermarkText;
            watermark.className = 'ultra-light-watermark';

            // 随机位置
            const randomPosition = getRandomPosition();

            // 设置样式
            Object.assign(watermark.style, {
                position: 'absolute',
                zIndex: '9999',
                pointerEvents: 'none',
                userSelect: 'none',
                color: 'rgba(0, 0, 0, 0.005)', // 极低不透明度，几乎不可见
                fontSize: '14px',
                fontFamily: 'Arial, sans-serif',
                transform: 'rotate(' + (Math.random() * 90 - 45) + 'deg)', // 随机旋转
                left: randomPosition.x + 'px',
                top: randomPosition.y + 'px',
                opacity: '0.01', // 极低不透明度
                textShadow: 'none',
                background: 'transparent'
            });

            // 添加到body
            document.body.appendChild(watermark);
        }

        // 向主要内容区域添加水印
        const contentElements = [
            document.querySelector('.wu-content'),
            document.querySelector('#friendLinks')
        ];

        contentElements.forEach(element => {
            if (element) {
                // 设置数据属性，可通过代码检测
                element.dataset.security = watermarkText;

                // 添加一个几乎不可见的段落
                const p = document.createElement('p');
                p.textContent = watermarkText;
                p.style.position = 'absolute';
                p.style.opacity = '0.005'; // 极低不透明度
                p.style.color = 'rgba(0, 0, 0, 0.01)';
                p.style.fontSize = '8px';
                p.style.pointerEvents = 'none';
                p.style.userSelect = 'none';
                p.style.zIndex = '-1';
                element.appendChild(p);
            }
        });
    }

    // 获取随机位置
    function getRandomPosition() {
        const width = window.innerWidth || document.documentElement.clientWidth;
        const height = window.innerHeight || document.documentElement.clientHeight;

        return {
            x: Math.floor(Math.random() * width),
            y: Math.floor(Math.random() * height)
        };
    }

    // 页面加载完成后执行水印创建
    if (document.readyState === 'complete') {
        createLightWatermark();
    } else {
        window.addEventListener('load', createLightWatermark);
    }
})();
