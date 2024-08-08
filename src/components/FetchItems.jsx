import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8081/items/getAll';

const useFetchItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Define a function to fetch items
    const fetchItems = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            console.log('Data fetched from API:', response.data);
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch items when the component mounts
    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    return { items, loading, error, refetch: fetchItems };
};

export default useFetchItems;
