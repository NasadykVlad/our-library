import {useEffect, useState} from 'react'

export const useAuth = () => {
    let [token, setToken] = useState(null)
    let [userId, setUserId] = useState(null)
    let [isReady, setIsReady] = useState(false)

    // Добавляємо в localStorage на зберігання сесію при успішному вході
    const login = (jwtToken, id) => {
        setToken(token = jwtToken)
        setUserId(userId = id)
        localStorage.setItem('userData', JSON.stringify({
            userId: id,
            token: jwtToken
        }))
    }

    // Видаляємо з localStorage сесію при виході
    const logout = () => {
        setToken(token = null)
        setUserId(userId = null)
        localStorage.removeItem('userData')
    }

    // При запуску програми перевіряємо чи користувач уже входив раніше, щоб відновити сесію
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
