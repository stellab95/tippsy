import { useNavigate } from 'react-router-dom'
import { useEffect , useState} from 'react'
import UploadImage from './UploadImage'

import '../styles/CreatePost.css'


function CreatePost(){
    const navigate = useNavigate()
    
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')

    const token = localStorage.getItem('token')    
    let userId = null

    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]))
        userId = payload.id
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            console.log("Image envoyée :", image)

            const response = await fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title,
                    content,
                    image,
                })
            })

            if (response.ok){
                console.log("Post crée avec succès !");
                navigate('/creatorprofile')
            }
            const data = await response.json()
            console.log(('Post ajouté', data));

            setTitle('');
            setContent('');
            setImage('');

        }catch (error) {
            console.error('Erreur lors de la création du post :', error)
        }
    }

    return (
        <div className='form-wrapper'>
            <form className='post-container' onSubmit={handleSubmit} encType='multipart/form-data'>
                <UploadImage setImage={setImage}/>
                <input className='title' type="text" placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input className='content' type="text" placeholder="Commencez à écrire..." value={content} onChange={(e) => setContent(e.target.value)} />
                {/* <input type="text" value={image} onChange={(e) => setImage(e.target.value)} /> */}
                <div className='return-submit-buttons'>
                    <button className='return-button' type="button" onClick={() => navigate('/creatorprofile')}>Retour</button>
                    <button className='create-post-button' type="submit">Publier</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePost