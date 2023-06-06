<<<<<<< HEAD
import logo from "./logo.svg";
import "./App.css";
=======
import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import WareHousesPage from "./pages/WareHousesPage/WareHousesPage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import EditWareHousesForm from "./pages/EditWareHousesForm/EditWareHousesForm";
import AddNewWareHousesForm from "./pages/AddNewWareHousesForm/AddNewWareHousesForm";
>>>>>>> develop

function App() {
  return (
    <div>
      {/* Initial router set up */}
      <BrowserRouter>
        {/* Navigation links to pages */}
        <nav>
          <ul>
            <li>
              <Link to="/">Warehouses</Link>
            </li>
            <li>
              <Link to="/inventory">Inventory</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<WareHousesPage />} />
          <Route path="/warehouses" element={<Navigate to="/" />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/warehouses/edit" element={<EditWareHousesForm />} />
          <Route path="/warehouses/add" element={<AddNewWareHousesForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
