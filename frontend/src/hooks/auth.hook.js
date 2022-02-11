import {useEffect, useState} from 'react'

export const useAuth = () => {
    let [token, setToken] = useState(null)
    let [isReady, setIsReady] = useState(false)

    const login = (jwtToken) => {
        setToken(token = jwtToken)
        localStorage.setItem('userData', JSON.stringify({
            token: jwtToken
        }))
    }

    const logout = () => {
        setToken(token = null)
        localStorage.removeItem('userData')
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'))
        if (data && data.token) {
            login(data.token)
        }
        /* eslint-disable */
        setIsReady(isReady = true)
    }, [login])

    return {login, logout, token, isReady}
}
