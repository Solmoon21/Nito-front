import { useEffect, useState } from 'react'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'

import '../Components/Checkout/Checkout.css'
import AddressForm from '../Components/Checkout/Modal'
import Summary from '../Components/Checkout/Summary'

import Cart from '../Components/Cart/Cart';
import useContainer from '../Hooks/useContainer'


const paymentTypes = {
    fiat : 'fiat',
    crypto : 'crypto'
}

function CheckoutPage() {

    const [userAddress, setUserAddress] = useState({
        name : '',
        street : '',
        city : '',
        postal : '',
        country : '',
        email : '',
        phone : ''
    })

    const cartDB = useContainer('cart');
    const [ cart, setCart] = useState(cartDB);
    

    useEffect(
        () => {
            setCart(cartDB)
        }
    , [cartDB])

    const [paymentType, setPaymentType] = useState(paymentTypes.fiat);
    const handlePaymentTypeChange = (e) => {
        setPaymentType(e.target.value);
    }

    const [modalOpen, setModalOpen] = useState(true);
    
    return (
        <>

            <div className='checkout-page'>
               <AddressForm props={  {modalOpen, setModalOpen, userAddress, setUserAddress} }/>
            <div className='checkout'>
            <br />
            <div className="address checkout-section">
                
                <h2>Shipping Address</h2>
                <div>{userAddress.name}, {userAddress.contact_number}</div>
                <div>{userAddress.streetAddress}</div>
                <div>{userAddress.city} {userAddress.postal}, {userAddress.country}</div>

                <button className="btn btn-edit" onClick={() => {setModalOpen(true)}}>
                    Edit
                </button>
            </div>

            <div className="payment-method checkout-section">
                <h2 className='checkout-section-title'>Payment method</h2>
                <RadioGroup>
                <FormControlLabel value={paymentTypes.fiat} 
                    control={<Radio checked={paymentType === paymentTypes.fiat} />} 
                    label="Fiat"
                    onChange={handlePaymentTypeChange}
                />
                <FormControlLabel value={paymentTypes.crypto} 
                    control={<Radio checked={paymentType === paymentTypes.crypto} />} 
                    label="Crypto"
                    onChange={handlePaymentTypeChange}
                />
                </RadioGroup>
            </div>

            <div className="checkout-section">
                <h2 className='checkout-section-title'>Product list</h2>
                {cartDB.length > 0 
                    ?
                    <Cart cart={cart} setCart={setCart}/>
                    :
                    <div>Empty Cart</div>
                }
            </div>
            </div>
                <Summary selected_items={cart} paymentType={paymentType}/>
            </div>
        </>
    )
}

export default CheckoutPage