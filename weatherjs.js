$(document).ready(function(){
	
	$("img").css("z-index","10");
	
	var x=document.getElementById("check");
	var str1;
	var str2;
	var tempInCel;
	var tempInFah;
	var y;
	if(navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(showPosition);
	}
	else
	{
		x.innerHTML="Geolocation is not supported by this browser.";
	}
	
	function showPosition(position)
	{
		str1=position.coords.latitude;
		$(document).trigger('function_showPosition_complete');
	}
	$(document).bind('function_showPosition_complete',func2);
	
	function func2()
	{
		var cityContainer=document.getElementById("city-info");		
		var weatherContainer=document.getElementById("weather-info");
		var link="http://api.openweathermap.org/data/2.5/weather?q="+str1+"&appid=450e85cac8733eb80e34e6c9482e6a9c&units=metric";
		var ourRequest=new XMLHttpRequest();
		ourRequest.onload=function(){
			var ourData=JSON.parse(ourRequest.responseText);
			str=ourData.weather[0].description;
			y=ourData.weather[0].main;
			weatherContainer.insertAdjacentHTML('beforeend',str);
			cityContainer.insertAdjacentHTML('beforeend',ourData.name);			
			tempInCel=ourData.main.temp;
			tempInFah=tempInCel*(9/5)+32;
			tempContainer.innerHTML=tempInCel;
			y="."+y;
			$(document).trigger('function_func2_complete');			
		}
		ourRequest.open('GET',link);
		ourRequest.send();		
	}
	
	$(document).bind('function_func2_complete',func3);
	function func3() {
		document.getElementById('butt').style.transition="opacity 0.1s";
		document.getElementById('butt').style.opacity=1;
		document.getElementById('cel').style.transition="opacity 0.1s";
		document.getElementById('cel').style.opacity=1;
	}
	$("#butt").click(function() {
		$(y).css({"z-index":"9999","width":"300%","height":"auto","border":"20px solid magenta"});
	});
	var tempContainer=document.getElementById("temp-info");
	var elem=document.getElementById('cel');
	elem.addEventListener('click',function(event){
		if(elem.value=="F")
		{
			var string="C";
			elem.value=string;
			tempContainer.innerHTML=tempInCel;
		}
		else
		{			
			elem.value="F";
			tempContainer.innerHTML=tempInFah;
		}
	});
	
});