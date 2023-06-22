import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import successImg from "../assets/success.png";
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
    }
    
  }, [isError, isSuccess]);

  const container = {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    overflow: "hidden"
  };

  const greenBtn = {
    border: "none",
    outline: "none",
    padding: "12px 0",
    backgroundColor: "#3bb19b",
    borderRadius: "20px",
    width: "180px",
    fontWeight: "bold",
    fontSize: "14px",
    cursor: "pointer",
  };

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

  if(isError) {
    content = (
      <div style={{display: 'flex', justifyContent: 'center', marginTop: '100px'}}>
        <h1>{ error?.data?.message ?? "Something went wrong!" }</h1>
      </div>
    )
  }

  if (isSuccess) {
    content = (
      <div style={container}>
        <img src={successImg} alt="success_img" />
        <h1>{data?.message}</h1>
        <Link to="/login">
          <button style={greenBtn}>Login</button>
        </Link>
      </div>
    );
  }

  return <div>{content}</div>;
};

export default AccountVerify;
