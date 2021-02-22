module.exports = {
    roots: ["__test__"],
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["js", "jsx", "json", "node", 'graphql'],
  }
  