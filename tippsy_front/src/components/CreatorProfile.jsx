import { useNavigate } from 'react-router-dom'
import imageCover from '../assets/img/pexels-heftiba-1194420.jpg'
import UserProfilePicture from '../assets/img/woman-portrait.jpeg'
import createIcon from '../assets/icons/create-icon.svg'

import '../styles/CreatorProfile.css'
import { useEffect, useState } from 'react'

function CreatorProfile(){
    const navigate = useNavigate()
    const [userId, setUserId] = useState('')
    const [username, setUsername] = useState('')
    const [avatar, setAvatar] = useState('')
    const [cover, setCover] = useState('')
    const [biography, setBiography] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]))
            const userId = payload.id
            setUserId(userId)
            console.log(payload);
            setUsername(payload.username)

            fetch(`http://localhost:3000/users/${userId}`)
            .then(res => res.json())
            .then(data => {
                setAvatar(data.avatar)
                setCover(data.cover)
                setBiography(data.biography)
                setUsername(data.username)
            })
            .catch(err => console.error(err))
            
        }
    }, [])

    return (
        <>
            <div className='profile-header'>
            <img src={`http://localhost:3000/uploads/${cover}`} className="image-cover" />
            <img src={`http://localhost:3000/uploads/${avatar}`} className="user-profile-picture" />

                <div className='profile-buttons'>
                        <button className='left-button' type="button" onClick={() => navigate('/createpost')}>
                        <img src={createIcon} className="create-icon" />Créer</button>
                        
                        <button className='right-button' type="button" onClick={() => navigate(`/profileedit/${userId}`)}>
                        <img src={createIcon} className="create-icon" />Modifier la page</button>
                </div>
                <p className='profile-header-username'>{username}</p>
                <p className='biography'>{biography}</p>
                <div className='title-lasts-posts'>
                        <h1 className="lasts-posts">Mes dernières publications</h1>
                    </div>
            </div>
        </>
    )
}

export default CreatorProfile