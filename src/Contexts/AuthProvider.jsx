import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const userData = JSON.parse(localStorage.getItem('nito'));

    const [auth, setAuth] = useState(userData);
    
    const logOut = () => {
        setAuth(null);
    }

    return (
        <AuthContext.Provider value={{ auth, setAuth, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;