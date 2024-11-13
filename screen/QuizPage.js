import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderLogo from '../assets/images/headerLogo.png';

const QuizPage = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isCorrect, setIsCorrect] = useState(null); // 정답 여부 저장

  const quizData = [
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

  useEffect(() => {
    // quizData에서 5개의 질문을 랜덤으로 선택
    const shuffledQuestions = quizData.sort(() => 0.5 - Math.random()).slice(0, 5);
    setQuestions(shuffledQuestions);
  }, []);

  const handleAnswerSelection = (index) => {
    setSelectedAnswer(index);
  };
  

  const handleSubmit = () => {
    if (selectedAnswer === null) return; // 답변이 선택되지 않은 경우

    const isAnswerCorrect = selectedAnswer === questions[currentQuestionIndex].answer;
    setIsCorrect(isAnswerCorrect);
    
    if (isAnswerCorrect) {
      setScore((prevScore) => prevScore + 1);
      setModalMessage('정답입니다!');
    } else {
      setModalMessage(`틀렸습니다! 정답은: ${questions[currentQuestionIndex].options[questions[currentQuestionIndex].answer]}`);
    }

    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setIsCorrect(null); // 다음 질문으로 넘어갈 때 정답 여부 초기화
    } else {
      // 모든 질문이 끝났을 경우
      setModalMessage(`퀴즈가 끝났습니다! ${questions.length}개 중 ${score}개 맞추셨습니다!`);
      setModalVisible(true);
    }
  };

  const handleRetry = () => {
    const shuffledQuestions = quizData.sort(() => 0.5 - Math.random()).slice(0, 5);
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setModalVisible(false);
    setSelectedAnswer(null); // 선택한 답변 초기화
    setIsCorrect(null); // 정답 여부 초기화
  };

  return (
    <View style={styles.container}>
      <Image source={HeaderLogo} style={styles.logo} />
      {questions.length > 0 && currentQuestionIndex < questions.length ? (
        <View style={styles.questionContainer}>
          <Text style={styles.question}>
            퀴즈 {currentQuestionIndex + 1}: {questions[currentQuestionIndex].question}
          </Text>
         {questions[currentQuestionIndex].options.map((option, index) => {
  let buttonStyle = styles.optionButton;

  // 선택된 버튼의 스타일을 업데이트
  if (selectedAnswer === index) {
    buttonStyle = styles.selectedButton; // 선택된 버튼은 흰색으로 표시
  }

  return (
    <TouchableOpacity
      key={index}
      style={buttonStyle}
      onPress={() => handleAnswerSelection(index)} // 선택한 답변을 업데이트
    >
      <Text style={styles.optionButtonText}>{option}</Text>
    </TouchableOpacity>
  );
})}


        </View>
      ) : (
        <Text>문제가 없습니다.</Text>
      )}

      <View style={styles.checkButtonContainer}>
        <TouchableOpacity style={styles.checkButton} onPress={handleSubmit}>
          <Text style={styles.checkButtonText}>제출하기</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalMessage}>{modalMessage}</Text>
          {modalMessage.includes('퀴즈가 끝났습니다') ? (
            <>
              <TouchableOpacity onPress={handleRetry} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>다시 풀기</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('MainPage')} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>메인으로</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity onPress={handleCloseModal} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>확인</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0F35",
    padding: 20,
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  questionContainer: {
    marginBottom: 30, // 질문과 버튼 사이 간격
  },
  question: {
    fontSize: 24,
    marginBottom: 15, // 질문 아래 간격
    color: '#FFFFFF',
  },
  optionButton: {
    backgroundColor: "#8881EA",
    paddingVertical: 20,
    borderRadius: 25, // 둥근 버튼 모양
    alignItems: "center",
    marginBottom: 25, // 보기 버튼 간 간격
    width: "120px",
  },
  selectedButton: {
    backgroundColor: "#FFFFFF", // 선택한 버튼 색상 흰색
    paddingVertical: 20,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 25,
    width: "120px",
  },
  checkButtonContainer: {
    position: 'absolute',
    bottom: 50,
    width: "70%",

  },
  checkButton: {
    backgroundColor: "#8881EA",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  checkButtonText: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // 반투명 배경
  },
  modalMessage: {
    fontSize: 24,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#8881EA",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
  },
  modalButtonText: {
    fontSize: 20,
    color: "#FFFFFF",
  },
});

export default QuizPage;
