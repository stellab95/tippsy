import Navbar from "../Navbar"
import PostEdit from "../PostEdit"

function PostEditPage(){
    return (
        <>
        <div className="edit-container">
            <Navbar />
            <div className="posts-edit-container">
                <PostEdit />
            </div>
        </div>
        </>
    )
}

export default PostEditPage