// 加载公共头部
function loadHeader() {
    fetch('../mod/header.html')  // 修改路径
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        });
}

// 加载公共底部
function loadFooter() {
    fetch('../mod/footer.html')  // 修改路径
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer').innerHTML = data;
        });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
});