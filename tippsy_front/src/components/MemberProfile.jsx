import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Card from './Card'
import '../styles/MemberProfile.css'
import Navbar from './Navbar'

function MemberProfile(){
    const navigate = useNavigate()

    const [posts, setPosts] = useState([])
    const [userId, setUserId] = useState('')
    const [username, setUsername] = useState('')
    const [avatar, setAvatar] = useState('')

    useEffect(() => {
    const fetchData = async () => {
        const token = localStorage.getItem('token')

        const payload = JSON.parse(atob(token.split('.')[1]))
        const userId = payload.id

        try {
            const response = await fetch(`http://localhost:3000/posts`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des posts')
            }
        
        const data = await response.json()
        console.log('DATA REÇUE :', data)
        setPosts(data)        
    } catch (err) {
        setError(err.message)
    }
}
    fetchData()
}, [])

    return (
        <>
        <div className="navbar">
            <Navbar />
        </div>
        <div className="profile-cardlist-container">
            <div className="cardList-container">
                {posts.map((post) =>(
                <Card key={post.id} post={post}/>
                ))}
            </div>
        </div>
        </>
    )
}

export default MemberProfile
