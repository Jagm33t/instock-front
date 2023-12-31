import deleteImg from "../../assets/icons/delete_outline-24px.svg";
import editImg from "../../assets/icons/edit-24px.svg";
import chevronRight from "../../assets/icons/chevron_right-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import backArrowImg from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/editIcon.svg";
import DeleteInventory from "../DeleteInventory/DeleteInventory";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./WarehouseDetailsList.scss";

function WarehouseDetailsList() {
  const apiInstockURL = process.env.REACT_APP_API_SERVER;
  const apiWarehouses = apiInstockURL + "/api/warehouses";
  const apiInventories = apiInstockURL + "/api/inventories";
  const navigate = useNavigate();
  const [WarehouseDetailsList, setWarehouseDetailsList] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedInventory, setSelectedInventory] = useState(null);

  const params = useParams();

  const handleDeleteInventory = (inventory) => {
    setSelectedInventory(inventory);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedInventory(null);
  };
  const confirmDelete = () => {
    axios
      .delete(`${apiInventories}/${selectedInventory.id}`)
      .then(() => {
        setShowModal(false);
        setSelectedInventory(null);
        getWarehouseDetailsList();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getWarehouseList = () => {
    axios
      .get(`${apiWarehouses}/${params.id}`)
      .then((res) => {
        setWarehouseList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (params.id) {
      getWarehouseList(params.id);
    }
    // eslint-disable-next-line
  }, [params.id]);

  const getWarehouseDetailsList = () => {
    axios
      .get(`${apiWarehouses}/${params.id}/inventories`)
      .then((res) => {
        setWarehouseDetailsList(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getWarehouseDetailsList();
    // eslint-disable-next-line
  }, []);

  return (
    <section className="card2">
      <div className="card2__bgBlue"></div>
      <div className="card2__wrapper">
        <div className="card2__header">
          <div className="card2__header-tittle-container">
            <Link
              onClick={() => navigate(-1)}
              type="button"
              className="btn__noBG"
            >
              <img
                src={backArrowImg}
                alt={backArrowImg}
                className="btn__noBG-img"
              />
            </Link>
            <h1 className="card2__header-title">
              {warehouseList.warehouse_name}
            </h1>
          </div>

          <div className="btn">
            <div className="btn__style-link">
              <button
                type="button"
                className="btn__style"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/warehouses/${params.id}/edit`);
                }}
              >
                <img src={editIcon} alt={editIcon} className="btn__img" />
                <p className="btn__name">Edit</p>
              </button>
            </div>
          </div>
        </div>
        <div className="warehouseInfo">
          <div className="warehouseInfo__wrapper">
            <div className="warehouse__address">
              <h4 className="warehouseInfo__list-title">warehouse address:</h4>
              <div className="warehouseInfo__address-container">
                <p className="card2__list-text-item">{`${warehouseList.address},`}</p>
                <p className="card2__list-text-item">{`${warehouseList.city}, ${warehouseList.country}`}</p>
              </div>
            </div>
            <div className="warehouseInfo__contact-container">
              <div className="warehouseInfo__contact">
                <h4 className="warehouseInfo__list-title">contact name:</h4>
                <p className="card2__list-text-item">
                  {warehouseList.contact_name}
                </p>
                <p className="card2__list-text-item">
                  {warehouseList.contact_position}
                </p>
              </div>
              <div className="warehouseInfo__contact">
                <h4 className="warehouseInfo__list-title">
                  Contact information:
                </h4>
                <p className="card2__list-text-item">
                  {warehouseList.contact_phone}
                </p>
                <p className="card2__list-text-item">
                  {warehouseList.contact_email}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="cardTable">
          <div className="cardTable__headings">
            <div className="cardTable__header-wrapper">
              <h4 className="cardTable__header">Inventory Item</h4>
              <button className="cardTable__header-button">
                <img
                  className="cardTable__header-img"
                  src={sortIcon}
                  alt={sortIcon}
                />
              </button>
            </div>
            <div className="cardTable__header-wrapper">
              <h4 className="cardTable__header">Category</h4>
              <button className="cardTable__header-button">
                <img
                  className="cardTable__header-img"
                  src={sortIcon}
                  alt={sortIcon}
                />
              </button>
            </div>
            <div className="cardTable__header-wrapper">
              <h4 className="cardTable__header">Status</h4>
              <button className="cardTable__header-button">
                <img
                  className="cardTable__header-img"
                  src={sortIcon}
                  alt={sortIcon}
                />
              </button>
            </div>
            <div className="cardTable__header-wrapper">
              <h4 className="cardTable__header">Quantity</h4>
              <button className="cardTable__header-button">
                <img
                  className="cardTable__header-img"
                  src={sortIcon}
                  alt={sortIcon}
                />
              </button>
            </div>
          </div>
          <div className="cardTable__header-wrapper cardTable__header-wrapper--actions">
            <h4 className="cardTable__header">Actions</h4>
          </div>
        </div>

        <ul>
          {WarehouseDetailsList.length === 0
            ? null
            : WarehouseDetailsList.map((inventory) => (
                <li className="card2__list" key={inventory.id}>
                  <div className="card2__list-content">
                    <div className="card2__list-content-left">
                      <div className="card2__list-wrap">
                        <h4 className=" card2__list-title  ">Inventory Item</h4>
                        <Link
                          to={`/inventories/${inventory.id}/details`}
                          className="card2__product-item"
                        >
                          <p className="card2__list-text-item card2__list-text-item--product">
                            {inventory.item_name}
                          </p>
                          <img
                            src={chevronRight}
                            alt={chevronRight}
                            className="card2__product-item_chevron"
                          />
                        </Link>
                      </div>
                      <div className="card2__list-wrap">
                        <h4 className="card2__list-title">Category</h4>
                        <p className="card2__list-text-item">
                          {inventory.category}
                        </p>
                      </div>
                    </div>
                    <div className="card2__list-content-right">
                      <div className="card2__list-wrap">
                        <h4 className="card2__list-title">Status</h4>
                        <p
                          className={
                            "card2__list-text-item-inStock" +
                            (inventory.quantity === 0
                              ? " card2__list-text-item-outStock"
                              : "")
                          }
                        >
                          {inventory.status}
                        </p>
                      </div>
                      <div className="card2__list-wrap">
                        <h4 className="card2__list-title">Qty</h4>
                        <p className="card2__list-text-item">
                          {inventory.quantity}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="card2__list-actions">
                    <img
                      src={deleteImg}
                      alt={deleteImg}
                      className="deleteImg"
                      onClick={() => handleDeleteInventory(inventory)}
                    />
                    <img
                      src={editImg}
                      alt={editImg}
                      className="editImg"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/inventory/${inventory.id}/edit`);
                      }}
                    />
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

export default WarehouseDetailsList;
