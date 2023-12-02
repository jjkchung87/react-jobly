import React, {useState, useEffect} from 'react'

const useLocalStorageState = (key, initialValue) => {
    const [state, setState] = useState(() => {
        let value;
        try {
            value = JSON.parse(window.localStorage.getItem(key) || String(initialValue))
        } catch (e) {
            value = initialValue
        }
        return value
    })

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state))
    }, [key, state])

    return [state, setState]
}

export default useLocalStorageState;