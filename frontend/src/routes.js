import React from 'react'
import {Routes, Route} from 'react-router-dom'
import MainPage from './components/mainPage/mainPage'
import Auth from './components/auth/Auth'
import Register from "./components/register/register";



export const useRoutes = (isLogin) => {
    if (isLogin) {
        return (
            <Routes>
                <Route path="/" exact element={<MainPage />} />
            </Routes>
        )} else {
        return (
            <Routes>
                <Route path="/login" exact element={<Auth />}/>
                <Route path='/register' exact element={ <Register />} />
            </Routes>
        )
    }
}
