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

const questions = [
  "스스로에 대한 내 평가는 정확한 편이다.",
  "나는 내가 알고 있는 것이 무엇인지 안다.",
  "나는 내가 무슨 생각을 하고 있는지 알고 있다.",
  "나는 내가 잘하는 것을 알고 있다.",
  "나는 내가 기억하는 것과 기억하지 못하는 것을 구분할 수 있다.",
  "나는 어떤 일을 처리할 때 나에게 잘 맞는 방법을 알고 있다.",
  "나는 내 행동이 잘못되었을 때 이를 빨리 알아차린다.",
  "나는 어떤 일이 잘못되고 있다는 것을 다른 사람보다 빨리 알아차린다.",
  "나는 내 행동이 상황에 적절한지 스스로 생각해본다.",
  "나는 내 행동이 상황에 적절하지 않다고 판단되면, 앞으로 어떤 행동을 취해야 할지 생각해본다.",
  "나는 새로운 것을 배울 때 내가 얼마나 이해할 수 있을지 예상해본다.",
  "나는 내가 처한 상황에 대해 스스로 평가해본다.",
  "나는 결정하기 전 다양한 선택에 대해 생각한다.",
  "나는 내가 할 수 없는 일보다는 할 수 있는 일에 더 집중한다.",
  "나는 내가 잘못했다고 생각되면, 잘못을 바로 잡으려고 시도한다.",
  "나는 과거 경험에 비추어 현재 어떻게 행동 할 지를 결정한다.",
  "나는 그동안 내가 사용한 여러 가지 문제해결 방법 중 가장 좋은 방법을 선택한다.",
  "나는 내가 모르는 부분에 대해서는 섣부르게 결정하지 않는다.",
  "나는 나의 현재 상태에 대해 생각한 뒤 어떤 행동을 해야 할지 결정한다.",
  "나는 결정하기 전 다른 사람들도 나의 결정이 적절하다고 할지 생각해본다.",
  "나는 내 행동의 결과를 예측하려고 노력한다.",
  "나는 내가 세운 계획이 잘 진행되고 있는지 주기적으로 점검한다.",
  "나는 어려운 상황에 처했을 때 여러 가지 해결 방법을 고려한다.",
  "나는 내 결정이 다른 사람에게 미칠 영향을 생각한다.",
];

const TestPage = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [answers, setAnswers] = useState({});
  const scrollViewRef = useRef();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const createTest = (testData) => {
    return fetch('http://localhost:8080/tests', { // 실제 API URL로 변경
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    }).then((response) => response.json());
  };

  const renderQuestion = (questionIndex) => {
    const questionNumber = (currentPage - 1) * 6 + questionIndex + 1;
    return (
      <View key={questionIndex} style={styles.questionContainer}>
        <Text style={styles.questionText}>
          Q{questionNumber}. {questions[questionNumber - 1]}
        </Text>
        <View style={styles.answerContainer}>
          {["전혀 아니다", "아니다", "그렇다", "매우 그렇다"].map(
            (option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.answerButton,
                  answers[questionNumber] === index
                    ? styles.selectedAnswer
                    : null,
                ]}
                onPress={() => {
                  const updatedAnswers = {
                    ...answers,
                    [questionNumber]: index,
                  };
                  setAnswers(updatedAnswers);
                  console.log(`Q${questionNumber} 점수: ${index}`);
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

  const handleNextPage = () => {
    if (currentPage < 4) {
      setCurrentPage(currentPage + 1);
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    } else {
      const totalScore = Object.values(answers).reduce(
        (sum, value) => sum + value,
        0
      );
      console.log("테스트 제출:", answers);
      console.log("총점:", totalScore);

      // 테스트 데이터 전송
      const testData = {
        member: { memberId: 1 }, // 임시 memberId
        testScore: totalScore,
        question: JSON.stringify(answers),
        testDate: new Date().toISOString(),
      };

      createTest(testData)
        .then((response) => {
          console.log("서버 응답:", response);
          navigation.navigate("TestResultPage", { answers, totalScore });
        })
        .catch((error) => {
          console.error("테스트 전송 중 오류:", error);
        });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderBackButton onPress={() => navigation.goBack()} />
        <Image source={HeaderLogo} style={styles.headerLogo} />
        <View style={{ width: 40 }} /> {/* Placeholder for alignment */}
      </View>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollViewContent}
      >
        {Array.from({ length: 6 }, (_, i) => renderQuestion(i))}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerLogo: {
    width: 100,
    height: 30,
    resizeMode: "contain",
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
    backgroundColor: "#c0e8ff",
  },
  answerText: {
    fontSize: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  navigationButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  navigationButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default TestPage;
