// �����е���
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


// ������긡��Ч��
$('nav>ul>li').hover(function(){
    if($(this).children('.menu').length){
        $(this).toggleClass('bgw shadow');
    }
    $(this).children('span').toggleClass('navActive')
        .end().children('.menu').toggle();
});


// ��̬��������߶�
change();
window.addEventListener('resize', change);
function change(){
    changeHeight($('footer>ul'));
}
function changeHeight($obj){
    $obj.children().eq(1).height($obj.children().eq(0).height());
}
