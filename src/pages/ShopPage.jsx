import useFetchItems from '../components/FetchItems';
import ItemList from '../components/ItemList';

const ShopPage = () => {
    const apiURL = 'http://localhost:8081/items/getAll';
    const items = useFetchItems(apiURL);
   
    return (
        <div className="body">
            <h1 className="shopHeader">Our Stationery</h1>     
            <ItemList items={items} />
        </div>
    );
};

export default ShopPage;