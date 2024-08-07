import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ConfirmationDialog({ message, onConfirm, onCancel }) {
    return (
        <div className="confirmation-dialog">
            <p>{message}</p>
            <button onClick={onConfirm}>Confirm</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
}

function UpdateProductDialog({ product, onUpdate, onCancel }) {
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
        <div className="update-dialog">
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <label>
                    Price:
                    <input type="text" name="price" value={formData.price} onChange={handleChange} />
                </label>
                <label>
                    Quantity:
                    <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} />
                </label>
                <label>
                    Image URL:
                    <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                </label>
                <button type="submit">Update</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
}

function ProductList({ onProductUpdate }) {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    const [showUpdateDialog, setShowUpdateDialog] = useState(false);
    const [productToUpdate, setProductToUpdate] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8081/items/getAll');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [onProductUpdate]);

    const handleDelete = (id) => {
        setProductIdToDelete(id);
        setShowConfirmation(true);
    };

    const handleCancel = () => {
        setShowConfirmation(false);
        setProductIdToDelete(null);
    };

    const handleUpdate = (product) => {
        setProductToUpdate(product);
        setShowUpdateDialog(true);
    };

    const handleUpdateCancel = () => {
        setShowUpdateDialog(false);
        setProductToUpdate(null);
    };

    const handleUpdateSubmit = async (updatedProduct) => {
        try {
            const response = await axios.patch(`http://localhost:8081/item/update/${updatedProduct.id}`, updatedProduct);
            if (response.status === 200) {
                onProductUpdate();
                setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
                console.log(`Product with ID ${updatedProduct.id} successfully updated.`);
            } else {
                console.error('Failed to update the product with ID:', updatedProduct.id);
            }
        } catch (error) {
            console.error('Error during update:', error);
        } finally {
            setShowUpdateDialog(false);
            setProductToUpdate(null);
        }
    };

    const handleConfirm = async () => {
        try {
            const response = await axios.delete(`http://localhost:8081/item/remove/${productIdToDelete}`);
            if (response.status === 200) {
                onProductUpdate();
                setProducts(products.filter(product => product.id !== productIdToDelete));
                console.log(`Product with ID ${productIdToDelete} successfully deleted.`);
            } else {
                console.error('Failed to delete the product with ID:', productIdToDelete);
            }
        } catch (error) {
            console.error('Error during deletion:', error);
        } finally {
            setShowConfirmation(false);
            setProductIdToDelete(null);
        }
    };

    const sortedProducts = [...products].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
    });

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div>
            <br /><br />
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th onClick={() => requestSort('id')}>Product ID ↑ ↓</th>
                            <th onClick={() => requestSort('name')}>Product Name ↑ ↓</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Update Product</th>
                            <th>Delete Product</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedProducts.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <button className="update-btn" onClick={() => handleUpdate(product)}>Update</button>
                                </td>
                                <td>
                                    <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showConfirmation && (
                <ConfirmationDialog
                    message="Are you sure you want to delete this product?"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
            {showUpdateDialog && (
                <UpdateProductDialog
                    product={productToUpdate}
                    onUpdate={handleUpdateSubmit}
                    onCancel={handleUpdateCancel}
                />
            )}
        </div>
    );
}

export default ProductList;
