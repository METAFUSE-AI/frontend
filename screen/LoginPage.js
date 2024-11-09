import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderLogo from "../assets/images/headerLogo.png";
import { loginUser } from "../components/ApiUtils";


export default function LoginPage({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (loading) return; // 이미 로딩 중이면 클릭 안 함.
    setLoading(true);
    try {
      console.log('로그인 요청 보내는 중...');
      const response = await loginUser({ username, password });
  
      console.log('응답 데이터:', response);
  
      if (response) {
        Alert.alert("로그인 성공");
        await AsyncStorage.setItem("username", username);
        navigation.navigate("MainPage");
      } else {
        Alert.alert("로그인 실패", "아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);  // 오류 로그 추가
      Alert.alert("오류 발생", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={HeaderLogo} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="아이디"
        placeholderTextColor={"#FFFFFF"}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor={"#FFFFFF"}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        onPress={handleLogin}
        style={styles.loginButton}
        disabled={loading}
      >
        <Text style={styles.loginButtonText}>
          {loading ? "로딩 중..." : "로그인"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("SignUpPage")}
        style={styles.signUpButton}
      >
        <Text style={styles.signUpButtonText} >회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0F35",
    padding: 20,
    alignItems: "center",
  },
  logo: {
    width: 250,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#8881EA",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "#FFFFFF",
    width: "100%",
  },
  loginButton: {
    backgroundColor: "#8881EA",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  signUpButton: {
    marginTop: 20,
  },
  signUpButtonText: {
    color: "#8881EA",
  },
});
