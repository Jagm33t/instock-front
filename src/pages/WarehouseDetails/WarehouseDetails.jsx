import { useState, useEffect } from 'react';
import axios from 'axios';

function WarehouseDetails() {
  // working on Warehouse Details
  const [warehouseDetail, setWarehouseDetail] = useState([]);

  useEffect(() => {
    const getWarehouseDetails = () => {
      axios
        .get("http://127.0.0.1:8080/api/warehouses/5/inventories")
        .then((res) => {
          console.log("response from inventory list: ", res.data);
          setWarehouseDetail(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    getWarehouseDetails();
  }, []);

  return (
    <>
      {warehouseDetail.length === 0 ? null : (
        <div>
        <h1>Washington</h1>
          {warehouseDetail.map((inventory) => (
            <div key={inventory.id}>

              <p>INVENTORY ITEM -{inventory.item_name} </p>
              <p>STATUS - {inventory.status} </p>
              <p>CATEGORY - {inventory.category}</p>
              <p>Qty  -{inventory.quantity}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default WarehouseDetails;
