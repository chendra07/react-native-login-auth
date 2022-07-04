import { mainContent_types } from "../action-types";

const { SET_MAIN_CONTENT } = mainContent_types;

const initialState = {
  message: null,
};

export const mainContent_reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_MAIN_CONTENT:
      return { ...state, message: payload };
    default:
      return state;
  }
};
