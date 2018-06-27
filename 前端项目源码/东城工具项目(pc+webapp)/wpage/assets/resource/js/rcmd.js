
// 价格整数部分数字变大
$(function(){
    $('.rcmd-list>li>p:last-child').each(function(n){
        var arr = $(this).html().split('.');
        this.innerHTML = "￥<span style='font-size:18px;'>" + arr[0].slice(1) + "</span>." + arr[1];
    });
});