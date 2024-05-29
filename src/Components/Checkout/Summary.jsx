import { useEffect, useState } from 'react'
import './Summary.css'

import { payByCrypto, payByFiat } from '../../api/payment_api';
import useAuth from '../../Hooks/useAuth';

const totalPrice = (list) => {
    return list.reduce((acc,curr) => acc + curr.amount * curr.price, 0);
}


function Summary({ selected_items, paymentType }) {

    const { auth } = useAuth()

    const [totalFees, setTotalFees] = useState({
        items : 0,
    });

    const handlePayment = async () => {
        if(paymentType == 'fiat') payByFiat(auth.id, selected_items);
        else { 
            const responseFromServer = await payByCrypto(totalPrice(selected_items));
            window.open(responseFromServer.payment_url, '_blank');
        }
    }


    useEffect(
        () => {
            setTotalFees({...totalFees, items : totalPrice(selected_items)}) ;
        }
    , [selected_items]);

    return (
        <div className='summary'>
            <h1>Order Summary</h1>
            <div><span className="left">Total to Pay</span><span className="right">{totalFees.items}</span></div>
            <button className="btn btn-order" onClick={handlePayment}>
                Place Order
            </button>
        </div>
    )
}

export default Summary