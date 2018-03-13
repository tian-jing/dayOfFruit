
if(document.cookie){     //判断是否存入cookie
		
	//有商品加入购物车时，动态创建
	var html=''
	var coo=cookie();
	for(var i=0;i<coo.length;i++){
		if(coo[i][0]!='register'){
			var co=coo[i][1];
			var account = (co.price*co.num).toFixed(2);
			html+='<ul class="type-detail" name="'+co.goodid+'"><div><input type="checkbox" id="ok"/></div><li class="li_one"><dl><a href="#"><img src="../images/sl.jpg"/></a><dt>'+co.title+'</dt></dl></li><li class="li_two">'+co.standard+'</li><li class="li_three">&yen;<m>'+co.price+'</m></li><li class="li_four"><span onselectstart="return false" class="little">-</span><input type="text" id="" value="'+co.num+'" /><span onselectstart="return false" class="more">+</span></li><li class="li_five">&yen;<m>'+account+'</m></li><li class="li_six">删除</li></ul>';

		}	
		$('.good_con').html(html);
	}
	
	//点击全选及单个按钮
	$('#choose').click(function(){
		for(var a=0; a<$('.good_con ul').length;a++){
			$('.good_con ul').eq(a).find('#ok').attr('checked','checked');
		}
		
	})
	
//添加购物数量加减		
	//点击加减键，改变相应的数量值
		$('.good_con ul .little').click(function(){
			var num = $(this).siblings('input').val();			
			if(num==1){
				$(this).siblings('input').val(1);
			}else{
				num --;
			}
			$(this).siblings('input').val(num);     //将num值赋给input
			var price = $(this).parent().siblings('.li_three').find('m').html();  //获取当前点击事件的单价
			var all = num*price;                     //计算单价乘以数量的总价			
			$(this).parent().siblings('.li_five').find('m').html(all.toFixed(2));   //将总价赋给相应的li
			
			if($(this).parents('.type-detail').siblings().length>0){
				var other = parseInt($(this).parents('ul').siblings().find('input').val());   //获取其父亲的父亲ul的其他ul里的总数量					
				var priceAll = parseFloat($(this).parents('ul').siblings().find('.li_five m').html());  //获取其父亲的父亲ul的其他ul里的总价	
				
				$('.js p m').html(parseInt($(this).siblings('input').val())+other);         //结算部分取到购物车里的相应总数量				
				var endMoney = parseInt($(this).parent().siblings('.li_five').find('m').html())+priceAll;
				$('.js .money').html('&yen;'+endMoney.toFixed(2));   //将价格的精确度强制到小数点后2位
			}else{
				$('.js p m').html(parseInt($(this).siblings('input').val()));   
				var endMoney = parseFloat($(this).parent().siblings('.li_five').find('m').html());
				$('.js .money').html('&yen;'+endMoney.toFixed(2));   //将价格的精确度强制到小数点后2位
			}
		})
		
		//加号
		$('.good_con ul .more').click(function(){
			var num = $(this).siblings('input').val();				
			num ++;
			$(this).siblings('input').val(num);     //将num值赋给input
			var price = $(this).parent().siblings('.li_three').find('m').html();  //获取当前点击事件的单价
			var all = num*price;                     //计算单价乘以数量的总价			
			$(this).parent().siblings('.li_five').find('m').html(all.toFixed(2));   //将总价赋给相应的li
			
			if($(this).parents('.type-detail').siblings().length>0){
				var other = parseInt($(this).parents('ul').siblings().find('input').val());   //获取其父亲的父亲ul的其他ul里的总数量					
				var priceAll = parseInt($(this).parents('ul').siblings().find('.li_five m').html());  //获取其父亲的父亲ul的其他ul里的总价	
				
				$('.js p m').html(parseInt($(this).siblings('input').val())+other);         //结算部分取到购物车里的相应总数量				
				var endMoney = parseInt($(this).parent().siblings('.li_five').find('m').html())+priceAll;
				$('.js .money').html('&yen;'+endMoney.toFixed(2));   //将价格的精确度强制到小数点后2位
			}else{
				$('.js p m').html(parseInt($(this).siblings('input').val()));   
				var endMoney = parseFloat($(this).parent().siblings('.li_five').find('m').html());
				$('.js .money').html('&yen;'+endMoney.toFixed(2));   //将价格的精确度强制到小数点后2位
			}
		})
	
		
	//点击删除按钮，清除商品cookie
		if($('.good_con').find('ul').length>1){	
			$('.good_con ul .li_six').click(function(){	
				cookie($(this).parent('ul').attr('name'),' ',-1);
				$(this).parent('ul').remove();	
				window.location.reload()
			})
		}			
		if($('.good_con').find('ul').length==1){	
			$('.good_con ul .li_six').click(function(){	
				cookie($(this).parent('ul').attr('name'),' ',-1);
				$(this).parent('ul').remove();
				empty();
			})
		}
		
	var All =0;
	var N=0;
	for(var x=0; x<$('.good_con ul').length;x++){		
		var money = parseFloat($('.good_con ul').eq(x).find('.li_five m').html());
		var num = parseInt($('.good_con ul').eq(x).find('.li_four input').val());
		N += num;
		All +=  money;     //计算多个商品的总价格	
	}
	$('.js p m').html(N);                  //结算部分取到购物车里的相应总数量
	$('.js .money').html('&yen;'+All.toFixed(2));   //将价格的精确度强制到小数点后2位	
	
									
	
	
	
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
	
}else{		
	empty();
}


function empty(){
	var a = '<a href="../index.html">去看看吧</a>'
	$('.good_con').html('亲，还没有商品加入购物车哦，赶快'+a);
	$('.good_con').css({'font-size': '18px','line-height': '100px','color':'#999'});
	$('.good_con a').css({'font-size': '18px','color': '#64A131','text-decoration':'underline'})
	$('.js m').html(0);
	$('.js .money').html('&yen;0.00');
}


	












