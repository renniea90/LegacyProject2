import axios from 'axios';
import ItemCard from '../components/ItemCard';
import { useEffect, useState } from "react";

const ShopPage = () => {

    const apiURL = 'http://localhost:8081/items/getAll';
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get(apiURL)
            .then((response) => {
                console.log('Data fetched from API:', response.data); 
                setItems(response.data);
            })
            .catch((error) => console.error('Error fetching items:', error));
    }, []);

    return (
        <div className="body">
            <h1 className="shopHeader">Our Stationery</h1>
            <div className="shopItems">
                {items.map((item) => (
                    <ItemCard                   
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        imageUrl={item.imageUrl} 
                        quantity={item.quantity}
                    />
                ))}
            </div>
        </div>
    );
};

export default ShopPage;
