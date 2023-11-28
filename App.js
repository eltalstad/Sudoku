import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import PlayScreen from "./screens/PlayScreen";
import CreateBoardScreen from "./screens/CreateBoardScreen";
import InstructionsScreen from "./screens/InstructionsScreen";
import { initializePuzzles } from "./AsyncStorageFunctions";
import "./i18n";
import { useTranslation } from "react-i18next";

const Stack = createStackNavigator();

const App = () => {
  const { t } = useTranslation();

  React.useEffect(() => {
    initializePuzzles(); // Initialize puzzles when the app starts
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: t("homeTitle") }}
        />
        <Stack.Screen
          name="Play"
          component={PlayScreen}
          options={{ title: t("playTitle") }}
        />
        <Stack.Screen
          name="CreateBoard"
          component={CreateBoardScreen}
          options={{ title: t("createTitle") }}
        />
        <Stack.Screen
          name="Instructions"
          component={InstructionsScreen}
          options={{ title: t("instructionsTitle") }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
