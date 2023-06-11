import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
// import deleteImg from "../assets/icons/delete_outline-24px.svg";
import editImg from "../../assets/icons/edit-24px.svg";
import chevronRight from "../../assets/icons/chevron_right-24px.svg";
import sortIcon from "../../assets/icons/sort-24px.svg";
import backArrowImg from "../../assets/icons/arrow_back-24px.svg";
import editIcon from "../../assets/icons/editIcon.svg";

import "./InventoryDetailsPage.scss";

function InventoryDetailsPage() {
  const apiInstockURL = process.env.REACT_APP_API_SERVER;
  const apiWarehouses = apiInstockURL + "/api/inventories";
  const [inventoryItem, setInventoryItem] = useState(null);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    fetchInventoryItem();
  }, []);

  const fetchInventoryItem = () => {
    axios
      .get(`${apiWarehouses}/${params.id}`)
      .then((res) => {
        if (res.data) {
          setInventoryItem(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function checkStatusClass(status) {
    if (status === "Out of Stock") {
      return "out-of-stock";
    } else {
      return "in-stock";
    }
  }

  return (
    <div>
      {inventoryItem ? (
        <>
          <section className="card1">
            <div className="card1__bgBlue"></div>
            <div className="card1__wrapper">
              <div className="card1__header">
                <div className="card1__header-tittle-container">
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
                  <h1 className="card1__header-title">
                    {inventoryItem.item_name}
                  </h1>
                </div>
                  <div>
                  <div className="btn">
                  <div className="btn__style-link">
                    <button
                      type="button"
                      className="btn__style"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/inventory/${params.id}/edit`);
                      }}
                    >
                      <img src={editIcon} alt={editIcon} className="btn__img" />
                      <p className="btn__name">Edit</p>
                    </button>
                  </div>
                </div>
                
                
              </div>

            </div>

            <div className="card1_body">
                <div className="card1_body-first">
                  <div className="card1_body-first__des">
                    <p className="card1_body-first__deslabel">
                      ITEM DESCRIPTION:
                    </p>
                    <p className="card1_body-first__desvalue">
                      {inventoryItem.description}
                    </p>
                  </div>

                  <div className="card1_body-first__cat">
                    <p className="card1_body-first__catlabel">CATEGORY:</p>
                    <p className="card1_body-first__catvalue">
                      {inventoryItem.category}
                    </p>
                  </div>
                </div>
                <div className="card1_body-second">
                  <div className="card1_body-second-statusqty">
                    <div className="card1_body-second__status">
                      <p className="card1_body-second__statuslabel">STATUS:</p>
                      <p
                        className={`card1_body-second__statusvalue ${checkStatusClass(
                          inventoryItem.status
                        )}`}
                      >
                        {inventoryItem.status}
                      </p>
                    </div>

                    <div className="card1_body-second__quantity">
                      <p className="card_body-second__quantitylabel">
                        QUANTITY:
                      </p>
                      <p className="card1_body-second__quantityvalue">
                        {inventoryItem.quantity}
                      </p>
                    </div>
                  </div>
                  <div className="card1_body-thirdwarehouse">
                    <div className="card1_body-third__warehousename">
                      <p className="card1_body-third__warehousenamelabel">
                        Warehouse :{" "}
                      </p>
                      <p className="card1_body-third__warehousenamevalue">
                        {inventoryItem.warehouse_name}
                      </p>
                    </div>
                  </div>
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
