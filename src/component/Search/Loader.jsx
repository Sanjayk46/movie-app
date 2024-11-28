import React from "react";
import styled from "styled-components";

const Loader = () => {
  return <Spinner />;
};

export default Loader;

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-left-color: #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 20vh auto;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
