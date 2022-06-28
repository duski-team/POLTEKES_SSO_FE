module.exports = {
  globals: {
    random: "change",
    "vue-jest": {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith("C"),
      },
    },
  },
};
