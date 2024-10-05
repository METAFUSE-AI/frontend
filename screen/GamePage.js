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

  const handleLogoPress = () => {
    navigation.navigate("MainPage");
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
          <Text style={styles.questionText}></Text>
        </View>
        <View style={styles.buttonContainer}>
          <SubmitButton onPress={() => {}} text="게임 시작하기" />
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
