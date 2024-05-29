import { useState } from 'react';
import ItemInput from './ItemInput';

import './AddProduct.css';

import { InputAdornment, Box, Button, TextField, Typography, Checkbox, MenuItem, Select, FormControlLabel, Radio, FormControl, FormLabel, RadioGroup } from "@mui/material"

import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { uploadImages, uploadForm } from '../../api/merchant_api';

import useAuth from '../../Hooks/useAuth';
import { useNotification } from '../../Hooks/useNotification';

function AddProduct() {
  const { auth } = useAuth();
  const { notify, NotificationTypes } = useNotification()

  const [numberOfItemTypes, setNumberOfItemTypes] = useState(1);


  const [files, setFiles] = useState([]);
  const handleFileChange = (event) => {
      setFiles(event.target.files);
  };

  const [values, setValues] = useState({
      name: '',
      description: '',
      price: '',
      gender: [],
      category: '',
      amount: 1,
      inStock: [{color:'', size:'', amount:''}],
      previewImages: ''
  })

  const removeItemTypeInput = (index) => {
    setNumberOfItemTypes(numberOfItemTypes - 1);
    const newInStock = [...values.inStock];
    newInStock.splice(index,1);
    setValues({...values, inStock:newInStock});
  }


  const [errors, setErrors] = useState({
      name: false,
      description: false,
      colors: false,
      price: false,
      sizes: false,
      gender: false,
      amount: false,
      previewImages: false
  })

  const handleChange = (e) => {
    let { name, value } = e.target;
    if(['colors', 'sizes'].includes(name) && value !== ''){
        value = value.split(',').map(val => val.trim());
    }
    setValues(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (e.target.validity.valid) {
      setErrors({...errors, [e.target.name]:false});
    } else {
      setErrors({...errors, [e.target.name]:true});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imagesForm = new FormData();
    for (let i = 0; i < files.length; i++) {
        imagesForm.append('previewImages', files[i]);
    }
    const responseImg = await uploadImages(imagesForm);
    if(!responseImg.success) {
      notify(NotificationTypes.ERROR, responseImg.message)
      return;
    }

    const dataToUpload = {...values, previewImages:responseImg.urls}
    const responseForm = await uploadForm(dataToUpload, auth.id);
    if(responseForm.success){
      notify(NotificationTypes.SUCCESS, responseForm.message)
    }
    else{
      notify(NotificationTypes.ERROR, responseForm.message)
    }
  } 

  const handleGender = (e) => {
    let newGender = [...values.gender];
    if(e.target.checked){
      newGender.push(e.target.value)
    }
    else{
      newGender = newGender.filter((sex) => sex !== e.target.value)
    }
    setValues({...values, gender:newGender})
  }

  return (
    <Box component='form' onSubmit={handleSubmit} 
            autoComplete="false"
            sx={{
                background:'#fff', 
                display:'flex', 
                flexDirection:'column', 
                width:'400px',
                gap:'20px', 
                padding:'10px'
            }}
        >
            <Typography sx={{color:'#000'}}>Sell New Product</Typography>
            <TextField 
                type="text" 
                label='Name'
                name="name"
                required
                value={values.name}
                onChange={handleChange}
                error={errors.name}
                helperText={
                    errors.name ? 'Name must contains only 3-16 alphabets.' : ''
                }    
                inputProps={{
                    pattern: '\\d\\w+{3,16}'
                }}    
            />

            <TextField 
                type="text" 
                label='Description'
                name="description"
                required
                value={values.description}
                onChange={handleChange}
                error={errors.description}    
                helperText={
                    errors.description ? 'Please provide a description for customers' : ''
                }    
            />

            <TextField 
              type="number" 
              label='Price'
              name="price"
              required
              value={values.price}
              onChange={handleChange}
              error={errors.price}
              helperText={
                errors.price ? 'Must be a valid price' : ''
              }    
              inputProps={{ min: '0', step: '0.01' }}
            />

          <Box sx={{display:'flex'}}>
            <FormControlLabel control={<Checkbox onChange={handleGender} value='female' />} label="Female" />
            <FormControlLabel control={<Checkbox onChange={handleGender} value='male' />} label="Male" />
          </Box>
          
      <FormControl component="fieldset">
      <FormLabel component="legend">Clothing Category</FormLabel>
      <RadioGroup
        name="category"
        value={values.category}
        onChange={handleChange}
      >
        <FormControlLabel
          value="Headwear"
          control={<Radio />}
          label="Headwear"
        />
        <FormControlLabel
          value="Upperbodywear"
          control={<Radio />}
          label="Upperbodywear"
        />
        <FormControlLabel
          value="Lowerbodywear"
          control={<Radio />}
          label="Lowerbodywear"
        />
        <FormControlLabel
          value="Footwear"
          control={<Radio />}
          label="Footwear"
        />
      </RadioGroup>
    </FormControl>
            
      <FormLabel id='season-label'>Suitable Season</FormLabel>
      <Select
        labelId="season-label"
        id="season"
        name='season'
        value={values.season}
        onChange={handleChange}
      >
        <MenuItem value="Winter">Winter</MenuItem>
        <MenuItem value="Spring">Spring</MenuItem>
        <MenuItem value="Summer">Summer</MenuItem>
        <MenuItem value="Autumn">Autumn</MenuItem>
      </Select>

          <TextField 
              type="file"
              name="previewImages"
              inputProps={{
                  multiple:true
              }}
              onChange={handleFileChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AddPhotoAlternateIcon />
                  </InputAdornment>
                )
              }} 
          />
          <Box sx={{display:'flex', flexDirection:'column', gap:'20px'}}>
            <Typography sx={{textAlign:'left'}}>Enter Color, Size and Amount</Typography>
          {Array.from({length:numberOfItemTypes},(_,idx) => idx).map(
            (idx) =>
              <ItemInput key={idx} index={idx} remove={removeItemTypeInput} 
              values={values} setValues={setValues}
            />
            )
          }
        </Box>

            <Button
                type="button"
                onClick={() => setNumberOfItemTypes(numberOfItemTypes + 1)}
                endIcon={<AddBusinessIcon />}
            >
                Add New Colors and Sizes
            </Button>

          <Button
              type="submit"
              endIcon={<AddBusinessIcon />}
          >
              Add Product
          </Button>
        </Box>
  );

   
}

export default AddProduct;
