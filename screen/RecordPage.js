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
import { fetchRecords } from '../components/ApiUtilsi'; // Axios 함수 import

import HeaderLogo from "../assets/images/headerLogo.png";

export default function RecordPage({ navigation }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRecords = async () => {
      try {
        const data = await fetchRecords(); // 기록 데이터 가져오기
        setRecords(data);
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
              onPress={() => handleRecordPress(record.recordId)}
              style={styles.recordItem}
            >
              <Text style={styles.recordTitle}>{record.recordQuestion}</Text>
              <Text style={styles.recordAnswer}>{record.recordAnswer}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noRecordText}>기록이 없습니다{"\n"}기록을 작성해 주세요</Text>
        )}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleAddPress} style={styles.addRecordBtn}>
          <Icon name="plus-circle" size={30} color="#000" />
        </TouchableOpacity>
      </View>
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
    marginVertical: 20,
  },
  headerLogo: {
    width: "70%",
    height: 100,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 150, // 푸터와의 간격을 늘리기 위해 더 큰 여백을 추가합니다.
  },
  addRecordBtn: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  recordItem: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#344C64",
    borderRadius: 10,
    width: '90%',
  },
  recordTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 'bold',
  },
  recordAnswer: {
    color: "#fff",
    fontSize: 16,
    marginTop: 5,
  },
  noRecordText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    marginTop: 20,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
    marginTop: 20,
    textAlign: "center",
  },
});
