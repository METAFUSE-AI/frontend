import React from "react";
import { Button, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Footer({ navigation }) {
  //npm install react-native-vector-icons

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MainPage")}
      >
        <Icon name="home" size={20} color="#000" />
        <Text style={styles.buttonText}>메인페이지</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TestPage")}
      >
        <Icon name="search" size={20} color="#000" />
        <Text style={styles.buttonText}>테스트페이지</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MyPage")}
      >
        <Icon name="user" size={20} color="#000" />
        <Text style={styles.buttonText}>마이페이지</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("GamePage")}
      >
        <Icon name="gamepad" size={20} color="#000" />
        <Text style={styles.buttonText}>게임페이지</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("QuizPage")}
      >
        <Icon name="question-circle" size={20} color="#000" />
        <Text style={styles.buttonText}>퀴즈페이지</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TestPage")}
      >
        <Icon name="flask" size={20} color="#000" />
        <Text style={styles.buttonText}>테스트페이지</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 5,
  },
  buttonText: {
    marginTop: 5,
  },
});
