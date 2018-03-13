$(function(){
 
 var arr=[];
//正则规范
	var tel = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
	var pword = /^\w{6,12}$/;

	//聚焦，失去焦点的设置
	$('.main ul li input').focus(function(){
		$(this).css('border','1px solid #64A131');
		$(this).siblings('#wrong').css('display','none');	
		$(this).siblings('strong').css('display','none');	
		$(this).val('');
	})
	$('.main ul li input').blur(function(){
		$(this).css('border','1px solid #ccc');
	})
	
//手机号部分
	$('.main #phone input').blur(function(){
		if($(this).val()!=''){
			if(tel.test($('#phone #txt').val())){
				$('.main #phone strong').css('display','block');
				arr[0]=1;
			}else{
				$('.main #phone #wrong').css('display','block');
				$(this).css('border','1px solid #F53030');
			}
		}
	})
	
//密码、确认密码部分
	$('.main #psword input').blur(function(){
		if($(this).val()!=''){
			if(pword.test($('#psword #psw').val())){
				$('.main #psword strong').css('display','block');
				arr[1]=1;
			}else{
				$('.main #psword #wrong').css('display','block');
				$(this).css('border','1px solid #F53030');
			}
		}
	})
	$('.main #re input').blur(function(){	
		if($(this).val()!=''){
			if($('#psword #psw').val()!='' && $(this).val()==$('#psword #psw').val()){
				$('.main #re strong').css('display','block');
				arr[2]=1
			}else{
				$('.main #re #wrong').css('display','block');
				$(this).css('border','1px solid #F53030');
			}
		}
	})

//验证码部分
	//创建初始验证码
		var str = '';
		for (var i=0; i<4; i++){            //长度为4
			var num = Math.floor(Math.random()*75+48);   //生成一个48到122之间的一个随机数
			if(num <= 57 || (num >= 65 && num <= 90) || num >=97){ 
				var code = String.fromCharCode(num);     //将对应的ACSII码转换成字符
				str += code;		
			}else{
				i--;
			}   
		}
		$('#yzm em').html(str);   //将str里的内容放到em中
	//点击时刷新验证码
		$('#yzm img').click(function(){
			var str = '';
			for (var i=0; i<4; i++){  //长度为4
				var num = Math.floor(Math.random()*(122-48+1)+48);   //生成一个48到122之间的一个随机数
				if (num <= 57 || (num >= 65 && num <= 90) || num >=97){
					var code = String.fromCharCode(num);
					str += code;		
				}else{
					i--;
				}   
			}
			$('#yzm em').html(str);   //将str里的内容放到em中
		 })
		
	//失去焦点后判断
	$('.main #yzm input').blur(function(){
		if($(this).val()!=''){
			if($(this).val()==$('#yzm em').html()){
				$('.main #yzm strong').css('display','block');
				arr[3]=1;
			}else{
				$('.main #yzm #wrong').css('display','block');
				$(this).css('border','1px solid #F53030');
			}
		}
	})
	
	
//注册按钮提交

	$('.main ul li #sub').click(function(){
		if($('.main ul li input').val()==''){
			$('.main ul li #wrong').css('display','block');
			$('.main ul li input').css('border','1px solid #F53030');
		}else{
			var n=0;
			for(var i=0;i<arr.length;i++){
				if(arr[i]==1){
					n++;
				}
			}
			if(n==4){
				var msg='name#'+$('#txt').val()+'|psw#'+$('#psw').val();
				cookie('register',msg,7)
				alert('注册成功,可直接登录');
			}else{
				alert('请正确填写信息');
			}			
		}
	})
	
	
//登录按钮提交
	$('.main ul li #res').click(function(){
		if($('.main ul li input').val()==''){
			$('.main ul li #wrong').css('display','block');
			$('.main ul li input').css('border','1px solid #F53030');
		}
		else{
			var n=0;
			for(var i=0;i<arr.length;i++){
				if(arr[i]==1){
					n++;
				}
			}
			if(n==2){
				var lo=cookie('register');
				console.log((lo))
				if($('#txt').val()==lo.name&&$('#psw').val()==lo.psw){
					alert('登录成功');
				}
			}else{
				alert('请正确填写信息');
			}	
		}
	})	
	
	
	
	
	
})
