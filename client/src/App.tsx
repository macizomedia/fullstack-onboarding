/**
 * OnBoarding System Typescript React sass
 *
 * @version 1.0.1
 * @author [Blas Oronoz](https://github.com/macizomedia)
 * @author [add name](https://github.com/yourgithub)
 */


import React, { Suspense } from 'react'
import { AppRoutes } from './router'
import { AuthProvider } from './useAuth'
import { State } from './useAuth'

/* main SASS classes location IMPORTANT! 
note that when using styled-components
this classes are remove from global CSS */

import './assets/sass/main.scss'

const defaultState: State = {
    verify: false,
}
function App() {
    return (
        <>
            <Suspense fallback={<span>waiting...</span>}>
                <AuthProvider initialState={defaultState}>
                    <AppRoutes />
                </AuthProvider>
            </Suspense>
        </>
    )
}

export default App
