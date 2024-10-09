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

// 게임 요소 가져오기
import { questionList, choiceList } from "../components/GameElements";

import HeaderLogo from "../assets/images/headerLogo.png";
import gameStates01 from "../assets/images/gameStates01.png";
import gameStates02 from "../assets/images/gameStates02.png";
import gameStates03 from "../assets/images/gameStates03.png";
import gameStates04 from "../assets/images/gameStates04.png";

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
    // 선택한 옵션에 따라 스탯을 변화시킴
    const statChange = choiceList[questionIndex].statChanges[choice - 1];

    const newStats = {
      health: stats.health + statChange.health,
      stress: stats.stress + statChange.stress,
      relationships: stats.relationships + statChange.relationships,
      money: stats.money + statChange.money,
    };

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
              인간은 태초부터 선택의 연속 속에 존재해왔습니다.
              <br />
              매일 아침 눈을 뜨고 나서부터 밤이 찾아오는 순간까지, 우리는 수많은
              길을 마주하며
              <br />
              그 중 하나를 선택합니다. 이 선택들은 단순히 나의 현재를 결정짓는
              것이 아니라,
              <br />
              무한한 가능성이 얽힌 새로운 세계의 문을 열어줍니다.
              <br /> <br />
              이 게임은 당신의 선택이 어떤 사람을 만들어내고,
              <br />
              그 선택이 당신의 삶에 어떤 결과를 가져오는지를 탐험하는
              여정입니다.
              <br />
              각 선택은 마치 나비의 날갯짓처럼, 당신의 삶을 향한 새로운 경로를
              만들어냅니다.
              <br />
              이 길들은 때로는 험난한 산맥처럼 다가오고,
              <br />
              때로는 잔잔한 평원처럼 느껴질 것입니다.
              <br /> <br />
              당신은 지금 이 순간, 자신이 누구인지 다시 묻게 될 것입니다.
              <br />
              이 선택의 등반가가 되어, 다양한 결과로 가득한 생의 여정을
              탐험하십시오.
              <br />
              선택은 당신의 정체성을 형성하는 원초적인 힘이며,
              <br />
              그 결과는 당신이 어떤 존재로 남게 될지를 결정짓습니다.
              <br />
              우리는 모두 각기 다른 세상에 살고 있으며,
              <br />
              당신의 선택은 그 세상을 더욱 다채롭게 만들 것입니다.
              <br />
              그러므로 깊이 생각하고 신중하게 선택하십시오.
              <br />
              그 선택이 어떤 삶의 경로를 열어줄지, 그것이 바로 당신의
              이야기입니다.
              <br /> <br />
              이제, 당신의 여정을 시작할 시간입니다. 어떤 선택을 하시겠습니까?
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
          ) : (
            // 선택지 렌더링
            <View>
              <SubmitButton
                onPress={() => handleChoice(1)}
                text={`선택 1: ${choiceList[questionIndex].choices[0]}`}
              />
              <SubmitButton
                onPress={() => handleChoice(2)}
                text={`선택 2: ${choiceList[questionIndex].choices[1]}`}
              />
            </View>
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
    textAlign: "left",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "space-around",
  },
});
