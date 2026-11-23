module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/imgs");
  return{
    dir: {
      input: "src", // source files
      output: "public", // output files
    },
  };
};