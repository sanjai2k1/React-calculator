import React from "react";
import { CalculatorContext } from "./Calculator";
import { useContext } from "react";

const InputDisplay = () => {
  const { click, outputdisplay } = useContext(CalculatorContext);
  const ans = click.join("");

  return (
    <div className="container-fluid h-50 bg-dark-subtle">
      <div className="d-flex h-50 justify-content-center align-items-center ">
        <span className="fs-1 fw-bolder">{ans} </span>
      </div>

      <div className="d-flex h-50 justify-content-center align-items-center ">
        <span className="fs-1 fw-semibold">{outputdisplay} </span>
      </div>
    </div>
  );
};

export default InputDisplay;
