module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/imgs");
  eleventyConfig.addPassthroughCopy("src/field_recs");

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
