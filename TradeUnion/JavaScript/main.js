// 统一初始化脚本
document.addEventListener('DOMContentLoaded', function() {
    // 获取当前页面路径
    const currentPath = window.location.pathname.split('/').pop();
    
    // 遍历所有导航链接
    document.querySelectorAll('.Nav a').forEach(link => {
        const linkPath = link.getAttribute('href');
        // 处理首页特殊匹配
        if ((currentPath === 'index.html' || currentPath === '') && linkPath === 'index.html') {
            link.parentElement.classList.add('active');
            return;
        }
          
        if (currentPath === linkPath) {
            link.parentElement.classList.add('active');
        }
    });
    // 主轮播图配置
    new Swiper('.main-swiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });

    // 精彩瞬间轮播图配置
    // 修改Swiper初始化配置
new Swiper('.moments-swiper', {
    loop: true,
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    // 启用点击事件
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    // 添加点击回调
    on: {
        click(swiper, event) {
            const slideLink = swiper.clickedSlide.querySelector('.slide-link');
            if (slideLink) {
                window.location.href = slideLink.href;
            }
        }
    },
    // 优化显示效果
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 5,
        stretch: 80,
        depth: 200,
        modifier: 1,
        slideShadows: false
    }
});

    // 统一悬停控制
    const swipers = document.querySelectorAll('.swiper-container');
    swipers.forEach(swiper => {
        swiper.addEventListener('mouseenter', () => {
            swiper.swiper.autoplay.stop();
        });
        swiper.addEventListener('mouseleave', () => {
            swiper.swiper.autoplay.start();
        });
    });
});

// 新增悬停延迟效果
document.querySelectorAll('.Nav a').forEach(link => {
    let hoverTimer;
    
    link.addEventListener('mouseenter', () => {
        hoverTimer = setTimeout(() => {
            link.style.transition = 'all 0.3s ease-out';
        }, 50);
    });
    
    link.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimer);
        link.style.transition = 'all 0.2s ease-in';
    });
});


// 背景过红时自动增强对比度
function adjustBadge() {
  const headerBg = getComputedStyle(document.querySelector('.header-banner')).backgroundColor;
  const rgb = headerBg.match(/\d+/g).map(Number);
  
  if (rgb[0] > 150) { // 当红色通道值过高时
    document.querySelector('.school-badge').style.filter += ' contrast(1.5)';
  }
}
window.addEventListener('load', adjustBadge);
// 优化
// 在DOMContentLoaded事件中添加
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible');
            // 添加动态延迟
            entry.target.style.transitionDelay = 
                `${entry.target.dataset.delay || 0}ms`;
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
});

// 为需要动画的元素添加观察
document.querySelectorAll('.content-wrapper, .special-column, .news-department, .home-footer')
    .forEach((el, index) => {
        el.dataset.delay = index * 100; // 阶梯延迟
        observer.observe(el);
    });

    




