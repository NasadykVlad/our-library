import React, {useState} from 'react'
import './register.scss'
import axios from 'axios'
import {Button, Form} from "react-bootstrap"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Loader from '../../Loader'
import {Link} from 'react-router-dom'
import {withNamespaces} from 'react-i18next';

const Register = ({t}) => {
    let [form, setForm] = useState({
        email: '',
        password: '',
        fullName: '',
        passwordConfirm: ''
    })
    let [rightRegister, setRegister] = useState(false)
    let [loading, setLoading] = React.useState(false);
    let [errors, setErrors] = useState([])


    // Надсилання даних Реєстрації
    const sendDataRegister = async () => {
        try {
            setLoading(loading = true)
            setForm(form = {
                email: document.querySelector('#email-register').value,
                password: document.querySelector('#password-register').value,
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
                    } else if (res.data.message === "email-is-used") {
                        setRegister(rightRegister = false)
                        setErrors(errors = [{msg: t(res.data.message)}])
                    } else {
                        setErrors(errors = [])
                        setRegister(rightRegister = true)

                        NotificationManager.success(t('acc-ready'), t('operation-good'));

                        document.querySelector('#email-register').value = ''
                        document.querySelector('#password-register').value = ''
                        document.querySelector('#fullName-register').value = ''
                        document.querySelector('#password2-register').value = ''
                    }
                    setLoading(loading = false)
                })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="auth-page">
            <h3>{t('register')}</h3>
            <Form noValidate onSubmit={e => e.preventDefault()}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>{t('email')}</Form.Label>
                    <Form.Control id="email-register" type="email" placeholder={t('enter-email')}/>
                    <Form.Text className="text-muted">
                        {t('No one notify your data!')}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>{t('name')}</Form.Label>
                    <Form.Control id="fullName-register" type="text" placeholder={t('enter-name')}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>{t('password')}</Form.Label>
                    <Form.Control id="password-register" type="password" placeholder={t('enter-password')}/>
                    <Form.Text className="text-muted">
                        {t('The password must contain from 6 characters.')}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasic2Password">
                    <Form.Label>{t('confirm-password')}</Form.Label>
                    <Form.Control id="password2-register" type="password" placeholder={t('enter-confirm-password')}/>
                </Form.Group>

                {rightRegister
                    ? <div>
                        <p style={{'color': 'green'}}>{t('The user has been successfully registered, now you can use a personal cabinet.')}</p>
                    </div>
                    :
                    false
                }

                {errors.length > 0
                    ? <div>
                        {
                            errors.map(val => {
                                return <p style={{'color': 'red'}}>{t(val.msg)}.</p>
                            })
                        }
                    </div>
                    :
                    false
                }

                <div className="buttons">
                    <Button onClick={sendDataRegister} className="submit-button" variant="primary" type="submit"
                            style={{backgroundColor: 'black', border: 'none', marginRight: '20px'}}>
                        {t('reg')}
                    </Button>
                    <Link to="/login" className="btn btn-secondary" variant="secondary" type="submit">{t('after-ref')}</Link>
                </div>
            </Form>
            <NotificationContainer/>
            {loading ? <Loader/> : null}
        </div>
    );
};

export default withNamespaces()(Register);
