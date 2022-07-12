import { useDispatch, useSelector } from "react-redux";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { auth_actions, loading_actions } from "../redux/actions";
import { API_KEY } from "@env";

function LoginScreen() {
  const dispatch = useDispatch();
  const { postLoginUser } = auth_actions;
  const { showLoading, dismissLoading } = loading_actions;

  const { loading } = useSelector((state) => state.loading);
  const { token } = useSelector((state) => state.auth);

  console.log("API: ", API_KEY);

  async function signInHandler({ email, password }) {
    await dispatch(postLoginUser(email, password, showLoading, dismissLoading));
  }

  if (loading == true) {
    return <LoadingOverlay message="Login on Process, Please wait..." />;
  }

  return <AuthContent isLogin onAuthenticate={signInHandler} />;
}

export default LoginScreen;
