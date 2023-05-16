import React from 'react';
import './forget-pass.css'

const ForgetPass = () => {
  return (
    <div className='forget-pass'>
        <div className='forget-box'>
            <h2>Forget Password</h2>
            <input type="email" placeholder='Please enter Email Id' />
            <button className='forget-button'>Send Mail</button>
        </div>
    </div>
  )
}

export default ForgetPass