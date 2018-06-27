$(function(){
	//图片展示预览
	$("ul.pic>li").each(function(){
		var liWidth = $(this).width(),
			liHeight = $(this).height();
			prop = $(this).width()/$(this).height(),
			childPic = $(this).children("img"),
			nWidth = 0,
			nHeight = 0,
			imgProp = 0;     //imgProp为后台图片的实际宽高比
			//console.log(prop,imgProp);
		
		//获取图片原始尺寸
		if (typeof childPic.get(0).naturalWidth == "undefined") {
		　　// IE 6/7/8
		　　var i = new Image();
		　　i.src = childPic.get(0).src;
		　　nWidth = i.width;
		　　nHeight = i.height;
		}
		else {
		　　// HTML5 browsers
		　　nWidth = childPic.get(0).naturalWidth;
		　　nHeight = childPic.get(0).naturalHeight;
		}
		//console.log(nWidth,nHeight);
		imgProp = nWidth/nHeight;
			
		if(imgProp >= prop){
			var mgTop = ($(this).height()-$(this).width()/imgProp)/2;
			childPic.width($(this).width())
			.css("margin-top",mgTop+"px");
		}else{
			childPic.height($(this).height())
			.css("margin","0 auto");
		}
	});


	//图片放大预览
	$("ul.pic>li>img").click(function(){
		var imgProp = $(this).width()/$(this).height();
	
		var boxWrap = $("<div id='boxWrap' class='pf fh'><div class='imgWrap pa'></div></div>"),
			imgWrap = boxWrap.children(".imgWrap"),
			imgClone = $("<img class='dis-b' src="+ this.src + " />");;
		
		boxWrap.click(function(){
			$(this).remove();
		});
		imgWrap.click(function(e){
			e.stopPropagation();
		});

		$("body").append(boxWrap);
		var prop = imgWrap.width()/imgWrap.height();
		//console.log(prop,imgProp);

		if(imgProp >= prop){
			var mgTop = (imgWrap.height()-imgWrap.width()/imgProp)/2;
			imgClone.width(imgWrap.width())
			.css("margin-top",mgTop+"px");
		}else{
			imgClone.height(imgWrap.height())
			.css("margin","0 auto");
		}

		imgWrap.append(imgClone);
	});


	//按钮水波纹样式切换
	$(".button").each(function(){
		if($(this).children("span").length >= 2){
			$(this).children("span").click(function(){
				$(this).addClass("waves-effect waves-light btn").siblings().removeClass("waves-effect waves-light btn");
			});
		}
	});

	//删除项目(模态)交互
	var delProject = '';
	$("img.del-pro").click(function(){
		delProject = $(this);
		//创建遮罩层
		var dpWrap = $("<div class='dp-wrap pf'></div>");
		dpWrap.css({
			"z-index":"9",
			"width":$("li.cont").width(),
			"height":$("li.cont").height(),
			"background":"rgba(0,0,0,0.6)"
		})
		.click(function(){
			var child = $(this).children();
			$(this).after(child).remove();
			child.fadeOut();
		});
		
		$(".delProject").wrap(dpWrap).fadeIn()
		.click(function(e){
			e.stopPropagation();
		});

		$(".delProject>ul.dp-btn>li.dp-sure").click(function(){
			delProject.parents(".pro").eq(0).remove();
		});
	});
	$(".delProject>ul.dp-btn>li").click(function(){
		var child = $(this).parents(".delProject");
		child.parent().after(child).remove();
		child.fadeOut();
	});

	//删除设备(模态)交互
	var delShebei = '';
	$("img.del-shebei").click(function(){
		delShebei = $(this);
		//创建遮罩层
		var dpWrap = $("<div class='dp-wrap pf'></div>");
		dpWrap.css({
			"z-index":"9",
			"width":$("li.cont").width(),
			"height":$("li.cont").height(),
			"background":"rgba(0,0,0,0.6)"
		})
		.click(function(){
			var child = $(this).children();
			$(this).after(child).remove();
			child.fadeOut();
		});
		
		$(".delShebei").wrap(dpWrap).fadeIn()
		.click(function(e){
			e.stopPropagation();
		});

		$(".delShebei>ul.dp-btn>li.dp-sure").click(function(){
			delShebei.parents(".collapsible-header").eq(0).parent().remove();
		});
	});
	$(".delShebei>ul.dp-btn>li").click(function(){
		var child = $(this).parents(".delShebei");
		child.parent().after(child).remove();
		child.fadeOut();
	});


	//日期时刻选择器初始化
	$('.date-time').fdatepicker({
		format: 'yyyy/mm/dd hh:ii',
		pickTime: true
	});
	//日期选择器初始化
	$('.onlyDate').fdatepicker({
		format: 'yyyy/mm/dd'
	});

	/*
	//时刻选择器初始化
	var timeDate = '';
	$('.onlyTime').clockTimePicker({
		//在时间发生改变时触发
		onChange:function(newValue,oldValue){
			console.log(newValue,oldValue);
			timeDate.attr("value",newValue);
		}
	})
	.focus(function(){
		$(this).parents(".input-field").children().last().css({
			"margin-top":"-16px",
			"color":"#417EE8"
		});
		timeDate = $(this);
	})
	.blur(function(){
		if(!$(this).hasClass("valid")){
			$(this).parents(".input-field").children().last().css({
				"margin-top":"0",
				"color":"#9E9E9E"
			});
		}
	});
	*/

	//动态添加自定义时间选择器
	$(".input-field>input.timeOnly").each(function(){
		var wrapClone = $(".wrap").last().clone();
		$(this).parent().append(wrapClone);
	});

	//header---记录
	var actionDd = $("ul.user-infor>li:first-child>dl>dd");
	actionDd.hover(function(){
		$(this).children(".action").stop().fadeToggle();
	});

	actionDd.find(".action>img").click(function(e){
		e.stopPropagation();
	});

	actionDd.find(".action>img:first-child").click(function(){
		$(this).parents("dd").css("background","#FFF url(../img/read.png) no-repeat left top/36px 30px");
	});
	actionDd.find(".action>img:last-child").click(function(){
		$(this).parents("dd").remove();
	});


	//消息中心初始化每项状态
	function drData(){
		//初始化消息中心每项的更多按钮
		$(".cont3>.pro>ul").each(function(){
			if($(this).children("li").length == 0){
				$(this).next().children("span").html("暂无内容");
			}
		});

		//消息中心单独删除每项中单条数据
		var delOne = $(".cont3>.pro>ul>li .pro-list-action>img:last-child")
		delOne.click(function(e){
			e.stopPropagation();
			var proUl = $(this).parents("ul").eq(0);
			$(this).parents("li").eq(0).remove();

			if(proUl.children("li").length == 0){
				proUl.next().children("span").html("暂无内容");
			}
		});

		//消息中心中整体删除每项全部数据
		var delAll = $(".cont3>.pro>.project>ul.pro-infor>li:last-child>img:last-child");
		delAll.click(function(){
			var proOne = $(this).parents(".pro").eq(0);
			proOne.children("ul").children("li").remove();
			proOne.children().last().children("span").html("暂无内容");
		});

		//单独已读
		var readOne = $(".cont3>.pro>ul>li .pro-list-action>img:first-child");
		readOne.click(function(e){
			e.stopPropagation();
			var obj = $(this).parent().parent();
			obj.css("background","#FFF url(../img/read.png) no-repeat left top/36px 36px");	
		});

		//全部已读
		var readAll = $(".cont3>.pro>.project>ul.pro-infor>li:last-child>img:first-child");
		readAll.click(function(){
			var obj = $(this).parents(".project").eq(0).next().find("div.collapsible-header")
			obj.css("background","#FFF url(../img/read.png) no-repeat left top/36px 36px");
		});

		
		//消息中心每项初始化默认显示3条
		$(".cont3 .pro>ul").each(function(){
			if($(this).children("li").length > 3){
				$(this).children("li:gt(2)").hide();
			}else{
				$(this).next().children("span").html("已加载全部");
			}
		});

		/*
		//点击更多新增4条数据
		var moreDisplay = $(".cont3 .pro").children("ul").next().children("span"),
			moreNum = [0,0,0,0],
			n = 4;
		moreDisplay.click(function(){
			var moreList = $(this).parents(".pro").eq(0).children("ul").children("li"), 
				moreLength = moreList.length,
				index = $(this).index();
			moreNum[index]++;
			if(moreLength>3 && moreLength<=moreNum[index]*n+3){
				moreList.slice((moreNum[index]-1)*n+3).show();
			}else if(moreLength>moreNum[index]*n+3){
				moreList.slice((moreNum[index]-1)*n+3,moreNum[index]*n+3).show();
			}
		});
		*/
	}

	/******************左侧导航切换***********************/
	var aAsideLi = document.querySelectorAll(".main .aside ul.aside-wrap li"),
		aCont = document.querySelectorAll(".main ul.content li.cont"),
		length = aAsideLi.length,
		index = 0;
	aCont[index].style.display = "block";
	for(var i=0;i<length;i++){
		aAsideLi[i].index = i;
		aAsideLi[i].onclick = function(){
			aAsideLi[index].querySelector("img").src = "img/left_1" + (index+1) + ".png";
			aCont[index].style.display = "none";
			this.querySelector("img").src = "img/left_0" + (this.index+1) + ".png";
			aCont[this.index].style.display = "block";
			index = this.index;

			//左侧导航栏点击时，将cont3里面Pro设置display:block
			if(index == 2){
				$(aCont[index]).find(".cont3>.pro").show();
			}else{
				$(aCont[2]).find(".cont3>.pro").show().end().hide();
			}

			//在数据中心显示后才加载百度地图，否则地图图标会出现在左上角
			index == 1?map():'';
			index == 2?drData():'';
		}
	}

	//跳转数据中心/删除项目/新增设备点击阻止冒泡
	$(".main .content li.cont .cont-wrap.cont1 .pro-list-action").children().click(function(e){
		e.stopPropagation();
	});

	//header通知消息点击跳转信息中心
	$(".header ul.icon-cont>li").click(function(){
		skip(2);
		var classNum = $(this).prop("class").split(' ')[0].match(/\d{1}/)[0]-1;
		$(".cont3>.pro").eq(classNum).show().siblings().hide();
		drData();    //初始化数据条数及已读和删除操作
		index = 2;
	});

	//split.png图标点击跳转数据中心
	var aSplit = $(".main .content li.cont .cont-wrap.cont1 .pro-list-action>img:first-child");
	aSplit.click(function(){
		skip(1);
		index = 1;   //同步index序列

		//在数据中心显示后才加载百度地图，否则地图图标会出现在左上角
		map();
	});

	//跳转时切换导航
	function skip(n){
		$(aAsideLi[n]).siblings().each(function(index){
			if((n==1&&index==0) || n==2){
				$(this).find("img").prop("src","img/left_1" + (index+1) + ".png");
			}else if(n==1&&index==1){
				$(this).find("img").prop("src","img/left_1" + (index+2) + ".png");
			}
		}).end().find("img").prop("src","img/left_0" + (n+1) + ".png");
		$(aCont[n]).siblings().css("display","none").end().css("display","block");
	}


	//header交互
	var	oSearchInput = oRemove = document.querySelector(".header form.search>input"),
		oRemove = document.querySelector(".header form.search img.remove"),
		oHeaderNum = document.querySelector(".header ul.user-infor li.icon>div>span"),
		aWNIcon = document.querySelectorAll(".header ul.user-infor li.icon>ul.w-n-icon>li>p:last-child>span"),
		aProListSpan = document.querySelectorAll(".main .content li.cont .cont-wrap.cont1 ul.collapsible li .collapsible-header ul.pro-list li>div>span"),
		spanLength = aProListSpan.length,
		aWNIconLength = aWNIcon.length;
		
	//页面刷新，搜索框内容删除
	window.onload = function(){
		oSearchInput.value = "";
	}
	//搜索框右侧删除
	oRemove.onclick = function(){
		oSearchInput.value = "";
		oRemove.style.display = "none";
	}


	//头部右侧图标点击显示效果
	$(".header ul.user-infor li").click(function(e){
		e.stopPropagation();
		$(this).siblings().each(function(){
			$(this).find(".icon-cont").fadeOut();				
		}).end().find(".icon-cont").fadeToggle();
	});
	$("body").click(function(){
		$(".header ul.user-infor li .icon-cont").each(function(){
			$(this).fadeOut();
		});
	});
	$(".header ul.user-infor li .icon-cont").click(function(e){
		e.stopPropagation();
	});


	//判断浏览器类型，根据不同浏览器调整不同样式
	var explorer =navigator.userAgent ;
	//非ie
	if (explorer.indexOf("MSIE") == -1) {
		oSearchInput.onkeyup = function(){
			if(oSearchInput.value){
				oRemove.style.display = "block";	
			}else{
				oRemove.style.display = "none";	
			}	
		}
	}
	
	//ie 
	if (explorer.indexOf("MSIE") >= 0) {
		//alert("ie");
		oHeaderNum.style.width = "12px";
		oHeaderNum.style.height = "12px";
		oHeaderNum.style.top = "-2px";
		oHeaderNum.style.left = "0";

		for(var i=0;i<aWNIconLength;i++){
			if(Number(aWNIcon[i].innerHTML)>9){
				aWNIcon[i].style.left = "0";
			}
		}
		
		for(var i=0;i<spanLength;i++){
			if(Number(aProListSpan[i].innerHTML)>=10){
				aProListSpan[i].style.left = "0";
			}else{
				aProListSpan[i].style.left = "3px";
			}
		}
	}
	//firefox 
	else if (explorer.indexOf("Firefox") >= 0) {
		//alert("Firefox");
		oHeaderNum.style.left = "-2px";
		for(var i=0;i<spanLength;i++){
			aProListSpan[i].style.left = "0";
		}

		for(var i=0;i<aWNIconLength;i++){
			if(Number(aWNIcon[i].innerHTML)>9){
				aWNIcon[i].style.left = "0";
			}
		}

		for(var i=0;i<spanLength;i++){
			if(Number(aProListSpan[i].innerHTML)<10){
				aProListSpan[i].style.left = "2px";
			}else{
				aProListSpan[i].style.left = "-1px";
			}
			aProListSpan[i].style.top = "-13px";
		}

	}
	//Chrome
	else if(explorer.indexOf("Chrome") >= 0){
		//alert("Chrome");
		for(var i=0;i<aWNIconLength;i++){
			if(Number(aWNIcon[i].innerHTML)>9){
				aWNIcon[i].style.left = "1px";
			}
		}


		for(var i=0;i<spanLength;i++){
			if(Number(aProListSpan[i].innerHTML)<10){
				aProListSpan[i].style.left = "4px";
			}else{
				aProListSpan[i].style.left = "1px";
			}
		}
	}
	//Opera
	else if(explorer.indexOf("Opera") >= 0){
		//alert("Opera");
	}
	//Safari
	else if(explorer.indexOf("Safari") >= 0){
		//alert("Safari");
	} 
	//Netscape
	else if(explorer.indexOf("Netscape")>= 0) { 
		//alert('Netscape'); 
	}
	
 
	/*业务中心*/
	//日期date下拉列表
	$('.dropdown-button').dropdown();

	//日期下拉选择列表动态生成(业务中心)
	var dateTime1 = new Date(),
			year1 = dateTime1.getFullYear(),
			month1 = dateTime1.getMonth()+1,
			nowDate1 = addZero(month1) + "/" + year1,
			year1Val = 0,
			month1Val = 0;
	$("#date-dropdown1").prev().find("span.dateSelect").html(nowDate1);
	month1 = Number(month1);
	for(var i=0;i<7;i++){
		if(month1-i<=0){
			month1Val = 12 + (month1-i);
			year1Val = year1 - 1;
		}else{
			month1Val = month1 - i;
			year1Val = year1;
		}
		var	dateList1 = year1Val + "年" + addZero(month1Val) + "月";
		$("#date-dropdown1").append("<li>" + dateList1 + "</li>");
	}
	
	//日期下拉选择列表动态生成(数据中心)	
	var dateTime2 = new Date(),
			year2 = dateTime2.getFullYear(),
			month2 = dateTime2.getMonth()+1,
			day2 = dateTime2.getDate(),
			nowDate2 = year2 + "/" + addZero(month2) + "/" + addZero(day2),
			year2Val = 0,
			month2Val = 0,
			day2Val = 0;
	$("#date-dropdown2").prev().find("span.dateSelect").html(nowDate2);
	month2 = 	Number(month2);
	day2 = Number(day2);
	for(var i=0;i<7;i++){
		if(day2-i<=0){
			if(month2 == 1){   
				day2Val = 31 + (day2-i);
				month2Val = 12;
				year2Val = year2 - 1;
			}else{
				if(month2 == 2){
					day2Val = 28 + (day2-i);
				}else if(month2==4||month2==6||month2==9||month2==11){
					day2Val = 31 + (day2-i);
				}else{
					day2Val = 30 + (day2-i);
				}			
				month2Val = month2 - 1;
				year2Val = year2;
			} 
		}else{
			day2Val = day2 - i;
			month2Val = month2;
			year2Val = year2;
		}
		var dateList2 = year2Val + "/" + addZero(month2Val) + "/" + addZero(day2Val);
		$("#date-dropdown2").append("<li>" + dateList2+ "</li>");
	}
	
	function addZero(param){
		if(param<10){
			var val = "0" + param;
			return val;
		}
		return param;
	}

	//业务中心下拉列表选择时间
	$("#date-dropdown1").each(function(){
		$(this).children("li").click(function(){
			var dateNum = $(this).html().match(/\d+/g);
			$(this).parent().prev().find("span.dateSelect").html(dateNum[1]+"/"+dateNum[0]);
		});
	});

	//数据中心下拉列表选择时间
	$("#date-dropdown2").each(function(){
		$(this).children("li").click(function(){
			$(this).parent().removeClass("active").hide().prev().removeClass("active").find("span.dateSelect").html($(this).html());
		})
	});


	//服务评价
	var $proInfor = $(".main .content li.cont .cont-wrap.cont1 .project .pro-infor");
	$proInfor.hover(function(){
		$(this).find("ul.action li.titImg").stop().fadeToggle(800);
	});


	//跳转数据中心
	var $header = $(".main .content li.cont .cont-wrap ul.collapsible li .collapsible-header");
	$header.hover(function(){
		$(this).children(".pro-list-action").stop().fadeToggle(800);
	});


	//设备信息切换（渐变效果）
	var aPro = document.querySelectorAll(".main .pro"),
		aLi = [],
		length = [];

	for(var j=0;j<aPro.length;j++){
		(function(j){		
			//collapsible-header头部点击切换显示效果
			aLi[j] = aPro[j].querySelectorAll("ul.collapsible>li .collapsible-header");
			length[j] = aLi[j].length;
			//console.log(j,length);
			for(var i=0;i<length[j];i++){

				//初始化每个titleopacity为0
				aLi[j][i].querySelector("ul.title").style.opacity = "0";

				aLi[j][i].index = i;
				aLi[j][i].onclick = function(){
					var oProList = this.querySelector("ul.pro-list"),
						oTitle = this.querySelector("ul.title");
					if(this.parentNode.className == "active"){
						time(oTitle,oProList);  
					}else{
						time(oProList,oTitle);
					}
					for(var i=0;i<length[j];i++){
						if(i != this.index){
							(function(i){
								var oTit = aLi[j][i].querySelector("ul.title");
								oTit.style.opacity = "0";
								oTit.style.display = "none";
								var timer = setTimeout(function(){
									var oPLst = aLi[j][i].querySelector("ul.pro-list");
									oPLst.style.display = "block";
									oPLst.style.opacity = "1";
									clearTimeout(timer);
								},200);
							})(i);
						}
					}
				}
			}
			function time(obj1,obj2){
				obj1.style.opacity = "0";
				obj1.style.display = "none";
				$(obj1).fadeOut();
				var time = setTimeout(function(){
					obj2.style.display = "block";
					obj2.style.opacity = "1";
					$(obj2).fadeIn();
					clearTimeout(time);
				},200);
			}
		})(j);
	}


	//在模态上点击，阻止冒泡
	$(".modal").click(function(e){
		e.stopPropagation();
	});

	//新增单模态弹窗初始化
	$('.modal').modal({
		ready: function(modal, trigger) {
			//console.log("Ready");
			//console.log(modal, trigger);

			//模态弹出右侧关闭图标点击关闭模态效果
			var oMHClose = modal[0].querySelector(".m-h-close");
			oMHClose.onclick = function(){
				$(modal[0]).modal('close');

				
				//保存模态后，清除文本域表单模态内容
				$(modal[0]).find("input.validate").each(function(){
					$(this).removeClass("active valid").prop("style","").val('')
					.next("label").removeClass("active").prop("style","")
					.next().hide();
				});
				
				
				//清除自定义时刻选择器内容
				$(modal[0]).find("input.timeOnly").next("label").prop("style",'');

				//消除新增维修人员搜索框
				$(this).siblings("input").hide().val("");			

			}

			//模态点击取消按钮
			var oCancel = $(modal[0]).find(".cancel");
			oCancel.click(function(){
				$(modal[0]).modal('close');
				
				//保存模态后，清除文本域表单模态内容
				$(modal[0]).find("input.validate").each(function(){
					$(this).removeClass("active valid").prop("style","").val('')
					.next("label").removeClass("active").prop("style","")
					.next().hide();
				});
				
				//清除自定义时刻选择器内容
				$(modal[0]).find("input.timeOnly").next("label").prop("style",'');
				
			});


			//新增维修人员搜索框搜索
			$(modal[0]).find(".modal-header>img.searchPerson").unbind("click").click(function(){
				var This = this;
				var personSearch = $(this).next("input.personSearch");
				if(personSearch.css("display") == "none"){		//搜索框不存在，显示搜索框
					personSearch.fadeIn(function(){
						$(this).focus();
					});
				}else if(personSearch.css("display") == "block"){      //搜索框存在
					if(personSearch.val()){		//搜索框存在内容值，进行搜索
						console.log("进行搜索");


					}else{		//搜索框不存在内容值，隐藏搜索框		
						personSearch.hide();
					}
				}
			});
			

			//个人资料下的电话验证/身份证号验证(phone、number)
			pattern($("#person>.modal-content input"),personJson);

			//设备加高格式验证
			$(".high").blur(function(){
				if($(this).val() && !$(this).val().match(/^[1-9]\d*(\.\d+)?$/)){
					$(this).css({
						"border-bottom":"1px solid red",
						"box-shadow":"0 1px 0 0 red"
					})
					.next().css("color","red")
					.next().show();
				}else if($(this).val().match(/^[1-9]\d*(\.\d+)?$/)){
					$(this).css({
						"border-bottom":"1px solid #4781E2",
						"box-shadow":"0 1px 0 0 #4781E2"
					})
					.next().css("color","#4781E2")
					.next().hide();
				}else if(!$(this).val()){
					$(this).css({
						"border-bottom":"1px solid #e5e5e5",
						"box-shadow":"0 1px 0 0 #e5e5e5"
					})
					.next().css("color","#9e9e9e")
					.next().hide();
				}	
			});


			//星星评价点击效果
			var aStarLi = modal[0].querySelectorAll(".modal-content ul.com-star li"),
				starLength = aStarLi.length,
				num = 0;
			for(var i=0;i<starLength;i++){
				aStarLi[i].index = i;
				aStarLi[i].onclick = function(){
					if(this.index < num || this.index > num){
						for(var m=0;m<starLength;m++){
							aStarLi[m].querySelector("img").src = "img/ustar.png";
							aStarLi[m].querySelector("p").className = "";
						}
						for(var j=0;j<this.index+1;j++){
							aStarLi[j].querySelector("img").src = "img/star.png";
						}
						this.querySelector("p").className = "cblue";
						num = this.index;
					}else{
						aStarLi[this.index].querySelector("img").src = "img/ustar.png";
						aStarLi[this.index].querySelector("p").className = "";
						aStarLi[this.index-1].querySelector("p").className = "cblue";
						num = this.index-1;
					}
				}
			}
				
			var mcNum = 0;
			//保存新增设备模态中初始内容
			if($(modal[0]).attr("id") == "addShebei"){
				var cloneContObj = $(modal[0]).find(".modal-content>ul.select").eq(0).clone();
			}
			//新增设备模态新增设备分配input的id属性值
			$(modal[0]).find(".modal-footer>a.increase").click(function(){
				mcNum++;
				var modalCont = $(this).parent().prev(),
					modalClone = $(modal[0]).find(".modal-content>ul.select").eq(0);
					cloneCont = cloneContObj.clone();
				cloneCont.find("input").each(function(i){
					$(this).prop("id",modalClone.find("input").eq(i).prop("id")+mcNum).fdatepicker();
				});
				cloneCont.find("label").each(function(i){
					$(this).prop("for",modalClone.find("label").eq(i).prop("for")+mcNum);
				});
				modalCont.append(cloneCont);
			});	

			//为选择的维修人员分配input的id属性值
			$(".person-row>.p-list").each(function(i){
				$(this).children("input").prop("id",$(this).children("input").prop("id")+i);
				$(this).children("label").prop("for",$(this).children("label").prop("for")+i);
			});


			/******************自定义时间选择器 start***********************/
			var apState = '',		//保存AM或PM状态
				hourCont = '',
				minuteCont = '',
				circleHour = '',
				hour = '',
				minute = '',
				moveState = false,
				wrapState = false,
				inputObj = '',
				cPointX = 0,
				cPointY = 0,
				scrollState = true;     //区分时分刻度盘，true为时刻度盘

			$(modal[0]).click(function(){
				$(this).find(".wrap").fadeOut();
			});
			
			$(modal[0]).find(".input-field>input.timeOnly").unbind("click").click(function(e){
				e.stopPropagation();
				if($(this).val()==''){      //获取焦点，input没有值
					//获取当前时间
					var date = new Date(),
					hour = date.getHours(),
					minute = date.getMinutes();
				}else{
					if($(this).val().match(/^\d{2}:\d{2}\s[\u4e00-\u9fa5]{2}$/)){     //获取焦点，input值格式匹配
						var valComponent = $(this).val().split(" "),
							vcNum = valComponent[0].split(":");

						if(valComponent[1] == "下午"){
							hour = Number(vcNum[0]) + 12;
						}else if(valComponent[1] == "上午"){
							hour = Number(vcNum[0]);
						}
						minute = Number(vcNum[1])
						//console.log(hour,minute);
					}else{		//获取焦点，input值格式不匹配
						valTest($(this));
					}
					
				}

				wrapState = false;
				if(inputObj && $(this) != inputObj){
					inputObj.next().next().fadeOut();
				}
				inputObj = $(this);
				if($(this).next().next().css("display") == "none"){
					$(this).next().next().fadeIn(function(){
						wrapState = true;
						scrollState = true;
						
						var wrapObj = $(this);
						//当自定义时间选择器位置上下滚动后重新获取中心位置（通过不同状态时的时分刻度盘中心获取）
						$(modal[0]).children(".modal-content").unbind("scroll").scroll(function(){
							var clockLiTimer1 = setTimeout(function(){
								var scrollObj = '';
								if(scrollState){	//时刻度盘
									scrollObj = wrapObj.find(".w-cont ul.clock>li>ul.number").eq(0);
								}else{		//分刻度盘
									scrollObj = wrapObj.find(".w-cont ul.clock>li>ul.number").eq(1);
								}
								//获取初始的表盘中心的offset值
								cPointX = scrollObj.offset().left + 15;
								cPointY = scrollObj.offset().top + 15;
								//console.log(cPointX,cPointY);
								clearTimeout(clockLiTimer1);
							});
						});

					});
				}
				timePlay(hour,minute,$(this));
			})
			.blur(function(){
				if($(this).val()==''){
					$(this).next().css("color","#9e9e9e");
				}else{
					if(!$(this).val().match(/^\d{2}:\d{2}\s[\u4e00-\u9fa5]{2}$/)){
						valTest($(this));
					}
				}

				var timer = setTimeout(function(){
					$(modal[0]).find("ul.select input.select-dropdown").each(function(){
						if($(this).hasClass("active")){
							$(modal[0]).find(".wrap").fadeOut();
						}
					});
					clearTimeout(timer);
				});

			});

			function valTest(This){
				var tpTime = This.next().next().children(".w-tp");
				var valueOne = tpTime.find(".w-tp-time>li").eq(0).children("span").html(),
					valueTwo = tpTime.find(".w-tp-time>li").eq(2).children("span").html(),
					valueThree = tpTime.find(".w-tp-ma>li.activeColor").children("span").html();
				if(valueThree == "上午"){
					valueThree = "上午";
				}else if(valueThree == "下午"){
					valueThree = "下午";
				}
				inputValue = valueOne + ":" + valueTwo + " " + valueThree;
				This.val(inputValue);
			}

			function timePlay(hour,minute,inputVal){
				var wrap = inputVal.next().next(),
					clockLi = wrap.find(".w-cont ul.clock>li"),
					maLi = wrap.find(".w-tp ul.w-tp-ma>li"),
					timeLiDom = timeLi = wrap.find(".w-tp ul.w-tp-time>li"),
					circleLineDom = circlrLine = wrap.find(".w-cont ul.clock>li.circle-line"),
					btnSpan = wrap.find(".w-bt>span");
				
				wrap.unbind("click").click(function(e){
					e.stopPropagation();
				});
				
				$("body").unbind("click").click(function(){
					if(wrapState){
						wrap.fadeOut();
					}
				});

				var clockLiTimer = setTimeout(function(){
					//获取初始的表盘中心的offset值
					cPointX = clockLi.children("ul.number").eq(0).offset().left + 15;
					cPointY = clockLi.children("ul.number").eq(0).offset().top + 15;
					//console.log(cPointX,cPointY);
					clearTimeout(clockLiTimer);
				});

				//初始化头部小时及区分AM和PM
				if(hour <= 12){    //AM
					maLi.eq(0).addClass("activeColor").siblings().removeClass("activeColor");
					if(hour<10){
						hourCont = "0"+hour;
					}else{
						hourCont = hour;
					}
					apState = "上午";
				}else if(hour > 12){    //PM
					maLi.eq(1).addClass("activeColor").siblings().removeClass("activeColor");
					if(hour < 22){
						hourCont = "0"+(hour-12);
					}else{
						hourCont = hour-12;
					}
					apState = "下午";
				}

				//初始化头部分钟数
				if(minute < 10){
					minuteCont = "0"+minute;
				}else{
					minuteCont = minute;
				}
				timeLi.eq(0).children().html(hourCont)
				.click(function(){      //点击头部时数
					$(this).parent().addClass("activeColor").siblings().removeClass("activeColor");
					clockLi.eq(1).fadeIn().next().fadeOut();
					circlrLine.children(".circle").css("opacity","0");
					circlrLine.css("transform","translateX(80px) translateY(10px) rotate("+ hourCont*30 +"deg)");
					scrollState = true;	
				});
				timeLi.eq(2).children().html(minuteCont)
				.click(function(){     //点击头部分数
					$(this).parent().addClass("activeColor").siblings().removeClass("activeColor");
					clockLi.eq(1).fadeOut();
					var minClock = clockLi.eq(2);
					//切换表盘到分刻度
					minClock.fadeIn();
					if(!(minuteCont%5)){
						circlrLine.css("transform","translateX(80px) translateY(10px) rotate("+ minuteCont*6 +"deg)")
						.children(".circle").css("opacity","0");
						minClock.find("ul.number>li").eq(minuteCont/5-1).addClass("bgActive").css("color","#FFF")
						.siblings().removeClass("bgActive").css("color","#5F5F5F");
					}else{
						circlrLine.css("transform","translateX(80px) translateY(10px) rotate("+ minuteCont*6 +"deg)")
						.children(".circle").css("opacity","1");
						minClock.children("li").removeClass("bgActive").css("color","#5F5F5F");
					}
					scrollState = false;
				});

				//初始化头部时间显示样式
				timeLi.eq(0).addClass("activeColor").siblings().removeClass("activeColor");
				clockLi.eq(1).show().next().hide();

				//初始化表盘刻度
				clockLi.each(function(){
					$(this).find("ul.number>li").each(function(i){
						$(this).css("transform","rotate("+ (i+1)*30 +"deg) translateY(-70px) rotate("+ -(i+1)*30 +"deg)");
					});
				});

				//初始化当前时的圆圈背景
				if(hour == 0){
					circleHour = 0;
				}else{
					circleHour = (hour-1)%12;
				}
				clockLi.eq(1).find("ul.number>li").eq(circleHour).addClass("bgActive").css("color","#FFF")
				.siblings().removeClass("bgActive").css("color","#5F5F5F");
				circlrLine.css("transform","translateX(80px) translateY(10px) rotate("+ (circleHour+1)*30 +"deg)")
				.children(".circle").css("opacity","0");
				
				//点击切换AM和PM
				maLi.click(function(){
					$(this).addClass("activeColor").siblings().removeClass("activeColor");
					timeLiDom.eq(0).addClass("activeColor").siblings().removeClass("activeColor");
					if($(this).index()){
						apState = '下午';
					}else{
						apState = '上午';
					}
					clockLi.eq(1).fadeIn().next().fadeOut();
					circlrLine.children(".circle").css("opacity","0");
					circlrLine.css("transform","translateX(80px) translateY(10px) rotate("+ hourCont*30 +"deg)");
					scrollState = true;
				});

				//点击小时刻度
				clockLi.eq(1).find("ul.number>li").unbind("click").click(function(){	
					hour = $(this).html();
					if(hour<10){
						hourCont = "0"+hour;
					}else{
						hourCont = hour;
					}
					timeLi.eq(0).children().html(hourCont);
					timeLi.eq(2).addClass("activeColor").parent().children().first().removeClass("activeColor");

					circlrLine.css("transform","translateX(80px) translateY(10px) rotate("+ hourCont*30 +"deg)");
					$(this).addClass("bgActive").css("color","#FFF").siblings().removeClass("bgActive").css("color","#5F5F5F");

					$(this).parents("li").eq(0).fadeOut();
					var minClock = $(this).parents("li").eq(0).next();
					//切换表盘到分刻度
					minClock.fadeIn();

					if(!(minuteCont%5)){
						circlrLine.css("transform","translateX(80px) translateY(10px) rotate("+ minuteCont*6 +"deg)")
						.children(".circle").css("opacity","0");
						minClock.find("ul.number>li").eq(minuteCont/5-1).addClass("bgActive").css("color","#FFF")
						.siblings().removeClass("bgActive").css("color","#5F5F5F");
					}else{
						circlrLine.css("transform","translateX(80px) translateY(10px) rotate("+ minuteCont*6 +"deg)")
						.children(".circle").css("opacity","1");
						minClock.children("li").removeClass("bgActive").css("color","#5F5F5F");
					}

					scrollState = false;
				});	

				//点击分钟刻度
				clockLi.eq(2).unbind("mousedown").mousedown(function(e){
					moveState = true;
					moveClock($(this),e,cPointX,cPointY,timeLi,circlrLine);
				})
				.unbind("mousemove").mousemove(function(e){      //在分刻度盘上移动
					if(moveState){
						moveClock($(this),e,cPointX,cPointY,timeLi,circlrLine);
					}
				})
				.unbind("mouseup").mouseup(function(){
					moveState = false;
					this.onmousedown = this.onmousemove = this.onmouseup = null;
				});

				//底部确定按钮
				btnSpan.eq(0).click(function(){
					var val = timeLi.eq(0).children().html()+":"+timeLi.eq(2).children().html();
					if(apState == '上午'){
						val += " 上午";
					}else if(apState == '下午'){
						val += " 下午";
					}
					inputVal.val(val);
					wrap.fadeOut();
					
					if(apState == "下午"){
						hour = Number(hour)+12;
					}
					minute = Number(minuteCont);
					//console.log(hour,minute);

					inputVal.next().css({
						"color":"#4781E2"
					})
					.addClass("active");
				});

				//底部取消按钮
				btnSpan.eq(1).click(function(){
					wrap.fadeOut();
				});
			}

			function moveClock(obj,e,cPointX,cPointY,timeLi,circleLine){
				//console.log(cPointX,cPointY);
				var sPageX = e.pageX,
					sPageY = e.pageY;
				var lengthX = sPageX-cPointX,
					lengthY = sPageY-cPointY;

				var deg = 180 - Math.atan2(lengthX,lengthY)*180/Math.PI;

				if((deg%30<=3) || (deg%30)>27){
					if(deg%30 <= 3){
						deg = parseInt(deg/30)*30;
					}else if(deg%30 > 27){
						deg = (parseInt(deg/30)+1)*30;
					}
					minuteCont = deg/30*5;

					obj.find("ul.number>li").eq(parseInt(deg/30)-1).addClass("bgActive").css("color","#FFF")
					.siblings().removeClass("bgActive").css("color","#5F5F5F");
					circleLine.children(".circle").css("opacity","0");
				}else{
					if(deg%6 <= 3){
						deg = parseInt(deg/6)*6;
					}else if(deg%6 > 3){
						deg = (parseInt(deg/6)+1)*6;
					}
					minuteCont = deg/6;

					obj.find("ul.number>li").removeClass("bgActive").css("color","#5F5F5F");
					circleLine.children(".circle").css("opacity","1");
				}
				circleLine.css("transform","translateX(80px) translateY(10px) rotate("+ deg +"deg)");
				if(minuteCont<10){
					minuteCont = "0"+minuteCont;
				}else if(minuteCont == 60){
					minuteCont = "00";
				}
				timeLi.eq(2).children().html(minuteCont);
			}
			/******************自定义时间选择器 end***********************/

			
		},
		
		//点击模态保存按钮后，保存模态中输入的内容
		complete: function(modal) { 
			//console.log(modal);
			
			//模态消除后保存数据内容
			var addCont = {};      //用来保存数据的对象 
			$(modal[0]).find("ul.select input").each(function(){
				if($(this).attr("type") == "radio"){        //单选
					if($(this).attr("checked") == "checked"){
						//console.log($(this).attr("name")+" : "+$(this).next().html());
						addCont[$(this).attr("name")] = $(this).next().html();
					}
				}else{
					if($(this).hasClass("select-dropdown")){		//下拉列表
						var classCont = $(this).parent().attr("class").split(" ");
						for(var i=0;i<classCont.length;i++){
							if(classCont[i] != "select-wrapper"){
								$(this).attr("name",classCont[i]);
							}
						}
					}
					//console.log($(this).attr("name")+" : "+$(this).val());
					addCont[$(this).attr("name")] = $(this).val();
				}
			})
			$(modal[0]).children(".modal-content").children().each(function(){
				if($(this).hasClass("com-star")){		//星星评价
					var pCblue = $(modal[0]).find("ul.com-star p.cblue");
					addCont["com-star"] = pCblue.eq(pCblue.length-1).html();
				}else if($(this).hasClass("com-cont")){			//文本域
					addCont["com-cont"] = $(modal[0]).find(".com-cont").html();
				}
			 });
			console.log(addCont);

			
			//保存模态后，清除文本域表单模态内容
			$(modal[0]).find("input.validate").each(function(){
				$(this).removeClass("active valid").prop("style","").val('')
				.next("label").removeClass("active").prop("style","")
				.next().hide();
			});
			

			//保存模态后，清除自定义时刻选择器内容
			$(modal[0]).find("input.timeOnly").val('').next("label").prop("style",'');
			//保存模态后，清除下拉列表内容
			$(modal[0]).find('select').material_select('destroy');
			$(modal[0]).find('select').material_select();
			var optionVal = $(modal[0]).find("input.select-dropdown").parent().find("select>option").first().html();
			$(modal[0]).find("input.select-dropdown").val(optionVal);

			//消除新增维修人员搜索框
			$(modal[0]).find(".m-h-close").siblings("input").hide().val("");			

		}
	});

	//模态中表单正则验证
	var personJson = {
		"phone":/^1[34578]\d{9}$/,
		"number":/^[1-9]\d{16}[\dxX]$/,
		"aD-tel":/^1[34578]\d{9}$/,
		"aD-id":/^[1-9]\d{16}[\dxX]$/
	}
	//新增司机下的电话验证/身份证号验证(aD-tel、aD-id)
	pattern($(".addDriver>.aD-content input"),personJson);

	//电话号码/身份证号表单验证函数方法
	function pattern(obj,jsonObj){
		obj.blur(function(){
			for(var key in jsonObj){
				if($(this).attr("name") == key){
					if($(this).val() && !$(this).val().match(jsonObj[key])){
						$(this).css({
							"border-bottom":"1px solid red",
							"box-shadow":"0 1px 0 0 red"
						})
						.next().css("color","red")
						.next().show();
					}else if($(this).val().match(jsonObj[key])){
						$(this).css({
							"border-bottom":"1px solid #4781E2",
							"box-shadow":"0 1px 0 0 #4781E2"
						})
						.next().css("color","#4781E2")
						.next().hide();
					}else if(!$(this).val()){
						$(this).css({
							"border-bottom":"1px solid #e5e5e5",
							"box-shadow":"0 1px 0 0 #e5e5e5"
						})
						.next().css("color","#9e9e9e")
						.next().hide();
					}	
				}
			}
		});
	}


	//header-头部资料模态效果
	$('.header-modal').click(function(e){
		e.preventDefault();    //阻止默认事件
		var mName = $(this)[0].href.split('#')[1];
		$("#"+ mName).modal('open');
	});

	//下拉框初始化
	$('select').material_select();

	//项目设备流程切换,(模拟数据)data--->[设备名称，已完成步骤]
	var data = [
		[
			{"name":"MT127345","fstep":"5"},
			{"name":"MT127346","fstep":"3"},
			{"name":"MT127347","fstep":"7"}
		],
		[
			{"name":"MT127348","fstep":"5"},
			{"name":"MT127349","fstep":"8"}
		]
	];
	
	var aPro = document.querySelectorAll(".main .content li.cont .cont-wrap.cont1 .pro"),
		proLength = aPro.length,
		aColLi = [];

	for(var i=0;i<proLength;i++){
		(function(i){
			aColLi[i] = aPro[i].querySelectorAll("ul.collapsible>li");

			for(var j=0;j<aColLi[i].length;j++){
				(function(j){  
					var stepNameList = ["前期沟通","设备报案","设备安装","设备启租","司机确认","设备维护","设备维修","设备加高","拆除设备"],
						index = Number(data[i][j].fstep),	//maxIndex:保存已完成步骤数，在点击改变图标样式时使用
						maxIndex = index;

					//console.log(data[i][j].fstep);    //当前已完成步骤数
					//console.log(stepName);
					
					//设备名称
					var productName = aColLi[i][j].querySelector(".collapsible-header ul.pro-list>li.pro-name>span"),
						productTitle = aColLi[i][j].querySelector(".collapsible-header ul.title>li.name");
					productTitle.innerHTML = productName.innerHTML = data[i][j].name;   
					
					//进度条
					var stepProgress = aColLi[i][j].querySelector(".collapsible-header ul.pro-list>li.pro-progress .small");
					stepProgress.style.width = 15*index + "px";

					//当前进度步骤
					var stepName = aColLi[i][j].querySelector(".collapsible-header ul.pro-list>li.pro-step>span"),
						indexName = Math.min(index,8);
					stepName.innerHTML = stepNameList[indexName];

					//步骤内容区(step-cont)
					var aStepLi = aColLi[i][j].querySelectorAll(".collapsible-body ul.step-cont>li"),
						stepLiLength = aStepLi.length;
					//console.log(aStepLi);

					//初始化已完成步骤图标(step)
					var aIconLi = aColLi[i][j].querySelectorAll(".collapsible-body ul.step>li"),
						iconLength = aIconLi.length;
					for(var m=0;m<index;m++){
						aIconLi[m].querySelector("img").src = "img/finish.png";
						aIconLi[m].className = "dis-inb cur finish"; 
					}

					if(index == 9){
						aIconLi[index-1].querySelector("img").src = "img/finish.png";
						aIconLi[index-1].className = "dis-inb cur finish"; 
					}	
						
					//初始化进行中步骤图标(step)
					if(index < 9){
						aIconLi[index].querySelector("img").src = "img/nlist" + (index+1) + ".png";
						aIconLi[index].className = "dis-inb cur fw now";
					}
					
					for(var n=0;n<index+1;n++){
						index = Math.min(index,8);    //设备所有步骤都完成后默认显示最后一个
						aStepLi[index].style.display = "block";    //初始化显示步骤内容
						aIconLi[n].index = n;
						aIconLi[n].onclick = function(){
							$(this).siblings().each(function(){
								if($(this).hasClass("now")){
									$(this).removeClass("now fw");		//清除上一次显示内容对应步骤的样式
									if($(this).index() == maxIndex){
										$(this).children("img").attr("src","img/dlist" + ($(this).index()+1) + ".png");
									}else{
										$(this).children("img").attr("src","img/finish.png");
									}
								}
							});

							//设置当前点击步骤字体加粗，图标大小改变
							$(this).addClass("now fw");

							//根据当前点击步骤是已完成还是正在进行中判断设置图标样式
							if($(this).index() != maxIndex){
								$(this).children("img").attr("src","img/flist.png");
							}else{
								$(this).children("img").attr("src","img/nlist" + ($(this).index()+1) + ".png");
							}

							aStepLi[index].style.display = "none";	
							aStepLi[this.index].style.display = "block";
							index = this.index;
						}
					}
				})(j);
			}
		})(i);
	}


	/******************新增项目、新增司机start***********************/
	var $addProject = $(".addProject"),
		$addDriver = $(".addDriver"),
		sRt = '',     //保存定位right属性值
		listNum = 1,     //在司机弹窗消失后恢复默认值
		sdState = false,     //保存是否自己找司机状态，选中为true
		$aDcloneObj = '';     //保存新增司机的初始内容
	$addProject.status = 'normal',
	$addDriver.status = 'normal';     
	
	//圆形按钮点击显示增加项目
	$("#aProject").click(function(){
		if($addDriver.css("display") == "none"){
			$addProject.show(function(){
				var This = $(this);
				//选择用户自己找司机后，新增项目中的新增司机按钮隐藏
				$(this).find(".input-field.radio label").click(function(e){
					e.stopPropagation();
					if($(this).html() == "用户自己找司机"){
						sdState = true;
						This.find("ul.add-footer>li").eq(1).hide();
						var obj = $addDriver,
							obj1 = $addProject,
							onOff = false;
						
						
						//新增司机弹出框存在时消除弹出框，恢复新增司机弹出框初始状态
						if(obj.status == "normal"){		//从正常化到消除    
							obj.hide();
							//obj1.css("right","160px");
						}else if(obj.status == "min"){     //从最小化到消除
							obj.status = "normal";

							obj.hide().width(480).css("right","160px")
							.children().eq(0).css("padding","20px 20px 12px")
							.siblings().show();
							//obj1.css("right","160px");	
						}
						//当新增项目弹框在正常化时，重新设置定位值，最大化时定位位置不改变
						if(obj1.state == "nomal"){
							obj1.css("right","160px");
						}
						

						//消除多余的新增司机，只保留一个
						obj.find(".add-wrap").eq(0).siblings().remove();

						//恢复listNum默认值
						if(obj.hasClass("addDriver")){
							listNum = 1;
						}

						//清除普通文本域表单模态内容
						obj.find("input.validate").each(function(){
							$(this).removeClass("active valid").val('')
							.next("label").removeClass("active");
						});
						//清除下拉列表内容
						obj.find('select').material_select('destroy');
						obj.find('select').material_select();
						var optionVal = obj.find("input.select-dropdown").parent().find("select>option").first().html();
						obj.find("input.select-dropdown").val(optionVal);
						
					}else{
						sdState = false;
						This.find("ul.add-footer>li").eq(1).show();
					}
				});
			});
		}
	})
	
	//点击新增项目中保存项目/新增司机中保存按钮，消除和清空弹出框
	remove($addProject,$addDriver,$addProject.find("ul.add-footer>li:first-child"),true);
	remove($addDriver,$addProject,$addDriver.find("ul.add-footer>li:first-child"),false);

	//在新增项目中点击新增司机
	$addProject.find("ul.add-footer>li:nth-child(2)").click(function(e){
		e.stopPropagation();
		if($addDriver.css("display") == "none" && !sdState ){     //新增司机弹框不存在并且选中神丰司机时，显示新增司机弹框
			if($addProject.status == "normal"){
				$addProject.css("right",160+480+10+"px");	
			}
			$addDriver.show(function(){
				$aDcloneObj = $(".aD-content-wrap").clone();   //新增司机显示后保存初始内容
			});
		}else{      //司机弹框存在时，增加司机
			addDriver();
		}
	})

	//新增司机弹框存在时，增加司机
	$addDriver.find("ul.add-footer>li:nth-child(2)").click(function(){
		addDriver();
	})

	//新增司机
	function addDriver(){
		var $aDclone = $aDcloneObj.clone();		//克隆保存的新增司机的初始内容
		//新增司机时，改变input的id、name和label的for属性值
		$aDclone.find(".input-field input").each(function(){
			$(this).prop({
				"id":$(this).prop("id")+listNum,
				"name":$(this).prop("name")+listNum,
			})
			.next("label").prop("for",$(this).next("label").prop("for")+listNum);
		});
		$(".aD-content").append($aDclone);
		listNum++;
	}	

	//正常化和最小化(第一个按钮)
	minDisplay($addProject,$addDriver,$(".addProject ul.add-header>li>img.minDisplay"),true);   
	minDisplay($addDriver,$addProject,$(".addDriver ul.add-header>li>img.minDisplay"),false);
	function minDisplay(obj,obj1,clickObj,onOff){
		clickObj.click(function(e){
			e.stopPropagation();
				
			if(obj.status == "normal"){    //从正常化到最小化
				obj.status = "min";
				
				obj.find("ul>li>img.change").prop("src","img/scale-big.png");
				if(!onOff){     //司机最小化,然后项目往右靠
					obj.width(200).css("right","160px")
					.children().eq(0).css("padding","10px 10px 6px").siblings().hide();
					obj1.css("right",160+200+10+"px");

				}else{      //项目最小化
					var proRt = $addDriver.css("display") == "none"?"160px":160+parseFloat(obj1.width())+10+"px";
					obj.width(200).css("right",proRt)
					.children().eq(0).css("padding","10px 10px 6px").siblings().hide();
				}
			}else if(obj.status == "min"){       //从最小化到正常化
				obj.status = "normal";    
				
				if(!onOff){    //司机正常化，左侧项目往左移
					obj1.css("right",160+480+10+"px");
				}
				obj.width(480).children().eq(0).css("padding","20px 20px 12px").siblings().show();
			}else if(obj.status == "max"){     //从最大化到最小化
				obj.status = "min";
				
				obj.find("ul>li>img.change").prop("src","img/scale-big.png");
				var obj2 = obj.find(".input-field:nth-child(odd)"),
					obj3 = obj.find(".input-field:nth-child(even)"),
					obj4 = obj.find(".input-field"),
					obj5 = obj.find(".input-field.radio");

				//在正常化后移除遮罩层
				obj.parent().after(obj).remove();

				if(!onOff){     //司机最小化,然后项目往右靠
					obj.width(200).css({
						"right":"160px",
						"margin-right":"0"
					})
					.children().eq(0).css("padding","10px 10px 6px").siblings().hide();
					obj1.css("right",160+200+10+"px");

				}else{      //项目最小化
					var proRt = obj1.css("display") == "none"?"160px":160+parseFloat(obj1.width())+10+"px";
					sRt = proRt;   //在项目弹框最大化时增加司机弹框，然后最小化项目弹框，重新设定定位right
					obj.width(200).css({
						"right":proRt,
						"margin-right":"0"
					})
					.children().eq(0).css("padding","10px 10px 6px").siblings().hide();
				}
				//在最大化到最小化后，将弹框恢复默认设置
				obj.css({
					"bottom":"40px",
					"right":sRt,
					"z-index":"2"
				});
				obj4.css("margin","0");
				obj5.css("margin","10px 0 20px");
				obj2.css("margin-right","18px");
				obj3.css("margin-left","18px");				
			} 
		});
	}

	//最大化和正常化(第二个按钮)
	scaleChange($addProject,$addDriver,$(".addProject ul.add-header>li>img.change"),true)
	scaleChange($addDriver,$addProject,$(".addDriver ul.add-header>li>img.change"),false)
	function scaleChange(obj,obj1,clickObj,onOff){
		clickObj.click(function(e){
			e.stopPropagation();

			var obj2 = obj.find(".input-field:nth-child(odd)"),
				obj3 = obj.find(".input-field:nth-child(even)"),
				obj4 = obj.find(".input-field"),
				obj5 = obj.find(".input-field.radio");

			if(obj.status == "normal"){     //从正常化到最大化
				obj.status = "max";

				$(this).prop("src","img/scale-small.png");
				sRt = obj.css("right");    //获取弹框放大之前的正常状态时的定位right值

				//创建遮罩层
				var $addpdwrap = $("<div class='add-pd-wrap pf'></div>")
			
				$addpdwrap.css({
					"z-index":"5",
					"width":$("li.cont").width(),
					"height":$("li.cont").height(),
					"background":"rgba(0,0,0,0.6)"
				})
				.click(function(){     //给遮罩层注册事件
					obj.status = "normal";

					//在项目最大化，并且司机存在时，点击遮罩层，项目正常化，重新获取定位right
					if(obj == $addProject && obj1.css("display") == "block"){
						sRt = Math.max(parseFloat(sRt),160+parseFloat(obj1.width())+10) +"px";
					}
					
					$(this).after(obj).remove().end().hide();
					obj.find("ul>li>img.change").prop("src","img/scale-big.png");
					obj.width(480).css({
						"bottom":"40px",
						"right":sRt,
						"z-index":"2",
						"margin-right":"0",
						"background":"#FFF"
					});
					obj4.css("margin","0");
					obj5.css("margin","10px 0 20px");
					obj2.css("margin-right","18px");
					obj3.css("margin-left","18px");	
				})
				.append(obj);
				$(".cont-wrap.cont1").append($addpdwrap);
			
				obj.width(820).css({
					//"z-index":"4",
					"bottom":"60px",
					"right":"50%",
					"margin-right":"-410px"
				});

				obj2.css("margin-right","0");
				obj3.css("margin-left","0");
				obj4.css("margin",onOff?"0 35px":"0 40px");
				onOff?obj5.css("margin","10px 0 20px 35px"):"";
				obj4.each(function(){
					if( ($(this).index()+1)%3===1 ){
						$(this).css("margin-left","0");
					}else if(($(this).index()+1)%3===0){
						$(this).css("margin-right","0");
					}
				});

			}else{      //正常化
				if(obj.status == "max"){     //从最大化到正常化
					$(this).prop("src","img/scale-big.png");

					//在正常化后移除遮罩层
					obj.parent().after(obj).remove();
					
					//在项目弹框最大化时增加司机弹框，然后正常化项目弹框，重新设定定位right
					if(obj == $addProject && obj1.css("display") == "block"){
						sRt = Math.max(parseFloat(sRt),160+parseFloat(obj1.width())+10) +"px";
					}

					obj.width(480).css({
						"bottom":"40px",
						"right":sRt,
						"z-index":"2",
						"margin-right":"0"
					});
					obj4.css("margin","0");
					obj5.css("margin","10px 0 20px");
					obj2.css("margin-right","18px");
					obj3.css("margin-left","18px");
				
				}else if(obj.status == "min"){       //从最小化到正常化
					if(!onOff){    //司机正常化，左侧项目往左移
						obj1.css("right",160+480+10+"px");
					}
					obj.width(480).children().eq(0).css("padding","20px 20px 12px").siblings().show();
				}
				obj.status = "normal";
			}
									
		});
	}

	//关闭(第三个按钮或者保存按钮)
	remove($addProject,$addDriver,$(".addProject ul.add-header>li>img.addClose"),true);
	remove($addDriver,$addProject,$(".addDriver ul.add-header>li>img.addClose"),false);
	function remove(obj,obj1,clickObj,onOff){
		obj.click(function(e){
			e.stopPropagation();
		});
		clickObj.click(function(e){
			e.stopPropagation();

			//弹出框消除之前保存新增项目/新增司机数据内容
			if(clickObj.hasClass("save")){     
				var addCont = {};      //用来保存数据的对象
				obj.find(".add-wrap input").each(function(){
					if($(this).attr("type") == "radio"){        //单选
						if($(this).attr("checked") == "checked"){
							//console.log($(this).attr("name")+" : "+$(this).next().html());
							addCont[$(this).attr("name")] = $(this).next().html();
						}
					}else{
						if($(this).hasClass("select-dropdown")){		//下拉
							var classCont = $(this).parent().attr("class").split(" ");
							for(var i=0;i<classCont.length;i++){
								if(classCont[i] != "select-wrapper"){
									$(this).attr("name",classCont[i]);
								}
							}
						}
						//console.log($(this).attr("name")+" : "+$(this).val());
						addCont[$(this).attr("name")] = $(this).val();
					}
				})
				console.log(addCont);
			}
			
			//分情况消除
			if(obj.status == "normal"){		//从正常化到消除    
				if(!onOff){     //司机
					obj.hide();
					obj1.css("right","160px");
				}else{		//项目
					obj.hide().css("right","160px");
				}
			}else if(obj.status == "max"){		//从最大化到消除
				obj.status = "normal";

				//消除遮罩层,弹框隐藏
				obj.parent().after(obj).remove().end().hide();
				if(!onOff){     //司机消除，项目往右靠
					obj1.css("right","160px");
				}
				
				var obj2 = obj.find(".input-field:nth-child(odd)"),
					obj3 = obj.find(".input-field:nth-child(even)"),
					obj4 = obj.find(".input-field"),
					obj5 = obj.find(".input-field.radio");
				
				//恢复初始默认值
				obj.find("ul>li>img.change").prop("src","img/scale-big.png");
				
				obj.width(480).css({
					"bottom":"40px",
					"right":"160px",
					"z-index":"2",
					"margin-right":"0",
					"background":"#FFF"
				});
				obj4.css("margin","0");
				obj5.css("margin","10px 0 20px");
				obj2.css("margin-right","18px");
				obj3.css("margin-left","18px");	

			}else if(obj.status == "min"){      //从最小化到消除
				obj.status = "normal";

				obj.hide().width(480).css("right","160px")
				.children().eq(0).css("padding","20px 20px 12px")
				.siblings().show();
				if(!onOff){      //司机
					obj1.css("right","160px");	
				}
			}

			if(!onOff){    //消除多余的新增司机，只保留一个
				obj.find(".add-wrap").eq(0).siblings().remove();
			}

			//恢复listNum默认值
			if(obj.hasClass("addDriver")){
				listNum = 1;
			}
			
			
			//保存后，清除普通文本域表单模态内容
			obj.find("input.validate").each(function(){
				$(this).removeClass("active valid").val('')
				.next("label").removeClass("active");
			});
			//保存后，清除下拉列表内容
			obj.find('select').material_select('destroy');
			obj.find('select').material_select();
			var optionVal = obj.find("input.select-dropdown").parent().find("select>option").first().html();
			obj.find("input.select-dropdown").val(optionVal);

		});
	}

	/******************新增项目、新增司机end***********************/


	/******************数据中心***********************/
	function map(){
		//高德浏览器定位
		 var map, geolocation,rplng,rplat;
		//加载地图，调用浏览器定位服务
		map = new AMap.Map('container', {
			resizeEnable: true
		});
		map.plugin('AMap.Geolocation', function() {
			geolocation = new AMap.Geolocation({
				enableHighAccuracy: true,//是否使用高精度定位，默认:true
				timeout: 10000,          //超过10秒后停止定位，默认：无穷大
				buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
				zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
				buttonPosition:'RB'
			});
			map.addControl(geolocation);
			geolocation.getCurrentPosition();
			AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
			AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
		});
		
		 //解析定位结果
		function onComplete(data) {
			rplng = data.position.getLng();
			rplat = data.position.getLat();
			
			var str=['定位成功'];
			str.push('经度：' + data.position.getLng());
			str.push('纬度：' + data.position.getLat());
			if(data.accuracy){
				 str.push('精度：' + data.accuracy + ' 米');
			}//如为IP精确定位结果则没有精度信息
			str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
			//console.log(str);
			

			//初始化地图对象，加载地图
			var map = new AMap.Map("allmap", {
				resizeEnable: true,
				center: [rplng, rplat],//地图中心点
				zoom: 16 //地图显示的缩放级别
			});
			
			addMarker();
			//添加marker标记
			function addMarker() {
				map.clearMap();
				//添加点标记，并使用自己的icon
				var marker = new AMap.Marker({
					map: map,
					position: [rplng, rplat],
					icon: new AMap.Icon({            
						size: new AMap.Size(40, 50),  //图标大小
						image: "img/location.png",
						imageOffset: new AMap.Pixel(0, 0)
					})        
				});
				//鼠标点击marker弹出自定义的信息窗体
				AMap.event.addListener(marker, 'click', function() {
					infoWindow.open(map, marker.getPosition());
				});
			}

			//实例化信息窗体
			var title = "<ul><li style='margin:4px 0;font-size:12px;color:#767676'>坐标：4124.8963，08151.6838</li><li style='margin:4px 0;font-size:12px;color:#767676'>本机设备号：TWSN0001</li><li style='margin:4px 0;font-size:12px;color:#767676'>上传设备号：TWSN0001</li></ul>";
			var infoWindow = new AMap.InfoWindow({
				isCustom: true,  //使用自定义窗体
				content: createInfoWindow(title),
				offset: new AMap.Pixel(16, -45)
			});
			
			//构建自定义信息窗体
			function createInfoWindow(title) {
				var info = document.createElement("div");
				info.className = "info";
				info.innerHTML = title;
				var closeX = document.createElement("img");				
				closeX.src = "http://webapi.amap.com/images/close2.gif";
				closeX.className = "closeX";
				closeX.onclick = closeInfoWindow;
				info.appendChild(closeX);
				return info;
			}	
			//关闭信息窗体
			function closeInfoWindow() {
				map.clearInfoWindow();
			}
		
		}
		//解析定位错误信息
		function onError(data) {
			console.log('定位失败');
		}
	}

	//echarts图表
	//仪表盘
	// 基于准备好的dom，初始化echarts实例
	var myChart11 = echarts.init(document.getElementById('cf-two-1'));
	var myChart12 = echarts.init(document.getElementById('cf-two-2'));
	//仪表盘1
	option11 = {
		tooltip : {
			formatter: "{a} <br/>{b} : {c}h"
		},
		/*
		toolbox: {
			feature: {
				restore: {},    //配置项还原
				saveAsImage: {}   //保存为图片
			}
		},*/
		series: [
			{
				name: '工频模式',
				type: 'gauge',
				z:-20,
				radius:'90%',
				startAngle: 225,
				endAngle:-45,
				min:0,
				max:12,
				splitNumber:12,
				detail: {
					formatter:'{value}h 14m 20s',
					textStyle:{
						color:'#000',
						fontSize:14,
						fontWeight:"bold"
					}
				},
				data: [
					{
						value:4, 
						name:'工频模式工作时间',
						textStyle:{color:'#000'}
					}
				],
				pointer: {
					length : '70%',
					width:5,
					color : '#000'
				},
				axisLine: {// 坐标轴线
					lineStyle: {// 属性lineStyle控制线条样式
							width:10,
							color:[
								[0.2, '#C9C9C9'],
								[0.8, '#91A92F'],
								[1, '#E57C73']
							]
					}
				},
				axisTick: {   
					length :4,// 属性length控制线长
					lineStyle: {       // 属性lineStyle控制线条样式
						color: '#fff',
						width: 1
					}
				},
				splitLine: {           // 分隔线
					length:6,         // 属性length控制线长
					lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
						color: '#fff'
					}
				},
				title : {
					textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						fontSize:12,
						color:'#787878',
						fontFamily:'微软雅黑'
					}
				},
				axisLabel: {
					show: true,
					distance:4,
					formatter: null,
					textStyle: {
						color: '#CDCCCA',
						fontSize:12
					}
				}
			}
		]
	};
	//仪表盘2
	option12 = {
		tooltip : {
			formatter: "{a} <br/>{b} : {c}h"
		},
		/*
		toolbox: {
			feature: {
				restore: {},    //配置项还原
				saveAsImage: {}   //保存为图片
			}
		},*/
		series: [
			{
				name: '工频模式',
				type: 'gauge',
				z:-20,
				radius:'90%',
				startAngle: 225,
				endAngle:-45,
				min:0,
				max:12,
				splitNumber:12,
				detail: {
					formatter:'{value}h 14m 20s',
					textStyle:{
						color:'#000',
						fontSize:14,
						fontWeight:"bold"
					}
				},
				data: [
					{
						value:4, 
						name:'工频模式工作时间',
						textStyle:{color:'#000'}
					}
				],
				pointer: {
					length : '70%',
					width:5,
					color : '#000'
				},
				axisLine: {// 坐标轴线
					lineStyle: {// 属性lineStyle控制线条样式
							width:10,
							color:[
								[0.2, '#C9C9C9'],
								[0.8, '#91A92F'],
								[1, '#E57C73']
							]
					}
				},
				axisTick: {   
					length :4,// 属性length控制线长
					lineStyle: {       // 属性lineStyle控制线条样式
						color: '#fff',
						width: 1
					}
				},
				splitLine: {           // 分隔线
					length:6,         // 属性length控制线长
					lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
						color: '#fff'
					}
				},
				title : {
					textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						//fontWeight: 'bolder',
						fontSize:12,
						color:'#787878',
						fontFamily:'微软雅黑'
					}
				},
				axisLabel: {
					show: true,
					distance:4,
					formatter: null,
					textStyle: {
						color: '#CDCCCA',
						fontSize:12
					}
				}
			}
		]
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart11.setOption(option11);
	myChart12.setOption(option12);


	//饼图
	var myChart21 = echarts.init(document.getElementById('cf-three-1'));
	var myChart22 = echarts.init(document.getElementById('cf-three-2'));
	var myChart23 = echarts.init(document.getElementById('cf-three-3'));
	var myChart24 = echarts.init(document.getElementById('cf-three-4'));
	var myChart25 = echarts.init(document.getElementById('cf-three-5'));
	var labelTop={
		normal:{
			label:{
				show:true,
				position:'center',
				formatter:'{b}',
				textStyle:{
					baseline:'bottom',
					color:'#9B9B9B',
					fontFamily:'微软雅黑',
					fontSize:'12',
					fontWeight:'200'
				}
			},
			labelLine:{
				show:false
			}
		}
	};
	var labelBottom = {
		normal:{
			color:'#417EE8',
			label:{
				show:true,
				position:'center'
			},
			labelLine:{
				show:false
			}
		}/*,
		emphasis:{
			color:'rgba(0,0,0,1)'
		}*/
	};
	var radius=['70%','80%'];
	var center=['50%','50%'];
	var color=['#DBDBDB'];
	var hoverAnimation=false;
	//饼图1
	option21={
		series:[
			{
				type : 'pie',
				center : center,
				radius : radius,
				hoverAnimation:hoverAnimation,
				x: '0%', // for funnel
				itemStyle : {
					normal:{
						label:{
							formatter:function (params){
								return params.value + 'Hz';
								var ss='<span>'+params+'</span>';
							},
							textStyle:{
								baseline:'top',
								color:'#1C0C02',
								fontFamily:'微软雅黑',
								fontWeight:'900',
								fontSize:'24'
							}
						}
					}
				},
				data : [
					{name:'other', value:220, itemStyle : labelBottom},
					{name:'工作频率', value:54,itemStyle : labelTop}
				]
			}
		],
		color:color
	};
	//饼图2
	option22={
		series:[
			{
				type : 'pie',
				center : center,
				radius : radius,
				hoverAnimation:hoverAnimation,
				x: '0%', // for funnel
				itemStyle : {
					normal:{
						label:{
							formatter:function (params){
								return params.value + 'V';
								var ss='<span>'+params+'</span>';
							},
							textStyle:{
								baseline:'top',
								color:'#1C0C02',
								fontFamily:'微软雅黑',
								fontWeight:'900',
								fontSize:'24'
							}
						}
					}
				},
				data : [
					{name:'other', value:380, itemStyle : labelBottom},
					{name:'输出电压', value:54,itemStyle : labelTop}
				]
			}
		],
		color:color
	};
	//饼图3
	option23={
		series:[
			{
				type : 'pie',
				center : center,
				radius : radius,
				hoverAnimation:hoverAnimation,
				x: '0%', // for funnel
				itemStyle : {
					normal:{
						label:{
							formatter:function (params){
								return params.value + 'A';
								var ss='<span>'+params+'</span>';
							},
							textStyle:{
								baseline:'top',
								color:'#1C0C02',
								fontFamily:'微软雅黑',
								fontWeight:'900',
								fontSize:'24'
							}
						}
					}
				},
				data : [
					{name:'other', value:20, itemStyle : labelBottom},
					{name:'输出电流', value:54,itemStyle : labelTop}
				]
			}
		],
		color:color
	};
	//饼图4
	option24={
		series:[
			{
				type : 'pie',
				center : center,
				radius : radius,
				hoverAnimation:hoverAnimation,
				x: '0%', // for funnel
				itemStyle : {
					normal:{
						label:{
							formatter:function (params){
								return params.value + 'HZ';
								var ss='<span>'+params+'</span>';
							},
							textStyle:{
								baseline:'top',
								color:'#1C0C02',
								fontFamily:'微软雅黑',
								fontWeight:'900',
								fontSize:'24'
							}
						}
					}
				},
				data : [
					{name:'other', value:220, itemStyle : labelBottom},
					{name:'运行速度', value:54,itemStyle : labelTop}
				]
			}
		],
		color:color
	};
	//饼图5
	option25={
		series:[
			{
				type : 'pie',
				center : center,
				radius : radius,
				hoverAnimation:hoverAnimation,
				x: '0%', // for funnel
				itemStyle : {
					normal:{
						label:{
							formatter:function (params){
								return params.value + 'W';
								var ss='<span>'+params+'</span>';
							},
							textStyle:{
								baseline:'top',
								color:'#1C0C02',
								fontFamily:'微软雅黑',
								fontWeight:'900',
								fontSize:'24'
							}
						}
					}
				},
				data : [
					{name:'other', value:7600, itemStyle : labelBottom},
					{name:'输出功率', value:54,itemStyle : labelTop}
				]
			}
		],
		color:color
	};
	// 使用刚指定的配置项和数据显示图表。
	myChart21.setOption(option21);
	myChart22.setOption(option22);
	myChart23.setOption(option23);
	myChart24.setOption(option24);
	myChart25.setOption(option25);

	//折线图
	var myChart31 = echarts.init(document.getElementById('cf-four-1'));
	option31 = {
			/*title: {
				text: '堆叠区域图'
			},*/
			tooltip : {
				trigger: 'axis',
				backgroundColor:'rgba(0,0,0,0)',
			   // borderColor:'#eaeaea',
				borderRadius:'4',
				//borderWidth:'1',
				formatter:'<div style="background:#fff;color:#787878;padding:10px;width:150px;-webkit-box-shadow:3px 3px 8px 3px #efefef;-moz-box-shadow:3px 3px 8px 3px #efefef;box-shadow:3px 3px 8px 3px #efefef;">{b}<br /><span style="color:#1c0c02;font-size:26px;font-weight:bold;">{c}</span><span style="color:#1c0c02;">&nbsp;次</span></div>',
				//textStyle:'#787878',
				textStyle:{ 
					color:'#787878' 
				},
				axisPointer:{
					type: 'line',
					lineStyle: {
						color: '#b1b1b1',
						width: 1,
						type: 'solid'
					},
					crossStyle: {
						color: '#1e90ff',
						width: 0,
						type: 'dotted'
					},
					shadowStyle: {
						color: 'red',
						width: '5',
						type: 'default',
						shadowColor:'rgba(0,0,0,1)',
						shadowBlur:'50',
						shadowOffsetX:'10',
						shadowOffsetY:'10',
					}
				}
			},
			/*legend: {
				data:['邮件营销']
			},*/
		  /*  toolbox: {
				feature: {
					saveAsImage: {}
				}
			},*/
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis : [
				{
					type : 'category',
					boundaryGap:false,
					//offset:'-50',
					axisTick:'null',
					axisLine:{
						lineStyle:{
							color: '#e8e4e1',
							width: 1,
							type: 'solid'
						},
					},
					axisLabel:{
						textStyle:{
							color: '#b9b6b4',
							fontSize:12,
							fontFamily:'微软雅黑'
						}
					},
					splitLine:{//去掉x轴主线
						lineStyle:{
							color: '#fff',
							type: 'solid'
						},
					},
					nameTextStyle:{
						color: '#facc2e',
						//font
					},
					boundaryGap : false,
					data : ['启动升降梯系统','上行操作杆拨动','下行操作杆拨动','按内/外急停按键']
				}
			],
			yAxis : [
				{
					type : 'value',
					axisLine:{//去掉y轴主线
						lineStyle:{
							color:'#fff'
						}
					},
					min:0,
					max:25,
					splitNumber:5,
					splitLine:{
						lineStyle:{
							color: ['#e8e4e1'],
							type: 'solid'
						},
					},
					axisLabel:{
						textStyle:{
							color: '#b9b6b4',
							fontSize:14,
							fontFamily:'微软雅黑'
						}
					},
				}
			],
			series : [
				{
					
					name:'邮件营销',
					type:'line',
					stack: '总量',
					areaStyle: {normal: {}},
					itemStyle: {normal: {areaStyle: {type: 'default',color:'rgba(250,204,46,0.1)'}}},
					data:[1, 16, 19, 24]
				}
			],
			color:['#facc2e']
		};
	// 使用刚指定的配置项和数据显示图表。
	myChart31.setOption(option31);

});