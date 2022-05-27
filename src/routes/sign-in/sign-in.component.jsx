import {signInWithGooglePopup, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils.js';


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
    </div>
  );
};

export default SignIn;
