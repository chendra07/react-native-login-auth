import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import IconButton from "./components/ui/IconButton";
import { auth_actions } from "./redux/actions";
import LoadingOverlay from "./components/ui/LoadingOverlay";

const Stack = createNativeStackNavigator();

let persistor = persistStore(store);

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const dispatch = useDispatch();
  const { logoutUser } = auth_actions;

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={() => dispatch(logoutUser())}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { token } = useSelector((state) => state.auth);
  const [isAuthenticated, setisAuthenticated] = useState(false);

  useEffect(() => {
    if (token == null) {
      setisAuthenticated(false);
    } else {
      setisAuthenticated(true);
    }
  }, [token]);

  return (
    <NavigationContainer>
      {isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<LoadingOverlay />} persistor={persistor}>
          <StatusBar style="light" />
        </PersistGate>
        <Navigation />
      </Provider>
    </>
  );
}
