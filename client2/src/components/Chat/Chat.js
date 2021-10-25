import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import '../../style/Chat.css'

const Chat = ({conversation}) => {

    const [user, setUser] = useState([])
    const usersData = useSelector((state) => state.usersData)
    const userData = useSelector((state)=>state.userReducer)

    useEffect(()=>{
        const userIdConv = conversation.members.find((m )=> m !== userData._id)

        console.log(userIdConv);

        const getUser = async ()=> {
                try {
                const res = await axios ({
                    method: 'get',
                    url: `${process.env.REACT_APP_API_URL}api/user/`+ userIdConv
                })
                setUser(res.data)
        } catch (err) {
            console.log(err);
        }
    }
        getUser()
    }, [userData, conversation])

    return (
        <div className="conv">
            <img className='convImg' src={user.photo} alt=''/>
            <span className="convName">{user.prenom} {" "} {user.nom} </span>
        </div>
    )
}

export default Chat
