import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Users from "./pages/Users";
import UserEdit from "./pages/UserEdit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/users"
        element={
          <ProtectedRoute requireAdmin={true}>
            <Layout>
              <Users />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/users/:userId"
        element={
          <ProtectedRoute>
            <Layout>
              <UserEdit />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
