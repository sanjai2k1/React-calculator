import React, { useReducer } from "react";

import InputDisplay from "./InputDisplay";

import { createContext } from "react";

import Mexp from "math-expression-evaluator";
import AllButtons from "./AllButtons";

const Context = createContext("Calculator");
const Actions = ["+", "-", "*", "/", "AC", "Del", "+/-", "=", "."];
const Calculator = () => {
  const clicked = [];

  const patterns = [];
  const output = clicked.join("");
  const histroys = [];

  const outpuTreducer = (state, action) => {
    switch (action.type) {
      case "OUTPUT": {
        if (action.id.value === "") {
          state = "";
          return state;
        }
        try {
          const mexp = new Mexp();
          var lexed = mexp.lex(action.id.value);
          var postfixed = mexp.toPostfix(lexed);
          var result = mexp.postfixEval(postfixed);
          state = String(result);
        } catch (e) {
          try {
            state = parseInt(state);
          } catch (e) {
            state = "ERROR";
          }
        }

        return state;
      }
      case "ALLCLEAR": {
        state = "";
        return state;
      }
      case "PUSH": {
        state = [...state, action.id.value.join("=")];
        return state;
      }
      default: {
        return state;
      }
    }
  };

  const [outputdisplay, dispatchOutputDisplay] = useReducer(
    outpuTreducer,
    output
  );
  const [clickHistory, dispatchClickhistory] = useReducer(
    outpuTreducer,
    histroys
  );

  const reducer = (state, action) => {
    switch (action.type) {
      case "CLICKED": {
        if (action.id.name === "NUMBER") {
          state = [...state, action.id.value];

          let temp = -1;

          for (let i = state.length - 1; i >= 0; i--) {
            if (Actions.includes(state[i]) || state[i].includes(")")) {
              temp = i;
              break;
            }
          }

          if (temp === -1) {
            state = [state.join("")];
          } else {
            const ans = state.slice(temp + 1, state.length).join("");
            if (ans.length > 0) {
              state = [...state.slice(0, temp), state[temp], ans];
            } else {
              state = [...state];
            }
          }
        } else if (action.id.name === "OPERATOR") {
          state = [...state, action.id.value];
        } else if (action.id.name === "PLUSORMINUS") {
          if (action.id.value !== "operator") {
            let newpop = state.pop();

            if (newpop.includes(")")) {
              if (newpop.includes(".")) {
                let findminus = newpop.indexOf("-");
                let findlast = newpop.indexOf(")");
                newpop = newpop.slice(findminus + 1, findlast);
              } else {
                let findminus = newpop.indexOf("-");
                let findlast = newpop.indexOf(")");
                newpop = newpop.slice(findminus + 1, findlast);
              }
            } else {
              if (state[state.length - 1] === ".") {
                let dot = state.pop();
                let before = state.pop();
                newpop = "(-" + before + dot + newpop + ")";
              } else {
                newpop = "(-" + newpop + ")";
              }
            }

            state = [...state, newpop];
          }
        }

        const dis = async () => {
          await dispatchOutputDisplay({
            type: "OUTPUT",
            id: {
              name: "CLICKS",
              value: state.join(""),
            },
          });
        };
        dis();

        return state;
      }
      case "NUMBER": {
        state = [...state, "number"];
        return state;
      }
      case "OPERATOR": {
        state = [...state, "operator"];
        return state;
      }
      case "CHANGEOPERATOR": {
        if (state.length > 0) {
          state.pop();
          state = [...state, action.id.value];
        }
        return state;
      }
      case "ALLCLEAR": {
        state = [];

        return state;
      }
      case "DELETEPATTERN": {
        state.pop();
        return state;
      }
      case "ALLCLEARPATTERN": {
        state = [];
        dispatchOutputDisplay({
          type: "ALLCLEAR",
        });
        return state;
      }
      case "DELETE": {
        if (state.length > 0) {
          let newpop = state.pop();

          if (newpop.includes(")")) {
            state = [...state];
            return state;
          }
          if (newpop.length === 1) {
            state = [...state];
          } else {
            state = [...state, newpop.slice(0, newpop.length - 1)];
          }
        }

        const dis = async () => {
          await dispatchOutputDisplay({
            type: "OUTPUT",
            id: {
              name: "CLICKS",
              value: state.join(""),
            },
          });
        };
        dis();
        return state;
      }
      case "OUTPUTCHANGE": {
        const dis = async () => {
          await dispatchClickhistory({
            type: "PUSH",
            id: {
              value: [state.join(""), String(action.id.value)],
            },
          });

          await dispatchOutputDisplay({
            type: "ALLCLEAR",
          });
        };
        dis();
        state = [String(action.id.value)];

        return state;
      }

      default: {
        return state;
      }
    }
  };

  const [click, dispatchClick] = useReducer(reducer, clicked);
  const [clickpattern, dispatchPattern] = useReducer(reducer, patterns);

  return (
    <Context.Provider
      value={{
        click,
        dispatchClick,
        clickpattern,
        dispatchPattern,
        outputdisplay,
        dispatchOutputDisplay,
        clickHistory,
      }}
    >
      <div className="d-flex flex-column vh-100">
        <InputDisplay />

        <AllButtons />
      </div>
    </Context.Provider>
  );
};

export const CalculatorContext = Context;
export default Calculator;
