import {
  ADD_CONTACT,
  CONTACTS_LOADED,
  DELETE_CONTACT,
  UPDATE_CONTACT,
} from "./action.types";

export const initialState = {
  loaded: false,
  contacts: [],
};

const contactsReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CONTACTS_LOADED:
      return {
        ...state,
        loaded: true,
        contacts: [...payload],
      };

    case ADD_CONTACT:
      return {
        ...state,
        contacts: [payload, ...state.contacts],
      };

    case UPDATE_CONTACT:
      const updatedContacts = state?.contacts.map((contact) => {
        if (contact.id === payload?.id) {
          return payload;
        } else {
          return contact;
        }
      });
      return {
        ...state,
        contacts: [...updatedContacts],
      };

    case DELETE_CONTACT:
      const filteredContacts = state?.contacts.filter(
        (contact) => contact.id !== payload
      );
      return {
        ...state,
        contacts: filteredContacts,
      };

    default:
      return state;
  }
};

export default contactsReducer;
