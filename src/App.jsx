import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Cabins from "./pages/Cabins";
import Bookings from "./pages/Bookings";
import Users from "./pages/Users";

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
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
