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
import * as SecureStore from 'expo-secure-store'; // SecureStore import
import { getRecordById, updateRecord, deleteRecord } from '../components/ApiUtilsi'; // 경로 확인

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
    const fetchRecord = async () => {
      try {
        const data = await getRecordById(recordId);
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

  const fetchusername = async () => {
    try {
      const username = await SecureStore.getItemAsync('username');
      if (!username) {
        throw new Error("사용자 ID를 찾을 수 없습니다.");
      }
      return username;
    } catch (error) {
      console.error("ID 가져오는 중 오류 발생:", error);
      setError("ID를 가져오는 중 문제가 발생했습니다.");
    }
  };

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
  // 스타일 객체는 그대로 유지
});
