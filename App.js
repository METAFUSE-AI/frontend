// App.js
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import StartPage from "./screen/StartPage";
import MainPage from "./screen/MainPage";
import TestPage from "./screen/TestPage";
import TestResultPage from "./screen/TestResultPage";
import MyPage from "./screen/MyPage";
import RecordPage from "./screen/RecordPage";
import AddRecordPage from "./screen/AddRecordPage";
import RecordCreationPage from "./screen/RecordCreationPage";
import QuizPage from "./screen/QuizPage";
import GamePage from "./screen/GamePage";
import RecordDetailPage from "./screen/RecordDetailPage";
import SignUpPage from "./screen/SignUpPage";
import LoginPage from "./screen/LoginPage";
import * as SecureStore from 'expo-secure-store'; // SecureStore import
import { useEffect, useState } from 'react';
import { HeaderBackButton } from "@react-navigation/elements";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const username = await SecureStore.getItemAsync('username'); // SecureStore로 사용자 이름 가져오기
      setIsLoggedIn(!!username);
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return null; // 로딩 상태일 경우 아무것도 렌더링하지 않음
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"LoginPage"}>
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
        <Stack.Screen name="MyPage" component={MyPage} options={{ headerShown: false }} />
        <Stack.Screen
          name="RecordPage"
          component={RecordPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RecordDetailPage"
          component={RecordDetailPage}
          options={({ navigation }) => ({
            title: 'Record Detail',
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => navigation.goBack()}
                tintColor="#ffffff"
              />
            ),
            headerStyle: {
              backgroundColor: '#0D0F35',
            },
            headerTintColor: '#ffffff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
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
        <Stack.Screen name="QuizPage" component={QuizPage} options={{ headerShown: false }} />
        <Stack.Screen name="GamePage" component={GamePage} />
        <Stack.Screen
          name="SignUpPage"
          component={SignUpPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
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
