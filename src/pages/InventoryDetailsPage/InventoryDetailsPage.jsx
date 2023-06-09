import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
// import deleteImg from "../assets/icons/delete_outline-24px.svg";
import editImg from "../../assets/icons/edit-24px.svg";
import chevronRight from "../../assets/icons/chevron_right-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import backArrowImg from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/editIcon.svg";

import "./InventoryDetailsPage.scss";

function InventoryDetailsPage() {
  const [inventoryItem, setInventoryItem] = useState(null);
  const params = useParams();
  console.log(params.id);

  useEffect(() => {
    fetchInventoryItem();
  }, []);

  const fetchInventoryItem = () => {
    axios
      .get(`http://127.0.0.1:8080/api/inventories/${params.id}`)
      .then((res) => {
        if (res.data) {
          setInventoryItem(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {inventoryItem ? (
        <>
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
                    {inventoryItem.item_name}
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

              <div className="card_body">
                <div className="card_body-first">
                  <p>Item Description: </p>
                  <p>{inventoryItem.description}</p>
                  <p>Category: </p>
                  <p>{inventoryItem.category}</p>
                </div>
                <div className="card_body-second"></div>
                <div className="card_body-second-statusqty">
                  <p>Status:</p>
                  <p>{inventoryItem.status}</p>
                  <p>Quantity: </p>
                  <p>{inventoryItem.quantity}</p>
                </div>
                <div className="card_body-secondwarehouse">
                  <p>Warehouse : </p>
                  <p>{inventoryItem.warehouse_name}</p>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <p>Loading inventory item details...</p>
      )}
    </div>
  );
}

export default InventoryDetailsPage;
