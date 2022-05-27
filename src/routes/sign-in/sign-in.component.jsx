import{useEffect} from 'react';
import {getRedirectResult} from 'firebase/auth'

import {
    auth,
     signInWithGooglePopup,
     signInWithGoogleRedirect,
     createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils.js';

     import SignUpForm from '../../components/sign-up/sign-up.component.jsx';

const SignIn = () => {

  const logGoogleUser = async () =>{
    const {user} = await signInWithGooglePopup();
    const userDocRef= await createUserDocumentFromAuth(user)
    //createUserDocumentFromAuth(user);
  }




  return(
    <div>
      <h1>Sign in</h1>
      <button onClick={logGoogleUser}>
           Sign in with google
      </button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
