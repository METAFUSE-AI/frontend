import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Button,
  ScrollView,
} from "react-native";
import Footer from "../components/Footer";

import HeaderLogo from "../assets/images/headerLogo.png";

export default function MainPage({ navigation }) {
  const handleLogoPress = () => {
    navigation.navigate("MainPage");
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.container}
    >
      <TouchableOpacity onPress={handleLogoPress} style={styles.logoContainer}>
        <Image source={HeaderLogo} style={styles.headerLogo} />
      </TouchableOpacity>
      <Footer navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0F35",
  },
  logoContainer: {
    alignItems: "center",
  },
  headerLogo: {
    width: "70%",
    height: 100,
  },
});
