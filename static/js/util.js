//this runs at the bottom of every page
//needs to match util.js from www.gocoder.io
document.addEventListener('DOMContentLoaded', async () => {
    checkUser(1)
})

function logout() {
  // Get the cookie name
  var cookieName = "user"; 
  // Set the cookie value to an empty string
  document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  location.reload();
}
function checkUser(x){
    var x=x+1 //x cache buster
    console.log("x=",x)
    // Read all cookies as an array of strings
    var cookies = document.cookie.split(';');
    console.log("cookies=================================",cookies)
    // Iterate over the cookies
    for (var i = 0; i < cookies.length; i++) {
        // Trim leading whitespace from the cookie string
        var cookie = cookies[i].trim();

        // Check if the cookie starts with "user="
        if (cookie.startsWith('user=')) {
            // Parse the cookie string as a JSON object
            var user = JSON.parse(cookie.substring(5));
	    
            // Log the "login" value to the console
            console.log("logins=",user.login);
	    if (document.querySelector('#loginPage')){
    		document.querySelector('#loginPage').style.display="none"
       		document.querySelector('#userPage').style.display="block"
	    }

	    var formUser=document.querySelector("#appForm input[name='user']")
	    if ( formUser ) {
		formUser.value=user.login
		var formCode=document.querySelector("#appForm input[name='code']")
		formCode.code=user.id
	    }
	    var appLink=document.querySelector('#appLink')
	    if (appLink){
		appLink.style.display="block"
		appLink.href="https://app.gocoder.io/login?code="+user.id
	    }

	    links = document.querySelectorAll('a[href="/login"]')
	    for (var i = 0; i < links.length; i++) {
		var link = links[i];
		link.innerHTML="<strong>"+user.login+"<strong>"
	    }	    
	    
	    links = document.querySelectorAll('a[href="/signup"]')
	    for (var i = 0; i < links.length; i++) {
		var link = links[i];
		link.style.display="none";
	    }
            // Break out of the loop
            break;
        }
    }
}
