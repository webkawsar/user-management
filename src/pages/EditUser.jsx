import React from "react";
import { useParams } from "react-router-dom";
import EditUserForm from "../components/users/EditUserForm";
import { useGetUserQuery } from "../features/users/usersAPI";

const EditUser = () => {
  const { userId } = useParams();
  const { data, isLoading, isSuccess, isError, error } = useGetUserQuery(userId);

  // decide what to render
  let content = null;
  if (isLoading) content = <div>Loading....</div>;
  if (isSuccess && Object.keys(data?.user).length === 0 || isError) {
    content = (
      <h2 style={{ color: "red", textAlign: "center", marginTop: '100px'}}>
        User not found to edit data
      </h2>
    );
  }
  if (isSuccess && Object.keys(data?.user).length) {
    content = <EditUserForm user={data?.user} />;
  }

  return <div>{content}</div>;
};

export default EditUser;
