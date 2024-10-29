// QuizResultPage.js
import React from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import HeaderLogo from "../assets/images/headerLogo.png";

const QuizResultPage = ({ route, navigation }) => {
  const { correctCount, totalQuestions } = route.params; // 퀴즈 결과에서 전달된 파라미터

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.logoContainer}>
        <Image source={HeaderLogo} style={styles.headerLogo} />
      </TouchableOpacity>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>
          총 {totalQuestions}문제 중 {correctCount}개 맞았습니다!
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("QuizPage")} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>다시 시작하기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0F35",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerLogo: {
    width: "70%",
    height: 100,
  },
  resultContainer: {
    alignItems: "center",
  },
  resultText: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default QuizResultPage;
