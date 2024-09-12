import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Alert, ScrollView, Image, TouchableOpacity } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import SubmitButton from "../components/SubmitButton";
import OptionButton from "../components/OptionButton";
import { createRecord } from "../components/ApiUtilsi";  // 기록 저장 API 임포트

import HeaderLogo from "../assets/images/headerLogo.png";

const quizData = [
  {
    question: "다음 중 React Native의 주요 특징이 아닌 것은?",
    options: [
      "A. Cross-platform",
      "B. Uses native components",
      "C. Primarily for backend development",
      "D. Hot Reloading",
    ],
    answer: 2,
  },
  {
    question: "다음 중 JavaScript의 자료형이 아닌 것은?",
    options: [
      "A. Undefined",
      "B. Boolean",
      "C. Float",
      "D. String",
    ],
    answer: 2,
  },
  {
    question: "다음 중 CSS의 속성이 아닌 것은?",
    options: [
      "A. color",
      "B. font-size",
      "C. padding",
      "D. background-image",
    ],
    answer: 3,
  },
  {
    question: "다음 중 HTML 태그가 아닌 것은?",
    options: [
      "A. <div>",
      "B. <span>",
      "C. <header>",
      "D. <sectioner>",
    ],
    answer: 3,
  },
  {
    question: "다음 중 HTTP 메서드가 아닌 것은?",
    options: [
      "A. GET",
      "B. POST",
      "C. FETCH",
      "D. DELETE",
    ],
    answer: 2,
  },
];

export default function QuizPage({ navigation }) {
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);  // 각 문제의 선택지를 저장
  const [correctCount, setCorrectCount] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleOptionPress = (index) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[quizIndex] = index;  // 선택한 옵션 저장
    setSelectedOptions(newSelectedOptions);
  };

  const handleSubmit = () => {
    if (selectedOptions[quizIndex] !== undefined) {
      const isCorrect = selectedOptions[quizIndex] === quizData[quizIndex].answer;
      setCorrectCount(prevCount => prevCount + (isCorrect ? 1 : 0));

      if (quizIndex < quizData.length - 1) {
        setQuizIndex(quizIndex + 1);
      } else {
        setQuizCompleted(true);  // 마지막 문제 완료 시
        submitAllAnswers();      // 서버에 전체 퀴즈 결과 제출
      }
    } else {
      Alert.alert("알림", "옵션을 선택하세요.");
    }
  };

  const submitAllAnswers = async () => {
    const quizResults = quizData.map((quiz, index) => ({
      quizId: index + 1,
      userId: 1,  // 임시 사용자 ID
      selectedOption: selectedOptions[index],
      isCorrect: selectedOptions[index] === quiz.answer,
    }));

    try {
      await createRecord(quizResults);  // 전체 퀴즈 결과 서버에 저장
      Alert.alert(
        "퀴즈 완료",
        `총 ${correctCount}개 맞았습니다!`,
        [{ text: "확인", onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('퀴즈 결과 저장 중 오류 발생:', error);
      Alert.alert("오류", "퀴즈 결과를 저장하는 데 문제가 발생했습니다.");
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

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
                isSelected={selectedOptions[quizIndex] === index}
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
