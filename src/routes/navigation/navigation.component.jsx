import {Fragment, useContext } from 'react';
import {ReactComponent as CrwnLogo} from '../../assets/crown.svg'
import CartIcon from '../../components/cart-icon/cart-icon.component'
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component'
import {UserContext} from '../../context/context.jsx'
import {CartContext} from '../../context/cart.context'

import {Outlet, Link} from 'react-router-dom';
import './navigation.styles.scss'
import {signOutUser} from '../../utils/firebase/firebase.utils.js'

const Navigation = () => {
  const {currentUser} = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext);

  return (
    <Fragment>
       <div className= 'navigation'>
       <Link className='logo-container' to ='/'>
          <CrwnLogo className='logo' />
       </Link>
       <div className='nav-links-container'>
          <Link className='nav-link' to ='/shop'>
             Shop
          </Link>
          {
            currentUser ? (
              <span className='nav-link' onClick={signOutUser}> SIGN OUT </span> ):(
                <Link className='nav-link' to ='/auth'>
                   Sign in
                </Link>
            )
          }

          <CartIcon />
       </div>
       {isCartOpen && <CartDropdown />}
       </div>
       <Outlet />
    </Fragment>
  )
}

export default Navigation;
