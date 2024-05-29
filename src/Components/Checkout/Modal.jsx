import { TextField, Button, Modal, Paper } from "@mui/material";
import { useNotification } from "../../Hooks/useNotification";

function AddressForm({props}) {

    const { modalOpen, setModalOpen, userAddress, setUserAddress } = {...props};

    const { notify, NotificationTypes } = useNotification()

    const handleClose = () => {
        setModalOpen(false)
        notify(NotificationTypes.SUCCESS, 'Address Saved')
    }

    const handleChange = (e) => {
        setUserAddress({...userAddress, [e.target.name] : [e.target.value]})
    }

    return (
        <Modal
            open={modalOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper
                style={{
                    padding:'20px',
                    width:'70vw',
                    margin:'20px auto',
                    display:'flex',
                    flexDirection:'column', 
                    gap:'10px'
                }}
            >
                    <h2>Delivery Address</h2>
                    <TextField 
                        placeholder="John Doe"
                        label="Name"
                        name="name"
                        onChange={handleChange}
                    />
                    <TextField 
                        label="Street, Building, Intercom"
                        placeholder="Laputa"
                        name="street"
                        onChange={handleChange}
                    />
                    <div className="input-row" style={{display:'flex', gap:'20px'}}>
                        <TextField 
                            label="City"
                            name="city"
                            placeholder="Detroit"
                        onChange={handleChange}

                        />
                        <TextField 
                            label="Zip Code"
                            name="postal"
                            placeholder="ABC-123"
                        onChange={handleChange}

                        />
                        <TextField 
                            label="Country"
                            name="country"
                            placeholder="Marley"
                        onChange={handleChange}

                        />
                    </div>
                    <h2>Contact Info</h2>
                    <div className="input-row" style={{display:'flex', gap:'20px'}}>
                        <TextField 
                            label="Email"
                            name="email"
                            placeholder="example@gmail.com"
                            onChange={handleChange}
                        />
                        <TextField 
                            label="Phone"
                            name="phone"
                            placeholder="1234567"
                            onChange={handleChange}

                        />
                    </div>
                    <Button className="btn" onClick={handleClose}>Save</Button>
                </Paper>
        </Modal>
    )   
}

export default AddressForm;