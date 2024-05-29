import { Paper, TextField, Typography } from "@mui/material"

import emailjs from '@emailjs/browser'
import { useRef } from "react"
import { useNotification } from "../Hooks/useNotification"

const formStyle = {
  display:'flex',
  flexDirection:'column',
  gap:'20px',
  maxWidth:'450px',
  margin:'0 auto',
  padding: '20px'
}

function ContactPage() {
  const formRef = useRef(null)
  const {notify, NotificationTypes} = useNotification()

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs.sendForm('default_service', 'template_r717uc3', formRef.current, {
      publicKey: 'H7iwUc0C3XqIzBDp8',
    }).then(() => notify(NotificationTypes.SUCCESS, 'Email Sent!'), 
    () => notify(NotificationTypes.ERROR, 'Something Went Wrong'))
  }

  return (
    <Paper>
      <form style={formStyle} ref={formRef} onSubmit={sendEmail}>
        <Typography>Contact us</Typography>
        <TextField name="user_email" placeholder="example@gmail.com" label="Enter your email" fullWidth/>
        <TextField name="topic" placeholder="Trouble logging in" label="What happened?" fullWidth/>
        <TextField
          name="message"
          placeholder="" 
          label="Please explain in details" 
          multiline
          rows={4}
          fullWidth
        />
        <button type="submit" className="btn">Submit</button>
      </form>
    </Paper>
  )
}

export default ContactPage