function initApp() {
  // Listen for auth state changes.
  var date = new Date();
  document.getElementById('date').textContent = date.toDateString();

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
      document.getElementById('login').textContent = 'Sign out';
      document.getElementById('welcome-msg').textContent = 'WELCOME!';
      document.getElementById('welcome-usr').textContent = JSON.stringify(displayName);
      document.getElementById('myBtn').disabled = false;
      document.getElementById('draft').disabled = false;
      document.getElementById('myBtn').style.display = "initial";
      document.getElementById('draft').style.display = "initial";
      document.getElementById('inputText').style.display = "initial";
    } else {
      // Let's try to get a Google auth token programmatically.
      document.getElementById('login').textContent = 'Sign-in with Google';
      document.getElementById('welcome-msg').textContent = '';
      document.getElementById('welcome-usr').textContent = '';
      document.getElementById('myBtn').style.display = "none";
      document.getElementById('draft').style.display = "none";
      document.getElementById('inputText').style.display = "none";
    }
    document.getElementById('login').disabled = false;
  });
  document.getElementById('login').addEventListener('click', startSignIn, false);
}

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
