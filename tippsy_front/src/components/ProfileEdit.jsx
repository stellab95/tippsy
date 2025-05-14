import { useNavigate } from 'react-router-dom'
import UserIcon from '../assets/icons/user-icon.svg'


import '../styles/ProfileEdit.css'

function ProfileEdit() {
    const navigate = useNavigate()


    return (
        <div>
            <h1>Modifier la page</h1>
                <div className='change-user-profile-picture'>
                    <p className='profile-picture-title'>Photo de profil</p>
                    <img src={UserIcon} className="change-user-picture" />
                </div>
            <div className='change-image-cover'>
                <p className='cover-title'>Photo de couverture</p>
                <div className='change-cover-user-profile'>
                </div>            
            </div>
            <div >
                <p className='change-biography'>Biographie</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras feugiat pellentesque elit in feugiat. Phasellus mauris odio, molestie nec nisi sed, aliquet ultrices nibh. Etiam eros nibh, elementum quis egestas at, tempor quis libero. Duis pulvinar posuere aliquam. Aliquam velit orci, commodo eu enim vel, eleifend tempor ipsum. </p>
            </div>
        </div>
    )
}

export default ProfileEdit