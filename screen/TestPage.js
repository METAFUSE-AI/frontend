// TestPage.js
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Pressable,
} from "react-native";
import HeaderLogo from "../assets/images/headerLogo.png";
import { createTest } from "../components/ApiUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
const questions = [
  "스스로에 대한 내 평가는 정확한 편이다.", //메타인식
  "나는 내가 알고 있는 것이 무엇인지 안다.",
  "나는 내가 무슨 생각을 하고 있는지 알고 있다.",
  "나는 내가 잘하는 것을 알고 있다.",
  "나는 내가 기억하는 것과 기억하지 못하는 것을 구분할 수 있다.",
  "나는 어떤 일을 처리할 때 나에게 잘 맞는 방법을 알고 있다.",
  "나는 내 행동이 잘못되었을 때 이를 빨리 알아차린다.",
  "나는 어떤 일이 잘못되고 있다는 것을 다른 사람보다 빨리 알아차린다.",
  "나는 내 행동이 상황에 적절한지 스스로 생각해본다.", //모니터링
  "나는 내 행동이 상황에 적절하지 않다고 판단되면, 앞으로 어떤 행동을 취해야 할지 생각해본다.",
  "나는 새로운 것을 배울 때 내가 얼마나 이해할 수 있을지 예상해본다.",
  "나는 내가 처한 상황에 대해 스스로 평가해본다.",
  "나는 결정하기 전 다양한 선택에 대해 생각한다.", //메타통제
  "나는 내가 할 수 없는 일보다는 할 수 있는 일에 더 집중한다.",
  "나는 내가 잘못했다고 생각되면, 잘못을 바로 잡으려고 시도한다.",
  "나는 과거 경험에 비추어 현재 어떻게 행동할 지를 결정한다.",
  "나는 그동안 내가 사용한 여러 가지 문제해결 방법 중 가장 좋은 방법을 선택한다.",
  "나는 내가 모르는 부분에 대해서는 섣부르게 결정하지 않는다.",
  "나는 나의 현재 상태에 대해 생각한 뒤 어떤 행동을 해야 할지 결정한다.",
  "나는 결정하기 전 다른 사람들도 나의 결정이 적절하다고 할지 생각해본다.",
];

const TestPage = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [modalVisible, setModalVisible] = useState(false);
  const [resultImage, setResultImage] = useState(null);
  const [improvementRecommendation, setImprovementRecommendation] =
    useState(null);
  const scrollViewRef = useRef();
  const[username,setUsername] = useState(null);
  const handleLogoPress = () => {
    navigation.navigate("MainPage");
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    // AsyncStorage에서 username을 가져와서 상태로 설정
    const getUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        if (storedUsername) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error("Error loading username from AsyncStorage:", error);
      }
    };

    getUsername(); // username 불러오기
  }, [navigation]);

  const renderQuestion = (questionIndex) => {
    const questionNumber = (currentPage - 1) * 5 + questionIndex + 1; // 각 페이지당 5개 질문
    return (
      <View key={questionIndex} style={styles.questionContainer}>
        <Text style={styles.questionText}>
          {questionNumber}. {questions[questionNumber - 1]}
        </Text>
        <View style={styles.answerContainer}>
          {["전혀 아니다", "아니다", "그렇다", "매우 그렇다"].map(
            (option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.answerButton,
                  answers[questionNumber - 1] === index
                    ? styles.selectedAnswer
                    : null,
                ]}
                onPress={() => {
                  const updatedAnswers = [...answers]; // 기존 배열을 복사
                  updatedAnswers[questionNumber - 1] = index; // 해당 질문에 대한 답변 인덱스를 업데이트
                  setAnswers(updatedAnswers); // 업데이트된 배열 상태로 설정
                }}
              >
                <Text style={styles.answerText}>{option}</Text>
              </TouchableOpacity>
            )
          )}
        </View>
      </View>
    );
  };

  const calculateCategoryScore = (indices) =>
    indices.reduce((sum, idx) => sum + (answers[idx] || 0), 0);

  // 각 점수 계산
  const metaCognitionScore =
    calculateCategoryScore([0, 1, 2, 3]) +
    calculateCategoryScore([4, 5]) +
    calculateCategoryScore([6, 7]);
  const monitoringScore =
    calculateCategoryScore([8, 9]) * 2 + calculateCategoryScore([10, 11]) * 2;
  const metaControlScore =
    calculateCategoryScore([12, 13]) +
    calculateCategoryScore([14, 15]) +
    calculateCategoryScore([16, 17]) +
    calculateCategoryScore([18, 19]);

  // 전체 점수 계산
  let totalScore = metaCognitionScore + monitoringScore + metaControlScore;

  function calculatePercentage(score) {
    return Math.round((score / 72) * 100);
  }
  const handleNextPage = () => {
    if (currentPage < 4) {
      setCurrentPage(currentPage + 1);
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    } else {
      if (answers.includes(null)) {
        setModalVisible(true); // 모달 표시
      } else {
        
        console.log("username", username);
        const testData = {
          member: { username: username },
          totalScore: calculatePercentage(totalScore),
          metaCognitionScore: metaCognitionScore,
          monitoringScore: monitoringScore,
          metaControlScore: metaControlScore,
        };

        // 서버로 데이터 전송 및 결과 처리
        createTest(testData)
          .then((response) => {
            console.log("서버 응답 전체:", response); // 전체 응답 로그 확인

            const testId = response?.data?.testId || response?.testId;

            if (testId) {
              console.log("testId 추출:", testId);
              navigation.navigate("TestResultPage", { testId });
            } else {
              console.error("testId가 응답에 없음");
            }
          })
          .catch((error) => {
            console.error("에러 발생:", error);
          });
      }
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  // 모달 닫기
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.customHeader}></View>
      <TouchableOpacity onPress={handleLogoPress} style={styles.logoContainer}>
        <Image source={HeaderLogo} style={styles.headerLogo} />
      </TouchableOpacity>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollViewContent}
      >
        {Array.from({ length: 5 }, (_, i) => renderQuestion(i))}
        {/* 각 페이지당 5개 질문 */}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.navigationButton,
            currentPage === 1 && styles.disabledButton,
          ]}
          onPress={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <Text style={styles.navigationButtonText}>이전</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={handleNextPage}
        >
          <Text style={styles.navigationButtonText}>
            {currentPage < 4 ? "다음" : "제출"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 모달 구현 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>
            질문이 모두 체크되었는지 확인해주세요.{"\n"}
            모든 항목에 대한 응답이 완료되어야만{"\n"}
            테스트 결과를 확인할 수 있습니다.
          </Text>
          <Pressable style={styles.button} onPress={closeModal}>
            <Text style={styles.buttonText}>확인</Text>
          </Pressable>
        </View>
      </Modal>

      {/* 결과 이미지 및 개선 추천 */}
      {resultImage && (
        <View style={styles.resultContainer}>
          <Image source={{ uri: resultImage }} style={styles.resultImage} />
          <Text style={styles.recommendationText}>
            {improvementRecommendation}
          </Text>
        </View>
      )}
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
    padding: 20,
  },
  questionContainer: {
    marginBottom: 30,
  },
  questionText: {
    fontSize: 18,
    marginBottom: 10,
    color: "white",
  },
  answerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  answerButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    alignItems: "center",
    marginHorizontal: 5,
  },
  selectedAnswer: {
    backgroundColor: "#8881EA",
  },
  answerText: {
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#0D0F35",
  },
  navigationButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#8881EA",
    padding: 10,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  navigationButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalView: {
    backgroundColor: "white",
    margin: 20,
    padding: 35,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalText: {
    color: "white",
    marginBottom: 20,
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#8881EA",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
  resultContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  resultImage: {
    width: 200,
    height: 200,
  },
  recommendationText: {
    fontSize: 16,
    color: "white",
    marginTop: 10,
  },
});

export default TestPage;
