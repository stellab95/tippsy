import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'
import userProfil from '../assets/img/woman-portrait.jpeg'
import heartIcon from '../assets/icons/heart-icon.svg'
import commentIcon from '../assets/icons/comment-icon.svg'
import editIcon from '../assets/icons/edit-icon.svg'
import DeletePost from './deletePost'

import '../styles/Card.css'

function Card( { post } ){
    const navigate = useNavigate();

    const date = new Date(post.created_at);
    const formattedDate = date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
})

console.log(post.image)
return(
    <div className="post-card-container">
            <img className="img-card-container" alt="" src={`http://localhost:3000/uploads/${post.image}`}/>
            <div className='userProfil-title-container'>
                <img src={userProfil} alt='user-profil' className="user-profil" />
                <div className='title-date-container'>
                    <h3 className='card-title'>{post.title}</h3>
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
            </div>
        </div>
        )
    }

export default Card 