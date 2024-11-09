import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  TextInput,
  Button,
  Text,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; 
import axios from "axios";

const AiChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  //초기 인사말 메시지
  useEffect(() => {
    const initialMessage = {
      sender: "bot",
      text: "안녕하세요 메타인지에 관해 무엇이든 물어보세요",
    };
    setMessages([initialMessage]);
  }, []);

  const fetchTestResults = async () => {
    try {
      const response = await axios.get("http://10.106.3.58:5000/test-result", {
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
      const response = await axios.post("http://10.106.3.58:5000/chat", {
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
      <ScrollView style={styles.chatContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={
              message.sender === "user" ? styles.userMessage : styles.botMessage
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
          placeholder="Type your message..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage} 
          placeholderTextColor="#CCC"
        />
        <Button title="Send" onPress={sendMessage} /> 
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0F35",
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
