import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import Icon from "react-native-vector-icons/FontAwesome";

import HeaderLogo from "../assets/images/headerLogo.png";
import RecordContainer from "../components/RecordContainer";

const recordQuestions = [
  //기록 질문 목록
  "최근에 이룬 가장 큰 성취는 무엇인가요? 이를 어떻게 달성했나요?",
  "실패를 경험했을 때 어떻게 대처하나요?",
  "스트레스를 관리하는 방법에 대해 어떤 생각이 있나요?",
  "자신의 감정과 생각을 인식하고 이해하는 방법이 있나요?",
  "과거에 내린 중요한 결정 중 하나를 되돌아보고, 다른 선택을 했다면 결과가 어떻게 달라졌을지 생각해보세요.",
  "스트레스를 받을 때 어떤 신체적, 감정적 반응을 경험하나요?",
  "어려운 상황에서 스스로를 격려하는 방법은 무엇인가요?",
  "최근에 느꼈던 감정 중 가장 강렬했던 것은 무엇인가요? 그 감정이 일어난 원인은 무엇이었나요?",
  "목표를 설정할 때 어떤 기준을 사용하나요?",
  "실패를 통해 배운 중요한 교훈은 무엇인가요?",
  "자신의 강점과 약점을 어떻게 인식하고 있나요?",
  "하루 중 가장 생산적인 시간대는 언제인가요? 그 이유는 무엇인가요?",
  "타인의 피드백을 어떻게 받아들이고 활용하나요?",
  "새로운 정보를 학습할 때 어떤 방법이 가장 효과적인가요?",
  "일과 삶의 균형을 유지하는 데 어떤 전략을 사용하나요?",
  "부정적인 생각이 들 때 이를 어떻게 전환하나요?",
  "현재의 생활에서 가장 만족스러운 부분은 무엇인가요?",
  "장기적인 목표를 설정할 때 어떤 과정이 필요하다고 생각하나요?",
  "결정적인 순간에 자신감을 유지하기 위한 방법은 무엇인가요?",
  "실패했을 때 자기 자신을 위로하는 방법은 무엇인가요?",
  "자신의 한계를 인식하고 이를 극복하기 위한 방법은 무엇인가요?",
  "일상생활에서 작은 성취를 축하하는 방법은 무엇인가요?",
  "중요한 결정을 내릴 때 고려해야 할 요소는 무엇인가요?",
  "현재의 직업이나 활동이 자신의 가치와 얼마나 일치하나요?",
  "자신의 행동이 타인에게 미치는 영향을 어떻게 평가하나요?",
  "반복적으로 발생하는 문제에 대해 어떤 해결책을 찾고 있나요?",
  "자신에게 동기부여를 주는 요인은 무엇인가요?",
  "자신의 스트레스 원인을 파악하는 방법은 무엇인가요?",
  "팀 작업 시 자신의 역할을 어떻게 인식하나요?",
  "부정적인 피드백을 받았을 때 어떻게 반응하나요?",
  "시간 관리를 효율적으로 하기 위한 전략은 무엇인가요?",
  "미래의 자신에게 해주고 싶은 조언은 무엇인가요?",
  "자신의 감정을 타인에게 어떻게 표현하나요?",
  "평소에 어떤 방식으로 자기 성찰을 하나요?",
  "자신이 중요하게 여기는 가치는 무엇인가요?",
  "성공을 정의하는 기준은 무엇인가요?",
  "감정적으로 힘든 상황에서 도움을 요청하는 방법은 무엇인가요?",
  "자신의 감정이 타인과의 관계에 어떻게 영향을 미치는지 생각해보세요.",
  "일과 중단기 목표의 중요성을 어떻게 인식하고 있나요?",
  "자신에게 맞는 휴식 방법을 찾기 위해 어떤 노력을 기울이나요?",
  "다른 사람의 감정을 이해하고 공감하는 방법은 무엇인가요?",
  "자기 주도 학습을 위해 어떤 계획을 세우나요?",
  "실패나 좌절을 극복하는 데 필요한 자원은 무엇인가요?",
];

export default function AddRecordPage({ navigation }) {
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const handleLogoPress = () => {
    navigation.navigate("MainPage");
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });

    //랜덤으로 3가지 질문 추출
    const shuffledQuestions = recordQuestions.sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffledQuestions.slice(0, 3));
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.customHeader}>
        <HeaderBackButton
          onPress={() => navigation.goBack()}
          tintColor="#ffffff"
        />
      </View>
      <TouchableOpacity onPress={handleLogoPress} style={styles.logoContainer}>
        <Image source={HeaderLogo} style={styles.headerLogo} />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={[
          styles.scrollViewContent,
          { alignItems: "center" },
        ]}
        style={styles.container}
      >
        {selectedQuestions.map((question, index) => (
          <RecordContainer key={index} text={question} />
        ))}
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
  },
  logoContainer: {
    alignItems: "center",
  },
  headerLogo: {
    width: "70%",
    height: 100,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});
