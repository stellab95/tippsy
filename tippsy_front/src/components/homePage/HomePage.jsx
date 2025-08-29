import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { BACKEND_URL } from '../../config.js'

import '../../styles/HomePage.css'
import Carousel from '../Carousel'

import joyfulArtist from '../../assets/img/joyful-artist.jpeg'
import colorfulGallery from '../../assets/img/colorful-gallery.jpeg'
import facebook from '../../assets/icons/facebook.png'
import instagram from '../../assets/icons/instagram.png'
import pinterest from '../../assets/icons/pinterest.png'
import loupe from '../../assets/icons/loupe.png'

function HomePage(){
    const navigate = useNavigate()

    const [users, setUsers] = useState([])
    const [userId, setUserId] = useState('')
    const [avatar, setAvatar] = useState('')
    const [username, setUsername] = useState('')
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const allowedUsersIds = ['39', '56', '57', '58']

    const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        const token = localStorage.getItem('token')
        const userFromStorage = localStorage.getItem('user')

   try {

    if (token && userFromStorage) {
        const user = JSON.parse(userFromStorage)

        setUserId(user.id)

        fetch(`${BACKEND_URL}/users/${user.id}`, {
               method: 'GET',
               headers: {
                    'Authorization': `Bearer ${token}`
               },
               credentials: 'include',
           })
           .then(res => res.json())
           .then(data => {
                setAvatar(data.avatar)
                setUsername(data.username)
           })
           .catch(err => console.error(err))
        }
   } catch (error) {
    console.error("Erreur lors du parsing de l'utilisateur depuis le local :", error)
   }    
}, [])

useEffect(() => {
    fetch(`${BACKEND_URL}/users/featured`)
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data)) {
                setUsers(data)
                console.log("Utilisateurs filtrés depuis backend =", data);
            } else {
                console.error("Réponse inattendue :", data)
                setUsers([]) // évite le crash .map
            }
        })
        .catch(err => {
            console.error('Erreur lors du chargement des utilisateurs :', err)
            setUsers([]) // évite le crash .map
        })
}, [])

console.log("Liste des users à afficher dans le slider:", users);


    return (
        <>
        <div className='home-navbar-container'>
            <button className="burger-menu" onClick={handleToggleMenu}>
            ☰
            </button>
            <nav className="home-navbar-content wrapper">
                <Link to="/" className='home-logo'>tippsy</Link>
                
                <ul className={`home-navbar-links ${isMenuOpen ? 'open' : ''}`}>
                     {/* <li><Link to="/" style={{marginRight: 15}}>Accueil</Link></li>
                    <li><Link to="/" style={{marginRight: 15}}>Créateurs</Link></li>
                    <li><Link to="/">Fonctionnalités</Link></li> */}

                    <li>
                        {/* <input type='search' className='search-creator-input' placeholder='Chercher un créateur...'></input> */}
                        <button className='home-connexion' onClick={() => navigate('/register')}>S'identifier</button>
                    </li>
                </ul>
            </nav>
        </div>

        <div className='home-img-container'>
            <img src={joyfulArtist} alt='joyful-artist' className="joyful-artist" />
            <p className='home-hero-slogan'>Transformez vos passions en entreprises !</p>
        </div>
        <div className='wrapper'>
            <p className='slider-title'>réussissez grâce à votre art</p>
            <div className='text-button-container'>
                <p className='slider-text'>Tippsy est le meilleur endroit pour créer une communauté avec vos plus grands fans, partager des oeuvres exclusives et transformer votre passion en entreprise créative durable.</p>
                <button className='start-button'>Commencez à créer avec Tippsy</button>
            </div>
        </div>
        
        <Carousel users={users} BACKEND_URL={BACKEND_URL}/>

        <div>
        </div>

        <section className='earn-money-container'>
            <img src={colorfulGallery} alt='colorful-gallery' className="colorful-gallery" />
            <div className='earn-title'>
            <p className='earn-money'>Une autre façon de gagner de l'argent</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Aenean tincidunt metus in leo tristique, ac fringilla augue finibus.
                Aliquam volutpat lorem at iaculis convallis. Curabitur mattis feugiat turpis, molestie volutpat lacus volutpat vitae.
                Proin sit amet rhoncus velit, ut viverra magna. Curabitur condimentum sodales nisi, at commodo leo dapibus in.
                Cras ut congue eros. Curabitur sit amet turpis eu dui eleifend lobortis. Pellentesque id ex efficitur, cursus augue a, lacinia sem.
                Integer accumsan pretium venenatis. Cras venenatis odio sed felis sollicitudin, at suscipit diam scelerisque. Integer in pulvinar nisi.
                In sed laoreet diam. Sed auctor, dui eget condimentum vehicula, ante ante pulvinar mi, sed tristique augue est sit amet sapien.</p>
            <button className='shop-button'>Configurez votre boutique</button>

        </div>
        </section>

        <footer>
        <div className="container-footer">
            <div className="footer-content wrapper">
                <p className="logo-footer">T.</p>

                <ul className="social-container">
                    <li><img src={facebook} alt='facebook' className="facebook" /></li>
                    <li><img src={instagram} alt='instagram' className="instagram" /></li>
                    <li><img src={pinterest} alt='pinterest' className="pinterest" /></li>
                </ul>
            </div>
        </div>
        </footer>
    </>
    )
}

export default HomePage