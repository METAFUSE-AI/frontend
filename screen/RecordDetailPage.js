import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { useRoute } from '@react-navigation/native';
import { getRecordById } from "../components/ApiUtilsi"; // 수정된 부분

export default function RecordDetailPage({ navigation }) {
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const route = useRoute();
  const { recordId } = route.params;

  useEffect(() => {
    const loadRecord = async () => {
      try {
        const data = await getRecordById(recordId); // apiUtils에서 가져온 함수 사용
        setRecord(data);
      } catch (error) {
        console.error("Error fetching record:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadRecord();
  }, [recordId]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : error ? (
        <Text style={styles.errorText}>Error: {error}</Text>
      ) : record ? (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.recordTitle}>{record.recordQuestion}</Text>
          <Text style={styles.recordContent}>{record.recordContents}</Text>
        </ScrollView>
      ) : (
        <Text style={styles.errorText}>Record not found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0F35",
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  recordTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  recordContent: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
});
