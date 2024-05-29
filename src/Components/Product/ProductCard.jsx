import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import useAuth from '../../Hooks/useAuth';
import { addProduct } from "../../api/product_api";

import { useLocation, useNavigate } from 'react-router-dom';
import { Rating } from '@mui/material';
import { useNotification } from '../../Hooks/useNotification';


const ProductCard = ({ product }) => {
    const navigator = useNavigate();
    const locator = useLocation();

    const { auth } = useAuth();
    const { notify, NotificationTypes } = useNotification()

    const productID = product._id
    const { name, price, rating, previewImages } = product

    const addItemCallBack = (container) => {
        if(!auth) {  
          navigator('/login', {state : {from : locator}, replace: true } );
          return;
        }
        addProduct(auth.id, container, {color:'',size:'', productID }, 1)
        notify(NotificationTypes.SUCCESS, 'Product Added')
    }


  return (
    <Card 
      sx={{ minWidth: 200, maxWidth:250, padding:'10px' }}
      onClick={() => navigator(`/products/${productID}`)}
    >
      <CardMedia
        component="img"
        sx={{ height: 200, objectFit: 'cover' }}
        image={previewImages?.at(0)}
        alt={name}
        onClick={() => navigator(`/products/${_id}`, {replace:true}) }
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {price} HUF
        </Typography>
        <Rating value={rating} readOnly />
      </CardContent>
      <CardActions>
        <Button 
            size="small" 
            startIcon={<AddShoppingCartIcon />} 
            disabled={auth?.isMerchant}
            onClick={e => { e.preventDefault(); addItemCallBack('cart');}}
        >
          Add to Cart
        </Button>
        <IconButton 
            disabled={auth?.isMerchant} 
            aria-label="add to favorites"
            onClick={e => { e.preventDefault(); addItemCallBack('wishlist');}}
        >
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default ProductCard;
