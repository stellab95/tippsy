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
                    setCover(data.cover || '')
                    setAvatar(data.avatar || '')
                    setBiography(data.biography || '')
                } else {
                    console.error('Données manquantes dans la réponse', data)
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

    if (id !== String(userId)) {
        console.error("ID dans l'URL différent de l'utilisateur connecté. Accès interdit.")
        return navigate('/creatorprofile')
    }
    

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('user_id', userId)
       
        if (avatar instanceof File) formData.append('avatar', avatar)
        if (cover instanceof File) formData.append('cover', cover)
        if (biography !== undefined) formData.append('biography', biography)
    
        try {
            const response = await fetch(`http://localhost:3000/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            })
    
            if (response.ok){
                console.log("Profil modifié avec succès !")
            navigate('/creatorProfile')
                } else {
                console.error("Erreur lors de la modification du profil")
                }
            } catch (error) {
            console.error('Erreur lors de la requête :', error)
            }
        }

    return (
        <div>
            <h1>Modifier la page</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label htmlFor="avatar" className='profile-picture-title change-user-profile-picture'>Photo de profil</label>
                    <input type="file" id="avatar" accept="image/*" onChange={(e) => setAvatar(e.target.files[0])}/>
                
                <label htmlFor="cover" className='change-cover-user-profile'>Photo de couverture</label>
                    <input type="file" id="cover" accept="image/*" onChange={(e) => setCover(e.target.files[0])}/>
            
                <label htmlFor="biography" className='change-cover-user-profile'>Biographie</label>
                    <textarea className="content" id="biography" type="text" placeholder="Commencez à écrire..." value={biography || ''} onChange={(e) => setBiography(e.target.value)} />

                <div className="return-edit-buttons">
                    <button className="return-button" type="button" onClick={() => navigate('/creatorprofile')}>Retour</button>
                    <button className="post-edit-button" type="submit">Modifier</button>
                </div>

            </form>
        </div>
    )
}

export default ProfileEdit