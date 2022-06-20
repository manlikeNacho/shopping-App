import {useContext} from 'react';
import './product-card.styles.scss'

import Button from '../button/button.component'
import {CartContext} from '../../context/cart.context'

const ProductCard = ({product}) => {
  const {name, price,imageUrl} = product;
  const {addItemToCart} = useContext(CartContext);

  const addProducttoCart = () => addItemToCart(product)

  return (
    <div className="product-card-container">
        <img src={imageUrl} alt= {`${name}`}/>
      <div>
            <span className='name'>{name}</span>
            <span className='price'>{price}</span>
    </div>
    <Button buttonType ="inverted" onClick={addProducttoCart}> Add to Card </Button>
    </div>
  )
}

export default ProductCard;
