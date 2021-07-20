import React, { useState } from 'react'
import {
    RouteComponentProps,
    Router,
    StaticContext,
    Switch,
} from 'react-router'
import { createBrowserHistory } from 'history'
import { useAuthState } from 'useAuth'
import AuthRoute from './AuthRoute'
import Routes from './routes'
import { SessionContext, getSessionCookie } from './sessions'

const history = createBrowserHistory()

export const AppRoutes = () => {

    let currentState = useAuthState()

    console.log(currentState)
    
    const [session, setSession] = useState(getSessionCookie())
    return (
        <SessionContext.Provider value={{ session, setSession }}>
            <Router history={history}>
                <Switch>
                    {Routes.map((route, index) => (
                        <AuthRoute
                            key={index}
                            path={route.path}
                            isPrivate={route.isPrivate}
                            exact
                            Component={
                                route.component as unknown as React.FC<
                                    RouteComponentProps<
                                        {},
                                        StaticContext,
                                        unknown
                                    >
                                >
                            }
                        />
                    ))}
                </Switch>
            </Router>
        </SessionContext.Provider>
    )
}
