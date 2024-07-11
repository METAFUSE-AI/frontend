import React, { useEffect } from "react";
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

//기록 페이지

export default function RecordPage({ navigation }) {
  const handleLogoPress = () => {
    navigation.navigate("MainPage");
  };

  const handleAddPress = () => {
    // 추가 버튼 클릭 시 수행할 작업
    console.log("기록 추가 버튼 클릭");
    navigation.navigate("AddRecordPage");
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
        style={styles.container}
      >
        <RecordContainer text={"기록이 없습니다\n기록을 작성해 주세요"} />
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
});
