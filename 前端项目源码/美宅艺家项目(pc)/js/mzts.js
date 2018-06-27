autoHeight();
window.onresize = autoHeight;
function autoHeight(){
    $('.introWrap>div>div:nth-child(2)').each(function(){
        var maxHeight = $(this).height();
        $(this).siblings().each(function(){
            if($(this).height() >= maxHeight){
                maxHeight = $(this).height();
            }
        });
        $(this).height(maxHeight);
    });
}