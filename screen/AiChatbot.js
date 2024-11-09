import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  TextInput,
  Button,
  Text,
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { HeaderBackButton } from "@react-navigation/elements";
import HeaderLogo from "../assets/images/headerLogo.png";

const AiChatbot = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // 로고 클릭 시 메인 페이지로 이동
  const handleLogoPress = () => {
    navigation.navigate("MainPage");
  };

  useEffect(() => {
    const initialMessage = {
      sender: "bot",
      text: "안녕하세요 메타인지에 관해 무엇이든 물어보세요",
    };
    setMessages([initialMessage]);
  }, []);

  const fetchTestResults = async () => {
    try {
      const response = await axios.get("http://localhost:5000/test-result", {
        params: { userId: "1" },
      });

      if (response.data && response.data.length > 0) {
        const resultMessages = response.data.map((result) => ({
          sender: "bot",
          text: `테스트 ID: ${result.test_id}, 당신의 테스트 점수는 ${result.score}점 입니다.`,
        }));
        setMessages([...messages, ...resultMessages]);
      } else {
        const resultMessage = {
          sender: "bot",
          text: "테스트 결과를 찾을 수 없습니다.",
        };
        setMessages([...messages, resultMessage]);
      }
    } catch (error) {
      console.error("Error fetching test results: ", error);
      const errorMessage = {
        sender: "bot",
        text: "테스트 결과를 가져오는 도중 오류가 발생했습니다.",
      };
      setMessages([...messages, errorMessage]);
    }
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    const userId = "1";

    try {
      const response = await axios.post("http://localhost:5000/chat", {
        user_id: userId,
        message: input,
      });

      const botMessage = { sender: "bot", text: response.data.reply };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("Error sending message: ", error);
    }

    setInput("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.customHeader}>
        <HeaderBackButton
          onPress={() => navigation.goBack()}
          tintColor="#ffffff"
        />
      </View>
      <TouchableOpacity onPress={handleLogoPress} style={styles.logoContainer}>
        <Image source={HeaderLogo} style={styles.headerLogo} />
      </TouchableOpacity>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView style={styles.chatContainer}>
          {messages.map((message, index) => (
            <View
              key={index}
              style={
                message.sender === "user"
                  ? styles.userMessage
                  : styles.botMessage
              }
            >
              <Text>{message.text || "No message"}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button title="내 테스트 결과 보기" onPress={fetchTestResults} />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="메타인지 향상을 위한 질문을 진행해보세요!"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            placeholderTextColor="#CCC"
          />
          <Button title="입력" onPress={sendMessage} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

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
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#8881EA",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#FFFFFF",
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 10,
    backgroundColor: "#1E1F54",
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
    padding: 10,
  },
});

export default AiChatbot;
