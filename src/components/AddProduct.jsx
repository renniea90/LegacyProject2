import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomAlert from './CustomAlert';
import Modal from 'react-modal';
import ProductForm from './ProductForm';

Modal.setAppElement('#root');

const AddProduct = ({ onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    imageUrl: ''
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [existingProducts, setExistingProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    if (!formData.name || !formData.price || !formData.quantity || !formData.imageUrl) {
      setAlertMessage('All fields are required.');
      setShowAlert(true);
      return;
    }

    const productExists = existingProducts.some(p => p.name === formData.name);

    if (productExists) {
      setAlertMessage('Product already exists. Please enter a different product.');
      setShowAlert(true);
      return;
    }

    try {
      const postResponse = await axios.post('http://localhost:8081/item/add', {
        ...formData,
        price: parseFloat(formData.price).toFixed(2),
        quantity: parseInt(formData.quantity, 10)
      });
      const data = postResponse.data;
      setAlertMessage(`New Product Added. Your Unique ID is ${data.id}`);
      setShowAlert(true);
      setFormData({
        name: '',
        price: '',
        quantity: '',
        imageUrl: ''
      });
      setExistingProducts([...existingProducts, data]);
      onAddProduct();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding product:', error);
      setAlertMessage('Failed to add product.');
      setShowAlert(true);
    }
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)} className="addproduct-btn">Add Product</button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        shouldCloseOnOverlayClick={false}
        contentLabel="Add Product Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Add Product</h2>
        <ProductForm
          formData={formData}
          onChange={setFormData}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
      {showAlert && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};

export default AddProduct;
