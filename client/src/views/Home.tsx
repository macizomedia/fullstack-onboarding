import React from 'react'

import Header from '../components/Home/Header'
import Footer from '../components/Commons/Footer'
import { Link } from 'react-router-dom'
function Home() {
    return (
        <div>
            <Header />
            <div>
                <Link to="/login">
                    <button className="figma-button-1">
                        <span className="action-1">LOGIN</span>
                    </button>
                </Link>
                <Link to="/register">
                    <button className="figma-button-2">
                        <span className="action-2">START AS A CITIZEN</span>
                    </button>
                </Link>
                <div className="text-4">Sign up your organisation</div>
            </div>
            <Footer />
        </div>
    )
}

export default Home
