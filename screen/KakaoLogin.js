import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, Alert } from 'react-native';
import { makeRedirectUri, useAuthRequest, ResponseType } from 'expo-auth-session';
import KakaoLogins from '@react-native-seoul/kakao-login';
import { saveUserInfo, getKakaoAccessToken } from '../components/ApiUtilsi';

const KakaoLogin = ({ navigation }) => {
  const redirectUri = Platform.select({
    web: 'http://localhost:8080/kakao/callback', // 웹 리디렉션 URI
    default: makeRedirectUri({ useProxy: true }), // 모바일 리디렉션 URI
  });

  const discovery = {
    authorizationEndpoint: 'https://kauth.kakao.com/oauth/authorize',
    tokenEndpoint: 'https://kauth.kakao.com/oauth/token',
  };

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: '39a096f2c5fa71cb1ffde623e22d201b', // 카카오 클라이언트 ID
      redirectUri: redirectUri,
      responseType: ResponseType.Code,
    },
    discovery
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      console.log('Authorization Code:', code);

      // 인증 코드를 서버에 보내고 액세스 토큰 받아오기
      getKakaoAccessToken(code)
        .then(data => {
          const { access_token } = data;
          console.log('Access Token:', access_token);

          // 사용자 정보를 서버에서 가져오기
          return fetch('https://kapi.kakao.com/v2/user/me', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });
        })
        .then(response => response.json())
        .then(userData => saveUserInfo(userData)) // 사용자 정보 저장
        .then(() => {
          Alert.alert('로그인 성공', '사용자 정보를 성공적으로 저장했습니다.');
          navigation.navigate('MainPage');
        })
        .catch(err => {
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

      const accessToken = result.accessToken;
      console.log('Mobile Access Token:', accessToken);

      const userResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userData = await userResponse.json();
      await saveUserInfo(userData);

      Alert.alert('로그인 성공', '사용자 정보를 성공적으로 저장했습니다.');
      navigation.navigate('MainPage');
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
