import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../assets/logo/InStock-Logo_1x.png";
import "./WareHousesList.scss";

import searchImg from "../../assets/icons/search-24px.svg";
import deleteImg from "../../assets/icons/delete_outline-24px.svg";
import editImg from "../../assets/icons/edit-24px.svg";
import chevronRight from "../../assets/icons/chevron_right-24px.svg";

function WarehousesList(props) {
  const [warehouseList, setWarehouseList] = useState([]);

  //const params = useParams();

  const displayWarehouses = () => {
    axios
      .get("http://127.0.0.1:8080/api/warehouses")
      .then((response) => {
        console.log(response.data);
        setWarehouseList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    displayWarehouses();
  }, []);
  return (
    <div className="warehouses-list">
      <section className="card">
        <div className="card__bgBlue"></div>
        <div className="card__wrapper">
          <div className="card__header">
            <h1 className="card__header-title">Inventory</h1>
            <div className="card__container">
              <div className="card__searchBox">
                <input
                  type="search"
                  className="card__searchBox-input"
                  id="searchBox"
                  placeholder="Search..."
                />
                <img
                  src={searchImg}
                  alt={searchImg}
                  className="card__searchBox-img"
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
                  <li className="card__list" key={warehouse.id}>
                    <div className="card__list-content">
                      <div className="card__list-content-left">
                        <div className="card__list-wrap">
                          <h4 className="card__list-title ">Warehouse</h4>
                          <Link to="/" className="card__product-item">
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
                      />
                      <img src={editImg} alt={editImg} className="editImg" />
                    </div>
                  </li>
                ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default WarehousesList;