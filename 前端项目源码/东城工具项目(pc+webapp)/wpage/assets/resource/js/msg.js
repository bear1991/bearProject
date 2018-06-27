// tab切换
$(function(){
    $('.weui-navbar__item').on('click', function () {
        $(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
        $('.weui-tab__panel>div').eq($(this).index()).addClass('active').siblings().removeClass('active');
        $('.line').css('left', $(this).index()?'65%':'15%');
    });
});

// 信箱弹窗
$(function(){
    var $androidActionSheet = $('#androidActionsheet');
    var $androidMask = $androidActionSheet.find('.weui-mask');

    $(".weui-tab__panel>div:first-child>div").on('click', function(){
        $androidActionSheet.fadeIn(200);
        $androidMask.on('click',function () {
            $androidActionSheet.fadeOut(200);
        });
    });

    $(".weui-icon-cancel").on('click',function () {
        $androidActionSheet.fadeOut(200);
    });
});