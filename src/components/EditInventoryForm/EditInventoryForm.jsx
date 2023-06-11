import backArrowImg from "../../assets/icons/arrow_back-24px.svg";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../Button/Button";
import error from "../../assets/icons/error-24px.svg";
import "./EditInventoryForm.scss";
import "../Button/Button.scss";

function EditInventoryForm() {
  const apiInstockURL = process.env.REACT_APP_API_SERVER;
  const apiInventories = apiInstockURL + "/api/inventories";
  const apiWarehouses = apiInstockURL + "/api/warehouses";
  const [warehouseData, setWarehouseData] = useState([]);
  const [validateWarehouse, setValidateWarehouse] = useState(false);
  const [warehouseId, setWarehouseId] = useState("");
  const [warehouseName, setWarehouseName] = useState("");
  const [itemName, setItemName] = useState("");
  const [validateItemName, setValidateItemName] = useState("");
  const [description, setDescription] = useState("");
  const [validateDescription, setValidateDescription] = useState("");
  const [category, setCategory] = useState("");
  const [validateCategory, setValidateCategory] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [validateQuantity, setValidateQuantity] = useState(false);
  const [status, setStatus] = useState("");
  const params = useParams();
  const navigate = useNavigate();

  function handleItemStatus(event) {
    if (event.target.value === "Out of stock") {
      setQuantity(0);
    }
    setStatus(event.target.value);
  }

  useEffect(() => {
    axios
      .get(`${apiInventories}/${params.id}`)
      .then((res) => {
        const inventoryData = res.data;
        setItemName(inventoryData.item_name);
        setDescription(inventoryData.description);
        setCategory(inventoryData.category);
        setStatus(inventoryData.status);
        setQuantity(inventoryData.quantity);
        setWarehouseName(inventoryData.warehouse_name);

        return inventoryData.warehouse_name;
      })
      .then((inventoryWarehouseName) => {
        axios.get(apiWarehouses).then((response) => {
          if (response.status === 404) {
            console.log(response);
          }
          const warehouseData = response.data;
          setWarehouseData(warehouseData);
          setWarehouseId(
            warehouseData.find(
              (warehouse) => warehouse.warehouse_name === inventoryWarehouseName
            ).id
          );
        });
      })
      .catch((error) => {
        console.log(
          "Error fetching inventory data:",
          error.response.data.message
        );
      });
  }, []);

  const isFormValid = () => {
    if (!itemName || !description || !category || !status || !warehouseName) {
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
  const validateQuantityField = (event) => {
    if (event.target.value.length < 1 || isNaN(event.target.value)) {
      event.target.classList.add("form__fields-error-border");
      setValidateQuantity(true);
    } else {
      event.target.classList.remove("form__fields-error-border");
      setValidateQuantity(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      const editData = {
        warehouse_id: warehouseId,
        item_name: itemName,
        description: description,
        category: category,
        status: status,
        quantity: String(quantity),
      };

      axios
        .put(`${apiInventories}/${params.id}`, editData)
        .then((res) => {
          navigate(-1);
          alert("Item updated successfully:");
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
          <div className="formEdit__itemDetails-container">
            <div className="formEdit__itemDetails formEdit__itemDetails--divider">
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
                placeholder={category}
                onChange={(e) => setCategory(e.target.value)}
                onBlur={validadeField(setValidateCategory)}
              >
                <option value="" disabled defaultValue hidden>
                  Select Option
                </option>
                <option value="accessories">Accessories</option>
                <option value="apparel">Apparel</option>
                <option value="electronics">Electronics</option>
                <option value="gear">Gear</option>
                <option value="health">Health</option>
              </select>
              <div
                className={
                  validateCategory
                    ? "form__fields-error"
                    : "form__fields-error form__fields-error--hide"
                }
              >
                <img src={error} alt="error" className="form__img-err" />
                <p>This field is required</p>
              </div>
            </div>
            <div className="formEdit__itemDetails">
              <h3 className="formEdit__title">Item Availability</h3>
              <fieldset className="formEdit__fieldset">
                <legend className="formEdit__title-item">Status</legend>
                <div className="formEdit__radioSection">
                  <p>
                    <input
                      checked={quantity ? true : false}
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
                      checked={quantity ? false : true}
                      type="radio"
                      name="status"
                      id="outOfStock"
                      value="Out of stock"
                      onChange={handleItemStatus}
                    />
                    <label
                      className="formEdit__radio-text"
                      htmlFor="outOfStock"
                    >
                      Out of Stock
                    </label>
                  </p>
                </div>
              </fieldset>
              {status === "In stock" && (
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
                    // onBlur={validateQuantityField}
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
                value={warehouseId}
                label={warehouseName}
                placeholder={warehouseName}
                className="formEdit__placeholder"
                onChange={(e) => {
                  setWarehouseName(e.target.value);
                  setWarehouseId(e.target.value);
                }}
                onBlur={validadeField(setValidateWarehouse)}
              >
                <option value="" disabled defaultValue hidden>
                  Select Option
                </option>
                {warehouseData.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.warehouse_name}
                  </option>
                ))}
              </select>
              <div
                className={
                  validateWarehouse
                    ? "form__fields-error"
                    : "form__fields-error form__fields-error--hide"
                }
              >
                <img src={error} alt="error" className="form__img-err" />
                <p>This field is required</p>
              </div>
            </div>
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
            <Button text="Save" type="submit" disabled={!isFormValid()} />
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditInventoryForm;
