import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import {
  mainContent_actions,
  auth_actions,
  loading_actions,
} from "../redux/actions";

function WelcomeScreen() {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.main);
  const { token } = useSelector((state) => state.auth);
  const { getContent } = mainContent_actions;
  const { showLoading, dismissLoading } = loading_actions;

  useEffect(() => {
    dispatch(getContent(token, showLoading, dismissLoading));
    // console.log("token (welcome): ", token);
  }, []);

  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{`Message Fetched: ${
        message == null ? "undefined" : message
      }`}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
