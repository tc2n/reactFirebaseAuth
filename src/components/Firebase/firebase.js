import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDtBlThwGZ14aBh_dufuFi2K2yycUuRhvU",
    authDomain: "fir-auth-test-ee4fd.firebaseapp.com",
    databaseURL: "https://fir-auth-test-ee4fd.firebaseio.com",
    projectId: "fir-auth-test-ee4fd",
    storageBucket: "fir-auth-test-ee4fd.appspot.com",
    messagingSenderId: "699199667060",
    appId: "1:699199667060:web:f7b3092c8f4da07b"
}

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth;
    }

    doCreateUserWithEmailAndPassword = (email, password) => this.auth().createUserWithEmailAndPassword(email, password);
    
    doSignInWithEmailAndPassword = (email, password) => this.auth().signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth().signOut();

    doPasswordReset = email => this.auth().sendPasswordResetEmail(email);

    doPasswordUpdate = password => this.auth().currentUser.updatePassword(password);
}

export default Firebase;