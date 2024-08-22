import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { getRecordById, updateRecord, deleteRecord } from '../components/ApiUtilsi'; // Axios 함수 import

import HeaderLogo from "../assets/images/headerLogo.png";

export default function RecordDetailPage({ route, navigation }) {
  const { recordId } = route.params; // RecordPage에서 전달받은 recordId

  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [recordContents, setRecordContents] = useState("");

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await getRecordById(recordId); // ID로 기록 조회
        setRecord(data);
        setRecordContents(data.recordContents);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [recordId]);

  const handleLogoPress = () => {
    navigation.navigate("MainPage");
  };

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleUpdatePress = async () => {
    try {
      const updatedRecord = await updateRecord(recordId, { recordContents }); // 대답만 업데이트
      setRecord(prevRecord => ({ ...prevRecord, recordContents: updatedRecord.recordContents }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating record:", error.response ? error.response.data : error.message);
      setError("Error updating record");
    }
  };

  const handleDeletePress = () => {
    Alert.alert(
      "Delete Record",
      "Are you sure you want to delete this record?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await deleteRecord(recordId); // 기록 삭제
              navigation.goBack(); // 삭제 후 이전 화면으로 돌아가기
            } catch (error) {
              console.error("Error deleting record:", error.response ? error.response.data : error.message);
              setError("Error deleting record");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!record) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No record found</Text>
      </View>
    );
  }

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
        <Text style={styles.questionText}>{record.recordQuestion}</Text>
        {isEditing ? (
          <>
            <TextInput
              value={recordContents}
              onChangeText={setRecordContents}
              style={[styles.input, styles.textArea]}
              multiline
              placeholder="Enter your answer"
              placeholderTextColor="#888"
            />
            <TouchableOpacity onPress={handleUpdatePress} style={styles.saveButton}>
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.contentText}>{recordContents}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={handleEditPress} style={styles.editButton}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDeletePress} style={styles.deleteButton}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
    marginVertical: 20,
  },
  headerLogo: {
    width: "70%",
    height: 100,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
  },
  questionText: {
    color: "#fff",
    fontSize: 20,
    marginTop: 20,
    textAlign: "center",
  },
  contentText: {
    color: "#ccc",
    fontSize: 16,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    height: 100,
    width: '90%',
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#fff',
  },
  textArea: {
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    width: '90%',
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 30,
    justifyContent: "space-between",
    width: '90%',
  },
  editButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
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
