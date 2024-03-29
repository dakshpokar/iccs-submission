import React from 'react'
import { Modal, Empty } from 'antd';
import { useShoppingCart } from '../context/ShoppingCartContext';
import CartItems from './CartItems';

const ShoppingCart = ({ isCartOpen }) => {
    const { closeCart, cartItems } = useShoppingCart();

    const handleOk = () => {
        closeCart();
        console.log('Clicked OK');
    };

    const handleCancel = () => {
        closeCart();
        console.log('Clicked Cancel');
    };

  return (
    <Modal
        title="Shopping Cart"
        open={isCartOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Checkout"
        width={800}
      >
        {cartItems.length > 0 ?
        cartItems.map(item => (
            <CartItems key={item.productId} product={item} />
            ))
            :  <Empty description="Cart is Empty!"/>
        }
      </Modal>
  )
}

export default ShoppingCart