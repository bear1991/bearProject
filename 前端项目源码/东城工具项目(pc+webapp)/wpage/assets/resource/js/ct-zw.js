	
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
		$iosActionsheet.addClass('weui-actionsheet_toggle');
		$iosMask.fadeIn(200);
	});


	$('.weui-actionsheet__menu>div').on('click', function(){
		hideActionSheet();
		// 确定选项后代码

		$('#showIOSActionSheet').get(0).innerHTML = this.innerHTML;
	});
});