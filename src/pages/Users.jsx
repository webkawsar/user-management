import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../features/users/usersAPI";

const Users = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetUsersQuery();
  const [
    deleteUser,
    { isSuccess: deleteIsSuccess, isError: deleteIsError, error: deleteError },
  ] = useDeleteUserMutation();
  const [
    updateUser,
    { isSuccess: updateIsSuccess, isError: updateIsError, error: updateError },
  ] = useUpdateUserMutation();

  const handleEdit = (id) => {

  };

  const handleDelete = (id) => {
    deleteUser(id);
  };

  useEffect(() => {
    if (deleteIsError) {
      toast.error(deleteError?.data?.message);
    }

    if (deleteIsSuccess) {
      toast.success("User deleted successfully");
    }
  }, [deleteIsError, deleteIsSuccess]);

  // decide what to render
  let content = null;
  if (isLoading) {
    content = (
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td>Loading.....</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    );
  }

  if (isSuccess) {
    content = data.users.map((user) => {
      const { id, firstName, lastName, email, role, isVerified } = user;
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{`${firstName} ${lastName}`}</td>
          <td>{email}</td>
          <td>{role}</td>
          <td>{`${isVerified}`}</td>
          <td>
            <Link to={`/users/edit/${id}`}>
              <Button variant="warning">
                Edit
              </Button>
            </Link>
          </td>
          <td>
            <Button onClick={() => handleDelete(id)} variant="danger">
              Delete
            </Button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>isVerified</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{content}</tbody>
      </Table>
    </div>
  );
};

export default Users;
