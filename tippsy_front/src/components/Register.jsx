import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import '../styles/Login.css'

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
        <div className="form-wrapper">
            <form className="login-container" onSubmit={handleSubmit} encType="multipart/form-data">
                <input className="username" type="text" placeholder="Nom ou pseudo" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <input className="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input className="password" type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className="login-button" type="submit">S'inscrire</button>
            </form>
        </div>
    )   
}

export default Register