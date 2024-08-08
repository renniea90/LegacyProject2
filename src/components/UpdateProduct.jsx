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
                    <label className="label1">
                        Name:
                        <input
                         className="input1"
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
                         className="input1"
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
                         className="input1"
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
                         className="input1"
                            type="text"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            required
                        />
                    </label>
                </div>
                <button className="add-btn" type="submit">Update</button>
                <button className="cancel-btn" type="button" onClick={onCancel}>Cancel</button>
            </form>
        </Modal>
    );
};

export default UpdateProduct;
