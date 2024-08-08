import { useEffect, useState } from "react";
import axios from 'axios';

const useFetchItems = (apiURL) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get(apiURL)
            .then((response) => {
                console.log('Data fetched from API:', response.data);
                setItems(response.data);
            })
            .catch((error) => console.error('Error fetching items:', error));
    }, [apiURL]);

    return items;
};

export default useFetchItems;
