import HomePage from "./Pages/HomePage"
import ProductPage from "./Pages/ProductPage"
import ContactPage from "./Pages/ContactPage"
import SearchPage from "./Pages/SearchPage"
import LoginPage from './Pages/LoginPage'
import RegisterPage from "./Pages/RegisterPage"
import CheckoutPage from "./Pages/CheckoutPage"
import ProfilePage from "./Pages/ProfilePage"
import CurrentPage from "./Pages/CurrentPage"
import { CheckoutStatusPage } from "./Pages/CheckoutStatusPage"
import ProtectedRoute from "./Pages/ProtectedRoute"

import './App.css'

import { Routes, BrowserRouter as Router, Route } from "react-router-dom"

import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="app">
      <ToastContainer />
      <Router>
        <Routes>
              <Route path="/" element={<CurrentPage currentPage={<HomePage />} />} />
              <Route path="/register" element={<RegisterPage />}/>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/search/:keyword?" element={<CurrentPage currentPage={<SearchPage />} />} />
              <Route path="products/:productID" element={<CurrentPage currentPage={<ProductPage />} />} />
              <Route path="/contact" element={<CurrentPage currentPage={<ContactPage />} />} />

              <Route path="/profile" element={<CurrentPage currentPage={<ProtectedRoute />} />}>
                <Route element={<ProfilePage />} path="" />
              </Route>

              <Route path="/checkout" element={<CurrentPage currentPage={<ProtectedRoute />} />}>
                <Route element={<CheckoutPage />} path="" />
                <Route element={<CheckoutStatusPage success={true} />} path="success" />
                <Route element={<CheckoutStatusPage success={false} />} path="fail" />
              </Route>
        </Routes>
      </Router>
    </div>

  )
}

export default App
