import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Alert, ScrollView, Image, TouchableOpacity } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements"; // HeaderBackButton 임포트
import SubmitButton from "../components/SubmitButton"; // SubmitButton 컴포넌트 임포트
import OptionButton from "../components/OptionButton"; // OptionButton 컴포넌트 임포트

import HeaderLogo from "../assets/images/headerLogo.png"; // HeaderLogo 이미지 임포트

// quizQuestions를 quizData로 이름 변경
const quizData = [
  // 0번 인덱스 정답 질문 (10개)
  {
    question: "메타인지란 무엇인가요?",
    options: [
      "A. 자기 인식",
      "B. 학습 전략",
      "C. 기억력 향상",
      "D. 모두 해당",
    ],
    answer: 0, // 정답: A
  },
  // ... (나머지 질문들도 동일하게 quizData 배열에 포함)
  // 1번 인덱스 정답 질문 (10개)
  {
    question: "메타인지의 주요 기술은 무엇인가요?",
    options: [
      "A. 자기 모니터링",
      "B. 목표 설정",
      "C. 메모리 향상",
      "D. 모두 해당",
    ],
    answer: 1, // 정답: B
  },
  // 2번 인덱스 정답 질문 (10개)
  {
    question: "메타인지의 또 다른 이점은 무엇인가요?",
    options: [
      "A. 자기 인식 향상",
      "B. 감정 조절",
      "C. 대인 관계 개선",
      "D. 모두 해당",
    ],
    answer: 2, // 정답: C
  },
  // 3번 인덱스 정답 질문 (10개)
  {
    question: "메타인지적 학습의 목표는 무엇인가요?",
    options: [
      "A. 자기 반성",
      "B. 목표 달성",
      "C. 지속적 성장",
      "D. 모두 해당",
    ],
    answer: 3, // 정답: D
  },
];

export default function QuizPage({ navigation }) {
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleOptionPress = (index) => {
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      const isCorrect = selectedOption === quizData[quizIndex].answer;
      setCorrectCount(prevCount => prevCount + (isCorrect ? 1 : 0));
      
      if (quizIndex < quizData.length - 1) {
        setQuizIndex(quizIndex + 1);
        setSelectedOption(null);
      } else {
        setQuizCompleted(true);
      }
    } else {
      Alert.alert("알림", "옵션을 선택하세요.");
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false, // 기본 상단 바 숨기기
    });
  }, [navigation]);

  useEffect(() => {
    if (quizCompleted) {
      Alert.alert(
        "퀴즈 완료",
        `총 ${correctCount}개 맞았습니다!`,
        [{ text: "확인", onPress: () => navigation.goBack() }]
      );
    }
  }, [quizCompleted]);

  const isLastQuestion = quizIndex === quizData.length - 1;

  return (
    <View style={styles.container}>
      <View style={styles.customHeader}>
        <HeaderBackButton
          onPress={() => navigation.goBack()}
          tintColor="#ffffff"
        />
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.logoContainer}>
        <Image source={HeaderLogo} style={styles.headerLogo} />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        style={styles.scrollView}
      >
        {!quizCompleted && (
          <View style={styles.quizContainer}>
            <Text style={styles.questionText}>{quizData[quizIndex].question}</Text>
            {quizData[quizIndex].options.map((option, index) => (
              <OptionButton
                key={index}
                text={option}
                isSelected={index === selectedOption}
                onPress={() => handleOptionPress(index)}
              />
            ))}
            <SubmitButton text={isLastQuestion ? "정답 확인" : "제출"} onPress={handleSubmit} />
          </View>
        )}
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
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  quizContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  questionText: {
    fontSize: 20,
    marginBottom: 20,
    color: "#fff",
  },
});
