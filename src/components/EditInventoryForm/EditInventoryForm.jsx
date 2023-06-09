import backArrowImg from "../../assets/icons/arrow_back-24px.svg";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../Button/Button";
import "./EditInventoryForm.scss";

function EditInventoryForm() {
  const [warehouseData, setWarehouseData] = useState("");
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  const params = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/inventories/${params.id}`)
      .then((res) => {
        if (res.status === 404) {
          console.log(res);
        }
        const inventoryData = res.data[0];

        setItemName(inventoryData.item_name);
        setDescription(inventoryData.description);
        setCategory(inventoryData.category);
        setStatus(inventoryData.status);
        setQuantity(inventoryData.quantity);
      })
      .catch((error) => {
        console.log("Error fetching inventory data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8080/api/warehouses/${params.id}`)
      .then((res) => {
        if (res.status === 404) {
          console.log(res);
        }
        const warehouseData = res.data[0];

        setWarehouseData(warehouseData);
      })
      .catch((error) => {
        console.log("Error fetching warehouse data:", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const editData = {
      warehouseData: warehouseData,
      item_name: itemName,
      description: description,
      category: category, //TODO!!!: Upper case
      status: status,
      quantity: quantity,
    };

    axios
      .put(`http://localhost:8080/api/inventories/${params.id}`, editData)
      .then((res) => {
        navigate("/inventories");
        console.log("Form data updated successfully:", res.data);
      })
      .catch((err) => {
        console.log("Error updating form data:", err);
      });
  };
  // console.log(params.id);
  // console.log(warehouseName);
  // console.log(itemName);
  // console.log(description);
  // console.log(category);
  // console.log(contactName);
  // console.log(quantity);
  return (
    <section className="card">
      <div className="card__bgBlue"></div>
      <div className="card__wrapper">
        <div className="card__header">
          <div className="card__header-tittle-container">
            <Link to="/inventory/details" type="button" className="btn__noBG">
              <img
                src={backArrowImg}
                alt={backArrowImg}
                className="btn__noBG-img"
              />
              <p className="btn__name">Edit</p>
            </Link>
            <h1 className="card__header-title">Edit Inventory Item</h1>
          </div>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__itemDetails">
            <h3 className="form__title">Item Details</h3>

            <label htmlFor="itemName" className="form__title-item">
              Item Name
            </label>
            <input
              id="itemName"
              type="text"
              name="item_name"
              placeholder={itemName}
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <label htmlFor="description" className="form__title-item">
              Description
            </label>
            <textarea
              name="description"
              className="form__textarea"
              id="description"
              placeholder={description}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="category" className="form__title-item">
              Category
            </label>
            <select
              id="category"
              name="category"
              form="category"
              className="form__category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Option</option>
              <option value="accessories">Accessories</option>
              <option value="apparel">Apparel</option>
              <option value="electronics">Electronics</option>
              <option value="gear">Gear</option>
              <option value="health">Health</option>
            </select>
          </div>
          <div className="form__itemDetails">
            <h3 className="form__title">Item Availability</h3>
            <fieldset>
              <legend>Status</legend>
              <div className="form__radioSection">
                <p>
                  <input
                    type="radio"
                    name="status"
                    id="instock"
                    value="in stock"
                    checked={status === "in stock"}
                    onChange={() => setStatus("in stock")}
                  />
                  <label htmlFor="instock">In stock</label>
                </p>
                <p>
                  <input
                    type="radio"
                    name="status"
                    id="outOfStock"
                    value="out of stock"
                    checked={status === "out of stock"}
                    onChange={() => setStatus("out of stock")}
                  />
                  <label htmlFor="outOfStock">Out of Stock</label>
                </p>
              </div>
            </fieldset>
            <label htmlFor="itemName" className="form__title-item">
              Quantity
            </label>
            <input
              id="itemName"
              type="text"
              name="quantity"
              placeholder={quantity}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <label htmlFor="warehouse">Warehouse</label>
            <select
              id="warehouse"
              name="warehouse_name"
              className="form__category"
              onChange={(e) => setWarehouseData(e.target.value)}
            >
              <option value="">Select Option</option>
              {}
              <option value="manhattan">{warehouseData.warehouseId}</option>
            </select>
          </div>
          <div>
            <Button text="Cancel" addClassName={"btn__style--cancel"} />
            <Button text="Submit" />
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditInventoryForm;
