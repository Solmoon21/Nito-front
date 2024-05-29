import { Grid } from "@mui/material";

import ProductCard from "../Product/ProductCard";

function Products({product_list}) {
    
    return (
        <Grid container spacing={3}>
            {product_list.map((item) => {
                return  (
                    <Grid item key={item._id} xs={12} sm={6} md={4} lg={3}>
                        <ProductCard product={item} />
                    </Grid>
                )
            })}
        </Grid>
  )
}

export default Products