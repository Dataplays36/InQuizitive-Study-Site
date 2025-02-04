function clickPress(event){
	if(event.keyCode == 13){
		var searchBar = document.getElementById("searchbar");
		searchBar.value = "";
	}
}

/*
will use the following function for testing
and to see if the user exists in the database
*/

//this function is to see if there is an account for the website
//will eventually have it get rid of the login/signup button 
//and display a Welcome "username" or something along those lines
//still getting used to javascript
function checkforaccount(){
	var userName;
	var passWord;
}

function getInformation(){
	var userName = document.getElementById("username").value;
	var passWord = document.getElementById("password").value;
	alert(userName);
}



function createAccount(){
	var userName = document.getElementById("username").value;
	var passWord = document.getElementById("password").value;
	
	
	
}

//testing ability to add a username and password to the database
document.getElementById('test-login-btn').addEventListener('click', function() {
    fetch('/add-item', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: 'testuser', password: 'testpassword' }),
    })
    .then(response => response.text())
    .then(data => {
        console.log('It worked');
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});