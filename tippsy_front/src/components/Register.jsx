import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import registerPicture from '../assets/img/artistic-girl.jpeg'

import '../styles/Register.css'

function Register(){
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:3000/register', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json'},
               body: JSON.stringify({ username, email, password })
            })

            if (response.ok){
                const data = await response.json()
                console.log("Inscription réalisée avec succès !", data);
                navigate('/login')
            } else {
                const error = await response.json();
                console.log('Erreur renvoyée par le serveur :', error);
            }
            
            setUsername('')
            setEmail('')
            setPassword('')

        }catch (error) {
            console.error('Erreur lors de l\'inscription :', error)
        }
    }

    return (
        <div className="register-main-container">
            <img src={registerPicture} className="register-picture" />
            <div className="register-form-wrapper">
                <p className="logo-connexion">tippsy</p>
                <p className="slogan">Tip. Support. Repeat.</p>
                <p className="intro">Le meilleur endroit pour pour créer une communauté avec vos plus grands fans, partager des oeuvres exclusives et transformer votre passion en une entreprise durable.</p>
             <form className="register-container" onSubmit={handleSubmit} encType="multipart/form-data">
                   <div>
                        {/* <div className="role-buttons">
                            <button>Je deviens membre</button>
                            <button>Je suis un artiste</button>
                        </div> */}
                        <input className="username" type="text" placeholder="Nom ou pseudo" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <input className="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <input className="password" type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    
                    <div className="register-button-container">
                        <button className="register-button" type="submit">S'inscrire</button>
                    </div>
                </form>
                <p className="login-link">J'ai déjà un compte, <a onClick={() => navigate('/login')}>connexion</a></p>
            </div>
        </div>
    )   
}

export default Register