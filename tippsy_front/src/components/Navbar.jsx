import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../config.js'

import bellIcon from '../assets/icons/bell-icon.svg'
import homeIcon from '../assets/icons/home-icon.svg'
import usersIcon from '../assets/icons/users-icon.svg'
import magnifyIcon from '../assets/icons/magnify-icon.svg'
import settingsIcon from '../assets/icons/settings-icon.svg'
import vibrantChaos from '../assets/img/vibrant-chaos.jpeg'
import { TbLayoutSidebarLeftCollapse , TbLayoutSidebarRightCollapse } from "react-icons/tb";


import '../styles/Navbar.css'

function Navbar(){
    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false)
    const [username, setUsername] = useState('')
    const [userId, setUserId] = useState('')
    const [avatar, setAvatar] = useState('')
    const [roles, setRoles] = useState([])

    const toggleNavBar = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        const userFromStorage = localStorage.getItem('user')

        if (token && userFromStorage) {
            const user = JSON.parse(userFromStorage)

            setUserId(user.id)
            setUsername(user.username)
            setRoles(user.roles || [])

            fetch(`${BACKEND_URL}/users/${user.id}`, {
                headers: {
                     Authorization: `Bearer ${token}`
                },
                credentials: 'include',
            })
            .then(res => res.json())
            .then(data => {
                setAvatar(data.avatar)
                if (data.roles && data.roles.length > 0){
                    setRoles(data.roles)
                }
            })
            .catch(err => console.error(err))
        }
    }, [])

        const handleLogout = async () => {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            navigate('/login')
        }
    

return (
  <div className={`navbar-container ${isOpen ? 'open' : 'closed'}`}>
    
    {/* Partie du haut */}
    <div className='navbar-upper'>
      <div className='navbar-top'>
        {isOpen && (
        <Link to='/' className='logo'>Tippsy</Link>
        )}
        <button className='toggle-btn' onClick={toggleNavBar}>
        {isOpen ? <TbLayoutSidebarLeftCollapse /> : <TbLayoutSidebarRightCollapse />}
        </button>
      </div>

      <div className='main-container'>
        <div className='navbar-content'>
          <ul className='links-container'>
            <li className="nav-item">
            <Link to="/"><img src={homeIcon} alt="home" className="icon" />
                {isOpen && <span className="link-text">Accueil</span>}</Link>
            {!isOpen && <span className="tooltip">Accueil</span>}
            </li>
            <li className="nav-item">
              <Link to="/"><img src={magnifyIcon} alt='magnify-icon' className="magnify-icon" />
                {isOpen && <span>Parcourir</span>}</Link>
             {!isOpen && <span className="tooltip">Parcourir</span>}
            </li>
            <li className="nav-item">
              <Link to="/"><img src={bellIcon} alt='bell-icon' className="bell-icon" />
                {isOpen && <span>Notifications</span>}</Link>
            {!isOpen && <span className="tooltip">Notifications</span>}
            </li>
            <li className="nav-item">
              <Link to="/"><img src={usersIcon} alt='users-icon' className="users-icon" />
              {isOpen && <span>Abonnements</span>}</Link>
            {!isOpen && <span className="tooltip">Abonnements</span>}
            </li>
            <li className="nav-item">
              <Link to="/"><img src={settingsIcon} alt='settings-icon' className="settings-icon" />
                {isOpen && <span>Paramètres</span>}</Link>
            {!isOpen && <span className="tooltip">Paramètres</span>}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div className='navbar-lower'>
      <div className='user-role nav-item'>
        <img
          src={avatar ? `${BACKEND_URL}/uploads/${avatar}` : vibrantChaos}
          alt='avatar'
          className="user-navbar-picture"
        />
        {isOpen && (
          <div>
            <p className='nav-username'>{username}</p>
            <p className='role'>{roles}</p>
          </div>
        )}
      </div>
      {isOpen && (
        <button type='button' onClick={handleLogout}>Déconnexion</button>
      )}
    </div>

  </div>
);
}


export default Navbar