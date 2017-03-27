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
            $("#firebaseui-auth-container").remove();
            console.log("user ----> " + firebase.auth().currentUser)
            userSetup();
            userMenu();
            // document.getElementById('loader').style.display = 'none';
            return false;
        },
        uiShown: function () {
            // The widget is rendered.
            // Hide the loader.
            // document.getElementById('loader').style.display = 'none';
        }
    },
    credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM,
    // Query parameter name for mode.
    queryParameterForWidgetMode: 'mode',
    // Query parameter name for sign in success url.
    queryParameterForSignInSuccessUrl: 'signInSuccessUrl',
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    //signInFlow: 'popup',
    signInSuccessUrl: 'landing.html',
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
function userMenu() {
  //  alert("menu")
};
var pmDB, user, email, uid;
function userSetup() {
    pmDB = firebase.database();
    user = firebase.auth().currentUser;
    var displayName = user.displayName;
    email = user.email;
    var emailVerified = user.emailVerified;
    uid = user.uid;
    var providerData = user.providerData;
    $("#useremail").text(email);
    pmDB.ref('users/' + uid).once('value', function (snapshot) {
        console.log("get sshot")
        load();
        if (snapshot.val() !== null) {
            //     console.log("user " + snapshot.val() + " exists")
        } else {
            console.log("user d/n exist")
            pmDB.ref('users/' + uid).set({
                email: email,
            });
        }
    });
    $("#sidebar").append("<hr><div id='loadcontainer'></div>");
}



// $(function () {
//     console.log("page loaded")
//     firebase.auth().onAuthStateChanged(function (user) {
//         console.log("auth change");
//         if (user) {
//             // User is signed in.
//             var displayName = user.displayName;
//             email = user.email;
//             var emailVerified = user.emailVerified;
//             uid = user.uid;
//             var providerData = user.providerData;
//             $("#useremail").text(email);
//             pmDB.ref('users/' + uid).once('value', function (snapshot) {
//                 console.log("get sshot")
//                 load();
//                 if (snapshot.val() !== null) {
//                     //     console.log("user " + snapshot.val() + " exists")
//                 } else {
//                     console.log("user d/n exist")
//                     pmDB.ref('users/' + uid).set({
//                         email: email,
//                     });
//                 }
//             });
//         } else {
//             console.log("user signed out");
//         }
//     });
// })