import { loadStripe } from '@stripe/stripe-js';

const PAYMENT_URL = `http://localhost:3000/api/checkout`;

export const payByFiat = async (userId, cart) => {

    const stripe = await loadStripe('pk_test_51P3whhDKECV09vj5Wlzwfm9uC0DvHXR5JSElNMYJwxG56raD2pR96JJUkeyxD098vafegJ58OwQZYQlyvPw99Cdo00gfJ4GXm6');
    const body = {
        userId,
        products : cart
    };
    const headers = {
        'Content-Type': 'application/json'
    }
    const response = await fetch(
        `${PAYMENT_URL}/fiat`,
        {
            method:'POST',
            headers,
            body: JSON.stringify(body)
        }
    );
    const session = await response.json();
    try{
        stripe.redirectToCheckout({
            sessionId: session.id
        })
    }
    catch(e) {
        return {success: false, message: "Failed Checkout"}
    }

}


export const payByCrypto = async (amount) => {
    try{
        const response = await fetch(
            `${PAYMENT_URL}/crypto`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    price_amount : amount, 
                    price_currency: "HUF", 
                    receive_currency: "BTC", 
                    title: "Nito-OS Order Payment",
                    description: "Best Payment for Best Products"
                })
            }
        ).then(resp => resp.json())
        return response;
    }
    catch(e) {
        return {success: false, message: "Failed Checkout"}
    }

}