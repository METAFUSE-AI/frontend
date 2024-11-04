import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { RadarChart } from "@salmonco/react-native-radar-chart";

import HeaderLogo from "../assets/images/headerLogo.png";
import TestResult01 from "../assets/images/TestResult01.png";
import TestResult02 from "../assets/images/TestResult02.png";
import TestResult03 from "../assets/images/TestResult03.png";

// 테스트 결과 페이지 => 테스트 점수별 그래프, 허구문항을 통한 사용자의 테스트 결과 신뢰도, 결과 이미지, sns 공유 기능
// npm install @salmonco/react-native-radar-chart react-native-svg => 삼각 그래프를 그리기 위한 라이브러리

const TestResultPage = ({ route, navigation }) => {
  const { answers = {}, totalScore } = route.params || {};
  const [resultImage, setResultImage] = useState(TestResult03);
  const [improvementRecommendation, setImprovementRecommendation] =
    useState("추천된 향상법을 확인하세요.");

  const handleLogoPress = () => {
    navigation.navigate("MainPage");
  };

  const handleMyPage = () => {
    navigation.navigate("MyPage");
  };

  // 점수 분류표를 참고하여 향상법을 추천하는 코드
  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    // 총점에 따라 결과 이미지 업데이트
    if (totalScore >= 40) {
      setResultImage(TestResult01);
    } else if (totalScore >= 25) {
      setResultImage(TestResult02);
    } else {
      setResultImage(TestResult03);
    }

    // 최저 점수 카테고리에 따른 향상법 추천
    const lowestCategory = getLowestCategory();
    let recommendation = "";

    if (
      lowestCategory === "메타인식" ||
      lowestCategory === "자기능력과 자기조절" ||
      lowestCategory === "행동 평가"
    ) {
      recommendation = "게임 추천";
    } else if (
      lowestCategory === "타인 비교" ||
      lowestCategory === "반성" ||
      lowestCategory === "결정"
    ) {
      recommendation = "일기 쓰기 추천";
    } else if (
      lowestCategory === "상황 평가" ||
      lowestCategory === "다양성" ||
      lowestCategory === "최적"
    ) {
      recommendation = "퀴즈 추천";
    }

    console.log("최저 카테고리: ", lowestCategory);
    console.log("추천: ", recommendation);

    setImprovementRecommendation(recommendation);
  }, [totalScore, navigation]);

  const sumCategoryScores = (indices) =>
    indices.reduce((sum, idx) => sum + (answers[idx] || 0), 0);

  const metaCognitionScore = sumCategoryScores([0, 1, 2, 3]) / 2; // 자기인식 및 자기판단
  const selfRegulationScore = sumCategoryScores([4, 5]); // 자기능력과 자기조절
  const otherComparisonScore = sumCategoryScores([6, 7]); // 타인 비교
  const behaviorEvalScore = sumCategoryScores([8, 9]); // 행동 평가
  const situationEvalScore = sumCategoryScores([10, 11]); // 상황 평가
  const diversityScore = sumCategoryScores([12, 13]); // 다양성
  const reflectionScore = sumCategoryScores([14, 15]); // 반성
  const optimalityScore = sumCategoryScores([16, 17]); // 최적
  const decisionScore = sumCategoryScores([18, 19]); // 결정

  // Summing the overall scores based on the defined subcategories
  const totalMetaCognition =
    metaCognitionScore + selfRegulationScore + otherComparisonScore;
  const totalMonitoring = behaviorEvalScore + situationEvalScore;
  const totalMetaControl =
    diversityScore + reflectionScore + optimalityScore + decisionScore;
  const overallTotalScore =
    totalMetaCognition + totalMonitoring + totalMetaControl;

  // Radar chart data array
  const radarChartData = [
    { label: "메타인식", value: totalMetaCognition },
    { label: "모니터링", value: totalMonitoring },
    { label: "메타통제", value: totalMetaControl },
  ];

  const getLowestCategory = () => {
    const scores = [
      { category: "메타인식", score: totalMetaCognition },
      { category: "모니터링", score: totalMonitoring },
      { category: "메타통제", score: totalMetaControl },
    ];
    scores.sort((a, b) => a.score - b.score);
    return scores[0].category;
  };

  const shareResultOnKakao = async () => {
    try {
      const response = await KakaoShareLink.sendFeed({
        content: {
          title: "My Test Result",
          link: {
            webUrl: "http://localhost:8081/",
            mobileWebUrl: "http://localhost:8081/",
          },
          description: `I scored ${overallTotalScore} on this test!`,
        },
        buttons: [
          {
            title: "View My Test Results",
            link: {
              androidExecutionParams: [
                { key: "score", value: overallTotalScore },
              ],
              iosExecutionParams: [{ key: "score", value: overallTotalScore }],
            },
          },
        ],
      });
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.customHeader}></View>
      <TouchableOpacity onPress={handleLogoPress} style={styles.logoContainer}>
        <Image source={HeaderLogo} style={styles.headerLogo} />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled"
        style={{ paddingBottom: 20 }}
      >
        <View style={styles.testResultComponents}>
          <Image source={resultImage} style={styles.testResultImage} />
          <Text style={styles.resultText}>총점: {overallTotalScore}점</Text>
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
          <Text style={styles.recommendationText}>
            향상 추천: {improvementRecommendation}
          </Text>
        </View>
        <TouchableOpacity
          onPress={shareResultOnKakao}
          style={styles.kakaoShareBtn}
        >
          카카오톡 공유하기
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={handleMyPage}>
          <Text style={styles.navButtonText}>마이페이지로 이동</Text>
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
  kakaoShareBtn: {
    backgroundColor: "#FAE300",
    color: "#371D1E",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    marginHorizontal: 5,
    margin: 10,
    fontSize: 18,
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
});

export default TestResultPage;
