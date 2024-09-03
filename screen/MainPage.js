import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import HeaderLogo from "../assets/images/headerLogo.png";

export default function MainPage({ navigation }) {
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
    navigation.navigate("ChatbotPage");
  };

  const handleTestPress = () => {
    navigation.navigate("TestPage");
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={styles.scrollView}
      >
        <TouchableOpacity
          onPress={handleLogoPress}
          style={styles.logoContainer}
        >
          <Image source={HeaderLogo} style={styles.headerLogo} />
        </TouchableOpacity>
        <View style={styles.testContainer}>
          <Text style={styles.testTitle}>메타인지란?</Text>
          <Text style={styles.testDescription}>
            자신의 인지과정에 대한 이해와 통제를 의미합니다
          </Text>
          <TouchableOpacity onPress={handleTestPress} style={styles.testButton}>
            <Text style={styles.testButtonText}>테스트하러가기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={handleMyPagePress}
            style={styles.iconButton}
          >
            <Icon name="user" size={80} color="#fff" />
            <Text style={styles.iconText}>마이페이지</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleRecordPress}
            style={styles.iconButton}
          >
            <Icon name="book" size={80} color="#fff" />
            <Text style={styles.iconText}>기록</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleQuizPress} style={styles.iconButton}>
            <Icon name="question-circle" size={80} color="#fff" />
            <Text style={styles.iconText}>퀴즈</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGamePress} style={styles.iconButton}>
            <Icon name="gamepad" size={80} color="#fff" />
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
    flex: 1,
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  headerLogo: {
    width: "70%",
    height: 100,
  },
  testContainer: {
    backgroundColor: "#8881EA",
    padding: 20,
    width: "80%", // 가로 크기를 80%로 설정
    alignSelf: "center", // 중앙 정렬
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 60, // 4개의 버튼과 30px 이격
  },
  testTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  testDescription: {
    fontSize: 16,
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  testButton: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  testButtonText: {
    color: "#000",
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  iconButton: {
    width: "40%",
    alignItems: "center",
    margin: 10,
  },
  iconText: {
    color: "#FFFFFF",
    marginTop: 10,
  },
  chatbotButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
});
