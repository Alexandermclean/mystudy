$(document).ready(function(){
	$("#search-input").bind('keyup',function(){
		$('#search-suggest').show().css({
			top: $('#search-form').offset().top+$('#search-form').outerHeight(),
			left: $('#search-form').offset().left,
			position: 'absolute',
		});
	})
	$(document).bind('click',function(){
		$('#search-suggest').hide();
	})
	$(document).delegate('li','click',function(){
		var keyword=$(this).text();
		location.href='http://cn.bing.com/search?q='+keyword;
	})
})
