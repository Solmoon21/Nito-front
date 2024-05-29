import { useEffect, useState } from "react"
import useAuth from "./useAuth"


function useContainer(containerType) {
    const { auth } = useAuth();
    const [container, setContaier] = useState([]);

    let path = "";
    if( auth.isMerchant ){
        path = `http://localhost:3000/api/merchant/${auth.id}/${containerType}`
    }
    else {
        path = `http://localhost:3000/api/user/${auth.id}/container?containerType=${containerType}`
    }

    useEffect(
        () => {
            const fetchPastOrders = async () => {
                
                const response = await fetch(path)
                .then(resp => resp.json());
                console.log(containerType, response);
                setContaier(response.container);
            }
            
            fetchPastOrders();
        }
    , [])
  
    return container
}

export default useContainer