import WarehousesList from "../../components/WarehousesList/WareHousesList";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import "./WareHouses.scss";

function WareHousesPage() {
  // const [warehouses, setWarehouses] = useState([]);
  // const [showModal, setShowModal] = useState(false);
  // const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  // useEffect(() => {
  //   getWarehouses();
  // }, []);

  // const getWarehouses = () => {
  //   axios
  //     .get('http://localhost:8080/api/warehouses')
  //     .then((res) => {
  //       setWarehouses(res.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const handleDeleteWarehouse = (warehouse) => {
  //   setSelectedWarehouse(warehouse);
  //   setShowModal(true);
  // };

  // const confirmDelete = () => {
  //   axios
  //     .delete(`http://localhost:8080/api/warehouses/${selectedWarehouse.id}`)
  //     .then(() => {
  //       setShowModal(false);
  //       setSelectedWarehouse(null);
  //       getWarehouses(); // Refresh the warehouse list after successful deletion
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const closeModal = () => {
  //   setShowModal(false);
  //   setSelectedWarehouse(null);
  // };

  return (
    <>
    <WarehousesList/>
    
    </>
  //   <div>
  //     <h2>Warehouse List</h2>
  //     <table>
  //       <thead>
  //         <tr>
  //           <th>Warehouse Name</th>
  //           <th>Address</th>
  //           <th>Contact_name</th>
  //           <th>Contact_information</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {warehouses.map((warehouse) => (
  //           <tr key={warehouse.id}>
  //             <td>{warehouse.warehouse_name}</td>
  //             <td>{warehouse.address}</td>
  //             <td>{warehouse.contact_name}</td>
  //             <td>{warehouse.contact_phone}</td>
  //             <td>
  //               <button onClick={() => handleDeleteWarehouse(warehouse)}>
  //                 Delete
  //               </button>
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>

  //     {showModal && (
  //       <div className="modal">
  //         <div className="modal-content">
  //           <h3 className="headerwarehouse">Delete {selectedWarehouse && selectedWarehouse.warehouse_name} warehouse?</h3>
  //           <p>Please confirm that you'd like to delete the {selectedWarehouse && selectedWarehouse.warehouse_name} from the list of warehouses. You won't be able to undo this action.</p>
  //           <div className="modal-actions">
  //             <button className="cancelbtn" onClick={closeModal}>Cancel</button>
  //             <button className="deletebtn" onClick={confirmDelete}>Delete</button>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  );

}

export default WareHousesPage;
