import { Routes, Route } from 'react-router-dom'
import { Login } from './components/Login'
import { Display } from './components/Display'
import { Register } from './components/Register'
import { AuthContextLoginProvider } from './contexts/AuthLogin'

function MainRouter() {

    return (
        <AuthContextLoginProvider>
            <Routes>
                <Route path='/' Component={Login} />
                <Route path='/users/create' Component={Register} />
                <Route path='/users/me' Component={Display} />
            </Routes>
        </AuthContextLoginProvider>
    )
}

export default MainRouter