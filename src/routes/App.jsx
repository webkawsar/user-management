import React from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "../App.css";
import useAuthCheck from "../hooks/useAuthCheck";
import Header from "../layouts/Header";
import AddContact from "../pages/AddContact";
import AddUser from "../pages/AddUser";
import ContactDetails from "../pages/ContactDetails";
import Dashboard from "../pages/Dashboard";
import EditContact from "../pages/EditContact";
import ForgotPassword from "../pages/ForgotPassword";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ManagePassword from "../pages/ManagePassword";
import NotFound from "../pages/NotFound";
import Playground from "../pages/Playground";
import Register from "../pages/Register";
import ResetPassword from "../pages/ResetPassword";
import UserContacts from "../pages/UserContacts";
import Users from "../pages/Users";
import Loader from "../ui/Loader";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";


const App = () => {
  const authChecked = useAuthCheck();

  return !authChecked ? (
    <>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
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
            path="/new/contacts"
            element={
              <PrivateRoute>
                <AddContact />
              </PrivateRoute>
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
            path="/contacts/:contactId"
            element={
              <PrivateRoute>
                <ContactDetails />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/edit/contacts/:contactId"
            element={
              <PrivateRoute>
                <EditContact />
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
            <Route path="manage-password" element={<ManagePassword />} />
            <Route path="contacts" element={<UserContacts />} />
          </Route>

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route path="/playground" element={<Playground />} />

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Container>
    </div>
  );
};

export default App;
