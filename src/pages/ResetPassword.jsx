import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { axiosInstance } from "../config/axios";

const schema = yup
  .object({
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

const ResetPassword = () => {
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
    try {
      const response = await axiosInstance.post("/auth/reset-password", {
        code,
        password: data.password,
        passwordConfirmation: data.confirmPassword,
      });

      toast.success(
        "Password reset successfully, please login with new password"
      );

      navigate("/login");
    } catch (error) {
      console.log(error.response);
      toast.error("Issue in resetting password please try again!");
    }
  };

  return (
    <div>
      <h2 className="text-center mb-3">Reset Password</h2>

      <Row>
        <Col sm="12" md="6" lg="6" xl={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>

              <Form.Control
                type="password"
                placeholder="Enter password"
                defaultValue=""
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
              Reset
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ResetPassword;
