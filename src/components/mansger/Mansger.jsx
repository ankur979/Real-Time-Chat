import React, { useEffect, useState } from 'react';
import './mansger.css';
import SearchIcon from "@material-ui/icons/Search";
import img from "./../../img1.png"
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { allUser } from '../store/userStore/userSlice';
import AllUserData from './AllUserData';
import { baseURL } from '../baseUrl';
import axios from 'axios';

const Mansger = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    let allUserData = useSelector((state) => state.user.userData)
    const token = localStorage.getItem("user-token")

    const [conversationID, setConversationId] = useState("")
    const [message, setMessage] = useState([])
    const [user, setUser] = useState({})
   // console.log(user)

    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
        dispatch(allUser(token))
        userData()
        // eslint-disable-next-line 
    }, [allUser, token, navigate, dispatch])

    const userData = async () => {
        try {
            let { data } = await axios.get(`${baseURL}/user/user`, 
                {
                    headers: {
                        "user-token": `${token}`
                    }
                })
            setUser(data)
            return data
        }
        catch (error) {
            console.log(error.response.data)
        }
    }

  

    const conversation = async (id) => {
        try {
            let { data } = await axios.post(`${baseURL}/conversation`, {
                receivedId: id
            },
                {
                    headers: {
                        "user-token": `${token}`
                    }
                })
            // data = await data
            setConversationId(data._id)
            // console.log(conversationID)
            messageData(data._id)
            return data
        }
        catch (error) {
            console.log(error.response.data)
        }
    }

    const messageData = async (c_Id) => {
        const token = localStorage.getItem("user-token")
        console.log(c_Id)
        try {
            const { data } = await axios.post(`${baseURL}/message/allMessage`, {
                conversationId: c_Id
            },
                {
                    headers: {
                        "user-token": `${token}`
                    }
                })
            setMessage([...data])
            return data
        }
        catch (error) {
            console.log(error.response.data)
        }
    }

    // useEffect(() => {

    // }, [conversation])

    return (
        <>
            <Navbar user = {user}></Navbar>
            <div className='mansger'>
                <div className='mansger-box'>
                    <div className="conversation">
                        <div className="searchBar">
                            <input type="search" placeholder='Search your friand name, or chat' />
                            <SearchIcon className='searchIcon' />
                        </div>
                        <div className="friends">
                            <AllUserData allUserData={allUserData} conversation={conversation} />
                        </div>
                    </div>
                    <div className='chat-box'>
                        <div className="chat">
                            <div className="nav">
                                <div>
                                    <img src={img} alt="" className='friendImg' />
                                    <span>Ankur verma</span>
                                </div>
                            </div>
                        </div>
                        <div className="chating">
                            {message.map((message) => {
                                return (
                                    <div className='friend-text' key={message._id}>
                                        <p>{message.text}</p>
                                        <p style={{ textAlign: 'end' }}>3.5pm</p>
                                    </div>
                                )
                            })}
                            <div className='friend-text'>
                                <p>user ler jh nmb uihmbiuhnmbijnb jhnbhjbnmb  jbkjb kjb kjhhjb</p>
                                <p style={{ textAlign: 'end' }}>3.5pm</p>
                            </div>
                            <div className='user-text'>
                                <p>user ler jh nmb uihmbiuhnmbijnb jhnbhjbnmb  jbkjb kjb kjhhjb</p>
                                <p style={{ textAlign: 'end' }}>3.5pm</p>
                            </div>
                        </div>
                        <div className="text-input">
                            <input type="text" placeholder='Please enter your text' />
                            <button>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Mansger