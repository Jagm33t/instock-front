import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddNewWarehouse.scss";
import Button from "../Button/Button";
import arrow_back from "../../assets/icons/arrow_back-24px.svg";

function AddNewWarehouse() {
  const navigate = useNavigate();
  const apiInstockURL = process.env.REACT_APP_API_SERVER;
  const apiWarehouses = apiInstockURL + "/api/warehouses";
  const [warehouseName, setWarehouseName] = useState("");
  const [validateWarehouseName, setValidateWarehouseName] = useState(false);
  const [address, setAddress] = useState("");
  const [validateAddress, setValidateAddress] = useState(false);
  const [city, setCity] = useState("");
  const [validateCity, setValidateCity] = useState(false);
  const [country, setCountry] = useState("");
  const [validateCountry, setValidateCountry] = useState(false);
  const [contactName, setContactName] = useState("");
  const [validateContactName, setValidateContactName] = useState(false);
  const [contactPosition, setContactPosition] = useState("");
  const [validateContactPosition, setValidateContactPosition] = useState(false);
  const [contactPhone, setContactPhone] = useState("");
  const [validateContactPhone, setValidateContactPhone] = useState(false);
  const [contactEmail, setContactEmail] = useState("");
  const [validateContactEmail, setValidateContactEmail] = useState(false);

  const postNewWarehouse = (newWarehouse) => {
    axios
      .post(`${apiWarehouses}`, newWarehouse)
      .then((_response) => {
        alert("New Warehouse added successfully.");
        navigate("/");
      })
      .catch((err) => {
        alert(err.response.data);
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
  const handleChangeInput = (setState) => (event) => {
    setState(event.target.value);
  };

  const validateField = (setState) => (event) => {
    if (event.target.value.length < 1) {
      setState(true);
    } else {
      // validate specific cases: phone number and email
      if (event.target.name === "contactPhone") {
        const phonePattern = /^\+\d{1,3} \([0-9]{3}\) [0-9]{3}-[0-9]{4}$/;
        if (!phonePattern.test(event.target.value)) {
          setState(true);
        } else setState(false);
        return;
      }
      if (event.target.name === "contactEmail") {
        const mailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        if (!mailPattern.test(event.target.value)) {
          setState(true);
        } else setState(false);
        return;
      }
      setState(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      const postData = {
        warehouse_name: event.target.warehouseName.value,
        address: event.target.address.value,
        city: event.target.city.value,
        country: event.target.country.value,
        contact_name: event.target.contactName.value,
        contact_position: event.target.contactPosition.value,
        contact_phone: event.target.contactPhone.value,
        contact_email: event.target.contactEmail.value,
      };
      postNewWarehouse(postData);
    } else {
      alert("Failed to submit, you have some errors in your form");
    }
  };

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
              onChange={handleChangeInput(setWarehouseName)}
              value={warehouseName}
              onBlur={validateField(setValidateWarehouseName)}
            />
            <p
              className={
                validateWarehouseName
                  ? "form__fields-error"
                  : "form__fields-error--hide"
              }
            >
              * Warehouse name is required
            </p>
            <label className="form__warehouse__fields-label" htmlFor="address">
              Street Address
            </label>
            <input
              className="form__warehouse__fields-input"
              type="text"
              name="address"
              id="address"
              placeholder="Street Address"
              onChange={handleChangeInput(setAddress)}
              value={address}
              onBlur={validateField(setValidateAddress)}
            />
            <p
              className={
                validateAddress
                  ? "form__fields-error"
                  : "form__fields-error--hide"
              }
            >
              * Address is required
            </p>
            <label className="form__warehouse__fields-label" htmlFor="city">
              City
            </label>
            <input
              className="form__warehouse__fields-input"
              type="text"
              name="city"
              id="city"
              placeholder="City"
              onChange={handleChangeInput(setCity)}
              value={city}
              onBlur={validateField(setValidateCity)}
            />
            <p
              className={
                validateCity ? "form__fields-error" : "form__fields-error--hide"
              }
            >
              * City is required
            </p>
            <label className="form__warehouse__fields-label" htmlFor="country">
              Country
            </label>
            <input
              className="form__warehouse__fields-input"
              type="text"
              name="country"
              id="country"
              placeholder="Country"
              onChange={handleChangeInput(setCountry)}
              value={country}
              onBlur={validateField(setValidateCountry)}
            />
            <p
              className={
                validateCountry
                  ? "form__fields-error"
                  : "form__fields-error--hide"
              }
            >
              * Country is required
            </p>
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
                onChange={handleChangeInput(setContactName)}
                value={contactName}
                onBlur={validateField(setValidateContactName)}
              />
              <p
                className={
                  validateContactName
                    ? "form__fields-error"
                    : "form__fields-error--hide"
                }
              >
                * Contact Name is required
              </p>
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
                onChange={handleChangeInput(setContactPosition)}
                value={contactPosition}
                onBlur={validateField(setValidateContactPosition)}
              />
              <p
                className={
                  validateContactPosition
                    ? "form__fields-error"
                    : "form__fields-error--hide"
                }
              >
                * Contact Position is required
              </p>
              <label
                className="form__contact__fields-label"
                htmlFor="contactPhone"
              >
                Phone Number
              </label>
              <input
                className="form__contact__fields-input"
                type="tel"
                name="contactPhone"
                id="contactPhone"
                placeholder="Phone Number in the format +1 (555) 555-5555"
                onChange={handleChangeInput(setContactPhone)}
                value={contactPhone}
                onBlur={validateField(setValidateContactPhone)}
              />
              <p
                className={
                  validateContactPhone
                    ? "form__fields-error"
                    : "form__fields-error--hide"
                }
              >
                * Contact Phone is required in the format +1 (555) 555-5555
              </p>
              <label
                className="form__contact__fields-label"
                htmlFor="contactEmail"
              >
                Email
              </label>
              <input
                className="form__contact__fields-input"
                type="mail"
                name="contactEmail"
                id="contactEmail"
                placeholder="Email"
                onChange={handleChangeInput(setContactEmail)}
                value={contactEmail}
                onBlur={validateField(setValidateContactEmail)}
              />
              <p
                className={
                  validateContactEmail
                    ? "form__fields-error"
                    : "form__fields-error--hide"
                }
              >
                * Contact Email is required in the format mail@mail.com
              </p>
            </div>
          </div>
        </div>
      </fieldset>
      <div className="form__buttons">
        <Button text="+Add Warehouse" type="submit" disabled={!isFormValid()} />
        <Button
          text="Cancel"
          type="submit"
          addClassName={"btn__style--cancel"}
        />
      </div>
    </form>
  );
}

export default AddNewWarehouse;
