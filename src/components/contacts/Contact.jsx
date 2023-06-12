import { format } from "date-fns";
import React, { useEffect } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { FaEye, FaRegTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDeleteContactMutation } from "../../features/contacts/contactsAPI";
import formatImageUrl from "../../utils/formatImageUrl";

const Contact = ({ contact }) => {
  const [deleteContact, {data, isLoading, isSuccess, isError, error}] = useDeleteContactMutation();
  const { user } = useSelector(state => state.auth);

  const {
    id,
    firstName,
    lastName,
    email,
    gender,
    profession,
    image,
    dob,
    bio,
    author,
  } = contact;

  const handleDelete = (id) => {
    deleteContact(id);
  };

  useEffect(() => {

    if(isError) {
      toast.error(error?.data?.error?.message);
    }

    if(isSuccess) {
      // show flash message
      toast.success("Contact deleted successfully");
    }
  }, [isError, isSuccess])

  const isOwner = user?.id === author?.data?.id ? author?.data?.id : author?.id;
  let imageUrl = formatImageUrl(image);

  return (
    <>
      <Col md={6}>
        <Card>
          <Row className="g-0">
            <Col md={5}>
              <Card.Img src={imageUrl} className="h-100" />
            </Col>
            <Col md={7}>
              <Card.Body>
                <Card.Title>
                  {firstName} {lastName}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted text-capitalize">
                  {profession}
                </Card.Subtitle>
                <Card.Text>{bio}</Card.Text>
              </Card.Body>

              <ListGroup variant="flush">
                <ListGroup.Item>Email: {email}</ListGroup.Item>
                <ListGroup.Item className="text-capitalize">
                  Gender: {gender}
                </ListGroup.Item>
                <ListGroup.Item>
                  Date of Birth:{" "}
                  {dob instanceof Object ? format(dob, "d-MMM-yyyy") : dob}
                </ListGroup.Item>
              </ListGroup>

              <Card.Footer>
                <Link to={`/contacts/${id}`}>
                  <Button variant="warning">
                    <FaEye />
                  </Button>
                </Link>

                {isOwner && (
                  <Button
                    variant="danger ms-3"
                    onClick={() => handleDelete(id)}
                  >
                    <FaRegTrashAlt />
                  </Button>
                )}
              </Card.Footer>
            </Col>
          </Row>
        </Card>
      </Col>
    </>
  );
};

export default Contact;
