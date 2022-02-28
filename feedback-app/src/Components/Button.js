import React from "react";

const Button = ({ name, state_object }) => {
  return (
    <>
      <button onClick={state_object}>{name}</button>&nbsp;
    </>
  );
};

export default Button;
