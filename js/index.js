
$(document).ready(function() {

    $(".focus").hover(function() {
       
    }, function() {
        $(this).find(".prev,.next").show();
    })
  
    $(".prev,.next").hover(function() {
        $(this).fadeTo("show", 1);
    }, function() {
        $(this).fadeTo("show", 1);
})
    $(".focus").slide({
        titCell: ".num ul",
        mainCell: ".focuspic",
        effect: "fold",
        autoPlay: true,
        delayTime: 700,
        autoPage: "<li><a></a></li>"
    })
});

			

$(document).ready(function() {

    $(".focus2").hover(function() {
     
    }, function() {
        $(this).find(".prev,.next").show();
    })
  
    $(".prev,.next").hover(function() {
        $(this).fadeTo("show", 1);
    }, function() {
        $(this).fadeTo("show", 1);
})
    $(".focus2").slide({
        titCell: ".num2 ul",
        mainCell: ".focuspic2",
        effect: "fold",
        autoPlay: true,
        delayTime: 700,
        autoPage: "<li><a></a></li>"
    });
});



$(document).ready(function() {
  
    $(".focus3").hover(function() {
     
    }, function() {
        $(this).find(".prev,.next").show();
    })

    $(".prev,.next").hover(function() {
        $(this).fadeTo("show", 1);
    }, function() {
        $(this).fadeTo("show", 1);
})
    $(".focus3").slide({
        titCell: ".num2 ul",
        mainCell: ".focuspic3",
        effect: "fold",
        autoPlay: true,
        delayTime: 700,
        autoPage: "<li><a></a></li>"
    });
});


// ... (原有代码)

$(document).ready(function() {

    // 初始化 精彩瞬间 轮播 (focus3)
    // 使用 gy2.js 中的 slide 插件
    $(".focus3").slide({
        // titCell: ".num3 ul", // 如果添加分页指示器，可以启用
        mainCell: ".focuspic3 ul", // 指定滚动的主体
        effect: "leftMarquee", // 使用水平连续滚动效果
        autoPlay: true, // 自动播放
        interTime: 20, // 滚动速度 (数值越小越快)
        delayTime: 0, // 无延迟
        trigger: "click", // 触发方式，这里用click是为了兼容，实际由autoPlay驱动
        scroll: 1, // 每次滚动1个单位 (图片宽度+间距)
        vis: 4, // 可视区域内显示的图片数量，根据实际调整
        // 可选：添加左右按钮控制
        // prevCell: ".prev3",
        // nextCell: ".next3",
        // pnLoop: false, // 禁用循环按钮 (连续滚动模式下通常不需要)
        easing: 'swing' // 缓动效果
    });


});
