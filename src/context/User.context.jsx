import qs from "qs";
import { createContext, useContext, useReducer } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosPrivateInstance } from "../config/axios";
import { formateContact } from "../utils/formateContact";
import { AuthContext } from "./Auth.context";
import { ContactContext } from "./Contact.context";
import userReducer, { userInitialState } from "./User.reducer";
import {
  ADD_PROFILE,
  DELETE_CONTACT,
  LOAD_USER_CONTACTS,
  LOAD_USER_PROFILE,
  UPDATE_PROFILE,
} from "./action.types";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const { setTrigger } = useContext(ContactContext);
  const [
    { isProfileLoaded, userProfile, loadedContacts, userContacts },
    dispatch,
  ] = useReducer(userReducer, userInitialState);

  const navigate = useNavigate();
  const location = useLocation();

  const loadUserProfile = async () => {
    const query = qs.stringify(
      {
        populate: [
          "contacts",
          "profile",
          "contacts.author",
          "contacts.image",
          "profile.profilePicture",
        ],
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    try {
      const response = await axiosPrivateInstance(token).get(
        `/users/me?${query}`
      );

      // save data tp reducer state
      dispatch({
        type: LOAD_USER_PROFILE,
        payload: response.data?.profile,
      });
      
    } catch (error) {
      toast.error("Profile Load Error");
    }
  };

  const createUserProfile = async (data) => {
    const { profilePicture, ...restData } = data;

    const formData = new FormData();
    if (profilePicture.length) {
      formData.append(
        "files.profilePicture",
        profilePicture[0],
        profilePicture[0]?.name
      );
    }
    formData.append("data", JSON.stringify(restData));

    try {
      const response = await axiosPrivateInstance(token).post(
        "/profiles",
        formData
      );

      const formattedData = formateContact(response?.data?.data);
      dispatch({ type: ADD_PROFILE, payload: formattedData });
      toast.success('Profile create successfully');
      
    } catch (error) {
      toast.error('Profile Create Error')
    }
  };

  const loadUserContacts = async () => {
    const query = qs.stringify(
      {
        populate: [
          "contacts",
          "profile",
          "contacts.author",
          "contacts.image",
          "profile.profilePicture",
        ],
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    try {
      const response = await axiosPrivateInstance(token).get(
        `/users/me?${query}`
      );

      // save data tp reducer state
      dispatch({
        type: LOAD_USER_CONTACTS,
        payload: response.data?.contacts,
      });
    } catch (error) {
      toast.error("User Contacts Load Error");
    }
  };

  const updateUserProfile = async (id, data) => {
    const { profilePicture, ...restData } = data;

    const query = qs.stringify(
      {
        populate: "*",
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );

    const formData = new FormData();
    if (profilePicture.length) {
      formData.append(
        "files.profilePicture",
        profilePicture[0],
        profilePicture[0]?.name
      );
    }
    formData.append("data", JSON.stringify(restData));

    try {
      const response = await axiosPrivateInstance(token).put(
        `/profiles/${id}?${query}`,
        formData
      );

      const formattedData = formateContact(response?.data?.data);
      dispatch({ type: UPDATE_PROFILE, payload: formattedData });
      toast.success('Profile update successfully');

    } catch (error) {
      toast.error('Profile Update Error')
    }
  };

  const deleteUserContact = async (id) => {
    try {
      await axiosPrivateInstance(token).delete(`/contacts/${id}`);

      // delete from UI
      dispatch({ type: DELETE_CONTACT, payload: id });

      // show flash message
      toast.success("Contact deleted successfully");

      // trigger for contacts route UI delete
      setTrigger((prevState) => !prevState);
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
    }
  };

  const value = {
    isProfileLoaded,
    userProfile,
    loadedContacts,
    userContacts,
    loadUserProfile,
    loadUserContacts,
    createUserProfile,
    updateUserProfile,
    deleteUserContact,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
