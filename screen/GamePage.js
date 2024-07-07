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

export default function GamePage({ navigation }) {
  return (
    <View>
      <Text>게임페이지</Text>
      <Footer navigation={navigation} />
    </View>
  );
}