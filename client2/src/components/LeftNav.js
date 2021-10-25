import React from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom'

const LeftNav = () => {
    const userData = useSelector((state) => state.userReducer);

    return (
        <div className='left-nav-container' style={{float: 'left', marginLeft: '10px', position: 'fixed'}}>
            <div className="icone-home">

            <NavLink exact to='/profil' style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <img src='./logo/profil.png' alt='' width="50px"></img>
            </NavLink>
            <br/>
            <NavLink exact to='/conversation' style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <img src='./logo/messenger.png' alt='' width="50px"></img>
            </NavLink>
            <br/>
            <NavLink exact to='/reunion' style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <img src='./logo/calendrier.png' alt='' width="50px"></img>
            </NavLink>
            <br/>
            {userData.admin ? (
                <NavLink exact to='/gestion' style={{ color: 'inherit', textDecoration: 'inherit'}}>
                    <img src='./logo/gestion.png' alt='' width="50px"></img>
                </NavLink>
            ): (
                null
            )}
            </div>

        </div>
    )
}

export default LeftNav
