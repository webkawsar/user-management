import { createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance, axiosPrivateInstance } from "../config/axios";

export const AuthContext = createContext();
const storageUser = JSON.parse(localStorage.getItem("user"));
const storageToken = JSON.parse(localStorage.getItem("token"));

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(storageUser ? storageUser : null);
  const [token, setToken] = useState(storageToken ? storageToken : null);
  const navigate = useNavigate();
  const location = useLocation();

  const registerUser = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/local/register", data);

      // show success msg
      toast.success("Confirm your account by clicking the email link");
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
    }
  };

  const login = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/local", data);
      const { jwt, user } = response.data;

      // update state
      setUser(user);
      setToken(jwt);

      // set data to local storage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(jwt));

      // show success msg
      toast.success("Login successful");

      // redirect the user
      navigate(location?.state?.from ? location?.state?.from : "/contacts");
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
    }
  };

  const logout = () => {
    //remove data from storage
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // remove data from state
    setUser(null);
    setToken(null);

    // show logout msg
    toast.success("Logout successful");

    // redirect the user
    navigate("/login");
  };

  const changePassword = async (data) => {
    try {
      const response = await axiosPrivateInstance(token).post(
        "/auth/change-password",
        {
          currentPassword: data.currentPassword,
          password: data.newPassword,
          passwordConfirmation: data.confirmPassword,
        }
      );
      const { jwt, user } = response.data;

      // update state
      setUser(user);
      setToken(jwt);

      // set data to local storage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(jwt));

      // show success msg
      toast.success("Password changed successfully");

      // redirect the user to profile
      navigate("/dashboard/profile");
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
    }
  };

  const value = {
    user,
    token,
    registerUser,
    login,
    logout,
    changePassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
