//**************************************************************************
//	This javascript file is the main functionality of the chrome extension
//	Authors: Miguel Gutierrez
//


//**************************************************************************
//
//
//								JOURNAL BUTTONS
//
//
//**************************************************************************

// var savedDraft = false;

// fb.js is hadnling the button functions
// This handles the submit and themes button

//this functions is the listener for the submit button
function submitEntry(){
	//it gets the user from the firebase database
	var user = firebase.auth().currentUser;
	//it gets the journal entry and date in order to add it to the database under the user
	firebase.database().ref('users/' + user.uid + '/entries').push(
														{ journal:	document.getElementById('inputText').value,
														  date: document.getElementById('date').textContent
														}
												);
		document.getElementById('inputText').value = "";
}
document.getElementById('myBtn').onclick = submitEntry;



function saveDraftEntry(){
	var user = firebase.auth().currentUser;
	if (!hasDraft){
		//it gets the user from the firebase database
		//it gets the journal entry and date in order to add it to the database under the user
		firebase.database().ref('users/' + user.uid + '/draft').set(
															{ journal:	document.getElementById('inputText').value,
															  isActive: true
															}
													);
			document.getElementById('inputText').value = "";
			document.getElementById('draft').textContent = "Open draft";
			hasDraft = true;
		}
		else{
			firebase.database().ref('users/' + user.uid + '/draft/').once('value')
				.then(function(snapshot){
					// var activeDraft = snapshot.child("isActive").val();
					var journal = snapshot.child("journal").val();
					// if (activeDraft == "true"){
						document.getElementById('inputText').value = journal;
						document.getElementById('draft').textContent = "Save draft";
						// hasDraft = true;
					// }
					hasDraft = false; 
				});

		}
}
document.getElementById('draft').onclick = saveDraftEntry;

//**************************************************************************
//
//
//								SETTINGS MENU
//
//
//**************************************************************************

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
});0
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
document.getElementById('UPrompt').addEventListener("click", function(){
	document.getElementById('Prompt-for-user').textContent = "Hopefully it changes";
});

//**************************************************************************
//
//
//								PREVIOUS JOURNAL ENTRIES SIDEBAR
//
//
//**************************************************************************
var initialized = false;

//This will print previous journal entry to a given element
document.getElementById('previous').addEventListener("click", function(){
	if (!initialized){
		var user = firebase.auth().currentUser; //this pulls the firebase user
	  var date, journal;
		// this references into FireBase list of users and into the specific user
		//the 'value' parameter gets all the entries under the user
		firebase.database().ref('users/' + user.uid + '/entries/').once('value')
			.then(function(snapshot){
				//snapshot is a sub-database with all the user entries and the
				// forEach() function iterates through every entry under user.userID
				snapshot.forEach(function(childSnapshot){
					date = childSnapshot.child("date").val();
					journal = childSnapshot.child("journal").val();
					//call printJournal to print a  window after the #previous-close item
					printJournal(date, journal, "#previous-close");
			});
		});
		// set initialized to true in order to prevent printing all the journals
		// every time the bar opens
		initialized = true;
  }
});

// printJournal - prints a single entry on to the given html item
function printJournal(heading, text, item){
	// create panel container
	var p = document.createElement("div");
	// stylize it
	p.setAttribute("class", "panel panel-default");
	p.style.width = "100%";
	p.style.display = "block";
	p.style.margin = "auto";
	p.style.marginTop = "5mm";
	p.style.marginRight = "auto";

	// panel heading
	var p_head = document.createElement("div");
	p_head.setAttribute("class", "panel panel-heading");
	var p_head_text = document.createTextNode(heading);
	p_head.appendChild(p_head_text);

	// panel body
	var p_body = document.createElement("div");
	p_body.setAttribute("class", "panel panel-body");
	// panel body's text
	var p_body_text = document.createTextNode(text);
	p_body.appendChild(p_body_text);

	//putting panel together and adding to HTML
	p.appendChild(p_head);
	p.appendChild(p_body);
	// document.getElementById(item).appendChild(p);
	$(item).after(p);
}

// prevMenu - open/close animation for previous journal entries
var prevMenu = function(){
	$('#previous').click(function(){
		//slides in the entries menu
		$('.prev-menu').animate({
			right: "0%"
		}, 200);
		//hides the previous button
    $( "#previous" ).hide();
	});
	$('#previous-close').click(function(){
		//slides out the entries menu
		$('.prev-menu').animate({
			right: "-20%"
		}, 200);
		// fades in the previous button
		$( "#previous" ).removeAttr( "style" ).hide().fadeIn(500);
	});
}

$(document).ready(prevMenu);
