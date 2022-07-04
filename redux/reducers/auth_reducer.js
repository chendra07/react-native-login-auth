import { auth_types } from "../action-types";

const { SET_AUTH_DATA } = auth_types;

const initialState = {
  token: null,
  errorMessage: null,
};

export const auth_reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_AUTH_DATA:
      return { ...state, token: payload };
    default:
      return state;
  }
};
