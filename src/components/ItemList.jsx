import ItemCard from '../components/ItemCard';

const ItemList = ({ items }) => {
    return (
        <div className="shopItems">
            {items.map((item) => (
                <ItemCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    quantity={item.quantity}
                />
            ))}
        </div>
    );
};

export default ItemList;
