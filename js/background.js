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
  // Listen for auth state changes.
  // firebase.auth().onAuthStateChanged(function(user) {
  //   console.log('User state change detected from the Background script of the Chrome Extension:', user);
  // });
  // firebase.database().ref('users/').set({username:"miguel", journal: "All work and no play makes miguel a dull boy", date: "always"});//.ref('user').set({username: "miguel"});
  var date = new Date();
	document.getElementById('date').textContent = date.toDateString();
}

window.onload = function() {
  initApp();
};
