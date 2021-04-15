import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyADOvyDyZu1D4ozokf5g-S-MNBIR3djYKw",
    authDomain: "journal-app-6ecfb.firebaseapp.com",
    projectId: "journal-app-6ecfb",
    storageBucket: "journal-app-6ecfb.appspot.com",
    messagingSenderId: "397609386786",
    appId: "1:397609386786:web:eb54e6056c0327930a1b7b"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}