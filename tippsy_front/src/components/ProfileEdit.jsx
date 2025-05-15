import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import UserIcon from '../assets/icons/user-icon.svg'
import ImageCover from '../assets/img/pexels-heftiba-1194420.jpg'


import '../styles/ProfileEdit.css'
import UploadImage from './UploadImage'

function ProfileEdit() {
    const navigate = useNavigate()

    const { id } = useParams()
    const [cover, setCover] = useState('')
    const [avatar, setAvatar] = useState('')
    const [biography, setBiography] = useState('')

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/${id}`)

                if (!response.ok) {
                    throw new Error('Erreur serveur')
                }

                const data = await response.json()
                console.log('Profil récupéré:', data)
                if (data && data.cover && data.avatar && data.biography) {
                    setCover(data.cover)
                    setAvatar(data.avatar)
                    setBiography(data.biography)
                } else {
                    console.error('Données manquantes dans la réponse', error)
                }
            } catch (error) {
                console.error('Erreur lors de la récupération du profil', error)
            }
        }
        fetchProfile()
    }, [id])
    const token = localStorage.getItem('token')
    let userId = null

    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]))
        userId = payload.id
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('biography', biography)

        if (avatar instanceof File) {
            formData.append('avatar', avatar)
        }

        if (cover instanceof File) {
            formData.append('cover', cover)
        }

    
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })
    
            const data = await response.json()
            console.log(response.status)
            console.log('Réponse du serveur', data)
            navigate('/creatorProfile')
    
            setCover('')
            setAvatar('')
            setBiography('')
    
        } catch (error) {
            console.error('Erreur lors de la modification du profil :', error)
        }
    }


    return (
        <div>
            <h1>Modifier la page</h1>
            <form onSubmit={handleSubmit}>
                <div className='change-user-profile-picture'>
                    <p className='profile-picture-title'>Photo de profil</p>
                    <img src={avatar instanceof File ? URL.createObjectURL(avatar) : `http://localhost:3000/uploads/${avatar || UserIcon}`} className="change-user-picture"/>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setAvatar(e.target.files[0])}
                         />
                </div>
                <div className='change-image-cover'>
                    <p className='cover-title'>Photo de couverture</p>
                    <img src={cover instanceof File ? URL.createObjectURL(cover) : `http://localhost:3000/uploads/${cover || ImageCover}`} className="change-cover-user-profile"/>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCover(e.target.files[0])}
                    />
                </div>
            <div >
                <p className='change-biography'>Biographie</p>
                <input className="content" type="text" placeholder="Commencez à écrire..." value={biography || ''} onChange={(e) => setBiography(e.target.value)} />

            </div>
            <div className="return-edit-buttons">
                    <button className="return-button" type="button" onClick={() => navigate('/creatorprofile')}>Retour</button>
                    <button className="post-edit-button" type="submit">Modifier</button>
                </div>

            </form>
        </div>
    )
}

export default ProfileEdit