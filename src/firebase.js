import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCQFAFLKVwzzIP7fbpG64wvzkfaPzUq7QA",
    authDomain: "scapp-db885.firebaseapp.com",
    projectId: "scapp-db885",
    storageBucket: "scapp-db885.appspot.com",
    messagingSenderId: "517216507522",
    appId: "1:517216507522:web:a4eb2d4d43aee31bb5069b",
    measurementId: "G-8Z5HYT3HKG"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
const db=firebaseApp.firestore();
const auth=firebase.auth();
const storage=firebase.storage();

export default db;
export {auth,storage};





