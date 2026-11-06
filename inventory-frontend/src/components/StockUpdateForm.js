// src/components/StockUpdateForm.js
import React, { useState } from 'react';

function StockUpdateForm({ onStockUpdated }) {
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [operation, setOperation] = useState('decrease'); // 'decrease' o 'increase'
  const API_BASE_URL = 'http://localhost:8080/v1/inventory';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productId || quantity <= 0) {
      alert('Por favor, ingresa un ID de producto y una cantidad válida.');
      return;
    }

    const payload = { productId, quantity: parseInt(quantity) };
    const endpoint = `${API_BASE_URL}/${operation}`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(`Stock ${operation === 'decrease' ? 'disminuido' : 'aumentado'} con éxito!`);
        setProductId('');
        setQuantity('');
        onStockUpdated(); // Llama a la función para que ProductList se actualice
      } else if (response.status === 409) {
        const errorData = await response.json(); // Si tu backend envía un JSON con el mensaje de error
        alert(`Error de stock: ${errorData.message || 'Stock insuficiente o conflicto.'}`);
      } else if (response.status === 400) {
         const errorData = await response.json();
         const errorMessage = Object.values(errorData).join(', '); // Concatena los mensajes de error de validación
         alert(`Error de validación: ${errorMessage}`);
      }
      else {
        alert(`Error al ${operation === 'decrease' ? 'disminuir' : 'aumentar'} stock: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert('Error de conexión. Asegúrate que el backend esté corriendo y sea accesible.');
    }
  };

  return (
    <section>
      <h2>Actualizar Stock</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="productId">ID del Producto:</label>
          <input
            type="text"
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">Cantidad:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            min="1"
          />
        </div>
        <div>
          <label htmlFor="operation">Operación:</label>
          <select
            id="operation"
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option value="decrease">Disminuir</option>
            <option value="increase">Aumentar</option>
          </select>
        </div>
        <button type="submit">Actualizar</button>
      </form>
    </section>
  );
}

export default StockUpdateForm;