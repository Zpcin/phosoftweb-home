// 增强版页脚调试脚本
(function() {
    console.log('=== 页脚调试信息 ===');
    
    // 等待DOM完全加载
    document.addEventListener('DOMContentLoaded', function() {
        // 获取页脚元素
        const footer = document.getElementById('main-footer');
        console.log('页脚元素是否存在:', footer !== null);
        
        // 检查是否存在多层页脚或重复页脚
        const allFooters = document.querySelectorAll('[id*="footer"],[class*="footer"]');
        console.log('页面中找到的所有与页脚相关的元素数量:', allFooters.length);
        allFooters.forEach((el, index) => {
            console.log(`  页脚元素 ${index+1}:`, el.id, el.className);
        });
        
        if (footer) {
            // 检查并修复版权年份JavaScript
            const copyrightYearScripts = document.querySelectorAll('script:not([src])');
            let hasValidYearScript = false;
            
            copyrightYearScripts.forEach(script => {
                if (script.textContent.includes('document.write') && script.textContent.includes('getFullYear')) {
                    hasValidYearScript = true;
                    console.log('找到有效的年份脚本:', script.textContent.trim());
                }
            });
            
            if (!hasValidYearScript) {
                console.log('未找到有效的年份脚本，正在添加...');
                // 在页脚中查找版权文本并添加年份
                const copyrightElements = footer.querySelectorAll('p');
                copyrightElements.forEach(el => {
                    if (el.textContent.includes('©') && !el.textContent.match(/©\s*\d{4}/)) {
                        const currentYear = new Date().getFullYear();
                        el.innerHTML = el.innerHTML.replace('©', `© ${currentYear}`);
                        console.log('已添加当前年份到版权信息:', currentYear);
                    }
                });
            }
            
            // 检查页脚的计算样式
            const styles = window.getComputedStyle(footer);
            console.log('页脚样式:');
            console.log('  display:', styles.display);
            console.log('  opacity:', styles.opacity);
            console.log('  visibility:', styles.visibility);
            console.log('  position:', styles.position);
            console.log('  z-index:', styles.zIndex);
            console.log('  height:', styles.height);
            console.log('  width:', styles.width);
            console.log('  margin:', styles.margin);
            console.log('  padding:', styles.padding);
            
            // 检查父元素
            const parent = footer.parentElement;
            console.log('\n父元素信息:');
            console.log('  父元素:', parent.tagName + (parent.id ? '#' + parent.id : '') + '.' + parent.className);
            
            if (parent) {
                const parentStyles = window.getComputedStyle(parent);
                console.log('  父元素overflow:', parentStyles.overflow);
                console.log('  父元素height:', parentStyles.height);
                console.log('  父元素position:', parentStyles.position);
                console.log('  父元素z-index:', parentStyles.zIndex);
            }
            
            // 递归检查所有祖先元素
            let currentElement = footer.parentElement;
            let depth = 1;
            console.log('\n祖先元素检查:');
            
            while (currentElement && depth <= 5) {
                const ancestorStyles = window.getComputedStyle(currentElement);
                console.log(`  ${depth}级祖先 (${currentElement.tagName}${currentElement.id ? '#' + currentElement.id : ''}):`);
                console.log(`    overflow: ${ancestorStyles.overflow}, position: ${ancestorStyles.position}, z-index: ${ancestorStyles.zIndex}`);
                
                // 如果发现可能导致页脚不可见的样式，尝试修复
                if (ancestorStyles.overflow === 'hidden' && ancestorStyles.height !== 'auto' && ancestorStyles.height !== '100%') {
                    console.log(`    发现问题: ${depth}级祖先有overflow:hidden和固定高度，可能导致页脚被裁剪`);
                    console.log(`    尝试修复: 设置${depth}级祖先的overflow为visible`);
                    currentElement.style.overflow = 'visible';
                }
                
                currentElement = currentElement.parentElement;
                depth++;
            }
            
            // 尝试强制显示页脚 - 加强版
             console.log('\n尝试强制显示页脚...');
             footer.style.display = 'block';
             footer.style.opacity = '1';
             footer.style.visibility = 'visible';
             footer.style.position = 'relative';
             footer.style.zIndex = '9999';
             footer.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
             footer.style.border = 'none';
             footer.style.padding = '25px';
             footer.style.marginTop = '20px';
             footer.style.borderRadius = '12px';
             footer.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
             footer.style.width = 'calc(100% - 40px)';
             footer.style.maxWidth = '1200px';
             footer.style.marginLeft = '0px';
             footer.style.marginRight = 'auto';
             footer.style.left = '0';
             footer.style.right = 'auto';
             footer.style.transform = 'none';
            
            // 检查并修复版权内容
            const copyrightText = footer.querySelector('p:first-child');
            if (copyrightText) {
                console.log('版权文本内容:', copyrightText.textContent);
                // 确保链接正确
                if (copyrightText.querySelector('a')) {
                    const copyrightLink = copyrightText.querySelector('a');
                    copyrightLink.href = './about.html';
                    copyrightLink.style.color = '#333';
                    copyrightLink.style.textDecoration = 'none';
                    console.log('已确保版权链接正确');
                }
            }
            
            // 检查并修复Vercel驱动文本
            const poweredText = footer.querySelector('p:nth-child(2)');
            if (poweredText) {
                console.log('Vercel驱动文本:', poweredText.textContent);
                // 确保Vercel链接正确
                if (poweredText.querySelector('a')) {
                    const vercelLink = poweredText.querySelector('a');
                    vercelLink.href = 'https://vercel.com/';
                    vercelLink.style.color = '#333';
                    vercelLink.style.textDecoration = 'none';
                    console.log('已确保Vercel链接正确');
                }
            }
            
            // 检查并修复认证标志
            const certElement = footer.querySelector('div:last-child');
            if (certElement) {
                console.log('认证标志存在');
                // 确保图片加载正确
                const certImg = certElement.querySelector('img');
                if (certImg) {
                    certImg.onerror = function() {
                        console.log('认证图片加载失败，显示替代文本');
                        certImg.alt = 'ICS认证 (图片加载失败)';
                        certImg.style.display = 'none';
                        const altText = document.createElement('span');
                        altText.textContent = 'ICS认证';
                        certElement.prepend(altText);
                    };
                }
            }
            
            console.log('调试完成。请查看页面是否显示了红色边框的页脚区域。');
        } else {
            console.log('错误: 未能找到ID为"main-footer"的页脚元素。');
            
            // 尝试创建一个新的页脚
            console.log('尝试创建一个新的页脚...');
            const newFooter = document.createElement('div');
            newFooter.id = 'main-footer';
            newFooter.className = 'wu-block wu-mw';
            newFooter.style.cssText = `
                text-align: left;
                opacity: 1 !important;
                visibility: visible !important;
                display: block !important;
                position: relative;
                z-index: 9999;
                background-color: rgba(255, 255, 255, 0.95) !important;
                padding: 25px !important;
                border-radius: 12px !important;
                box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
                border: none !important;
                transform: none !important;
                transition: none !important;
                width: calc(100% - 40px);
                max-width: 1200px;
                margin-top: 20px;
                margin-left: 0px;
                margin-right: auto;
                left: 0;
                right: auto;
            `;
            
            const currentYear = new Date().getFullYear();
            newFooter.innerHTML = `
                <p><a href="./about.html" style="color: #333; text-decoration: none;">© ${currentYear} - 张一&Phosoft 版权所有</a></p>
                <p>此网站由 <a href="https://vercel.com/" style="color: #333; text-decoration: none;">Vercel</a>&nbsp;强力驱动</p>
                <div style="margin-top: 15px; display: flex; align-items: center; justify-content: flex-start;">
                    <img src="./img/A-logo.svg" alt="ICS认证" style="height: 24px; margin-right: 8px;">
                    <span style="color: #6c757d; font-size: 14px;">认ISC-20220807-01</span>
                </div>
            `;
            
            // 将新页脚添加到页面底部
            const body = document.querySelector('body');
            if (body) {
                body.appendChild(newFooter);
                console.log('已添加新的页脚到页面底部');
            }
        }
    });
})();