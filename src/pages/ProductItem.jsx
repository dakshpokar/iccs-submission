import React, {useState} from 'react';
import { Card, Typography, Modal, Button, Carousel, Rate } from 'antd';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph,Text } = Typography;

const ProductItem = ({ product }) => {
    const { title, description, images, category, thumbnail } = product;
    const [modalVisible, setModalVisible] = useState(false);
    const {getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart} = useShoppingCart();
    const quantity = getItemQuantity(product.id)

    const showModal = () => {
      setModalVisible(true);
    };
  
    const handleOk = () => {
      setModalVisible(false);
    };
  
    const handleCancel = () => {
      setModalVisible(false);
    };
  return (
    <div>
    <Card
      hoverable
      style={{ width: 280, margin: 10, }}
      cover={<img alt={title} src={thumbnail} style={{ height: 200, objectFit: 'cover' }} />}
      onClick={()=>showModal()}
    >
      <div style={{ padding: '0 16px' }}>
        <Title level={4} style={{ marginBottom: 0 }}>{title}</Title>
        <Paragraph ellipsis={{ rows: 2 }}>{description}</Paragraph>
        <Rate allowHalf defaultValue={product.rating} />
      </div>
    </Card>
    <Modal
        open={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={800}
        style={{padding: '20px'}}
      >
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, marginRight: '10px' }}>
                <Carousel autoplay style={{width: '50vh'}}>
                    {images.map(image => (
                        <div key={image} style={{ position: 'relative' }}>
                            <img alt={title} src={image} style={{ height: '300px' }} />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '20%', background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.1))' }} />
                        </div>
                    ))}
                </Carousel>
                <br/>
                <Paragraph>{description}</Paragraph>
            </div>
            <div style={{ flex: 0.3, marginRight: '10px' }}>
                      <Title level={2}>{title}</Title>
                      <Rate allowHalf style={{marginBottom: '-20px'}} defaultValue={product.rating} />
                      <Text type="secondary">Average Rating: {product.rating} / 5</Text>
                      <Title level={3} style={{ marginBottom: 0 }}>${product.price}</Title>
                      <p><strong>Category:</strong> {category}</p>
                      <p><strong>Brand:</strong> {product.brand}</p>
                    <br/>
                
                    <div style={{ display: 'flex' }}>
                    {quantity === 0 ? 
                      (
                        <Button type="primary" onClick={()=>increaseCartQuantity(product)} style={{marginTop:'10px'}}>+ Add to Cart</Button>
                      )
                      :( 
                        <div>
                        Items in Cart: 
                          <div>
                            <Button type="primary" onClick={()=>decreaseCartQuantity(product)} style={{marginTop:'10px'}}>-</Button>
                            <span style={{marginInline:'10px'}}>{quantity}</span>
                            <Button type="primary" onClick={()=>increaseCartQuantity(product)} style={{marginTop:'10px'}}>+</Button>
                          </div>
                        </div>
                      )
                    }
                    </div>
            </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductItem;