import deleteImg from "../../assets/Icons/delete_outline-24px.svg";
import editImg from "../../assets/Icons/edit-24px.svg";
import chevronRight from "../../assets/Icons/chevron_right-24px.svg";
import sortIcon from "../../assets/Icons/sort-24px.svg";
import backArrowImg from "../../assets/Icons/arrow_back-24px.svg";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./WarehouseDetailsList.scss";

function WarehouseDetailsList() {
  const [WarehouseDetailsList, setWarehouseDetailsList] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);

  const displayWarehouseList = () => {
    axios
      .get("http://127.0.0.1:8080/api/warehouses")
      .then((res) => {
        console.log(res.data);
        setWarehouseList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    displayWarehouseList();
  }, []);
  console.log("ware", warehouseList);
  const displayWarehouseDetailsList = () => {
    axios
      .get("http://127.0.0.1:8080/api/warehouses/1/inventories")
      .then((res) => {
        console.log(res.data);
        setWarehouseDetailsList(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    displayWarehouseDetailsList();
  }, []);
  return (
    <section className="card">
      <div className="card__bgBlue"></div>
      <div className="card__wrapper">
        <div className="card__header">
          <div className="card__header-tittle-container">
            <Link to="/" type="button" className="btn__noBG">
              <img
                src={backArrowImg}
                alt={backArrowImg}
                className="btn__noBG-img"
              />
              <p className="btn__name">Edit</p>
            </Link>
            <h1 className="card__header-title">
              {warehouseList.warehouse_name}
            </h1>
          </div>

          <div className="btn">
            <div className="btn__style-link">
              <button type="button" className="btn__style">
                <img src={deleteImg} alt={deleteImg} className="btn__img" />
                <p className="btn__name">Edit</p>
              </button>
            </div>
          </div>
        </div>
        <div className="warehouseInfo">
          <div className="warehouseInfo__wrapper">
            <div className="warehouse__address">
              <h4 className="card__list-title">warehouse address:</h4>
              <p className="card__list-text-item">
                33 Pearl Street SW, Washington, USA
              </p>
            </div>
            <div className="warehouseInfo__contact-container">
              <div className="warehouseInfo__contact">
                <h4 className="card__list-title">contact name:</h4>
                <p className="card__list-text-item">Graeme Lyon</p>
                <p className="card__list-text-item">Warehouse Manager</p>
              </div>
              <div className="warehouseInfo__contact">
                <h4 className="card__list-title">Contact information:</h4>
                <p className="card__list-text-item">+1 (647) 504-0911</p>
                <p className="card__list-text-item">glyon@instock.com</p>
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
                  className="cardTable__header-icon"
                  src={sortIcon}
                  alt="sort icon"
                />
              </button>
            </div>
            <div className="cardTable__header-wrapper">
              <h4 className="cardTable__header">Category</h4>
              <button className="cardTable__header-button">
                <img
                  className="cardTable__header-icon"
                  src={sortIcon}
                  alt="sort icon"
                />
              </button>
            </div>
            <div className="cardTable__header-wrapper">
              <h4 className="cardTable__header">Status</h4>
              <button className="cardTable__header-button">
                <img
                  className="cardTable__header-icon"
                  src={sortIcon}
                  alt="sort icon"
                />
              </button>
            </div>
            <div className="cardTable__header-wrapper">
              <h4 className="cardTable__header">Quantity</h4>
              <button className="cardTable__header-button">
                <img
                  className="cardTable__header-icon"
                  src={sortIcon}
                  alt="sort icon"
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
                <li className="card__list" key={inventory.id}>
                  <div className="card__list-content">
                    <div className="card__list-content-left">
                      <div className="card__list-wrap">
                        <h4 className=" card__list-title  ">Inventory Item</h4>
                        <Link to="/" className="card__product-item">
                          <p className="card__list-text-item card__list-text-item--product">
                            {inventory.item_name}
                          </p>
                          <img
                            src={chevronRight}
                            alt={chevronRight}
                            className="card__product-item_chevron"
                          />
                        </Link>
                      </div>
                      <div className="card__list-wrap">
                        <h4 className="card__list-title">Category</h4>
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
                            "card__list-text-item-inStock" +
                            (inventory.quantity === 0
                              ? " card__list-text-item-outStock"
                              : "")
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
                    </div>
                  </div>
                  <div className="card__list-actions">
                    <img
                      src={deleteImg}
                      alt={deleteImg}
                      className="deleteImg"
                    />
                    <img src={editImg} alt={editImg} className="editImg" />
                  </div>
                </li>
              ))}
        </ul>
      </div>
    </section>
  );
}

export default WarehouseDetailsList;
