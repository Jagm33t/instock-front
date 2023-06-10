import deleteImg from "../../assets/icons/delete_outline-24px.svg";
import editImg from "../../assets/icons/edit-24px.svg";
import chevronRight from "../../assets/icons/chevron_right-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import backArrowImg from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/editIcon.svg";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./WarehouseDetailsList.scss";

function WarehouseDetailsList() {
  const [WarehouseDetailsList, setWarehouseDetailsList] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);

  const params = useParams();

  const getWarehouseList = () => {
    axios
      .get(`http://127.0.0.1:8080/api/warehouses/${params.id}`)
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
  }, [params.id]);

  const getWarehouseDetailsList = () => {
    axios
      .get(`http://127.0.0.1:8080/api/warehouses/${params.id}/inventories`)
      .then((res) => {
        setWarehouseDetailsList(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getWarehouseDetailsList();
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

              <p className="card__list-text-item">{warehouseList.address}</p>
              <p className="card__list-text-item">{`${warehouseList.city}, ${warehouseList.country}`}</p>
            </div>
            <div className="warehouseInfo__contact-container">
              <div className="warehouseInfo__contact">
                <h4 className="warehouseInfo__list-title">contact name:</h4>
                <p className="card__list-text-item">
                  {warehouseList.contact_name}
                </p>
                <p className="card__list-text-item">
                  {warehouseList.contact_position}
                </p>
              </div>
              <div className="warehouseInfo__contact">
                <h4 className="warehouseInfo__list-title">
                  Contact information:
                </h4>
                <p className="card__list-text-item">
                  {warehouseList.contact_phone}
                </p>
                <p className="card__list-text-item">
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
                <li className="card__list" key={inventory.id}>
                  <div className="card__list-content">
                    <div className="card__list-content-left">
                      <div className="card__list-wrap">
                        <h4 className=" card__list-title  ">Inventory Item</h4>
                        <Link
                          to={`/inventories/${inventory.id}/details`}
                          className="card__product-item"
                        >
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
