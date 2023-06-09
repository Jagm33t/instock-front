import { Link, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import closeIcon from "../../assets/icons/close-24px.svg";
import "./WareHousesList.scss";

import searchImg from "../../assets/icons/search-24px.svg";
import deleteImg from "../../assets/icons/delete_outline-24px.svg";
import editImg from "../../assets/icons/edit-24px.svg";
import chevronRight from "../../assets/icons/chevron_right-24px.svg";

function WarehousesList(props) {
  const [warehouseList, setWarehouseList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const displayWarehouses = () => {
    axios
      .get(`http://127.0.0.1:8080/api/warehouses?s=${searchTerm}`)
      .then((response) => {
        console.log(response.data);
        setWarehouseList(response.data);
      })
      .catch((error) => {
        alert(error.response.data);
        console.error(error);
      });
  };

  useEffect(() => {
    displayWarehouses();
  }, []);

  const handleDeleteWarehouse = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setShowModal(true);
  };

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:8080/api/warehouses/${selectedWarehouse.id}`)
      .then(() => {
        setShowModal(false);
        setSelectedWarehouse(null);
        displayWarehouses(); // Refresh the warehouse list after successful deletion
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedWarehouse(null);
  };
  return (
    <div className="warehouses-list">
      <section className="card">
        <div className="card__bgBlue"></div>
        <div className="card__wrapper">
          <div className="card__header">
            <h1 className="card__header-title">Warehouse</h1>
            <div className="card__container">
              <div className="card__searchBox">
                <input
                  type="search"
                  className="card__searchBox-input"
                  id="searchBox"
                  placeholder="Search..."
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                  }}
                />
                <img
                  src={searchImg}
                  alt={searchImg}
                  className="card__searchBox-img"
                  onClick={() => displayWarehouses()}
                />
              </div>
              <div className="btn">
                <div className="btn__style-link">
                  <button type="button" className="btn__style">
                    + Add New Item
                  </button>
                </div>
              </div>
            </div>
          </div>

          <ul>
            {warehouseList.length === 0
              ? null
              : warehouseList.map((warehouse) => (
                  <li className="card__warehouse-list" key={warehouse.id}>
                    <div className="card__list-content">
                      <div className="card__list-content-left">
                        <div className="card__list-wrap">
                          <h4 className="card__list-title ">Warehouse</h4>
                          <Link
                            to={`/warehouses/${warehouse.id}/details`}
                            className="card__product-item"
                          >
                            <p className="card__list-text-item card__list-text-item--product">
                              {warehouse.warehouse_name}
                            </p>
                            <img
                              src={chevronRight}
                              alt={chevronRight}
                              className="card__product-item_chevron"
                            />
                          </Link>
                        </div>
                        <div className="card__list-wrap">
                          <h4 className="card__list-title">Address</h4>
                          <p className="card__list-text-item">
                            {warehouse.address}
                          </p>
                        </div>
                      </div>
                      <div className="card__list-content-right">
                        <div className="card__list-wrap">
                          <h4 className="card__list-title">Contact Name</h4>
                          <p className="card__list-text-item">
                            {warehouse.contact_name}
                          </p>
                        </div>
                        <div className="card__list-wrap">
                          <h4 className="card__list-title">
                            Contact Information
                          </h4>
                          <div>
                            <p>{warehouse.contact_phone}</p>
                            <p>{warehouse.contact_email}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card__list-actions">
                      <h4 className="card__list-title">Actions</h4>
                      <img
                        src={deleteImg}
                        alt={deleteImg}
                        className="deleteImg"
                        onClick={() => handleDeleteWarehouse(warehouse)}
                      />
                      <Link to={`/warehouses/${warehouse.id}/edit`}>
                        <img src={editImg} alt={editImg} className="editImg" />
                      </Link>
                    </div>
                  </li>
                ))}
          </ul>
        </div>
      </section>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="closeBtn"> <img  src={closeIcon} alt="cros"  onClick={closeModal} /></div>

            <h3 className="headerwarehouse">
              Delete {selectedWarehouse && selectedWarehouse.warehouse_name}{" "}
              warehouse?
            </h3>
            <p className="confirmtxt">
              Please confirm that you'd like to delete the{" "}
              {selectedWarehouse && selectedWarehouse.warehouse_name} from the
              list of warehouses. You won't be able to undo this action.
            </p>
            <div className="modal-actions">
              <button className="cancelbtn" onClick={closeModal}>
                Cancel
              </button>
              <button className="deletebtn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WarehousesList;
