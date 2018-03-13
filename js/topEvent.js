

$(function(){
	
		
	//3.果园公告效果
		$('.gygg').hover(function(){
			$(this).css('background','#fff');
			$('.more').css('display','block');
		},function(){
			$(this).css('background','#eee');
			$('.more').css('display','none');
		})
	
	//4.手机果园效果
		$('.pho').hover(function(){
			$(this).css('background','#fff');
			$('.download').css('display','block');
		},function(){
			$(this).css('background','#eee');
			$('.download').css('display','none');
		})

//底部---一键置顶
		$('.fix a').eq(2).click(function(){
			$('body,html').stop(true).animate({'scrollTop':0},500);
		})
})




















