import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import WareHousesPage from "./pages/WareHousesPage/WareHousesPage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";
import EditWareHousesForm from "./pages/EditWareHousesForm/EditWareHousesForm";
import AddNewWareHousesForm from "./pages/AddNewWareHousesForm/AddNewWareHousesForm";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import WarehouseDetails from "./pages/WarehouseDetails/WarehouseDetails";
import "./App.scss";

function App() {
  return (
    <div>
      {/* Initial router set up */}
      <BrowserRouter>
        {/* Navigation links to pages */}
        <Header />
        
        <Routes>
          <Route path="/warehouses" element={<WareHousesPage />}/>
          <Route path="/" element={<Navigate to="/warehouses" />} />
          <Route path="/warehouses/details" element={<WarehouseDetails />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/warehouses/edit" element={<EditWareHousesForm />} />
          <Route path="/warehouses/add" element={<AddNewWareHousesForm />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
