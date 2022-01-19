import React, { useState } from 'react'
import './register.scss'
import axios from 'axios'
import {Form, Button} from "react-bootstrap"

const Register = () => {
    let [form, setForm] = useState({
        email: '',
        password: '',
        fullName: '',
        passwordConfirm: ''
    })

    let [rightRegister, setRegister] = useState(false)

    let [errors, setErrors] = useState([])


    // Надсилання даних Реєстрації
    const sendDataRegister = async() => {
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
                .then(res => {
                    if (res.data.message === "Некоректні дані при реєстрації") {
                        setRegister(rightRegister = false)
                        setErrors(errors = res.data.errors)
                    } else if (res.data.message === "Електронна пошта використовується іншим користувачем") {
                        setRegister(rightRegister = false)
                        setErrors(errors = [{msg: res.data.message}])
                    } else {
                        setErrors(errors = [])
                        setRegister(rightRegister = true)

                        document.querySelector('#email-register').value = ''
                        document.querySelector('#password-register').value = ''
                        document.querySelector('#fullName-register').value = ''
                        document.querySelector('#password2-register').value = ''
                   }
                })
        } catch (err) {
            console.log(err)
        }
    }

    return (
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

                <Form.Group className="mb-3" controlId="formBasicName">
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

                 <Form.Group className="mb-3" controlId="formBasic2Password">
                     <Form.Label>Повторення паролю</Form.Label>
                     <Form.Control id="password2-register" type="password" placeholder="Повторіть пароль" />
                 </Form.Group>

                 {rightRegister
                     ? <div className="rightRegister">
                         <p>Користувач успішно зареєстрований, тепер ви можете користуватись особистим кабінетом.</p>
                     </div>
                     :
                     false
                 }

                 {errors.length > 0
                     ? <div className="falseRegister">
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
                    <Button onClick={sendDataRegister} className="submit-button" variant="primary" type="submit" style={{backgroundColor: 'black', border: 'none', marginRight: '20px'}}>
                        Зареєструватись
                    </Button>
                    <Button href="/login" variant="secondary" type="submit">Ви вже зареєстровані?</Button>
                </div>
            </Form>
        </div>
    );
};

export default Register;
