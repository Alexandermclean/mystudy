
$(document).ready(function() {
	loadData(1,10);
	var pageLi=$('.course-page-ol li');
	//var pageIndex=$('.course-page-ol li.li-checked')[0].Index;

	$('#program-language-btn').on('click',function(){
		$(this).addClass('toGreen');
		$('#product-design-btn').removeClass('toGreen');
		$('#course-listtt').empty();
		loadData(1,20);
		pageLi.removeClass('li-checked');
	    $(pageLi[2]).addClass('li-checked');
	    pageIndex=$('.course-page-ol li.li-checked')[0].Index;
	});//编程语言按钮点击事件

	$('#product-design-btn').on('click',function(){
		$(this).addClass('toGreen');
		$('#program-language-btn').removeClass('toGreen');
		$('#course-listtt').empty();
		loadData(1,10);
		pageLi.removeClass('li-checked');
	    $(pageLi[2]).addClass('li-checked');
	    pageIndex=$('.course-page-ol li.li-checked')[0].Index;
	});//产品设计按钮点击事件

	/*course-page*/
	for(var i=0;i<pageLi.length;i++){
		pageLi[i].Index=i;
		pageLi.eq(i).click(function(){
			//console.log(this.Index);
			pageLi.removeClass('li-checked');
			$(this).addClass('li-checked');
			$('#course-listtt').empty();
			if($('#product-design-btn').hasClass('toGreen')){
	         	loadData(3-this.Index,10);
	         }
	         else{
	         	loadData(3-this.Index,20);
	         }
	         pageIndex=$('.course-page-ol li.li-checked')[0].Index;
		});
	}
	pageIndex=$('.course-page-ol li.li-checked')[0].Index;

	$('.course-page-back').on('click',function(){
		if(pageIndex==2){
			return;
		}
		else{
	         pageIndex++;
	         $('#course-listtt').empty();
	         if($('#product-design-btn').hasClass('toGreen')){
	         	loadData(3-pageIndex,10);
	         }
	         else{
	         	loadData(3-pageIndex,20);
	         }
	         pageLi.removeClass('li-checked');
	         $(pageLi[pageIndex]).addClass('li-checked');
	         //console.log(pageLi[5-pageIndex]);
		}
	});
	//pageIndex=$('.course-page-ol li.li-checked')[0].Index;
	$('.course-page-front').on('click',function(){
		if(pageIndex==0){
			return;
		}
		else{
	         pageIndex--;
	         $('#course-listtt').empty();
	         if($('#product-design-btn').hasClass('toGreen')){
	         	loadData(3-pageIndex,10);
	         }
	         else{
	         	loadData(3-pageIndex,20);
	         }
	         pageLi.removeClass('li-checked');
	         $(pageLi[pageIndex]).addClass('li-checked');
	         //console.log(pageLi[5-pageIndex]);
		}
	});

});

function loadData(Data_pageNo,Data_type){
	$.ajax({
			url: 'http://study.163.com/webDev/couresByCategory.htm',
			type: 'GET',
			data: {
				'pageNo': Data_pageNo,
				'psize': 20,
				'type': Data_type,
				'a': new Date().getTime(),
			},
			dataType:'json',
			success:function(_data){
				var htmStr='';
				for(var i=0;i<_data.list.length;i++){
						if(_data.list[i].price==0){
							_data.list[i].price='免费';
						}
						else{
							_data.list[i].price='￥'+_data.list[i].price;
						}

					htmStr+='<div class="course-list-div">'+
							'<img class="course-list-img" src='+_data.list[i].middlePhotoUrl+'>'+
							'<span class="course-list-name">'+_data.list[i].name+'</span>'+
							'<span class="course-list-provider">'+_data.list[i].provider+'</span>'+
							'<span class="course-list-learnerCount">'+_data.list[i].learnerCount+'</span>'+
							'<span class="course-list-price">'+_data.list[i].price+'</span>'+
							'</div>';
				}
				$('#course-listtt').append(htmStr);
			},
			error:function(jqXHR){
				console.log(jqXHR.status);
			},
		});
}//ajax数据请求
		