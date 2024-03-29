import React, { useState, useEffect } from 'react';
import { Table, Input, Space, Typography, Button, InputNumber } from 'antd';
import debounce from 'lodash.debounce';
import ProductItem from './ProductItem';

const { Search } = Input;
const { Title, Paragraph } = Typography;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products);
        setFilteredProducts(data.products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleSearch = debounce(searchText => {
    setSearchText(searchText);
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, 30);

  const handleAddToCart = (productId, quantity) => {
    console.log('Product added to cart:', productId, 'with quantity:', quantity);
  };


  const columns = [
    {
      title: 'Product',
      dataIndex: 'title',
      key: 'product',
      render: (text, record) => (
        <Space>
         <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={record.images[0]} alt={record.name} style={{ width: 50, height: 50, borderRadius: '50%', marginRight: 10 }} />
          <div>
            <Title level={2} style={{ margin: 0 }}>{record.title}</Title>
            <Paragraph type="secondary" style={{ margin: 0 }}>{record.description.length > 100 ? `${record.description.slice(0, 100)}...` : record.description}</Paragraph>
          </div>
        </div>
        </Space>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => (
        <Space>
          <span>${text}</span>
        </Space>
      ),
    },
    {
      title: 'Purchase',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <InputNumber min={1} defaultValue={1} onChange={value => record.quantity = value} />
          <Button type="primary" onClick={() => handleAddToCart(record.id, record.quantity || 1)}>Add to Cart</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2>Purchasable Products</h2>
      <Search
        placeholder="Search products"
        onSearch={handleSearch}
        onChange={e => handleSearch(e.target.value)}
        value={searchText}
        style={{ width: 200, marginBottom: 16 }}
      />
      {/* <Table
        dataSource={filteredProducts}
        columns={columns}
        pagination={false}
      /> */}
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredProducts.map(product => (
          <ProductItem
            product={product}
          />
        ))}
        </div>
    </div>
  );
};

export default Products;
