// RecordCreationPage.js
import React, { useContext, useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

import HeaderLogo from "../assets/images/headerLogo.png";
import RecordContainer from "../components/RecordContainer";
import { UserContext } from "../components/UserContext";
import { apiInstance } from "../components/ApiUtils";

export default function RecordCreationPage({ route, navigation }) {
  const { question } = route.params;
  const [userInput, setUserInput] = useState("");
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUsername = async () => {
      const storedUsername = await AsyncStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    };
    fetchUsername();

    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const handleLogoPress = () => {
    navigation.navigate("MainPage");
  };

  const handleCompletePress = async () => {
    console.log("기록 완료 버튼 클릭");

    try {
      const record = {
        recordQuestion: question,
        recordContents: userInput,
        member: { username: username || "test" }, // Use stored username
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      console.log("username:", username);

      const response = await apiInstance.post("/records/create", record);

      if (response.status === 201) {
        console.log("Record saved successfully");
        navigation.navigate("RecordPage");
      } else {
        console.error("Failed to save record. Status:", response.status);
      }
    } catch (error) {
      console.error(
        "Error creating record:",
        error.response?.data || error.message || error
      );
    }
  };

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
          textAlignVertical="top"
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
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: 25,
    marginBottom: 25,
    padding: 20,
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
