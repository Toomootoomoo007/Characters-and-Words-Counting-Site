import "@/libs/types";
import emojiRegex from "emoji-regex";

export const countFuncs = (text: string): any => {
  const count = {} as CountingsObj;

  const countEnglishWords = (text: string) => {
    const latinWords = text.match(/\b[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ’'-]+\b/g) || [];
    return latinWords.length;
  };
  const words = countEnglishWords(text);

  const countNumberWords = (text: string) => {
    const numberWords = text.match(/\b\d+\b/g) || [];
    return numberWords.length;
  };
  const digitWords = countNumberWords(text);

  const segmenter = new Intl.Segmenter("jp-JP", {
    granularity: "grapheme",
  });
  const segmentTexts = [...segmenter.segment(text)];

  const textArry: string[] = [];
  segmentTexts.map((text) => {
    textArry.push(text.segment);
  });

  //テキスト配列から空白と改行を除外
  const removeSpaceAndBreaks = (arr: string[]) => {
    return arr.filter((char) => char !== " " && char !== "\n" && char !== "　");
  };
  const textArryNoSpacesBreaks = removeSpaceAndBreaks(textArry); //スペースと改行を除いた文字配列

  //テキスト配列から全角文字列（異体字含む）を抜き出し

  const emojiRegexStr = emojiRegex();

  const fullWidthCharactersArray = (arr: string[]) => {
    return arr.filter(
      (char) =>
        /[^\u0020-\u007E\uFF61-\uFF9F]/u.test(char) &&
        !/[a-zA-Z\u00C0-\u00FF\u0100-\u017F\u0180-\u024F]/.test(char) &&
        !emojiRegexStr.test(char)
    );
  };
  const textArryFullWidth = fullWidthCharactersArray(textArryNoSpacesBreaks);

  //全角数字を抜き出し
  const filterFullWidthDigits = (arr: string[]) => {
    return arr.filter((char) => /[\uFF10-\uFF19]/.test(char));
  };
  const fullWidthDigits = filterFullWidthDigits(textArryNoSpacesBreaks);

  //テキスト配列から半角カタカナを抜き出し
  const filterHalfWidthKana = (arr: string[]) => {
    return arr.filter((char) => /[\uFF61-\uFF9F]/.test(char));
  };
  const textArryHalfKatakana = filterHalfWidthKana(textArryNoSpacesBreaks);

  //テキスト配列から全角の英アルファベットを抜き出し
  const fullWidthAlphaChars = (arr: string[]) => {
    return arr.filter((char) => /[\uFF21-\uFF3A\uFF41-\uFF5A]/.test(char));
  };
  const textArryFullAlphaChars = fullWidthAlphaChars(textArryNoSpacesBreaks);

  //テキスト配列から全角の記号を抜き出し
  const fullWidthSymbolChars = (arr: string[]) => {
    return arr.filter((char) =>
      /[！＃＄％＆＊＋－：；＜＝＞？＠［＼］＾＿｀｛｜｝～、。〃〄々〆〇〈〉《》「」『』【】〒〓〘〙〚〛〜〝〟〠〡〢〣〤〥〦〧〨〩〪〭〮〯〫〬〰〱〲〳〴〵〶〷〸〹〺〻〼〽〾〿\u3000-\u303F\uFF00-\uFFEF\u2190-\u21FF\u2200-\u22FF\uF8FF]/u.test(
        char
      )
    );
  };
  const textArryFullSymbol = fullWidthSymbolChars(textArryNoSpacesBreaks);

  //半角英数字
  const filterLatinAlphanumeric = (arr: string[]) => {
    return arr.filter((char) =>
      /[a-zA-Z0-9\u00C0-\u00FF\u0100-\u017F\u0180-\u024F]/.test(char)
    );
  };
  const halfWidthAlphaNumeric = filterLatinAlphanumeric(textArryNoSpacesBreaks);

  //半角数字
  const filterHalfWidthDigits = (arr: string[]) => {
    return arr.filter((char) => /[0-9]/.test(char));
  };
  const halfWidthDigitsArray = filterHalfWidthDigits(textArryNoSpacesBreaks);

  //半角記号を抜き出し
  const halfWidthSymbolChars = (arr: string[]) => {
    return arr.filter((char) =>
      /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~¥]/.test(char)
    );
  };
  const textArryHalfSymbol = halfWidthSymbolChars(textArryNoSpacesBreaks);

  //絵文字の抜き出し
  const extractEmojis = (arr: string[]) => {
    return arr.filter((char) =>
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u.test(
        char
      )
    );
  };

  const emojiArray = extractEmojis(textArryNoSpacesBreaks);
  count.words = words;
  count.digitWords = digitWords;
  count.allLength = textArry.length; //生の文字列
  count.withoutSpacesBreaks = textArryNoSpacesBreaks.length; //スペースと除外
  count.fullWidth = textArryFullWidth.length; //全角すべて
  count.fullWidthAlphabet = textArryFullAlphaChars.length; //全角アルファベット
  count.fullWidthDigits = fullWidthDigits.length; //全角数字
  count.fullWidthSymbol = textArryFullSymbol.length; //全角記号
  count.halfWidthKana = textArryHalfKatakana.length; //半角カタカナ
  count.halfWidthCharas = halfWidthAlphaNumeric.length; //半角英数字
  count.halfWidthDigits = halfWidthDigitsArray.length; //半角数字
  count.halfSymbols = textArryHalfSymbol.length; //半角特殊記号
  count.emojis = emojiArray.length; //絵文字

  return count;
};
