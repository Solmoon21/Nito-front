import './SingleProduct.css'

import product_img from '../../assets/samples/products/man-cardigan2.jpg'
import { useLocation, useNavigate } from 'react-router-dom';

import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { Rating } from '@mui/material';

import useAuth from '../../Hooks/useAuth';
import { addProduct } from "../../api/product_api";

function SingleProduct({prop}) {
  const navigator = useNavigate();
  const locator = useLocation();

  const { auth } = useAuth();

  const addItemCallBack = (container) => {
    if(!auth) {  
      navigator('/login', {state : {from : locator}, replace: true } );
      return;
    }
    addProduct(auth.id, container, {color:'',size:'', productID: prop._id }, 1)
  }

  return (
    <div className="item" >
        <img className="item-img" src={prop?.previewImages?.at(0)?? product_img} alt="" 
          onClick={() => navigator(`/products/${prop._id}`, {replace:true}) } 
        />
        <div className="item-description">
            <span className="item-name">{prop?.name?? "Product 1"}</span>
            <span className="item-price">${prop?.price?? "10"}</span>
            <Rating value={prop?.rating || 2} readOnly />
          {auth && !auth.isMerchant 
            ?
              <button className="btn btn-add-to-cart" 
                onClick={e => { e.preventDefault(); addItemCallBack('cart');}}>
                  Add to cart
              </button>
            : " Action not available "
          }
          {auth && !auth.isMerchant &&
            <div className="item-actions-favorite">
              <IconButton
                onClick={e => { e.preventDefault(); addItemCallBack('wishlist');}}
              >
                <FavoriteIcon />
              </IconButton>
            </div>
          } 
      </div>
    </div>
  )
}

export default SingleProduct