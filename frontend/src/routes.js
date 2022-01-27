import React from 'react'
import {Routes, Route} from 'react-router-dom'
import MainPage from './components/mainPage/mainPage'
import Auth from './components/auth/auth'
import Register from "./components/register/register";
import Landing from "./components/landing/landing";
import Features from "./components/features/features";
import About from "./components/about/about";
import ListOfBooks from "./components/list-of-books/list-of-books";


// Оприділяємо по змінній isLogin, які сторінки показувати, чи лендінг чи особистий кабінет
export const useRoutes = (isLogin) => {
    if (isLogin) {
        return (
            <Routes>
                <Route path="/" exact element={<MainPage />} />
                <Route path="/list-of-books" exact element={<ListOfBooks />} />
            </Routes>
        )} else {
        return (
            <Routes>
                <Route path="/" exact element={<Landing />}/>
                <Route path="/features" exact element={<Features />} />
                <Route path="/about" exact element={<About />} />
                <Route path="/login" exact element={<Auth />}/>
                <Route path='/register' exact element={ <Register />} />
            </Routes>
        )
    }
}