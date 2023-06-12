import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useRegisterMutation } from "../features/auth/authAPI";

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
    password: yup
      .string()
      .trim()
      .required("Password is required")
      .matches(/[a-z0-9]{6}/, "Must contain letter and number"),
      confirmPassword: yup
      .string()
      .trim()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Confirm password don't match"),
  })
  .required();

const defaultValues = {
  firstName: "Kawsar",
  lastName: "Ahmed",
  email: "web.kawsarahmed@gmail.com",
  password: "123456",
  confirmPassword: "123456",
};

const Register = () => {
  const [registerUser, { data, isLoading, isSuccess, isError, error }] =
    useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    registerUser({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email, 
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
  };

  useEffect(() => {
    
    if (isError) {
      // show error message
      toast.error(error?.data?.message ?? "Something went wrong!");
    }

    if (isSuccess) {
      // show success msg
      toast.success(data?.message);
    }
  }, [isError, isSuccess]);

  const { firstName, lastName, email, password, confirmPassword } = defaultValues;
  return (
    <div>
      <h1 className="text-center mb-3">Register</h1>

      <Row>
        <Col sm="12" md="6" lg="6" xl={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm="12" md="6" lg="6">
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
              
              <Col sm="12" md="6" lg="6">
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
                placeholder="Enter email"
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

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Enter password"
                defaultValue={password}
                {...register("password")}
                isInvalid={!!errors.password}
              />
              {errors?.password?.message && (
                <Form.Control.Feedback type="invalid">
                  {errors?.password?.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Confirm password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Enter confirm password"
                defaultValue={confirmPassword}
                {...register("confirmPassword")}
                isInvalid={!!errors.confirmPassword}
              />

              {errors?.confirmPassword?.message && (
                <Form.Control.Feedback type="invalid">
                  {errors?.confirmPassword?.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isLoading}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
