## 页面发布地址：
http://vissaan.com/mystudy/waterfall/waterfall.html

## 概述：
html+css+jquery实现网页瀑布流样式，定义waterfall()函数设计加载图片的位置；checkScrollSlide()函数监听滚动条事件，触发加载图片的执行函数。
动态的添加div元素：
```bash
$.each(dataInt.data,function(key,value){
				var oBox=$('<div>').addClass('box').appendTo($('#main'));
				var oPic=$('<div>').addClass('pic').appendTo($(oBox));
				var oImg=$('<img>').attr('src','images/'+$(value).attr('src')).appendTo($(oPic));
			})	
					
			//也可以使用字符串连接的方式添加html代码，再一起appendTo
			var str="<div class='box'><div class='pic'>"
			$.each(dataInt.data,function(key,value){
				str += "<img src='images/'" + $(value).attr('src') + ">";
			}
			str+="</div></div>>";

			$('#main').append(str);
```