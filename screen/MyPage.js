// MyPage.js
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import HeaderLogo from "../assets/images/headerLogo.png";
import { apiInstance } from "../components/ApiUtils";

export default function MyPage({ navigation }) {
  const [testResults, setTestResults] = useState([]);

  // 백엔드 API를 호출하여 테스트 결과를 가져옴
  const fetchTestResults = async () => {
    try {
      const response = await apiInstance.get("/test-results/member/1");
      if (response.status === 200) {
        const data = response.data;
        setTestResults(Array.isArray(data) ? data : []);
      } else {
        throw new Error("Failed to fetch test results");
      }
    } catch (error) {
      console.error("Error fetching test results:", error);
      setTestResults([]); // Reset to an empty array on error
    }
  };

  useEffect(() => {
    fetchTestResults();
  }, []);

  // 로고 클릭 시 메인 페이지로 이동
  const handleLogoPress = () => {
    navigation.navigate("MainPage");
  };

  // 테스트 결과를 눌렀을 때 상세 결과 페이지로 이동
  //const handleTestResultPress = (testResult) => {
  //navigation.navigate("TestResultPage", { testResult });
  //};

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.customHeader}>
        <HeaderBackButton
          onPress={() => navigation.goBack()}
          tintColor="#ffffff"
        />
      </View>
      <TouchableOpacity onPress={handleLogoPress} style={styles.logoContainer}>
        <Image source={HeaderLogo} style={styles.headerLogo} />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={[
          styles.scrollViewContent,
          { alignItems: "center" },
        ]}
        style={styles.scrollView}
      >
        <View style={styles.testListContainer}>
          <Text style={styles.testListTitle}>이전 테스트 기록 열람</Text>
          <View style={styles.testListBox}>
            {Array.isArray(testResults) && testResults.length > 0 ? (
              testResults.map((result, index) => (
                <TouchableOpacity
                  key={result.testResultId}
                  style={styles.testListBtn}
                  onPress={() => handleTestResultPress(result)}
                >
                  <Text style={styles.testListBtnText}>
                    {index + 1}회: 점수 {result.score}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noResultsText}>테스트 기록이 없습니다.</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0F35",
  },
  customHeader: {
    height: 50,
    justifyContent: "center",
    paddingLeft: 10,
    backgroundColor: "#0D0F35",
    zIndex: 10,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  headerLogo: {
    width: "70%",
    height: 100,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  scrollView: {
    flex: 1,
  },
  testListContainer: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#fff",
    width: "85%",
  },
  testListTitle: {
    color: "#e2",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  testListBox: {
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  testListBtn: {
    width: "90%",
    height: 50,
    backgroundColor: "#8881EA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 10,
  },
  testListBtnText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  noResultsText: {
    color: "#ffffff",
    fontSize: 16,
    fontStyle: "italic",
  },
});
