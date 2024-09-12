import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { HeaderBackButton } from "@react-navigation/elements"; // 뒤로가기 버튼

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        // AsyncStorage에서 유저 정보 확인
        const user = await AsyncStorage.getItem("user");
        if (user) {
          setIsLoggedIn(true); // 유저가 있으면 로그인 상태로 설정
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    checkUserStatus();
  }, []);

  if (loading) {
    // 유저 상태 확인 중 로딩 스피너 표시
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isLoggedIn ? "MainPage" : "KakaoLogin"}>
        <Stack.Screen
          name="MainPage"
          component={MainPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="KakaoLogin"
          component={KakaoLogin}
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
          options={{
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
        <Stack.Screen name="QuizPage" component={QuizPage} />
        <Stack.Screen name="GamePage" component={GamePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
