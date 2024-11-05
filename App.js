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
import SignUpPage from "./screen/SignUpPage"; // 회원가입 페이지
import LoginPage from "./screen/LoginPage"; // 로그인 페이지
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage import
import { useEffect, useState } from 'react'; // useEffect 추가
import { HeaderBackButton } from "@react-navigation/elements"; // 뒤로가기 버튼

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const username = await AsyncStorage.getItem('username');
      setIsLoggedIn(!!username);
    };

    checkLoginStatus();
  }, []);

  if (isLoggedIn === null) {
    return null; // 로딩 상태일 경우 아무것도 렌더링하지 않음
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "MainPage" : "LoginPage"}>
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
          name="RecordDetailPage"
          component={RecordDetailPage}
          options={({ navigation }) => ({
            title: 'Record Detail',
            headerLeft: () => (
              <HeaderBackButton
                onPress={() => navigation.goBack()} // navigation 사용
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
          name="SignUpPage" // 회원가입 페이지
          component={SignUpPage}
          options={{ headerShown: false }} // 헤더 숨김
        />
        <Stack.Screen
          name="LoginPage" // 로그인 페이지
          component={LoginPage}
          options={{ headerShown: false }} // 헤더 숨김
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