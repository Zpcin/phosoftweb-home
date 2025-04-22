document.addEventListener('DOMContentLoaded', function() {
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
        }

        sideItem.addEventListener("click", () => {
            // 找到当前活动元素并移除活动状态
            const currentActive = document.getElementsByClassName("active-content")[0];
            currentActive.classList.remove("active-content");
            
            // 左侧导航状态更新
            document.getElementsByClassName("active-item")[0].classList.remove("active-item");
            sideItem.classList.add("active-item");
            
            // 延迟添加新活动元素的类，创建平滑过渡
            setTimeout(() => {
                elem.classList.add("active-content");
            }, 50);
            
            updateButtonStates();
        });

        document.getElementById("sidebar").appendChild(sideItem);
    }

    // 上一条按钮事件
    document.getElementById("prev-btn").addEventListener("click", () => {
        let prevItem = document.getElementsByClassName("active-item")[0].previousElementSibling;
        if (prevItem) {
            prevItem.scrollIntoView();
            prevItem.click();
        }
    });

    // 下一条按钮事件
    document.getElementById("next-btn").addEventListener("click", () => {
        let nextItem = document.getElementsByClassName("active-item")[0].nextElementSibling;
        if (nextItem) {
            nextItem.scrollIntoView();
            nextItem.click();
        }
    });

    // 刷新按钮状态
    function updateButtonStates() {
        if (document.getElementsByClassName("active-item")[0].previousElementSibling == undefined) {
            document.getElementById("prev-btn").classList.add("btn-disabled");
        } else {
            document.getElementById("prev-btn").classList.remove("btn-disabled");
        }

        if (document.getElementsByClassName("active-item")[0].nextElementSibling == undefined) {
            document.getElementById("next-btn").classList.add("btn-disabled");
        } else {
            document.getElementById("next-btn").classList.remove("btn-disabled");
        }
    }

    // 初始化按钮状态
    updateButtonStates();

    // 防止拖拽和右键
    document.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    });

    document.addEventListener("dragstart", (e) => {
        e.preventDefault();
    });
});
