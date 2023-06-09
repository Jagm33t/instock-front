import backArrowImg from "../../assets/icons/arrow_back-24px.svg";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../Button/Button";
import "./EditInventoryForm.scss";

function EditInventoryForm() {
  const [inventoryData, setInventoryData] = useState({
    item_name: "",
    description: "",
    category: "",
    status: "",
    contact_name: "",
    warehouse_name: "",
  });
  const params = useParams();
  const inventoryId = params.id;
  console.log("inventory", inventoryId);

  const displayInvetoryList = () => {
    axios
      .get(`http://localhost:8080/api/inventories/${inventoryId}`)
      .then((res) => {
        const {
          item_name,
          description,
          category,
          status,
          contact_name,
          warehouse_name,
        } = res.data;
        setInventoryData({
          item_name,
          description,
          category,
          status,
          contact_name,
          warehouse_name,
        });
      })
      .catch((error) => {
        console.log("Error fetching invetory data:", error);
      });
  };
  useEffect(() => {}, []);

  console.log(inventoryData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInventoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(
        `http://localhost:8080/api/inventories/${inventoryId}`,
        inventoryData
      )
      .then((res) => {
        console.log("Inventory updated successfully:", res.data);

        setInventoryData({
          item_name: "",
          description: "",
          category: "",
          status: "",
          contact_name: "",
          warehouse_name: "",
        });
      })
      .catch((error) => {
        console.log("Error updating invetory:", error);
      });
  };

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
        <form onSubmit={handleSubmit} className="form">
          <div className="form__itemDetails">
            <h3 className="form__title">Item Details</h3>

            <label htmlFor="itemName" className="form__title-item">
              Item Name
            </label>
            <input
              id="itemName"
              type="text"
              name="itemName"
              placeholder="Item Name"
              value={inventoryData.warehouse_name}
            ></input>
            <label htmlFor="description" className="form__title-item">
              Description
            </label>
            <textarea
              name="description"
              className="form__textarea"
              id="description"
              placeholder="descrition"
            ></textarea>
            <label htmlFor="category" className="form__title-item">
              Category
            </label>
            <select
              id="category"
              name="category"
              form="category"
              className="form__category"
            >
              <option value="accessories">Select Option</option>
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
                    name="instock"
                    id="instock"
                    value="small"
                  />
                  <label htmlFor="instock">In stock</label>
                </p>
                <p>
                  <input type="radio" name="outOfStock" id="outOfStock" />
                  <label htmlFor="uotOfStock">Out of Stock</label>
                </p>
              </div>
            </fieldset>
            <label htmlFor="warehouse">Warehouse</label>
            <select id="warehouse" name="warehouse" className="form__category">
              <option value="accessories">Select Option</option>
              <option value="manhattan">Manhattan</option>
              <option value="jersey">Jersey</option>
              <option value="SF">SF</option>
              <option value="santa-monica">Santa Monica</option>
              <option value="seattle">Seattle</option>
              <option value="miami">Miami</option>
            </select>
          </div>
        </form>
        <div>
          <Button text="Cancel" addClassName={"btn__style--cancel"} />
          <Button text="Submit" />
        </div>
      </div>
    </section>
  );
}

export default EditInventoryForm;
