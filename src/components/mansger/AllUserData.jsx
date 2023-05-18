import React from 'react'
import img from "./../../img1.png"

const AllUserData = ({ allUserData , conversation, friend }) => {
   
    if(!allUserData) {
        allUserData = []
    }
    return (
        
        allUserData.map((user) => {
            return(<div key={user._id} onClick={()=>conversation(user._id)} className={user._id === friend._id ?"friend":""}>
                <img src={img} alt="" className='friendImg' />
                <span>{user.name}</span>
            </div>)
        })
    )
}

export default AllUserData