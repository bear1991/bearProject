'use strict';

(function($){
  $(function() {
	
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
	            "name":"测试会员1",
	            "title":"18525251512"
	        }
	    ],
	};

	// 初始格式化数据
	datascource.name = datascource.name + "<span style='display:none'>" + datascource.orderid + "</span>";
	if(datascource.children){
		datascource.children.forEach(function(item,index){
			item.name = item.name + "<span style='display:none'>" + item.orderid + "</span>";
		});
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
					// console.log(orderid);
					
					// 根据orderid请求获取的新数据
					//var newData = [];
					var newData = [
				        {
				            "orderid":5,
				            "name":"测试会员22",
				            "title":"18745616545"
				        },
				        {
				            "orderid":6,
				            "name":"测试会员33",
				            "title":"18745616545"
				        }
				    ]

					// 将新数据保存到datascource变量中对应位置
					if(newData.length){
						newData.forEach(function(item,index){
							// console.log(item);
							item.name = item.name + "<span style='display:none'>" + item.orderid + "</span>";
						});
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