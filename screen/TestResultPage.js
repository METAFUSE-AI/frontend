// TestResultPage.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { RadarChart } from "@salmonco/react-native-radar-chart";
import axios from "axios";

import HeaderLogo from "../assets/images/headerLogo.png";
import TestResult01 from "../assets/images/TestResult01.png";
import TestResult02 from "../assets/images/TestResult02.png";
import TestResult03 from "../assets/images/TestResult03.png";
import { fetchTestScores } from "../components/ApiUtils";
const TestResultPage = ({ route, navigation }) => {
  const { testId } = route.params;
  const [scoreSummary, setScoreSummary] = useState({});
  const [resultImage, setResultImage] = useState(TestResult03);
  const [improvementRecommendation, setImprovementRecommendation] =
    useState("추천된 향상법을 확인하세요.");
  const [recommendationPage, setRecommendationPage] = useState("");

  const handleLogoPress = () => {
    navigation.navigate("MainPage");
  };

  const handleMyPagePress = () => {
    navigation.navigate("MyPage"); // 마이페이지로 이동하는 함수
  };

  useEffect(() => {
    axios;
    fetchTestScores(testId)
      .then((data) => {
        setScoreSummary(data);

        // 점수에 따라 결과 이미지 설정
        if (data.totalScoreSum >= 67) {
          setResultImage(TestResult01);
        } else if (data.totalScoreSum >= 42) {
          setResultImage(TestResult02);
        } else {
          setResultImage(TestResult03);
        }

        const metaCognitionScore = data.metaCognitionScoreSum;
        const monitoringScore = data.monitoringScoreSum;
        const metaControlScore = data.metaControlScoreSum;

        const lowestScore = Math.min(
          metaCognitionScore,
          monitoringScore,
          metaControlScore
        );
        let recommendation = "";
        let page = "";

        if (
          metaCognitionScore === monitoringScore &&
          monitoringScore === metaControlScore
        ) {
          recommendation = "일기 쓰기 추천";
          page = "RecordPage";
        } else if (lowestScore === metaCognitionScore) {
          recommendation = "게임 추천";
          page = "GamePage";
        } else if (lowestScore === monitoringScore) {
          recommendation = "퀴즈 추천";
          page = "QuizPage";
        } else if (lowestScore === metaControlScore) {
          recommendation = "일기 쓰기 추천";
          page = "RecordPage";
        }

        setImprovementRecommendation(recommendation);
        setRecommendationPage(page);
      })
      .catch((error) => console.error("Error fetching score summary:", error));
  }, [testId]);

  const radarChartData = [
    { label: "메타인식", value: scoreSummary?.metaCognitionScoreSum || 0 },
    { label: "모니터링", value: scoreSummary?.monitoringScoreSum || 0 },
    { label: "메타통제", value: scoreSummary?.metaControlScoreSum || 0 },
  ];

  // scoreSummary가 비어있지 않으면 차트 표시
  if (!scoreSummary || Object.keys(scoreSummary).length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loadingText}>데이터를 불러오는 중입니다...</Text>
      </SafeAreaView>
    );
  }

  // 추천 향상법에 맞는 페이지로 네비게이션
  const handleRecommendationPage = () => {
    if (recommendationPage) {
      navigation.navigate(recommendationPage);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.customHeader}></View>
      <TouchableOpacity onPress={handleLogoPress} style={styles.logoContainer}>
        <Image source={HeaderLogo} style={styles.headerLogo} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.testResultComponents}>
          <Image source={resultImage} style={styles.testResultImage} />
          <Text style={styles.resultText}>
            총점: {scoreSummary.totalScoreSum || 0}점
          </Text>
        </View>
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>나의 메타인지 능력 분석</Text>
          <RadarChart
            data={radarChartData}
            gradientColor={{
              startColor: "#FF9432",
              endColor: "#FFF8F1",
              count: 5,
            }}
            stroke={["#FFE8D3", "#FFE8D3", "#FFE8D3"]}
            strokeWidth={[0.5, 0.5, 0.5]}
            strokeOpacity={[1, 1, 1]}
            labelColor="#433D3A"
            dataFillColor="#FF9432"
            dataFillOpacity={0.8}
            dataStroke="salmon"
            dataStrokeWidth={2}
            isCircle
            maxValue={24} // max 값 설정
          />
        </View>
        <View>
          <Text style={styles.recommendationText}>
            향상 추천: {improvementRecommendation}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.navButton}
          onPress={handleRecommendationPage}
        >
          <Text style={styles.navButtonText}>추천 향상법 하러가기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleLogoPress}>
          <Text style={styles.navButtonText}>홈으로 가기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleMyPagePress}>
          {/* 마이페이지로 이동하는 버튼 */}
          <Text style={styles.navButtonText}>마이페이지로 가기</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
    marginHorizontal: 5,
    margin: 10,
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
    marginTop: 30,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    borderRadius: 40,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    height: 300,
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
  recommendationText: {
    color: "#ffffff",
    fontSize: 18,
    marginTop: 10,
  },
  loadingText: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default TestResultPage;
