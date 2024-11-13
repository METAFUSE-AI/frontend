import React, { useState, useCallback, useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView, Platform } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { fetchRecords, fetchEncouragementMessage } from "../components/ApiUtils"; // import 추가

import HeaderLogo from "../assets/images/headerLogo.png";
import RecordContainer from "../components/RecordContainer";

// AsyncStorage에서 username을 가져오는 함수
const getUsernameFromSession = async () => {
  try {
    const username = await AsyncStorage.getItem("username");
    return username || null;
  } catch (error) {
    console.error("Error loading username from AsyncStorage:", error);
    return null;
  }
};

export default function RecordPage({ navigation }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBubble, setShowBubble] = useState(false); // 말풍선 표시 여부
  const [bubbleText, setBubbleText] = useState(""); // 말풍선에 표시할 응원 메시지
  const [username, setUsername] = useState(null); // username을 state로 관리
  const [pressedId, setPressedId] = useState(null);

  // AsyncStorage에서 username을 로드하는 useEffect
  useEffect(() => {
    const loadUsername = async () => {
      const usernameFromSession = await getUsernameFromSession();
      setUsername(usernameFromSession);
    };

    loadUsername();
  }, []);

  const loadRecords = async () => {
    if (!username) return; // username이 없으면 기록을 불러오지 않음

    try {
      console.log("Fetched username:", username);
      const data = await fetchRecords(username); // 특정 username으로 기록 데이터 가져오기
      setRecords(data); // records에 데이터를 직접 할당
      console.log("Fetched records:", data);
      if (data.length > 0) {
        setShowBubble(true);
        loadEncouragementMessage(username); // 응원 메시지 불러오기
        console.log("loadEncouragementMessage:", loadEncouragementMessage);
      }
    } catch (error) {
      console.error("Error fetching records:", error);
      setError("Error fetching records");
    } finally {
      setLoading(false);
    }
  };

  // 응원 메시지를 가져오는 함수
  const loadEncouragementMessage = async (username) => {
    try {
      console.log("Fetching encouragement message for:", username); // username 확인
      const message = await fetchEncouragementMessage(username);
      console.log("Fetched encouragement message:", message); // fetchEncouragementMessage 응답 확인
      setBubbleText(message || "Keep going! You're doing great!");
    } catch (error) {
      console.error("Error fetching encouragement message:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (username) {
        loadRecords();
      }
    }, [username])
  );

  const handleLogoPress = () => {
    navigation.navigate("MainPage");
  };

  const handleAddPress = () => {
    navigation.navigate("AddRecordPage");
  };

  const handleRecordPress = (recordId) => {
    setPressedId(recordId);
    setTimeout(() => {
      setPressedId(null);
      navigation.navigate("RecordDetailPage", { recordId });
    }, 100);
  };

  return (
    <View style={styles.container}>
      <View style={styles.customHeader}>
        <HeaderBackButton onPress={() => navigation.goBack()} tintColor="#ffffff" />
      </View>
      <TouchableOpacity onPress={handleLogoPress} style={styles.logoContainer}>
        <Image source={HeaderLogo} style={styles.headerLogo} />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scrollViewContent} style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : error ? (
          <Text style={styles.errorText}>Error: {error}</Text>
        ) : records.length > 0 ? (
          records.map((record) => (
            <TouchableOpacity key={record.recordId} onPress={() => handleRecordPress(record.recordId)} style={styles.recordItem}>
              <Text style={styles.recordTitle}>{record.recordQuestion}</Text>
              <Text style={styles.recordAnswer}>{record.recordAnswer}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noRecordsText}>기록이 없습니다 기록을 작성해주세요</Text>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
          <Icon name="plus" size={30} color="#000" />
        </TouchableOpacity>
        {showBubble && (
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>{bubbleText}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

// 스타일은 그대로 유지합니다
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
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  logoContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  headerLogo: {
    width: "80%",
    height: 100,
    resizeMode: "contain",
  },
  scrollView: {
    flex: 1,
    marginBottom: 100,
  },
  scrollViewContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  recordItem: {
    marginVertical: 8,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    ...Platform.select({
      ios: {
        shadowColor: "#fff",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  recordContent: {
    padding: 16,
    position: "relative",
  },
  recordGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  recordItemPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
    backgroundColor: "rgba(255, 255, 255, 0.12)",
  },
  recordTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  recordAnswer: {
    fontSize: 15,
    color: "rgba(255,255,255,0.8)",
    lineHeight: 20,
  },
  noRecordsText: {
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    marginTop: 20,
    fontSize: 17,
  },
  addButton: {
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  bubble: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    maxWidth: 250,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 32,
    right: 24,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  addButtonPressed: {
    transform: [{ scale: 0.9 }],
  },
  bubbleText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  loadingText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
  errorText: {
    color: "#ff0000",
    textAlign: "center",
    fontSize: 18,
  },
});
