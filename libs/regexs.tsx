export const regexes = {
  fullWidthJap:
    /^(?![\u309B\u309C\u309D\u309E\u30A0\u30FD\u3006\u3007\u30FB])[\u3040-\u309F\u30A0-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uD840-\uD87F\u3005][\uDC00-\uDFFF]?/,
  halfWidthKatakana: /^(?![\uFF61-\uFF65\uFF70\uFF9E\uFF9F])[\uFF61-\uFF9F]/,
  halfWidthAlphabet: /[A-Za-z]/,
  fullWidthAlphabet: /[\uFF21-\uFF3A\uFF41-\uFF5A]/,
  specialAlphabet: /[\u00C0-\u00FF\u0100-\u017F]/,
  halfWidthDigit: /[0-9]/,
  fullWidthDigit: /[\uFF10-\uFF19]/,
  circledNumber: /[\u2460-\u2473\u24EB-\u24FF]/,
  fullWidthSpace: /[\u3000]/,
  halfWidthSpace: /[\u0020]/,
  paragraph: /[\u000A\u000D]/,
  punctuation: /[\u3001\u3002]/,
};
