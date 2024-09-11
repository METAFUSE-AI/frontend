import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, Alert } from 'react-native';
import { makeRedirectUri, useAuthRequest, ResponseType } from 'expo-auth-session';
import KakaoLogins from '@react-native-seoul/kakao-login';

const KakaoLogin = () => {
  const redirectUri = Platform.select({
    web: 'http://localhost:8080/oauth2/kakao/callback',
    default: makeRedirectUri({ useProxy: true }),
  });

  const discovery = {
    authorizationEndpoint: 'https://kauth.kakao.com/oauth/authorize',
    tokenEndpoint: 'https://kauth.kakao.com/oauth/token',
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'a3c20261d3a5c783c4a3271eef22b599',
      redirectUri: redirectUri,
      responseType: ResponseType.Code,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      fetch('http://localhost:8080/oauth2/kakao/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          Alert.alert('로그인 성공', JSON.stringify(data));
        })
        .catch((err) => {
          Alert.alert('로그인 실패', err.message);
        });
    }
  }, [response]);

  const handleLogin = () => {
    if (Platform.OS === 'web') {
      promptAsync();
    } else {
      handleMobileLogin();
    }
  };

  const handleMobileLogin = async () => {
    try {
      const result = await KakaoLogins.login();
      Alert.alert('로그인 성공', JSON.stringify(result));
    } catch (err) {
      Alert.alert('로그인 실패', err.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>카카오 로그인</Text>
      <TouchableOpacity onPress={handleLogin} style={{ padding: 10, backgroundColor: '#FEE500', borderRadius: 5 }}>
        <Text style={{ color: '#3C1E1E', fontWeight: 'bold' }}>카카오 로그인하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default KakaoLogin;
