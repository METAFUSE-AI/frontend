import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
} from "react-native";
import { HeaderBackButton } from "@react-navigation/elements";

import HeaderLogo from "../assets/images/headerLogo.png";
import RecordContainer from "../components/RecordContainer";

// 기록 작성 페이지

export default function RecordCreationPage({ route, navigation }) {
  const { question } = route.params;

  const handleLogoPress = () => {
    navigation.navigate("MainPage");
  };

  const handleCompletePress = () => {
    navigation.navigate("RecordPage");
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
        <RecordContainer text={question} />
        <TouchableOpacity
          style={styles.recordSubmitBtn}
          onPress={handleCompletePress}
        >
          <Text style={styles.buttonText}>완료</Text>
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
  recordSubmitBtn: {
    backgroundColor: "#8881EA",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
