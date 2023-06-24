import React, { useEffect } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteUserMutation, useGetUserQuery } from "../features/users/usersAPI";
import Loader from "../ui/Loader";


const UserDetails = () => {
  const { userId } = useParams();
  const { data, isLoading, isSuccess, isError, error } =
    useGetUserQuery(userId);
    const [
      deleteUser,
      { isSuccess: deleteIsSuccess, isError: deleteIsError, error: deleteError },
    ] = useDeleteUserMutation();
    const navigate = useNavigate();

    const handleDelete = (id) => {
      deleteUser(id);
    };

    useEffect(() => {
      
      if (deleteIsError) {
        toast.error(deleteError?.data?.message ?? "Something went wrong!");
      }
  
      if (deleteIsSuccess) {
        toast.success("User deleted successfully");
        navigate('/users');
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

  if (isError) {
    content = (
      <h2 style={{ color: "red", textAlign: "center", marginTop: "100px" }}>
        {error?.data?.message ?? "Something went wrong"}
      </h2>
    );
  }

  if (isSuccess && Object.keys(data?.user)?.length === 0) {
    content = (
      <h2 style={{ color: "red", textAlign: "center", marginTop: "100px" }}>
        User not found to show details
      </h2>
    );
  }

  if (isSuccess && Object.keys(data?.user)?.length) {
    const { id, firstName, lastName, email, role, isVerified } = data.user;

    content = (
      <Card border="primary" style={{ width: "30vw" }}>
        <Card.Body>
          <Card.Title>{`${firstName} ${lastName}`}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{email}</Card.Subtitle>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Role: {role}</ListGroup.Item>
          <ListGroup.Item>Verified: {`${isVerified}`}</ListGroup.Item>
        </ListGroup>
        <Card.Body style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="warning" as={Link} to={`/users/edit/${id}`}>
            <FaPencilAlt size={22} />
          </Button>
          <Button variant="danger">
            <FaTrashAlt size={22} onClick={() => handleDelete(id)} />
          </Button>
        </Card.Body>
      </Card>
    );
  }

  return <div style={{ width: "30vw", margin: "0 auto" }}>{content}</div>;
};

export default UserDetails;
