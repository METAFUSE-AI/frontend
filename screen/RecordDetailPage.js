// RecordDetailPage.js
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
} from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import {
  getRecordById,
  updateRecord,
  deleteRecord,
} from "../components/ApiUtils";

import HeaderLogo from "../assets/images/headerLogo.png";

export default function RecordDetailPage({ route, navigation }) {
  const { recordId } = route.params;

  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [recordContents, setRecordContents] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (!recordId) {
      setError("기록 ID가 존재하지 않습니다.");
      return;
    }

    const fetchRecord = async () => {
      try {
        const data = await getRecordById(recordId);
        if (data && data.data) {
          // data.data로 수정하여 응답 데이터 접근
          setRecord(data.data);
          setRecordContents(data.data.recordContents); // 불러온 내용 설정
        } else {
          setError("기록을 찾을 수 없습니다.");
        }
      } catch (error) {
        setError("기록을 불러오는데 실패했습니다.");
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
      const updatedRecord = await updateRecord(recordId, {
        ...record,
        recordContents,
      });
      setRecord((prevRecord) => ({
        ...prevRecord,
        recordContents: updatedRecord.recordContents,
      }));
      setIsEditing(false);
    } catch (error) {
      console.error("기록 업데이트 오류:", error.message);
      setError("기록 업데이트에 실패했습니다.");
    }
  };

  const handleDeletePress = () => {
    setIsModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      const success = await deleteRecord(recordId);
      if (success) {
        navigation.navigate("RecordPage", { refresh: true });
      } else {
        setError("기록 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("기록 삭제 오류:", error.message);
      setError("기록 삭제에 실패했습니다.");
    } finally {
      setIsModalVisible(false);
    }
  };

  const cancelDelete = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>로딩 중...</Text>
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
        <Text style={styles.errorText}>기록을 찾을 수 없습니다.</Text>
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
        contentContainerStyle={[
          styles.scrollViewContent,
          { paddingBottom: 100 },
        ]}
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
            <TouchableOpacity
              onPress={handleUpdatePress}
              style={styles.saveButton}
            >
              <Text style={styles.buttonText}>수정 저장</Text>
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity
                onPress={handleEditPress}
                style={styles.editButton}
              >
                <Text style={styles.buttonText}>수정</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDeletePress}
                style={styles.deleteButton}
              >
                <Text style={styles.buttonText}>삭제</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      <View style={styles.fixedBubble}>
        <Text style={styles.bubbleText}>
          당신의 선택은 소중한 경험으로, 현재의 당신을 만들어냈습니다. 후회 없이
          앞으로 나아가면서 더 나은 미래를 만들 수 있어요. 응원합니다!
        </Text>
      </View>

      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
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
    width: "100%",
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
    width: "100%",
    borderColor: "#888",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "#fff",
    backgroundColor: "#344C64",
  },
  textArea: {
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    width: "100%",
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
  fixedBubble: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#3A4A64",
    borderRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  bubbleText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
