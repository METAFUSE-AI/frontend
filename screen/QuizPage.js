import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Alert, ScrollView, Image, TouchableOpacity } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements"; // HeaderBackButton 임포트
import SubmitButton from "../components/SubmitButton"; // SubmitButton 컴포넌트 임포트
import OptionButton from "../components/OptionButton"; // OptionButton 컴포넌트 임포트

import HeaderLogo from "../assets/images/headerLogo.png"; // HeaderLogo 이미지 임포트

const quizQuestions = [
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
  {
    question: "메타인지의 주요 요소는 무엇인가요?",
    options: [
      "A. 자기 모니터링",
      "B. 목표 설정",
      "C. 시간 관리",
      "D. 모두 해당",
    ],
    answer: 0, // 정답: A
  },
  {
    question: "메타인지의 이점은 무엇인가요?",
    options: [
      "A. 학습 효과 증진",
      "B. 스트레스 감소",
      "C. 기억력 향상",
      "D. 모두 해당",
    ],
    answer: 0, // 정답: A
  },
  {
    question: "효과적인 메타인지 학습을 위해 필요한 것은 무엇인가요?",
    options: [
      "A. 자기 반성",
      "B. 목표 설정",
      "C. 지속적 연습",
      "D. 모두 해당",
    ],
    answer: 0, // 정답: A
  },
  {
    question: "메타인지가 중요한 이유는 무엇인가요?",
    options: [
      "A. 자기 이해 증진",
      "B. 학습 전략 개발",
      "C. 사회적 상호작용",
      "D. 모두 해당",
    ],
    answer: 0, // 정답: A
  },
  {
    question: "메타인지 기술을 통해 성취할 수 있는 것은 무엇인가요?",
    options: [
      "A. 자기 주도적 학습",
      "B. 목표 달성",
      "C. 학습 능력 향상",
      "D. 모두 해당",
    ],
    answer: 0, // 정답: A
  },
  {
    question: "메타인지 학습에서의 자기 반성의 역할은 무엇인가요?",
    options: [
      "A. 개선 사항 도출",
      "B. 동기 부여",
      "C. 목표 확인",
      "D. 모두 해당",
    ],
    answer: 0, // 정답: A
  },
  {
    question: "메타인지적 질문의 예시는 무엇인가요?",
    options: [
      "A. 나는 무엇을 알고 있는가?",
      "B. 나는 어떻게 학습할 것인가?",
      "C. 내가 지금 무엇을 하고 있는가?",
      "D. 모두 해당",
    ],
    answer: 0, // 정답: A
  },
  {
    question: "메타인지 전략의 활용이 필요한 이유는 무엇인가요?",
    options: [
      "A. 문제 해결 시 유용",
      "B. 목표 달성 촉진",
      "C. 학습 동기 강화",
      "D. 모두 해당",
    ],
    answer: 0, // 정답: A
  },
  
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
  {
    question: "메타인지적 학습을 위한 중요한 요소는 무엇인가요?",
    options: [
      "A. 자기 평가",
      "B. 피드백 수용",
      "C. 동기 부여",
      "D. 모두 해당",
    ],
    answer: 1, // 정답: B
  },
  {
    question: "효과적인 메타인지 전략은 무엇인가요?",
    options: [
      "A. 계획 수립",
      "B. 실행 모니터링",
      "C. 결과 평가",
      "D. 모두 해당",
    ],
    answer: 1, // 정답: B
  },
  {
    question: "메타인지적 질문은 왜 중요한가요?",
    options: [
      "A. 자기 주도적 학습 촉진",
      "B. 기억력 향상",
      "C. 집중력 강화",
      "D. 모두 해당",
    ],
    answer: 1, // 정답: B
  },
  {
    question: "메타인지적 사고를 통해 얻는 것은 무엇인가요?",
    options: [
      "A. 자아 인식",
      "B. 비판적 사고",
      "C. 창의적 문제 해결",
      "D. 모두 해당",
    ],
    answer: 1, // 정답: B
  },
  {
    question: "메타인지 전략을 사용해야 하는 이유는 무엇인가요?",
    options: [
      "A. 학습 목표 달성",
      "B. 개인화된 학습 경로",
      "C. 문제 해결 능력 향상",
      "D. 모두 해당",
    ],
    answer: 1, // 정답: B
  },
  {
    question: "메타인지가 중요한 이유는 무엇인가요?",
    options: [
      "A. 효과적인 학습",
      "B. 자기 반성",
      "C. 지속적 성장",
      "D. 모두 해당",
    ],
    answer: 1, // 정답: B
  },
  {
    question: "메타인지의 요소 중 하나는 무엇인가요?",
    options: [
      "A. 목표 설정",
      "B. 계획 수립",
      "C. 문제 인식",
      "D. 모두 해당",
    ],
    answer: 1, // 정답: B
  },
  {
    question: "메타인지적 기술을 활용할 때의 이점은 무엇인가요?",
    options: [
      "A. 집중력 향상",
      "B. 문제 해결 능력 향상",
      "C. 학습 동기 강화",
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
  {
    question: "메타인지가 적용될 수 있는 분야는 무엇인가요?",
    options: [
      "A. 교육",
      "B. 비즈니스",
      "C. 일상생활",
      "D. 모두 해당",
    ],
    answer: 2, // 정답: C
  },
  {
    question: "메타인지 기술의 장점은 무엇인가요?",
    options: [
      "A. 자기 주도적 학습 촉진",
      "B. 성과 향상",
      "C. 정보 관리",
      "D. 모두 해당",
    ],
    answer: 2, // 정답: C
  },
  {
    question: "메타인지적 접근법의 예시는 무엇인가요?",
    options: [
      "A. 목표 설정",
      "B. 진행 상황 모니터링",
      "C. 결과 분석",
      "D. 모두 해당",
    ],
    answer: 2, // 정답: C
  },
  {
    question: "메타인지의 효과적인 활용을 위해 무엇이 필요할까요?",
    options: [
      "A. 지속적인 연습",
      "B. 목표 재설정",
      "C. 피드백 수용",
      "D. 모두 해당",
    ],
    answer: 2, // 정답: C
  },
  {
    question: "메타인지 전략의 예시는 무엇인가요?",
    options: [
      "A. 자기 모니터링",
      "B. 목표 재평가",
      "C. 과정 반성",
      "D. 모두 해당",
    ],
    answer: 2, // 정답: C
  },
  {
    question: "메타인지적 사고의 이점은 무엇인가요?",
    options: [
      "A. 자기 성장",
      "B. 스트레스 감소",
      "C. 학습 동기 향상",
      "D. 모두 해당",
    ],
    answer: 2, // 정답: C
  },
  {
    question: "메타인지에서의 피드백의 역할은 무엇인가요?",
    options: [
      "A. 개선 사항 도출",
      "B. 목표 달성 확인",
      "C. 자기 평가",
      "D. 모두 해당",
    ],
    answer: 2, // 정답: C
  },
  {
    question: "메타인지의 개념을 이해하는 것이 중요한 이유는 무엇인가요?",
    options: [
      "A. 학습 전략 개발",
      "B. 문제 해결 능력 향상",
      "C. 사회적 상호작용 향상",
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
  {
    question: "메타인지 전략을 사용하면 무엇을 얻을 수 있나요?",
    options: [
      "A. 집중력 향상",
      "B. 학습 능력 향상",
      "C. 문제 해결 능력 향상",
      "D. 모두 해당",
    ],
    answer: 3, // 정답: D
  },
  {
    question: "효과적인 메타인지 전략의 예시는 무엇인가요?",
    options: [
      "A. 계획 세우기",
      "B. 결과 분석",
      "C. 자기 평가",
      "D. 모두 해당",
    ],
    answer: 3, // 정답: D
  },
  {
    question: "메타인지적 질문이란 무엇인가요?",
    options: [
      "A. 학습 과정에 대한 질문",
      "B. 목표 확인 질문",
      "C. 결과 분석 질문",
      "D. 모두 해당",
    ],
    answer: 3, // 정답: D
  },
  {
    question: "메타인지의 활용이 필요한 이유는 무엇인가요?",
    options: [
      "A. 자기 주도적 학습 촉진",
      "B. 기억력 향상",
      "C. 사회적 상호작용 증진",
      "D. 모두 해당",
    ],
    answer: 3, // 정답: D
  },
  {
    question: "메타인지적 사고의 핵심 요소는 무엇인가요?",
    options: [
      "A. 자기 반성",
      "B. 비판적 사고",
      "C. 목표 설정",
      "D. 모두 해당",
    ],
    answer: 3, // 정답: D
  },
  {
    question: "메타인지의 적용 예시는 무엇인가요?",
    options: [
      "A. 교육 프로그램",
      "B. 자기 개발 계획",
      "C. 문제 해결 접근법",
      "D. 모두 해당",
    ],
    answer: 3, // 정답: D
  },
  {
    question: "메타인지가 학습에 미치는 영향은 무엇인가요?",
    options: [
      "A. 자기 주도적 학습",
      "B. 문제 해결 능력 향상",
      "C. 사회적 상호작용 강화",
      "D. 모두 해당",
    ],
    answer: 3, // 정답: D
  },
  {
    question: "메타인지적 접근의 장점은 무엇인가요?",
    options: [
      "A. 효과적인 학습",
      "B. 목표 설정",
      "C. 비판적 사고 강화",
      "D. 모두 해당",
    ],
    answer: 3, // 정답: D
  },
  {
    question: "메타인지의 활용으로 얻을 수 있는 것은 무엇인가요?",
    options: [
      "A. 자기 성장",
      "B. 감정 조절",
      "C. 대인 관계 개선",
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
