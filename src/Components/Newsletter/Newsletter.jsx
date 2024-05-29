import './Newsletter.css'

import useAuth from '../../Hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { subscribe } from '../../api/user_api';
import { useNotification } from '../../Hooks/useNotification';


function Newsletter() {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const {notify, NotificationTypes} = useNotification()

  const handleSubscription = async () => {
    if(!auth) {
      navigate('/login');
      return
    }

    const response = await subscribe(auth.id);
    if(response.success){
      notify(NotificationTypes.SUCCESS, response.message)
    }
    else{
      notify(NotificationTypes.ERROR, response.message)
    }
  } 

  return (
    <div className='section section-subscribe'>
        <h3 className='section-title subscribe-title'>Subscrite to get our latest products recommendations</h3>
        <button className='btn btn-subscribe' onClick={handleSubscription}>Subscribe</button>
    </div>
  )
}

export default Newsletter