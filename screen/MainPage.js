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
import Icon from "react-native-vector-icons/FontAwesome";
import HeaderLogo from "../assets/images/headerLogo.png";
import LogoutButton from "../components/LogoutButton";

export default function MainPage({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);

  // 앱이 로드될 때 username를 확인하여 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = async () => {
      const username = await SecureStore.getItemAsync("username"); // SecureStore 사용
      if (!username) {
        // username가 없으면 로그인 페이지로 이동
        navigation.reset({
          index: 0,
          routes: [{ name: "LoginPage" }],
        });
      } else {
        setIsLoading(false); // username가 있으면 로딩을 끝내고 화면 렌더링
      }
    };

    checkLoginStatus();
  }, [navigation]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  if (isLoading) {
    // 로딩 중일 때 로딩 표시기를 보여줌
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8881EA" />
      </View>
    );
  }

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
      <TouchableOpacity onPress={handleChatbotPress} style={styles.chatbotButton}>
        <Icon name="comment" size={30} color="#000" />
      </TouchableOpacity>

      {/* 좌하단 로그아웃 버튼 추가 */}
      <LogoutButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0F35",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    borderRadius: 20, // 더 부드러운 둥근 모서리
    width: "85%",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2, // 그림자 강도 증가
    shadowRadius: 10,
    elevation: 5,
    alignItems: "center",
    marginBottom: 40,
    alignSelf: "center", // 중앙 정렬
    marginTop: 20, // 상단 마진 추가
  },
  testTitle: {
    fontSize: 22, // 제목 크기 증가
    fontWeight: "700", // 볼드체
    color: "#333",
    marginBottom: 10,
    textAlign: "center", // 텍스트 중앙 정렬
  },
  testDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 24, // 줄 높이 조정
  },
  testButton: {
    backgroundColor: "#8881EA", // 버튼 배경 색상
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25, // 둥근 버튼
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
    justifyContent: "space-around", // 공간 균형 조정
    alignItems: "center",
    marginTop: 20,
  },
  iconButton: {
    width: "40%", // 아이콘 버튼 크기 조정
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