import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddNewWarehouse.sass";

import arrow_back from "../../assets/icons/arrow_back-24px.svg";

function AddNewWarehouse() {
  const navigate = useNavigate();
  const apiInstockURL = process.env.REACT_APP_API_SERVER;
  const [warehouseName, setWarehouseName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPosition, setContactPosition] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const postNewWarehouse = (newWarehouse) => {
    axios
      .post(`${apiInstockURL}`, {
        warehouse_name: newWarehouse.warehouseName,
        address: newWarehouse.address,
        city: newWarehouse.city,
        country: newWarehouse.country,
        contact_name: newWarehouse.contactName,
        contact_position: newWarehouse.contactPosition,
        contact_phone: newWarehouse.contactPhone,
        contact_email: newWarehouse.contactEmail,
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
      !warehouseName ||
      !address ||
      !city ||
      !country ||
      !contactName ||
      !contactPosition ||
      !contactPhone ||
      !contactEmail
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      postNewWarehouse({
        warehouse_name: event.target.warehouseName.value,
        address: event.target.address.value,
        city: event.target.city.value,
        country: event.target.country.value,
        contact_name: event.target.contactName,
        contact_position: event.target.contactPosition,
        contact_phone: event.target.contactPhone,
        contact_email: event.target.contactEmail,
      });
      alert("New video submitted successfully.");
      navigate("/");
    } else {
      alert("Failed to submit, you have some errors in your form");
    }
  };

  const testAPIPost = {
    warehouse_name: "Chicago",
    address: "3218 Guess Rd",
    city: "Chicago",
    country: "USA",
    contact_name: "Jameson Schuppe",
    contact_position: "Warehouse Manager",
    contact_phone: "+1 (919) 797-2875",
    contact_email: "jschuppe@instock.com",
  };
  postNewWarehouse(testAPIPost);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form_header">
        <img src="" alt="back" />
      </div>
      <fieldset className="form__fieldset">
        <label className="form__thumbnail">
          Video Thumbnail
          <div className="form__thumbnail-img-container">
            <img
              className="form__thumbnail-img"
              src={uploadVideoPreview}
              alt="preview "
            />
          </div>
        </label>
        <div className="form__text-container">
          <label className="form__text-title-label" htmlFor="title">
            Title Your Video
          </label>
          <input
            className="form__text-title-input"
            type="text"
            name="title"
            id="title"
            placeholder="Add a title to your video"
            onChange={handleChangeTitle}
            value={title}
          />
          <label className="form__text-description-label" htmlFor="description">
            Add a Video Description
          </label>
          <textarea
            name="description"
            id="description"
            className="form__text-description-textarea"
            placeholder="Add a description to your video"
            onChange={handleChangeDescription}
            value={description}
            onInput={() => resizeTextarea("description")}
          ></textarea>
        </div>
      </fieldset>
      <div className="form__buttons">
        <Button
          icon={publish}
          text="Publish"
          type="submit"
          disabled={!isFormValid()}
        />
        <Button
          text="Cancel"
          type="submit"
          handleClick={handleClick}
          addClassName={"btn__style--cancel"}
        />
      </div>
    </form>
  );
}

export default AddNewWarehouse;
