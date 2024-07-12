import React, { useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { HeaderBackButton } from "@react-navigation/elements"; // HeaderBackButton 임포트
import SubmitButton from "../components/SubmitButton"; // SubmitButton 컴포넌트 임포트

import HeaderLogo from "../assets/images/headerLogo.png"; // HeaderLogo 이미지 임포트

export default function GamePage({ navigation }) {
  const handleLogoPress = () => {
    navigation.navigate("MainPage");
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

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
        style={styles.scrollView}
      >
        <View style={styles.buttonContainer}>
          <SubmitButton onPress={() => {}} text="기억력 게임" />
          <View style={{ marginVertical: 30 }} /> {/* 버튼들 사이의 간격 */}
          <SubmitButton onPress={() => {}} text="TRPG 게임" />
          <View style={{ marginVertical: 30 }} /> {/* 버튼들 사이의 간격 */}
          <SubmitButton onPress={() => {}} text="기타 게임" />
        </View>
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
    zIndex: 10,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  headerLogo: {
    width: "70%",
    height: 100,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: "center", // 버튼들을 수평 정렬하기 위해 추가
  },
  scrollView: {
    flex: 1,
  },
});
