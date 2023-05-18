import React, { useEffect, useRef, useState } from 'react';
import './mansger.css';
import SearchIcon from "@material-ui/icons/Search";
import img from "./../../img1.png"
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { allUser } from '../store/userStore/userSlice';
import AllUserData from './AllUserData';
import { baseURL, socket_url } from '../baseUrl';
import axios from 'axios';
import { io } from 'socket.io-client'
import moment from 'moment'

const Mansger = () => {
    const [conversationID, setConversationId] = useState("")
    const [text, setText] = useState("")
    const [message, setMessage] = useState([])
    const [user, setUser] = useState({})
    const [friend, setFriend] = useState({})
    const [arrivalMessage, setArrivalMessage] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const scrollRef = useRef();
    const socket = useRef()

    let allUserData = useSelector((state) => state.user.userData);
    const token = localStorage.getItem("user-token")

    // console.log(user)

    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
        dispatch(allUser(token))
        userData()
        // eslint-disable-next-line 
    }, [allUser, token, navigate, dispatch]);

    useEffect(() => {
        socket.current = io(socket_url);
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            })
        })
    }, []);

    useEffect(() => {
        arrivalMessage && friend._id === arrivalMessage.sender && setMessage((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, friend]);

    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUser",(user)=>{})
    }, [user]);

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

    const userFriend = async (id) => {
        try {
            let { data } = await axios.get(`${baseURL}/user/friend/${id}`,
                {
                    headers: {
                        "user-token": `${token}`
                    }
                })
            setFriend(data)
            return data
        }
        catch (error) {
            console.log(error.response.data)
        }
    }



    const conversation = async (id) => {
        userFriend(id)
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

    // sendMessage 

    const sendMessage = async (e) => {
        e.preventDefault();
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId: friend._id,
            text: text,
        });
        try {
            const { data } = await axios.post(`${baseURL}/message`, {
                conversationId: conversationID,
                sender: user._id,
                text: text
            }, {
                headers: {
                    "user-token": `${token}`
                }
            })
            //  console.log(data);
            setMessage([...message, data])
            setText("")
            return data

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [message])

    return (
        <>
            <Navbar user={user}></Navbar>
            <div className='mansger'>
                <div className='mansger-box'>
                    <div className="conversation">
                        <div className="searchBar">
                            <input type="search" placeholder='Search your friand name, or chat' />
                            <SearchIcon className='searchIcon' />
                        </div>
                        <div className="friends">
                            <AllUserData allUserData={allUserData} conversation={conversation} friend={friend} />
                        </div>
                    </div>
                    <div className='chat-box'>
                        <div className="chat">
                            <div className="nav">
                                <div>
                                    <img src={img} alt="" className='friendImg' />
                                    <span>{friend.name}</span>
                                </div>
                            </div>
                        </div>
                        <div className="chating"  >
                            <div className="chating-start">{message.length <= 0 && "Open a conversation to start a chat"}</div>
                            {message.map((message,index) => {
                                return (
                                    <div className={message.sender === user._id ? "user-text" : "friend-text"} key={index} ref={scrollRef}>
                                        <p>{message.text}</p>
                                        <p style={{ textAlign: 'end' }}>{moment(message.createdAt).fromNow()}</p>
                                        {/* <p style={{ textAlign: 'end' }}>{format(message.createdAt)}</p> */}
                                        
                                    </div>
                                )
                            })}
                        </div>
                        <form onSubmit={sendMessage} className="text-input">
                            <input type="text" disabled={!friend.name} value={text} placeholder='Please enter your text' onChange={(e) => setText(e.target.value)} />
                            <button disabled={text.length === 0} type='submit' onClick={sendMessage}>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Mansger