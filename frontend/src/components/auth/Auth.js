import React, { useState } from 'react'
import './Auth.scss'
import axios from 'axios'
import {Form, Button} from "react-bootstrap"
import {BrowserRouter, Routes, Route} from 'react-router-dom'


const Auth = () => {
    let [form, setForm] = useState({
        email: '',
        password: '',
        fullName: '',
        passwordConfirm: ''
    })

    const sendDataRegister = async(event) => {
        try {
            setForm(form = {
                email: document.querySelector('#email-register').value,
                password:  document.querySelector('#password-register').value,
                fullName: document.querySelector('#fullName-register').value,
                passwordConfirm: document.querySelector('#password2-register').value
            })

            await axios.post('/api/auth/registration', {...form}, {
                headers: {
                    'Content-Type': 'application/json'
                    }
                })
                .then(res => console.log(res))

            setForm({
                email: '',
                password: '',
                fullName: '',
                passwordConfirm: '',
            })
        } catch (err) {
            console.log(err)
        }
    }

    const sendDataLogin = async (event) => {
        setForm(form = {
            email: document.querySelector('#email-login').value,
            password:  document.querySelector('#password-login').value,
        })

        await axios.post('/api/auth/login', {...form}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => console.log(res))

        setForm({
            email: '',
            password: ''
        })
    }

    return (
       <BrowserRouter>
           <Routes>
               <Route path="/login" element={
                   <div className="auth-page">
                       <h3>Вхід</h3>
                       <Form noValidate onSubmit={e => e.preventDefault()}>
                           <Form.Group className="mb-3" controlId="formBasicEmail">
                               <Form.Label>Електронна пошта</Form.Label>
                               <Form.Control id="email-login" type="email" placeholder="Введіть електронну пошту" />
                           </Form.Group>

                           <Form.Group className="mb-3" controlId="formBasicPassword">
                               <Form.Label>Пароль</Form.Label>
                               <Form.Control id="password-login" type="password" placeholder="Введіть пароль" />
                           </Form.Group>
                           <div className="buttons">
                               <Button onClick={sendDataLogin} className="submit-button" variant="primary" type="submit" style={{backgroundColor: 'black', border: 'none', marginRight: '20px'}}>
                                   Увійти
                               </Button>
                               <Button href="/register" variant="secondary" type="submit">Ви ще не зареєстровані?</Button>
                           </div>
                       </Form>
                   </div>}
               />
               <Route path="/register" element={
                   <div className="auth-page">
                       <h3>Реєстрація</h3>
                        <Form noValidate onSubmit={e => e.preventDefault()}>
                           <Form.Group className="mb-3" controlId="formBasicEmail">
                               <Form.Label>Електронна пошта</Form.Label>
                               <Form.Control id="email-register" type="email" placeholder="Введіть електронну пошту" />
                               <Form.Text className="text-muted">
                                   Нікому не сповіщайте свої дані!
                               </Form.Text>
                           </Form.Group>

                           <Form.Group className="mb-3" controlId="formBasicEmail">
                               <Form.Label>Як вас звуть?</Form.Label>
                               <Form.Control id="fullName-register" type="text" placeholder="Введіть ваше прізвище та ім'я" />
                           </Form.Group>

                           <Form.Group className="mb-3" controlId="formBasicPassword">
                               <Form.Label>Пароль</Form.Label>
                               <Form.Control id="password-register" type="password" placeholder="Введіть пароль" />
                               <Form.Text className="text-muted">
                                   Пароль повинен містити від 6 символів.
                               </Form.Text>
                           </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Повторення паролю</Form.Label>
                                <Form.Control id="password2-register" type="password" placeholder="Повторіть пароль" />
                            </Form.Group>

                           <div className="buttons">
                               <Button onClick={sendDataRegister} className="submit-button" variant="primary" type="submit" style={{backgroundColor: 'black', border: 'none', marginRight: '20px'}}>
                                   Зареєструватись
                               </Button>
                               <Button href="/login" variant="secondary" type="submit">Ви вже зареєстровані?</Button>
                           </div>
                       </Form>
                   </div>}
               />
           </Routes>
       </BrowserRouter>
    );
};

export default Auth;
