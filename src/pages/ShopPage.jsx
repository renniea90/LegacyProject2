import React from 'react';
import useFetchItems from '../components/FetchItems';
import ItemList from '../components/ItemList';
import '../CSS/ShopPage.css';

const ShopPage = () => {
    const { items, loading, error } = useFetchItems();

    if (loading) return <div>Loading items...</div>;
    if (error) return <div>Error loading items: {error.message}</div>;

    return (
        <div className="body">
            {Array.isArray(items) && <ItemList items={items} />}
        </div>
    );
};

export default ShopPage;
