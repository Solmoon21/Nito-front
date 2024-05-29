import { Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const ProtectedRoute = () => {

    const { auth } = useAuth();
    const navigator = useNavigate();

    if(auth === null) {
        setTimeout(
            () => {
                navigator('/login')
            }
        , 500)
    }
    
    return (
        <> {auth !== null ? <Outlet /> : ''} </>
    )
}

export default ProtectedRoute;