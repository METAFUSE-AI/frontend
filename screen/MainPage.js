import React, { useState } from "react";
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

export default function MainPage({ navigation }) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Text>메인페이지</Text>
      <Footer navigation={navigation} />
    </ScrollView>
  );
}
