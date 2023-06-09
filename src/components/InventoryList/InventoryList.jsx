import searchImg from "../../assets/icons/search-24px.svg";
import deleteImg from "../../assets/icons/delete_outline-24px.svg";
import editImg from "../../assets/icons/edit-24px.svg";
import chevronRight from "../../assets/icons/chevron_right-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./InventoryList.scss";
import DeleteInventory from "../DeleteInventory/DeleteInventory";

function InventoryList() {
  const [inventoryList, setInventoryList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); //default
  const [sortColumn, setSortColumn] = useState("");

  const displayInventory = () => {
    axios
      .get(
        `http://127.0.0.1:8080/api/inventories?s=${searchTerm}&sort_by=${sortColumn}&order_by=${sortOrder}`
      )
      .then((response) => {
        // console.log(response.data);
        setInventoryList(response.data);
      })
      .catch((error) => {
        alert(error.response.data);
        console.error(error);
      });
  };

  useEffect(() => {
    displayInventory();
  }, []);

  const handleDeleteInventory = (inventory) => {
    setSelectedInventory(inventory);
    setShowModal(true);
  };

  const confirmDelete = () => {
    axios
      .delete(`http://localhost:8080/api/inventories/${selectedInventory.id}`)
      .then(() => {
        setShowModal(false);
        setSelectedInventory(null);
        displayInventory();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedInventory(null);
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
    <section className="card">
      <div className="card__bgBlue"></div>

      <div className="card__wrapper">
        <div className="card__header inventorypage_card_header">
          <h1 className="card__header-title">Inventory</h1>
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
                onClick={() => displayInventory()}
              />
              <div></div>
            </div>
            <div className="btn">
              <div className="btn__style-link">
                <button
                  type="button"
                  className="btn__style inventorypage__btn__style"
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
                Inventory Item
              </h4>
              <button className="card-table__heading-button">
                <img
                  className="card-table__heading-icon"
                  src={sortIcon}
                  alt="sort icon"
                  onClick={() => {
                    handleColumnClick("item_name");
                    displayInventory();
                  }}
                />
              </button>
            </div>
            <div className="card-table__heading-wrapper">
              <h4 className="card-table__heading">Category</h4>
              <button className="card-table__heading-button">
                <img
                  className="card-table__heading-icon"
                  src={sortIcon}
                  alt="sort icon"
                  onClick={() => {
                    handleColumnClick("category");
                    displayInventory();
                  }}
                />
              </button>
            </div>
            <div className="card-table__heading-wrapper">
              <h4 className="card-table__heading">Status</h4>
              <button className="card-table__heading-button">
                <img
                  className="card-table__heading-icon"
                  src={sortIcon}
                  alt="sort icon"
                  onClick={() => {
                    handleColumnClick("status");
                    displayInventory();
                  }}
                />
              </button>
            </div>
            <div className="card-table__heading-wrapper">
              <h4 className="card-table__heading">Quantity</h4>
              <button className="card-table__heading-button">
                <img
                  className="card-table__heading-icon"
                  src={sortIcon}
                  alt="sort icon"
                  onClick={() => {
                    handleColumnClick("quantity");
                    displayInventory();
                  }}
                />
              </button>
            </div>
            <div className="card-table__heading-wrapper">
              <h4 className="card-table__heading">Warehouse</h4>
              <button className="card-table__heading-button">
                <img
                  className="card-table__heading-icon"
                  src={sortIcon}
                  alt="sort icon"
                  onClick={() => {
                    handleColumnClick("warehouse_name");
                    displayInventory();
                  }}
                />
              </button>
            </div>
          </div>
          <div className="card-table__heading-wrapper card-table__heading-wrapper--actions">
            <h4 className="card-table__heading">Actions</h4>
          </div>
        </div>

        <ul>
          {inventoryList.length === 0
            ? null
            : inventoryList.map((inventory) => (
                <li className="card__list" key={inventory.id}>
                  <div className="card__list-content inventorypage__gapchange">
                    <div className="card__list-content-left">
                      <div className="card__list-wrap">
                        <h4 className="card__list-title">Inventory Item</h4>
                        <Link to={`/inventories/${inventory.id}/details`} className="card__product-item">
                          <p className="card__list-text-item card__list-text-item--product">
                            {inventory.item_name}{" "}
                          </p>
                          
                          <img
                            src={chevronRight}
                            alt={chevronRight}
                            className="card__product-item_chevron"
                          />
                   </Link>
                      </div>
                      <div className="card__list-wrap">
                        <h4 className="card__list-title inventorypage__margintop">
                          Category
                        </h4>
                        <p className="card__list-text-item">
                          {inventory.category}
                        </p>
                      </div>
                    </div>
                    <div className="card__list-content-right">
                      <div className="card__list-wrap">
                        <h4 className="card__list-title">Status</h4>
                        <p
                          className={
                            inventory.status === "In Stock"
                              ? "card__list-text-item-inStock"
                              : "card__list-text-item-outStock"
                          }
                        >
                          {inventory.status}
                        </p>
                      </div>
                      <div className="card__list-wrap">
                        <h4 className="card__list-title">Qty</h4>
                        <p className="card__list-text-item">
                          {inventory.quantity}
                        </p>
                      </div>
                      <div className="card__list-wrap">
                        <h4 className="card__list-title inventorypage__margintop">
                          Warehouse
                        </h4>
                        <p className="card__list-text-item">
                          {inventory.warehouse_name}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card__list-actions">
                    <img
                      src={deleteImg}
                      alt={deleteImg}
                      className="deleteImg"
                      onClick={() => handleDeleteInventory(inventory)}
                    />
                    <img src={editImg} alt={editImg} className="editImg" />
                  </div>
                </li>
              ))}
        </ul>
      </div>
      {showModal && (
        <DeleteInventory
          closeModal={closeModal}
          confirmDelete={confirmDelete}
          selectedInventory={selectedInventory}
        />
      )}
    </section>
  );
}

export default InventoryList;
