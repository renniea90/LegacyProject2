import React from 'react';
import useFetchItems from '../components/FetchItems';
import ItemList from '../components/ItemList';
import CartComponent from '../components/CartComponent'; 
import '../CSS/ShopPage.css';

const ShopPage = () => {
  const { items, error } = useFetchItems();

  if (error) return <div>Error loading items: {error.message}</div>;

  return (
    <div className="body">
      {Array.isArray(items) && <ItemList items={items} />}
      <CartComponent items={items} setItems={() => {}} /> {/* Add CartComponent here */}
    </div>
  );
};

export default ShopPage;
