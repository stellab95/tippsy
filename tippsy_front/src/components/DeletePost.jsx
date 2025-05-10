import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import trashIcon from '../assets/icons/trash-icon.svg'

import '../styles/DeletePost.css'

function DeletePost(){
    const navigate = useNavigate()
    const { id } = useParams();
    console.log("ID récupéré depuis l'URL :", id);


const handleSubmit = async (e) => {
    e.preventDefault()    

try {
    const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: 'DELETE',
    })

    if (response.ok){
        const data = await response.json()
        console.log(('Post supprimé', data));
        navigate('/creatorprofile')
    } else {
        console.error('Erreur lors de la suppression')
    }
    
    }catch (error) {
        console.error('Erreur lors de la suppression du post :', error)
    }
}

    return (
        <form onSubmit={handleSubmit}>
            <button className="trash-icon" type='submit'><img src={trashIcon} alt='trash-icon' className='trash-img'/></button>
        </form>
    )
}

export default DeletePost