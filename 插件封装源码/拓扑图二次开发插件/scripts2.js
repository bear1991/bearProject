'use strict';

(function($){
  $(function() {
	var listNum = 4;   // 设置假数据序列
	
	var colorList = ['middle-level','product-dept','rd-dept','pipeline1','frontend1'],    // 样式颜色 
		levelNum = 1;    // 层级


	// 初始数据
    var datascource = {
		"name":"sadas",
	    "title":"187",
	    "orderid":1,
	    "children":[
	        {
	            "orderid":2,
	            "name":"测试会员",
	            "title":"18745616545"
	        },
	        {
	            "orderid":3,
	            "name":"测试会员",
	            "title":"18745616545"
	        },
	        {
	            "orderid":4,
	            "name":"测试会员",
	            "title":"18525251512"
	        }
	    ],
	};

	// 初始格式化数据
	datascource.name = datascource.name + "<span>" + datascource.orderid + "</span><i style='display:none;'>" + levelNum + "</i>";   // 新增i标签
	datascource.level = levelNum;    // 第一层级

	if(datascource.children){
		datascource.children.forEach(function(item,index){
			item.name = item.name + "<span>" + item.orderid + "</span><i style='display:none;'>" + (levelNum+1) + "</i>";     // 新增i标签
			item.className = colorList[(levelNum-1)%5];    // 第二层级样式
			item.level = levelNum+1;    // 第二层级
		});
		levelNum++;
	}
	// console.log(datascource);
	
	// 初始化显示
    $('#chart-container').orgchart({
      'data' : datascource,
      'nodeContent': 'title'
    });

	
	show();
	function show(){
		var oNode = document.querySelectorAll('.node');
		oNode.forEach((item,index) => {
			item.querySelector('.content').addEventListener('click',function(){
				var oBottomEdge = item.querySelector('.bottomEdge');
				if(!oBottomEdge){    // 限制只有点击最底层时才会加载新数据
					//console.log(item);
					var orderid = item.querySelector('span').innerHTML;    // 获取当前点击对应的orderid
					var itemLevel = Number(item.querySelector('i').innerHTML);    // 获取当前点击项所在层级(新增)
					// console.log(orderid);
					
					// 根据orderid请求获取的新数据
					//var newData = [];
					
					var newData = [
				        {
				            "orderid":listNum+1,
				            "name":"测试会员",
				            "title":"18745616545"
				        },
				        {
				            "orderid":listNum+2,
				            "name":"测试会员",
				            "title":"18745616545"
				        }
				    ];
					listNum += 3;
					
					// 将新数据保存到datascource变量中对应位置
					if(newData.length){
						// console.log(colorList,levelNum);
						// console.log(itemLevel,levelNum);

						// 新增改动
						if(itemLevel < levelNum){   
							newData.forEach(function(item,index){
								// console.log(item);
								item.name = item.name + "<span>" + item.orderid + "</span><i style='display:none;'>" + (itemLevel+1) + "</i>";    // 新增i标签
								item.className = colorList[(itemLevel-1)%5];    // 第levelNum+1层级样式
								item.level = itemLevel+1;    // 第levelNum+1层级
							});
						}else{
							newData.forEach(function(item,index){
								// console.log(item);
								item.name = item.name + "<span>" + item.orderid + "</span><i style='display:none;'>" + (levelNum+1) + "</i>";    // 新增i标签
								item.className = colorList[(levelNum-1)%5];    // 第levelNum+1层级样式
								item.level = levelNum+1;    // 第levelNum+1层级
							});
							levelNum++;
						}
						// console.log(newData);

						datascource = search(datascource,orderid,newData);
						// console.log(datascource);
					}else{
						console.log('没有新数据');
					}

					// 重新初始化显示
					$('#chart-container').empty();
					$('#chart-container').orgchart({
					  'data' : datascource,
					  'nodeContent': 'title'
					});
					show();

				}
			});
		});
	}


	// 遍历添加新数据
	function search(datascource,orderid,newData){
		if(datascource.orderid == orderid){
			datascource.children = newData;
		}else{
			if(datascource.children){
				datascource.children.forEach(function(item,index){
					search(item,orderid,newData);
				});
			}
		}
		return datascource
	}


  });
})(jQuery);