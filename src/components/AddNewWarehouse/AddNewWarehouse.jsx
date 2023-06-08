import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddNewWarehouse.sass";
import Button from "../Button/Button";
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
  // Create a handler for title input
  const handleChangeInput = (event) => {
    console.log(event.target.value);
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
      <div className="form__header">
        <img className="form__header-img" src={arrow_back} alt="back" />
        <h1 className="form__header-title">Add New Warehouse</h1>
      </div>
      <fieldset className="form__fieldset">
        <div className="form__warehouse">
          <h2 className="form__warehouse-title">Warehouse Detais</h2>
          <div className="form__warehouse__fields">
            <label
              className="form__warehouse__fields-label"
              htmlFor="warehouseName"
            >
              Warehouse Name
            </label>
            <input
              className="form__warehouse__fields-input"
              type="text"
              name="warehouseName"
              id="warehouseName"
              placeholder="Warehouse Name"
              onChange={handleChangeInput}
              value={warehouseName}
            />
            <label className="form__warehouse__fields-label" htmlFor="address">
              Street Address
            </label>
            <input
              className="form__warehouse__fields-input"
              type="text"
              name="address"
              id="address"
              placeholder="Street Address"
              onChange={handleChangeInput}
              value={address}
            />
            <label className="form__warehouse__fields-label" htmlFor="city">
              City
            </label>
            <input
              className="form__warehouse__fields-input"
              type="text"
              name="city"
              id="city"
              placeholder="City"
              onChange={handleChangeInput}
              value={city}
            />
            <label className="form__warehouse__fields-label" htmlFor="country">
              Country
            </label>
            <input
              className="form__warehouse__fields-input"
              type="text"
              name="country"
              id="country"
              placeholder="Country"
              onChange={handleChangeInput}
              value={country}
            />
          </div>
          <div className="form__contact">
            <h2 className="form__contact-title">Contact Detais</h2>
            <div className="form__contact__fields">
              <label
                className="form__contact__fields-label"
                htmlFor="contactName"
              >
                Contact Name
              </label>
              <input
                className="form__contact__fields-input"
                type="text"
                name="contactName"
                id="contactName"
                placeholder="Contact Name"
                onChange={handleChangeInput}
                value={contactName}
              />
              <label
                className="form__contact__fields-label"
                htmlFor="contactPosition"
              >
                Position
              </label>
              <input
                className="form__contact__fields-input"
                type="text"
                name="contactPosition"
                id="contactPosition"
                placeholder="Position"
                onChange={handleChangeInput}
                value={contactPosition}
              />
              <label
                className="form__contact__fields-label"
                htmlFor="contactPhone"
              >
                Phone Number
              </label>
              <input
                className="form__contact__fields-input"
                type="text"
                name="contactPhone"
                id="contactPhone"
                placeholder="Phone Number"
                onChange={handleChangeInput}
                value={contactPhone}
              />
              <label
                className="form__contact__fields-label"
                htmlFor="contactEmail"
              >
                Email
              </label>
              <input
                className="form__contact__fields-input"
                type="text"
                name="contactEmail"
                id="contactEmail"
                placeholder="Email"
                onChange={handleChangeInput}
                value={contactEmail}
              />
            </div>
          </div>
        </div>
      </fieldset>
      <div className="form__buttons">
        <Button text="+Add Warehouse" type="submit" disabled={!isFormValid()} />
        <Button
          text="Cancel"
          type="submit"
          addclassName={"btn__style--cancel"}
        />
      </div>
    </form>
  );
}

export default AddNewWarehouse;
