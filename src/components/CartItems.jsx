import React from 'react'
import { useShoppingCart } from '../context/ShoppingCartContext'
import { Card, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

const CartItems = ({product}) => {
    const { removeFromCart, decreaseCartQuantity, increaseCartQuantity } = useShoppingCart()
    const quantity = product.quantity
  return (
    <Card
        style={{
          marginTop: 16,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div >
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={{
                    width: 100,
                    height: 100,
                    objectFit: 'cover',
                    marginRight: 16,
                    }}
                />
            </div>
            <div>
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <div>
                    Items in Cart: 
                    <div>
                    <Button type="primary" onClick={()=>decreaseCartQuantity(product)} style={{marginTop:'10px'}}>-</Button>
                    <span style={{marginInline:'10px'}}>{quantity}</span>
                    <Button type="primary" onClick={()=>increaseCartQuantity(product)} style={{marginTop:'10px'}}>+</Button>
                    </div>
                </div>
            </div>
          </div>
          <div>
            <DeleteOutlined onClick={() => removeFromCart(product)} />
          </div>
        </div>
    </Card>
  )
}

export default CartItems