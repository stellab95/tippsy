import { useEffect , useState} from 'react'
import { BACKEND_URL } from '../config.js'

import Card from './Card'

function CardList({ userId, isOwner = true }) {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');

            if (!userId && token) {
                const payload = JSON.parse(atob(token.split('.')[1]));
                userId = payload.id;
            }

            if (!userId) {
                setError("Aucun identifiant utilisateur trouvé");
                return;
            }

            try {
                const response = await fetch(`${BACKEND_URL}/users/${userId}/posts`, {
                    headers: token ? { 'Authorization': `Bearer ${token}` } : {}
                });
                
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des posts");
                }
                
                const data = await response.json();
                console.log("Posts récupérés :", data)                    
                setPosts(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, [userId]);

    return (
        <div>
            {posts.map((post) => (
                <Card key={post.id} post={post} isOwner={isOwner} />
            ))}
        </div>
    );
}


export default CardList