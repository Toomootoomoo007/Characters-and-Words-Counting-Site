// 正規表現で文字を分類
// 日本語
// 全角文字（漢字、ひらがな、カタカナ）
export const isFullWidthJapanese = (char: string) =>
  /^(?![\u309B\u309C\u309D\u309E\u30A0\u30FD\u3006\u3007])[\u3040-\u309F\u30A0-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uD840-\uD87F\u3005][\uDC00-\uDFFF]?/.test(
    char
  );

// 半角カタカナ
export const isHalfWidthKatakana = (char: string) =>
  /^(?![\uFF61-\uFF65\uFF70\uFF9E\uFF9F])[\uFF61-\uFF9F]/.test(char);

// アルファベット
// 半角アルファベット
export const isHalfWidthAlphabet = (char: string) => /[A-Za-z]/.test(char);

// 全角アルファベット
export const isFullWidthAlphabet = (char: string) =>
  /[\uFF21-\uFF3A\uFF41-\uFF5A]/.test(char);

// 特殊なアルファベット（アクセント付きラテン文字など）
export const isSpecialAlphabet = (char: string) =>
  /[\u00C0-\u00FF\u0100-\u017F]/.test(char);

// 数字
// 半角数字
export const isHalfWidthDigit = (char: string) => /[0-9]/.test(char);

// 全角数字
export const isFullWidthDigit = (char: string) => /[\uFF10-\uFF19]/.test(char);

export const isCircledNumber = (char: string) =>
  /[\u2460-\u2473\u24EB-\u24FF]/.test(char);

// 記号／特殊文字
// 全角スペース
export const isFullWidthSpace = (char: string) => char === "\u3000";

// 半角スペース
export const isHalfWidthSpace = (char: string) => char === "\u0020";

// 段落（改行、キャリッジリターン）
export const isParagraph = (char: string) => /[\u000A\u000D]/.test(char);

// 句読点
export const isPunctuation = (char: string) => /[\u3001\u3002]/.test(char);

// 上記すべてのカテゴリーを統合した関数
export const combinedAllFilters = (char: string) => {
  return (
    isFullWidthJapanese(char) ||
    isHalfWidthKatakana(char) ||
    isHalfWidthAlphabet(char) ||
    isFullWidthAlphabet(char) ||
    isSpecialAlphabet(char) ||
    isHalfWidthDigit(char) ||
    isFullWidthDigit(char) ||
    isCircledNumber(char) ||
    isFullWidthSpace(char) ||
    isHalfWidthSpace(char) ||
    isParagraph(char) ||
    isPunctuation(char)
  );
};
