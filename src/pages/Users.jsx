import React, { useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { BsFillEyeFill } from "react-icons/bs";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../features/users/usersAPI";
import Loader from "../ui/Loader";

const Users = () => {
  const { data, isLoading, isSuccess, isError, error } = useGetUsersQuery();
  const [
    deleteUser,
    { isSuccess: deleteIsSuccess, isError: deleteIsError, error: deleteError },
  ] = useDeleteUserMutation();

  const { user: loggedInUser } = useSelector((state) => state.auth);

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Loader size={150} speed={2} />
      </div>
    );
  }

  if (isSuccess) {
    content = (
      <Table striped>
        <thead style={{textAlign: "center"}}>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>isVerified</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody style={{textAlign: "center"}}>
          {data.users.map((user) => {
            const { id, firstName, lastName, email, role, isVerified } = user;
            return (
              <tr
                style={{
                  border: loggedInUser.id === id ? "3px solid green" : null,
                }}
                key={id}
              >
                <td>{id}</td>
                <td>{`${firstName} ${lastName}`}</td>
                <td>{email}</td>
                <td>{role}</td>
                <td>{`${isVerified}`}</td>
                <td>
                  <Link to={`/users/${id}`}>
                    <Button variant="primary">
                      <BsFillEyeFill size={22} />
                    </Button>
                  </Link>
                  <Link to={`/users/edit/${id}`} style={{color: 'inherit', margin: '0 10px'}}>
                    <Button variant="warning">
                      <FaPencilAlt size={22} />
                    </Button>
                  </Link>
                  <Button variant="danger">
                    <FaTrashAlt size={22} onClick={() => handleDelete(id)} />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }

  return <div>{content}</div>;
};

export default Users;
