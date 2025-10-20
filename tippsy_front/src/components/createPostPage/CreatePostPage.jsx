import Navbar from "../Navbar"
import CreatePost from "../CreatePost"

function CreatePostPage(){
    return (
        <>
        <div className="navbar-creator-profile">
            <Navbar />
        </div>
            <div>
                <div className="create-post-container">
                    <CreatePost />
                </div>
            </div>
        </>
    )
}

export default CreatePostPage