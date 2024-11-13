// SignUpPage.js
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
import Icon from "react-native-vector-icons/FontAwesome";
import HeaderLogo from "../assets/images/headerLogo.png";
import { registerUser } from "../components/ApiUtils";
import Modal from "react-native-modal";
import { apiInstance } from "../components/ApiUtils";
import axios from "axios";
export default function SignUpPage({ navigation }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false); // Modal 상태 추가
  const [modalMessage, setModalMessage] = useState(""); // Modal 메시지 상태 추가

  const checkDuplicateId = async () => {
    if (!username) {
      setModalMessage("아이디를 입력해 주세요.");
      setModalVisible(true);
      return;
    }
  
    try {
      const response = await axios.get(`http://10.105.1.73:8080/members/check?username=${username}`);
      
      // 서버 응답이 성공일 때 처리
      if (response.status === 200) {
        const exists = response.data.data; // `data` 객체에서 `exists` 값 가져오기
        
        if (exists) {
          setModalMessage("이미 사용 중인 아이디입니다.");
          setIsDuplicate(true);
        } else {
          setModalMessage("사용 가능한 아이디입니다.");
          setIsDuplicate(false);
        }
        
        setModalVisible(true); // Modal 표시
      } else {
        // 서버 오류 처리
        setModalMessage("서버 오류입니다.");
        setModalVisible(true);
        console.log(`Error with username: ${username}`);
      }
    } catch (error) {
      // 네트워크 오류 또는 기타 예외 처리
      setModalMessage("오류 발생: " + (error.response?.data || error.message || error));
      setModalVisible(true);
      console.log("Error:", error);
    }
  };
  const handleSignUp = async () => {
    console.log("회원가입 시도: ", {
      username,
      name,
      password,
      confirmPassword,
    });

    if (password.length < 6) {
      setModalMessage("비밀번호는 6자리 이상 입력하세요.");
      setModalVisible(true);
      return;
    }

    if (!isPasswordMatch) {
      setModalMessage("비밀번호가 일치하지 않습니다.");
      setModalVisible(true);
      console.log("비밀번호 불일치");
      return;
    }

    if (isDuplicate) {
      setModalMessage(
        "이미 사용 중인 아이디입니다. 다른 아이디를 사용해 주세요."
      );
      setModalVisible(true);
      console.log("중복 아이디 확인");
      return;
    }

    try {
      const response = await registerUser({ username, name, password });
      console.log("회원가입 응답: ", response);

      if (response && response.message) {
        setModalMessage("회원가입 성공");
        setModalVisible(true);
        setTimeout(() => {
          navigation.navigate("LoginPage");
        }, 2000); // 2초 후에 로그인 페이지로 이동
      } else {
        setModalMessage("서버 오류로 회원가입이 실패했습니다.");
        setModalVisible(true);
      }
    } catch (error) {
      setModalMessage("회원가입 실패: " + error.message);
      setModalVisible(true);
      console.log("회원가입 오류: ", error);
    }
  };

  const handlePasswordConfirm = (text) => {
    setConfirmPassword(text);
    setIsPasswordMatch(text === password);
  };

  return (
    <View style={styles.container}>
      <Image source={HeaderLogo} style={styles.logo} />
      <TextInput
        style={styles.input}
        placeholder="이름"
        placeholderTextColor={"#FFFFFF"}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="아이디"
        placeholderTextColor={"#FFFFFF"}
        value={username}
        onChangeText={setUsername}
      />
      <TouchableOpacity onPress={checkDuplicateId} style={styles.checkButton}>
        <Text style={styles.checkButtonText}>중복확인</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="비밀번호"
        placeholderTextColor={"#FFFFFF"}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Text style={styles.passwordHint}>비밀번호는 6자리 이상 입력하세요.</Text>
      <TextInput
        style={[
          styles.input,
          !isPasswordMatch && confirmPassword.length > 0
            ? styles.errorInput
            : {},
          password.length < 6 ? styles.errorInput : {}, // 비밀번호 길이가 6자리 미만일 때 빨간 테두리
        ]}
        placeholder="비밀번호 확인"
        placeholderTextColor={"#FFFFFF"}
        secureTextEntry
        value={confirmPassword}
        onChangeText={handlePasswordConfirm}
      />
      <TouchableOpacity
        onPress={handleSignUp}
        style={[
          styles.signUpButton,
          password.length < 6 ? styles.disabledButton : {},
        ]} // 비밀번호가 6자리 미만일 경우 버튼 비활성화
        disabled={password.length < 6}
      >
        <Text style={styles.signUpButtonText}>회원가입</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Icon name="arrow-left" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Modal Component */}
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalMessage}>{modalMessage}</Text>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.modalButton}
          >
            <Text style={styles.modalButtonText}>확인</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  passwordHint: {
    color: "#FFFFFF",
    marginBottom: 10,
    textAlign: "left",
    width: "100%",
  },
  checkButton: {
    backgroundColor: "#8881EA",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  checkButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  signUpButton: {
    backgroundColor: "#8881EA",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  signUpButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  backButton: {
    marginTop: 20,
    position: "absolute",
    top: 40,
    left: 20,
  },
  errorInput: {
    borderColor: "red",
  },
  disabledButton: {
    backgroundColor: "#444", // 비활성화된 버튼 색상
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalMessage: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#8881EA",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});
