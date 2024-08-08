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

  const [existingProducts, setExistingProducts] = useState([]);

   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/items/getAll');
        setExistingProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setAlertMessage('Failed to fetch existing products.');
        setShowAlert(true);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !quantity || !imageUrl) {
      setAlertMessage('All fields are required.');
      setShowAlert(true);
      return;
    }

    const product = {
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      imageUrl
    };

    const productExists = existingProducts.some(p => p.name === name);

    if (productExists) {
      setAlertMessage('Product already exists. Please enter a different product.');
      setShowAlert(true);
      return;
    }

    try {
      const postResponse = await axios.post('http://localhost:8081/item/add', product);
      const data = postResponse.data;
      setAlertMessage(`New Product Added. Your Unique ID is ${data.id}`);
      setShowAlert(true);
    
      setName('');
      setPrice('');
      setQuantity('');
      setImageUrl('');
 
      setExistingProducts([...existingProducts, data]);
      onAddProduct();
    } catch (error) {
      console.error('Error adding product:', error);
      setAlertMessage('Failed to add product.');
      setShowAlert(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label1">Name: </label>
          <input
            className="input1"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="label1">Price: </label>
          <input
            className="input1"
            type="number"
            step="0.01"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="label1">Quantity: </label>
          <input
            className="input1"
            type="number"
            required
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="label1">Image URL: </label>
          <input
            className="input1"
            type="text"
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <button className="add-btn" type="submit">Add Product</button>

        {showAlert && (
          <CustomAlert
            message={alertMessage}
            onClose={() => setShowAlert(false)}
          />
        )}
      </form>
    </div>
  );
};

export default AddProduct;
