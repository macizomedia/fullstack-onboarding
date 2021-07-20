import React from 'react'
import logo from '../../assets/img/voterookie-white.png'

export const Header = () => {
    return (
        <div>
            <div className="rectangle-30"></div>
            <h1 className="title">Welcome Back!</h1>
            <div className="text">Vote Rookie missed you.</div>
            <img className="voterookie-1" src={logo} alt="vote" />
        </div>
    )
}
