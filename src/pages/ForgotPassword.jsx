import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import { axiosInstance } from "../config/axios";

const schema = yup
  .object({
    email: yup.string().trim().required("Email is required").lowercase(),
  })
  .required();

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/forgot-password", {
        email: data.email,
      });

      toast.success("Email is sent successfully with password reset link");
    } catch (error) {
      console.log(error.response.data.error, "ForgotPassword error");
      toast.error("Error in sending Email");
    }
  };

  return (
    <div>
      <h2 className="text-center mb-3">Forgot Password</h2>

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
              disabled={isSubmitting ? true : false}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ForgotPassword;
