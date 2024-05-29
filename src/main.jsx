import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { AuthProvider } from './Contexts/AuthProvider.jsx'
import { NotificationProvider } from './Contexts/NotificationProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <AuthProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </AuthProvider>
  // </React.StrictMode>,
)
