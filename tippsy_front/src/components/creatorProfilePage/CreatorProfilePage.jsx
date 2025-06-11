import Navbar from "../Navbar";
import CardList from "../CardList";
import CreatorProfile from "../CreatorProfile";

import '../../styles/CreatorProfilePage.css'

function CreatorProfilePage(){
    return (
        <>
            <div className="navbar">
                <Navbar />
            </div>
            
            <div className="main-container">
                <div className="profile-cardlist-container">
                    <div className="images-container">
                        <CreatorProfile isOwner={true}/>
                    </div>
                    <div className="cardList-container">
                    <CardList />
                </div>
            </div>
        </div>
        </>
    )
}

export default CreatorProfilePage