import React from "react";
import { useParams } from "react-router-dom";
import EditContactForm from "../components/contacts/EditContactForm";
import { useGetContactQuery } from "../features/contacts/contactsAPI";
import EditContactLoader from "../ui/EditContactLoader";
import { formateContact } from "../utils/formateContact";

const EditContact = () => {
  const { contactId } = useParams();
  const { data: contact, isLoading, isSuccess, isError, error } = useGetContactQuery(contactId);

  // decide what to render
  let content = null;
  if (isLoading) content = <EditContactLoader />;
  if (isSuccess && Object.keys(contact?.data).length === 0 || isError) {
    content = (
      <h2 style={{ color: "red", textAlign: "center", marginTop: '100px'}}>
        Contact not found to edit data
      </h2>
    );
  }
  if (isSuccess && Object.keys(contact?.data).length) {
    content = <EditContactForm contact={formateContact(contact?.data)} />;
  }

  return <div>{content}</div>;
};

export default EditContact;
