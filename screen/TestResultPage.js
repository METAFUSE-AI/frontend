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

  const radarChartData = [
    { label: "메타인식", value: metaCognitionScore },
    { label: "모니터링", value: monitoringScore },
    { label: "메타통제", value: metaControlScore },
  ];

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
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.testResultComponents}>
          <Image source={resultImage} style={styles.testResultImage} />
        </View>
        {/* 메타인지 결과 */}
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>나의 메타인지 능력 분석</Text>
          <RadarChart
            data={radarChartData.map((item) => ({
              label: item.label,
              value: item.value,
            }))}
            gradientColor={{
              startColor: "#FF9432",
              endColor: "#FFF8F1",
              count: 5,
            }}
            stroke={["#FFE8D3", "#FFE8D3", "#FFE8D3", "#FFE8D3", "#ff9532"]}
            strokeWidth={[0.5, 0.5, 0.5, 0.5, 1]}
            strokeOpacity={[1, 1, 1, 1, 0.13]}
            labelColor="#433D3A"
            dataFillColor="#FF9432"
            dataFillOpacity={0.8}
            dataStroke="salmon"
            dataStrokeWidth={2}
            isCircle
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
    alignItems: "center",
    justifyContent: "center",
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
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    aspectRatio: 1, // 정사각형 비율을 유지
    backgroundColor: "#fff",
    borderRadius: 40,
    elevation: 5, // 그림자 추가 (Android용)
    shadowColor: "#000", // 그림자 추가 (iOS용)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  chartTitle: {
    color: "#433D3A",
    fontSize: 18,
    marginBottom: 10,
  },
  radarChart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default TestResultPage;
