import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
} from "react-native";
import { getTestResultsByUsername } from "../components/ApiUtils";
import HeaderLogo from "../assets/images/headerLogo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyPage({ navigation }) {
  const [testList, setTestList] = useState([]);
  const [username, setUsername] = useState(null);

  const handleLogoPress = () => {
    navigation.navigate("MainPage");
  };

  // 로그아웃 버튼 클릭 시 처리
  const handleLogout = async () => {
    try {
      // AsyncStorage에서 username 삭제
      await AsyncStorage.removeItem("username");
      setUsername(false); // username 상태 초기화
      
      // 네비게이션 스택 리셋하고 로그인 페이지로 이동
      navigation.reset({
        index: 0, // 스택의 첫 번째 화면으로 설정
        routes: [{ name: "LoginPage" }], // LoginPage로 리셋
      });
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  // 테스트 결과 클릭 시 해당 결과 페이지로 이동
  const handleTestResultPress = (testId) => {
    console.log(`선택한 testId: ${testId}`);
    navigation.navigate("TestResultPage", { testId });
  };

  // AsyncStorage에서 username 불러와 테스트 결과 요청
  useEffect(() => {
    const getUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        if (storedUsername) {
          setUsername(storedUsername);
          fetchTestResults(storedUsername); // username 기반으로 테스트 결과 불러오기
        }
      } catch (error) {
        console.error("Error loading username from AsyncStorage:", error);
      }
    };

    const fetchTestResults = async (user) => {
      try {
        const testResults = await getTestResultsByUsername(user);
        setTestList(testResults);
      } catch (error) {
        console.error("테스트 결과를 불러오는 중 오류 발생:", error);
      }
    };

    getUsername();
  }, []);

  return (
    <View style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>{"<Back"}</Text>
      </TouchableOpacity>

      {/* 로고와 로그아웃 버튼 */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleLogoPress} style={styles.logoContainer}>
          <Image source={HeaderLogo} style={styles.logo} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* 스크롤 가능한 테스트 결과 리스트 */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {testList.length > 0 ? (
          testList.map((test) => (
            <TouchableOpacity
              key={test.seq}
              style={styles.testButton}
              onPress={() => handleTestResultPress(test.testId)}
            >
              <Text style={styles.testButtonText}>
                {test.seq}번째 테스트 기록
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={{ color: "#FFF", fontSize: 16 }}>
            불러올 테스트 결과가 없습니다.
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0F35",
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  backButton: {
    position: "absolute",
    top: 40, // 조금 아래로 내림
    left: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logoContainer: {
    alignSelf: "center",
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: "contain",
  },
  logoutButton: {
    backgroundColor: "#FF4C4C",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  contentContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  testButton: {
    backgroundColor: "#8881EA",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  testButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
