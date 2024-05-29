import { useEffect, useState } from 'react'
import useAuth from './useAuth';

function useProduct(productID) {
    const { auth } = useAuth();

    const [ product, setProduct ] = useState(null);
 
    useEffect(
        () => {
            const fetchProduct = async () => {
                
                const product = await fetch(
                    `http://localhost:3000/api/products/${productID}`,
                    {
                        method: 'POST',
                        body: auth?.id || ''
                    }
                ).then(resp => resp.json());
                setProduct(product);
            }

            fetchProduct();
        }
    , [productID])

    return product;
}

export default useProduct