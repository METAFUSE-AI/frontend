module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env", // 환경 변수를 가져올 때 사용할 모듈 이름
          path: ".env", // 환경 변수를 포함한 파일 경로
        },
      ],
    ],
  };
};
