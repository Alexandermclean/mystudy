
$(document).ready(function() {
	loadData(1,10);
	load_Data();
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
	});												//编程语言按钮点击事件

	$('#product-design-btn').on('click',function(){
		$(this).addClass('toGreen');
		$('#program-language-btn').removeClass('toGreen');
		$('#course-listtt').empty();
		loadData(1,10);
		pageLi.removeClass('li-checked');
	    $(pageLi[2]).addClass('li-checked');
	    pageIndex=$('.course-page-ol li.li-checked')[0].Index;
	});												//产品设计按钮点击事件

	/*course-list-hover*/

	$('.course-list-div').eq(2).mouseover(function() {
			$('.course-list-hover').eq(2).css({display:'block',left:this.offset().left,top:'10px'});
		});
		$('.course-list-hover').eq(2).mouseover(function() {
			$('.course-list-hover').eq(2).css('display','block');
		});
		$('.course-list-hover').eq(2).mouseout(function() {
			$('.course-list-hover').eq(2).css('display','none');
		});

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
	}										//页码按钮点击事件
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
	});										//页码向后按钮点击事件

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
	});										//页码向前按钮点击事件

	/*登录遮罩层*/
	$('.follow_btn').click(function(){
		if($.cookie('loginSuc')){
			 return;
		}
		else{
			$(".iframe").css("height",$(document).height());     
    	    $(".iframe").css("width",$(document).width());     
    	    $(".iframe").show();
    	    $('follow_btn').css('backgroundImage',"url(../images/already-follow.png) no-repeat")
		}
	
		    
	});

	$('.close').click(function(){
		$(".iframe").hide(); 
	});

	$('.go').click(function(){
			$.ajax({
				url: 'http://study.163.com/webDev/login.htm',
				type: 'GET',
				//dataType: 'json',
				data: {
					'userName': hex_md5($('.username').val()),
					'password': hex_md5($('.password').val()),
				},

			success:function(_data){
				if(_data==1){
					alert('登录成功');
					$.cookie('loginSuc',$('.username').val(),{path: "/", expires: 7});
					console.log($.cookie('loginSuc'));
					$('.iframe').hide();
					$('.fans').html(parseInt($('.fans').html())+1);
					$.ajax({
						url: 'http://study.163.com/webDev/attention.htm',
						type: 'GET',
						success:function(data){
							if(data==1){
								$.cookie('followSuc',$('.username').val(),{path: "/",expires: 7});
								console.log($.cookie('followSuc'));
							}
						},
						error:function(){
							console.log('error');
						},
					});
				}
				else{
					alert('用户名或密码错误，请重新登录');
				}
			},

			error:function(jqXHR) {
				console.log(jqXHR.status);
			},
		});
	});
	
	$('.no-remind').click(function(){
		$('.info').css('display','none');
		$.cookie('noremind','string',{expires: 7,path: "/"});
		console.log($.cookie('noremind'));
	});
});


function loadData(Data_pageNo,Data_type){
	$.ajax({
		url: 'https://study.163.com/webDev/couresByCategory.htm',
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

				htmStr+='<div class="course-list-father">'+
							'<div class="course-list-div">'+
								'<img class="course-list-img" src="'+_data.list[i].middlePhotoUrl+'">'+
								'<span class="course-list-name">'+_data.list[i].name+'</span>'+
								'<span class="course-list-provider">'+_data.list[i].provider+'</span>'+
								'<span class="course-list-learnerCount">'+_data.list[i].learnerCount+'</span>'+
								'<span class="course-list-price">'+_data.list[i].price+'</span>'+
							'</div>'+
							'<div class=course-list-hover>'+
								'<img class="iframe-pic" src="'+_data.list[i].middlePhotoUrl+'">'+
								'<div class="iframe-text">'+
									'<h1 class="iframe-h1">'+_data.list[i].name+'</h1>'+
									'<span class="iframe-learnerCount">'+_data.list[i].learnerCount+'</span>'+
									'<span class="iframe-provider">'+_data.list[i].provider+'</span>'+
								'</div>'+
								'<p class="iframe-description">'+_data.list[i].description+'</p>'+
							'</div>'+
						'</div>';
			}
			$('#course-listtt').append(htmStr);
			console.log($('.course-list-father').length);
		},
		error:function(jqXHR){
			console.log(jqXHR.status);
		},
	});
}//ajax数据请求

function load_Data(){
	$.ajax({
		url: 'http://study.163.com/webDev/hotcouresByCategory.htm',
		type: 'GET',
		dataType:'json',
		success:function(_data){
			//console.log(_data);
			var htmStr='<div class="hot-course-move">';
			for(var i=1;i<_data.length;i++){
				htmStr+='<div class="hot-course-div">'+
						'<img class="hot-course-img" src="'+_data[i].middlePhotoUrl+'" title="'+_data[i].name+'">'+
						'<span class="hot-course-name">'+_data[i].name+'</span>'+
						'<span class="hot-course-learnerCount">'+_data[i].learnerCount+'</span>'+
						'</div>';
			}
			htmStr+='</div>'
			$('.hot-show-list').append(htmStr);
			
			var timer=setInterval(hotcourseUp,5000);  //

			$('.hot-course-move').on('mouseover',function(){
				clearInterval(timer);
			});
			$('.hot-course-move').on('mouseout',function(){
				timer=setInterval(hotcourseUp,5000);
			});
		},
		error:function(jqXHR){
			console.log(jqXHR.status);
		},
	});
}
var now=0;
function hotcourseUp(){  
		now++;
		if(now<=9){
			starMove($('.hot-course-move')[0],{'marginTop':-now*72},function(){});
			//console.log(now);
		}
		else{
			$('.hot-course-move').css('top',20);
			now=0;
		}
}

function starMove(obj,json,fnEnd){//对象、属性运动到的位置
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			var cur=0;
			var bStop=true;//假设所有的值都已经到了
			for(var attr in json){
				if(attr=='opacity'){
					cur=Math.round(parseFloat(getStyle(obj,attr))*100);//opacity的style值就是0.几，乘上100方便运算+取整
				}
				else{
					cur=parseInt(getStyle(obj,attr));
				}
				var speed=(json[attr]-cur)/6;
					speed=speed>0?Math.ceil(speed):Math.floor(speed);

				if(cur!=json[attr]){//如果还有值没有到达指定的要求
					bStop=false;
				}

				if(attr=='opacity'){
					obj.style.opacity=(cur+speed)/100;
					obj.style.filter='alpha(opacity:'+(cur+speed)+')';
				}
				else{
					obj.style[attr]=cur+speed+'px';
				}
			}
			if(bStop){
				clearInterval(obj.timer);
				if(fnEnd){
					fnEnd();
				}
			}
		},30);
	}

function getStyle(obj,name){//获取当前对象的name属性的值,非行间属性！！
		if(obj.currentStyle){
			return obj.currentStyle[name];
		}
		else {
			return getComputedStyle(obj,false)[name];
		}
	}


