import { useNavigate } from 'react-router-dom'
import createIcon from '../assets/icons/create-icon.svg'
import vibrantChaos from '../assets/img/vibrant-chaos.jpeg'

import '../styles/CreatorProfile.css'
import { useEffect, useState } from 'react'

function CreatorProfile({ userId: propUserId,  isOwner = true }){
    const navigate = useNavigate()

    const [userId, setUserId] = useState('')
    const [username, setUsername] = useState('')
    const [avatar, setAvatar] = useState('')
    const [cover, setCover] = useState('')
    const [biography, setBiography] = useState('')

    useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchProfileData = async () => {
        try {
            let userIdToFetch;
            let url;

            if (isOwner) {
                // Utilisateur connecté
                const userFromStorage = localStorage.getItem('user');
                if (!token || !userFromStorage) return;
                
                const user = JSON.parse(userFromStorage);
                setUserId(user.id);
                setUsername(user.username);
                
                url = `http://localhost:3000/users/me`;
            } else {
                // Visiteur sur le profil d’un créateur
                if (!propUserId) return;
                setUserId(propUserId);
                url = `http://localhost:3000/users/${propUserId}`;
            }

            const res = await fetch(url, {
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            const data = await res.json();
            

            setAvatar(data.avatar);
            setCover(data.cover);
            setBiography(data.biography);
            if (!isOwner) setUsername(data.username); // à ne pas écraser pour le user connecté

        } catch (error) {
            console.error("Erreur lors du fetch des données de profil :", error);
        }
    };

    fetchProfileData();
}, [isOwner, propUserId]);



    return (
        <>
            <div className='profile-header'>
                <img src={ cover ? `http://localhost:3000/uploads/${cover}` : vibrantChaos }
                    alt='image-cover'
                    className="image-cover" />

                {isOwner && (
                    <div className='profile-buttons'>
                        <button className='left-button' type="button" onClick={() => navigate('/createpost')}>
                        <img src={createIcon} className="create-icon" />Créer</button>
                        
                        <button className='right-button' type="button" onClick={() => navigate(`/profileedit/${userId}`)}>
                        <img src={createIcon} className="create-icon" />Modifier la page</button>
                    </div>
                )}

                <div className='bio-name'>
                    <img src={ avatar ? `http://localhost:3000/uploads/${avatar}` : vibrantChaos }
                        alt=''
                        className="user-profile-picture" />

                    <p className='profile-header-username'>{username}</p>
                    <p className='biography'>{biography}</p>
                </div>
                <div className='border-bottom'></div>
                {isOwner && (
                    <div className='title-lasts-posts'>
                        <h1 className="lasts-posts">Mes dernières publications</h1>
                    </div>
                )}
            </div>
        </>
    )
}

export default CreatorProfile

