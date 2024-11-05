import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginComponent = () => {
  const [userId, setUserId] = useState('');

  const handleLogin = async () => {
    // 여기에서 로그인 로직을 구현하고, 로그인 성공 시에 사용자 아이디를 저장합니다.
    if (userId) {
      try {
        // AsyncStorage에 사용자 아이디 저장
        await AsyncStorage.setItem('userId', userId);
        Alert.alert('로그인 성공', `환영합니다, ${userId}!`);
        // 메인 페이지로 이동하는 로직 추가
      } catch (error) {
        console.error('Error saving userId:', error);
        Alert.alert('저장 오류', '아이디 저장 중 오류가 발생했습니다.');
      }
    } else {
      Alert.alert('입력 오류', '아이디를 입력해 주세요.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="아이디를 입력하세요"
        value={userId}
        onChangeText={setUserId}
      />
      <Button title="로그인" onPress={handleLogin} />
    </View>
  );
};

export default LoginComponent;
