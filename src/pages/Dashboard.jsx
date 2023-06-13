import React from "react";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import { useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const { user: loggedInUser } = useSelector((state) => state.auth);
  return (
    <div>
      <h1 className="text-center mb-5">Dashboard</h1>
      <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
        <Row>
          <Col sm={3}>
            <ListGroup>
              <ListGroup.Item action as={NavLink} to="manage-password">
                Manage Password
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col sm={9}>
            <Tab.Content>
              <Outlet />
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default Dashboard;
