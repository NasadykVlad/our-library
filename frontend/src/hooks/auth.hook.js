import {useEffect, useState} from 'react'

export const useAuth = () => {
    let [token, setToken] = useState(null)
    let [userId, setUserId] = useState(null)
    let [isReady, setIsReady] = useState(false)

    const login = (jwtToken, id) => {
        setToken(token = jwtToken)
        setUserId(userId = id)
        localStorage.setItem('userData', JSON.stringify({
            userId: id,
            token: jwtToken
        }))
    }

    const logout = () => {
        setToken(token = null)
        setUserId(userId = null)
        localStorage.removeItem('userData')
    }

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'))
        if (data && data.token) {
            login(data.token, data.userId)
        }
        /* eslint-disable */
        setIsReady(isReady = true)
    }, [login])

    return {login, logout, token, userId, isReady}
}
