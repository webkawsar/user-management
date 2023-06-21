import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useVerifyQuery } from "../features/auth/authAPI";
import Loader from "../ui/Loader";

const AccountVerify = () => {
  const { search } = useLocation();
  const [token, setToken] = useState("");
  const [isLoaded, setIsLoaded] = useState(true);
  const { data, isLoading, isSuccess, isError, error } = useVerifyQuery(token, {
    skip: isLoaded,
  });
  const navigate = useNavigate();

  useEffect(() => {

    const token = search.split("=")[1];
    setToken(token);
    setIsLoaded(false);
    
  }, [search]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message ?? "Something went wrong!");
    }

    if (isSuccess) {
      toast.success(data?.message ?? "Account verification Successful!");

      // redirect
      navigate('/login');
    }
  }, [isError, isSuccess]);

  // decide what to render
  let content = null;
  if (isLoading) {
    content = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Loader size={150} speed={2} />
      </div>
    );
  }

  if(isSuccess) {
    content = <div>
      <h1>Account Verified</h1>
    </div>
  }

  return <div>{content}</div>;
};

export default AccountVerify;
