import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Alert, ScrollView, Image, TouchableOpacity } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import SubmitButton from "../components/SubmitButton";
import OptionButton from "../components/OptionButton";

import HeaderLogo from "../assets/images/headerLogo.png";

// Example Quiz Data
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
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
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
