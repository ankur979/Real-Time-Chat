import React from 'react'
import img from "./../../img1.png"

const AllUserData = ({ allUserData , conversation }) => {
    if(!allUserData) {
        allUserData = []
    }
    return (
        
        allUserData.map((user) => {
            return(<div key={user._id} onClick={()=>conversation(user._id)}>
                <img src={img} alt="" className='friendImg' />
                <span>{user.name}</span>
            </div>)
        })
    )
}

export default AllUserData