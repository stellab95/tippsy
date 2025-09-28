import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { BACKEND_URL } from '../../config.js'

// import '../../styles/HomePage.css'
import Carousel from '../Carousel'

import joyfulArtist from '../../assets/img/joyful-artist.jpeg'
import colorfulGallery from '../../assets/img/colorful-gallery.jpeg'
import facebook from '../../assets/icons/facebook.png'
import instagram from '../../assets/icons/instagram.png'
import pinterest from '../../assets/icons/pinterest.png'

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
                setUsers([]) 
            }
        })
        .catch(err => {
            console.error('Erreur lors du chargement des utilisateurs :', err)
            setUsers([]) 
        })
}, [])

console.log("Liste des users à afficher dans le slider:", users);


    return (
        <>
        {/* NAVBAR */}
        <div className="navbar bg-base-100 shadow-sm home-navbar-container">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl home-logo">Tippsy</a>
            </div>
            <div className="flex gap-2">
                {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
                <div className="navbar-end">
                    <a className="btn home-connexion" onClick={() => navigate('/register')}>S'identifier</a>
                </div>    
            </div>
        </div>

        {/* HERO */}
        <div className="hero min-h-screen" style={{backgroundImage: `url(${joyfulArtist})`}}>
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-md">
                <h1 className="mb-5 text-5xl font-bold">Transformez vos passions en entreprises !</h1>
                <p className="mb-5">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                    quasi. In deleniti eaque aut repudiandae et a id nisi.
                </p>
                <button className="btn btn-primary" onClick={() => navigate('/register')}>Commencez à créer avec Tippsy</button>
                </div>
            </div>
        </div> 

        {/* MIDDLE PART */}
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <img src={colorfulGallery} className="w-full max-w-full lg:max-w-xl rounded-lg shadow-2xl object-cover object-center"/>
                <div>
                    <h1 className="text-5xl font-bold">Réussissez grâce à votre art!</h1>
                    <p className="py-6">
                        Tippsy est le meilleur endroit pour créer une communauté avec vos plus grands fans, 
                        partager des oeuvres exclusives et transformer votre passion en entreprise créative durable.
                    </p>
                    <button className="btn btn-primary" onClick={() => navigate('/register')}>Configurez votre boutique</button>
                </div>
            </div>
        </div>
        
        <div className='mt-4'>
            <h4 className="text-3xl font-bold ml-4">Créateurs qui pourraient vous plaire</h4>
            <Carousel users={users} BACKEND_URL={BACKEND_URL}/>
        </div>
        {/* FOOTER */}
        <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
            <aside className="grid-flow-col items-center">
                <p className="logo-footer fill-current">T.</p>
            </aside>
            <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                <a>
                    <img src={facebook} alt='facebook' className="facebook" />    </a>
                <a>
                    <img src={instagram} alt='instagram' className="instagram" />    </a>
                <a>
                    <img src={pinterest} alt='pinterest' className="pinterest" />    </a>
            </nav>
        </footer>
    </>
    )
}

export default HomePage