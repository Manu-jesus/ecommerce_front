// src/components/ProductList.js
import React, { useEffect, useState } from 'react';

function ProductList() {
  const [products, setProducts] = useState([]);
  const API_BASE_URL = 'http://localhost:8080/v1/inventory'; // Asegúrate que coincida con tu backend

  // Función para cargar los productos
  const fetchProducts = async () => {
    try {
      // Por simplicidad, asumimos IDs fijos para los productos que inicializamos en el backend
      const productIds = ['product-A', 'product-B', 'product-C'];
      const fetchedProducts = [];

      for (const id of productIds) {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (response.ok) {
          const data = await response.json();
          fetchedProducts.push(data);
        } else {
          console.error(`Error al obtener stock de ${id}:`, response.statusText);
        }
      }
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error al conectar con el backend:', error);
      alert('Error al conectar con el servidor de inventario. Asegúrate que el backend esté corriendo.');
    }
  };

  // Se ejecuta una vez cuando el componente se monta
  useEffect(() => {
    fetchProducts();
    // Opcional: Recargar cada cierto tiempo para ver cambios en tiempo real
    const interval = setInterval(fetchProducts, 5000); // Recarga cada 5 segundos
    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  return (
    <section>
      <h2>Stock de Productos</h2>
      <table>
        <thead>
          <tr>
            <th>ID del Producto</th>
            <th>Stock Disponible</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>{product.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={fetchProducts}>Actualizar Stock</button>
    </section>
  );
}

export default ProductList;