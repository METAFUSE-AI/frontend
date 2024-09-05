import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Alert, ScrollView, Image, TouchableOpacity } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements"; // HeaderBackButton 임포트
import SubmitButton from "../components/SubmitButton"; // SubmitButton 컴포넌트 임포트
import OptionButton from "../components/OptionButton"; // OptionButton 컴포넌트 임포트

import HeaderLogo from "../assets/images/headerLogo.png"; // HeaderLogo 이미지 임포트
import { fetchRandomQuizzes, getQuestionsByQuizId, getAnswersByQuizId } from '../components/ApiUtilsi'; // API 호출 함수 임포트

export default function QuizPage({ navigation }) {
  const [quizzes, setQuizzes] = useState([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const data = await fetchRandomQuizzes();
        // 데이터 형식 확인
        console.log('Fetched quizzes:', data);
        if (Array.isArray(data) && data.length > 0) {
          setQuizzes(data);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error('Failed to load quizzes:', error.message);
        Alert.alert("알림", "퀴즈를 불러오는 중 오류가 발생했습니다.");
      }
    };

    loadQuizzes();
  }, []);

  const handleOptionPress = (index) => {
    setSelectedOption(index);
  };

  const handleSubmit = async () => {
    if (selectedOption !== null) {
      try {
        const quiz = quizzes[quizIndex];
        if (!quiz || !quiz.quizId) {
          throw new Error('Invalid quiz data');
        }

        const questions = await getQuestionsByQuizId(quiz.quizId);
        const answers = await getAnswersByQuizId(quiz.quizId);

        // 질문과 답변 데이터 확인
        console.log('Fetched questions:', questions);
        console.log('Fetched answers:', answers);

        const correctAnswer = answers.find(answer => answer.correct);
        const isCorrect = selectedOption === correctAnswer?.answerId;
        setCorrectCount(prevCount => prevCount + (isCorrect ? 1 : 0));

        if (quizIndex < quizzes.length - 1) {
          setQuizIndex(quizIndex + 1);
          setSelectedOption(null);
        } else {
          setQuizCompleted(true);
        }
      } catch (error) {
        console.error('Error handling submit:', error.message);
        Alert.alert("알림", "제출 처리 중 오류가 발생했습니다.");
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

  if (quizzes.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.questionText}>퀴즈를 불러오는 중입니다...</Text>
      </View>
    );
  }

  const isLastQuestion = quizIndex === quizzes.length - 1;

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
            <Text style={styles.questionText}>{quizzes[quizIndex].question}</Text>
            {quizzes[quizIndex].options.map((option, index) => (
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
