document.addEventListener('DOMContentLoaded', function() {
    // 获取元素
    const alipayBtn = document.querySelector('.payment-method:nth-child(1) .payment-btn');
    const wechatBtn = document.querySelector('.payment-method:nth-child(2) .payment-btn');
    const modal = document.getElementById('qrcode-modal');
    const qrcodeImage = document.getElementById('qrcode-image');
    const qrcodeText = document.getElementById('qrcode-text');
    const closeBtn = document.querySelector('.close-btn');
  
    alipayBtn.addEventListener('click', function() {
        qrcodeImage.src = "https://sponsor.psoft.eu.org/static/img/alipay-qrcode.png";
        qrcodeText.textContent = "支付宝扫码赞助";
        modal.style.display = 'flex';
    });

    wechatBtn.addEventListener('click', function() {
        qrcodeImage.src = "https://sponsor.psoft.eu.org/static/img/wechat-pay-qrcode.png";
        qrcodeText.textContent = "微信扫码赞助";
        modal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) { 
            modal.style.display = 'none';
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
        }
    });
});