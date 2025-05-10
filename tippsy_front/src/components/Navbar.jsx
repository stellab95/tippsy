import bellIcon from '../assets/icons/bell-icon.svg'
import homeIcon from '../assets/icons/home-icon.svg'
import usersIcon from '../assets/icons/users-icon.svg'
import magnifyIcon from '../assets/icons/magnify-icon.svg'
import counterIcon from '../assets/icons/counter-icon.svg'
import settingsIcon from '../assets/icons/settings-icon.svg'
import userNavbarPicture from '../assets/img/woman-portrait.jpeg'

import '../styles/Navbar.css'

function Navbar(){
    return (
        <div className='main-container'>
        <div className='navbar-container'>
        <div className="navbar-content">
            <a href="#" className='logo'>tippsy</a>
            <p className='dashboard'>Tableau de bord</p>
            <ul>
                <li>
                    <a href="#"><img src={homeIcon} alt='home-icon' className="home-icon" /></a>
                    <a href="#">Accueil</a>
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
                <a href="#"><img src={userNavbarPicture} alt='user-navbar-picture' className="user-navbar-picture" /></a>
                <div>
                    <p className='username'>username</p>
                    <p className='status'>status</p>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Navbar