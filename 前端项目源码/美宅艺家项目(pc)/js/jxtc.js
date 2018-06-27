$('.navListWrap>li>span').click(function(){
    $(this).addClass('navActive').parent().siblings().children('span').removeClass('navActive');
});



// 数量选择器
$('.input-mini').each(function(n){
    $('#spinner'+n).ace_spinner({value:0,min:0,max:100,step:1, on_sides: true, icon_up:'icon-plus smaller-75', icon_down:'icon-minus smaller-75', btn_up_class:'btn-success' , btn_down_class:'btn-danger'})
    .on('change', function(){
        console.log(this.value)
    });
});