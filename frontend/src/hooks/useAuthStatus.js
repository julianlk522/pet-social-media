import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'

export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [checkingStatus, setCheckingStatus] = useState(true)
    const [firstName, setFirstName] = useState('')
    const [firstLetter, setFirstLetter] = useState('')

    const loggedInUser = useSelector((state) => state.user.currentUser)

    //  set loggedIn based on state value
    useEffect(() => {
        if (loggedInUser) {
            setLoggedIn(true)
            setFirstName(loggedInUser.name
                .slice(0, 1)
                .toUpperCase()
                .concat(loggedInUser.name.slice(1))
            )
            setFirstLetter(loggedInUser.name[0]
                .toUpperCase()
            )
        } else {
            setLoggedIn(false)
            setFirstName('')
            setFirstLetter('')
        }
        setCheckingStatus(false)
    }, [loggedInUser])

    return {loggedIn, checkingStatus, firstName, firstLetter, loggedInUser}
}