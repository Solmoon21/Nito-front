export const addProduct = async (userID, container, productProperties, amount) => {
    try{
        await fetch("http://localhost:3000/api/user/addremoveproduct", 
        {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify( {
                userID,
                container,
                productProperties,
                ammount : amount,
                operation : 'add',
            })
        })
    }
    catch(e){
        return {success: false, message: "Couldn't add product"}
    }

}


export const submitReview = async (firstname, userID, productID, reivewText, rating) => {
    try{
        const response = await fetch(
            'http://localhost:3000/api/user/submitreview',
            {
                method : 'POST',
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify({
                    name : firstname,
                    userID, 
                    productID,
                    text : reivewText,
                    rating
                })
            }
        )
        const body = await response.json()
        return {success: response.ok, ...body};
    }
    catch(e){
        return {success: false, message: "Couldn't submit review"}

    }
}