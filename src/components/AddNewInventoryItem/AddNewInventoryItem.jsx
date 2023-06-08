import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../Button/Button";
import arrow_back from "../../assets/icons/arrow_back-24px.svg";
import "./AddNewInventoryItem.scss";

function AddNewInventoryItem() {
  const navigate = useNavigate();
  const apiInstockURL = process.env.REACT_APP_API_SERVER;
  const apiInventories = apiInstockURL + "/api/inventories";
  // example variable, this should come from an API call the backend for the inventory item

  const [isInstock, setIsInstock] = useState(true);
  const [warehouseList, setWarehouseList] = useState([]);

  const [warehouseID, setWarehouseID] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescrip, setItemDescrip] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemStatus, setItemStatus] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemCreatedAt, setItemCreatedAt] = useState("");
  const [itemUpdatedAt, setItemUpdatedAt] = useState("");

  const postNewInventoryItem = (newInventoryItem) => {
    axios
      .post(`${apiInventories}`, {
        warehouse_id: newInventoryItem.warehouseID,
        item_name: newInventoryItem.warehouseName,
        description: newInventoryItem.itemDescrip,
        category: newInventoryItem.itemCategory,
        status: newInventoryItem.itemStatus,
        quantity: newInventoryItem.itemQuantity,
        created_at: newInventoryItem.itemCreatedAt,
        updated_at: newInventoryItem.itemUpdatedAt,
      })
      .then((response) => {
        console.log("Axios response");
        console.log(response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Check if the form is valid
  const isFormValid = () => {
    if (
      !warehouseID ||
      !itemName ||
      !itemDescrip ||
      !itemCategory ||
      !itemStatus ||
      !itemQuantity ||
      !itemCreatedAt ||
      !itemUpdatedAt
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      postNewInventoryItem({
        warehouse_id: event.target.warehouseName.value,
        item_name: event.target.address.value,
        description: event.target.city.value,
        category: event.target.country.value,
        status: event.target.contactName,
        quantity: event.target.contactPosition,
        created_at: event.target.contactPhone,
        updated_at: event.target.contactEmail,
      });
      alert("New inventory item added successfully.");
      navigate("/");
    } else {
      alert("Failed to submit, you have some errors in your form");
    }
  };

  //   TODO add state for selected warehouse ID, add on Change handler to select list below to setState of selected warehouse ID

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/warehouses")
      .then((response) => {
        setWarehouseList(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__header">
        <img className="form__header-img" src={arrow_back} alt="back" />
        <h1 className="form__header-title">Add New Inventory Item</h1>
      </div>
      <fieldset className="form__fieldset">
        <div className="form__section1">
          <div className="form__section1-subtitle">
            <h2>Item Details</h2>
          </div>
          <div>
            <label>Item Name </label>
            <input
              type="text"
              name="itemName"
              id="itemName"
              placeholder="Item Name"
            />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              name="itemDescription"
              id="itemDescription"
              placeholder="Please enter a brief item description..."
            />
          </div>
          <div>
            <label>Category</label>
            <select>
              <option value="">Please select</option>
              <option value="">Accessories</option>
              <option value="">Apparel</option>
              <option value="">Electronics</option>
              <option value="">Gear</option>
              <option value="">Health</option>
            </select>
          </div>
        </div>

        <div className="form__section2">
          <div className="form__section2-subtitle">
            <h2>Item Availability</h2>
          </div>
          <div>
            <label>Status</label>
            <div className="form__radio">
              <input
                checked={isInstock ? true : false}
                type="radio"
                name="instock"
                value="In stock"
                onChange={() => setIsInstock(true)}
              />
              <label for="instock">In Stock</label>
              <input
                checked={!isInstock ? true : false}
                type="radio"
                name="instock"
                value="Out of stock"
                onChange={() => setIsInstock(false)}
              />
              <label for="instock">Out of Stock</label>
            </div>
          </div>
          <div>
            <label>Quantity</label>
            <input type="text" name="quantity" id="quantity" placeholder="0" />
          </div>
          <div>
            <label>Warehouse</label>
            <select>
              <option value="">Please select</option>
              {warehouseList.map((warehouse) => (
                <option>{warehouse.warehouse_name}</option>
              ))}
            </select>
          </div>
        </div>
      </fieldset>
      <div className="form__buttons">
        <Button text="+Add New Inventory" type="submit" />
        <Button text="Cancel" type="submit" />
      </div>
    </form>
  );
}

export default AddNewInventoryItem;
