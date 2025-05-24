import { useEffect, useState } from "react";
import { data, redirect, useNavigate } from 'react-router-dom';
import loginPicture from '../assets/img/creative-artist.jpeg'


import '../styles/Login.css'

function Login(){
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const redirectUserByRole = (role) => {
            const isFan = role.includes("fan")
            const isCreator = role.includes("creator")

            if (isFan && isCreator){
                navigate('/creatorProfile')
            } else if (isCreator) {
                navigate('/creatorProfile')
            } else if (isFan) {
                navigate('/memberProfile')
            } else {
                navigate('/unauthorized')
            }
        }
        
        try {
            const response = await fetch('http://localhost:3000/login', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json'},
               body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Erreur inconnue')
            }

                localStorage.setItem('token', data.token)
                localStorage.setItem('user', JSON.stringify({
                id: data.user.id,
                username: data.user.username,
                roles: data.user.roles
            }))
                console.log("Connexion réalisée avec succès !");

                const user = data.user
                redirectUserByRole(user.roles)
            
            setEmail('')
            setPassword('')

        }catch (error) {
            console.error('Erreur lors de la tentative connexion :', error)
        }    


    }

    return (
        <div className="login-main-container">
            <img src={loginPicture} className="login-picture" />
        <div className="login-form-wrapper">
                <p className="logo-connexion">tippsy</p>
                <p className="slogan">Tip. Support. Repeat.</p>
                <p className="intro">Le meilleur endroit pour pour créer une communauté avec vos plus grands fans, partager des oeuvres exclusives et transformer votre passion en une entreprise durable.</p>
           
            <form className="login-container" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="login-input">
                    <input className="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input className="password" type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="login-button-container">
                    <button className="login-button" type="submit">Connexion</button>
                </div>
            </form>
            <p className="register-link">Je n'ai pas de compte, <a onClick={() => navigate('/register')}>s'inscrire</a></p>
            </div>
        </div>
    )   
}

export default Login