console.log('myscript.js is loaded');

/*
This is simply to clone the rows on the study set template page
Will update when DB is set up to auto set rows for how many questions are in the set
for now just clones the table row
*/
function cloneRow() {
	var html = document.getElementById("therow").innerHTML;

	var row = document.createElement('tr');

	row.innerHTML= html;

	document.getElementById("myTable").appendChild(row);
}

function clickPress(event){
	if(event.keyCode == 13){
		var searchBar = document.getElementById("searchbar");
		searchBar.value = "";
	}
}

function generate_quiz(){
	
	document.getElementById('SSheader').style.opacity = '.2';
	document.getElementById('SScontent').style.opacity = '.2';
	document.getElementById('SSfooter').style.opacity = '.2';

	
	var quiz = document.createElement("div");
	quiz.id = "Quiz";
	quiz.innerHTML = "TEST";
	document.body.appendChild(quiz);
	
	quiz.style.opacity = '1';
}

function flashcards(table){
	
}

function createtag(input){
	
}

function logout(){
	sessionStorage.removeItem('loggedInUser');
	sessionStorage.removeItem('loggedInPassword');
	window.location.href = "login.html";
}

