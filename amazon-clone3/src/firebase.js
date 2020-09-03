import firebase from 'firebase';

const firebaseApp =firebase.initializeApp({
  //api keys and firebase config
});

//const db =firebaseApp.firestore();
const auth=firebase.auth();

export {auth};