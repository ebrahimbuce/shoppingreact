import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from './CartSlice';

const styles = {
  checkoutContainer: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: '20px auto',
  },

  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    borderBottom: '2px solid #ddd',
    padding: '10px',
    textAlign: 'left',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  tr: {
    '&:hover': {
      backgroundColor: '#f1f1f1',
    },
  },
  checkoutButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  checkoutDialog: {
    width: '400px',
    gap: '10px',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: '20px auto',
  },
};

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleCheckout = (e) => {
    e.preventDefault();
    alert('Thank you for your purchase!');
    dispatch(clearCart());
  };

  if (cartItems.length === 0) {
    return (
      <div style={styles.checkoutContainer}>
        <h2>Your cart is empty</h2>

        <p>Please add some products to your cart before proceeding to checkout.</p>
      </div>
    );
  }

  return (
    <div style={styles.checkoutContainer}>
      <table style={styles.table}>
        <thead>
          <tr style={styles.tr}>
            <td style={styles.td}>Product</td>
            <td style={styles.td}>Price</td>
            <td style={styles.td}>Quantity</td>
            <td style={styles.td}>Total</td>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id} style={styles.tr}>
              <td style={styles.td}>{item.name}</td>
              <td style={styles.td}>{item.cost}</td>
              <td style={styles.td}>{item.quantity}</td>
              <td style={styles.td}>{item.cost * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <button style={styles.checkoutButton} onClick={handleCheckout}>
          Proceed to Checkout
        </button>
      </div>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <h2>Total Amount: ${cartItems.reduce((total, item) => total + item.cost * item.quantity, 0).toFixed(2)}</h2>
      </div>
    </div>
  );
}
