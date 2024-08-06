import './App.css';
import Card from './components/Card';
import './components/FirstComponent';
import FirstComponent from './components/FirstComponent';
import ImageComponent from './components/ImageComponent';
// import man from './man.webp';
// import woman from './woman.webp';
// import boy from './boy.webp';
// import dog from './dog.webp';
// import dog2 from './dog2.webp';
// import itemsData from "./itemsData.json";
// import PlantCard from './components/PlantCard';
import Navbar from './pages/Navbar';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ShopPage from './pages/ShopPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartProvider';




function App() {
  return (
    <div className="App">
      <div className="title-banner">
        <h1 className='site-title'>seed theory</h1>
      </div>
      <BrowserRouter>
        <Navbar />
        <CartProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/about' element={<AboutPage />} />
        </Routes>
        </CartProvider>
      </BrowserRouter>

      
      
      {/* <FirstComponent />
      <ImageComponent /> */}
      
      
      {/* {itemsData.map((item) => (
        <PlantCard
        name = {item.name}
        price = {item.price}
        imageUrl = {item.imageUrl}
        />


      ))} */}


      {/* <Card name={"David"} age={31} hobby={"Football"} favColour={"Green"} pic={man} isActive={false}/>
      <Card name="Abbie" age={27} hobby={"Pilates"} favColour={"Pink"} pic={woman} isActive={true}/>
      <Card name="Isaac" age={1} hobby={"Chaos"} favColour={"Red"} pic={boy} isActive={true}/>
      <Card name="Obi" age={4} hobby={"Barking"} favColour={"Grey"} pic={dog} isActive={true}/>
      <Card name="Archie" age={2} hobby={"Running"} favColour={"Grey"} pic={dog2} isActive={true}/> */}
    

    </div>
  );
}

export default App;
