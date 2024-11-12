import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

const LogoutButton = ({ setIsLoggedIn }) => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // SecureStore에서 memberId 삭제
      await SecureStore.deleteItemAsync('username');
      setIsLoggedIn(false); // 로그인 상태를 false로 설정

      // navigation.reset을 사용해 LoginPage로 이동
      navigation.reset({
        index: 0,
        routes: [{ name: 'LoginPage' }],
      });
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
});

export default LogoutButton;
