
$(document).ready(function() {
	loadData(1,10);
	$('#program-language-btn').on('click',function(){
		$(this).addClass('toGreen');
		$('#product-design-btn').removeClass('toGreen');
		$('#course-listtt').empty();
		loadData(1,20);
	});//编程语言按钮点击事件

	$('#product-design-btn').on('click',function(){
		$(this).addClass('toGreen');
		$('#program-language-btn').removeClass('toGreen');
		$('#course-listtt').empty();
		loadData(1,10);
	});//产品设计按钮点击事件
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
				//console.log(_data[2].bigPhotoUrl);
				//console.log(_data.list.length);
				for(var i=0;i<_data.list.length;i++){
						var ID='#'+'course-parentDiv'+i;
						//var name_ID='#'+'course-name'+i;
						//console.log(ID);
						//console.log(name_ID);
						
						$('body').on('mouseover',ID,function(){
							$(this).find('span').eq(0).css('color','#39a030');
						});
						$('body').on('mouseout',ID,function(){
							$(this).find('span').eq(0).css('color','#333333');
						});														//事件代理
						var parentDiv=$('<div></div>');
						parentDiv.attr('id','course-parentDiv'+i);
						parentDiv.addClass('course-list-div');
						//console.log(ID);
						var _img=$('<img>');
						_img.attr('src',_data.list[i].middlePhotoUrl);
						_img.addClass('course-list-img');
						parentDiv.append(_img);

						var _name=$('<span></span>');
						_name.html(_data.list[i].name);
						//_name.attr('id','course-name'+i);
						_name.addClass('course-list-name');
						parentDiv.append(_name);
		
						var _provider=$('<span></span>');
						_provider.html(_data.list[i].provider);
						_provider.addClass('course-list-provider');
						parentDiv.append(_provider);

						var _learnerCount=$('<span></span>');
						_learnerCount.html(_data.list[i].learnerCount);
						_learnerCount.addClass('course-list-learnerCount');
						parentDiv.append(_learnerCount);

						var _price=$('<span></span>');
							if(_data.list[i].price==0){
								_price.html('免费');
							}
							else{
								_price.html('¥'+_data.list[i].price);
							}
						_price.addClass('course-list-price');
						parentDiv.append(_price);

						$('#course-listtt').append(parentDiv);
					}
					
				},
			error:function(jqXHR){
				console.log(jqXHR.status);
			}
		});
}//ajax数据请求
		