module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      // Expo preset with NativeWind JSX support
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      // Module resolver for cleaner imports
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./src", // allows import like: import Button from "@/components/Button"
          },
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        },
      ],
      // Required: Reanimated v4 moved its plugin to react-native-worklets/plugin
      "react-native-worklets/plugin",
    ],
  };
};




// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: [
//       ["babel-preset-expo", { jsxImportSource: "nativewind" }],
//       "nativewind/babel",
//     ],
//     plugins: [
//       [
//         "module-resolver",
//         {
//           root: ["./"],
//           alias: {
//             "@": "./src",
//           },
//         },
//       ],
//     ],
//   };
// };