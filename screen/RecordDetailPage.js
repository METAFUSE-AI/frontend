import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
  Button,
  ActivityIndicator,
} from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRecordById, updateRecord, deleteRecord } from '../components/ApiUtilsi'; // 경로 확인

import HeaderLogo from "../assets/images/headerLogo.png";

export default function RecordDetailPage({ route, navigation }) {
  const { recordId } = route.params; // recordId만 사용

  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [recordContents, setRecordContents] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal 상태 추가

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const data = await getRecordById(recordId); // recordId만 사용
        setRecord(data);
        setRecordContents(data.recordContents);
      } catch (error) {
        setError("기록을 가져오는 데 문제가 발생했습니다: " + error.message);
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
      const updatedRecord = await updateRecord(recordId, { ...record, recordContents });
      setRecord({ ...record, recordContents: updatedRecord.recordContents });
      setIsEditing(false);
    } catch (error) {
      setError("기록 업데이트 중 오류 발생: " + (error.response ? error.response.data : error.message));
    }
  };

  const handleDeletePress = () => {
    setIsModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteRecord(recordId);
      navigation.navigate("RecordPage", { refresh: true });
    } catch (error) {
      setError("기록 삭제 중 오류 발생: " + (error.response ? error.response.data : error.message));
    } finally {
      setIsModalVisible(false);
    }
  };

  const cancelDelete = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>오류: {error}</Text>
      </View>
    );
  }

  if (!record) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>기록을 찾을 수 없습니다</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.customHeader}>
        <HeaderBackButton onPress={() => navigation.goBack()} tintColor="#ffffff" />
      </View>
      <TouchableOpacity onPress={handleLogoPress} style={styles.logoContainer}>
        <Image source={HeaderLogo} style={styles.headerLogo} />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={[styles.scrollViewContent, { alignItems: "center" }]}
        style={styles.container}
      >
        <View style={styles.recordBox}>
          <Text style={styles.questionText}>{record.recordQuestion}</Text>
        </View>

        {isEditing ? (
          <TextInput
            value={recordContents}
            onChangeText={setRecordContents}
            style={[styles.input, styles.textArea]}
            multiline
            placeholder="Enter your answer"
            placeholderTextColor="#888"
          />
        ) : (
          <View style={styles.recordBox}>
            <Text style={styles.contentText}>{recordContents}</Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          {isEditing ? (
            <TouchableOpacity onPress={handleUpdatePress} style={styles.saveButton}>
              <Text style={styles.buttonText}>수정 저장</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity onPress={handleEditPress} style={styles.editButton}>
                <Text style={styles.buttonText}>수정</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleDeletePress} style={styles.deleteButton}>
                <Text style={styles.buttonText}>삭제</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={cancelDelete}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>기록을 삭제하시겠습니까?</Text>
            <View style={styles.modalButtons}>
              <Button title="취소" onPress={cancelDelete} />
              <Button title="확인" onPress={confirmDelete} color="red" />
            </View>
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: 20,
  },
  recordBox: {
    backgroundColor: "#344C64",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: '100%',
  },
  questionText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  contentText: {
    color: "#fff",
    fontSize: 16,
  },
  input: {
    height: 150,
    width: '100%',
    borderColor: '#888',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#fff',
    backgroundColor: '#344C64',
  },
  textArea: {
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    width: '100%',
  },
  editButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    padding: 15,
    borderRadius: 10,
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
