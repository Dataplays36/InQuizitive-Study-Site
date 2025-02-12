document.addEventListener('DOMContentLoaded', function() //this makes sure stuff is there before it tries anything 
{
    console.log('myscript.js is loaded');	//debug, remove later

    // Function Definitions (cloneRow, clickPress, generate_quiz, flashcards, createtag, logout)
    function cloneRow() {
        var html = document.getElementById("therow").innerHTML;
        var row = document.createElement('tr');
        row.innerHTML = html;
        document.getElementById("myTable").appendChild(row);
    }

    function clickPress(event){
        if(event.keyCode == 13){
            var searchBar = document.getElementById("searchbar");
            searchBar.value = "";
        }
    }

    function generate_quiz() {
        document.getElementById('SSheader').style.opacity = '.2';
        document.getElementById('SScontent').style.opacity = '.2';
        document.getElementById('SSfooter').style.opacity = '.2';
        var quiz = document.createElement("div");
        quiz.id = "Quiz";
        quiz.innerHTML = "TEST";
        document.body.appendChild(quiz);
        quiz.style.opacity = '1';
    }

    function flashcards(table) {
        // Function body
    }

    function createtag(input) {
        // Function body
    }



	/*	haven't touched these yet 

    function logout() {
        sessionStorage.removeItem('loggedInUser');
        sessionStorage.removeItem('loggedInPassword');
        window.location.href = "login.html";
    }


	*/

    // User authentication check: these update with the script, and control the following function which decides to display account details
    const loginSignupElement = document.getElementById('login_signup');
    const userInfoElement = document.getElementById('user-info');
    if (loginSignupElement && userInfoElement) 
	{
        fetch('/check-auth')
        .then(response => response.json())
        .then(data => {
            console.log('Auth status:', data); // Log the authentication status for debugging
            if (data.loggedIn) {
                loginSignupElement.style.display = 'none'; // Hide login/signup link
                userInfoElement.style.display = 'inline'; // Show user info
                userInfoElement.innerHTML = ` <a href="profile.html">Account: ${data.username}</a>`;
            } else {
                loginSignupElement.style.display = 'inline'; // Show login/signup link
                userInfoElement.style.display = 'none'; // Hide user info
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        console.error('Elements not found in the DOM');
    }
});
