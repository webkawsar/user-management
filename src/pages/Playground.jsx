import React from "react";
import { Card, Col, ListGroup, Placeholder, Row } from "react-bootstrap";

const Playground = () => {
  return (
    <>
      <Card style={{ height: "350px" }}>
        <Row className="g-0">
          <Col md={5}>
            <Card.Img
              className="h-75"
              src="https://cpimg.tistatic.com/05058109/b/4/Vat-Black-8.jpg"
            />
          </Col>
          <Col md={7}>
            <Card.Body>
              <Placeholder as={Card.Title} animation="glow">
                <Placeholder sm={7} />
              </Placeholder>

              <Placeholder as={Card.Subtitle} animation="glow">
                <Placeholder sm={4} />
              </Placeholder>

              <Placeholder as={Card.Text} animation="glow">
                <Placeholder sm={5} /> <Placeholder sm={4} />{" "}
                <Placeholder sm={2} />
                <Placeholder sm={4} /> <Placeholder sm={6} />
              </Placeholder>
            </Card.Body>

            <ListGroup variant="flush">
              <Placeholder as={ListGroup.Item} animation="glow">
                <Placeholder sm={10} />
              </Placeholder>

              <Placeholder as={ListGroup.Item} animation="glow">
                <Placeholder sm={4} />
              </Placeholder>

              <Placeholder as={ListGroup.Item} animation="glow">
                <Placeholder sm={6} />
              </Placeholder>
            </ListGroup>

            <Card.Footer>
              <Placeholder.Button variant="warning" sm={2} />{" "}
              <Placeholder bg="light" style={{ width: "4%" }} />
              <Placeholder.Button variant="danger" sm={2} />
            </Card.Footer>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Playground;
