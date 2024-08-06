import homeImage from '../homeImage.jpg'
import { Link } from 'react-router-dom'


const HomePage = () => {
    return(
        <div className='body'>
            
                <div className='featurePanel'>
                <h1 className='homeTitle'>Bring your home to life.</h1>
                <p className='featureText'>Eleveate your living space with a touch of nature. We offer a range of easy-care houseplants.</p>
                <button className='bannerButton'><Link to="/shop">Browse plants</Link></button>
                </div>
                <img className='homeImage' src={homeImage}/>

                


        </div>
    )
}

export default HomePage;