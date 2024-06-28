import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  Button,
} from "react-native";
import Footer from "../components/Footer";

export default function TestPage({ navigation }) {
  return (
    <View>
      <Text>테스트페이지</Text>
      <Footer navigation={navigation} />
    </View>
  );
}
