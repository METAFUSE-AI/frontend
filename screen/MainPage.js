import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import HeaderLogo from "../assets/images/headerLogo.png";

export default function MainPage({ navigation }) {
  const [username, setUsername] = useState(""); // username을 저장할 상태 추가
  
  const handleLogoPress = () => {
    navigation.navigate("MainPage");
  };

  const handleMyPagePress = () => {
    navigation.navigate("MyPage");
  };

  const handleRecordPress = () => {
    navigation.navigate("RecordPage");
  };

  const handleQuizPress = () => {
    navigation.navigate("QuizPage");
  };

  const handleGamePress = () => {
    navigation.navigate("GamePage");
  };

  const handleChatbotPress = () => {
    navigation.navigate("AiChatbot");
  };

  const handleTestPress = () => {
    navigation.navigate("TestPage");
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    const getUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem("username");
        if (storedUsername) {
          setUsername(storedUsername); // username 상태에 저장
        }
      } catch (error) {
        console.error("Error loading username from AsyncStorage:", error);
      }
    };

    getUsername();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false} // 스크롤바 숨기기
      >
        <View style={styles.customHeader}></View>
        <TouchableOpacity
          onPress={handleLogoPress}
          style={styles.logoContainer}
        >
          <Image source={HeaderLogo} style={styles.headerLogo} />
        </TouchableOpacity>

        {/* 항상 중앙에 위치하는 메타인지 테스트 섹션 */}
        <View style={styles.testContainer}>
          <Text style={styles.testTitle}>메타인지 테스트</Text>
          <Text style={styles.testDescription}>
            스스로에 대해 더 잘 알고 싶으신가요?{"\n"}
            그렇다면, 잠시 멈춰서 나 자신에게 {"\n"}몇 가지 질문을 던져보는 건
            어떨까요?
          </Text>
          <TouchableOpacity onPress={handleTestPress} style={styles.testButton}>
            <Text style={styles.testButtonText}>테스트 시작하기</Text>
          </TouchableOpacity>
        </View>

        {/* 아이콘 컨테이너 */}
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={handleMyPagePress}
            style={styles.iconButton}
          >
            <Icon name="user" size={60} color="#8881EA" />
            <Text style={styles.iconText}>마이페이지</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleRecordPress}
            style={styles.iconButton}
          >
            <Icon name="book" size={60} color="#8881EA" />
            <Text style={styles.iconText}>기록</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleQuizPress} style={styles.iconButton}>
            <Icon name="question-circle" size={60} color="#8881EA" />
            <Text style={styles.iconText}>퀴즈</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGamePress} style={styles.iconButton}>
            <Icon name="gamepad" size={60} color="#8881EA" />
            <Text style={styles.iconText}>게임</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={handleChatbotPress}
        style={styles.chatbotButton}
      >
        <Icon name="comment" size={30} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0F35",
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: "25%",
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
    marginVertical: 20,
  },
  headerLogo: {
    width: "80%",
    height: 100,
  },
  testContainer: {
    backgroundColor: "#FFFFFF",
    padding: 30,
    borderRadius: 20,
    width: "85%",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
    marginBottom: 40,
    alignSelf: "center",
    marginTop: 20,
  },
  testTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  testDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 24,
  },
  testButton: {
    backgroundColor: "#8881EA",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  testButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  iconContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
  },
  iconButton: {
    width: "40%",
    alignItems: "center",
    marginVertical: 15,
  },
  iconText: {
    color: "#FFFFFF",
    marginTop: 5,
    fontWeight: "500",
  },
  chatbotButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
});
