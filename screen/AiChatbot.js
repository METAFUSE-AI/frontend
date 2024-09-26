import React, { useState } from 'react';
import { SafeAreaView, TextInput, Button, Text, ScrollView, StyleSheet, View } from 'react-native'; // Button 사용
import Icon from 'react-native-vector-icons/Ionicons'; // react-native-vector-icons 설치 필요
import axios from 'axios';

const AiChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

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
