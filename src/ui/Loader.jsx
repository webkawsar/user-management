import React from "react";
import { HashLoader } from "react-spinners";

const Loader = ({ color='#36d7b7', loading=true, size=50, speed=1 }) => {
  return (
    <>
      <HashLoader
        color={color}
        loading={loading}
        size={size}
        speedMultiplier={speed}
      />
    </>
  );
};

export default Loader;
