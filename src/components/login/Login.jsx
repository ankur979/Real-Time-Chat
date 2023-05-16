import React, { useState,useEffect } from 'react'
import "./login.css"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from "../baseUrl"
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const [toggle, setToggle] = useState(false);
    const [passwordHide, setPasswordHide] = useState("password");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState('');

    useEffect(() => {
        const token = localStorage.getItem("user-token")
        // console.log(token)
        if (token) {
            navigate("/")
        }
    }, [])

    const submitHandler = async () => {
        axios.post(`${baseURL}/user/login`, {
            username,
            password
        }).then((response) => {
            // console.log(response);
            localStorage.setItem("user-token", response.data.token);
            navigate("/")
            return
        }).catch((error) => {
            console.log(error.response.data.error);
            alert(error.response.data.error)
            // throw error
        })
    }

    return (
        <div className='loginPage'>
            <div className='login-box'>
                <h1>Welcome</h1>
                <label htmlFor="username">Email id or Username</label>
                <input type="text" placeholder='Please enter username or email id' onChange={(e) => setUsername(e.target.value)} />
                <label htmlFor="password">Password</label>
                <div>
                    <input type={passwordHide} value={password} placeholder='Please enter password' onChange={(e) => setPassword(e.target.value)} />
                    {toggle ? <VisibilityIcon className='toggle' onClick={(e) => {
                        e.preventDefault();
                        setToggle(false);
                        setPasswordHide("password")
                    }} /> : <VisibilityOffIcon className='toggle' onClick={(e) => {
                        e.preventDefault();
                        setToggle(true);
                        setPasswordHide("text")
                    }} />}
                </div>
                <div>
                    <Link to="/forget-pass" className='forget-password'>forget password</Link>
                </div>
                <button className='login-button' onClick={submitHandler}>Login</button>
                <p className='signup-page'>don't have an account <Link to="/signup">Sign Up</Link></p>
            </div>

        </div>
    )
}

export default Login