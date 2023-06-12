import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useAddContactMutation } from "../../features/contacts/contactsAPI";

const schema = yup
  .object({
    firstName: yup
      .string()
      .required("First name is required")
      .min(3, "First name at least 3 character"),
    lastName: yup
      .string()
      .required("Last name is required")
      .min(3, "Last name at least 3 character"),
    email: yup
      .string()
      .required("Email is required")
      .email("Must be a valid email"),
    profession: yup
      .string()
      .required("Profession is required")
      .oneOf(["designer", "developer", "marketer"]),
    bio: yup
      .string()
      .required("BIO is required")
      .min(10, "Write your BIO at least 10 character")
      .max(100, "BIO must be less than 100 character"),
    gender: yup.mixed().oneOf(["male", "female"]),
    image: yup.mixed().test("required", "Image is required", (value) => {
      return value && value.length;
    }),
  })
  .required();

const defaultValue = {
  firstName: "Kawsar",
  lastName: "Ahmed",
  email: "web.kawsarahmed@gmail.com",
  profession: "developer",
  bio: "Hi, This is Kawsar Ahmed",
  gender: "male",
  dob: new Date(),
};

const AddContactForm = () => {
  const [addContact, { data, isLoading, isSuccess, isError, error }] =
    useAddContactMutation();
  const [birthDate, setBirthDate] = useState(new Date());
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    addContact(data);
  };

  useEffect(() => {
    setValue("dob", birthDate);
  }, [birthDate]);

  useEffect(() => {
    
    if (isError) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      // show flash message
      toast.success("Contact added successfully");

      // redirect to the user
      navigate("/contacts");
    }
  }, [isError, isSuccess]);

  const { firstName, lastName, email, profession, image, bio, gender, dob } =
    defaultValue;
  return (
    <div>
      <h2 className="text-center">Add Contact</h2>

      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Row>
          <Form.Group className="mb-3" as={Col} md={6} controlId="firstName">
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your first name"
              {...register("firstName")}
              defaultValue={firstName}
              isInvalid={errors?.firstName?.message}
            />

            <Form.Control.Feedback type="invalid">
              {errors?.firstName?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" as={Col} md={6} controlId="lastName">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last name"
              {...register("lastName")}
              defaultValue={lastName}
              isInvalid={errors?.lastName?.message}
            />

            <Form.Control.Feedback type="invalid">
              {errors?.lastName?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" as={Col} md={6} controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email address"
              {...register("email")}
              defaultValue={email}
              isInvalid={errors?.email?.message}
            />

            <Form.Control.Feedback type="invalid">
              {errors?.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" as={Col} md={6} controlId="profession">
            <Form.Label>Profession</Form.Label>

            <Form.Select
              {...register("profession")}
              defaultValue={profession}
              isInvalid={errors?.profession?.message}
            >
              <option value="">Select your profession</option>
              <option value="designer">Designer</option>
              <option value="developer">Developer</option>
              <option value="marketer">Marketer</option>
            </Form.Select>

            <Form.Control.Feedback type="invalid">
              {errors?.profession?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" as={Col} md={6} controlId="Image">
            <Form.Label>Image</Form.Label>

            <Form.Control
              type="file"
              {...register("image")}
              accept="image/*"
              required
              isInvalid={errors?.image?.message}
            />

            <Form.Control.Feedback type="invalid">
              {errors?.image?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" as={Col} md={6} controlId="dob">
            <Form.Label>Date of Birth</Form.Label>
            <ReactDatePicker
              className="form-control"
              selected={birthDate}
              onChange={(date) => setBirthDate(date)}
              maxDate={new Date()}
              showYearDropdown
            />
          </Form.Group>

          <Form.Group className="mb-3" as={Col} md={6} controlId="bio">
            <Form.Label>BIO</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write your bio"
              {...register("bio")}
              defaultValue={bio}
              isInvalid={errors?.bio?.message}
            />

            <Form.Control.Feedback type="invalid">
              {errors?.bio?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" as={Col} md={6} controlId="gender">
            <Form.Label className="d-block mb-3">Gender</Form.Label>
            <Form.Check
              type="radio"
              label="Male"
              id="male"
              value="male"
              {...register("gender")}
              defaultChecked={gender === "male"}
              isInvalid={errors?.gender?.message}
            />
            <Form.Check
              type="radio"
              label="Female"
              id="female"
              value="female"
              {...register("gender")}
              defaultChecked={gender === "female"}
              isInvalid={errors?.gender?.message}
            />

            <Form.Control.Feedback type="invalid">
              {errors?.gender?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit" disabled={isLoading}>
          Add Contact
        </Button>
      </Form>
    </div>
  );
};

export default AddContactForm;
