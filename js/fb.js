// fb.js is hadnling the button functions
// This handles the submit and themes button

//this functions is the listener for the submit button
function submitEntry(){
	//it gets the user from the firebase database
	var user = firebase.auth().currentUser;
	//it gets the journal entry and date in order to add it to the database under the user
	firebase.database().ref('users/' + user.uid ).push(
														{ journal:	document.getElementById('inputText').value,
														  date: document.getElementById('date').textContent
														}
												);
		document.getElementById('inputText').value = "";
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

//click listeners - this will print previous journal entry to a given element
document.getElementById('previous').addEventListener("click", function(){
	var user = firebase.auth().currentUser;
    var date, journal;
	firebase.database().ref('users/' + user.uid).once('value')
	.then(function(snapshot){
		snapshot.forEach(function(childSnapshot){

			date = childSnapshot.child("date").val();
			journal = childSnapshot.child("journal").val();
			printJournal(date, journal, "#previous-close");
		});
	});
});

function printJournal(heading, text, item){
	// create panel container
	var p = document.createElement("div");
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
// menu animation/activation for previous journal entries
var prevMenu = function(){
      // Callback function to bring a hidden box back
    function callback() {
      setTimeout(function() {
        $( "#previous" ).removeAttr( "style" ).hide().fadeIn();
      }, 200 );
    };

	$('#previous').click(function(){
		$('.prev-menu').animate({
			right: "0%"
		}, 200);
      // get effect type from
      var selectedEffect = $( "#effectTypes" ).val();

      // Most effect types need no options passed by default
      var options = {};
      // some effects have required parameters
      if ( selectedEffect === "scale" ) {
        options = { percent: 50 };
      } else if ( selectedEffect === "size" ) {
        options = { to: { width: 200, height: 60 } };
      }

      // Run the effect
      $( "#previous" ).hide( selectedEffect, options, 1000);

	});

	$('#previous-close').click(function(){
		$('.prev-menu').animate({
			right: "-20%"
		}, 200);
        callback();
	});
}
// });
$(document).ready(prevMenu);
