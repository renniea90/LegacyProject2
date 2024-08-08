import React, { useState } from 'react';
import useFetchItems from '../components/FetchItems';
import AddProduct from '../components/AddProduct';
import ConfirmationDialogue from '../components/ConfirmationDialogue';
import UpdateProduct from '../components/UpdateProduct';
import ProductListTable from '../components/ProductListTable';
import '../CSS/AdminPage.css'; 
import '../CSS/Modal.css';
import axios from 'axios';

const AdminPage = () => {
    const { items: products, loading, error, refetch } = useFetchItems();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    const [productToUpdate, setProductToUpdate] = useState(null);
    const [showUpdateDialogue, setShowUpdateDialogue] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'ascending' });

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
                console.log(`Product with ID ${productIdToDelete} successfully deleted.`);
                refetch(); 
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

    if (loading) return <div>Loading products...</div>;
    if (error) return <div>Error loading products: {error.message}</div>;

    return (
        <div>
            <div className="container2">               
                <AddProduct onAddProduct={refetch} /> {}
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
                    onUpdateSuccess={() => {
                        refetch(); 
                        setShowUpdateDialogue(false);
                        setProductToUpdate(null);
                    }}
                />
            )}
        </div>
    );
};

export default AdminPage;
