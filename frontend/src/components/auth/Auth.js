import React, {useContext, useState} from 'react'
import './auth.scss'
import axios from 'axios'
import {Button, Form} from "react-bootstrap"
import {AuthContext} from "../../context/AuthContext";
import Loader from '../../Loader'
import {withNamespaces} from 'react-i18next';


const Auth = ({t}) => {
    let [form, setForm] = useState({
        email: '',
        password: '',
        fullName: '',
        passwordConfirm: ''
    })
    let [rightLogin, setLogin] = useState(false)
    let [loading, setLoading] = React.useState(false);
    let [errors, setErrors] = useState([])

    const {login} = useContext(AuthContext)

    const sendDataLogin = () => {
        setLoading(loading = true)
        setForm(form = {
            email: document.querySelector('#email-login').value,
            password: document.querySelector('#password-login').value,
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
                setLoading(loading = false)
            })

        setForm({
            email: '',
            password: ''
        })
    }

    return (
        <div className="auth-page">
            <h3>{t('login')}</h3>
            <Form noValidate onSubmit={e => e.preventDefault()}>
                <Form.Group className="mb-3" controlId="formBasicEmail111">
                    <Form.Label>{t('email')}</Form.Label>
                    <Form.Control id="email-login" type="email" placeholder={t('enter-email')}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword111">
                    <Form.Label>{t('password')}</Form.Label>
                    <Form.Control id="password-login" type="password" placeholder={t('enter-password')}/>
                </Form.Group>

                {rightLogin
                    ? <div>
                        <p style={{'color': 'green'}}>{t('adress..')}</p>
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
                    <Button onClick={sendDataLogin} className="submit-button" variant="primary" type="submit"
                            style={{backgroundColor: 'black', border: 'none', marginRight: '20px'}}>
                        {t('enter')}
                    </Button>
                    <Button href="/register" variant="secondary" style={{marginRight: '20px'}}
                            type="submit">{t('you-dont-register?')}</Button>
                    <Button href="/resetPassword" variant="secondary" type="submit">{t('recove-acc')}</Button>
                </div>
            </Form>
            {loading ? <Loader/> : null}
        </div>
    );
};

export default withNamespaces()(Auth);
