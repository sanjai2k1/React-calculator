import React from "react";

import { useState } from "react";
import { useContext } from "react";
import { CalculatorContext } from "./Calculator";
import allbuttons from "./buttonData";
import Button from "./Button";

const numbers = allbuttons.filter((allbutton) => allbutton.type === "number");
const actions = allbuttons.filter((allbutton) => allbutton.type === "action");

const AllButtons = () => {
  const { clickHistory } = useContext(CalculatorContext);
  const [showHorB, setHorB] = useState(false);
  function handleClick(event) {
    setHorB(showHorB ? false : true);
  }
  return (
    <>
      <div className="d-flex flex-fill bg-secondary ">
        {showHorB ? (
          <div className="d-flex bg-dark-subtleflex-fill  justify-content-center align-items-start w-100">
            <div className="list-group mt-2">
              {clickHistory.map((his, index) => (
                <a
                  href="/"
                  key={index}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="list-group-item list-group-item-dark"
                >
                  {his}
                </a>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div className="d-flex flex-column flex-fill ">
              <div className="p-2 flex-fill">
                <Button props={numbers[1]} />
              </div>
              <div className="p-2 flex-fill">
                <Button props={numbers[4]} />
              </div>
              <div className="p-2 flex-fill">
                <Button props={numbers[7]} />
              </div>
              <div className="p-2 flex-fill">
                <Button props={actions[0]} />
              </div>
            </div>
            <div className="d-flex flex-column flex-fill">
              <div className="p-2 flex-fill">
                <Button props={numbers[2]} />
              </div>
              <div className="p-2 flex-fill">
                <Button props={numbers[5]} />
              </div>
              <div className="p-2 flex-fill">
                <Button props={numbers[8]} />
              </div>
              <div className="p-2 flex-fill">
                <Button props={actions[6]} />
              </div>
            </div>
            <div className="d-flex flex-column flex-fill  ">
              <div className="p-2 flex-fill">
                <Button props={numbers[3]} />
              </div>
              <div className="p-2 flex-fill">
                <Button props={numbers[6]} />
              </div>
              <div className="p-2 flex-fill">
                <Button props={numbers[9]} />
              </div>
              <div className="p-2 flex-fill">
                <Button props={actions[5]} />
              </div>
            </div>
            <div className="d-flex flex-column flex-fill  ">
              <div className="p-2 flex-fill">
                <Button props={actions[0]} />
              </div>
              <div className="p-2 flex-fill">
                <Button props={actions[1]} />
              </div>
              <div className="p-2 flex-fill">
                <Button props={actions[2]} />
              </div>
              <div className="p-2 flex-fill">
                <Button props={actions[3]} />
              </div>
            </div>{" "}
          </>
        )}

        <div className="d-flex flex-column flex-fill flex-shrink-1 ">
          <div className="p-2 flex-fill">
            <button
              name="history"
              onClick={handleClick}
              value="history"
              className="w-100 h-100 btn btn-warning"
            >
              History
            </button>
          </div>
          <div className="p-2 flex-fill">
            <Button props={actions[6]} />
          </div>
          <div className="p-2 flex-fill">
            <Button props={actions[7]} />
          </div>
          <div className="p-2 flex-fill">
            <Button props={actions[8]} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllButtons;
