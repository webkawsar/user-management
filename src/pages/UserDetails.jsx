import React from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetUserQuery } from "../features/users/usersAPI";
import Loader from "../ui/Loader";

const UserDetails = () => {
  const { userId } = useParams();
  const { data, isLoading, isSuccess, isError, error } =
    useGetUserQuery(userId);

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
          <Button variant="primary">Edit</Button>
          <Button variant="danger">Delete</Button>
        </Card.Body>
      </Card>
    );
  }

  return <div style={{ width: "30vw", margin: "0 auto" }}>{content}</div>;
};

export default UserDetails;
