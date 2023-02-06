//this runs at the bottom of every page
checkUser()

function checkUser(){
    // Read all cookies as an array of strings
    var cookies = document.cookie.split(';');
    console.log("cookies=",cokies)
    // Iterate over the cookies
    for (var i = 0; i < cookies.length; i++) {
        // Trim leading whitespace from the cookie string
        var cookie = cookies[i].trim();

        // Check if the cookie starts with "user="
        if (cookie.startsWith('user=')) {
            // Parse the cookie string as a JSON object
            var user = JSON.parse(cookie.substring(5));

            // Log the "login" value to the console
            console.log("login=",user.login);

            // Break out of the loop
            break;
        }
    }
}
