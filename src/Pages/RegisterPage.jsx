import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Paper, Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

import { register } from "../api/user_api";
import { MuiTelInput } from "mui-tel-input";
import { useNotification } from "../Hooks/useNotification";

function RegisterPage () {
  const navigator = useNavigate();

  const [errors, setErrors] = useState({
    firstname: false,
    lastname: false,
    email: false,
    phone: false,
    birthday: false,
    password: false,
    confirmPassword: false,
    isMerchant: false,
    canCollectData: false,
  });

  const onChange = (e) => {
    const { name } = e.target;
    if(e.target.validity.valid)
      setErrors({...errors, [name]:false})
    else 
      setErrors({...errors, [name]:true})
  };

  const inputs = [
    {
      id: 1,
      name: "firstname",
      type: "text",
      placeholder: "First Name",
      helperText: errors.firstname 
      ? 
      "Username should be 3-16 characters and shouldn't include any special character!"
      : ''
      ,
      error: errors.firstname,
      label: "First Name",
      inputProps: {
        pattern: "^[A-Za-z0-9]{3,16}$",
      },
      onChange,
      required: true,
    },
    {
      id: 2,
      name: "lastname",
      type: "text",
      placeholder: "Last Name",
      error: errors.lastname,
      helperText: errors.lastname ?
      "Username should be 3-16 characters and shouldn't include any special character!"
      : ''
      ,
      label: "Last Name",
      inputProps: {
        pattern: "^[A-Za-z0-9]{3,16}$",
      },
      onChange,
      required: true,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      error : errors.email,
      helperText: errors.email ? 
      "It should be a valid email address!"
      : ''
      ,
      label: "Email",
      onChange,
      required: true,
    },
    {
      id: 4,
      name: "phone",
      type: "text",
      placeholder: "Phone",
      error: errors.phone,
      helperText:
        errors.phone ?
        "Phone should be 3-16 digits and shouldn't include any special character!"
        : ''
        ,
      label: "Phone",
      onChange,
      required: true,
    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      error: errors.password,
      helperText:
        errors.password ?
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!"
        :''
        ,
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      onChange,
      required: true,
    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      helperText: errors.confirmPassword ? "Must match the password above" : '',
      label: "Confirm Password",
      error: errors.confirmPassword,
      onChange,
      required: true,
    }
  ];

  const [phone, setPhone] = useState('')

  const { notify, NotificationTypes } = useNotification()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    if(data.get('password') !== data.get('confirmPassword')){
      setErrors({...errors, confirmPassword:true})
      return;
    }

    const dataToSend = {};
    data.forEach((value,key) => {
      dataToSend[key] = value;
    })
    delete dataToSend.confirmPassword;
    
    const response = register(dataToSend);
    if(response === null) {
      notify(NotificationTypes.FAIL, 'Register Failed')
    }
    else {
      notify(NotificationTypes.FAIL, 'Register Successful')

      setTimeout(
        () => {
          navigator('/login')
        }
      , 500)
    }

  };

  const onPhoneChange = (newVal) => setPhone(newVal)

  const formStyle = {
    display:'flex',
    flexDirection:'column',
    gap:'20px',
    maxWidth:'450px',
    margin:'0 auto',
    padding: '20px'
  }

  return (
    <Paper elevation={10} style={formStyle}>
      <Box component={'form'}  onSubmit={handleSubmit} sx={formStyle} >
        <Typography>Register</Typography>
        {inputs.map((input) => {
          if(input.name === 'phone') {
            return (
              <MuiTelInput value={phone} onChange={onPhoneChange} defaultCountry="HU" key={input.id} name="phone" />
            )
          }
          else {
            return (
              <TextField 
                key={input.id} 
                {...input}
              />
          )
          }
        })}
        <FormControlLabel name="isMerchant" 
          label='I am selling' 
          control={<Checkbox />} 
          />
          <FormControlLabel name="canCollectData" 
          label='I allow data collection for product suggestion' 
          control={<Checkbox />} 
          />

        <Button
              type="submit"
              endIcon={<PersonAddAltIcon />}
          >
              Register
          </Button>
      </Box>
      </Paper>
  );
}

export default RegisterPage;