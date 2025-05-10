import Navbar from "../Navbar";
import CardList from "../CardList";
import CreatorProfile from "../CreatorProfile";

import '../../styles/CreatorProfilePage.css'

function CreatorProfilePage(){
    return (
        <div className="main-container">
            <Navbar />
            <div className="profile-cardlist-container">
                <div className="images-container">
                    <CreatorProfile />
                </div>
                <div className="cardList-container">
                    <CardList />
                </div>
            </div>
        </div>
    )
}

export default CreatorProfilePage