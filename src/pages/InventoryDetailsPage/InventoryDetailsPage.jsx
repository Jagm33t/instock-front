import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InventoryDetailsPage() {
  const [inventoryItem, setInventoryItem] = useState(null);

  useEffect(() => {
    fetchInventoryItem();
  }, []);

  const fetchInventoryItem = () => {
    axios
      .get('http://localhost:8080/api/inventories/')
      .then((res) => {
        if (res.data.length > 0) {
          setInventoryItem(res.data[0]);
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {inventoryItem ? (
        <>
          <h2>Inventory Item Details</h2>
          <p>ID: {inventoryItem.id} </p>
          <p>Warehouse ID: {inventoryItem.warehouse_id}</p>
          <p>Item Name: {inventoryItem.item_name}</p>
          <p>Description: {inventoryItem.description}</p>
          <p>Category: {inventoryItem.category}</p>
          <p>Status: {inventoryItem.status}</p>
          <p>Quantity: {inventoryItem.quantity}</p>
        </>
      ) : (
        <p>Loading inventory item details...</p>
      )}
    </div>
  );
}

export default InventoryDetailsPage;
