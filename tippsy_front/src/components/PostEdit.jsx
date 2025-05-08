import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import UploadImage from './UploadImage'

import '../styles/PostEdit.css'

function PostEdit(){
    const navigate = useNavigate()

    const { id } = useParams()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')
    const [userId, setUserId] = useState('')

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:3000/posts/${id}`)
                
                if (!response.ok) {
                    throw new Error('Erreur serveur')
                }
                
                const data = await response.json()
                console.log('Post récupéré:', data);
                if (data && data.title && data.content && data.image && data.user_id) {
                setTitle(data.title);
                setContent(data.content);
                setImage(data.image);
                setUserId(data.user_id);
                } else {
                    console.error('Données manquantes dans la réponse', data);
                }
        } catch (error) {
            console.error('Erreur lors de la récupération du post', error)
        }
    }
    fetchPost()
    }, [id])    

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const response = await fetch(`http://localhost:3000/posts/${id}`, {
               method: 'PUT',
               headers: {
                'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                title,
                content,
                image,
                user_id: userId
               })
            })
            const data = await response.json()
            console.log('Post modifié', data)

            setTitle('')
            setContent('')
            setImage('')
            setUserId('')
        
        }catch (error){
            console.error('Erreur lors de la modification du post :', error)
        }
    }

    return (
        <div className="form-wrapper">
            <form className="post-edit-container" onSubmit={handleSubmit}>
                <UploadImage setImage={setImage}/>
                {image && (<img className="preview" src={`http://localhost:3000/uploads/${image}`} alt="Aperçu" />)}
                {/* <input type="text" value={image || ''} onChange={(e) => setImage(e.target.value)} /> */}
                <input className="title" type="text" placeholder="Titre" value={title || ''} onChange={(e) => setTitle(e.target.value)} />
                <input className="content" type="text" placeholder="Commencez à écrire..." value={content || ''} onChange={(e) => setContent(e.target.value)} />
                <input className="userId" type="text" placeholder="User ID" value={userId || ''} onChange={(e) => setUserId(e.target.value)} />
                <div className="return-edit-buttons">
                    <button className="return-button" type="button" onClick={() => navigate('/')}>Retour</button>
                    <button className="post-edit-button" type="submit">Modifier</button>
                </div>
            </form>
        </div>
    )
}

export default PostEdit