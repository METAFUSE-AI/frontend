import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { RadarChart } from "@salmonco/react-native-radar-chart";

import HeaderLogo from "../assets/images/headerLogo.png";
import TestResult01 from "../assets/images/TestResult01.png";
import TestResult02 from "../assets/images/TestResult02.png";
import TestResult03 from "../assets/images/TestResult03.png";

// 테스트 결과 페이지 => 테스트 점수별 그래프, 허구문항을 통한 사용자의 테스트 결과 신뢰도, 결과 이미지, sns 공유 기능
// npm install @salmonco/react-native-radar-chart react-native-svg => 삼각 그래프를 그리기 위한 라이브러리

const TestResultPage = ({ route, navigation }) => {
  const { answers, totalScore } = route.params; // route에서 전달된 매개변수 사용
  const [resultImage, setResultImage] = useState(TestResult03);

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

    //점수 총합별 결과 이미지 출력
    if (totalScore >= 40) {
      setResultImage(TestResult01);
    } else if (totalScore >= 25) {
      setResultImage(TestResult02);
    } else {
      setResultImage(TestResult03);
    }
  }, [totalScore, navigation]);

  // 세 가지 카테고리별로 점수를 합산하는 함수
  const sumCategoryScores = (start, end) => {
    return Object.values(answers)
      .slice(start, end)
      .reduce((sum, value) => sum + value, 0);
  };

  const categories = ["Meta Cognition", "Monitoring", "Meta Control"];

  // 세 가지 카테고리의 점수
  const metaCognitionScore = sumCategoryScores(0, 8);
  const monitoringScore = sumCategoryScores(8, 16);
  const metaControlScore = sumCategoryScores(16, 24);

  const radarChartData = {
    labels: ["Meta Cognition", "Monitoring", "Meta Control"],
    datasets: [
      {
        data: [metaCognitionScore, monitoringScore, metaControlScore],
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "#0D0F35",
    backgroundGradientFrom: "#0D0F35",
    backgroundGradientTo: "#0D0F35",
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
  };

  const screenWidth = Dimensions.get("window").width;

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
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Test Results</Text>
          <RadarChart
            data={radarChartData}
            width={screenWidth - 40} // 화면 너비에 맞춰 조정
            height={220}
            chartConfig={chartConfig}
            style={styles.radarChart}
          />
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
  chartContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  chartTitle: {
    color: "#ffffff",
    fontSize: 18,
    marginBottom: 10,
  },
  radarChart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default TestResultPage;
