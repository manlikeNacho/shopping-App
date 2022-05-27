import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyA2vFquD9kofW21uZH4f-7IecMx7WJtnso",
  authDomain: "my-clothing-db-80a22.firebaseapp.com",
  projectId: "my-clothing-db-80a22",
  storageBucket: "my-clothing-db-80a22.appspot.com",
  messagingSenderId: "220360555453",
  appId: "1:220360555453:web:50f407cebeb5fd60def0d4"
};


const FirebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'user',userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());


  if(!userSnapshot.exists()) {
    const { displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc (userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error){
      console.log('error creating the user', error.message );
    }

  }

  return userDocRef;


  //if user data exists

  //if user data doesnt exists
}
