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


    // Надсилання даних Реєстрації
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
            </div>
    );
};

export default Register;
