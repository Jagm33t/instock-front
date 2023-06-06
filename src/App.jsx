import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import WareHousesPage from "./pages/WareHousesPage/WareHousesPage";
import InventoryPage from "./pages/InventoryPage/InventoryPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WareHousesPage />} />
          <Route path="/warehouses" element={<Navigate to="/" />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
