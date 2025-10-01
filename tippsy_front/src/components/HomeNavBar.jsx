import { useNavigate, Link  } from "react-router-dom"
import Navbar from "./Navbar"

function HomeNavBar({ isOwner = false }){
    const navigate = useNavigate()

    if (!isOwner) {
        return (
            <div className='home-navbar-container'>
                <nav className="home-navbar-content wrapper">
                    <Link to="/" className='home-logo'>tippsy</Link>
                    <ul className="home-navbar-content">
                        <li>
                            <Link to="/" style={{marginRight: 15}}>Accueil</Link>
                        </li>
                        <li>
                            <Link to="/" style={{marginRight: 15}}>Créateurs</Link>
                        </li>
                        <li>
                            <Link to="/">Fonctionnalités</Link>
                        </li>
                    </ul>

                    <div className='home-search-authentication'>
                        <div>
                            <input type='search' className='search-creator-input' placeholder='Chercher un créateur...'></input>
                            <button className='home-connexion' onClick={() => navigate('/register')}>S'identifier</button>
                        </div>
                    </div>
                    
                </nav>
            </div>
            )
        }

        if (isOwner) {
            return (
            <div className="navbar-creator-profile">
                <Navbar />
            </div>
            )
        }
}

export default HomeNavBar