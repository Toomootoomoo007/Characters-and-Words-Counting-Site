import { regexes } from "./regexs";

// 正規表現で文字を分類
// 日本語
// 全角文字（漢字、ひらがな、カタカナ）
export const isFullWidthJapanese = (char: string) =>
  regexes.fullWidthJap.test(char);

// 半角カタカナ
export const isHalfWidthKatakana = (char: string) =>
  regexes.halfWidthKatakana.test(char);

// アルファベット
// 半角アルファベット
export const isHalfWidthAlphabet = (char: string) =>
  regexes.halfWidthAlphabet.test(char);

// 全角アルファベット
export const isFullWidthAlphabet = (char: string) =>
  regexes.fullWidthAlphabet.test(char);

// 特殊なアルファベット（アクセント付きラテン文字など）
export const isSpecialAlphabet = (char: string) =>
  regexes.specialAlphabet.test(char);

// 数字
// 半角数字
export const isHalfWidthDigit = (char: string) =>
  regexes.halfWidthDigit.test(char);

// 全角数字
export const isFullWidthDigit = (char: string) =>
  regexes.fullWidthDigit.test(char);

export const isCircledNumber = (char: string) =>
  regexes.circledNumber.test(char);

// 記号／特殊文字
// 全角スペース
export const isFullWidthSpace = (char: string) =>
  regexes.fullWidthSpace.test(char);

// 半角スペース
export const isHalfWidthSpace = (char: string) =>
  regexes.halfWidthSpace.test(char);

// 段落（改行、キャリッジリターン）
export const isParagraph = (char: string) => regexes.paragraph.test(char);

// 句読点
export const isPunctuation = (char: string) => regexes.punctuation.test(char);

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
