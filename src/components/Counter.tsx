import { useReducer, ChangeEvent } from "react";

const initState = { counter: 0, text: "" };
const enum REDUCER_ACTION_TYPE {
  INCREMENT,
  DECREMENT,
  NEW_INPUT,
}
type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: string;
};
const reducer = (
  state: typeof initState,
  action: ReducerAction
): typeof initState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.INCREMENT:
      return { ...state, counter: state.counter + 1 };
    case REDUCER_ACTION_TYPE.DECREMENT:
      return { ...state, counter: state.counter - 1 };
    case REDUCER_ACTION_TYPE.NEW_INPUT:
      return { ...state, text: action.payload ?? "" };
    default:
      throw new Error();
  }
};
export default function Counter() {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <>
      <div className="counter-grid">
        <button
          onClick={() => dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT })}
        >
          {" "}
          Dec
        </button>
        <div>
          <span>{state.counter}</span>
        </div>
        <button
          onClick={() => dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT })}
        >
          {" "}
          Inc
        </button>
      </div>
      <div className="input-box">
        <input
          type="text"
          className="text-input"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            dispatch({
              type: REDUCER_ACTION_TYPE.NEW_INPUT,
              payload: e.target.value,
            });
          }}
        ></input>
        <h3>{state.text}</h3>
      </div>
    </>
  );
}
