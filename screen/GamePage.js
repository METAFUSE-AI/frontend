import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import SubmitButton from "../components/SubmitButton";
import axios from "axios";

import HeaderLogo from "../assets/images/headerLogo.png";
import gameStates01 from "../assets/images/gameStates01.png";
import gameStates02 from "../assets/images/gameStates02.png";
import gameStates03 from "../assets/images/gameStates03.png";
import gameStates04 from "../assets/images/gameStates04.png";

// 질문 리스트
const questionList = [
  "당신은 8세입니다. 학교에서 친구와 다툼이 있었습니다.",
  "당신은 14세입니다. 중학교 2학년 때 어떤 동아리에 들고 싶습니까?",
  "당신은 20세입니다. 대학 생활을 어떻게 보내고 싶습니까?",
  "당신은 30세입니다. 직장에서 승진 기회가 생겼습니다.",
];

// 선택지 리스트
const choiceList = [
  ["대화로 해결한다", "무시하고 지나간다"],
  ["운동 동아리에 든다", "음악 동아리에 든다"],
  ["공부에 전념한다", "다양한 활동에 참여한다"],
  ["직장 상사에게 조언을 구한다", "자신의 방식대로 한다"],
];

export default function GamePage({ navigation }) {
  const [age, setAge] = useState(8); // 사용자 나이
  const [stats, setStats] = useState({
    health: 50, // ❤️
    stress: 50, // 😰
    relationships: 50, // 👥
    money: 50, // 💰
  });
  const [questionIndex, setQuestionIndex] = useState(0); // 질문 리스트에서 현재 질문 인덱스 관리
  const [gameStarted, setGameStarted] = useState(false); // 게임 시작 여부
  const [gameOver, setGameOver] = useState(false); // 게임 종료 여부
  const [feedback, setFeedback] = useState(""); // AI 피드백
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleLogoPress = () => {
    navigation.navigate("MainPage");
  };

  const handleGameStart = () => {
    setGameStarted(true); // 게임 시작 상태로 변경
  };

  const checkGameOver = (newStats, newAge) => {
    if (
      newStats.health <= 0 ||
      newStats.stress <= 0 ||
      newStats.relationships <= 0 ||
      newStats.money <= 0 ||
      newAge >= 80
    ) {
      setGameOver(true);

      // AI 피드백 제공 (예시)
      let result = "당신의 인생 여정은 끝났습니다.\n";
      if (newStats.health <= 0)
        result += "건강이 부족하여 어려움이 있었습니다.\n";
      if (newStats.stress <= 0)
        result += "스트레스가 너무 높아 문제가 생겼습니다.\n";
      if (newStats.relationships <= 0)
        result += "대인 관계가 악화되었습니다.\n";
      if (newStats.money <= 0) result += "재정적으로 어려움을 겪었습니다.\n";
      if (newAge >= 80) result += "80세까지 열심히 살아왔습니다.";

      setFeedback(result); // 피드백 업데이트
    }
  };

  const aiFeedBack = async () => {
    // ai 피드백을 받아오는 함수
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("http://localhost:5000/chat", {
        message: input,
      });

      const botMessage = { sender: "bot", text: response.data.reply };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("Error sending message: ", error);
    }

    setInput("");
  };

  const handleChoice = (choice) => {
    let newStats;

    // 선택지에 따른 스탯 변화 로직
    if (choice === 1) {
      newStats = {
        ...stats,
        health: stats.health - 5,
        stress: stats.stress + 5,
      };
    } else {
      newStats = {
        ...stats,
        health: stats.health + 5,
        stress: stats.stress - 5,
      };
    }

    const newAge = age + 1;

    // 스탯 업데이트 및 게임 종료 체크
    setStats(newStats);
    setAge(newAge);
    setQuestionIndex((prevIndex) => prevIndex + 1);

    // 게임 종료 여부 확인
    checkGameOver(newStats, newAge);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
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
        style={styles.scrollView}
      >
        <View style={styles.gameAge}>
          <Text style={styles.ageText}>나이: {age}세</Text>
        </View>

        <View style={styles.gameStates}>
          <View>
            {/* 게임 상태 - 건강 */}
            <Image style={styles.stateImg} source={gameStates01} />
            <Text style={styles.stateText}>{stats.health}</Text>
          </View>
          <View>
            {/* 게임 상태 - 스트레스 */}
            <Image style={styles.stateImg} source={gameStates02} />
            <Text style={styles.stateText}>{stats.stress}</Text>
          </View>
          <View>
            {/* 게임 상태 - 대인 관계 */}
            <Image style={styles.stateImg} source={gameStates03} />
            <Text style={styles.stateText}>{stats.relationships}</Text>
          </View>
          <View>
            {/* 게임 상태 - 돈 */}
            <Image style={styles.stateImg} source={gameStates04} />
            <Text style={styles.stateText}>{stats.money}</Text>
          </View>
        </View>

        <View style={styles.gameScreen}>
          {!gameStarted ? (
            <Text style={styles.questionText}>
              인생이라는 산을 오르는 등반가가 되어 정상에 도달하세요.
            </Text>
          ) : gameOver ? (
            // 게임 종료 시 AI 피드백 출력
            <Text style={styles.questionText}>{aiFeedBack}</Text>
          ) : (
            <Text style={styles.questionText}>
              {questionList[questionIndex]}
            </Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          {!gameStarted ? (
            // 게임 시작 버튼
            <SubmitButton onPress={handleGameStart} text="게임 시작하기" />
          ) : gameOver ? (
            // 게임 종료 시 확인 버튼 (MainPage로 이동)
            <SubmitButton
              onPress={() => navigation.navigate("MainPage")}
              text="확인"
            />
          ) : // 선택지 렌더링 전에 선택지 배열이 존재하는지 확인
          choiceList[questionIndex] ? (
            <View>
              <SubmitButton
                onPress={() => handleChoice(1)}
                text={`선택 1: ${choiceList[questionIndex][0]}`}
              />
              <SubmitButton
                onPress={() => handleChoice(2)}
                text={`선택 2: ${choiceList[questionIndex][1]}`}
              />
            </View>
          ) : (
            // 선택지가 없을 경우 예외 처리
            <Text style={styles.questionText}>선택지가 없습니다.</Text>
          )}
        </View>
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
  },
  scrollView: {
    flex: 1,
  },
  gameAge: {
    marginTop: "5%",
    backgroundColor: "#ffffff",
    width: "30%",
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  ageText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  gameStates: {
    marginTop: "5%",
    backgroundColor: "#ffffff",
    width: "80%",
    padding: 10,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  stateImg: {
    width: 40,
    height: 40,
  },
  stateText: {
    marginTop: 5,
    fontSize: 16,
    textAlign: "center",
  },
  gameScreen: {
    marginTop: "5%",
    marginBottom: "5%",
    backgroundColor: "#ffffff",
    width: "80%",
    padding: 20,
    borderRadius: 30,
    alignItems: "center",
  },
  questionText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "space-around",
  },
});
