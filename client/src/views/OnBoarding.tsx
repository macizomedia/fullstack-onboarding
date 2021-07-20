import React from 'react'
import Form from 'components/Commons/Form'
import Header from 'components/Commons/Header'
import Avatar from 'components/Commons/Avatar'

import 'react-onboarding-pro/build/index.css'
import Onboarding from 'react-onboarding-pro'
import {/*  State,  */useAuthState, useRegister } from 'useAuth'



//TODO Onboarding process - do Fetch call at the end!

export const OnBoarding = () => {
    const state = useAuthState()
    const registerUser = useRegister()
    const config = {
        steps: [
            {
                title: 'Welcome to the platform',
                description: 'Navigate around the UI to start using it',
            },
            {
                title: 'Who are you?',
                description: 'Help the community identify you',
                type: 'form', // Have an embedded form
                fields: [
                    {
                        label: 'First Name',
                        name: 'first_name',
                        type: 'text',
                        placeholder: 'John',
                        validation: '[a-zA-Z]', // Regex expression to test for
                    },
                    {
                        label: 'Last Name',
                        name: 'last_name',
                        type: 'text',
                        placeholder: 'Doe',
                        validation: '',
                    },
                ],
                onSubmit: registerUser,
            },
        ],
        overlayClose: false,
    }
    
    Onboarding(config)

    let isVerify = state.verify
    return (
        <>
            <Header />
            {isVerify && <Avatar />}
            {!isVerify && <Form />}
        </>
    )
}
