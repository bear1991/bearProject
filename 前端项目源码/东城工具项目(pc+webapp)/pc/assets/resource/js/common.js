jQuery(function($) {	
    // 左侧导航小图标切换颜色
    var navList = $('.nav-list>li>a');
    // console.log(navList);
    navList.on('click', function(){
        var imgArr1 = $(this).find('img'),    // 选中项
            imgArr2 = $(this).parent().eq(0).siblings().find('img');    // 其他项
        imgArr1[0].src = srcSubstr(imgArr1[0], 1);
        Array.from(imgArr2).forEach(function(item, index){
            if(!$(this).parent().eq(0).siblings()[index].hasClass('active') || index){
                item.src = srcSubstr(item, 0);
            }
        });

    });
    // 更改小图标图片src路径
    function srcSubstr(img, n){
        var src = img.src.split('.')[0];
        var newSrc = src.substr(0, src.length-1);
        return newSrc + n + '.png';
    }
})