import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  ActivityIndicator,
} from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import SubmitButton from "../components/SubmitButton";
import axios from "axios";
import { questionList, choiceList } from "../components/GameElements";
import HeaderLogo from "../assets/images/headerLogo.png";
import gameStates01 from "../assets/images/gameStates01.png";
import gameStates02 from "../assets/images/gameStates02.png";
import gameStates03 from "../assets/images/gameStates03.png";
import gameStates04 from "../assets/images/gameStates04.png";

const FLASK_API_URL = "http://10.106.1.162:5000/game-result";

export default function GamePage({ navigation }) {
  const [age, setAge] = useState(8);
  const [stats, setStats] = useState({
    health: 50,
    stress: 50,
    relationships: 50,
    money: 50,
  });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState("응답이 없습니다.");
  const [loading, setLoading] = useState(false);
  const [introStep, setIntroStep] = useState(1); // 상태 추가

  const handleLogoPress = () => {
    navigation.navigate("MainPage");
  };

  const handleNextIntroStep = () => {
    setIntroStep(introStep + 1);
  };

  const handleGameStart = () => {
    setGameStarted(true);
  };

  const checkGameOver = (newStats, newAge) => {
    if (
      newStats.health <= 0 ||
      newStats.health >= 100 ||
      newStats.stress <= 0 ||
      newStats.stress >= 100 ||
      newStats.relationships <= 0 ||
      newStats.relationships >= 100 ||
      newStats.money <= 0 ||
      newStats.money >= 100 ||
      newAge >= 80
    ) {
      setGameOver(true);
    }
  };

  useEffect(() => {
    if (gameOver) {
      sendGameResult(stats, age);
    }
  }, [gameOver]);

  const sendGameResult = async (finalStats, finalAge) => {
    setLoading(true); // API 요청 전에 로딩 시작
    try {
      const gameResult = {
        message: {
          age: finalAge,
          health: finalStats.health,
          stress: finalStats.stress,
          relationships: finalStats.relationships,
          money: finalStats.money,
        },
      };

      const res = await fetch(FLASK_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gameResult),
      });

      const data = await res.json();
      setFeedback(data.reply);
    } catch (error) {
      console.error("Error:", error);
      setFeedback("Error connecting to server.");
    } finally {
      setLoading(false); // API 요청 후 로딩 종료
    }
  };

  useEffect(() => {
    console.log("AI 피드백:", feedback); // 피드백을 콘솔에 출력
  }, [feedback]); // feedback이 변경될 때마다 실행

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
        {!gameStarted && introStep === 1 && (
          <View style={styles.gameScreen}>
            <Text style={styles.questionText}>
              <Text style={styles.boldText}>
                인간은 태초부터 선택의 연속 속에 존재해왔습니다.
              </Text>
              {"\n"}
              매일 아침 눈을 뜨고 나서부터 밤이 찾아오는 순간까지, 우리는 수많은
              길을 마주하며{"\n"}그 중 하나를 선택합니다. 이 선택들은 단순히
              나의 현재를 결정짓는 것이 아니라,{"\n"}
              <Text style={styles.boldText}>
                무한한 가능성이 얽힌 새로운 세계의 문을 열어줍니다.
              </Text>
              {"\n"}
              {"\n"}이 게임은 당신의 선택이 어떤 사람을 만들어내고,{"\n"}그
              선택이 당신의 삶에 어떤 결과를 가져오는지를 탐험하는 여정입니다.
              {"\n"}각 선택은 마치 나비의 날갯짓처럼,{"\n"}
              당신의 삶을 향한 새로운 경로를 만들어냅니다.{"\n"}
              {"\n"}
              <Text style={styles.boldText}>
                당신은 지금 이 순간, 자신이 누구인지 다시 묻게 될 것입니다.
              </Text>
              {"\n"}
              {"\n"}
              <Text style={styles.boldText}>
                선택은 당신의 정체성을 형성하는 원초적인 힘이며,
              </Text>
              {"\n"}그 결과는 당신이 어떤 존재로 남게 될지를 결정짓습니다.{"\n"}
              {"\n"}
              우리는 모두 각기 다른 세상에 살고 있으며, 당신의 선택은 그 세상을
              더욱 다채롭게 만들 것입니다.{"\n"}
              <Text style={styles.boldText}>
                깊이 생각하고 신중하게 선택하십시오.
              </Text>
              {"\n"}그 선택이 어떤 삶의 경로를 열어줄지, 그것이 바로 당신의
              이야기입니다.{"\n"}
              {"\n"}
              <Text style={styles.boldText}>
                이제, 당신의 여정을 시작할 시간입니다.
                {"\n"}
                어떤 선택을 하시겠습니까?
              </Text>
            </Text>
            <SubmitButton onPress={handleNextIntroStep} text="다음으로" />
          </View>
        )}

        {!gameStarted && introStep === 2 && (
          <View style={styles.gameScreen}>
            <Text style={styles.questionText}>
              <Text style={styles.boldText}>게임 설명</Text>
              {"\n"}
              {"\n"}이 게임은 선택을 통해 나의 삶의 경로와 결과를 경험하는
              시뮬레이션입니다. 각 선택은 나의 건강, 스트레스, 대인 관계, 자본
              등 인생의 핵심 요소에 영향을 미치며, 신중한 결정이 요구됩니다.
              아래는 각 스탯의 역할과 게임 종료 기준에 대한 설명입니다.
              {"\n"}
              {"\n"}
              <Text style={styles.boldText}>1. 건강 (Health)</Text>
              {"\n"}
              건강은 삶의 지속 가능성을 상징하는 지표입니다. 0에 가까워질수록
              신체적 한계에 도달하게 되고, 반대로 100에 다다를 경우 과도한
              부담으로 신체가 손상될 위험이 커집니다.{"\n"}
              <Text style={styles.boldText}>
                건강이 0 이하 또는 100 이상일 경우, 신체는 더 이상 생존할 수
                없으며 게임이 종료됩니다.
              </Text>
              {"\n"}
              {"\n"}
              <Text style={styles.boldText}>2. 스트레스 (Stress)</Text>
              {"\n"}
              스트레스는 삶의 압박과 정신적 부담을 나타내는 지표입니다.
              스트레스가 100에 가까워질수록 정신적 안정과 행복을 유지하기
              어려워지며, 건강에 심각한 영향을 미칩니다.{"\n"}
              <Text style={styles.boldText}>
                스트레스가 0 이하 또는 100 이상일 경우, 정신적 한계에 도달하여
                게임이 종료됩니다.
              </Text>
              {"\n"}
              {"\n"}
              <Text style={styles.boldText}>3. 대인 관계 (Relationships)</Text>
              {"\n"}
              대인 관계는 사회적 지지와 정서적 안정의 척도입니다. 관계가 0에
              가깝다면 고립 상태에 빠지며, 100에 가까우면 인간관계의 불균형이
              발생하여 갈등이나 부담을 초래할 수 있습니다.{"\n"}
              <Text style={styles.boldText}>
                대인 관계가 0 이하 또는 100 이상이 될 경우, 고립이나 과도한
                갈등으로 인해 게임이 종료됩니다.
              </Text>
              {"\n"}
              <Text style={styles.boldText}>4. 자본 (Money)</Text>
              {"\n"}
              자본은 삶의 경제적 안정을 나타내는 지표입니다. 자본이 0에 가까우면
              생존을 위한 필수 자원이 부족하게 되고, 반대로 100에 도달할 경우
              과도한 재정 관리에 따른 스트레스와 혼란이 발생할 수 있습니다.
              {"\n"}
              <Text style={styles.boldText}>
                자본이 0 이하 또는 100 이상일 경우, 생존 불가능 상태에 도달하여
                게임이 종료됩니다.
              </Text>
              {"\n"}
              {"\n"}
              <Text style={styles.boldText}>5. 연령 (Age)</Text>
              {"\n"}
              연령은 플레이어의 인생 단계와 삶의 진행을 상징합니다. 연령이
              80세에 도달하면, 자연스러운 인생의 마무리로서 게임이 종료됩니다.
              {"\n"}
              <Text style={styles.boldText}>
                연령이 80세에 도달할 경우, 인생의 여정이 끝나며 게임이
                종료됩니다.
              </Text>
              {"\n"}
              {"\n"}
              <Text style={styles.boldText}>
                이와 같은 기준을 통해, 당신의 선택이 어떤 방향으로 나아가고
                있는지 주기적으로 확인하고, 각 요소의 균형을 유지하며 여정을
                계속하십시오. 선택의 결과에 따라 삶의 질이 변화하고, 이를 통해
                당신의 이야기를 만들어 나가게 될 것입니다.
              </Text>
            </Text>
            <SubmitButton onPress={handleGameStart} text="게임 시작하기" />
          </View>
        )}

        {gameStarted && (
          <>
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
          </>
        )}

        {gameStarted && !gameOver && (
          <View style={styles.gameScreen}>
            <Text style={styles.response}>{questionList[questionIndex]}</Text>
          </View>
        )}

        {gameOver ? (
          <View style={styles.gameScreen}>
            <Text style={styles.responseTitle}>AI 피드백:</Text>
            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#0000ff" />
                <Text style={styles.response}>응답 생성 중입니다...</Text>
              </View>
            ) : (
              <>
                <Text style={styles.response}>{feedback}</Text>
                <SubmitButton
                  onPress={() => navigation.navigate("MainPage")}
                  text="확인"
                />
              </>
            )}
          </View>
        ) : (
          gameStarted && (
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
          )
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
    lineHeight: 24,
    color: "#333333",
  },
  boldText: {
    fontWeight: "bold",
    color: "#000000",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "space-around",
  },
  responseTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  response: {
    fontSize: 16,
    marginTop: 10,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
});
