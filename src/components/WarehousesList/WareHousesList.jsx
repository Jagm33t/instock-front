import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import closeIcon from "../../assets/icons/close-24px.svg";
import "./WareHousesList.scss";

import searchImg from "../../assets/icons/search-24px.svg";
import deleteImg from "../../assets/icons/delete_outline-24px.svg";
import editImg from "../../assets/icons/edit-24px.svg";
import chevronRight from "../../assets/icons/chevron_right-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";

function WarehousesList() {
  const apiInstockURL = process.env.REACT_APP_API_SERVER;
  const apiWarehouses = apiInstockURL + "/api/warehouses";
  const [warehouseList, setWarehouseList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); //default
  const [sortColumn, setSortColumn] = useState("");

  const navigate = useNavigate();

  const displayWarehouses = () => {
    axios
      .get(
        `${apiWarehouses}?s=${searchTerm}&sort_by=${sortColumn}&order_by=${sortOrder}`
      )
      .then((response) => {
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
      .delete(`${apiWarehouses}/${selectedWarehouse.id}`)
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

  const handleColumnClick = (columnName) => {
    if (sortColumn === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnName);
      setSortOrder("asc");
    }
  };

  return (
    <div className="warehouses-list">
      <section className="card">
        <div className="card__bgBlue"></div>
        <div className="card__wrapper">
          <div className="card__header inventorypage_card_header">
            <h1 className="card__header-title">Warehouse</h1>
            <div className="card__container inventorypage__card_container">
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
              <div className="inventorybtn">
                <div className="btn__style-link">
                  <button
                    type="button"
                    className="btn__style inventorypage__btn__style"
                    onClick={() => navigate("/warehouses/add")}
                  >
                    + Add New Item
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card-table">
            <div className="card-table__headings">
              <div className="card-table__heading-wrapper">
                <h4 className="card-table__heading inventorypage__heading">
                  Warehouse
                </h4>
                <button className="card-table__heading-button">
                  <img
                    className="card-table__heading-icon"
                    src={sortIcon}
                    alt="sort icon"
                    onClick={() => {
                      handleColumnClick("warehouse_name");
                      displayWarehouses();
                    }}
                  />
                </button>
              </div>
              <div className="card-table__heading-wrapper">
                <h4 className="card-table__heading">Address</h4>
                <button className="card-table__heading-button">
                  <img
                    className="card-table__heading-icon"
                    src={sortIcon}
                    alt="sort icon"
                    onClick={() => {
                      handleColumnClick("address");
                      displayWarehouses();
                    }}
                  />
                </button>
              </div>
              <div className="card-table__heading-wrapper">
                <h4 className="card-table__heading">Contact Name</h4>
                <button className="card-table__heading-button">
                  <img
                    className="card-table__heading-icon"
                    src={sortIcon}
                    alt="sort icon"
                    onClick={() => {
                      handleColumnClick("contact_name");
                      displayWarehouses();
                    }}
                  />
                </button>
              </div>
              <div className="card-table__heading-wrapper">
                <h4 className="card-table__heading">Contact Information</h4>
                <button className="card-table__heading-button">
                  <img
                    className="card-table__heading-icon"
                    src={sortIcon}
                    alt="sort icon"
                    onClick={() => {
                      handleColumnClick("contact_email");
                      displayWarehouses();
                    }}
                  />
                </button>
              </div>
            </div>
            <div className="card-table__heading-wrapper card-table__heading-wrapper--actions ">
              <h4 className="card-table__heading inventorypage__actions">
                Actions
              </h4>
            </div>
          </div>

          <ul>
            {warehouseList.length === 0
              ? null
              : warehouseList.map((warehouse) => (
                  <li
                    className="card__list inventory__card__list"
                    key={warehouse.id}
                  >
                    <div className="card__list-content inventorypage__gapchange">
                      <div className="card__list-content-left">
                        <div className="card__list-wrap inventorypage__inventoryitem">
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
                        <div className="card__list-wrap inventorypage__inventorycategory">
                          <h4 className="card__list-title inventorypage__margintop">
                            Address
                          </h4>
                          <p className="card__list-text-item">
                            <span>{`${warehouse.address}, ${warehouse.city}, ${warehouse.country}`}</span>
                          </p>
                        </div>
                      </div>
                      <div className="card__list-content-right inventorypage__contentright">
                        <div className="card__list-wrap inventorypage__inventorystatus">
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
                            <p className="card__list-text-item">
                              {warehouse.contact_phone}
                            </p>
                            <p className="card__list-text-item">
                              {" "}
                              {warehouse.contact_email}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card__list-actions">
                      <h4 className="card__list-title hideinphonepage">
                        Actions
                      </h4>
                      <img
                        src={deleteImg}
                        alt={deleteImg}
                        className="deleteImg"
                        onClick={() => handleDeleteWarehouse(warehouse)}
                      />
                      <Link to={`/warehouses/${warehouse.id}/edit`}>
                        <img
                          src={editImg}
                          alt={editImg}
                          className="editImg warehouse-editImg"
                        />
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
            <div className="closeBtn">
              {" "}
              <img src={closeIcon} alt="cros" onClick={closeModal} />
            </div>

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
