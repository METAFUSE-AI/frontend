// QuizResultPage.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { HeaderBackButton } from "@react-navigation/elements";
import HeaderLogo from "../assets/images/headerLogo.png";

const QuizResultPage = ({ route, navigation }) => {
  const { correctCount, totalCount } = route.params; // 전달받은 매개변수

  const handleRetakeQuiz = () => {
    navigation.navigate('QuizPage'); // 퀴즈 페이지로 다시 이동
  };

  const handleGoToMain = () => {
    navigation.navigate('MainPage'); // 메인 페이지로 이동
  };

  return (
    <View style={styles.container}>
      <View style={styles.customHeader}>
        <HeaderBackButton
          onPress={handleGoToMain} // 메인으로 돌아가기
          tintColor="#ffffff"
        />
      </View>
      <TouchableOpacity onPress={handleGoToMain} style={styles.logoContainer}>
        <Image source={HeaderLogo} style={styles.headerLogo} />
      </TouchableOpacity>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>퀴즈 완료!</Text>
        <Text style={styles.resultText}>맞춘 개수: {correctCount} / {totalCount}</Text>
        <TouchableOpacity style={styles.nextButton} onPress={handleRetakeQuiz}>
          <Text style={styles.buttonText}>다시 풀기</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={handleGoToMain}>
          <Text style={styles.buttonText}>메인으로</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0F35",
    paddingHorizontal: 20,
  },
  customHeader: {
    height: 50,
    justifyContent: "center",
    paddingLeft: 10,
    backgroundColor: "#0D0F35",
  },
  logoContainer: {
    alignItems: "center",
  },
  headerLogo: {
    width: "70%",
    height: 100,
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  resultText: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default QuizResultPage;
