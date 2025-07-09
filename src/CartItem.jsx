import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Checkout from './Checkout';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const [openCheckout, setOpenCheckout] = useState(false);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => {
        return total + item.cost * item.quantity;
      }, 0)
      .toFixed(2); // Return total amount rounded to 2 decimal places
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleIncrement = (item) => {
    // Increment the quantity of the item in the cart
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
    // If the item is not in the cart, add it with quantity 1
    if (!cart.some((cartItem) => cartItem.id === item.id)) {
      dispatch(updateQuantity({ id: item.id, quantity: 1 }));
    }
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      // If quantity is 1, remove the item from the cart
      dispatch(removeItem(item));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return item.cost * item.quantity;
  };

  // open checkout modal
  const handleToggleCheckout = () => {
    setOpenCheckout(!openCheckout);
  };

  return (
    <div className='cart-container'>
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map((item) => (
          <div className='cart-item' key={item.name}>
            <img className='cart-item-image' src={item.image} alt={item.name} />
            <div className='cart-item-details'>
              <div className='cart-item-name'>{item.name}</div>
              <div className='cart-item-cost'>{item.cost}</div>
              <div className='cart-item-quantity'>
                <button className='cart-item-button cart-item-button-dec' onClick={() => handleDecrement(item)}>
                  -
                </button>
                <span className='cart-item-quantity-value'>{item.quantity}</span>
                <button className='cart-item-button cart-item-button-inc' onClick={() => handleIncrement(item)}>
                  +
                </button>
              </div>
              <div className='cart-item-total'>Total: ${calculateTotalCost(item)}</div>
              <button className='cart-item-delete' onClick={() => handleRemove(item)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className='continue_shopping_btn'>
        <button className='get-started-button' onClick={(e) => handleContinueShopping(e)}>
          Continue Shopping
        </button>
        <br />
        <button className='get-started-button1' onClick={handleToggleCheckout}>
          Checkout
        </button>
      </div>
      {openCheckout && <Checkout />}
    </div>
  );
};

CartItem.propTypes = {
  onContinueShopping: PropTypes.func.isRequired,
};

export default CartItem;
