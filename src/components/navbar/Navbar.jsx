import "./navbar.css"
import React from 'react'

const Navbar = ({user}) => {
 // console.log(user)
  return (
    <nav className="navbar">
        <div>Welcome to the chat!</div>
        <div>Hi {user.name}!</div>
    </nav>
  )
}

export default Navbar