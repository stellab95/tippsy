import { useNavigate } from 'react-router-dom'
import imageCover from '../assets/img/pexels-heftiba-1194420.jpg'
import UserProfilePicture from '../assets/img/woman-portrait.jpeg'
import createIcon from '../assets/icons/create-icon.svg'

import '../styles/CreatorProfile.css'

function CreatorProfile(){
    const navigate = useNavigate()

    return (
        <>
            <div className='profile-header'>
                <img src={imageCover} className="image-cover" />
                <img src={UserProfilePicture} className="user-profile-picture" />

                <div className='profile-buttons'>
                    <div className='right-buttons'>
                        <button type="button" onClick={() => navigate('/createpost')}>
                            <img src={createIcon} className="create-icon" />Créer</button>
                    </div>
                </div>
                    <div className='title-lastposts'>
                        {/* <h1 className="lastsPosts">Mes dernières publications</h1> */}
                    </div>
            </div>
        </>
    )
}

export default CreatorProfile