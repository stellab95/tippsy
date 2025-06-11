import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

import '../../styles/HomePage.css'

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
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        const userFromStorage = localStorage.getItem('user')

   try {

    if (token && userFromStorage) {
        const user = JSON.parse(userFromStorage)

        setUserId(user.id)

        fetch(`http://localhost:3000/users/${user.id}`, {
               method: 'GET',
               headers: {
                    'Authorization': `Bearer ${token}`
               },
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
        fetch('http://localhost:3000/users')
        .then(res => res.json())
        .then(data => {
            setUsers(data)
            console.log("response data =", data);
        })
    .catch(err => console.error('Erreur lors du chargement des utilisateurs :', err))
}, [])



    return (
        <>
        <div className='home-navbar-container '>
            <nav className="home-navbar-content wrapper">
                <a href="#" className='home-logo'>tippsy</a>
                <ul className="home-navbar-content">
                    <li>
                        <a href="#" style={{marginRight: 15}}>Accueil</a>
                    </li>
                    <li>
                        <a href="#" style={{marginRight: 15}}>Créateurs</a>
                    </li>
                    <li>
                        <a href="#">Fonctionnalités</a>
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
        <div className='home-img-container'>
            <img src={joyfulArtist} alt='joyful-artist' className="joyful-artist" />
            <p className='home-hero-slogan'>Transformez vos passions en entreprises !</p>
        </div>
        <div className='wrapper'>
            <p className='slider-title'>réussissez grâce à votre art</p>
            <div className='text-button-container wrapper'>
                <p className='slider-text'>Tippsy est le meilleur endroit pour créer une communauté avec vos plus grands fans, partager des oeuvres exclusives et transformer votre passion en entreprise créative durable.</p>
                <button className='start-button'>Commencez à créer avec Tippsy</button>
            </div>
        </div>
        
        <div className="slider">
            <div className="slide-track">
                {users.map((user) => (
                    <div className="slide" key={user.id}>
                        <Link to={`/users/${user.id}`}>
                        <img className="slide-item" src={`http://localhost:3000/uploads/${user.avatar}`} alt={user.username} />
                        <p className="caption">{user.username}</p>
                        </Link>
                    </div>
                ))}

        {/* boucle infinie */}
                {users.map((user) => (
                    <div className="slide" key={user.id}>
                        <Link to={`/users/${user.id}`}>
                        <img className="slide-item" src={`http://localhost:3000/uploads/${user.avatar}`} alt={user.username} />
                        <p className="caption">{user.username}</p>
                        </Link>
                    </div>
                ))}
             </div>
        </div>


        <div>
        </div>

        <div className='earn-money-container'>
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
        </div>
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