import './Input.css'
import { Box, IconButton, Typography } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const AmountModifier = ({amount, setAmount, maxAmount}) => {

    const handleChange = (valueToAdd) => {
        let newValue = amount + valueToAdd;
        if(newValue < 0) newValue = 0;
        if(newValue > maxAmount) newValue = maxAmount;
        setAmount(newValue);
    }

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px',
            background: '#797d62',
            borderRadius: '10px',
            width: '120px'
        }}>
            <IconButton name='amount' onClick={() => handleChange(-1)} color='#f1dca7'>
                <Remove name='amount' />
            </IconButton>
            <Typography sx={{fontSize:'20px'}} >{amount}</Typography>
            <IconButton name='amount' onClick={() => handleChange(1)} color='#f1dca7'>
                <Add name='amount' />
            </IconButton>
        </Box>
    )
}

export { AmountModifier };