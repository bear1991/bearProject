	// 产品分类列表
	(function(){
		var widthAll = 0,
			proListUl = $(".pro-list>ul"),
			plUlChild = proListUl.children();
			proListWidth = $('.pro-list').width(),
			numIndex = 0;    // 保存右侧边界子项序列
	
		proListUl.children().each(function(n){
			widthAll += $(this).width();
			
			if(widthAll >= proListWidth && !numIndex){
				numIndex = n;
			}
		});
		proListUl.width(widthAll);    // 动态设置proListUl宽度
		// console.log(numIndex);   // 4

		// 向右切换
		$('#turnRt').on('click', function(){
			// 重新确定右侧边界子项序列
			var contMgLf = parseInt(proListUl.css('marginLeft'));  
			var totleWidth = 0; 
			for(var i=0;i<plUlChild.length;i++){
				totleWidth += plUlChild[i].clientWidth;
				
				if(totleWidth >= -contMgLf+proListWidth){
					numIndex = i;
					break;
				}
			}
			
			// 当proListUl宽度小于proList宽度时，设置numIndex为0
			if(totleWidth < -contMgLf+proListWidth){
				numIndex = 0;
			}

			if(numIndex){
				// 逐个向右切换
				numIndex++;
				if(numIndex < plUlChild.length){		// 当前没有到达最后子项序列时
					var totleWidth = 0; 
					for(var i=0;i<=numIndex;i++){
						totleWidth += plUlChild[i].clientWidth;
					}
					proListUl.css('marginLeft', (proListWidth-totleWidth)+'px');
				}
			}
		});
		
		// 触摸滑动分类条目
		var touchSx = 0,
			contMgLf = 0;
		proListUl.on('touchstart', function(e){    // 触摸点击
			// console.log('start', e);
			touchSx = e.changedTouches[0].pageX;
			contMgLf = parseInt(proListUl.css('marginLeft') || 0);    // 每次点击时重新获取proListUl左外边距
		});

		proListUl.on('touchmove', function(e){
			// console.log('move', e);
			var touchEx = e.changedTouches[0].pageX,
				positionX = touchEx-touchSx,
				proListUlMgLf = positionX+contMgLf;
			if(proListUlMgLf > 0){    // 左限制
				proListUlMgLf = 0;
			}else if(proListUlMgLf < proListWidth-widthAll){	// 右限制
				proListUlMgLf = proListWidth-widthAll;
			}
			//console.log(proListUlMgLf);
			proListUl.css('marginLeft', proListUlMgLf+'px');
		});


		// 选中项样式切换
		plUlChild.on('click', function(){
			$(this).addClass('active').siblings().removeClass('active');
		});
		
	})()



	// 分类弹窗
	$(function(){
		var $androidActionSheet = $('#androidActionsheet');
		var $androidMask = $androidActionSheet.find('.weui-mask');

		$("#showAndroidActionSheet").on('click', function(){
			$androidActionSheet.fadeIn(200);
			$androidMask.on('click',function () {
				$androidActionSheet.fadeOut(200);
			});
		});

		$(".weui-icon-cancel").on('click',function () {
			$androidActionSheet.fadeOut(200);
		});
	});

	

	// 增减数量
	$(function(){
		// 初始化
		$('.price-add').each(function(){
			var priceNum = parseInt($(this).children('.priceNum').html());
			if(priceNum>0){
				this.status = true;
				$(this).children('.priceNum').show();
				$(this).children('.priceReduce').show();
			}else{
				this.status = false;
			}
		});

		// 选择数量
		$('.price-add>img').on('click', function(){
			var oPriceNum = $(this).siblings('.priceNum');
			if(parseInt(oPriceNum.html())<0){
				oPriceNum.html(0);
			}
			var priceNumVal = 0;
			if($(this).hasClass('priceAdd')){    // 增加
				priceNumVal = parseInt(oPriceNum.html())+1;
				numChange(this, oPriceNum, oPriceNum.next(), priceNumVal);
			}else if($(this).hasClass('priceReduce')){    // 减少
				priceNumVal = parseInt(oPriceNum.html())-1;
				numChange(this, oPriceNum, $(this), priceNumVal);
			} 
		});

		function numChange(This, obj1, obj2, priceNumVal){
			obj1.html(priceNumVal);
			if(priceNumVal>0 && !This.parentNode.status){
				obj1.fadeIn();
				obj2.fadeIn();
				This.parentNode.status = true;
			}else if(priceNumVal<=0 && This.parentNode.status){
				obj1.fadeOut();
				obj2.fadeOut();
				This.parentNode.status = false;
			}
		}
	});



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