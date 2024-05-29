import { useState, useEffect } from 'react'

function useReviews(productID) {
    const [reviews, setReviews] = useState([]);

    useEffect(
        () => {
            const fetchReviews = async () => {
                const response = await fetch(
                    `http://localhost:3000/api/products/reviews/${productID}`
                ).then(resp => resp.json());
                setReviews(response);
            }

            fetchReviews();
        }
    , [productID])

  return reviews;
}

export default useReviews