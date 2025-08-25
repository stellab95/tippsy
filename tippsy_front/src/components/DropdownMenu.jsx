import { useState, useEffect, useRef } from "react"
import { useNavigate } from 'react-router-dom'
import { BACKEND_URL } from '../config.js'

import vibrantChaos from '../assets/img/vibrant-chaos.jpeg'


import '../styles/DropdownMenu.css'

function DropdownMenu({ avatar, username, role }){
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [selectedRole, setSelectedRole] = useState(role ? role[0] : null)
    const menuRef = useRef(null)

    const toggleMenu = () => setOpen(!open)

useEffect(() => {
    const handleClickOutside = (e) => {
        if (menuRef.current && !menuRef.current.contains(e.target)) {
            setOpen(false)
        }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
}, [])

    const handleLogout = async () => {
        console.log("Déconnexion lancée")
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
}


    return (
        <div>
            <div className="profile-menu-wrapper" ref={menuRef}>
                <div className="user-profile" onClick={toggleMenu}>
                <img src={avatar ? `${BACKEND_URL}/uploads/${avatar}` : vibrantChaos} alt="avatar" className="user-navbar-picture"/>
            </div>

            {open && (
                <div className="dropdown-menu">
                    <div className="dropdown-item selected">
                    <div>
                        
                    {role && role.map((r, index) => (
                    <div
                        key={index}
                        className={`dropdown-item ${selectedRole === r ? "selected" : ""}`}
                        onClick={() => setSelectedRole(r)}
                    >
                        <img
                        className="user-dropdown-picture"
                        src={avatar ? `${BACKEND_URL}/uploads/${avatar}` : vibrantChaos}
                        alt="avatar"
                        />
                        <div>
                        <p className="dropdown-username">{username}</p>
                        <div className="role-and-check">
                            <p className="dropdown-user-role">{r}</p>
                            {selectedRole === r && <span className="checkmark">✔️</span>}
                        </div>
                        </div>
                    </div>
                    ))}

                    </div>
                    </div>
                    <button
                    onClick={(e) => {
                        e.stopPropagation()
                        handleLogout()
                    }}
                    className="logout-button">Déconnexion</button>
                </div>
            )}
            </div>


    </div>
    )
}

export default DropdownMenu