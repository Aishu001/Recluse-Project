import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Component/Home'
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom"
import PorductList from './Component/PorductList'
import CartList from './Component/CartList'
import PaymentPage from './Component/PaymentPage'
import SignUp from './Component/SignUp'
import Login from './Component/Login'
import UserAccount from './Component/UserAccount'
import Admin from './Component/Admin'

function App() {
 

  return (
    <>
  
   <Router>
     <Routes>
     <Route path="/" element={<Home/>} />
      <Route path="/viewProduct" element={<PorductList/>} />
      <Route path="/viewCart" element={<CartList/>} />
      <Route path="/paymentMode" element={<PaymentPage/>} />
      <Route path="/signUp" element={<SignUp/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/adminBoard" element={<Admin/>} />
      <Route path="/viewProfile" element={<UserAccount/>} />
            </Routes>
     </Router>
    </>
  )
}

export default App
