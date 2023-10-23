import { useReducer } from "react";

const initialState = {
  leftOperand: "",
  currentInput: "",
  result: 0,
  operator: "",
  calculation: "",
};
const enum REDUCER_ACTION_TYPE {
  OPERATOR,
  EQUALTO,
  DIGIT,
  DEL,
  AC,
}
type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: string;
};
const reducer = (
  state: typeof initialState,
  action: ReducerAction
): typeof initialState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.OPERATOR:
      if (state.leftOperand === "") {
        return {
          ...state,
          leftOperand: state.currentInput,
          currentInput: "",
          operator: action.payload ?? "",
        };
      }
      return state;
    case REDUCER_ACTION_TYPE.EQUALTO:
      if (
        state.operator !== "" &&
        state.leftOperand !== "" &&
        state.currentInput !== ""
      ) {
        var result = 0;
        var leftOperand = parseFloat(state.leftOperand);
        var rightOperand = parseFloat(state.currentInput);
        if (state.operator === "+") {
          result = leftOperand + rightOperand;
        } else if (state.operator === "*") {
          result = leftOperand * rightOperand;
        } else if (state.operator === "-") {
          result = leftOperand - rightOperand;
        } else if (state.operator === "÷") {
          result = leftOperand / rightOperand;
        }
        return {
          ...state,
          result,
          calculation:
            state.leftOperand + " " + state.operator + " " + state.currentInput,
          currentInput: "",
          operator: "",
          leftOperand: "",
        };
      }
      return state;
    case REDUCER_ACTION_TYPE.DIGIT:
      if (action.payload == "." && state.currentInput.includes(".")) {
        return state;
      }
      if (state.currentInput == "0" && action.payload == "0") {
        return state;
      }
      return {
        ...state,
        currentInput: state.currentInput + action.payload,
        calculation: "",
        result: 0,
      };
    case REDUCER_ACTION_TYPE.DEL:
      if (state.currentInput !== "") {
        var edited = state.currentInput.substring(
          0,
          state.currentInput.length - 1
        );
        return { ...state, currentInput: edited };
      }
      return state;

    case REDUCER_ACTION_TYPE.AC:
      if (state.result > 0) {
        return {
          ...state,
          currentInput: "",
          leftOperand: "",
          result: 0,
          operator: "",
        };
      }
      if (state.currentInput !== "") {
        return { ...state, currentInput: "" };
      }
      if (state.operator !== "") {
        return { ...state, operator: "" };
      }
      if (state.leftOperand !== "") {
        return { ...state, leftOperand: "" };
      }
      if (state.calculation !== "") {
        return { ...state, calculation: "" };
      }
      return state;
    default:
      throw new Error();
  }
};
export default function Calculator() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addDigit = (digit: string) => {
    dispatch({ type: REDUCER_ACTION_TYPE.DIGIT, payload: digit });
  };
  const addOperator = (operator: string) => {
    dispatch({ type: REDUCER_ACTION_TYPE.OPERATOR, payload: operator });
  };
  return (
    <div className="calculator-container">
      <div className="buttons-grid">
        <div className="display-box">
          <div className="left-operand">
            {state.leftOperand !== "" ? state.leftOperand : state.calculation}
            {state.operator}
          </div>
          <div className="right-operand">
            {state.result > 0
              ? state.result
              : state.currentInput == ""
              ? "0"
              : state.currentInput}
          </div>
        </div>
        <button
          onClick={() => dispatch({ type: REDUCER_ACTION_TYPE.AC })}
          className="grid-span-2"
        >
          AC
        </button>
        <button onClick={() => dispatch({ type: REDUCER_ACTION_TYPE.DEL })}>
          DEL
        </button>
        <button onClick={() => addOperator("÷")}>÷</button>
        <button onClick={() => addDigit("1")}>1</button>
        <button onClick={() => addDigit("2")}>2</button>
        <button onClick={() => addDigit("3")}>3</button>
        <button onClick={() => addOperator("*")}>*</button>
        <button onClick={() => addDigit("4")}>4</button>
        <button onClick={() => addDigit("5")}>5</button>
        <button onClick={() => addDigit("6")}>6</button>
        <button onClick={() => addOperator("+")}>+</button>
        <button onClick={() => addDigit("7")}>7</button>
        <button onClick={() => addDigit("8")}>8</button>
        <button onClick={() => addDigit("9")}>9</button>
        <button onClick={() => addOperator("-")}>-</button>
        <button onClick={() => addDigit(".")}>.</button>
        <button onClick={() => addDigit("0")}>0</button>
        <button
          onClick={() => dispatch({ type: REDUCER_ACTION_TYPE.EQUALTO })}
          className="grid-span-2"
        >
          =
        </button>
      </div>
    </div>
  );
}
