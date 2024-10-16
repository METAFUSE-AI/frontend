import React, { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, Button, Text, ScrollView, StyleSheet, View } from 'react-native'; // Button 사용
import Icon from 'react-native-vector-icons/Ionicons'; // react-native-vector-icons 설치 필요
import axios from 'axios';

const AiChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  //초기 인사말 메시지
  useEffect(() => {
    const initialMessage = { sender: 'bot', text: '안녕하세요 메타인지에 관해 무엇이든 물어보세요' };
    setMessages([initialMessage]);
  }, []);

  // "내 테스트 결과 보기" 버튼을 눌렀을 때 실행될 함수
  const fetchTestResults = async () => {
    try {
      const response = await axios.get('http://localhost:5000/test-result', {
        params: { userId: '1' }  // 실제로는 로그인 또는 다른 방식으로 사용자 ID를 받아야 합니다
      });

      const resultMessage = { sender: 'bot', text: `당신의 테스트 점수는 ${response.data.score}점 입니다.` };
      setMessages([...messages, resultMessage]);

    } catch (error) {
      console.error("Error fetching test results: ", error);
    }
  };

  // 메시지 전송 함수
  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post('http://localhost:5000/chat', {
        message: input,
      });

      const botMessage = { sender: 'bot', text: response.data.reply };
      setMessages([...messages, userMessage, botMessage]);

    } catch (error) {
      console.error("Error sending message: ", error);
    }

    setInput('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {messages.map((message, index) => (
          <View
            key={index}
            style={message.sender === 'user' ? styles.userMessage : styles.botMessage}
          >
            <Text>{message.text}</Text>
          </View>
        ))}
      </ScrollView>

       {/* 내 테스트 결과 보기 버튼 추가 */}
       <View style={styles.buttonContainer}>
        <Button title="내 테스트 결과 보기" onPress={fetchTestResults} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage} // 엔터 키를 누르면 전송
          placeholderTextColor="#CCC"
        />
        <Button title="Send" onPress={sendMessage} /> {/* Button 사용 */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0F35',
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#8881EA',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 10,
    backgroundColor: '#1E1F54',
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    padding: 10,
  },
});

export default AiChatbot;
