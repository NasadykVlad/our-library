import React, { useState, useContext } from 'react'
import './Auth.scss'
import axios from 'axios'
import {Form, Button} from "react-bootstrap"
import {AuthContext} from "../../context/AuthContext";


const Auth = () => {
    let [form, setForm] = useState({
        email: '',
        password: '',
        fullName: '',
        passwordConfirm: ''
    })

    let [rightLogin, setLogin] = useState(false)

    let [errors, setErrors] = useState([])

    const {login} = useContext(AuthContext)

    // Надсилання даних Входу
    const sendDataLogin = () => {
        setForm(form = {
            email: document.querySelector('#email-login').value,
            password:  document.querySelector('#password-login').value,
        })

        axios.post('/api/auth/login', {...form}, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.data.token && res.data.userId) {

                    login(res.data.token, res.data.userId)

                    setErrors(errors = [])
                    setLogin(rightLogin = true)

                    return (
                        document.querySelector('.navbar-brand').click()
                    )
                } else if (res.data.errors) {
                    setErrors(errors = res.data.errors)
                } else if (res.data.message && !res.data.errors) {
                    setErrors(errors = [{msg: res.data.message}])
                }
            })

        setForm({
            email: '',
            password: ''
        })
    }

    return (
       <div className="auth-page">
           <h3>Вхід</h3>
           <Form noValidate onSubmit={e => e.preventDefault()}>
               <Form.Group className="mb-3" controlId="formBasicEmail111">
                   <Form.Label>Електронна пошта</Form.Label>
                   <Form.Control id="email-login" type="email" placeholder="Введіть електронну пошту" />
               </Form.Group>

               <Form.Group className="mb-3" controlId="formBasicPassword111">
                   <Form.Label>Пароль</Form.Label>
                   <Form.Control id="password-login" type="password" placeholder="Введіть пароль" />
               </Form.Group>

               {rightLogin
                   ? <div className="rightRegister">
                       <p>Користувач успішно зареєстрований, тепер ви можете користуватись особистим кабінетом.</p>
                   </div>
                   :
                   false
               }

               {errors.length > 0
                   ? <div className="falseRegister">
                       <h5>При вводі були знайдені помилки:</h5>
                       {
                           errors.map(val => {
                               return <p>{val.msg}.</p>
                           })
                       }
                   </div>
                   :
                   false
               }


               <div className="buttons">
                   <Button onClick={sendDataLogin} className="submit-button" variant="primary" type="submit" style={{backgroundColor: 'black', border: 'none', marginRight: '20px'}}>
                       Увійти
                   </Button>
                   <Button href="/register" variant="secondary" type="submit">Ви ще не зареєстровані?</Button>
               </div>
           </Form>
       </div>
    );
};

export default Auth;
