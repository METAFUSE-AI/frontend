import React, { useState, useEffect } from 'react';
import { View, Button, Alert, Linking } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const KakaoLogin = () => {
  const navigation = useNavigation();
  const clientId = 'YOUR_CLIENT_ID'; // 클라이언트 ID 설정
  const redirectUri = 'YOUR_REDIRECT_URI'; // 리디렉션 URI 설정

  const handleKakaoLogin = async () => {
    const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

    try {
      await Linking.openURL(kakaoAuthUrl);
      console.log('Redirected to Kakao login');
    } catch (error) {
      console.error('Error opening Kakao login:', error);
    }
  };

  const handleKakaoCallback = async (url) => {
    const code = extractCodeFromUrl(url);

    if (code) {
      try {
        const tokenResponse = await axios.get(`http://localhost:8080/kakao/callback?code=${code}`);
        navigation.navigate('MainPage', { accessToken: tokenResponse.data.access_token });
      } catch (error) {
        console.error('Error getting access token:', error);
      }
    } else {
      Alert.alert('Authorization code not found.');
    }
  };

  const extractCodeFromUrl = (url) => {
    const match = url.match(/code=([^&]+)/);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const handleUrl = ({ url }) => {
      handleKakaoCallback(url);
    };

    const subscription = Linking.addEventListener('url', handleUrl);

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View>
      <Button title="Kakao Login" onPress={handleKakaoLogin} />
      <StatusBar style="auto" />
    </View>
  );
};

export default KakaoLogin;
