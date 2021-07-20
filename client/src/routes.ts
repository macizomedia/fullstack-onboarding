import Home from './views/Home'
import Login from './views/Login'
import { OnBoarding } from './views/OnBoarding'
import Subscribe from './views/Subscribe'
import { Welcome } from './views/Welcome'
import { Logout } from './views/Logout'
import { NotFound } from './views/NotFound'

const Routes = [
    {
        path: '/',
        component: Home,
        isPrivate: false,
    },
    {
        path: '/login',
        component: Login,
        isPrivate: false,
    },
    {
        path: '/register',
        component: OnBoarding,
        isPrivate: false,
    },
    {
        path: '/subscribe',
        component: Subscribe,
        isPrivate: false,
    },
    {
        path: '/welcome',
        component: Welcome,
        isPrivate: true,
    },
    {
        path: '/logout',
        component: Logout,
        isPrivate: false,
    },
    {
        path: '/*',
        component: NotFound,
        isPrivate: false,
    },
]

export default Routes
