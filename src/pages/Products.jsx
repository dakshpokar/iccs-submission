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

  return (
    <div>
      <h2>Purchasable Products</h2>
      <Search
        placeholder="Search products"
        onSearch={handleSearch}
        onChange={e => handleSearch(e.target.value)}
        value={searchText}
        style={{ marginBottom: 16 }}
      />
      
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
