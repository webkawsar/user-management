import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useUpdateUserMutation } from "../../features/users/usersAPI";

const schema = yup
  .object({
    firstName: yup
      .string()
      .trim()
      .required("First name is required")
      .min(2, "First name must be at least 2 character"),
    lastName: yup
      .string()
      .trim()
      .required("Last name is required")
      .min(2, "Last name must be at least 2 character"),
      email: yup
      .string()
      .trim()
      .email("Must be a valid email")
      .required("Email is required")
      .lowercase(),
    role: yup.string().trim().oneOf(["Admin", "Support", "User"]),
  })
  .required();

const EditUserForm = ({ user }) => {
  const [updateUser, { data, isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    updateUser({ id: user?.id, data });
  };

  useEffect(() => {
    if (isError) {
      // show error message
      toast.error(error?.data?.message ?? "Something went wrong!");
    }

    if (isSuccess) {
      // show success msg
      toast.success("User updated successfully");

      navigate("/users");
    }
  }, [isError, isSuccess]);

  const { id, firstName, lastName, email, role } = user;

  return (
    <div>
      <Row>
        <Col sm="12" md="6" lg="6" xl={{ span: 8, offset: 2 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label>First name</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Enter your first name"
                    defaultValue={firstName}
                    {...register("firstName")}
                    isInvalid={!!errors.firstName}
                  />
                  {errors?.firstName?.message && (
                    <Form.Control.Feedback type="invalid">
                      {errors?.firstName?.message}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label>Last name</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="Enter your last name"
                    defaultValue={lastName}
                    {...register("lastName")}
                    isInvalid={!!errors.lastName}
                  />
                  {errors?.lastName?.message && (
                    <Form.Control.Feedback type="invalid">
                      {errors?.lastName?.message}
                    </Form.Control.Feedback>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                placeholder="Enter your email"
                defaultValue={email}
                {...register("email")}
                isInvalid={!!errors.email}
              />
              {errors?.email?.message && (
                <Form.Control.Feedback type="invalid">
                  {errors?.email?.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            {loggedInUser?.role === "Admin" && loggedInUser?.id !== id && (
              <Form.Group
                className="mb-3"
                as={Col}
                sm="12"
                md="12"
                lg="12"
                controlId="role"
              >
                <Form.Label>Role</Form.Label>

                <Form.Select
                  {...register("role")}
                  defaultValue={role}
                  isInvalid={errors?.role?.message}
                >
                  <option value="" disabled>
                    Select role
                  </option>
                  <option value="Admin">Admin</option>
                  <option value="Support">Support</option>
                  <option value="User">User</option>
                </Form.Select>

                <Form.Control.Feedback type="invalid">
                  {errors?.role?.message}
                </Form.Control.Feedback>
              </Form.Group>
            )}

            <Button variant="primary" type="submit" disabled={isLoading}>
              Update User
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default EditUserForm;
