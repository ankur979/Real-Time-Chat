import React, { useState ,useEffect } from 'react'
import './signup.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
//import dotenv from "dotenv"
import { baseURL } from '../baseUrl';

const Signup = () => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState({ name: "", username: "", email: "", mobile: "", password: "", repeatPass: "", });

    useEffect(() => {
        const token = localStorage.getItem("user-token")
        // console.log(token)
        if (token) {
            navigate("/")
        }
    }, [navigate])

    const userDataHandle = (e) => {
        // console.log({ ...userData, [e.target.name]: e.target.value })
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }
    //console.log(baseURL)
    const submitHandle = async () => {
        if (userData.name === "" || userData.username === "" || userData.email === "" || userData.password === "" || userData.mobile === "") {
            alert("all fields are required");
            return
        } else if (userData.name.length < 3) {
            alert("Please enter name less then 3 character");
            return
        } else if (userData.username.length < 3 || userData.username.length > 10) {
            alert("Please enter username less then 3 character and maximum 10 character");
            return
        }
        else if (userData.password !== userData.repeatPass) {
            alert("Repeat password not match!");
            return
        }
        axios.post(`${baseURL}/user/create`, {
            name: userData.name,
            username: userData.username,
            email: userData.email,
            mobile: userData.mobile,
            password: userData.password
        })
            .then((response) => {
                localStorage.setItem("user-token", response.data.token);
                navigate("/")
                return response;
            })
            .catch((error) => {
                let { data } = error.response;
                alert(data.error)
            });
    }
    return (
        <div className='sign-up'>
            <div className='sign-box'>
                <h1>Create account</h1>
                <div className="sign-group">
                    <input type="text" name='name' placeholder='Neme' onChange={userDataHandle} />
                </div>
                <div className="sign-group">
                    <input type="text" name='username' placeholder='Username ' onChange={userDataHandle} />
                </div>
                <div className="sign-group">
                    <input type="text" name='email' placeholder='Email Id' onChange={userDataHandle} />
                </div>
                <div className="sign-group">
                    <input type="text" name='mobile' placeholder='Mobile No.' onChange={userDataHandle} />
                </div>
                <div className="sign-group">
                    <input type="password" name='password' placeholder='Password' onChange={userDataHandle} />
                </div>
                <div className="sign-group">
                    <input type="text" name='repeatPass' placeholder='Repeat your password' onChange={userDataHandle} />
                </div>
                <div className="signup-button">
                    <button onClick={submitHandle}>Sign Up</button>
                </div>
                <p>Have already an account ?  <Link to="/login">Login here</Link></p>
            </div>
        </div>
    )
}

export default Signup