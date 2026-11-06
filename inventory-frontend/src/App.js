// src/App.js
import React, { useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import StockUpdateForm from './components/StockUpdateForm';

function App() {
  const [refreshKey, setRefreshKey] = useState(0); // Estado para forzar la actualización de ProductList

  const handleStockUpdate = () => {
    setRefreshKey(oldKey => oldKey + 1); // Incrementa la key para forzar que ProductList se re-renderice
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Sistema de Gestión de Inventario</h1>
      </header>
      <main>
        <ProductList key={refreshKey} /> {/* Usamos la key para forzar la actualización */}
        <hr /> {/* Separador visual */}
        <StockUpdateForm onStockUpdated={handleStockUpdate} />
      </main>
    </div>
  );
}

export default App;