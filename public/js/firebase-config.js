var config = {
    apiKey: "AIzaSyA-0uhHYT0M3ahUFJtjvaNm21VgBqyqUxA",
    authDomain: "palette-machine.firebaseapp.com",
    databaseURL: "https://palette-machine.firebaseio.com",
    storageBucket: "palette-machine.appspot.com",
    messagingSenderId: "443340502886"
};
firebase.initializeApp(config);
var pmDB = firebase.database();
var user = firebase.auth().currentUser;
var email, uid;
$(function () {
    console.log("page loaded")
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            email = user.email;
            var emailVerified = user.emailVerified;
            uid = user.uid;
            var providerData = user.providerData;
            $("#useremail").text(email);
            pmDB.ref('users/' + uid).set({
                email: email,
            });
        } else {
            console.log("user signed out");
        }
    });
})