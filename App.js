import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import StartPage from "./screen/StartPage";
import MainPage from "./screen/MainPage";
import TestPage from "./screen/TestPage";
import TestResultPage from "./screen/TestResultPage";
import KakaoLogin from "./screen/KakaoLogin";
import MyPage from "./screen/MyPage";
import RecordPage from "./screen/RecordPage";
import AddRecordPage from "./screen/AddRecordPage";
import RecordCreationPage from "./screen/RecordCreationPage";
import QuizPage from "./screen/QuizPage";
import GamePage from "./screen/GamePage";
import RecordDetailPage from "./screen/RecordDetailPage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="KakaoLogin">
        <Stack.Screen name="KakaoLogin" component={KakaoLogin} options={{ headerShown: false }} />
        <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} />
        <Stack.Screen name="TestPage" component={TestPage} options={{ headerShown: false }} />
        <Stack.Screen name="TestResultPage" component={TestResultPage} options={{ headerShown: false }} />
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen name="RecordPage" component={RecordPage} options={{ headerShown: false }} />
        <Stack.Screen name="RecordDetailPage" component={RecordDetailPage} options={{ title: 'Record Detail' }} />
        <Stack.Screen name="AddRecordPage" component={AddRecordPage} options={{ headerShown: false }} />
        <Stack.Screen name="RecordCreationPage" component={RecordCreationPage} options={{ headerShown: false }} />
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
