var config = {
    apiKey: "AIzaSyA-0uhHYT0M3ahUFJtjvaNm21VgBqyqUxA",
    authDomain: "palette-machine.firebaseapp.com",
    databaseURL: "https://palette-machine.firebaseio.com",
    storageBucket: "palette-machine.appspot.com",
    messagingSenderId: "443340502886"
};
firebase.initializeApp(config);
console.log("initialize app")
// FirebaseUI config.
var uiConfig = {
    callbacks: {
        signInSuccess: function (currentUser, credential, redirectUrl) {
            alert("USER ID: " + firebase.auth().currentUser.uid)
            document.getElementById('loader').style.display = 'none';
            return true;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
        }
    },
    credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
    // Query parameter name for mode.
    queryParameterForWidgetMode: 'mode',
    // Query parameter name for sign in success url.
    queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    //signInFlow: 'popup',
    signInSuccessUrl: 'pm.html',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            // Whether the display name should be displayed in the Sign Up page.
            requireDisplayName: true
        }
    ],
    // Terms of service url.
   tosUrl: '<your-tos-url>'
};

var ui = new firebaseui.auth.AuthUI(firebase.auth());
ui.start('#firebaseui-auth-container', uiConfig);
var pmDB = firebase.database();