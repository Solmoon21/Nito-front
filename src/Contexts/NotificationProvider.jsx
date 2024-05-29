import { createContext } from "react"
import { toast } from "react-toastify"

export const NotificationContext = createContext({
    notify : () => {},
    
})

export const NotificationProvider = ({children}) => {
    const NotificationTypes = {
        SUCCESS: 'success',
        ERROR: 'error',
    }

  const notify = ( type, message ) => {
    switch (type) {
        case NotificationTypes.SUCCESS:
            toast.success(message, {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light"
                });
            break;
        case NotificationTypes.ERROR:
            toast.error(message, {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                theme: "light"
                });
            break;
        default:
            break;
    }
  }

  return (
    <NotificationContext.Provider value={{notify, NotificationTypes}}>
        {children}
    </NotificationContext.Provider>
  )
}
