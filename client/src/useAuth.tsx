import React, {
    useReducer,
    useCallback,
    createContext,
    useContext,
} from 'react'
import axios from 'axios'
let endpoint = 'http://localhost:4040/api/v1'

const config = {
    headers: {
        'Content-Type': 'application/json',
    },
}

export interface State {
    id?: number
    name?: string
    avatar?: string
    email?: string
    confirmEmail?: string
    email_verified_at?: string
    phone?: string
    password?: string
    verify: boolean
    token?: string
    message?: string
    interest?: any[]
    settings?: {}
    store?: []
    project?: []
}

export const defaultState: State = {
    name: 'Guest',
    confirmEmail: 'mail@mail.com',
    verify: false,
}

type ActionType =
    | {
          type: 'SUBSCRIBE'
          id: number
          name: string
          email: string
          verify: boolean
      }
    | {
          type: 'REGISTER'
          name: string
          email: string
          confirmEmail: string
          password: string
          verify: boolean
      }
    | {
          type: 'LOGIN'
          id: string
          password: string
          email: string
          token: string
          verify: boolean
      }
    | { type: 'ERROR'; message: string; verify: boolean }
    | { type: 'LOGOUT' }

type useAuthStateType = ReturnType<typeof useAuth>

const AuthContext = createContext<useAuthStateType>({
    state: defaultState,
    subscribeUser: () => {},
    loginUser: () => {},
    registerUser: () => {},
    logoutUser: () => {},
})

export function useAuth(initialState: State): {
    state: State
    loginUser: (ref: HTMLInputElement[]) => void
    subscribeUser: (data: State) => void
    registerUser: (data: State) => void
    logoutUser: (e: { preventDefault(): void }) => void
} {
    const [state, dispatch] = useReducer(
        (state: State, action: ActionType): State => {
            //console.log({...state, action})
            switch (action.type) {
                case 'SUBSCRIBE':
                    return {
                        ...state,
                        email: action.email,
                        name: action.name,
                        verify: action.verify,
                        id: Math.floor(Math.random() * 13) + 1,
                    }
                case 'REGISTER':
                    return {
                        ...state,
                        name: action.name,
                        email: action.email,
                        verify: action.verify,
                        id: Math.floor(Math.random() * 13) + 1,
                    }
                case 'LOGIN':
                    return {
                        ...state,
                        password: action.password,
                        email: action.email,
                        verify: action.verify,
                        token: action.token,
                    }
                case 'LOGOUT':
                    return {
                        ...state,
                        token: '',
                        verify: false,
                    }
                case 'ERROR':
                    return {
                        message: action.message,
                        verify: action.verify,
                    }
                default:
                    return defaultState
            }
        },
        initialState
    )

    const subscribeUser = useCallback((data) => {
        console.log(data)
        let body = {
            name: data.name,
            email: data.email,
            password: data.password,
        }
        let response = axios.post(endpoint + '/users', body, config)
        response.then((result) => {
            if (result.data) {
                console.log('d', result.data.data)
                dispatch({
                    type: 'SUBSCRIBE',
                    id: 1,
                    name: data.name,
                    email: data.email,
                    verify: true,
                })
            } else {
                console.log(result.data)
                dispatch({
                    type: 'ERROR',
                    message: 'invalid credentials',
                    verify: false,
                })
            }
        })
    }, [])

    const loginUser = useCallback((ref: HTMLInputElement[]) => {
        //TODO Adapt body to useForm hook data
        let body = { email: ref[0].value, password: ref[1].value }
        let response = axios.post(endpoint + 'users/login', body, config)
        response.then((result) => {
            if (result.data.token) {
                console.log('LOGIN')
                dispatch({
                    type: 'LOGIN',
                    id: result.data.id,
                    email: result.data.email,
                    password: result.data.password,
                    token: result.data.token,
                    verify: false,
                })
                sessionStorage.setItem(
                    'Token',
                    JSON.stringify(result.data.token)
                )
                localStorage.setItem('currentUser', JSON.stringify(result.data))
            } else {
                dispatch({
                    type: 'ERROR',
                    message: 'invalid credentials',
                    verify: false,
                })
            }
        })
    }, [])

    const registerUser = useCallback((data) => {
        console.log(data)
        let body = { ...data }
        let response = axios.post(endpoint + '/users', body, config)
        response.then((result) => {
            //console.log({...result})
            if (result.status === 201) {
                dispatch({
                    type: 'REGISTER',
                    name: data.name,
                    email: data.email,
                    confirmEmail: 'no',
                    password: data.password,
                    verify: true,
                })
                localStorage.setItem('currentUser', JSON.stringify(data))
            }
        })
    }, [])
    const logoutUser = useCallback((e: { preventDefault(): void }) => {
        e.preventDefault()
        dispatch({
            type: 'LOGOUT',
        })
        localStorage.removeItem('currentUser')
    }, [])

    return { state, subscribeUser, loginUser, registerUser, logoutUser }
}

export const AuthProvider: React.FunctionComponent<{
    initialState: State
}> = ({ initialState, children }) => (
    <AuthContext.Provider value={useAuth(initialState)}>
        {children}
    </AuthContext.Provider>
)

export const useAuthState = (): State => {
    const { state } = useContext(AuthContext)
    return state
}

export const useSubscribe = (): useAuthStateType['subscribeUser'] => {
    const { subscribeUser } = useContext(AuthContext)
    return subscribeUser
}

export const useRegister = (): useAuthStateType['registerUser'] => {
    const { registerUser } = useContext(AuthContext)
    return registerUser
}

export const useLogin = (): useAuthStateType['loginUser'] => {
    const { loginUser } = useContext(AuthContext)
    return loginUser
}

export const useLogout = (): useAuthStateType['logoutUser'] => {
    const { logoutUser } = useContext(AuthContext)
    return logoutUser
}
