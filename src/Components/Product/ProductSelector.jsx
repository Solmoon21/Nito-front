import { useState } from "react"
import { AmountModifier } from "../Input/Input"

import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import { Box, Button, FormControl, MenuItem, Rating, Select, Typography } from "@mui/material"

import './ProductSelector.css'
import useAuth from "../../Hooks/useAuth"
import { InputLabel } from "@mui/material"
import { AddShoppingCart } from "@mui/icons-material";


function ProductSelector({productInfo, addProductCallBack}) {
    
    const product_obj = productInfo.product;
    const productID = product_obj._id
    const {name, description, price, sizes, colors, rating} = product_obj

    const productFilters =  {
        color: '',
        size: '',
    }
    
    const [amount, setAmount] = useState(0);
    const [productWithFilters, setProductWithFilters] = useState(
       productFilters
    )
    const handleChange = (e) => {
        setProductWithFilters({...productWithFilters, [e.target.name]:e.target.value})
    }

    const handleAddProduct = (container, amount) => {
        addProductCallBack(container, {...productFilters,productID}, amount)
    }
    const availableAmount =  productInfo.inStock?.find(prod => 
        prod.color === productWithFilters.color && 
        prod.size === productWithFilters.size
    )?.amount || 0; 

    const { auth } = useAuth();

    return (
    <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'left',
    }}>
        <Box sx={{display:'flex', alignItems:'center', gap:'20px'}}>
            <h1 className="product-selector-name">{name}</h1>

            <IconButton
                onClick={() => handleAddProduct('wishlist', 1)}
            >
                <FavoriteIcon />
            </IconButton>

        </Box>
        <h3 className="product-selector-description">
            {description}
        </h3>
        <br/>
        <FormControl required>
            <InputLabel id="size-label">Size</InputLabel>
            <Select name="size" label='Size' labelId="size-label" onChange={handleChange}>
                {sizes?.map((size, idx) => (
                    <MenuItem key={`${idx}#${size}`} value={size}>{size}</MenuItem>
                ))}
            </Select>
        </FormControl>
        <br/>
        <FormControl>
            <InputLabel id="color-label">Color</InputLabel>
            <Select name='color' label='Color' labelId="color-label" onChange={handleChange}>
                {colors?.map((color, idx) => (
                    <MenuItem key={`${idx}#${color}`} value={color}>{color}</MenuItem>
                ))}
            </Select>
        </FormControl>
        <br />
        
        <Box sx={{display:'flex', alignItems:'center', gap:'20px'}}>
            <h2 className="product-selector-price">
                {price} HUF
            </h2>

            <Rating value={rating || 2} readOnly />
        </Box>
        {!auth?.isMerchant &&
            <>
                <Typography sx={{marginBottom:'10px'}}> Amount Left : {availableAmount} </Typography>

                <Box sx={{display:'flex', alignItems:'center', gap:'50px'}}>
                
                    <AmountModifier amount={amount} setAmount={setAmount} maxAmount={availableAmount}/>
                    <Button 
                        sx={{color:'#000', backgroundColor: '#f1dca7'}} 
                        startIcon={<AddShoppingCart />}
                        onClick={() => handleAddProduct('cart', amount)}
                    >
                        Add to Cart
                    </Button>
                </Box>
            </>        
        }
    </Box>
  )
}

export default ProductSelector