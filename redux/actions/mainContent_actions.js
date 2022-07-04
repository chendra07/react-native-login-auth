import { Alert } from "react-native";
import { useSelector } from "react-redux";
import { mainContent_types } from "../action-types";
import Services from "../../services";

const { SET_MAIN_CONTENT } = mainContent_types;
const { Get, Delete, Post, Put } = Services;

const setMainContent = (payload) => {
  return {
    type: SET_MAIN_CONTENT,
    payload: payload,
  };
};

const getContent = (token, showLoading, dismissLoading) => (dispatch) => {
  if (token !== null) {
    showLoading && dispatch(showLoading());
    Get(
      "https://auth-tutorial-8cf1b-default-rtdb.firebaseio.com",
      "message.json?auth=" + token
    )
      .then((resp) => {
        dispatch(setMainContent(resp.data));
      })
      .catch((error) => {
        console.log("error: ", error);
      })
      .finally(() => {
        dismissLoading && dispatch(dismissLoading());
      });
  } else {
    Alert.alert("Authentication Failed", "Please Login First!");
  }
};

export { getContent };
