import firebase from "firebase";

const firebaseApp=firebase.initializeApp({
    //api key and firebase config
  });

  const db=firebaseApp.firestore();   
  
  export {db};