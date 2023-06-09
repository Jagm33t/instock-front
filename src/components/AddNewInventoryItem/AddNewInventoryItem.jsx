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

  const [itemName, setItemName] = useState("");
  const [itemDescrip, setItemDescrip] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const [itemStatus, setItemStatus] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemWarehouse, setItemWarehouse] = useState("");

  console.log(itemName);
  console.log(itemDescrip);
  console.log(itemCategory);
  console.log(itemStatus);
  console.log(itemQuantity);
  console.log(itemWarehouse);

  console.log(warehouseList);

  function handleItemNameInput(event) {
    setItemName(event.target.value);
  }

  function handleItemDescripInput(event) {
    setItemDescrip(event.target.value);
  }

  function handleItemCategory(event) {
    setItemCategory(event.target.value);
  }

  function handleItemStatus(event) {
    setItemStatus(event.target.value);
  }

  function handleItemQuantity(event) {
    const quantity = parseInt(event.target.value);
    setItemQuantity(quantity);
  }

  function handleItemWarehouse(event) {
    setItemWarehouse(event.target.value);
  }

  const postNewInventoryItem = (newInventoryItem) => {
    const postData = {
      warehouse_id: itemWarehouse,
      item_name: itemName,
      description: itemDescrip,
      category: itemCategory,
      status: itemStatus,
      quantity: itemQuantity,
    };
    console.log(postData);
    // return;
    axios
      .post(`${apiInventories}`, postData)
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
      !itemName ||
      !itemDescrip ||
      !itemCategory ||
      !itemStatus ||
      !itemQuantity
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      postNewInventoryItem({
        item_name: itemName,
        description: itemDescrip,
        category: itemCategory,
        status: itemStatus,
        quantity: itemQuantity,
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
              onChange={handleItemNameInput}
            />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              name="itemDescription"
              id="itemDescription"
              placeholder="Please enter a brief item description..."
              onChange={handleItemDescripInput}
            />
          </div>
          <div>
            <label>Category</label>
            <select onChange={handleItemCategory}>
              <option value="">Please select</option>
              <option value="accessories">Accessories</option>
              <option value="apparel">Apparel</option>
              <option value="electronics">Electronics</option>
              <option value="gear">Gear</option>
              <option value="health">Health</option>
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
                // checked={isInstock ? true : false}
                type="radio"
                name="instock"
                value="In stock"
                onChange={handleItemStatus}
              />
              <label for="instock">In Stock</label>
              <input
                // checked={!isInstock ? true : false}
                type="radio"
                name="instock"
                value="Out of stock"
                onChange={handleItemStatus}
              />
              <label for="instock">Out of Stock</label>
            </div>
          </div>
          <div>
            <label>Quantity</label>
            <input
              type="text"
              name="quantity"
              id="quantity"
              placeholder="0"
              onChange={handleItemQuantity}
            />
          </div>
          <div>
            <label>Warehouse</label>
            <select onChange={handleItemWarehouse}>
              <option value="">Please select</option>
              {warehouseList.map((warehouse) => (
                <option value={warehouse.id}>{warehouse.warehouse_name}</option>
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
