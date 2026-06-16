import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Cabins from "./pages/Cabins";

import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cabins" element={<Cabins />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
