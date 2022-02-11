import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Auth from './components/auth/Auth'
import Register from "./components/register/register";
import Landing from "./components/landing/landing";
import Features from "./components/features/features";
import About from "./components/about/about";
import FileCloud from "./components/filecloud/filecloud"
import ListOfBooks from "./components/list-of-books/list-of-books";
import ResetPassword from './components/resetPassword/resetPassword'
import Account from "./components/account/account";


export const useRoutes = (isLogin) => {
    if (isLogin) {
        return (
            <Routes>
                <Route path="/" exact element={<ListOfBooks/>}/>
                <Route path="/list-of-books" exact element={<ListOfBooks/>}/>
                <Route path="/filecloud" exact element={<FileCloud/>}/>
                <Route path="/account" exact element={<Account/>}/>
            </Routes>
        )
    } else {
        return (
            <Routes>
                <Route path="/" exact element={<Landing/>}/>
                <Route path="/features" exact element={<Features/>}/>
                <Route path="/about" exact element={<About/>}/>
                <Route path="/login" exact element={<Auth/>}/>
                <Route path='/register' exact element={<Register/>}/>
                <Route path='/resetPassword' exact element={<ResetPassword/>}/>
            </Routes>
        )
    }
}
