import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.min.css";
import { store } from "./app/store";
import { AuthProvider } from "./context/Auth.context";
import { ContactProvider } from "./context/Contact.context";
import { UserProvider } from "./context/User.context";
import "./index.css";
import App from "./routes/App";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <ContactProvider>
        <UserProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </UserProvider>
      </ContactProvider>
    </AuthProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
