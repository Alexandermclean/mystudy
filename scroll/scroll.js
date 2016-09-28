
		$(document).ready(function(){
			$(window).scroll(function(){//监听滚动条事件
				var top=$(document).scrollTop();
				//console.log(top); 滚动条距离顶部的距离
				var menu=$("#menu");
				var items=$("#content").find(".item");
				var currentId="";//当前所在楼层的id
				items.each(function(){
					var m=$(this);
					var itemTop=m.offset().top;
					//console.log(itemTop)每个item距离顶部的距离
					if(top>itemTop-200){
						currentId="#"+m.attr("id");//添加#方便href链接到相应楼层
					}else{
						return false;
					}
				});
				//给相应楼层设置current；取消其他楼层的current
				var currentLink=menu.find(".current");
				if(currentId&&currentLink.attr("href")!=currentId){
					currentLink.removeClass("current");
					menu.find("[href="+currentId+"]").addClass("current");
				}
			});
		});