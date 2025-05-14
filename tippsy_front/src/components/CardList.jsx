import { useEffect , useState} from 'react'
import Card from './Card'

function CardList(){
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
    const fetchData = async () => {
        const token = localStorage.getItem('token')

        const payload = JSON.parse(atob(token.split('.')[1]))
        const userId = payload.id

        try {
            const response = await fetch(`http://localhost:3000/users/${userId}/posts`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des posts')
            }
        
        const data = await response.json()
        console.log('DATA REÇUE :', data)
        setPosts(data)        
    } catch (err) {
        setError(err.message)
    }
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

export default CardList