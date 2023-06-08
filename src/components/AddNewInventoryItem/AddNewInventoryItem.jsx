import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../Button/Button";
import arrow_back from "../../assets/icons/arrow_back-24px.svg";
import "./AddNewInventoryItem.scss";

function AddNewInventoryItem() {
  return (
    <form className="form">
      <div className="form__header">
        <img className="form__header-img" src={arrow_back} alt="back" />
        <h1 className="form__header-title">Add New Inventory Item</h1>
      </div>
      <fieldset className="form__fieldset">
        <div className="form__section1">
          <div className="form__subtitle">
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
          </div>
        </div>

        <div className="form__section2"></div>
      </fieldset>
      <div className="form__buttons">
        <Button text="+Add New Inventory" type="submit" />
        <Button text="Cancel" type="submit" />
      </div>
    </form>
  );
}

export default AddNewInventoryItem;
