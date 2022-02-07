import React, {useContext, useEffect} from 'react';
import './account.scss'
import {Button, Card, Form} from 'react-bootstrap'
import {withNamespaces} from 'react-i18next'
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import Loader from '../../Loader'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

const Account = ({t}) => {

    const {userId} = useContext(AuthContext)
    let [user, setUser] = React.useState('')
    let [errorName, setErrorName] = React.useState('')
    let [errors, setErrors] = React.useState('')
    let [loading, setLoading] = React.useState(false);

    useEffect(() => {
        getAccountInformation()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getAccountInformation = () => {
        setLoading(loading = true)
        axios.get('/api/account/get', {
            params: {
                userId
            }
        })
            .then(res => {
                setUser(user = res.data.fullName)
                setLoading(loading = false)
            })
    }

    const changeUserName = () => {
        const fullName = document.querySelector('#fullName').value

        if (fullName.length > 3) {
            setLoading(loading = true)
            axios.post('/api/account/changeName', {
                userId,
                fullName
            })
                .then(res => {
                    getAccountInformation()
                    document.querySelector('#fullName').value = ''
                    setErrorName(errorName = '')
                    setLoading(loading = false)
                    NotificationManager.success(t('you-change-name'), t('operation-good'));
                })
        } else {
            setErrorName(errorName = t('cor-name'))
        }
    }

    const changeUserPassword = () => {
        setLoading(loading = true)
        const oldPassword = document.querySelector('#old-password').value
        const newPassword = document.querySelector('#new-password').value

        axios.post('/api/account/changePassword', {
            userId,
            oldPassword,
            newPassword
        })
            .then(res => {
                if (res.data.message === 'ok') {
                    document.querySelector('#old-password').value = ''
                    document.querySelector('#new-password').value = ''
                    setErrors(errors = '')
                    NotificationManager.success(t('you-change-pass'), t('operation-good'));
                } else {
                    setErrors(errors = res.data.errors)
                }
                setLoading(loading = false)
            })
    }

    return (
        <div className="Account">
            <Card>
                <Card.Header as="h5">{t('name')}</Card.Header>
                <Card.Body>
                    <Card.Title>{user}</Card.Title>
                    <Card.Text>
                        {t('when-change-name')}
                    </Card.Text>
                    <Card.Text>
                        <Form.Control id="fullName" type="email" placeholder={t('enter-name-correct')}/>
                    </Card.Text>
                    {errorName ? <p style={{'color': 'red'}}>{errorName}</p> : ''}
                    <Button onClick={() => changeUserName()} variant="primary">{t('change')}</Button>
                </Card.Body>
            </Card>

            <Card>
                <Card.Header as="h5">{t('password')}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {t('change-pass')}
                    </Card.Text>
                    <Card.Text>
                        <Form.Control id="old-password" type="password" placeholder={t('input-old')}/>
                    </Card.Text>
                    <Card.Text>
                        <Form.Control id="new-password" type="password" placeholder={t('input-new')}/>
                    </Card.Text>
                    {errors ? errors.map(err => {
                        return <p style={{'color': 'red'}}>{t(err.msg)}</p>
                    }) : ''}
                    <Button onClick={() => changeUserPassword()} variant="primary">{t('сhange-password')}</Button>
                </Card.Body>
            </Card>
            <NotificationContainer/>
            {loading ? <Loader/> : null}
        </div>
    );
};

export default withNamespaces()(Account);
