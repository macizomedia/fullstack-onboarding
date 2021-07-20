import React from 'react'
import logo from '../../assets/img/logo.png'
import Message from '../Fragments/Message'
import Progress from 'components/Fragments/Progress'
import content from '../../content.json'

import { useAuthState } from '../../useAuth'

const Header = () => {
    let state = useAuthState()
    return (
        <>
            <div className="get-started-1">
                <div className="overlap-group">
                    <div className="status-bar">
                        <div className="navigation-bar">
                            <img
                                src={logo}
                                alt="logo_onBoarding"
                                className="voterookie-logo_header"
                            />
                        </div>
                    </div>
                </div>
                <Progress porcentage={0} />
            </div>
            {state && (
                <Message
                    title={content[0].hero}
                    span={content[0].span}
                    name={null!}
                    content={content[0].message}
                    text={content[0].text}
                    foot={content[0].foot}
                ></Message>
            )}
        </>
    )
}

export default Header
