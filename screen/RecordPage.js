import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import Icon from "react-native-vector-icons/FontAwesome";

import HeaderLogo from "../assets/images/headerLogo.png";
import RecordContainer from "../components/RecordContainer";
import { fetchRecords } from "../components/ApiUtilsi"; // API 유틸리티 파일에서 가져옴

export default function RecordPage({ navigation }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const memberId = 1; // 고정된 memberId

  useEffect(() => {
    const loadRecords = async () => {
      try {
        const data = await fetchRecords(`/records/member/${memberId}`); // memberId가 1인 기록을 가져옴
        setRecords(data); // 기록을 상태에 저장
      } catch (error) {
        console.error("Error fetching records:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadRecords();
  }, []);
  const handleLogoPress = () => {
    navigation.navigate("MainPage");
  };

  const handleAddPress = () => {
    navigation.navigate("AddRecordPage");
  };

  const handleRecordPress = (recordId) => {
    navigation.navigate("RecordDetailPage", { recordId }); // 클릭된 recordId를 전달
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
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : error ? (
          <Text style={styles.errorText}>Error: {error}</Text>
        ) : records.length > 0 ? (
          records.map((record) => (
            <TouchableOpacity
              key={record.recordId}
              onPress={() => handleRecordPress(record.recordId)} // recordId를 클릭 시 전달
              style={styles.recordItem}
            >
              <RecordContainer text={record.recordQuestion} />
            </TouchableOpacity>
          ))
        ) : (
          <RecordContainer text={"기록이 없습니다\n기록을 작성해 주세요"} />
        )}
        <TouchableOpacity onPress={handleAddPress} style={styles.AddRecordBtn}>
          <Icon name="plus-circle" size={30} color="#000" />
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
  AddRecordBtn: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
    marginTop: 20,
  },
  recordItem: {
    marginVertical: 10,
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    marginTop: 20,
  },
});
