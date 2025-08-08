/**
 * 考试倒计时脚本
 * 显示2025年中考或2028年高考的倒计时
 * 支持多语言显示
 * 修改为仅在控制台输出倒计时信息
 */
(function() {
    // 是否在吉林省（仅用于调试信息）
    let isInJilin = false;
    let userRegion = '未知';

    // 是否通过控制台命令设置了地区
    let isManuallySet = false;

    // 当前语言
    let currentLang = 'zh-cn';
    let translations = {};

    // 固定考试日期
    const jilinZhongkaoDate = new Date('2025-06-27T00:00:00'); // 吉林中考日期
    const futureGaokaoDate = new Date('2028-06-07T00:00:00');  // 未来高考日期 - 2028年

    // 初始化函数
    function initialize() {
        // 获取当前语言并加载翻译
        loadTranslations();

        // 注册控制台调试命令
        registerDebugCommands();

        // 获取用户IP地理位置
        getLocationByLangApi().then(() => {
            // 初始化并开始更新考试倒计时
            updateExamCountdown();

            // 每秒更新一次倒计时
            setInterval(updateExamCountdown, 1000);
        });

        // 监听语言变化事件
        document.addEventListener('languageChanged', function(e) {
            if (e.detail && e.detail.lang) {
                loadTranslations(e.detail.lang);
                updateExamCountdown();
            }
        });
    }

    // 加载当前语言的翻译
    function loadTranslations(lang) {
        // 首先尝试从URL参数获取语言
        const urlParams = new URLSearchParams(window.location.search);
        const urlLang = urlParams.get('lang');

        // 如果明确指定了语言，就使用指定的语言
        if (urlLang) {
            currentLang = urlLang;
        }
        else if (lang) {
            currentLang = lang;
        }
        // 否则，尝试从全局变量获取当前语言
        else if (window.currentLang) {
            currentLang = window.currentLang;
        }

        // 使用countdown-lang.js中的函数获取翻译
        if (window.getCountdownTranslation) {
            translations = window.getCountdownTranslation(currentLang);
        } else {
            // 如果翻译函数不可用，使用默认的简体中文
            translations = {
                jilinZhongkao: '距吉林中考',
                zhongkao: '距2025中考',
                gaokao: '距2028高考',
                days: '天',
                hours: '时',
                minutes: '分',
                seconds: '秒',
                over: '已过'
            };
        }

        console.log('[倒计时] 当前语言:', currentLang);
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

        // 添加显示考试倒计时控制台输出命令
        window.showConsoleCountdown = function() {
            console.log('[倒计时] 当前考试倒计时信息:');
            const countdownInfo = getCountdownInfo();
            console.log(`[倒计时] ${countdownInfo.title}: ${countdownInfo.days}天 ${countdownInfo.hours}时 ${countdownInfo.minutes}分 ${countdownInfo.seconds}秒`);
            console.log(`[倒计时] 精确天数: ${countdownInfo.formattedDays}天`);
            return `已在控制台显示当前倒计时信息`;
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
        console.log('showConsoleCountdown() - 在控制台显示当前倒计时详细信息');
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

    // 获取倒计时信息的函数 - 只生成数据，不涉及DOM操作
    function getCountdownInfo() {
        // 使用真实时间或测试时间
        const now = window._testDate || new Date();
        let targetDate, examTitle;

        // 检查2025年中考是否已过
        const isZhongkaoOver = now > jilinZhongkaoDate;

        if (isZhongkaoOver) {
            // 如果2025年中考已过，显示2028年高考倒计时
            targetDate = futureGaokaoDate;
            examTitle = translations.gaokao;
        } else {
            // 如果2025年中考还没过，显示2025年中考倒计时
            targetDate = jilinZhongkaoDate;
            examTitle = translations.zhongkao;
        }

        // 计算剩余时间
        const diffTime = targetDate - now;

        // 如果考试已经过去，返回相应信息
        if (diffTime < 0) {
            return {
                title: examTitle + translations.over,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
                formattedDays: "0.00000"
            };
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

        return {
            title: examTitle,
            days,
            hours,
            minutes,
            seconds,
            formattedDays
        };
    }

    // 更新考试倒计时 - 仅在控制台输出
    function updateExamCountdown() {
        const countdownInfo = getCountdownInfo();

        // 每10秒在控制台输出一次倒计时信息
        const seconds = new Date().getSeconds();
        if (seconds % 10 === 0) {
            console.log(`[倒计时] ${countdownInfo.title}: ${countdownInfo.days}${translations.days} ${countdownInfo.hours}${translations.hours} ${countdownInfo.minutes}${translations.minutes} ${countdownInfo.seconds}${translations.seconds} (${countdownInfo.formattedDays}${translations.days})`);
        }

        // 将倒计时数据存储到window对象中，以便其他脚本可以访问
        window._countdownData = countdownInfo;
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

    // 页面加载完成后执行初始化
    if (document.readyState === 'complete') {
        initialize();
        // 确保加载动画会隐藏
        hideLoading();
    } else {
        window.addEventListener('load', function() {
            initialize();
            // 确保加载动画会隐藏
            hideLoading();
        });
    }
})();
