import React from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../App.css";
import useAuthCheck from "../hooks/useAuthCheck";
import Header from "../layouts/Header";
import AddUser from "../pages/AddUser";
import Dashboard from "../pages/Dashboard";
import EditUser from "../pages/EditUser";
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import Users from "../pages/Users";
import Loader from "../ui/Loader";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const App = () => {
  const authChecked = useAuthCheck();

  return !authChecked ? (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loader size={150} speed={2} />
      </div>
    </>
  ) : (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Header />
      <Container style={{ margin: "0 auto" }} className="mt-3">
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          ></Route>

          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          ></Route>

          <Route
            path="/users/edit/:userId"
            element={
              <PrivateRoute>
                <EditUser />
              </PrivateRoute>
            }
          ></Route>

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route index element={<AddUser />} />
            <Route path="create" element={<AddUser />} />
            {/* <Route path="manage-password" element={<ManagePassword />} /> */}
          </Route>

          {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
          {/* <Route path="/reset-password" element={<ResetPassword />} /> */}

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Container>
    </div>
  );
};

export default App;
