import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import bellIcon from '../assets/icons/bell-icon.svg'
import homeIcon from '../assets/icons/home-icon.svg'
import usersIcon from '../assets/icons/users-icon.svg'
import magnifyIcon from '../assets/icons/magnify-icon.svg'
import settingsIcon from '../assets/icons/settings-icon.svg'
import userNavbarPicture from '../assets/img/woman-portrait.jpeg'
import vibrantChaos from '../assets/img/vibrant-chaos.jpeg'



import '../styles/Navbar.css'

function Navbar(){
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [userId, setUserId] = useState('')
    const [avatar, setAvatar] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]))
            const userId = payload.id
            console.log(payload);
            setUserId(userId)
            setUsername(payload.username)

            fetch(`http://localhost:3000/users/${userId}`, {
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
    }, [])

        const handleLogout = async () => {
            try {    
                const response = await fetch('http://localhost:3000/logout', {
                    method: 'POST',
                    credentials: 'include',
                })
    
                if (!response.ok) {
                    throw new Error(`Échec de la déconnexion ${response.status}`)
                }
                console.log('Déconnexion réussie');
                navigate('/login')
            } catch (e) {
                console.error('Erreur lors de la déconnexion :', e.message)
            }
        }
    

    return (
        <div className='main-container'>
            <div className='navbar-container'>
                <div className="navbar-content">
                    <Link to={'/'} className='logo'>tippsy</Link>
                    <p className='dashboard'>Tableau de bord</p>
                    <ul className='links-container'>
                        <li>
                            <a href="#"><img src={homeIcon} alt='home-icon' className="home-icon" /></a>
                            <Link to={'/'}>Accueil</Link>
                        </li>
                        <li>
                            <a href="#"><img src={magnifyIcon} alt='magnify-icon' className="magnify-icon" /></a>
                            <a href="#">Parcourir</a>
                        </li>
                        <li>
                            <a href="#"><img src={bellIcon} alt='bell-icon' className="bell-icon" /></a>
                            <a href="#">Notifications</a>
                        </li>
                        <li>
                            <a href="#"><img src={usersIcon} alt='users-icon' className="users-icon" /></a>
                            <a href="#">Abonnements</a>
                        </li>
                        <li>
                            <a href="#"><img src={settingsIcon} alt='settings-icon' className="settings-icon" /></a>
                            <a href="#">Paramètres</a>
                        </li>
                    </ul>
                </div>

                <div className='user-status'>
                        <img src={
                            avatar === null || avatar === '/vibrant-chaos.jpg' ? vibrantChaos
                            : `http://localhost:3000/uploads/${avatar}`}
                            alt='avatar'
                            className="user-navbar-picture" />
                    
                    {/* <a href="#"><img src={userNavbarPicture} alt='user-navbar-picture' className="user-navbar-picture" /></a> */}
                    {/* <img src={`http://localhost:3000/uploads/${avatar}`} className="user-navbar-picture" /> */}
                    <div>
                        <p className='nav-username'>{username}</p>
                        <p className='status'>status</p>
                    </div>
                </div>
                    <button type='button' onClick={handleLogout}>Déconnexion</button>
            </div>
        </div>
    )
}


export default Navbar