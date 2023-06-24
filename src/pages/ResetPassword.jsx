import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import {
  useResetPasswordMutation,
  useResetVerifyQuery,
} from "../features/auth/authAPI";

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
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [sendReq, setSendReq] = useState(true);
  const { isSuccess, isError, error } = useResetVerifyQuery(token, {
    skip: sendReq,
  });
  const [
    resetPassword,
    {
      data,
      isLoading,
      isSuccess: resetIsSuccess,
      isError: resetIsError,
      error: resetError,
    },
  ] = useResetPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    resetPassword({ ...data, token });
  };

  // token verify req send and handling
  useEffect(() => {
    setSendReq(false);
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message ?? "Something went wrong!");
    }

    if (isSuccess) {
      toast.success("Password reset verification success!");
    }
  }, [isError, isSuccess]);

  // password submit req handling
  useEffect(() => {
    if (resetIsError) {
      toast.error(resetError?.data?.message ?? "Something went wrong!");
    }

    if (resetIsSuccess) {
      toast.success(
        "Password reset successfully, please login with new password"
      );
      navigate('/login');
    }
  }, [resetIsError, resetIsSuccess]);

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

            <Button variant="primary" type="submit" disabled={isLoading}>
              Reset
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ResetPassword;
