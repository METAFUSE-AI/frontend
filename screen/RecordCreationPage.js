import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  TextInput,
} from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderLogo from "../assets/images/headerLogo.png";
import RecordContainer from "../components/RecordContainer";

// 기록 작성 페이지
export default function RecordCreationPage({ route, navigation }) {
  const { question } = route.params;
  const [userInput, setUserInput] = useState("");

  const handleLogoPress = () => {
    navigation.navigate("MainPage");
  };

  const handleCompletePress = async () => {
    console.log("기록 완료 버튼 클릭");

    try {
      // AsyncStorage에서 username 가져오기
      const storedUsername = await AsyncStorage.getItem('username');
      console.log("저장된 username:", storedUsername);
      if (!storedUsername) {
        console.error("username이 세션에 존재하지 않습니다.");
        return;
      }

      const record = {
        recordQuestion: question,
        recordContents: userInput,
        member: { username: storedUsername },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const response = await fetch("http://localhost:8080/records/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });

      if (response.ok) {
        navigation.navigate("RecordPage");
      } else {
        console.error("Failed to save record");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
        contentContainerStyle={[styles.scrollViewContent, { alignItems: "center" }]}
        style={styles.container}
      >
        <RecordContainer text={question} />
        <TextInput
          style={styles.recordCreationInputBox}
          placeholder="내용을 입력하세요"
          placeholderTextColor="#ccc"
          value={userInput}
          onChangeText={setUserInput}
          multiline
          textAlignVertical="top" // 입력란 내에서 텍스트를 상단으로 정렬
        />
        <TouchableOpacity
          style={styles.recordSubmitBtn}
          onPress={handleCompletePress}
        >
          <Text style={styles.buttonText}>완료</Text>
        </TouchableOpacity>
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
  },
  logoContainer: {
    alignItems: "center",
  },
  headerLogo: {
    width: "70%",
    height: 100,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  recordCreationInputBox: {
    width: 300,
    height: 250,
    backgroundColor: "#344C64",
    color: "#fff",
    justifyContent: "flex-start", // 입력란에서 텍스트를 위쪽으로 정렬
    alignItems: "flex-start", // 왼쪽 정렬
    borderRadius: 30,
    marginTop: 25,
    marginBottom: 25,
    padding: 20,
    textAlignVertical: "top", // 텍스트를 상단으로 정렬
  },
  recordSubmitBtn: {
    backgroundColor: "#8881EA",
    paddingVertical: 20,
    paddingHorizontal: 50,
    marginTop: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
