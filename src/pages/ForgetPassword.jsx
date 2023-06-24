import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useForgetPasswordMutation } from "../features/auth/authAPI";


const schema = yup
  .object({
    email: yup.string().trim().required("Email is required").lowercase(),
  })
  .required();

const ForgetPassword = () => {
  const [forgetPassword, {data, isLoading, isSuccess, isError, error}] = useForgetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    forgetPassword(data);
  };

  useEffect(() => {

    if(isError) {
      toast.error(error?.data?.message ?? "Something went wrong!");
    }

    if(isSuccess) {
      toast.success("Email is sent with password reset link");
    }
    
  }, [isError, isSuccess])

  return (
    <div>
      <h2 className="text-center mb-3">Forget Password</h2>

      <Row>
        <Col sm="12" md="6" lg="6" xl={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>

              <Form.Control
                type="email"
                placeholder="Enter email"
                defaultValue=""
                {...register("email")}
                isInvalid={!!errors.email}
              />
              {errors?.email?.message && (
                <Form.Control.Feedback type="invalid">
                  {errors?.email?.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={isLoading}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ForgetPassword;
