import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Alert, ScrollView, Image, TouchableOpacity } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import SubmitButton from "../components/SubmitButton";
import OptionButton from "../components/OptionButton";
import HeaderLogo from "../assets/images/headerLogo.png";
import { fetchRandomQuizzes, createRecord } from "../components/ApiUtilsi"; // api 호출 임포트

export default function QuizPage({ navigation }) {
  const [quizData, setQuizData] = useState([]); // 퀴즈 데이터를 위한 상태
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    // 랜덤 퀴즈를 가져오는 API 호출
    const loadQuizzes = async () => {
      try {
        const quizzes = await fetchRandomQuizzes(10); // 10개 퀴즈 가져오기
        setQuizData(quizzes);
      } catch (error) {
        Alert.alert("오류", "퀴즈 데이터를 가져오는 데 실패했습니다.");
      }
    };

    loadQuizzes();
  }, []);

  const handleOptionPress = (index) => {
    setSelectedOption(index);
  };

  const handleSubmit = async () => {
    if (selectedOption !== null) {
      const isCorrect = selectedOption === quizData[quizIndex].answer;
      setCorrectCount((prevCount) => prevCount + (isCorrect ? 1 : 0));
      
      // 기록 생성
      await createRecord({
        quizId: quizData[quizIndex].id, // 퀴즈 ID를 사용하여 기록 생성
        selectedOption,
        isCorrect,
      });

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
      headerShown: false,
    });
  }, [navigation]);

  useEffect(() => {
    if (quizCompleted) {
      // 결과 페이지로 내비게이션
      navigation.navigate("QuizResultPage", {
        correctCount,
        totalQuestions: quizData.length,
      });
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
        {!quizCompleted && quizData.length > 0 && (
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
