import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


import '../styles/Login.css'

function Login(){
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
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
                localStorage.setItem('token', data.token)
                console.log("Connexion réussie");
                
                navigate('/')
            } else {
                console.error('Erreur de connexion', data.message)
            }
            
            setEmail('')
            setPassword('')

        }catch (error) {
            console.error('Erreur lors de la tentative connexion :', error)
        }

    }

    return (
        <div className="form-wrapper">
            <form className="login-container" onSubmit={handleSubmit} encType="multipart/form-data">
                <input className="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <input className="password" type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button className="login-button" type="submit">Se connecter</button>
            </form>

        </div>
    )   
}

export default Login