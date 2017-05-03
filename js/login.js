
var hasDraft;
function initApp() {
  // Listen for auth state changes.
  var date = new Date();
  document.getElementById('date').textContent = date.toDateString();
  hasDraft = false;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      document.getElementById('login').style.display = "none";
      // document.getElementById('journal-entry').setAttribute("class", "collapse in");
      welcomeScene(displayName);
      firebase.database().ref('users/' + user.uid + '/draft/').once('value')
        .then(function(snapshot){
          var activeDraft = snapshot.child("isActive").val();
          var journal = snapshot.child("journal").val();
          if (activeDraft == true){
            document.getElementById('draft').textContent = "Open draft";
            hasDraft = true;
          }
        });
    } else {
      // Let's try to get a Google auth token programmatically.
      document.getElementById('login').style.display = "inherit";
      document.getElementById('login').textContent = 'Sign-in with Google';
      document.getElementById('welcome-msg').textContent = '';
      document.getElementById('welcome-usr').textContent = '';

      document.getElementById('journal-entry').setAttribute("class", "collapse");
    }
    document.getElementById('login').disabled = false;
  });
  document.getElementById('login').addEventListener('click', startSignIn, false);
}
/**
  starts the logout process
 */
 document.getElementById('logout').addEventListener("click", function(){
   firebase.auth().signOut();
 });
/**
 * Starts the sign-in process.
 */
function startSignIn() {
  document.getElementById('login').disabled = true;
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    startAuth(true);
  }
}
/**
 * Start the auth flow and authorizes to Firebase.
 * @param{boolean} interactive True if the OAuth flow should request with an interactive mode.
 */
function startAuth(interactive) {
   // Request an OAuth token from the Chrome Identity API.
   chrome.identity.getAuthToken({interactive: !!interactive}, function(token) {
     if (chrome.runtime.lastError && !interactive) {
       console.log('It was not possible to get a token programmatically.');
     } else if(chrome.runtime.lastError) {
       console.error(chrome.runtime.lastError);
     } else if (token) {
       // Authrorize Firebase with the OAuth Access Token.
       var credential = firebase.auth.GoogleAuthProvider.credential(null, token);
       firebase.auth().signInWithCredential(credential).catch(function(error) {
         // The OAuth token might have been invalidated. Lets' remove it from cache.
         if (error.code === 'auth/invalid-credential') {
           chrome.identity.removeCachedAuthToken({token: token}, function() {
             startAuth(interactive);
           });
         }
       });
     } else {
       console.error('The OAuth Token was null');
     }
   });
 }
 window.onload = function() {
  initApp();
};
function welcomeScene(name){
  $("#welcome-msg").hide();
  $("#welcome-usr").hide();
  document.getElementById('welcome-msg').textContent = 'WELCOME!';
  document.getElementById('welcome-usr').textContent = name;
  setTimeout(function(){
    $( "#welcome-msg" ).removeAttr( "style" ).hide().fadeIn(1500);
    $( "#welcome-usr" ).removeAttr( "style" ).hide().fadeIn(1500);
  }, 0 );
  setTimeout(function(){
    $( "#welcome-msg" ).removeAttr( "style" ).fadeOut(500); //.fadeOut(2500);
    $( "#welcome-usr" ).removeAttr( "style" ).fadeOut(500); //.fadeOut(2500);
  }, 1500 );
  setTimeout(function(){
    document.getElementById('journal-entry').setAttribute("class", "collapse in");
  }, 2500);
}
