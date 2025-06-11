import CardList from "../CardList";
import CreatorProfile from "../CreatorProfile";

import { useParams } from 'react-router-dom'
import '../../styles/UserProfilePage.css'


function UserProfilePage(){


    return (
            <div className="main-container">
                <div className="profile-cardlist-container">
                    <div className="images-container">
                        <CreatorProfile isOwner={false}/>
                    </div>
                    <div className="cardList-container">
                    <h1 className="last-posts-title">Publications récentes</h1>
                    <CardList isOwner={false}/>
                </div>
            </div>
        </div>
    )
}

export default UserProfilePage