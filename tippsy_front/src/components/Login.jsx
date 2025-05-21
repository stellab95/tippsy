import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import loginPicture from '../assets/img/creative-artist.jpeg'

import '../styles/Login.css'

function Login(){
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:3000/login', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json'},
               body: JSON.stringify({ email, password })
            })

            const data = await response.json()

            if (response.ok){
                console.log("Connexion réalisée avec succès !");
                localStorage.setItem('user', JSON.stringify(data.user))
                
                const user = data.user
                redirectUserByRole(user.roles)
            } else {
                console.error('Erreur de connexion', data.message)
            }
            
            setEmail('')
            setPassword('')

        }catch (error) {
            console.error('Erreur lors de la tentative connexion :', error)
        }

    }

    const redirectUserByRole = (roles) => {
        const isMember = roles.includes("member")
        const isCreator = roles.includes("creator")

        if (isMember && isCreator) {
            navigate("/")
        } else if (isCreator) {
            navigate("/creatorprofile")
        } else if (isMember) {
            navigate("/memberprofile")
        } else {
            navigate('/unauthorized')
        }
    }

    return (
        <div className="login-main-container">
            <img src={loginPicture} className="login-picture" />
        <div className="login-form-wrapper">
                <p className="logo-connexion">tippsy</p>
                <p className="slogan">Tip. Support. Repeat.</p>
                <p className="intro">Le meilleur endroit pour pour créer une communauté avec vos plus grands fans, partager des oeuvres exclusives et transformer votre passion en une entreprise durable.</p>
           
            <form className="login-container" onSubmit={handleLogin} encType="multipart/form-data">
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