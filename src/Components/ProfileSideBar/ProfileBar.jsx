import './ProfileBar.css';
import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, Typography } from '@mui/material';
import { AccountBox, Login, Logout, PersonAddAlt } from '@mui/icons-material';

function ProfileBar({sideBarActive, setSideBarActive}) {
  const { auth, logOut } = useAuth();
  const navigator = useNavigate();

  const goTo = (path) => {
    navigator(`/${path}`)
  }

  const logOutHandler = () => {
    logOut();
    navigator('/')
  }

  return (
    <Drawer anchor='right' open={sideBarActive} onClose={() => setSideBarActive(false)}>
      <Box sx={{ width: 250 }} role="presentation" onClick={() => setSideBarActive(false)}>
        <List>
          <ListItem>
            <Typography>Profile Menu</Typography>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => goTo('profile')} style={{
              display: 'flex', gap:'10px'
            }} >
              <Typography style={{width:'60px'}}>Profile</Typography>

              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => {
              if(auth) logOutHandler()
              else goTo('login')
              }}
              
              style={{
                display: 'flex', gap:'10px'
              }} 
            >
              <Typography style={{width:'60px'}}>{!auth ? 'Log In' : 'Log Out'}</Typography>
              <ListItemIcon>
                {!auth ? <Login /> : <Logout /> }
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={() => goTo('register')} style={{
              display: 'flex', gap:'10px'
            }} >
              <Typography style={{width:'60px'}}>Register</Typography>
              <ListItemIcon>
                <PersonAddAlt />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  )
}

export default ProfileBar