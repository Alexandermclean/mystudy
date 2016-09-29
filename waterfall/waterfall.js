$(document).ready(function(){
	waterfall();
	var dataInt={'data':[{'src':'25.jpg'},{'src':'26.jpg'},{'src':'27.jpg'},{'src':'28.jpg'}]};
	$(window).on('scroll',function(){
		if (checkScrollSlide) {
			$.each(dataInt.data,function(key,value){
				var oBox=$('<div>').addClass('box').appendTo($('#main'));
				var oPic=$('<div>').addClass('pic').appendTo($(oBox));
				var oImg=$('<img>').attr('src','images/'+$(value).attr('src')).appendTo($(oPic));
			})
				waterfall();
		}
	})
})

function waterfall(){
	var $boxs=$("#main>div")//选择main下的一级子标签
	var w=$boxs.eq(0).outerWidth();//width()获取设置的宽度，outerWidth获取border、padding等加起来的宽度
	var cols=Math.floor($(window).width()/w	);
	//console.log(cols);
	$("#main").width(cols*w).css("margin","0 auto");
	var hArr=[];
	$boxs.each(function(index,value){//index:遍历的元素索引 value:遍历的元素
		//console.log(index);
		//console.log(value);
		var h=$boxs.eq(index).outerHeight();
		if (index<cols) {
			hArr[index]=h;
		}else{
			var minH=Math.min.apply(null,hArr);
			var minHIndex=$.inArray(minH,hArr);//找到最小高度的图片在数组中的索引
			$(value).css({
				'position':'absolute',
				'top':minH+'px',
				'left':minHIndex*w+'px',
			})
			hArr[minHIndex]+=$boxs.eq(index).outerHeight();//修改数组，避免图片重叠
		}

	})
	//console.log(hArr)
}

function checkScrollSlide(){
	var lastBox=$('#main>div').last();
	var lastBoxdDis=$lastBox.offset().top+Math.floor($lastBox.outerHeight()/2);
	var scrollTop=$(window).scrollTop();
	var documentH=$(window).height();
	reture(lastBoxdDis<scrollTop+documentH)?true:false;
}