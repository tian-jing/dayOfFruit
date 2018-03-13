/*
//获取url
var href=window.location.href;
href=href.substring(href.lastIndexOf('/'));
//cookie的拼接
var msg='goodid#'+$('#good_Id').text()+'|goodsrc#'+href+'|goodtext#'+$('#good_text').text()+'|goodprice#'+$('#good_price b').text()+'|goodaccount#'+$('#good_account').text()+'|goodactivity'+$('#activity').text()+'|goodimg#'+$('.select_active .good_img').attr('src')+'|goodcolor#'+$('.select_active .good_color').text()+'|goodsize#'+$('.sel_size .select_active span').text()+'|goodnum#'+$('#good_num').val();
cookie($('#good_Id').text(),msg,7)
*/
function cookie(name, value, end_day) {
    //判断是否为添加和删除cookie
    if (name && value != undefined) { //判断name和value是否有值，执行添加和删除事件。
        //设置时间，如果end_day为负值则为删除
        var date = new Date();
        date.setDate(date.getDate() + end_day * 1);
        document.cookie = name + "=" + escape(value) + ";path=/" + (end_day ? ";expires=" + date.toString() : "");
        //输入参数时获取cookie，否则返回cookie对象
    } else if (name || arguments.length == 0) {
        if (document.cookie) {
            var cook = document.cookie;
            var arr1 = cook.split('; ');
            var arr2 = [];
            for (var i = 0; i < arr1.length; i++) {
                arr2.push(arr1[i].split('='));
            }
            //传name则返回cookie中是那个值的对象
            if (name) {
                for (var j = 0; j < arr2.length; j++) {
                    if (name == arr2[j][0]) {
                        var arr3 = unescape(arr2[j][1]).split('|');
                        var arr4 = []
                        //arr4:这个name对应的数组
                        for (var i = 0; i < arr3.length; i++) {
                            arr4.push(arr3[i].split('#'));
                        };
                        //obj:这个name对应的对象
                        var obj = {};
                        for (var i = 0; i < arr4.length; i++) {
                            obj[arr4[i][0]] = arr4[i][1];
                        };
                        return obj;
                    }
                }
                //不传则返回数组对象
            } else {
                var obj = {};
                for (var j = 0; j < arr2.length; j++) {
                    var arr3 = unescape(arr2[j][1]).split('|');
                    var arr4 = []
                    var obj2={};
                    for (var i = 0; i < arr3.length; i++) {
                        arr4.push(arr3[i].split('#'));
                    };
                    for (var i = 0; i < arr4.length; i++) {
                        obj2[arr4[i][0]] = arr4[i][1];
                    }
                    arr2[j][1]=obj2
                    obj[arr2[j][0]]=obj2;
                }
                return arr2;
            }
        } else {
            return alert('cookie是空的');
        }
    }
}
