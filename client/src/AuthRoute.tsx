import React, { useContext } from 'react'
import { RouteComponentProps, Route } from 'react-router-dom'
import Home from 'views/Home'
import { SessionContext } from './sessions'

interface Props {
    Component: React.FC<RouteComponentProps>
    path: string
    exact?: boolean
    isPrivate: boolean
}

const AuthRoute = ({
    Component,
    path,
    exact = false,
    isPrivate,
    ...rest
}: Props): JSX.Element => {
    const { session } = useContext(SessionContext)
    return (
        <>
            {isPrivate && !Boolean(session) ? (
                <Route path="/" component={Home} />
            ) : (
                <Route
                    path={path}
                    render={(props) => <Component {...props} />}
                />
            )}
        </>
    )
}

export default AuthRoute
