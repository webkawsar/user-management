import { yupResolver } from "@hookform/resolvers/yup";
import React, { useContext } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import { AuthContext } from "../context/Auth.context";

const schema = yup
  .object({
    currentPassword: yup
      .string()
      .trim()
      .required("Current password is required"),
    newPassword: yup
      .string()
      .trim()
      .required("New password is required")
      .matches(/[a-z0-9]{6}/, "Must contain letter and number"),
    confirmPassword: yup
      .string()
      .trim()
      .required("Confirm new password is required")
      .oneOf([yup.ref("newPassword")], "Confirm new password don't match"),
  })
  .required();

const ManagePassword = (props) => {
  const { changePassword } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const onSubmit = async (data) => {
    changePassword(data);
  };

  return (
    <div>
      <Row>
        <Col sm="12" md="12" lg="12" xl={{ span: 8, offset: 2 }}>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className="mb-3" controlId="currentPassword">
              <Form.Label>Current password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Enter current password"
                defaultValue=""
                {...register("currentPassword")}
                isInvalid={!!errors.currentPassword}
              />
              {errors?.currentPassword?.message && (
                <Form.Control.Feedback type="invalid">
                  {errors?.currentPassword?.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>New password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Enter new password"
                defaultValue=""
                {...register("newPassword")}
                isInvalid={!!errors.newPassword}
              />
              {errors?.newPassword?.message && (
                <Form.Control.Feedback type="invalid">
                  {errors?.newPassword?.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm new password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Enter confirm new password"
                defaultValue=""
                {...register("confirmPassword")}
                isInvalid={!!errors.confirmPassword}
              />
              {errors?.confirmPassword?.message && (
                <Form.Control.Feedback type="invalid">
                  {errors?.confirmPassword?.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting ? true : false}
            >
              Change Password
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ManagePassword;
