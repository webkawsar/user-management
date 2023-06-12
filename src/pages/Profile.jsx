import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, ProgressBar, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import avatarImg from "../assets/avatar-img.jpg";
import {
  useCreateUserProfileMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "../features/profiles/profilesAPI";
import formatImageUrl from "../utils/formatImageUrl";

const schema = yup
  .object({
    firstName: yup.string().min(3, "First name at least 3 character"),
    lastName: yup.string().min(3, "Last name at least 3 character"),
    profilePicture: yup.mixed().required("Profile picture is required"),
  })
  .required();

const Profile = () => {
  // const { user, token } = useContext(AuthContext);

  const { isProfileLoaded, userProfile } = useSelector(
    (state) => state.profile
  );

  const [createUserProfile, { isLoading, isSuccess, isError, error }] =
    useCreateUserProfileMutation();
  const [
    updateUserProfile,
    {
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
      isError: updateIsError,
      error: updateError,
    },
  ] = useUpdateUserProfileMutation();
  const {
    data,
    isLoading: userProfileIsLoading,
    isSuccess: userProfileIsSuccess,
    isError: userProfileIsError,
    error: userProfileError,
  } = useGetUserProfileQuery();

  const [showUploadSection, setShowUploadSection] = useState(false);
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [disabledForm, setDisabledForm] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    console.log(isProfileLoaded, "isProfileLoaded");

    if (isProfileLoaded) {
      updateUserProfile({ id: userProfile?.id, data });
    } else {
      createUserProfile(data);
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.error?.message);
    }

    if (isSuccess) {
      // show flash message
      toast.success("Profile added successfully");
    }
  }, [isError, isSuccess]);

  useEffect(() => {
    if (updateIsError) {
      toast.error(updateError?.data?.error?.message);
    }

    if (updateIsSuccess) {
      // show flash message
      toast.success("Profile updated successfully");
    }
  }, [updateIsError, updateIsSuccess]);


  const { firstName, lastName } = userProfile || {
    firstName: "******",
    lastName: "******",
  };

  // decide what to render
  let content = null;
  if(userProfileIsLoading) {
    content = <div>Data is Loading</div>;
  }

  if(userProfileIsSuccess) {
    console.log(data, 'data')
  }


  return (
    <div>
      <Row>
        <Col xl="12">
          {
            <div className="d-flex flex-column justify-content-center">
              {percentage > 0 && (
                <ProgressBar
                  animated
                  now={percentage}
                  label={`${percentage}%`}
                />
              )}

              <p style={{ fontSize: "25px" }}>
                Personal Information{" "}
                <span
                  onClick={() => setDisabledForm(false)}
                  style={{
                    fontSize: "17px",
                    color: "#03A4E0",
                    marginLeft: "25px",
                    cursor: "pointer",
                  }}
                >
                  {" "}
                  {userProfile
                    ? "Change personal information"
                    : "Add personal information"}
                </span>
              </p>

              <img
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  display: "block",
                }}
                src={
                  formatImageUrl(userProfile?.profilePicture)
                    ? formatImageUrl(userProfile?.profilePicture)
                    : avatarImg
                }
                alt="Profile Avatar Image"
              />

              <Form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Form.Group
                  className="mb-3"
                  as={Col}
                  md={6}
                  controlId="firstName"
                >
                  <Form.Label>First name</Form.Label>

                  <Form.Control
                    type="text"
                    placeholder="First name"
                    {...register("firstName")}
                    defaultValue={firstName}
                    disabled={disabledForm ? true : false}
                  />

                  {errors?.firstName?.message && (
                    <Form.Text className="text-danger">
                      {errors?.firstName?.message}
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  as={Col}
                  md={6}
                  controlId="lastName"
                >
                  <Form.Label>Last name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Last name"
                    {...register("lastName")}
                    defaultValue={lastName}
                    disabled={disabledForm ? true : false}
                  />

                  {errors?.lastName?.message && (
                    <Form.Text className="text-danger">
                      {errors?.lastName?.message}
                    </Form.Text>
                  )}
                </Form.Group>

                {!disabledForm && (
                  <Form.Group
                    className="mb-3"
                    as={Col}
                    md={6}
                    controlId="profilePicture"
                  >
                    <Form.Label>Profile picture</Form.Label>

                    <Form.Control
                      type="file"
                      {...register("profilePicture")}
                      accept="image/*"
                    />

                    {errors?.profilePicture?.message && (
                      <Form.Text className="text-danger">
                        {errors?.profilePicture?.message}
                      </Form.Text>
                    )}
                  </Form.Group>
                )}

                {!disabledForm && (
                  <Button type="submit" disabled={isSubmitting ? true : false}>
                    Save
                  </Button>
                )}
              </Form>
            </div>
          }
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
