import Navbar from "../Navbar";
import CardList from "../CardList";

import '../../styles/HomePage.css'

function HomePage(){
    return (
        <div className="main-container">
            <Navbar />
             <div className="cards-container">
                <CardList />
            </div>
        </div>
    )
}

export default HomePage