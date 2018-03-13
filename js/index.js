$(function(){
	//顶部效果	
	//1.地址效果	
		$.getJSON('json/address.json',function(data){   //引入json数据
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
	
		
		
//轮播图
		$box = $('#turn');
		var $oUl = $('#pic');
		var $lis = $('#pic li');
		var $btn = $('.dot');
		var $btnLi = $('.dot li');
		var w = $box.width();
		var len = $lis.length;
	
	//获取li，并设置其宽度和屏幕相等
		for(var i=0; i<$lis.length; i++){
			$lis[i].style.cssText = 'width:'+w+'px;';
		}
	
	//复制第一张
		var $img = $lis.eq(0).clone().appendTo($oUl); 
	
	//自动轮播
		var timer;
		var num = 0;
		var flag = true;
		timer ? clearInterval(timer) : null;
		timer = setInterval(turn,2500);
	
	//鼠标滑上停止动画，离开继续
		$box.hover(function(){ 
				clearInterval(timer);
			},function(){
				timer = setInterval(turn,2500);
		})
	
	//点击按钮切换图片
		$btnLi.click(function(){
			num = $(this).index();		
			change();
		})
		
		function change(){
			flag = false;
			$oUl.stop(true).animate({"left":-w*num},1000,function(){
				flag = true;
				if(num == len){
				num = 0;
				$oUl.css('left','0px');
				}
			});		
			$btnLi.eq(num%len).addClass('active').siblings().removeClass('active');
		}
		
		function turn(){
			num++;
			if(num == len+1){
				num = 1;
				$oUl.css('left',0);
			}
			change();
		}
	
	})


//放大效果
		$(function(){
			$('.clear-list dl a').hover(function(){
				$(this).children().stop(true).animate({width:268,height:268,marginLeft:-12,marginTop:-12},200);
			},function(){
				$(this).children().stop(true).animate({width:'100%',height:'100%',marginLeft:0,marginTop:0},200);
		})
			
})
		
if(document.cookie){
	var cook = cookie('register');
	
//隐藏第一第二个，显示第三第四个
	$('.nav .first a').eq(0).hide();
	$('.nav .first a').eq(1).hide();
	$('.nav .first a').eq(2).show().html('[ '+cook.name+' ] ,');
	$('.nav .first a').eq(3).show();
	$('.nav .first a').eq(3).click(function(){
		$('.nav .first a').eq(0).show();
		$('.nav .first a').eq(1).show();
		$('.nav .first a').eq(2).hide();
		$('.nav .first a').eq(3).hide();
	})
	
	
	//购物车部分点击显示
	$('.car').click(function(){
		$('.no').toggle();
	})
}else{
	//购物车部分点击显示
	$('.car').click(function(){
		$('.car .no').toggle();
	})
}
























