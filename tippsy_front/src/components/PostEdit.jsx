import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../config.js'

import UploadImage from './UploadImage'

import '../styles/PostEdit.css'

function PostEdit(){
    const navigate = useNavigate()

    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`${BACKEND_URL}/posts/${id}`)
                
                if (!response.ok) {
                    throw new Error('Erreur serveur')
                }
                
                const data = await response.json()
                console.log('Post récupéré:', data);
                if (data && data.title && data.content && data.image) {
                    setTitle(data.title);
                    setContent(data.content);
                    setImage(data.image);
                } else {
                    console.error('Données manquantes dans la réponse', data);
                }
        } catch (error) {
            console.error('Erreur lors de la récupération du post', error)
        }
    }
    fetchPost()
    }, [id])
    
    const token = localStorage.getItem('token')
    let userId = null

    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]))
        userId = payload.id
    }

const handleSubmit = async (e) => {
    e.preventDefault()

    try {
        const response = await fetch(`${BACKEND_URL}/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title,
                content,
                image,
                user_id: userId
            }),
            credentials: 'include',
        })

        const data = await response.json()
        console.log('Réponse du serveur', data)
        navigate('/creatorProfile')

        setTitle('')
        setContent('')
        setImage('')

    } catch (error) {
        console.error('Erreur lors de la modification du profil :', error)
    }
}

    return (
    <div className="flex flex-col items-center p-6 w-full max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">Modifier un post</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full gap-6"
        encType="multipart/form-data"
      >
        {/* Upload Image */}
        <div className="flex flex-col items-center gap-2 w-full">
          <label className="text-lg font-semibold">Image du post</label>
          <UploadImage setImage={setImage} />

          {/* Aperçu de l’image */}
          {image && (
            <img
              src={typeof image === 'string' ? `${BACKEND_URL}/uploads/${image}` : URL.createObjectURL(image)}
              alt="Aperçu du post"
              className="w-full h-48 md:h-56 object-cover rounded-lg border border-gray-300 mt-2"
            />
          )}
        </div>

        {/* Title */}
        <div className="flex flex-col w-full">
          <label className="text-lg font-semibold mb-1">Titre</label>
          <input
            type="text"
            placeholder="Titre du post"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col w-full">
          <label className="text-lg font-semibold mb-1">Contenu</label>
          <textarea
            placeholder="Commencez à écrire..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea textarea-bordered h-48 resize-none w-full"
          />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate('/creatorprofile')}
            className="btn btn-neutral w-full sm:w-auto"
          >
            Retour
          </button>
          <button
            type="submit"
            className="btn btn-primary w-full sm:w-auto"
          >
            Publier
          </button>
        </div>
      </form>
    </div>
  )
}

export default PostEdit