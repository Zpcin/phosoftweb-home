/**
 * 考试倒计时脚本
 * 显示2025年中考或2028年高考的倒计时
 */
(function() {
    // 是否在吉林省（仅用于调试信息）
    let isInJilin = false;
    let userRegion = '未知';

    // 是否通过控制台命令设置了地区
    let isManuallySet = false;

    // 固定考试日期
    const jilinZhongkaoDate = new Date('2025-06-27T00:00:00'); // 吉林中考日期
    const futureGaokaoDate = new Date('2028-06-07T00:00:00');  // 未来高考日期 - 2028年

    // 初始化函数
    function initialize() {
        // 设置设备类型标识
        detectDeviceType();

        // 注册控制台调试命令
        registerDebugCommands();

        // 获取用户IP地理位置
        getLocationByLangApi().then(() => {
            // 初始化并开始更新考试倒计时
            updateExamCountdown();

            // 每秒更新一次倒计时
            setInterval(updateExamCountdown, 1000);
        });

        // 监听窗口大小变化，重新检测设备类型
        window.addEventListener('resize', function() {
            detectDeviceType();
        });
    }

    // 检测设备类型并应用相应样式
    function detectDeviceType() {
        const countdownElement = document.getElementById('examCountdown');
        if (!countdownElement) return;

        // 使用原生媒体查询判断设备类型
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        window._isMobileDevice = isMobile;

        // 无需额外设置样式，全部使用CSS媒体查询控制
        console.log(`[倒计时] 当前设备类型: ${isMobile ? '移动设备' : '桌面设备'}, 窗口宽度: ${window.innerWidth}px`);
    }

    // 计算并应用倒计时元素的精确位置
    function positionCountdownElement(isFirstTime = false) {
        const countdownElement = document.getElementById('examCountdown');
        if (!countdownElement) return;

        // 确定设备类型
        const isMobile = window.innerWidth <= 768;
        window._isMobileDevice = isMobile;

        // 设置样式
        if (isFirstTime) {
            // 首次定位时，先隐藏元素，确保尺寸计算准确
            countdownElement.style.opacity = '0';
            countdownElement.style.visibility = 'hidden';
            countdownElement.style.display = 'block'; // 必须先显示才能计算尺寸

            // 根据设备类型设置字体大小和内边距
            if (isMobile) {
                countdownElement.style.fontSize = '12px';
                countdownElement.style.padding = '6px 10px';
            } else {
                countdownElement.style.fontSize = '14px';
                countdownElement.style.padding = '8px 15px';
            }

            // 强制浏览器重新计算布局
            void countdownElement.offsetWidth;
        }

        // 根据设备类型设置位置
        if (isMobile) {
            countdownElement.style.top = 'auto';
            countdownElement.style.bottom = '10px';
            countdownElement.style.right = '10px';
            countdownElement.style.left = 'auto';
        } else {
            countdownElement.style.top = '10px';
            countdownElement.style.bottom = 'auto';
            countdownElement.style.right = '10px';
            countdownElement.style.left = 'auto';
        }

        // 强制应用样式
        countdownElement.style.transform = 'none !important';

        return countdownElement;
    }

    // 注册控制台调试命令
    function registerDebugCommands() {
        // 在window对象上定义设置地区的方法
        window.setRegion = function(region) {
            userRegion = region || '未知';

            // 判断是否为吉林
            isInJilin = region && (
                region.includes('吉林') ||
                region.includes('Jilin') ||
                region === 'JL'
            );
            isManuallySet = true;

            console.log('[倒计时地区调试] 手动设置地区:', userRegion);
            console.log('[倒计时地区调试] 是否在吉林省:', isInJilin);

            // 获取当前日期并判断2025年中考是否已过
            const now = new Date();
            const isZhongkaoOver = now > jilinZhongkaoDate;

            if (isZhongkaoOver) {
                console.log('[倒计时地区调试] 2025年中考已结束，将显示: 2028年高考倒计时');
            } else {
                console.log('[倒计时地区调试] 2025年中考未结束，将显示: 2025年中考倒计时');
            }

            // 立即更新显示
            updateExamCountdown();

            return `地区已设置为: ${userRegion}`;
        };

        // 设置为吉林地区的快捷命令
        window.setJilin = function() {
            return window.setRegion('吉林省');
        };

        // 设置为非吉林地区的快捷命令
        window.setNonJilin = function() {
            return window.setRegion('北京市');
        };

        // 测试中考已过期的命令
        window.testZhongkaoOver = function() {
            const testDate = new Date(jilinZhongkaoDate.getTime() + 86400000); // 中考后一天
            console.log(`[倒计时地区调试] 测试时间设置为: ${testDate.toLocaleString()} (中考后)`);
            window._testDate = testDate;
            updateExamCountdown();
            return `测试时间已设置为中考后: ${testDate.toLocaleString()}`;
        };

        // 测试中考前的命令
        window.testBeforeZhongkao = function() {
            const testDate = new Date(jilinZhongkaoDate.getTime() - 86400000); // 中考前一天
            console.log(`[倒计时地区调试] 测试时间设置为: ${testDate.toLocaleString()} (中考前)`);
            window._testDate = testDate;
            updateExamCountdown();
            return `测试时间已设置为中考前: ${testDate.toLocaleString()}`;
        };

        // 重置测试时间
        window.resetTestDate = function() {
            window._testDate = null;
            console.log('[倒计时地区调试] 已重置测试时间，使用真实当前时间');
            updateExamCountdown();
            return '已重置测试时间';
        };

        // 重置为自动检测的命令
        window.resetRegion = function() {
            isManuallySet = false;
            console.log('[倒计时地区调试] 已重置为自动检测地区');

            // 重新获取地区
            getLocationByLangApi().then(() => {
                updateExamCountdown();
            });

            return '已重置为自动检测地区';
        };

        // 显示当前状态的命令
        window.showRegionStatus = function() {
            console.log('[倒计时地区调试] 当前地区:', userRegion);
            console.log('[倒计时地区调试] 是否在吉林省:', isInJilin);

            // 获取当前日期（或测试日期）并判断2025年中考是否已过
            const now = window._testDate || new Date();
            const isZhongkaoOver = now > jilinZhongkaoDate;

            if (isZhongkaoOver) {
                console.log('[倒计时地区调试] 2025年中考已结束，当前显示: 2028年高考倒计时');
            } else {
                console.log('[倒计时地区调试] 2025年中考未结束，当前显示: 2025年中考倒计时');
            }

            console.log('[倒计时地区调试] 设置方式:', isManuallySet ? '手动设置' : '自动检测');
            if (window._testDate) {
                console.log('[倒计时地区调试] 当前使用测试时间:', window._testDate.toLocaleString());
            }

            return `当前地区: ${userRegion} (${isInJilin ? '吉林' : '非吉林'})`;
        };

        // 输出帮助信息
        console.log('-----------------------------------------------------');
        console.log('倒计时地区调试命令已加载，可用命令:');
        console.log('setRegion("地区名") - 设置用户地区');
        console.log('setJilin() - 快速设置为吉林省');
        console.log('setNonJilin() - 快速设置为非吉林地区');
        console.log('testZhongkaoOver() - 测试中考后时间场景');
        console.log('testBeforeZhongkao() - 测试中考前时间场景');
        console.log('resetTestDate() - 重置为真实时间');
        console.log('resetRegion() - 重置为自动检测');
        console.log('showRegionStatus() - 显示当前状态');
        console.log('-----------------------------------------------------');
    }

    // 通过lang.js中的IP API获取用户地理位置
    async function getLocationByLangApi() {
        // 如果已经手动设置了地区，则不进行自动检测
        if (isManuallySet) {
            console.log('[倒计时地区调试] 已手动设置地区，跳过自动检测');
            return isInJilin;
        }

        try {
            // 检查window全局对象中是否存在fetchIpInfo函数（来自lang.js）
            if (typeof window.fetchIpInfo === 'function') {
                const ipData = await window.fetchIpInfo();

                // 判断是否在吉林省
                isInJilin = ipData &&
                           ((ipData.region && ipData.region.includes('Jilin')) ||
                            (ipData.region_code && ipData.region_code === 'JL') ||
                            (ipData.region && ipData.region.includes('吉林')));

                // 保存用户地区信息用于调试
                userRegion = ipData ? (ipData.region || ipData.region_name || '未知') : '未知';

                // 控制台调试输出
                console.log('[倒计时地区调试] 用户地区:', userRegion);
                console.log('[倒计时地区调试] 是否在吉林省:', isInJilin);

                // 检查2025年中考是否已过
                const now = new Date();
                const isZhongkaoOver = now > jilinZhongkaoDate;

                if (isZhongkaoOver) {
                    console.log('[倒计时地区调试] 2025年中考已结束，将显示: 2028年高考倒计时');
                } else {
                    console.log('[倒计时地区调试] 2025年中考未结束，将显示: 2025年中考倒计时');
                }

                return isInJilin;
            } else {
                // 如果lang.js中的fetchIpInfo不可用，则使用备用方法
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();

                // 判断是否在吉林省
                isInJilin = data &&
                           ((data.region && data.region.includes('Jilin')) ||
                            (data.region_code && data.region_code === 'JL') ||
                            (data.region && data.region.includes('吉林')));

                // 保存用户地区信息用于调试
                userRegion = data ? (data.region || data.region_name || '未知') : '未知';

                // 控制台调试输出
                console.log('[倒计时地区调试] 用户地区:', userRegion, '(备用API)');
                console.log('[倒计时地区调试] 是否在吉林省:', isInJilin);

                // 检查2025年中考是否已过
                const now = new Date();
                const isZhongkaoOver = now > jilinZhongkaoDate;

                if (isZhongkaoOver) {
                    console.log('[倒计时地区调试] 2025年中考已结束，将显示: 2028年高考倒计时');
                } else {
                    console.log('[倒计时地区调试] 2025年中考未结束，将显示: 2025年中考倒计时');
                }

                return isInJilin;
            }
        } catch (error) {
            console.log('[倒计时地区调试] 无法获取IP地理位置，默认为非吉林', error);

            // 检查2025年中考是否已过
            const now = new Date();
            const isZhongkaoOver = now > jilinZhongkaoDate;

            if (isZhongkaoOver) {
                console.log('[倒计时地区调试] 2025年中考已结束，将显示: 2028年高考倒计时');
            } else {
                console.log('[倒计时地区调试] 2025年中考未结束，将显示: 2025年中考倒计时');
            }

            isInJilin = false;
            return false;
        }
    }

    // 更新考试倒计时显示
    function updateExamCountdown() {
        const countdownElement = document.getElementById('examCountdown');
        const daysElement = document.getElementById('examDays');
        const loadingOverlay = document.getElementById('loadingOverlay');

        if (!countdownElement || !daysElement) return;

        const titleElement = countdownElement.querySelector('.exam-title');

        // 使用真实时间或测试时间
        const now = window._testDate || new Date();
        let targetDate, examTitle;

        // 检查2025年中考是否已过
        const isZhongkaoOver = now > jilinZhongkaoDate;

        if (isZhongkaoOver) {
            // 如果2025年中考已过，显示2028年高考倒计时
            targetDate = futureGaokaoDate;
            examTitle = "距2028高考";

            // 使用标准字体大小
            titleElement.style.fontSize = '1em';
        } else {
            // 如果2025年中考还没过，显示2025年中考倒计时
            targetDate = jilinZhongkaoDate;
            examTitle = "距2025中考";

            // 非吉林地区使用较小字体
            titleElement.style.fontSize = '0.85em';
        }

        // 计算剩余时间
        const diffTime = targetDate - now;

        // 如果考试已经过去，显示相应信息
        if (diffTime < 0) {
            titleElement.textContent = examTitle + "已过";
            daysElement.textContent = "0.00000";
            return;
        }

        // 计算天、小时、分钟和秒
        const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

        // 精确计算剩余天数（带五位小数）
        const totalSeconds = Math.floor(diffTime / 1000) + ((diffTime % 1000) / 1000);
        const totalMinutes = totalSeconds / 60;
        const totalHours = totalMinutes / 60;
        const diffDays = totalHours / 24;

        // 格式化为5位小数
        const formattedDays = diffDays.toFixed(5);

        // 更新倒计时显示
        titleElement.textContent = examTitle;
        daysElement.textContent = formattedDays;

        // 添加详细时间显示，仅精确到秒
        const detailsElement = countdownElement.querySelector('.exam-details') || createDetailsElement(countdownElement);
        detailsElement.innerHTML = `
            <span>${days}天 ${hours}时 ${minutes}分 ${seconds}秒</span>
        `;

        // 根据地区设置样式
        if (!isInJilin) {
            // 非吉林地区隐藏原倒计时
            countdownElement.style.display = 'none';

            // 添加Windows风格的水印文字
            addWindowsStyleWatermark(examTitle, formattedDays);

            // 非吉林地区也需要隐藏加载动画
            if (loadingOverlay && !window._loadingHidden) {
                hideLoading();
            }
        } else {
            // 吉林地区显示正常倒计时并移除Windows风格水印文字
            countdownElement.style.display = 'block';
            removeWindowsStyleWatermark();

            // 检查是否需要显示倒计时
            if (document.readyState === 'complete' && !window._countdownShown && !window._countdownAnimationPending) {
                // 标记动画处理中，避免重复触发
                window._countdownAnimationPending = true;

                // 延迟显示，确保页面布局已经稳定
                setTimeout(() => {
                    // 再次检查页面是否已经完全稳定
                    if (document.readyState === 'complete') {
                        // 先隐藏加载动画
                        hideLoading();

                        // 再显示倒计时
                        setTimeout(() => {
                            showCountdown();
                        }, 300);
                    }
                }, 1000); // 增加延迟时间，确保页面布局稳定
            }

            // 仅在页面加载后首次添加退出动画
            if (window._countdownShown && !window._countdownAnimationAdded) {
                window._countdownAnimationAdded = true;

                // 5秒后开始退出动画
                setTimeout(() => {
                    // 添加过渡效果
                    countdownElement.style.transition = 'all 1.5s ease-in-out';

                    // 检查是否为移动端（宽度小于等于768px）
                    const isMobile = window.innerWidth <= 768;

                    // 根据设备设置不同的移出方向
                    if (isMobile) {
                        // 移动端向下移出
                        countdownElement.style.transform = 'translateY(150%)';
                      } else {
                        // 桌面端向上移出
                        countdownElement.style.transform = 'translateY(-150%)';
                      }

                    countdownElement.style.opacity = '0';
                    countdownElement.style.visibility = 'hidden';

                    // 动画完成后隐藏元素
                    setTimeout(() => {
                        countdownElement.style.display = 'none';
                    }, 1500);
                }, 5000);
            }
        }

        // 不再更新页面标题显示倒计时
        // document.title = `${examTitle}: ${days}天 ${hours}时 - PhosoftWebPages`;
    }

    // 隐藏加载动画
    function hideLoading() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            window._loadingHidden = true;
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }
    }

    // 显示倒计时元素
    function showCountdown() {
        // 先进行位置计算，传入true表示这是首次定位
        const element = positionCountdownElement(true);

        // 等待DOM更新并重新计算位置
        setTimeout(() => {
            // 再显示倒计时
            window._countdownShown = true;

            // 简单的淡入效果
            element.style.transition = 'opacity 0.5s ease-in-out';
            element.style.opacity = '1';
            element.style.visibility = 'visible';
            element.style.display = 'block';

            // 确保位置锁定
            if (window._isMobileDevice) {
                element.style.top = 'auto';
                element.style.bottom = '10px';
            } else {
                element.style.top = '10px';
                element.style.bottom = 'auto';
            }
            element.style.right = '10px';
            element.style.transform = 'none';
        }, 50); // 短暂延迟确保DOM更新
    }

    // 添加Windows风格的水印文字
    function addWindowsStyleWatermark(examTitle, daysValue) {
        // 移除现有的水印，避免重复创建
        removeWindowsStyleWatermark();

        // 创建右下角的水印
        const watermarkBottom = document.createElement('div');
        watermarkBottom.className = 'windows-style-watermark';

        // 设置Windows风格水印的样式
        Object.assign(watermarkBottom.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: '1000',
            pointerEvents: 'none',
            userSelect: 'none',
            fontSize: '8px', // 非常小的字体
            fontFamily: 'Arial, sans-serif',
            color: 'rgba(119, 119, 119, 0.5)', // Windows风格的灰色
            opacity: '0.8',
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'transparent',
            padding: '10px',
            textAlign: 'right',
            lineHeight: '1.5'
        });

        // 设置水印内容，改为"吉林(年份)中考/高考"
        let examName;
        if (examTitle.includes("2025中考")) {
            examName = "吉林2025中考";
        } else {
            examName = "吉林2028高考";
        }

        watermarkBottom.innerHTML = `${examName}: ${daysValue}天`;

        // 添加到body
        document.body.appendChild(watermarkBottom);
    }

    // 移除Windows风格的水印文字
    function removeWindowsStyleWatermark() {
        const watermarks = document.querySelectorAll('.windows-style-watermark, .windows-style-watermark-top');
        watermarks.forEach(watermark => {
            if (watermark && watermark.parentNode) {
                watermark.parentNode.removeChild(watermark);
            }
        });
    }

    // 创建详细倒计时显示元素
    function createDetailsElement(parentElement) {
        const detailsElement = document.createElement('div');
        detailsElement.className = 'exam-details';
        detailsElement.style.fontSize = '0.9rem';
        detailsElement.style.marginTop = '5px';
        detailsElement.style.color = '#666';
        parentElement.appendChild(detailsElement);
        return detailsElement;
    }

    // 页面加载完成后执行初始化
    if (document.readyState === 'complete') {
        initialize();
    } else {
        window.addEventListener('load', initialize);
    }
})();
