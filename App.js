import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
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
import AiChatbot from "./screen/AiChatbot";
import { HeaderBackButton } from "@react-navigation/elements"; // 뒤로가기 버튼

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartPage">
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
        <Stack.Screen name="KakaoLogin" component={KakaoLogin} />
        <Stack.Screen name="MyPage" component={MyPage} />
        <Stack.Screen
          name="RecordPage"
          component={RecordPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecordDetailPage"
          component={RecordDetailPage}
          options={{
            title: "Record Detail",
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => navigation.goBack()}
                tintColor="#ffffff"
              />
            ),
            headerStyle: {
              backgroundColor: "#0D0F35",
            },
            headerTintColor: "#ffffff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AddRecordPage"
          component={AddRecordPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecordCreationPage"
          component={RecordCreationPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="QuizPage"
          component={QuizPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="GamePage" component={GamePage} />
        <Stack.Screen
          name="AiChatbot"
          component={AiChatbot}
          options={{ headerShown: false }}
        />
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
