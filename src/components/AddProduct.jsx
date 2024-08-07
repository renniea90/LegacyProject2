import { useState, useEffect } from "react";
import axios from 'axios';
import CustomAlert from "./CustomAlert";

const AddProduct = ({ onAddProduct }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/items/getAll');
      setProducts(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const product = {
      name: name,
      price: price,
      quantity: quantity,
      imageUrl: imageUrl
    };

    try {
      const checkResponse = await axios.get('http://localhost:8081/items/getAll');
      const existingData = checkResponse.data;

      const dataExists = existingData.some(data => data.name === name);

      if (dataExists) {
        setAlertMessage('Product Already Exists. Please enter a different product.');
        setShowAlert(true);
        return;
      }

      const postResponse = await axios.post('http://localhost:8081/item/add', product);
      const data = postResponse.data;

      setAlertMessage(`New Product Added. Your Unique ID is ${data.id}`);
      setShowAlert(true);

      setName('');
      setPrice('');
      setQuantity('');
      setImageUrl('');
      onAddProduct();

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <br /><br />

        <label className="label1">Name: </label>
        <input
          className="input1"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />

        <label className="label1">Price: </label>
        <input
          className="input1"
          type="number" 
          step="0.01" 
          required
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br /><br />

        <label className="label1">Quantity: </label>
        <input
          className="input1"
          type="number" 
          required
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <br /><br />

        <label className="label1">ImageUrl: </label>
        <input
          className="input1"
          type="text"
          required
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <br /><br />

        <button className="add-btn" type="submit">Add Product</button>
        <br /><br />
        {showAlert && (
          <CustomAlert
            message={alertMessage}
            onClose={() => {
              setShowAlert(false);
            }}
          />
        )}
      </form>
    </div>
  );
};

export default AddProduct;
