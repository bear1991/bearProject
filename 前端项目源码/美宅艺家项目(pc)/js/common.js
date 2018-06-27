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


// 动态设置区域高度
change();
window.addEventListener('resize', change);
function change(){
    changeHeight($('footer>ul'));
}
function changeHeight($obj){
    $obj.children().eq(1).height($obj.children().eq(0).height());
}
