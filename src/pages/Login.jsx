import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useLoginMutation } from "../features/auth/authAPI";

const defaultValues = {
  email: "web.kawsarahmed@gmail.com",
  password: "123456",
};

const schema = yup
  .object({
    email: yup.string().trim().required("Email is required").lowercase(),
    password: yup.string().trim().required("Password is required"),
  })
  .required();

const Login = () => {
  const [login, {data, isLoading, isSuccess, isError, error}] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = (data) => {
    login({
      email: data.email,
      password: data.password,
    });
  };

  useEffect(() => {

    if(isError) {
      // show error message
      toast.error(error?.data?.message ?? 'Something went wrong!');
    }

    if(isSuccess) {
      // show success message
      toast.success("Login successful");

      // redirect the user
      navigate(location?.state?.from ? location?.state?.from : "/contacts");
    }

  }, [isError, isSuccess])

  const { email, password } = defaultValues;
  return (
    <div>
      <h2 className="text-center mb-3">Login</h2>

      <Row>
        <Col sm="12" md="6" lg="6" xl={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
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

            {/* <Form.Group className="mb-3" controlId="check">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group> */}

            <Button
              variant="primary"
              type="submit"
              disabled={isLoading}
            >
              Log In
            </Button>
            <p className="mt-3">
              Forgot password ? <Link to="/forgot-password">click here</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
