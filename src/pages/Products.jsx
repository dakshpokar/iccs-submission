import React, {useEffect, useState} from 'react'

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div>
      <h2>Purchasable Products</h2>
      <ul>
        {Array.isArray(products) ? (
          products.map(product => (
            <li key={product.id}>
              <div>{product.name}</div>
              <div>{product.price}</div>
            </li>
          ))
        ) : (
          <li>No products available</li>
        )}
      </ul>
    </div>
  );
}

export default Products