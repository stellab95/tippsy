import { useEffect , useState} from 'react'
import Card from './Card'

function TestCardList(){
    const [posts, setPosts] = useState([])

useEffect(() => {
    const fetchData = async () => {
        let url = 'http://localhost:3000/posts'
        
        const response = await fetch(url)
        const data = await response.json()
        setPosts(data)
        console.log(posts);
        
    }
    fetchData()
}, [])

return (
    <div>
        {posts.map((post) =>(
        <Card key={post.id} post={post}/>
        ))}
    </div>
)
}

export default TestCardList