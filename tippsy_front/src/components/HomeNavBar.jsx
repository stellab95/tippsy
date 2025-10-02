import { useNavigate, Link  } from "react-router-dom"
import Navbar from "./Navbar"

function HomeNavBar({ isOwner = false }){
    const navigate = useNavigate()

    if (!isOwner) {
        return (
        <div className="navbar bg-base-100 shadow-sm home-navbar-container">
            <div className="flex-1">
                <Link to="/"><a className="text-xl home-logo">Tippsy</a></Link>
            </div>
            <div className="flex gap-2">
                {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
                <div className="navbar-end">
                    <a className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg home-connexion" onClick={() => navigate('/register')}>S'identifier</a>
                </div>    
            </div>
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