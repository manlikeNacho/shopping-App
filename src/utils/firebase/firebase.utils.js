import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
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

const googleprovider = new GoogleAuthProvider();
googleprovider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleprovider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleprovider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth,additionalInformation = {} ) => {
  const userDocRef = doc(db, 'user',userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);


  if(!userSnapshot.exists()) {
    const { displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await setDoc (userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message );
    }

  }

  return userDocRef;




  //if user data exists

  //if user data doesnt exists
}


export const createAuthUserWithEmailAndPassword = async(email, password) => {
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth,email,password);
}


export const signInAuthUserWithEmailAndPassword = async(email, password) => {
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth,email,password);
}


export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback );
