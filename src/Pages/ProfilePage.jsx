import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import useAuth from '../Hooks/useAuth.jsx';

import History from '../Components/Profile/History.jsx';
import WishList from '../Components/Profile/WishList.jsx';
import Storage from '../Components/Profile/Storage.jsx';
import AddProduct from '../Components/Profile/AddProduct.jsx';

function ProfilePage() {
  const { auth } = useAuth();

  const [activeTab, setActiveTab] = useState(1);  

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };
      
  return (
    
    <>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={activeTab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Past Orders" value={1} />
                {!auth.isMerchant && <Tab label="Wish List" value={2} />}
                {auth.isMerchant && <Tab label="In Stock" value={2} />}
                {auth.isMerchant && <Tab label="Import New Product" value={3} />}
              </TabList>
            </Box>
            <TabPanel value={1}><History /></TabPanel>
            <TabPanel value={2}>
            {auth.isMerchant ?
              <Storage />
              :
              <WishList /> 
            }
            </TabPanel>

            {auth.isMerchant &&
              <TabPanel value={3}><AddProduct /></TabPanel>
            }
          </TabContext>
      </Box>
    </>    
  )
}

export default ProfilePage