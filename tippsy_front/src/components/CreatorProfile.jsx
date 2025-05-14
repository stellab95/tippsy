import { useNavigate } from 'react-router-dom'
import imageCover from '../assets/img/pexels-heftiba-1194420.jpg'
import UserProfilePicture from '../assets/img/woman-portrait.jpeg'
import createIcon from '../assets/icons/create-icon.svg'

import '../styles/CreatorProfile.css'
import { useEffect, useState } from 'react'

function CreatorProfile(){
    const navigate = useNavigate()
    const [username, setUsername] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]))
            console.log(payload);
            setUsername(payload.username)
            
        }
    }, [])

    return (
        <>
            <div className='profile-header'>
                <img src={imageCover} className="image-cover" />
                <img src={UserProfilePicture} className="user-profile-picture" />


                <div className='profile-buttons'>
                        <button className='left-button' type="button" onClick={() => navigate('/createpost')}>
                        <img src={createIcon} className="create-icon" />Créer</button>
                        
                        <button className='right-button' type="button" onClick={() => navigate('/createpost')}>
                        <img src={createIcon} className="create-icon" />Modifier la page</button>
                </div>
                <p className='profile-header-username'>{username}</p>
                    <div className='title-lasts-posts'>
                        <h1 className="lasts-posts">Mes dernières publications</h1>
                    </div>
            </div>
        </>
    )
}

export default CreatorProfile