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

export default function MyPage({ navigation }) {
  const [testListNum, setTestListNum] = useState(1);

  const handleLogoPress = () => {
    navigation.navigate("MainPage");
  };

  const handleTestResultPress = () => {
    // Here, you should retrieve the test results from your data source.
    const testResults = {
      answers: [
        /* Array of answers */
      ],
      totalScore: 30, // Example total score
    };

    navigation.navigate("TestResultPage", testResults);
  };

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
            {/* 추후 result_id 별로 결과를 마이페이지로 불러올 수 있도록 수정 예정 */}
            <TouchableOpacity
              style={styles.testListBtn}
              onPress={handleTestResultPress} // Navigate to TestResultPage on press
            >
              <Text style={styles.testListBtnText}>{testListNum}회</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0F35", // Keep the dark background
  },
  customHeader: {
    height: 50,
    justifyContent: "center",
    paddingLeft: 10,
    backgroundColor: "#0D0F35", // Same background color for consistency
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
    backgroundColor: "#1C1E3D",
    width: "85%",
  },
  testListTitle: {
    color: "#FF9432", // Highlighted color for title text
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  testListBox: {
    width: "100%",
    height: 100,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  testListBtn: {
    width: 150,
    height: 50,
    backgroundColor: "#8881EA",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  testListBtnText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
