import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  Pressable,
} from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { fetchRecords } from "../components/ApiUtilsi";

import HeaderLogo from "../assets/images/headerLogo.png";
import RecordContainer from "../components/RecordContainer";

export default function RecordPage({ navigation }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pressedId, setPressedId] = useState(null);

  const loadRecords = async () => {
    try {
      const data = await fetchRecords();
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
    setPressedId(recordId);
    setTimeout(() => {
      setPressedId(null);
      navigation.navigate("RecordDetailPage", { recordId });
    }, 100);
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
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : error ? (
          <Text style={styles.errorText}>Error: {error}</Text>
        ) : records.length > 0 ? (
          records.map((record) => (
            <Pressable
              key={record.recordId}
              onPress={() => handleRecordPress(record.recordId)}
              style={({ pressed }) => [
                styles.recordItem,
                pressed && styles.recordItemPressed,
                pressedId === record.recordId && styles.recordItemPressed,
              ]}
            >
              <View style={styles.recordContent}>
                <View style={styles.recordGlow} />
                <Text style={styles.recordTitle}>{record.recordQuestion}</Text>
                <Text style={styles.recordAnswer}>{record.recordAnswer}</Text>
              </View>
            </Pressable>
          ))
        ) : (
          <Text style={styles.noRecordsText}>No records found</Text>
        )}
      </ScrollView>
      <Pressable
        style={({ pressed }) => [
          styles.addButton,
          pressed && styles.addButtonPressed,
        ]}
        onPress={handleAddPress}
      >
        <Icon name="plus" size={24} color="#0D0F35" />
      </Pressable>
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
    backgroundColor: "#ffffff",
    width: 56,
    height: 56,
    borderRadius: 28,
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
    transform: [{ scale: 0.96 }],
    backgroundColor: "rgba(255,255,255,0.9)",
  },
  loadingText: {
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    marginTop: 20,
    fontSize: 17,
  },
  errorText: {
    color: "#FF453A",
    textAlign: "center",
    marginTop: 20,
    fontSize: 17,
  },
});
