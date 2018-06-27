// 吸顶盒导航
scrollFn();
$(window).scroll(scrollFn);
function scrollFn(){
    var scrollHeight = $(this).scrollTop();
    if(scrollHeight>=$('header').height()){
        $('nav').addClass('navFixed');
    }else{
        $('nav').removeClass('navFixed');
    }
}


// 导航鼠标浮动效果
$('nav>ul>li').hover(function(){
    if($(this).children('.menu').length){
        $(this).toggleClass('bgw shadow');
    }
    $(this).children('span').toggleClass('navActive')
        .end().children('.menu').toggle();
});
// 导航跳转对应区域
$('nav span').click(function(){
    var typeVal = this.getAttribute('type');
    if(typeVal){
        var speed = 50;
        var num = $(document).scrollTop();
        var sumHeight = $('#'+typeVal).offset().top - $('nav').height();
        var timer = setInterval(function(){
            if(Math.abs(sumHeight-num)<=speed){
                num = sumHeight;
                clearInterval(timer);
            }else{
                if(sumHeight>num){
                    num += speed;
                }else{
                    num -= speed;
                }
            }
            $(document).scrollTop(num);
        }, 10);
        // $(document).scrollTop($('#'+typeVal).offset().top - $('nav').height());
    }
});



// 配置轮播参数
$('.carousel').carousel({
    interval: 2400
})


// 字体变色下划线样式效果
$('.four span').hover(function(){
    $(this).toggleClass("navActive");
});
$('.sharp span').hover(function(){
    $(this).toggleClass("navActive");
});



// 动态设置four类名及子项li区域宽度
window.addEventListener('resize', function(){
    fourWidthChange('.scrollFour', '.scrollWrap', 'li');    
});
fourWidthChange('.scrollFour', '.scrollWrap', 'li');
function fourWidthChange(className1, className2, tagName){
    // 设置four类名子项宽度
    $(className1).children(tagName).each(function(){
        $(this).width(Math.floor($(this).parents(className2).width()/4));
    });

    // 设置four类名区域宽度
    $(className1).width(function(){
        var aFourLi = $(this).children(tagName);
        return aFourLi.length*aFourLi.eq(0).width();
    }).css('margin-left', function(){       // 窗口大小调整后，同步更新marginLeft值
        var aFourLi = $(this).children(tagName);
        return -Number($(this).attr('index'))*aFourLi.eq(0).width();    // index：记录当前子项移动序列
    });
}


// 初始化滚动左右按钮显示或隐藏
$('.scrollFour').each(function(){
	if($(this).children('li').length <= 4){		// 至少四项
		$(this).parent('.scrollWrap').siblings('.turnBtn').hide();
	}
});

// four类名子项区域左右滚动效果
$('.turnBtn').click(function(){
    var oFour = $(this).nextAll('.scrollWrap').children('.scrollFour').eq(0),
        oFourMglf = parseInt(oFour.css('margin-left')),
        aFourLiWidth = oFour.children('li').eq(0).width();

    var index  = Number(oFour.attr('index'));
    // console.log(index);
    if(!index || (index==oFour.children('li').length-4)){
        $(this).siblings('.turnBtn').fadeIn();
    }else if(index==oFour.children('li').length-5&&$(this).hasClass('rightBtn') || index==1&&$(this).hasClass('leftBtn')){
        $(this).fadeOut();
    }

    // 判断之前每个子项完全移动到目标位置时，再执行当前点击移动操作
    if(!(oFourMglf%aFourLiWidth)){
        var index  = Number(oFour.attr('index'));
        if($(this).hasClass('leftBtn')){    // 左按钮
            if(Math.abs(parseInt(oFour.css('margin-left'))) > 0){
                oFour.css('margin-left', function(){
                    return oFourMglf + aFourLiWidth +'px';
                }).attr('index', index-1);
            }
        }else if($(this).hasClass('rightBtn')){     // 右按钮
            if(Math.abs(oFourMglf) < oFour.width()-oFour.parent().width()){
                oFour.css('margin-left', function(){
                    return oFourMglf - aFourLiWidth + 'px';
                }).attr('index', index+1);
            }
        }
    }
});




// 动态设置区域高度
change();
window.addEventListener('resize', change);
function change(){
    changeHeight($('.locationSearch'));
    changeHeight($('footer>ul'));
}
function changeHeight($obj){
    $obj.children().eq(1).height($obj.children().eq(0).height());
}