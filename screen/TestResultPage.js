import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";

import HeaderLogo from "../assets/images/headerLogo.png";
import TestResult01 from "../assets/images/TestResult01.png";
import TestResult02 from "../assets/images/TestResult02.png";
import TestResult03 from "../assets/images/TestResult03.png";

const TestResultPage = ({ route, navigation }) => {
  const { answers, totalScore } = route.params; // route에서 전달된 매개변수 사용
  const scrollViewRef = useRef();
  const handleLogoPress = () => {
    navigation.navigate("MainPage");
  };
  const handleMyPage = () => {
    navigation.navigate("MyPage");
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  let resultImage = TestResult03; // 기본 이미지 (총점이 25 미만일 경우)

  if (totalScore >= 40) {
    //총점이 40 이상일 경우
    resultImage = TestResult01;
  } else if (totalScore >= 25) {
    //총점이 25 이상일 경우
    resultImage = TestResult02;
  }

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
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <View style={styles.testResultComponents}>
          <Image source={resultImage} style={styles.testResultImage} />
        </View>
        <View>
          <TouchableOpacity style={styles.navButton} onPress={handleMyPage}>
            <Text style={styles.navButtonText}>마이페이지로 이동</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

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
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  testResultComponents: {
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
    color: "#ffffff",
  },
  logoContainer: {
    alignItems: "center",
  },
  headerLogo: {
    width: "70%",
    height: 100,
  },
  navButton: {
    backgroundColor: "#8881EA",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  navButtonText: {
    color: "#ffffff",
    fontSize: 18,
  },
  testResultImage: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});

export default TestResultPage;
