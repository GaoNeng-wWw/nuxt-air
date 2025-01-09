// Detect based on query, cookie, header
export default defineI18nLocaleDetector((event, config) => {
  // If the locale cannot be resolved up to this point, it is resolved with the value `defaultLocale` of the locale config passed to the function
  return config.defaultLocale;
});
