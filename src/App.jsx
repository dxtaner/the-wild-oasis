import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Cabins from "./pages/cabins/Cabins";
import Bookings from "./pages/bookings/Bookings";
import BookingDetail from "./pages/bookings/BookingDetail";
import Users from "./pages/users/Users";
import Settings from "./pages/settings/Settings";
import PageNotFound from "./pages/PageNotFound";
import UpdateUser from "./components/layout/UpdateUser";

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
          <Route path="bookings/:id" element={<BookingDetail />} />{" "}
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/update-user" element={<UpdateUser />} />
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
