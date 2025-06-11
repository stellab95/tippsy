import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import userProfil from '../assets/img/woman-portrait.jpeg'
import heartIcon from '../assets/icons/heart-icon.svg'
import commentIcon from '../assets/icons/comment-icon.svg'
import editIcon from '../assets/icons/edit-icon.svg'
import DeletePost from './deletePost'
import vibrantChaos from '../assets/img/vibrant-chaos.jpeg'


import '../styles/Card.css'

function Card( { post, isOwner = true } ){
    const navigate = useNavigate();

    const [userId, setUserId] = useState('')
    const [avatar, setAvatar] = useState('')
    const [username, setUsername] = useState('')


    useEffect(() => {
        const token = localStorage.getItem('token')
        const userFromStorage = localStorage.getItem('user')

        try {

            if (token && userFromStorage) {
                const user = JSON.parse(userFromStorage)

                setUserId(user.id)
                setUsername(user.username)
    
                fetch(`http://localhost:3000/users/${user.id}`, {
                   headers: {
                     Authorization: `Bearer ${token}`
                   }
                })
                .then(res => res.json())
                .then(data => {
                    setAvatar(data.avatar)
                })
                .catch(err => console.error(err))
            }
        } catch (error) {
            console.log("Erreur lors du parsing de l'utilisateur depuis localStorage :", error)
        }
    }, [])

    const date = new Date(post.created_at);
    const formattedDate = date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
})

console.log(post.image)
return(
    <div className="post-card-container">
        <div className='userProfil-title-container'>
            <div className='avatar-username-container'>
                <img src={avatar === null || avatar === '/vibrant-chaos.jpg' ? vibrantChaos : `http://localhost:3000/uploads/${avatar}`} alt='' className="user-profil" />
                <p className='username-member'>{username}</p>
            </div>
            <img className="img-card-container" alt="" src={`http://localhost:3000/uploads/${post.image}`}/>
                <div className='title-date-container'>
                    <p className='card-title'>{post.title}</p>
                    <p className='date'>{formattedDate}</p>
                </div>
            </div>
            <div className='text-container'>
                <p className="text-post">{post.content}</p>
            </div>
            <div className='interactivity'>
                <div className='likes-comment-container'>
                <div className='heart-container'>
                    <img src={heartIcon} alt='heart-icon' className="heart-icon" />
                    <p className='nb-likes'>42</p>
                </div>
                <div className='comment-container'>
                    <img src={commentIcon} alt='comment-icon' className="comment-icon" />
                    <p className='nb-comments'>4</p>
                </div>
                </div>

                {isOwner && (
                <div className='delete-edit-container'>
                    <div className='trash-card'>
                        <DeletePost id={post.id} />
                    </div>
                    <div className='comment-container'>
                        <Link to={`/posts/${post.id}/edit`}>
                            <img src={editIcon} alt="edit-icon" className="edit-icon" />
                        </Link>
                    </div>
                </div>
                )}
            </div>
        </div>
        )
    }

export default Card 