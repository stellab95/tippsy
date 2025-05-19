import Navbar from "../Navbar"
import CreatePost from "../CreatePost"

function CreatePostPage(){
    return (
        <>
        <div className="navbar">
            <Navbar />
        </div>
            <div className="main-post-container">
                <div className="create-post-container">
                    <CreatePost />
                </div>
            </div>
        </>
    )
}

export default CreatePostPage