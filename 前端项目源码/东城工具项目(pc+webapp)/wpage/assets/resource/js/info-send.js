
$(function(){
	// 显示收件人列表
	$('.receiver').on('click', function(){
		$('#receicer-list').fadeIn(200, function(){
			// 动态设置收件人列表高度
			var receicerHeight = $('#receicer-list').height() - $('.cancel').height();
			$('.page').height(receicerHeight);
		});
	});

	// 隐藏收件人列表
	$('.cancel>img').on('click', function(){
		$('#receicer-list').fadeOut(200);
	});

	
	// 收件人列表全选/全不选
	$('.weui-cells__title>input').on('click', function(){
		var checkedOne = this.checked,
			checkTwo =  $(this).parent().siblings().find('input'),
			checkedTwo = checkedOne?true:false;
		checkTwo.forEach(item => {
			item.checked = checkedTwo;
		});
	});
});