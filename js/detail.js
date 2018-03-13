$(function(){
	
//tab切换加轮播
	//把左侧li里的小图片赋给右侧的li里
		$('#box .change li').each(function(){
			for(var i=0; i<$('#box .block li').length; i++){
				$('#box .change li').eq(i).html($('#box .block li').eq(i).find('img').clone());
			}			
		})
	
	//自动轮播
		var timer;
		var n = 0;
		var flag = true;
		var $lis = $('#box .block li');
		var len = $('#box .block li').length;
		timer ? clearInterval(timer) : null;
		timer = setInterval(playauto,2500);
		
		//鼠标滑上停止动画，离开继续
		$('#box').hover(function(){ 
			clearInterval(timer);
		},function(){
			timer = setInterval(playauto,2500);
		})

	//鼠标滑上左侧li上，对应的蒙板透明度变为0.2，且右侧显示对应的图片
		$('#box .block li').mouseenter(function(){
			n = $(this).index();       //将滑上去的li的对应下标赋给n
			change();
		})
		
		function change(){
			if(flag){
				$('#box .block li').eq(n).find('span').css('display','block').end().siblings().find('span').css( 'display','none');
				$('#box .change li').eq(n).addClass('one').siblings().removeClass('one');
			}
		}
		
		function playauto(){
			n++;
			if(n == len){
				n=0;
				$lis.find('span').css('display','block')
			}
			change();
		}
	

//添加购物数量加减
		$('.add span').eq(0).click(function(){
			var num = parseInt($('.add input').val());
			if(num==1){
				$('#ipt').val(1);
			}else{
				num -=1;
			}
			$('.add input').val(num);
			$('.addition').find('dd').eq(1).html('&times;'+num);
		})
		$('.add span').eq(1).click(function(){
			var num = parseInt($('.add input').val());
			num +=1;
			$('.add input').val(num);
			$('.addition').find('dd').eq(1).html('&times;'+num);
		})

//收货地址选择
	//鼠标滑上地址选择显示
$('.Address').mouseover(function(){
	if($('.pro .name').html()==''){
		$.getJSON('../json/address.json',function(data){
			var result = data;
			for(var i=0; i<result.length; i++){			
				var oli = '<li><a href="javascript:;">'+result[i].name+'</a></li>';	      //遍历json并创建name对应的li标签	                                              
				var icity = '<ul class="pro-city"></ul>';            //创建新的ul并放入pro中
				$('.name').append(oli);	    								
				$('.pro').append(icity);
			}
			$('.pro em').click(function(){
				$('.pro').hide();
			})
			$('.name li a').click(function(){
				var index = $(this).parent('li').index();            //获取当前点击元素的索引值	
//				$(this).attr('href','detail.html');
				if(result[index].citys){ 
					//在第一个p中显示所点的省市，且切换出对应下边的城市
					$('.choose p').eq(0).html($(this).text());  
					$('.choose p').eq(0).addClass('pro-select').siblings().removeClass('choose-city');
					if($('.pro-city').eq(index).html()==''){      //ul里若为空，创建列表，否则不创建。防止点击多次，创建多次
						for(var j=0; j<result[index].citys.length; j++){      //遍历json中citys并创建citys对应的li标签
							var Cname = '<li class="cend"><a href="javascript:;">'+ result[index].citys[j] +'</a></li>';	
							$('.pro-city').eq(index).append(Cname);
						}
					}
					//两个省市和城市进行tab切换
					$('.choose p').eq(0).click(function(){
						$('.choose p').eq(0).removeClass('pro-select').siblings().not('em').addClass('pro-select');
						$('.pro ul').eq(0).addClass('name').siblings().removeClass('name');
					})
					$('.choose p').eq(1).click(function(){
						$('.choose p').eq(1).removeClass('pro-select').siblings().not('em').addClass('pro-select');
						$('.choose p').eq(0).html($(this).text());  
					$('.choose p').eq(0).addClass('pro-select').siblings().removeClass('choose-city');
					if($('.pro-city').eq(index).html()==''){      //ul里若为空，创建列表，否则不创建。防止点击多次，创建多次
						for(var j=0; j<result[index].citys.length; j++){      //遍历json中citys并创建citys对应的li标签
							var Cname = '<li class="cend"><a href="javascript:;">'+ result[index].citys[j] +'</a></li>';	
							$('.pro-city').eq(index).append(Cname);
						}
					}
					})						
					$('.pro-city li a').click(function(){
						$('.add-city').html($(this).text());         //在地址栏中显示所点的省市
						$('.pro').hide();
					})
				}else{
					$('.add-city').html($(this).text());	        //在地址栏中显示所点的省市
					$('.pro').hide();
				}												
				$('.pro-city').eq(index).addClass('name').siblings().removeClass('name');
			})
		})
	}
	$('.pro').show();
});

//评论区吸顶--当滚动条的高度大于top值时，定位吸顶
		var top = $('.left-up').offset().top;           //评论区头部距document的距离
		$(document).scroll(function(){  
			$(this).scrollTop() >= top ?  $('.left-up').addClass('attr') : $('.left-up').removeClass('attr');     
		})


//顾客评论区---点击切换
		$('.brief ul li').eq(0).click(function(){
			$('.pic').show();
			$('.recom').hide();
			$(this).addClass('spjj').siblings().removeClass('spjj');
		})
		$('.brief ul li').eq(1).click(function(){
			$('.pic').hide();
			$('.recom').show();
			$(this).addClass('spjj').siblings().removeClass('spjj');
		})
	
//加入购物车-----取box中的第一张图片,price中的名字、价格、数量加到dl中
		$('.addition').click(function(){		
			$(this).find('dt').html($('.goods h3').text());
			//判断图片是否已经加入，为空时加入
			if($(this).find('.img').html()==''){
				var img = $('#box .block li').eq(0).find('img').clone();
				$(this).find('.img').html(img);     
			}		
			$(this).find('dd').eq(0).html($('.price div').eq(0).find('span').html()+'/'+$('.price div').eq(1).find('span').html());
			$(this).find('dd').eq(1).html('&times;'+$('.add').find('input').val());
			$(this).find('dl').toggle();
			$('#true').click(function(){
				$(this).parent().find('dl').hide();   //点击确认键，dl收起
			})
		})
	})


//点击加入购物车并存入cookie
var n=0;
$('.addsc').click(function(){
	n++;
	var msg='goodid#'+$('#goodid').text()+n+'|title#'+$('.names h3').text()+'|imgsrc#'+$('.block li').eq(0).children('img').attr('src')+'|price#'+$('.gyj').find('m').text()+'|standard#'+$('.standard').find('span').text()+'|num#'+$('#ipt').val();
	cookie($('#goodid').text()+n,msg,7);
	alert('添加购物车成功！')
	$('.car .numb').html($('.add input').val());
	$('.car').click(function(){
		$('.have').toggle();
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
}	

