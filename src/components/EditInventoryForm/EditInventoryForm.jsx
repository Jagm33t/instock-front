import backArrowImg from "../../assets/icons/arrow_back-24px.svg";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Button from "../Button/Button";
import "./EditInventoryForm.scss";

function EditInventoryForm() {
  const [warehouseName, setWarehouseName] = useState("");
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [contactName, setContactName] = useState("");

  const params = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/inventories/${params.id}`)
      .then((res) => {
        if (res.status === 404) {
          console.log(res);
        }
        const inventoryData = res.data[0];

        setWarehouseName(inventoryData.warehouse_name);
        setItemName(inventoryData.item_name);
        setDescription(inventoryData.description);
        setCategory(inventoryData.category);
        setStatus(inventoryData.status);
        setContactName(inventoryData.contactName);
      })
      .catch((error) => {
        console.log("Error fetching inventory data:", error);
      });
  }, []);
  console.log(warehouseName);
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
        <form className="form">
          <div className="form__itemDetails">
            <h3 className="form__title">Item Details</h3>

            <label htmlFor="itemName" className="form__title-item">
              Item Name
            </label>
            <input
              id="itemName"
              type="text"
              name="item_name"
              placeholder={`${itemName}`}
              value=""
            />
            <label htmlFor="description" className="form__title-item">
              Description
            </label>
            <textarea
              name="description"
              className="form__textarea"
              id="description"
              placeholder={`${description}`}
              value=""
            />
            <label htmlFor="category" className="form__title-item">
              Category
            </label>
            <select
              id="category"
              name="category"
              form="category"
              className="form__category"
              value=""
            >
              <option value="">Select Option</option>
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
                    name="status"
                    id="instock"
                    value="in stock"
                    checked=""
                  />
                  <label htmlFor="instock">In stock</label>
                </p>
                <p>
                  <input
                    type="radio"
                    name="status"
                    id="outOfStock"
                    value="out of stock"
                    checked=""
                  />
                  <label htmlFor="outOfStock">Out of Stock</label>
                </p>
              </div>
            </fieldset>
            <label htmlFor="warehouse">Warehouse</label>
            <select
              id="warehouse"
              name="warehouse_name"
              className="form__category"
              value=""
            >
              <option value="">Select Option</option>
              <option value="manhattan">Manhattan</option>
              <option value="jersey">Jersey</option>
              <option value="SF">SF</option>
              <option value="santa-monica">Santa Monica</option>
              <option value="seattle">Seattle</option>
              <option value="miami">Miami</option>
            </select>
          </div>
          <div>
            <Button text="Cancel" addClassName={"btn__style--cancel"} />
            <Button text="Submit" />
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditInventoryForm;

// import backArrowImg from "../../assets/icons/arrow_back-24px.svg";
// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import axios from "axios";
// import Button from "../Button/Button";
// import "./EditInventoryForm.scss";

// function EditInventoryForm() {
//   const [inventoryData, setInventoryData] = useState({
//     item_name: "",
//     description: "",
//     category: "",
//     status: "",
//     contact_name: "",
//     warehouse_name: "",
//   });

//   const params = useParams();

//   const fetchInventoryData = () => {
//     axios
//       .get(`http://localhost:8080/api/inventories/${params.id}`)
//       .then((res) => {
//         const {
//           item_name,
//           description,
//           category,
//           status,
//           contact_name,
//           warehouse_name,
//         } = res.data;
//         setInventoryData({
//           item_name,
//           description,
//           category,
//           status,
//           contact_name,
//           warehouse_name,
//         });
//       })
//       .catch((error) => {
//         console.log("Error fetching inventory data:", error);
//       });
//   };
//   console.log(inventoryData);
//   useEffect(() => {
//     if (params.id) {
//       fetchInventoryData();
//     }
//   }, [params.id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInventoryData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     axios
//       .put(`http://localhost:8080/api/inventories/${params.id}`, inventoryData)
//       .then((res) => {
//         console.log("Inventory updated successfully:", res.data);

//         setInventoryData({
//           item_name: "",
//           description: "",
//           category: "",
//           status: "",
//           contact_name: "",
//           warehouse_name: "",
//         });
//       })
//       .catch((error) => {
//         console.log("Error updating inventory:", error);
//       });
//   };

//   return (
//     <section className="card">
//       <div className="card__bgBlue"></div>
//       <div className="card__wrapper">
//         <div className="card__header">
//           <div className="card__header-tittle-container">
//             <Link to="/inventory/details" type="button" className="btn__noBG">
//               <img
//                 src={backArrowImg}
//                 alt={backArrowImg}
//                 className="btn__noBG-img"
//               />
//               <p className="btn__name">Edit</p>
//             </Link>
//             <h1 className="card__header-title">Edit Inventory Item</h1>
//           </div>
//         </div>
//         <form onSubmit={handleSubmit} className="form">
//           <div className="form__itemDetails">
//             <h3 className="form__title">Item Details</h3>

//             <label htmlFor="itemName" className="form__title-item">
//               Item Name
//             </label>
//             <input
//               id="itemName"
//               type="text"
//               name="item_name"
//               placeholder="Item Name"
//               value={inventoryData.item_name}
//               onChange={handleChange}
//             />
//             <label htmlFor="description" className="form__title-item">
//               Description
//             </label>
//             <textarea
//               name="description"
//               className="form__textarea"
//               id="description"
//               placeholder="Description"
//               value={inventoryData.description}
//               onChange={handleChange}
//             />
//             <label htmlFor="category" className="form__title-item">
//               Category
//             </label>
//             <select
//               id="category"
//               name="category"
//               form="category"
//               className="form__category"
//               value={inventoryData.category}
//               onChange={handleChange}
//             >
//               <option value="">Select Option</option>
//               <option value="accessories">Accessories</option>
//               <option value="apparel">Apparel</option>
//               <option value="electronics">Electronics</option>
//               <option value="gear">Gear</option>
//               <option value="health">Health</option>
//             </select>
//           </div>
//           <div className="form__itemDetails">
//             <h3 className="form__title">Item Availability</h3>
//             <fieldset>
//               <legend>Status</legend>
//               <div className="form__radioSection">
//                 <p>
//                   <input
//                     type="radio"
//                     name="status"
//                     id="instock"
//                     value="in stock"
//                     checked={inventoryData.status === "in stock"}
//                     onChange={handleChange}
//                   />
//                   <label htmlFor="instock">In stock</label>
//                 </p>
//                 <p>
//                   <input
//                     type="radio"
//                     name="status"
//                     id="outOfStock"
//                     value="out of stock"
//                     checked={inventoryData.status === "out of stock"}
//                     onChange={handleChange}
//                   />
//                   <label htmlFor="outOfStock">Out of Stock</label>
//                 </p>
//               </div>
//             </fieldset>
//             <label htmlFor="warehouse">Warehouse</label>
//             <select
//               id="warehouse"
//               name="warehouse_name"
//               className="form__category"
//               value={inventoryData.warehouse_name}
//               onChange={handleChange}
//             >
//               <option value="">Select Option</option>
//               <option value="manhattan">Manhattan</option>
//               <option value="jersey">Jersey</option>
//               <option value="SF">SF</option>
//               <option value="santa-monica">Santa Monica</option>
//               <option value="seattle">Seattle</option>
//               <option value="miami">Miami</option>
//             </select>
//           </div>
//           <div>
//             <Button text="Cancel" addClassName={"btn__style--cancel"} />
//             <Button text="Submit" />
//           </div>
//         </form>
//       </div>
//     </section>
//   );
// }

// export default EditInventoryForm;

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setInventoryData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     axios
//       .put(`http://localhost:8080/api/inventories/${params.id}`, inventoryData)
//       .then((res) => {
//         console.log("Inventory updated successfully:", res.data);

//         setInventoryData({
//           item_name: "",
//           description: "",
//           category: "",
//           status: "",
//           contact_name: "",
//           warehouse_name: "",
//         });
//       })
//       .catch((error) => {
//         console.log("Error updating inventory:", error);
//       });
//   };
