$(function(){
	
	//顶部效果	
	//1.地址效果	
		$.getJSON('../json/address.json',function(data){   //引入json数据
			var pro = data;                           
			for(var i=0; i<pro.length; i++){			
				var lis = '<li><a href="#">'+pro[i].name+'</a></li>';	      //遍历json并创建name对应的li标签
				if(pro[i].citys){		                                      //判断json数据里是否有citys数据
					var icon = '<i class="iconfont">&#xe60b;</i>';            //创建右箭头并放入li中
					lis = '<li class="click"><a href="#">'+pro[i].name+'</a>'+icon+'<ul class="ball"></ul></li>';								
				}
				$('.citys').append(lis);
			}
		//点击城市，地址栏显示所点城市
			$('.add .citys li a').click(function(){
				$('.address .selt').html($(this).html());
			})
			$('.click').click(function(){				
				$(this).find('i').toggleClass('rotate').end().siblings().find('i').removeClass('rotate');  //点击元素右箭头旋转，其他元素右箭头归回原状态				
				$(this).find('.end').remove();             //每次点击清空以前的div
				var index = $(this).index();               //获取当前点击元素的索引值			
				for(var j=0; j<pro[index].citys.length; j++){				//遍历json中citys并创建citys对应的div标签				
					var cName = '<li class="end">'+ pro[index].citys[j] +'</li>';	
					$('.click .ball').append(cName);
					$(this).siblings().find('.end').remove();     //追加到对应的li里后移除掉相应的兄弟节点li里的div
				}
				$(this).find('.ball').slideToggle(500).end().siblings().find('.ball').hide(500);  //创建好内容后，所点元素展开收起进行切换，其他元素里的ball隐藏
			//点击城市，地址栏显示所点城市
				$('.click .ball li').click(function(){
					$('.address .selt').html($(this).html());
				})
			})
		})
		
		
	//2.鼠标滑上去，地址栏显示，移开消失
		$('.address').hover(function(){
			$(this).css('background','#fff');
			$('.add').css('display','block');		
		},function(){
			$(this).css('background','#eee');
			$('.add').css('display','none');
		})
	
	//3.点击地址显示对应地址
		//点热门城市
		$('.add .city a').click(function(){
			$('.address .selt').html($(this).html());
		})
})

















