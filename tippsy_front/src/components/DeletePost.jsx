import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../config.js'

import trashIcon from '../assets/icons/trash-icon.svg'

import '../styles/DeletePost.css'

function DeletePost({ id }){
    const navigate = useNavigate()
    console.log("ID récupéré depuis l'URL :", id);


const handleDelete = async (e) => {
    e.preventDefault()    

const token = localStorage.getItem('token')

try {
    console.log('Token envoyé :', token);
    const response = await fetch(`${BACKEND_URL}/posts/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    if (response.ok){
        const data = await response.json()
        console.log(('Post supprimé', data));
        //navigate('/creatorprofile')
        window.location.reload()
    } else {
        console.error('Erreur lors de la suppression')
    }
    
    }catch (error) {
        console.error('Erreur lors de la suppression du post :', error)
    }
}

    return (
        <button className="trash-icon" onClick={handleDelete}>
            <img src={trashIcon} alt="trash-icon" className="trash-img" />
        </button>
    )
}

export default DeletePost