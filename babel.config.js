// module.exports = {
//   presets: ["@vue/cli-plugin-babel/preset"],
// };

module.exports = {
  ignore: [/\/core-js/],
  presets: [
    [
      "@babel/preset-env",
      { modules: false, useBuiltIns: "usage", corejs: "3.6.5" },
    ],
  ],
  overrides: [
    {
      test: "./node_modules",
      sourceType: "unambiguous",
    },
  ],
};
