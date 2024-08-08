import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddProduct from '../components/AddProduct';
import ConfirmationDialogue from '../components/ConfirmationDialogue';
import UpdateProduct from '../components/UpdateProduct';
import ProductListTable from '../components/ProductListTable';
import '../CSS/AdminPage.css'; 
import '../CSS/Modal.css';

const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    const [productToUpdate, setProductToUpdate] = useState(null);
    const [showUpdateDialogue, setShowUpdateDialogue] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8081/items/getAll');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = (id) => {
        setProductIdToDelete(id);
        setShowConfirmation(true);
    };

    const handleCancel = () => {
        setShowConfirmation(false);
        setProductIdToDelete(null);
    };

    const handleConfirm = async () => {
        try {
            const response = await axios.delete(`http://localhost:8081/item/remove/${productIdToDelete}`);
            if (response.status === 200) {
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

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div>
            <div className="container2">               
                <AddProduct onAddProduct={fetchProducts} />
            </div>
            <div className="table-wrapper">
                <ProductListTable
                    products={products}
                    onUpdate={(product) => {
                        setProductToUpdate(product);
                        setShowUpdateDialogue(true);
                    }}
                    onDelete={handleDelete}
                    onRequestSort={requestSort}
                    sortConfig={sortConfig}
                />
            </div>
            {showConfirmation && (
                <ConfirmationDialogue
                    message="Are you sure you want to delete this product?"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            )}
            {showUpdateDialogue && productToUpdate && (
                <UpdateProduct
                    product={productToUpdate}
                    onCancel={() => setShowUpdateDialogue(false)}
                    onUpdateSuccess={(updatedProduct) => {
                        setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
                        setShowUpdateDialogue(false);
                        setProductToUpdate(null);
                    }}
                />
            )}
        </div>
    );
};

export default AdminPage;
