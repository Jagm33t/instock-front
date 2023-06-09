import React, { useState, useEffect } from "react";
import { useParams , useNavigate } from "react-router-dom";
import { Link  } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button/Button";
import arrow_back from "../../assets/icons/arrow_back-24px.svg";

function EditWarehouse() {
  const [warehouseData, setWarehouseData] = useState({
    warehouse_name: "",
    address: "",
    city: "",
    country: "",
    contact_name: "",
    contact_position: "",
    contact_phone: "",
    contact_email: "",
  });
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
  const warehouseId = params.id;
  console.log(warehouseId);
  useEffect(() => {
    // Fetch warehouse data from the server based on the provided ID
    axios
      .get(`http://localhost:8080/api/warehouses/${warehouseId}`)
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
        setWarehouseData({
          warehouse_name,
          address,
          city,
          country,
          contact_name,
          contact_position,
          contact_phone,
          contact_email,
        });
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
  const handleChangeInput= (setState) => (event) => {
    setState(event.target.value);
  };
  
const navigate = useNavigate();

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
        .put(`http://localhost:8080/api/warehouses/${warehouseId}`, postData)
        .then((res) => {
          console.log("Warehouse updated successfully:", res.data);
          // Reset the form or perform any other actions upon successful update
          setWarehouseData({
            warehouse_name: "",
            address: "",
            city: "",
            country: "",
            contact_name: "",
            contact_position: "",
            contact_phone: "",
            contact_email: "",
          });
          alert("Information Updated");
          navigate("/warehouses");
        })
        .catch((error) => {
          console.log("Error updating warehouse:", error);
        });
    }
    


  };
  
 
  return (
   
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__header">
      <Link to="/">
          <img className="form__header-img" src={arrow_back} alt="back" />
        </Link>
        <h1 className="form__header-title">Edit Warehouse</h1>
      </div>
      <fieldset className="form__fieldset">
        <div className="form__warehouse">
          <h2 className="form__warehouse-title">Warehouse Details</h2>
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
                type="text"
                name="contactPhone"
                id="contactPhone"
                placeholder="Phone Number"
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
      <Link to="/inventory">
  <Button text="Cancel" type="button" addClassName="btn__style--cancel" />
</Link>
  <Button text="Save" type="submit" disabled={!isFormValid()} />
</div>

     
    </form>
  );
}

export default EditWarehouse;
