import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { useFocusEffect } from '@react-navigation/native';
import Icon from "react-native-vector-icons/FontAwesome";
import { fetchRecords } from '../components/ApiUtilsi';

import HeaderLogo from "../assets/images/headerLogo.png";
import RecordContainer from "../components/RecordContainer";

export default function RecordPage({ navigation }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRecords = async () => {
    try {
      const data = await fetchRecords(); // 기록 데이터 가져오기
      setRecords(data);
    } catch (error) {
      console.error("Error fetching records:", error);
      setError("Error fetching records");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadRecords();
    }, [])
  );

  const handleLogoPress = () => {
    navigation.navigate("MainPage");
  };

  const handleAddPress = () => {
    navigation.navigate("AddRecordPage");
  };

  const handleRecordPress = (recordId) => {
    navigation.navigate("RecordDetailPage", { recordId });
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
        contentContainerStyle={styles.scrollViewContent}
        style={styles.scrollView}   // scrollView 스타일을 추가
      >
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : error ? (
          <Text style={styles.errorText}>Error: {error}</Text>
        ) : records.length > 0 ? (
          records.map((record) => (
            <TouchableOpacity
              key={record.recordId}
              onPress={() => handleRecordPress(record.recordId)}
              style={styles.recordItem}
            >
              <Text style={styles.recordTitle}>{record.recordQuestion}</Text>
              <Text style={styles.recordAnswer}>{record.recordAnswer}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noRecordsText}>No records found</Text>
        )}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={handleAddPress}>
        <Icon name="plus" size={30} color="#000" />
      </TouchableOpacity>
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
  scrollView: {
    flex: 1,                    // ScrollView가 화면의 나머지 부분을 차지하게 함
    marginBottom: 100,           // 버튼과 겹치지 않도록 여백 추가
  },
  scrollViewContent: {
    paddingBottom: 20,          // 하단 여백 추가
  },
  recordItem: {
    padding: 15,
    borderBottomColor: "#888",
    borderBottomWidth: 1,
    backgroundColor: "#344C64",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  recordTitle: {
    fontSize: 18,
    color: "#fff",
  },
  recordAnswer: {
    fontSize: 14,
    color: "#333",
  },
  noRecordsText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
  addButton: {
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "absolute",
    bottom: 30,
    left: "50%",
    transform: [{ translateX: -40 }],
  },
  loadingText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});
