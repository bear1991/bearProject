// 购物车弹窗
$(function(){
	var $iosActionsheet = $('#iosActionsheet');
	var $iosMask = $('#iosMask');

	function hideActionSheet() {
		$iosActionsheet.removeClass('weui-actionsheet_toggle');
		$iosMask.fadeOut(200);
	}

	$iosMask.on('click', hideActionSheet);
	$('#iosActionsheetCancel').on('click', hideActionSheet);
	$("#showIOSActionSheet").on("click", function(){
		if($iosActionsheet.hasClass('weui-actionsheet_toggle')){
			$iosActionsheet.removeClass('weui-actionsheet_toggle');
			$iosMask.fadeOut(200);
		}else{
			$iosActionsheet.addClass('weui-actionsheet_toggle');
			$iosMask.fadeIn(200);
		}
	});


	// 购物车弹窗选择数量
	$('#iosActionsheet img').on('click', function(){
		if($(this).hasClass('increase')){
			var oNum = $(this).prev();
			oNum.html( parseInt(oNum.html())+1 );
		}else if($(this).hasClass('reduce')){
			var oNum = $(this).next(),
			oNumVal = parseInt(oNum.html())-1<0?0:parseInt(oNum.html())-1;
			oNum.html( oNumVal );
		}
		var oFxnum = $(this).parents('.page__bd_spacing').eq(0).find('.fxNum'),
			oTotal = $(this).parents('.page__bd_spacing').eq(0).find('.total');
		oTotal.html(parseInt(oFxnum.html())+parseInt(oNum.html()));
	});
});


// 价格整数部分数字变大
$('.price-add>div:first-child').each(function(n){
	var arr = $(this).html().split('.');
	this.innerHTML = "￥<span style='font-size:18px;'>" + arr[0].slice(1) + "</span>." + arr[1];
});