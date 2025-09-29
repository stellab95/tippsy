import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../config.js'
import { TbLayoutSidebarLeftCollapse , TbLayoutSidebarRightCollapse } from "react-icons/tb";

import bellIcon from '../assets/icons/bell-icon.svg'
import homeIcon from '../assets/icons/home-icon.svg'
import usersIcon from '../assets/icons/users-icon.svg'
import magnifyIcon from '../assets/icons/magnify-icon.svg'
import settingsIcon from '../assets/icons/settings-icon.svg'
import vibrantChaos from '../assets/img/vibrant-chaos.jpeg'
import DropdownMenu from './DropdownMenu.jsx';

// import '../styles/Navbar.css'

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
                }
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
 <>

 <ul className="menu bg-neutral rounded-box min-h-screen flex flex-col items-center justify-between py-6">
  <div className="flex flex-col items-center space-y-8">
    <Link to="/"><p className="logo-footer fill-current">T.</p></Link>

    <Link to="/"><a className="tooltip tooltip-primary tooltip-right" data-tip="Accueil">
      <img src={homeIcon} alt='accueil' className="h-4 w-4"/>
    </a></Link>

    <a className="tooltip tooltip-primary tooltip-right" data-tip="Parcourir">
      <img src={magnifyIcon} alt='parcourir' className="h-4 w-4"/>
    </a>

    <a className="tooltip tooltip-primary tooltip-right" data-tip="Notifications">
      <img src={bellIcon} alt='notifications' className="h-4 w-4"/>
    </a>

    <a className="tooltip tooltip-primary tooltip-right" data-tip="Abonnements">
      <img src={usersIcon} alt='abonnement' className="h-4 w-4"/>
    </a>

    <a className="tooltip tooltip-primary tooltip-right" data-tip="Paramètres">
      <img src={settingsIcon} alt='paramètres' className="h-4 w-4"/>
    </a>
  </div>

  {/* DROPDOWN */}
 <div className="p-4">
        <DropdownMenu
          avatar={avatar}
          username={username}
          role={roles}
          onLogout={handleLogout}
        />
      </div></ul>

 </>
);
}


export default Navbar