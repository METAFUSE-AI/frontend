import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";

import HeaderLogo from "../assets/images/headerLogo.png";
import TestResult01 from "../assets/images/TestResult01.png";
import TestResult02 from "../assets/images/TestResult02.png";
import TestResult03 from "../assets/images/TestResult03.png";

// 테스트 결과 페이지 => 테스트 점수별 그래프, 허구문항을 통한 사용자의 테스트 결과 신뢰도, 결과 이미지, sns 공유 기능

const TestResultPage = ({ route, navigation }) => {
  const { answers, totalScore } = route.params; // route에서 전달된 매개변수 사용
  const [resultImage, setResultImage] = useState(TestResult03);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    //점수 총합별 결과 이미지 출력
    if (totalScore >= 40) {
      setResultImage(TestResult01);
    } else if (totalScore >= 25) {
      setResultImage(TestResult02);
    } else {
      setResultImage(TestResult03);
    }
  }, [totalScore, navigation]);

  const handleLogoPress = () => {
    navigation.navigate("MainPage");
  };

  const handleMyPage = () => {
    navigation.navigate("MyPage");
  };

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
      <ScrollView style={styles.scrollView}>
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
