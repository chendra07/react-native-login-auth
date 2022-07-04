import { useDispatch, useSelector } from "react-redux";

import AuthContent from "../components/Auth/AuthContent";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { auth_actions, loading_actions } from "../redux/actions";

function SignupScreen() {
  const dispatch = useDispatch();
  const { postCreateUser } = auth_actions;
  const { showLoading, dismissLoading } = loading_actions;

  const { loading } = useSelector((state) => state.loading);

  async function signupHandler({ email, password }) {
    await dispatch(
      postCreateUser(email, password, showLoading, dismissLoading)
    );
  }

  if (loading == true) {
    return <LoadingOverlay message="Creating User....." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
