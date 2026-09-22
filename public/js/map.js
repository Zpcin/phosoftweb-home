/**
 * 我去过的地方 - Leaflet 旅行地图
 * 修改下方 PLACES 数组即可更新地点（名称 / 坐标 / 备注）
 * 坐标可在地图软件中拾取（纬度在前，经度在后）
 */
(function() {
    // 地点数据（我的旅行足迹）
    const PLACES = [
        { name: '松原 · 家', lat: 45.118, lng: 124.823, note: '吉林松原前郭尔罗斯，家乡' },
        { name: '哈尔滨', lat: 45.803, lng: 126.535, note: '' },
        { name: '长春', lat: 43.817, lng: 125.324, note: '' },
        { name: '沈阳', lat: 41.803, lng: 123.431, note: '' },
        { name: '北京', lat: 39.904, lng: 116.407, note: '' },
        { name: '成都', lat: 30.572, lng: 104.066, note: '' },
        { name: '重庆', lat: 29.563, lng: 106.551, note: '' },
        { name: '上海', lat: 31.230, lng: 121.474, note: '' },
        { name: '香港', lat: 22.320, lng: 114.169, note: '印象最深：刷卡和地铁' },
        { name: '新加坡', lat: 1.352, lng: 103.820, note: '很好' },
        { name: '朝鲜 · 罗先', lat: 42.25, lng: 130.29, note: '毗邻俄罗斯' },
        { name: '俄罗斯', lat: 43.116, lng: 131.885, note: '' },
    ];

    function initMap() {
        const container = document.getElementById('travelMap');
        if (!container || typeof L === 'undefined') return;

        const map = L.map(container, {
            scrollWheelZoom: false, // 避免滚轮抢占页面滚动
            minZoom: 3, // 高德瓦片在 z<=2 的低缩放级别返回空白图，禁止缩到更小
        });

        // 重置默认前缀：去掉 Leaflet 自带的"支持乌克兰"旗帜链接，仅保留 Leaflet 署名
        map.attributionControl.setPrefix('<a href="https://leafletjs.com" title="A JavaScript library for interactive maps">Leaflet</a>');

        // 高德瓦片（国内访问稳定；底图为 GCJ-02，市级标记偏差可忽略）
        L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
            subdomains: ['1', '2', '3', '4'],
            maxZoom: 18,
            attribution: '&copy; <a href="https://www.amap.com/">高德地图</a>',
        }).addTo(map);

        const bounds = [];
        PLACES.forEach(p => {
            L.circleMarker([p.lat, p.lng], {
                radius: 8,
                color: '#3a95e4',
                weight: 2,
                fillColor: '#4aa0e8',
                fillOpacity: 0.85,
            }).addTo(map).bindPopup(`<b>${p.name}</b>${p.note ? '<br>' + p.note : ''}`);
            bounds.push([p.lat, p.lng]);
        });

        map.fitBounds(bounds, { padding: [30, 30], maxZoom: 4 });

        // 页面入场动画 / loading 遮罩消失会改变布局，初始化时算好的瓦片位置会错位，
        // 导致底图显示不全、交互后才出现。这里在布局稳定后强制重算尺寸。
        const refreshSize = () => map.invalidateSize();
        requestAnimationFrame(refreshSize);
        setTimeout(refreshSize, 300);
        setTimeout(refreshSize, 1000);
        window.addEventListener('resize', refreshSize);
        window.addEventListener('load', refreshSize); // init 早于 load 时补一次
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        initMap();
    } else {
        window.addEventListener('load', initMap);
    }
})();
