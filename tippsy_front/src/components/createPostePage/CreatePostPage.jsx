import Navbar from "../Navbar"
import CreatePost from "../CreatePost"

function CreatePostPage(){
    return (
        <div className="main-container">
            <Navbar />
            <div className="create-post-container">
                <CreatePost />
            </div>
        </div>
    )
}

export default CreatePostPage