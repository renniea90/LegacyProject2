import React, { useState } from 'react';
import Modal from 'react-modal';
import '../CSS/Modal.css';

Modal.setAppElement('#root'); 

const UpdateProduct = ({ product, onUpdate, onCancel }) => {
    const [formData, setFormData] = useState({ ...product });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
    };

    return (
        <Modal
            isOpen={true}
            onRequestClose={onCancel}
            contentLabel="Update Product Modal"
            className="modal"
            overlayClassName="modal-overlay"
        >
            <h2>Update Product</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Price:
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            step="0.01"
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Quantity:
                        <input
                            type="number"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Image URL:
                        <input
                            type="text"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <button type="submit">Update</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </Modal>
    );
};

export default UpdateProduct;
