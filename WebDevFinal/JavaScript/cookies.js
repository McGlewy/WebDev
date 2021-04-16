//Code from https://www.w3schools.com/js/js_cookies.asp

function setCookie(cname, cvalue, exdays) 
{
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+ d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	//Add cookie to database here using php
}

function getCookie(cname) 
{
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) 
	{
		var c = ca[i];
		while (c.charAt(0) == ' ') 
		{
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) 
		{
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function checkCookie() 
{
	var username = getCookie("username");
	if (username == "") 
	{
		username = prompt("Please enter your name:", "");
		if (username != "" && username != null) 
		{
			setCookie("username", username, 365);
			
		}
	} 
}

//Code from https://www.w3schools.com/js/js_cookies.asp

window.onload = function() 
{
	checkCookie();
}