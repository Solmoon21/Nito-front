import { useEffect, useState } from "react"
import useAuth from './useAuth';

function useRecommendations() {

    const { auth } = useAuth();
    const userID = auth?.id || ''
    const [recommendations, setRecommendations] = useState([]);

    useEffect(
        () => {
            const fetchRecommencations = async () => {
                const response = await fetch(
                    `http://localhost:3000/api/products/recommendations`,
                    {
                        method:'POST',
                        body: JSON.stringify({ userID })
                    }
                ).then(resp => resp.json())

                setRecommendations(response.recommendations);
            }

            fetchRecommencations();

        }
    , [userID])


  return {recommendations};
}

export default useRecommendations