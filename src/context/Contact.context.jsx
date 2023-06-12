import qs from "qs";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosPrivateInstance } from "../config/axios";
import { formateContact } from "../utils/formateContact";
import { AuthContext } from "./Auth.context";
import contactsReducer, { initialState } from "./Contact.reducer";
import { CONTACTS_LOADED, UPDATE_CONTACT } from "./action.types";

// create a context
export const ContactContext = createContext();

// create a provider
export const ContactProvider = ({ children }) => {
  const { user, token } = useContext(AuthContext);
  const [{ loaded, contacts }, dispatch] = useReducer(
    contactsReducer,
    initialState
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [trigger, setTrigger] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token) {
      // getAllContacts();
    }
  }, [token, pageNumber, trigger]);

  const getAllContacts = async () => {
    try {
      const query = qs.stringify(
        {
          sort: ["id:desc"],
          populate: "*",
          pagination: {
            page: pageNumber,
            pageSize: import.meta.env.VITE_PAGE_SIZE,
          },
        },
        {
          encodeValuesOnly: true, // prettify URL
        }
      );
      const response = await axiosPrivateInstance(token).get(
        `/contacts?${query}`
      );

      const mappedContacts = response?.data?.data?.map((contact) =>
        formateContact(contact)
      );

      dispatch({ type: CONTACTS_LOADED, payload: mappedContacts });

      // set pagination data
      // console.log(response.data.meta.pagination, "res");
      setPageNumber(response?.data?.meta?.pagination?.page);
      setPageCount(response?.data?.meta?.pagination?.pageCount);
    } catch (error) {
      toast.error(`Can't load all contacts`);
    }
  };

  const addContact = async (contact) => {
    try {
      const { image, ...restData } = contact;

      const formData = new FormData();
      formData.append("files.image", image[0], image[0]?.name);
      formData.append("data", JSON.stringify(restData));

      const response = await axiosPrivateInstance(token).post(
        "/contacts",
        formData
      );

      // const mappingContactData = formateContact(response?.data?.data);
      // dispatch({ type: ADD_CONTACT, payload: mappingContactData });

      // show flash message
      toast.success("Contact added successfully");

      // trigger for load contacts
      setTrigger(!trigger);

      // redirect to user
      navigate("/contacts");
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
    }
  };

  const updateContact = async (updatedContactValue, id) => {
    try {
      const { image, ...restData } = updatedContactValue;

      const formData = new FormData();
      if (image.length) {
        formData.append("files.image", image[0], image[0]?.name);
      }
      formData.append("data", JSON.stringify(restData));

      const response = await axiosPrivateInstance(token).put(
        `/contacts/${id}`,
        formData
      );

      const mappedData = formateContact(response?.data?.data);
      dispatch({ type: UPDATE_CONTACT, payload: mappedData });

      // show flash message
      toast.success("Contact updated successfully");

      // redirect to user
      navigate(`/contacts/${response?.data?.data?.id}`);
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
    }
  };

  const deleteContact = async (id) => {
    try {
      const response = await axiosPrivateInstance(token).delete(
        `/contacts/${id}`
      );

      // dispatch({ type: DELETE_CONTACT, payload: response?.data?.data?.id });

      // show flash message
      toast.success("Contact deleted successfully");

      // trigger for load contacts
      setTrigger(!trigger);

      // redirect to user
      if (location.pathname === `/contacts/${id}`) {
        navigate("/contacts");
      }

      // console.log(location, "location");
    } catch (error) {
      toast.error(error?.response?.data?.error?.message);
    }
  };

  const value = {
    loaded,
    contacts,
    addContact,
    updateContact,
    deleteContact,
    pageNumber,
    setPageNumber,
    pageCount,
    setTrigger,
  };

  return (
    <ContactContext.Provider value={value}>{children}</ContactContext.Provider>
  );
};
