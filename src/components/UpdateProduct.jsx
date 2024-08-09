import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import CustomAlert from './CustomAlert';
import ProductForm from './ProductForm';
import axios from 'axios';
import '../CSS/Modal.css';

Modal.setAppElement('#root');

const UpdateProduct = ({ product, onCancel, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({ ...product });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    setFormData({ ...product });
  }, [product]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(`http://localhost:8081/item/update/${formData.id}`, formData);
      if (response.status === 200) {
        setAlertMessage('Product successfully updated.');
        setShowAlert(true);
        onUpdateSuccess(formData);
      } else {
        setAlertMessage('Failed to update product.');
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      setAlertMessage('Failed to update product.');
      setShowAlert(true);
    }
  };

  return (
    <div>
      <Modal
        isOpen={true}
        onRequestClose={onCancel}
        contentLabel="Update Product Modal"
        shouldCloseOnOverlayClick={false}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <h2>Update Product {formData.id}</h2>
        <ProductForm
          formData={formData}
          onChange={setFormData}
          onSubmit={handleSubmit}
          onCancel={onCancel}
          isUpdateMode={true}
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

export default UpdateProduct;
