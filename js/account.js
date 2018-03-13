
$(function(){
	
	$('.pay div').eq(0).click(function(){
		$(this).addClass('paying').siblings().removeClass('paying');	
	})
	//点击线下支付时，展开选项，点击相应的li里的内容，改变div里的文本，并收起选项
	$('.pay .zf').click(function(){
		$(this).addClass('paying').siblings().removeClass('paying');	
		$('.pay-type').slideDown(500);		
		$('.pay-type li').mouseover(function(){
		$(this).addClass('paying').siblings().removeClass('paying');
		$(this).click(function(event){			
			$('.pay .zf m').html($(this).text());	
			$('.pay-type').slideUp(500);
			return false;     //阻止事件冒泡
		})
		
	})	
	})
	
	
	
	
	
	
	
	
	
	
	
})










































