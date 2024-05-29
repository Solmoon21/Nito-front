import { useParams, useLocation, useNavigate } from "react-router-dom";

import ProductSelector from "../Components/Product/ProductSelector";
import Reviews from "../Components/Reviews/Reviews";

import ImageCarousel from "../Components/Carousel/ImageCarousel";

import useAuth from "../Hooks/useAuth";
import { useNotification } from "../Hooks/useNotification";
import useProduct from "../Hooks/useProduct";
import { addProduct } from "../api/product_api";
import { Grid } from "@mui/material";

function ProductPage() {
    const { auth } = useAuth();
    const {notify, NotificationTypes} = useNotification()

    const urlParams = useParams();

    const navigator = useNavigate();
    const locator = useLocation();

    const addItemToCart = async (container, productProperties, amount) => {

        if(!auth) {  
            navigator('/login', {state : {from : locator}, replace: true } );
            return;
        }

        addProduct(auth.id, container, productProperties, Math.max(amount,1) )
        notify(NotificationTypes.SUCCESS, 'Item Added')
    }

    const product = useProduct(urlParams.productID);
    console.log(product)

    return (
        <>
            {product &&

                <div className="product-page">
                    <div className="product-page-top">
                        <Grid item xs={12} md={6}>
                            <ImageCarousel images={product.product.previewImages} />
                        </Grid>
                        <ProductSelector productInfo={product} addProductCallBack={addItemToCart} />
                    </div>
                    <br />
                    <div className="product-page-mid">
                        <Reviews props={{...auth, productID :urlParams.productID}}/>
                    </div>
                    <br />
                </div>
            }
        </>
    )
}

export default ProductPage