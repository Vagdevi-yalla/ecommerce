import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/products");
        setProducts(response.data);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div>
        <h1>vagdevi's products</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <div>Name: {product.name}</div>
              <div>Category: {product.productCategory}</div>
              <div>Price: {product.price}</div>
              <div>
                {product.images.map((url, index) => (
                  <img key={index} src={url} alt={`Image ${index}`} />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default App;
