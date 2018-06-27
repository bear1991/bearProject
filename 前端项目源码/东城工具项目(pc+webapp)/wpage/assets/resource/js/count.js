// 价格整数部分数字变大
$(function(){
    $('.count-price').each(function(n){
        var arr = $(this).html().split('.');
        this.innerHTML = "￥<span style='font-size:18px;'>" + arr[0].slice(1) + "</span>." + arr[1];
    });
});


// 结算删除弹窗
$(function(){
    var $iosDialog = $('#iosDialog');
    
    $('.showIOSDialog').on('click', function(){
        var This = this;
        $iosDialog.fadeIn(200, function(){
            $('#dialogs').on('click', '.weui-dialog__btn', function(){
                $(this).parents('.js_dialog').fadeOut(200);
                if($(this).attr('status') == 'sure'){
                    console.log(1);
                    $(This).parents('.weui-panel__bd').eq(0).remove();
                }
            });
        });
    });
});