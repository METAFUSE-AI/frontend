import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import StartPage from "./screen/StartPage";
import MainPage from "./screen/MainPage";
import TestPage from "./screen/TestPage";
import TestResultPage from "./screen/TestResultPage";
import MyPage from "./screen/MyPage";
import RecordPage from "./screen/RecordPage";
import AddRecordPage from "./screen/AddRecordPage";
import QuizPage from "./screen/QuizPage";
import GamePage from "./screen/GamePage";
import { HeaderBackButton } from "@react-navigation/elements"; //navi 뒤로가기 버튼

const Stack = createNativeStackNavigator();

export default function App() {
  //npm install @react-navigation/native
  //npm install @react-navigation/native-stack

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartPage">
        {/* <Stack.Screen name="StartPage" component={StartPage} /> */}
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TestPage"
          component={TestPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TestResultPage"
          component={TestResultPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen
          name="RecordPage"
          component={RecordPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddRecordPage"
          component={AddRecordPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="QuizPage" component={QuizPage} />
        <Stack.Screen name="GamePage" component={GamePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
