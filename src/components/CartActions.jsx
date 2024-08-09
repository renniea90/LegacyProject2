import React from 'react';
import SaveCartButton from './SaveCartButton';
import CheckoutButton from './CheckoutButton';
import RetrieveCart from './RetrieveCart';
import '../CSS/CartActions.css';

const CartActions = ({ onRetrieve }) => (
    <div>
        <SaveCartButton />
        <CheckoutButton />
        <RetrieveCart onRetrieve={onRetrieve} />
    </div>
);

export default CartActions;
