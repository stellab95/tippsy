import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import CardList from './CardList'
import '../styles/MemberProfile.css'
import Navbar from './Navbar'

function MemberProfile(){
    const navigate = useNavigate()

    const [userId, setUserId] = useState('')
    const [username, setUsername] = useState('')
    const [avatar, setAvatar] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]))
            const userId = payload.id
            setUserId(userId)
            console.log(payload);
            setUsername(payload.username)

            fetch(`http://localhost:3000/posts`)
            .then(res => res.json())
            .then(data => {
                setAvatar(data.avatar)
                setUsername(data.username)
            })
            .catch(err => console.error(err))
            
        }
    }, [])

    return (
        <>
        <div className="navbar">
            <Navbar />
        </div>
            <div className="main-post-container">
                <div className="create-post-container">
                    <CardList />
                </div>
            </div>
        </>
    )
}

export default MemberProfile

