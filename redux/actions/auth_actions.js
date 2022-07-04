import { auth_types } from "../action-types";
import Services from "../../services";
import { Alert } from "react-native";

const { SET_AUTH_DATA } = auth_types;
const { Get, Delete, Post, Put } = Services;

const setAuthData = (payload) => {
  return {
    type: SET_AUTH_DATA,
    payload: payload,
  };
};

const API_KEY = "AIzaSyBoeJgWKeHWSn2-4IrbV74TbeqeCYZlghs";

const postCreateUser =
  (email, password, showLoading, dismissLoading) => (dispatch) => {
    showLoading && dispatch(showLoading());
    Post(
      "https://identitytoolkit.googleapis.com",
      "v1/accounts:signUp?key=" + API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    )
      .then((resp) => {
        console.log("data: ", resp);
      })
      .catch((error) => {
        let responseMessage = error.response.data.error.message;
        let alertMessage = "";

        if (responseMessage == "EMAIL_EXISTS") {
          alertMessage =
            "This email already exist, please go to signIn page to login.";
        } else if (responseMessage == "TOO_MANY_ATTEMPTS_TRY_LATER") {
          alertMessage =
            "We have blocked all requests from this device due to unusual activity. Please Try again later.";
        } else {
          alertMessage = "Undefined Error, Please contact the Developer";
        }
        Alert.alert(
          "Authentication Failed",
          `Could not create user. \n\n${alertMessage}`
        );
      })
      .finally(() => {
        dismissLoading && dispatch(dismissLoading());
      });
  };

const postLoginUser =
  (email, password, showLoading, dismissLoading) => (dispatch) => {
    showLoading && dispatch(showLoading());
    Post(
      "https://identitytoolkit.googleapis.com",
      "v1/accounts:signInWithPassword?key=" + API_KEY,
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    )
      .then((resp) => {
        console.log("data: ", resp.data.idToken);
        console.log("data: ", resp.data);
        dispatch(setAuthData(resp.data.idToken));
        // resolve(data);
      })
      .catch((error) => {
        // console.log("errorsss: ", error.response.data.error.message);

        let responseMessage = error.response.data.error.message;
        let alertMessage = "";

        if (
          responseMessage == "EMAIL_NOT_FOUND" ||
          responseMessage == "INVALID_PASSWORD"
        ) {
          alertMessage = "Please check your email address and password again.";
        } else if (responseMessage == "USER_DISABLED") {
          alertMessage =
            "This email is disabled by administrator, please contact our customer services.";
        } else {
          alertMessage = "Undefined Error, Please contact the Developer";
        }
        Alert.alert(
          "Authentication Failed",
          `Could not log you in. \n\n${alertMessage}`
        );
      })
      .finally(() => {
        dismissLoading && dispatch(dismissLoading());
      });
  };

const logoutUser = () => (dispatch) => {
  console.log("logout");
  dispatch(setAuthData(null));
};

export { postCreateUser, postLoginUser, logoutUser };
