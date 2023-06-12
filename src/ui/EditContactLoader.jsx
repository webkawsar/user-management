import React from "react";
import { Spinner } from "react-bootstrap";

const EditContactLoader = () => {
  return (
    <>
      <Spinner
        className="d-block mx-auto my-auto mt-3"
        animation="grow"
        size="xxl"
      />
    </>
  );
};

export default EditContactLoader;
