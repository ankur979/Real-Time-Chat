import { useNavigate } from "react-router-dom"
import "./navbar.css"
import React from 'react'

const Navbar = ({ user }) => {
  // console.log(user)
 const navigate =  useNavigate()
  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem("user-token");
    navigate("/login");
  }
  return (
    <nav className="navbar">
      <div>Welcome to the chat!</div>
      <div>Hi {user.name}! <button className="btn" onClick={logout}>Logout</button></div>

    </nav>
  )
}

export default Navbar