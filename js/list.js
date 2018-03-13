$(function(){
//水果筛选栏	
	$.getJSON('../json/fruit-choose.json',function(data){
		for(var i=0; i<data.length; i++){
			$('.fruit-type ul li').eq(i).find('h5').html(data[i].name);			
			for(var j=0;j<data[i].list.length;j++){
				var type = '<a href="#">'+data[i].list[j]+'</a>';    //创建a标签，并把它追加到div中
				$('.fruit-type ul li').eq(i).find('div').append(type);
			}
		}
	})

//水果列表
	$.getJSON('../json/fruit-list.json',function(datas){//console.log(datas.length)
		var num =40;   //每页个数
		var page = Math.ceil(datas.length/num);   //确定页数
		for(var m=0; m<num; m++){
			var lis = '<li></li>';     //创建li标签
			var dl = '<a href="'+datas[m].href+'"><img src="'+datas[m].images+'"/><dt>'+datas[m].name+'<span>'+datas[m].price+'</span></dt><dd>'+datas[m].standard+'</dd><div></div></a>'; 
			$('.fruit-main').append(lis);
			$('.fruit-main li').eq(m).append(dl);
			if(datas[m].give){
				var box = '<span class="give">'+datas[m].give+'</span>';
				$('.fruit-main li').eq(m).append(box);
			}
		}
		//创建分页按钮
		for(var n=0; n<page; n++){
			var pageList = '<a href="javascript:;">'+(n+1)+'</a>';
			$('.tail .page').append(pageList);
			$('.tail .page').find('a').eq(0).addClass('selected');
			
			//点击分页，跳到下一页
			$('.tail .page a').click(function(){console.log($(this).index())
				$('.fruit-main').html('');
				$(document).scrollTop(0);  
				$(this).addClass('selected').siblings().removeClass('selected');
				for (var x=num*$(this).index(); x<num*(1+$(this).index()); x++){  //num+(num*this.index)
					if(datas[x]){
						var lis = '<li></li>';     //创建li标签
						var dl = '<dl><img src="'+datas[x].images+'"/><dt>'+datas[x].name+'<span>'+datas[x].price+'</span></dt><dd>'+datas[x].standard+'</dd><div></div></dl>';                               //创建li里的内容<dl><img><dt><span></span></dt><dd></dd></dl>
						$('.fruit-main').append(lis);
						$('.fruit-main li').eq(x%num).append(dl);     //x%num对应每页li的下标
						if(datas[x].give){
							var box = '<span class="give">'+datas[x].give+'</span>';
							$('.fruit-main li').eq(x%num).append(box);
						}
					}
				}
				if(n==0){
					if($(this).index()==0){
						$('.page-prev a').html('');
					}
				}else{
					$('.page-prev a').html('上一页');
				}
				if($(this).index()==3){
					$('.page-next a').html('');
				}else{
					$('.page-next a').html('下一页');
				}
			})			
		}
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
})
