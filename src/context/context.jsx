import {createContext, useState, useEffect} from 'react';
import {onAuthStateChangedListener} from '../utils/firebase/firebase.utils';

//the actual value , we are accesing
export const UserContext = createContext ({
  currentUser: null,
  setCurrentUser: () => null,
})

export const UserProvider = ({children}) =>{
  const [currentUser, setCurrentUser] = useState(null);
  const value = {currentUser, setCurrentUser};

  useEffect(
    ()=> {
     const unsubscribe = onAuthStateChangedListener((user)=> {
       console.log(unsubscribe)
     });

     return unsubscribe;
    }
  ,[]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}