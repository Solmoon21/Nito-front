import { IconButton } from '@mui/material';
import './Cart.css';
import { Delete } from '@mui/icons-material';
import { useNotification } from '../../Hooks/useNotification';

function ProductListing({ cart, setCart }) {
    const { notify, NotificationTypes } = useNotification()
  
    const removeProduct = (idx) => {
      setCart(
        cart.filter((_,i) => idx !== i)
      ) 
      notify(NotificationTypes.SUCCESS, 'Item Removed')
    }

  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Image</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {cart.map((product, index) => (
          <tr key={index}>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.price * product.amount}</td>
            <td><img src={product.image} alt={product.name} /></td>
            <td>
              <IconButton onClick={() => removeProduct(index)}>
                <Delete />
              </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ProductListing;
