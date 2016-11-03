function getStyle(obj,name){//获取当前对象的name属性的值,非行间属性！！
		if(obj.currentStyle){
			return obj.currentStyle[name];
		}
		else {
			return getComputedStyle(obj,false)[name];
		}
	}
	
function starMove(obj,json,fnEnd){//对象、属性、运动到的位置
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