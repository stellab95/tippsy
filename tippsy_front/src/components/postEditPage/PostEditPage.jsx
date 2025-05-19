import Navbar from "../Navbar"
import PostEdit from "../PostEdit"

function PostEditPage(){
    return (
        <>
        <div className="navbar">
            <Navbar />
        </div>

        <div className="main-container">
            <div className="posts-edit-container">
                <PostEdit />
            </div>
        </div>
        </>
    )
}

export default PostEditPage