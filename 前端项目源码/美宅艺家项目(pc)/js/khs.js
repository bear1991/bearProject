// 垂直轮播
verticleBanner($('.contRt>img'), $('.contRt>ul')); 

/*
verticleBanner($('.contRt>img'), $('.contRt>ul')); 
function verticleBanner(btnObj, wrapObj, status){
    btnObj.click(function(){
        if($(this).hasClass('down')){    // down按钮
            wrapObj.append(wrapObj.children('li').first());
        }else if($(this).hasClass('up')){      // up按钮
            wrapObj.prepend(wrapObj.children('li').last());
        }
    });    
}
*/

function verticleBanner(btnObj, wrapObj, status){
    btnObj.click(function(){
        if($(this).hasClass('down')){     // down按钮
            // console.log(1);
            var oFirstChild = wrapObj.children('li').first();
            console.log(oFirstChild.height(), oFirstChild.css('margin-bottom'));
            oFirstChild.animate(
                {marginTop: -(oFirstChild.height()+parseFloat(oFirstChild.css('margin-bottom')))+'px'},
                function(){
                    wrapObj.append(oFirstChild);
                    oFirstChild.css('margin-top',0);
                }
            );
        }else if($(this).hasClass('up')){      // up按钮
            // console.log(2);
            var oLastChild = wrapObj.children('li').last();
            wrapObj.prepend(oLastChild);
            wrapObj.children('li').first().css('margin-top', -(oLastChild.height()+parseFloat(oLastChild.css('margin-bottom')))+'px')
                .animate({marginTop: 0});
        }
    });    
}

