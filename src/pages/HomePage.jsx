import homeImage from '../homeImage.png'
import { Link } from 'react-router-dom'


const HomePage = () => {
    return(
        <div className='body'>
            
                <div className='featurePanel'>
                <h1 className='homeTitle'>It's not a mirage</h1>
                <p className='featureText'>The hottest prices around!</p>
                <button className='bannerButton'><Link to="/shop">Browse stationery</Link></button>
                </div>
                <img className='homeImage' src={homeImage}/>

                


        </div>
    )
}

export default HomePage;