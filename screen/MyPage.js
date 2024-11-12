import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
} from "react-native";
import { getTestResultsByUsername } from "../components/ApiUtilsi";
import HeaderLogo from "../assets/images/headerLogo.png";

export default function MyPage({ navigation }) {
  const [testList, setTestList] = useState([]);
  const username = "test"; // 고정된 memberId 값

  const handleLogoPress = () => {
    navigation.navigate("MainPage");
  };

  // 테스트 결과 클릭 시 해당 결과 페이지로 이동
  const handleTestResultPress = (testId) => {
    console.log(`선택한 testId: ${testId}`);
    navigation.navigate("TestResultPage", { testId });
  };

  // 테스트 결과 불러오기
  useEffect(() => {
    const fetchTestResults = async () => {
      try {
        const testResults = await getTestResultsByUsername(username);
        setTestList(testResults);
      } catch (error) {
        console.error("테스트 결과를 불러오는 중 오류 발생:", error);
      }
    };
    fetchTestResults();
  }, []);

  return (
    <View style={styles.container}>
      {/* 뒤로가기 버튼 */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{"< 뒤로가기"}</Text>
      </TouchableOpacity>

      {/* 로고 */}
      <Image source={HeaderLogo} style={styles.logo} />

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
          <Text style={{ color: "#FFF", fontSize: 16 }}>불러올 테스트 결과가 없습니다.</Text>
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
    top: 10,
    left: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
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
