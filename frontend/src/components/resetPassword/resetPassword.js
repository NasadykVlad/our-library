import React from 'react'
import axios from 'axios'
import {Button, Form} from "react-bootstrap"
import './resetPassword.scss'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Loader from '../../Loader'
import {withNamespaces} from 'react-i18next';


const ResetPassword = ({t}) => {
    let [statusEmail, changeStatusEmail] = React.useState('')
    let [email, setEmail] = React.useState('')
    let [errors, setErrors] = React.useState([])
    let [errorsTokenPassword, setErrorsTokenPassword] = React.useState([])
    let [rightReset, setRightReset] = React.useState('')
    let [loading, setLoading] = React.useState(false);

    const resetPassword = () => {
        setLoading(loading = true)
        setEmail(email = document.querySelector('#email-login').value)

        axios.post('/api/auth/sendResetEmail', {
            email
        })
            .then(res => {
                if (res.data.errors) {
                    setErrors(errors = res.data.errors)
                } else {
                    changeStatusEmail(statusEmail = res.data.message)
                    NotificationManager.success(t('token-send'), t('operation-good'));
                }
                setLoading(loading = false)
            })
    }

    const sendToken = () => {
        let inputToken = document.querySelector('#token-login').value
        let inputPassword = document.querySelector('#password-login').value

        if (inputToken.length !== 4) {
            setErrorsTokenPassword(errorsTokenPassword = [{msg: t('enter-token-4')}])
        } else {
            setErrorsTokenPassword(errorsTokenPassword = [])
            setLoading(loading = true)
            axios.post('/api/auth/sendToken', {
                email,
                token: inputToken,
                newPassword: inputPassword
            })
                .then(res => {
                    if (res.data.errors) {
                        setErrorsTokenPassword(errorsTokenPassword = res.data.errors)
                    } else {
                        NotificationManager.success(t('enter-usage-new-password'), t('operation-good'));
                        setErrorsTokenPassword(errorsTokenPassword = [])
                        setRightReset(rightReset = res.data.message)
                        document.querySelector('#token-login').value = ''
                        document.querySelector('#password-login').value = ''
                    }
                    setLoading(loading = false)
                })
        }
    }

    return (
        <div className="resetPassword">
            <h4>{t('recove-account')}</h4>
            <Form noValidate onSubmit={e => e.preventDefault()}>
                <Form.Group controlId="formBasicEmail114"
                            className={statusEmail === 'mail-send' ? 'mail-send mb-3' : 'mb-3'}>
                    <Form.Label>{t('email')}</Form.Label>
                    <Form.Control id="email-login" type="email" placeholder={t('enter-email')}/>

                    {errors.length > 0
                        ? <div className="empthyEmail">
                            {
                                errors.map(val => {
                                    return <p style={{'marginTop': '5px', 'marginBottom': '0px'}}>{t(val.msg)}.</p>
                                })
                            }
                        </div>
                        :
                        false
                    }

                    <Button style={{'marginTop': '10px'}} variant="secondary" onClick={() => resetPassword()}
                            type="submit">{t('send')}</Button>
                </Form.Group>

                {statusEmail === 'mail-send' ?
                    <div>
                        <Form.Group className="mb-3" controlId="formBasicPassword113">
                            <Form.Label>{t('enter-token')}</Form.Label>
                            <Form.Control id="token-login" type="text" placeholder={t('ent-tone')}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword116">
                            <Form.Label>{t('ent-new-pass')}</Form.Label>
                            <Form.Control id="password-login" type="password" placeholder={t('enter-password')}/>

                            {errorsTokenPassword.length > 0
                                ? <div className="empthyEmail">
                                    {
                                        errorsTokenPassword.map(val => {
                                            return <p
                                                style={{'marginTop': '5px', 'marginBottom': '0px'}}>{t(val.msg)}.</p>
                                        })
                                    }
                                </div>
                                : rightReset ? <p style={{
                                    'marginTop': '5px',
                                    'marginBottom': '0px',
                                    'color': 'green'
                                }}>{t('password-change')}.</p> : ''
                            }

                            <Button style={{'marginTop': '10px'}} variant="secondary" onClick={() => sendToken()}
                                    type="submit">{t('change-password')}</Button>
                        </Form.Group>
                    </div> : ''
                }
            </Form>
            <NotificationContainer/>
            {loading ? <Loader/> : null}
        </div>
    );
};

export default withNamespaces()(ResetPassword);
