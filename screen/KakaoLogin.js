import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, Modal } from "react-native";
import { WebView } from "react-native-webview";
import * as AuthSession from "expo-auth-session";

const REST_API_KEY = "39a096f2c5fa71cb1ffde623e22d201b"; // Kakao REST API 키
const REDIRECT_URI = AuthSession.makeRedirectUri({ useProxy: true });
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export default function KakaoLogin() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = () => {
    setModalVisible(true);
  };

  const handleWebViewNavigationStateChange = (newNavState) => {
    const { url } = newNavState;
    if (url.includes("?code=")) {
      const code = url.split("code=")[1];
      console.log("Authorization Code:", code);
      setModalVisible(false);
      // Use the authorization code to get the access token from your server
    }
  };

  return (
    <View style={styles.container}>
      <Text>카카오 로그인 페이지</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>카카오로 로그인하기</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide">
        <WebView
          source={{ uri: KAKAO_AUTH_URL }}
          onNavigationStateChange={handleWebViewNavigationStateChange}
          startInLoadingState
          style={{ marginTop: 20 }}
        />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.closeButtonText}>닫기</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#FEE500",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#3C1E1E",
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
  },
});
