import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditWarehouse({ warehouseId }) {
  const [warehouseData, setWarehouseData] = useState({
    warehouse_name: '',
    address: '',
    city: '',
    country: '',
    contact_name: '',
    contact_position: '',
    contact_phone: '',
    contact_email: '',
  });

  useEffect(() => {
    // Fetch warehouse data from the server based on the provided ID
    axios
      .get(`http://localhost:8080/api/warehouses/${warehouseId}`)
      .then((res) => {
        const { warehouse_name, address, city, country, contact_name, contact_position, contact_phone, contact_email } = res.data;
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
        console.log('Error fetching warehouse data:', error);
      });
  }, [warehouseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWarehouseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update the warehouse using the ID
    axios
      .put(`http://localhost:8080/api/warehouses/${warehouseId}`, warehouseData)
      .then((res) => {
        console.log('Warehouse updated successfully:', res.data);
        // Reset the form or perform any other actions upon successful update
        setWarehouseData({
          warehouse_name: '',
          address: '',
          city: '',
          country: '',
          contact_name: '',
          contact_position: '',
          contact_phone: '',
          contact_email: '',
        });
      })
      .catch((error) => {
        console.log('Error updating warehouse:', error);
      });
  };

  return (
    <div>
      <h2>Edit Warehouse</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Warehouse Name</h3>
          <div>
            <label htmlFor="warehouse_name">Warehouse Name:</label>
            <input
              type="text"
              id="warehouse_name"
              name="warehouse_name"
              value={warehouseData.warehouse_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={warehouseData.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              name="city"
              value={warehouseData.city}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="country">Country:</label>
            <input
              type="text"
              id="country"
              name="country"
              value={warehouseData.country}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <h3>Contact Details</h3>
          <div>
            <label htmlFor="contact_name">Contact Name:</label>
            <input
              type="text"
              id="contact_name"
              name="contact_name"
              value={warehouseData.contact_name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="contact_position">Contact Position:</label>
            <input
              type="text"
              id="contact_position"
              name="contact_position"
              value={warehouseData.contact_position}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="contact_phone">Contact Phone:</label>
            <input
              type="text"
              id="contact_phone"
              name="contact_phone"
              value={warehouseData.contact_phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="contact_email">Contact Email:</label>
            <input
              type="text"
              id="contact_email"
              name="contact_email"
              value={warehouseData.contact_email}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="button">Cancel</button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditWarehouse;
