import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import WareHousesPage from "./pages/WareHousesPage/WareHousesPage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import EditWareHousesForm from "./pages/EditWareHousesForm/EditWareHousesForm";
import AddNewWarehouse from "./components/AddNewWarehouse/AddNewWarehouse";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import WarehouseDetailsPage from "./pages/WarehouseDetailsPage/WarehouseDetailsPage";
import InventoryDetailsPage from "./pages/InventoryDetailsPage/InventoryDetailsPage";
import "./App.scss";
import AddNewInventoryItem from "./components/AddNewInventoryItem/AddNewInventoryItem";

function App() {
  return (
    <div>
      {/* Initial router set up */}
      <BrowserRouter>
        {/* Navigation links to pages */}
        <Header />

        <Routes>
          <Route path="/warehouses" element={<WareHousesPage />} />
          <Route path="/" element={<Navigate to="/warehouses" />} />
          <Route
            path="/warehouses/:id/details"
            element={<WarehouseDetailsPage />}
          />

          <Route path="/warehouses/edit" element={<EditWareHousesForm />} />
          <Route path="/warehouses/:id/edit" element={<EditWareHousesForm />} />
          <Route path="/warehouses/add" element={<AddNewWarehouse />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/inventory/details" element={<InventoryDetailsPage />} />
          <Route path="/inventory/add" element={<AddNewInventoryItem />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
