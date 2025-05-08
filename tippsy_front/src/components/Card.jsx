import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import illustration from '../assets/img/pexels-heftiba-1194420.jpg'
import userProfil from '../assets/img/woman-portrait.jpeg'
import heartIcon from '../assets/icons/heart-icon.svg'
import commentIcon from '../assets/icons/comment-icon.svg'

import '../styles/Card.css'

function Card( {post} ){
    const navigate = useNavigate();

    return(
        <div className="post-card-container">
            {/* <img src={illustration} className="img-card-container" /> */}
            <img className="img-card-container" alt="Image du post" src={`http://localhost:3000/uploads/${post.image}`}/>

            <div className='userProfil-title-container'>
                <img src={userProfil} alt='user-profil' className="user-profil" />
                <div className='title-date-container'>
                    <h3 className='card-title'>{post.title}</h3>
                    <p className='date'>Date</p>
                </div>
            </div>
            <div className='text-container'>
                <p className="text-post">{post.content}</p>
            </div>
            <div className='interactivity'>
                <div className='heart-container'>
                    <img src={heartIcon} alt='heart-icon' className="heart-icon" />
                    <p className='nb-likes'>42</p>
                </div>
                <div className='comment-container'>
                    <img src={commentIcon} alt='comment-icon' className="comment-icon" />
                    <p className='nb-comments'>4</p>
                </div>

            </div>
        </div>
        )
    }

export default Card 