import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function OptionButton({ text, isSelected, onPress }) {
  return (
    <TouchableOpacity style={[styles.button, isSelected && styles.selectedButton]} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
      {isSelected && (
        <View style={styles.circle}>
          <View style={styles.innerCircle} />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    width: '100%',
  },
  selectedButton: {
    borderColor: '#2196F3',
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2196F3',
  },
});
