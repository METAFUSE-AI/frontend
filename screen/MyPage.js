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

export default function MyPage({ navigation }) {
  return (
    <View>
      <Text>마이페이지</Text>
      <Footer navigation={navigation} />
    </View>
  );
}