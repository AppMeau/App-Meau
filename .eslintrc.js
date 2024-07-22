module.exports = {
  root: true,
  extends: ["universe/native"],
  rules: {
    // Ensures props and state inside functions are always up-to-date
    "react-hooks/exhaustive-deps": "warn",
    rules: {
      'linebreak-style': process.platform === 'win32' ? 0 : 2,
}
  },
};
