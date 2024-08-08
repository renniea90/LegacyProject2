import useFetchItems from '../components/FetchItems';
import ItemList from '../components/ItemList';
import '../CSS/ShopPage.css';


const ShopPage = () => {
    const apiURL = 'http://localhost:8081/items/getAll';
    const items = useFetchItems(apiURL);
   
    return (
        <div className="body">
           <ItemList items={items} />
        </div>
    );
};

export default ShopPage;