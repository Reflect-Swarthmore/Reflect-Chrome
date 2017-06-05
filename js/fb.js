//**************************************************************************
//	This javascript file is the main functionality of the chrome extension
//	Authors: Miguel Gutierrez

//**************************************************************************
//
//
//								JOURNAL BUTTONS
//
//
//**************************************************************************
// var Quill = require('quill');
var title = new Quill('#title', {
  placeholder: 'Titulo...',
  theme: 'bubble'
});
var quill = new Quill('#inputText', {
  modules: {
    toolbar: [
      [{ 'font': [] }],
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'align': [] }],
      ['bold', 'italic', 'underline'],
      ['image']
    ]
  },
  placeholder: 'Tell us your life story...',
  theme: 'snow'  // or 'bubble'
});

// LOCK button- toggles between locked and unlocked
$('#lock-button').click(function(){
    $(this).find('span').toggleClass('mbri-unlock').toggleClass('mbri-lock');
});


// fb.js is hadnling the button functions
// This handles the submit and themes button

//this functions is the listener for the submit button
function submitEntry(){
	//it gets the user from the firebase database
	var user = firebase.auth().currentUser;
	//it gets the journal entry and date in order to add it to the database under the user
	firebase.database().ref('users/' + user.uid + '/entries').push(
														{ title: title.getContents(),
                              journal: quill.getContents(),
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
					var journal = snapshot.child("journal").val();
						document.getElementById('inputText').value = journal;
						document.getElementById('draft').textContent = "Save draft";
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

//**************************************************************************
//
//
//								PREVIOUS JOURNAL ENTRIES SIDEBAR
//
//
//**************************************************************************
var initialized = false;

//This will print previous journal entry to a given element
document.getElementById('past-entries').addEventListener("click", function(){
	if (!initialized){
		var user = firebase.auth().currentUser; //this pulls the firebase user
	  var date, journal;
		// this references into FireBase list of users and into the specific user
		//the 'value' parameter gets all the entries under the user
		firebase.database().ref('users/' + user.uid + '/entries/').once('value')
			.then(function(snapshot){
				//snapshot is a sub-database with all the user entries and the
				// forEach() function iterates through every entry under user.userID
        var count = 0;
				snapshot.forEach(function(childSnapshot){
					date = childSnapshot.child("date").val();
					journal = childSnapshot.child("journal").val();
					//call printJournal to print a  window after the #previous-close item
					printJournal(date, journal, ".modal-body");
          count+=1;
          if (count == 3)
          return true;
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
  $(item).append(p);
  var entry = new Quill(p_body,{
    theme: 'bubble',
    readOnly: true
  });
  entry.setContents(text);
}

// menu - open/close animation for previous journal entries
var menuAnim = function(){
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
	$('#menu-button').click(function(){
		//slides in the entries menu
		$('#menu-contents').animate({
			left: "0%"
		}, 200);
		//hides the menu-contents button
    $( "#menu-button" ).hide();
	});
	$('#menu-close').click(function(){
		//slides out the entries menu
		$('#menu-contents	').animate({
			left: "-20%"
		}, 200);
		// fades in the previous button
		$( "#menu-button" ).removeAttr( "style" ).hide().fadeIn(500);
	});


}

$(document).ready(menuAnim);
//*************************************************
//
//    BOTTOM MODAL
//
//*************************************************
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("past-entries");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
