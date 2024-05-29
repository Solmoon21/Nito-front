import { Delete } from "@mui/icons-material"
import { Box, IconButton, TextField } from "@mui/material"

function ItemInput({index, remove, values, setValues}) {
    const boxStyle = {
        display: 'flex',
        gap: '20px',
    }

    const handleInStockValueChange = (e) => {
        const newValues = {...values.inStock[index]}
        newValues[e.target.name] = e.target.value
        let newInStock = [...values.inStock]
        newInStock[index] = newValues;
        setValues({...values, inStock:newInStock})
    }
  
    return (
        <Box sx={boxStyle}>
            <TextField 
                type="text" 
                id={`color-${index}`}
                name='color'
                placeholder="Color"
                value={values.inStock[index]?.color}
                onChange={handleInStockValueChange}
            />
            <TextField 
                type="text" 
                id={`size-${index}`}
                name='size'
                placeholder="Size"
                value={values.inStock[index]?.size}
                onChange={handleInStockValueChange}
            />
            <TextField 
                type="number"
                id={`amount-${index}`}
                name='amount'
                placeholder="1"
                inputProps={{
                    min:'1'
                }}
                value={values.inStock[index]?.amount}
                onChange={handleInStockValueChange}
            />
            {index > 0 &&
                <IconButton onClick={() => remove(index)}>
                    <Delete />
                </IconButton>
            }
        </Box>
    )
}

export default ItemInput