import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InventoryDetailsPage() {
  const [inventoryItem, setInventoryItem] = useState(null);

  useEffect(() => {
    fetchInventoryItem();
  }, []);

  const fetchInventoryItem = () => {
    axios
      .get('http://127.0.0.1:8080/api/inventories/5')
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
          <h2>{inventoryItem.item_name}</h2>
          {/* <p>ID: {inventoryItem.id} </p> */}
          {/* <p>Warehouse ID: {inventoryItem.warehouse_id}</p> */}
          {/* <p>Item Description: {inventoryItem.item_name}</p> */}
          <p>Item Description: {inventoryItem.description}</p>
          <p>Category: {inventoryItem.category}</p>
          <p>Status: {inventoryItem.status}</p>
          <p>Quantity: {inventoryItem.quantity}</p>
          <p>Warehouse : {inventoryItem.warehouse_name}</p>
        </>
      ) : (
        <p>Loading inventory item details...</p>
      )}
    </div>
  );
}

export default InventoryDetailsPage;
