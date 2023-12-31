import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button/Button";
import arrow_back from "../../assets/icons/arrow_back-24px.svg";
import error from "../../assets/icons/error-24px.svg";
import "./EditWareHousesForm.scss";

function EditWarehouse() {
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

  const params = useParams();
  const navigate = useNavigate();

  const warehouseId = params.id;

  useEffect(() => {
    // Fetch warehouse data from the server based on the provided ID
    axios
      .get(`${apiWarehouses}/${warehouseId}`)
      .then((res) => {
        const {
          warehouse_name,
          address,
          city,
          country,
          contact_name,
          contact_position,
          contact_phone,
          contact_email,
        } = res.data;
        setWarehouseName(warehouse_name);
        setAddress(address);
        setCity(city);
        setCountry(country);
        setContactName(contact_name);
        setContactPosition(contact_position);
        setContactPhone(contact_phone);
        setContactEmail(contact_email);
      })
      .catch((error) => {
        console.log("Error fetching warehouse data:", error);
      });
  }, []);

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

      // Update the warehouse using the ID
      axios
        .put(`${apiWarehouses}/${warehouseId}`, postData)
        .then((res) => {
          // Reset the form or perform any other actions upon successful update
          setWarehouseName("");
          setAddress("");
          setCity("");
          setCountry("");
          setContactName("");
          setContactPosition("");
          setContactPhone("");
          setContactEmail("");
          alert("Information Updated");
          navigate(-1);
        })
        .catch((error) => {
          console.log("Error updating warehouse:", error);
        });
    }
  };

  return (
    <form className="form1" onSubmit={handleSubmit}>
      <div className="form1__bgBlue"></div>
      <div className="form1__wrapper">
        <div className="form1__header">
          <Link to="/">
            <img className="form__header-img" src={arrow_back} alt="back" />
          </Link>
          <h1 className="form1__header-title">Edit Warehouse</h1>
        </div>
        <fieldset className="form1__fieldset">
          <div className="form1__warehouse1">
            <div className="form1__display1">
              <h2 className="form1__warehouse-title">Warehouse Details</h2>

              <div className="form__warehouse__fields">
                <label
                  className="form__warehouse__fields-label"
                  htmlFor="warehouseName"
                >
                  Warehouse Name
                </label>
                <input
                  className="form1__warehouse1__fields-input"
                  type="text"
                  name="warehouseName"
                  id="warehouseName"
                  placeholder="Warehouse Name"
                  onChange={handleChangeInput(setWarehouseName)}
                  value={warehouseName}
                  onBlur={validateField(setValidateWarehouseName)}
                />
                <div
                  className={
                    validateWarehouseName
                      ? "form__fields-error"
                      : "form__fields-error form__fields-error--hide"
                  }
                >
                  <img src={error} alt="error" />
                  <p>This field is required</p>
                </div>
                <label
                  className="form__warehouse__fields-label"
                  htmlFor="address"
                >
                  Street Address
                </label>
                <input
                  className="form1__warehouse1__fields-input"
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Street Address"
                  onChange={handleChangeInput(setAddress)}
                  value={address}
                  onBlur={validateField(setValidateAddress)}
                />
                <div
                  className={
                    validateAddress
                      ? "form__fields-error"
                      : "form__fields-error form__fields-error--hide"
                  }
                >
                  <img src={error} alt="error" />
                  <p>This field is required</p>
                </div>
                <label
                  className="form1__warehouse__fields-label"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  className="form1__warehouse1__fields-input"
                  type="text"
                  name="city"
                  id="city"
                  placeholder="City"
                  onChange={handleChangeInput(setCity)}
                  value={city}
                  onBlur={validateField(setValidateCity)}
                />
                <div
                  className={
                    validateCity
                      ? "form__fields-error"
                      : "form__fields-error form__fields-error--hide"
                  }
                >
                  <img src={error} alt="error" />
                  <p>This field is required</p>
                </div>
                <label
                  className="form1__warehouse__fields-label"
                  htmlFor="country"
                >
                  Country
                </label>
                <input
                  className="form1__warehouse1__fields-input"
                  type="text"
                  name="country"
                  id="country"
                  placeholder="Country"
                  onChange={handleChangeInput(setCountry)}
                  value={country}
                  onBlur={validateField(setValidateCountry)}
                />
                <div
                  className={
                    validateCountry
                      ? "form__fields-error"
                      : "form__fields-error form__fields-error--hide"
                  }
                >
                  <img src={error} alt="error" />
                  <p>This field is required</p>
                </div>
              </div>
            </div>
            <div className="form1__display2">
              <div className="form__contact">
                <h2 className="form1__contact-title">Contact Details</h2>
                <div className="form__contact__fields">
                  <label
                    className="form__contact__fields-label"
                    htmlFor="contactName"
                  >
                    Contact Name
                  </label>
                  <input
                    className="form1__contact__fields-input"
                    type="text"
                    name="contactName"
                    id="contactName"
                    placeholder="Contact Name"
                    onChange={handleChangeInput(setContactName)}
                    value={contactName}
                    onBlur={validateField(setValidateContactName)}
                  />
                  <div
                    className={
                      validateContactName
                        ? "form__fields-error"
                        : "form__fields-error form__fields-error--hide"
                    }
                  >
                    <img src={error} alt="error" />
                    <p>This field is required</p>
                  </div>
                  <label
                    className="form__contact__fields-label"
                    htmlFor="contactPosition"
                  >
                    Position
                  </label>
                  <input
                    className="form1__contact__fields-input"
                    type="text"
                    name="contactPosition"
                    id="contactPosition"
                    placeholder="Position"
                    onChange={handleChangeInput(setContactPosition)}
                    value={contactPosition}
                    onBlur={validateField(setValidateContactPosition)}
                  />
                  <div
                    className={
                      validateContactPosition
                        ? "form__fields-error"
                        : "form__fields-error form__fields-error--hide"
                    }
                  >
                    <img src={error} alt="error" />
                    <p>This field is required</p>
                  </div>
                  <label
                    className="form__contact__fields-label"
                    htmlFor="contactPhone"
                  >
                    Phone Number
                  </label>
                  <input
                    className="form1__contact__fields-input"
                    type="text"
                    name="contactPhone"
                    id="contactPhone"
                    placeholder="Phone Number in the format +1 (555) 555-5555"
                    onChange={handleChangeInput(setContactPhone)}
                    value={contactPhone}
                    onBlur={validateField(setValidateContactPhone)}
                  />
                  <div
                    className={
                      validateContactPhone
                        ? "form__fields-error"
                        : "form__fields-error form__fields-error--hide"
                    }
                  >
                    <img src={error} alt="error" />
                    <p>This field is required</p>
                  </div>
                  <label
                    className="form__contact__fields-label"
                    htmlFor="contactEmail"
                  >
                    Email
                  </label>
                  <input
                    className="form1__contact__fields-input"
                    type="mail"
                    name="contactEmail"
                    id="contactEmail"
                    placeholder="Email"
                    onChange={handleChangeInput(setContactEmail)}
                    value={contactEmail}
                    onBlur={validateField(setValidateContactEmail)}
                  />
                  <div
                    className={
                      validateContactEmail
                        ? "form__fields-error"
                        : "form__fields-error form__fields-error--hide"
                    }
                  >
                    <img src={error} alt="error" />
                    <p>This field is required</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="form1__buttons">
            <Button
              className="cancelbtn"
              text="Cancel"
              type="button"
              addClassName={"btn__style--cancel"}
              handleClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
            />
            <Button text="Save" type="submit" disabled={!isFormValid()} />
          </div>
        </fieldset>
      </div>
    </form>
  );
}

export default EditWarehouse;
