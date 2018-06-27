// 动态设置tab部分高度
$(function(){
    var msgHeight = $('.container').height() - $('#searchBar').height();
    $('#message').height(msgHeight);
});


// tab切换
$(function(){
    $('.weui-navbar__item').on('click', function () {
        $(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
        $('.weui-tab__panel>div').eq($(this).index()).addClass('active').siblings().removeClass('active');
        var lineLeft = ($(this).index()*0.2+0.03)*100+'%';
        $('.line').css('left', lineLeft);
    });
});