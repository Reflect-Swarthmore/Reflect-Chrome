// Initialize Firebase
var config = {
	apiKey: "AIzaSyDGqvUz6xt3ZkDhHFk85rMIu7bQI_JLW4A",
	authDomain: "journal-ed5a3.firebaseapp.com",
	databaseURL: "https://journal-ed5a3.firebaseio.com",
	storageBucket: "journal-ed5a3.appspot.com",
	messagingSenderId: "295577169635"
};
firebase.initializeApp(config);

function initApp() {

	//grabs date information and displays it
  var date = new Date();
	document.getElementById('date').textContent = date.toDateString();


	// listen to changes on user authentication
	firebase.auth().onAuthStateChanged(function(user) {
		console.log('User state change detected from the Background script of the Chrome Extension:', user);
	});

}

window.onload = function() {
  initApp();
};
