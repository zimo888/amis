module.exports = function (code) {
  code = code.replace(/__uri\(\s*(['"])(.*?)\1\s*\)/g, (_, quote, target) => {
    return `new URL(${quote}${target}${quote}, import.meta.url).href`;
  });

  code = code.replace('__inline', 'require');
  return code;
};