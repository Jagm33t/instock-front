import { useState, useEffect } from 'react';
import axios from 'axios';


function WarehouseDetails() {

  // working on Warehouse Details
  const [warehouseDetail,setWarehouseDetail] = useState('');


  useEffect(() => {
    const getWarehouseDetails = () => {
      axios.get("http://127.0.0.1:8080/api/warehouses/3/inventories")
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
          <h2>{warehouseDetail[0].description}
          
          </h2>
          
        </div>
      )}
    </>
  );
}

export default WarehouseDetails;