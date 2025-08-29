import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Link} from 'react-router-dom'

import 'swiper/css'
import '../styles/HomePage.css'

function Carousel({ users, BACKEND_URL }){
     return (    
        <Swiper
        slidesPerView='auto'
        loop={true}
        spaceBetween={20}
        freeMode={true}
        freeModeMomentum={false}
        speed={5000}
        autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
        }}
        modules={[Autoplay]}
        className='mySwiper'
        >
        {users.map((user) => (
            <SwiperSlide
                className='slide'
                key={user.id}
                style={{ width: "350px" }}
            >
            <Link to={`/users/${user.id}`}>
                <img
                src={`${BACKEND_URL}/uploads/${user.avatar}`}
                alt={user.username}
                className="rounded-lg shadow cursor-pointer slide-item"
                />
                <p className="caption text-center">{user.username}</p>
            </Link>
            </SwiperSlide>
        ))}

                {users.map((user) => (
            <SwiperSlide
                className='slide'
                key={user.id}
                style={{ width: "350px" }}
            >
            <Link to={`/users/${user.id}`}>
                <img
                src={`${BACKEND_URL}/uploads/${user.avatar}`}
                alt={user.username}
                className="rounded-lg shadow cursor-pointer slide-item"
                />
                <p className="caption text-center">{user.username}</p>
            </Link>
            </SwiperSlide>
        ))}

        </Swiper>
    )
}

export default Carousel