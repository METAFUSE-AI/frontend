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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchRecords } from '../components/ApiUtilsi';

import HeaderLogo from "../assets/images/headerLogo.png";

export default function RecordPage({ navigation }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRecords = async () => {
    try {
      const username = "test"//await AsyncStorage.getItem('username'); // 세션에서 username 가져오기
      const data = await fetchRecords(username); // 특정 username으로 기록 데이터 가져오기
      setRecords(data); // records에 데이터를 직접 할당
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
        style={styles.scrollView}
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
    flex: 1,
    marginBottom: 100,
  },
  scrollViewContent: {
    paddingBottom: 20,
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
    fontSize: 16,
    color: "#ccc",
  },
  loadingText: {
    textAlign: "center",
    color: "#fff",
  },
  errorText: {
    textAlign: "center",
    color: "red",
  },
  noRecordsText: {
    textAlign: "center",
    color: "#fff",
  },
  addButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 15,
    elevation: 3,
  },
});
