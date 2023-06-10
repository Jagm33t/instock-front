import backArrowImg from "../../assets/icons/arrow_back-24px.svg";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../Button/Button";
import error from "../../assets/icons/error-24px.svg";
import "./EditInventoryForm.scss";

function EditInventoryForm() {
  const apiInstockURL = process.env.REACT_APP_API_SERVER;
  const apiWarehouses = apiInstockURL + "/api/inventories";
  const [warehouseData, setWarehouseData] = useState([]);
  const [warehouseId, setWarehouseId] = useState("");
  const [warehouseName, setWarehouseName] = useState("");
  const [itemName, setItemName] = useState("");
  const [validateItemName, setValidateItemName] = useState("");
  const [description, setDescription] = useState("");
  const [validateDescription, setValidateDescription] = useState("");
  const [category, setCategory] = useState("");
  const [validateCategory, setValidateCategory] = useState("");
  const [status, setStatus] = useState("");
  const [validateStatus, setValidateStatus] = useState("");
  const [quantity, setQuantity] = useState("");
  const [validateQuantity, setValidateQuantity] = useState("");
  const [itemStatus, setItemStatus] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  function handleItemStatus(event) {
    setItemStatus(event.target.value);
  }

  useEffect(() => {
    axios
      .get(`${apiWarehouses}/${params.id}`)
      .then((res) => {
        if (res.status === 404) {
          console.log(res);
        }
        const inventoryData = res.data;

        setItemName(inventoryData.item_name);
        setDescription(inventoryData.description);
        setCategory(inventoryData.category);
        setStatus(inventoryData.status);
        setQuantity(inventoryData.quantity);
        setWarehouseId(inventoryData.warehouse_id);
        setWarehouseName(inventoryData.warehouse_name);
      })
      .catch((error) => {
        console.log("Error fetching inventory data:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8080/api/warehouses`)
      .then((res) => {
        if (res.status === 404) {
          console.log(res);
        }
        const warehouseData = res.data;

        setWarehouseData(warehouseData);
      })
      .catch((error) => {
        console.log("Error fetching warehouse data:", error);
      });
  }, []);
  const isFormValid = () => {
    if (
      !itemName ||
      !description ||
      !category ||
      !status ||
      !quantity ||
      !warehouseName
    ) {
      return false;
    }
    return true;
  };
  const validadeField = (setState) => (event) => {
    if (event.target.value.length < 1) {
      event.target.classList.add("form__fields-error-border");
      setState(true);
    } else {
      event.target.classList.remove("form__fields-error-border");
      setState(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      const editData = {
        warehouse_id: warehouseId,
        warehouseName: warehouseName,
        item_name: itemName,
        description: description,
        category: category,
        status: status,
        quantity: quantity,
      };

      axios
        .put(`${apiWarehouses}/${params.id}`, editData)
        .then((res) => {
          navigate("/inventory");
          console.log("Form data updated successfully:", res.data);
        })
        .catch((err) => {
          console.log("Error updating form data:", err);
        });
    }
  };

  return (
    <section className="card">
      <div className="card__bgBlue"></div>
      <div className="card__wrapper">
        <div className="card__header">
          <div className="card__header-tittle-container">
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
            <h1 className="card__header-title">Edit Inventory Item</h1>
          </div>
        </div>
        <form className="formEdit" onSubmit={handleSubmit}>
          <div className="formEdit__itemDetails">
            <h3 className="formEdit__title">Item Details</h3>
            <label htmlFor="itemName" className="formEdit__title-item">
              Item Name
            </label>
            <input
              className="formEdit__placeholder"
              id="itemName"
              type="text"
              name="item_name"
              placeholder={itemName}
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              onBlur={validadeField(setValidateItemName)}
            />
            <div
              className={
                validateItemName
                  ? "form__fields-error"
                  : "form__fields-error form__fields-error--hide"
              }
            >
              <img src={error} alt="error" className="form__img-err" />
              <p>This field is required</p>
            </div>

            <label htmlFor="description" className="formEdit__title-item">
              Description
            </label>
            <textarea
              name="description"
              className="formEdit__textarea"
              id="description"
              placeholder={description}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onBlur={validadeField(setValidateDescription)}
            />
            <div
              className={
                validateDescription
                  ? "form__fields-error"
                  : "form__fields-error form__fields-error--hide"
              }
            >
              <img src={error} alt="error" className="form__img-err" />
              <p>This field is required</p>
            </div>

            <label htmlFor="category" className="formEdit__title-item">
              Category
            </label>
            <select
              id="category"
              name="category"
              form="category"
              className="formEdit__placeholder"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              onBlur={validadeField(setValidateCategory)}
            >
              <option value="">Select Option</option>
              <option value="accessories">Accessories</option>
              <option value="apparel">Apparel</option>
              <option value="electronics">Electronics</option>
              <option value="gear">Gear</option>
              <option value="health">Health</option>
            </select>
          </div>
          <div className="formEdit__itemDetails">
            <h3 className="formEdit__title">Item Availability</h3>
            <fieldset className="formEdit__fieldset">
              <legend className="formEdit__title-item">Status</legend>
              <div className="formEdit__radioSection">
                <p>
                  <input
                    type="radio"
                    name="status"
                    id="instock"
                    value="In stock"
                    onChange={handleItemStatus}
                  />
                  <label className="formEdit__radio-text" htmlFor="instock">
                    In stock
                  </label>
                </p>
                <p>
                  <input
                    type="radio"
                    name="status"
                    id="outOfStock"
                    value="Out of stock"
                    onChange={handleItemStatus}
                  />
                  <label className="formEdit__radio-text" htmlFor="outOfStock">
                    Out of Stock
                  </label>
                </p>
              </div>
            </fieldset>
            {itemStatus === "In stock" && (
              <div className="formEdit__qty-container">
                <label htmlFor="quantity" className="formEdit__title-item">
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="text"
                  name="quantity"
                  placeholder={quantity}
                  value={quantity}
                  className="formEdit__placeholder"
                  onChange={(e) => setQuantity(e.target.value)}
                  onBlur={validadeField(setQuantity)}
                />
              </div>
            )}
            <div
              className={
                validateQuantity
                  ? "form__fields-error"
                  : "form__fields-error form__fields-error--hide"
              }
            >
              <img src={error} alt="error" className="form__img-err" />
              <p>This field is required</p>
            </div>

            <label className="formEdit__title-item" htmlFor="warehouse">
              Warehouse
            </label>

            <select
              id="warehouse"
              name="warehouse_name"
              form="warehouse"
              value={warehouseName}
              className="formEdit__placeholder"
              onChange={(e) => {
                setWarehouseName(e.target.value);
                setWarehouseId(e.target.value);
              }}
              onBlur={validadeField(setWarehouseId)}
            >
              <option value="">Select Option</option>
              {warehouseData.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.warehouse_name}
                </option>
              ))}
            </select>
          </div>

          <div className="form__btn-container">
            <Button
              text="Cancel"
              addClassName={"btn__style--cancel"}
              handleClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            />
            <Button text="Submit" type="submit" disabled={!isFormValid()} />
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditInventoryForm;
