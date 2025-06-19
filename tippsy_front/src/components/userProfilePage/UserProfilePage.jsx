import CardList from "../CardList";
import CreatorProfile from "../CreatorProfile";
import HomeNavBar from "../HomeNavBar";

import { useParams } from 'react-router-dom'
import '../../styles/UserProfilePage.css'


function UserProfilePage(){
    const { id } = useParams()
    const userIsLoggedIn = !!localStorage.getItem('token')

    return (
        <>
            <div className='home-navbar-container '>
                <HomeNavBar isOwner={userIsLoggedIn} />
            </div>
            <div className="main-container">
                    <div className="profile-cardlist-container">
                        <div className="images-container">
                            <CreatorProfile isOwner={false} userId={id}/>
                        </div>
                        <div className="cardList-container">
                        <h1 className="last-posts-title">Publications récentes</h1>
                        <CardList isOwner={false} userId={id}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfilePage