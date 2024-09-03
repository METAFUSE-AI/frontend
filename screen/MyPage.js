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
    // For example purposes, we'll use hardcoded data.
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
        <View>
          <Text style={{ color: "#ffffff" }}>이전 테스트 기록 열람</Text>
          <View style={styles.testListBox}>
            {/*추후 result_id 별로 결과를 마이페이지로 불러올 수 있도록 수정 예정*/}
            <TouchableOpacity
              style={styles.testListBtn}
              onPress={handleTestResultPress} // Navigate to TestResultPage on press
            >
              <Text style={{ color: "#ffffff" }}>{testListNum}회</Text>
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
  buttonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  testListBox: {
    width: 250,
    height: 250,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  testListBtn: {
    width: 150,
    height: 40,
    backgroundColor: "#8881EA",
    justifyContent: "center",
    borderRadius: 10,
  },
});
