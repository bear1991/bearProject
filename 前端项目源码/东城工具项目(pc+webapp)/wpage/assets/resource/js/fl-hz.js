// 动态设置返利列表内容高度
$(function(){
    var flHeight = $('.container').height() - $('.fl-sum').height() - 14;
    $('.fl-list').height(flHeight);
});