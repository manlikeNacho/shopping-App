import {useState, useContext} from 'react';
import './sign-up-form.styles.scss'
import Button from '../button/button.component'

import FormInput from '../form-input/form-input-component'
import  {createAuthUserWithEmailAndPassword ,createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import {UserContext} from '../../context/context.jsx';

const defaultformfields = {
  displayName: '',
  email:'',
  password:'',
  confirmPassword:''
}

const SignUpForm =() => {
  const [formFields, setFormFields] = useState(defaultformfields);
  const {displayName, email, password,confirmPassword} = formFields;
   const {setCurrentUser} = useContext(UserContext);


  const resetFormfields = () => {
    setFormFields(defaultformfields);
  }

  const handleSubmit = async(event) => {
    event.preventDefault();

    if (password !== confirmPassword){
      alert("password do not match")
    }

    try{
      const {user} = await createAuthUserWithEmailAndPassword(email,password);
      setCurrentUser(user);

      
     await createUserDocumentFromAuth(user, {displayName});
    resetFormfields();

    }catch(error){

        if(error.code === 'auth/email-already-in-use'){
          alert('cannot create user, email already in use');
        }else {
      console.error(error);}
    }
  }

  const handleChange = (event) => {
   const {name, value} = event.target;

    setFormFields({ ...formFields,[name]: value});
  };


  return(
    <div className='sign-up-container'>
    <h2>Don't have an account</h2>
    <span>Sign up with email and password</span>
    <form onSubmit={handleSubmit}>

    <FormInput label="Display Name" type="text" required onChange={handleChange} name="displayName" value={displayName}/>

    <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}/>

    <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}/>

    <FormInput label="Confirm Password" type="password" required onChange={handleChange} name="confirmPassword" value={confirmPassword}/>
    <Button  type="submit"> sign Up</Button>
    </form>
    </div>
  )
};

export default SignUpForm;
