import itemsData from "../itemsData.json";
import PlantCard from '../components/PlantCard';
import { useEffect, useState } from "react";


const ShopPage = () => {

    const apiURL = 'https://seed-theory-api.netlify.app/data.json'
    const [items, setItems] = useState(['']);


    useEffect(() => {
        fetch(apiURL)
            .then((response) => response.json())
            .then((data) => setItems(data))

    }, [])


    return(
        <div className="body">
            <h1 className="shopHeader">Our Plants</h1>
            <div className="shopItems">
                {items.map((item) => (
                        <PlantCard
                        id = {item.id}
                        name = {item.name}
                        price = {item.price}
                        imageUrl = {item.imageUrl}
                        />
                ))}
            </div>
        </div>
    )
};

export default ShopPage;