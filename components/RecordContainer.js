import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default function RecordContainer({ text }) {
  return (
    <View style={styles.RecordContainer}>
      <Text style={styles.RecordContainerText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  RecordContainer: {
    width: 300,
    height: 100,
    backgroundColor: "#344C64",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "30px",
    marginTop: 25,
    marginBottom: 25,
  },
  RecordContainerText: {
    color: "#fff",
    textAlign: "center",
    fontSize: "15px",
  },
});
