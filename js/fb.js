// fb.js is hadnling the button functions
// This handles the submit and themes button

//this functions is the listener for the submit button
function submitEntry(){
	//it gets the user from the firebase database
	var user = firebase.auth().currentUser;
	//it gets the journal entry and date in order to add it to the database under the user
	firebase.database().ref('users/' + JSON.stringify(user, ['displayName']) ).set(
														{ journal:	document.getElementById('inputText').value,
														  date: document.getElementById('date').textContent
														}
												);
}
document.getElementById('myBtn').onclick = submitEntry;

//background change functionality
var current = document.body.style.backgroundImage; //this is to allow for previews of other themes

$(document).ready(function(){
	$(".dropdown-toggle").dropdown();
});

function newBackground(location){
	document.body.style.backgroundImage = location;
}



/* mouseover event changes background to preview
	 mouseout changes the background image back to current
 */
document.getElementById('mountains').addEventListener("mouseover", function(){
	newBackground("url(../images/mountains.png)");
});
document.getElementById('sunset').addEventListener("mouseover", function(){
	newBackground("url(../images/sunset.png)");
});
document.getElementById('mountains').addEventListener("mouseout", function(){
	newBackground(current);
});
document.getElementById('sunset').addEventListener("mouseout", function(){
	newBackground(current);
});


//click listeners - this changes the current variable and sets the background
document.getElementById('mountains').addEventListener("click", function(){
	current = "url(../images/mountains.png)";
	newBackground(current);
});
document.getElementById('sunset').addEventListener("click", function(){
	current = "url(../images/sunset.png)";
	newBackground(current);
});


//click listeners - this will print previous journal entry to a given element
document.getElementById('UPrompt').addEventListener("click", function(){
	document.getElementById('Prompt-for-user').textContent = "Hopefully it changes";
});

//printing journal entries to right col
function printJournal(text, item){
	// create panel container
	var p = document.createElement("div");
	p.setAttribute("class", "panel panel-default");
	// panel heading
	var p_head = document.createElement("div");
	p_head.setAttribute("class", "panel panel-heading");
	// panel body
	var p_body = document.createElement("div");
	p_body.setAttribute("class", "panel panel-body");
	// panel body's text
	var p_body_text = document.createTextNode(text);

	//putting panel together and adding to HTML
	p.appendChild(p_head);
	p_body.appendChild(p_body_text);
	p.appendChild(p_body);
	document.getElementById(item).appendChild(p);

}
document.getElementById('previous').addEventListener("click", function(){
	var user = firebase.auth().currentUser;
	var userId = firebase.database().ref("user/"+user.displayName);
	firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
	  var username = snapshot.val().username;
		printJournal("some text", "prev-entries");
	});
});
