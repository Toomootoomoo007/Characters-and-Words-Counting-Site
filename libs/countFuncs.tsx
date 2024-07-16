import "@/libs/types";
import emojiRegex from "emoji-regex";
const emojiRegexStr = emojiRegex();

const makeTextArray = (text: string): string[] => {
  const segmenter = new Intl.Segmenter("jp-JP", {
    granularity: "grapheme",
  });
  const segmentTexts = [...segmenter.segment(text)];

  const textArry: string[] = [];
  segmentTexts.map((text) => {
    textArry.push(text.segment);
  });
  return textArry;
};

export const latinWordsArray = (text: string) =>
  text.match(/\b[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ’'-]+\b/g) || [];

export const removeSpaceAndBreaksArray = (text: string) => {
  const textArray = makeTextArray(text);
  return textArray.filter(
    (char) => char !== " " && char !== "\n" && char !== "　"
  );
};

export const fullWidthCharactersArray = (text: string) => {
  const textArray = makeTextArray(text);
  return textArray.filter(
    (char) =>
      !/[\uFF01-\uFF5E\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A]/.test(char) &&
      !/[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/.test(
        char
      ) &&
      !emojiRegexStr.test(char)
  );
};

export const deleteFullWidthNumArray = (text: string) => {
  const textArray = makeTextArray(text);
  const filterFullWidthDigits = (arr: string[]) => {
    return arr.filter((char) => !/[\uFF10-\uFF19]/.test(char));
  };
  return filterFullWidthDigits(textArray);
};

export const deleteFullWidthLatinCharsArray = (text: string) => {
  const textArray = makeTextArray(text);
  const fullWidthAlphaChars = (arr: string[]) => {
    return arr.filter((char) => !/[\uFF21-\uFF3A\uFF41-\uFF5A]/.test(char));
  };
  return fullWidthAlphaChars(textArray);
};
export const deleteJapDotsArray = (text: string) => {
  const textArray = makeTextArray(text);
  const filterFullDots = (arr: string[]) => {
    return arr.filter((char) => !/[。、]/.test(char));
  };
  return filterFullDots(textArray);
};

export const deleteHalfKataArray = (text: string) => {
  const textArray = makeTextArray(text);
  const filterHalfWidthKana = (arr: string[]) => {
    return arr.filter((char) => !/[\uFF61-\uFF9F]/.test(char));
  };
  return filterHalfWidthKana(textArray);
};

export const deleteHalfAlphaNumArray = (text: string) => {
  const textArray = makeTextArray(text);
  const filterLatinAlphanumeric = (arr: string[]) => {
    return arr.filter(
      (char) => !/[a-zA-Z0-9\u00C0-\u00FF\u0100-\u017F\u0180-\u024F]/.test(char)
    );
  };
  return filterLatinAlphanumeric(textArray);
};

export const deleteHalfNumArray = (text: string) => {
  const textArray = makeTextArray(text);
  const filterHalfWidthDigits = (arr: string[]) => {
    return arr.filter((char) => !/[0-9]/.test(char));
  };
  return filterHalfWidthDigits(textArray);
};

export const deleteSymbolArray = (text: string) => {
  const textArray = makeTextArray(text);
  const fullWidthSymbolChars = (arr: string[]) => {
    return arr.filter(
      (char) =>
        !/[！＃＄％＆＊＋－：；＜＝＞？＠［＼］＾＿｀｛｜｝～、。〃〄々〆〇〈〉《》「」『』【】〒〓〘〙〚〛〜〝〟〠〡〢〣〤〥〦〧〨〩〪〭〮〯〫〬〰〱〲〳〴〵〶〷〸〹〺〻〼〽〾〿\u3000-\u303F\uFF00-\uFFEF\u2190-\u21FF\u2200-\u22FF\uF8FF]/u.test(
          char
        ) && !/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~¥]/.test(char)
    );
  };
  return fullWidthSymbolChars(textArray);
};
export const deleteHalfSymbolArray = (text: string) => {
  const textArray = makeTextArray(text);
  const fullWidthSymbolChars = (arr: string[]) => {
    return arr.filter(
      (char) => !/[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~¥]/.test(char)
    );
  };
  return fullWidthSymbolChars(textArray);
};
export const deleteEmojiArray = (text: string) => {
  const textArray = makeTextArray(text);
  const extractEmojis = (arr: string[]) => {
    return arr.filter(
      (char) =>
        !/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}]/u.test(
          char
        )
    );
  };
  return extractEmojis(textArray);
};
export const deleteJapArray = (text: string) => {
  const textArray = makeTextArray(text);
  const extractJaps = (arr: string[]) => {
    return arr.filter(
      (char) =>
        !/^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\u3400-\u4DBF\u{20000}-\u{2A6DF}\u{2A700}-\u{2B73F}\u{2B740}-\u{2B81F}\u{2B820}-\u{2CEAF}\u{2CEB0}-\u{2EBEF}]$/u.test(
          char
        )
    );
  };
  return extractJaps(textArray);
};

export const deletePunctuationsArray = (text: string) => {
  const textArray = makeTextArray(text);
  const extractPuncts = (arr: string[]) => {
    return arr.filter((char) => !/[.,:;]/.test(char));
  };
  return extractPuncts(textArray);
};

export const deleteFullWidthSymbolArray = (text: string) => {
  const textArray = makeTextArray(text);
  const fullWidthSymbolChars = (arr: string[]) => {
    return arr.filter(
      (char) =>
        !/[！＃＄％＆＊＋－：；＜＝＞？＠［＼］＾＿｀｛｜｝～、。〃〄々〆〇〈〉《》「」『』【】〒〓〘〙〚〛〜〝〟〠〡〢〣〤〥〦〧〨〩〪〭〮〯〫〬〰〱〲〳〴〵〶〷〸〹〺〻〼〽〾〿\u3000-\u303F\uFF00-\uFFEF\u2190-\u21FF\u2200-\u22FF\uF8FF]/u.test(
          char
        )
    );
  };
  return fullWidthSymbolChars(textArray);
};

export const countFuncs = (text: string): any => {
  const count = {} as CountingsObj;

  const countEnglishWords = (text: string) => {
    const latinWords = latinWordsArray(text);
    return latinWords.length;
  };
  const words = countEnglishWords(text);

  const countNumberWords = (text: string) => {
    const numberWords = text.match(/\b\d+\b/g) || [];
    return numberWords.length;
  };
  const digitWords = countNumberWords(text);

  //テキスト配列
  const textArray = makeTextArray(text);

  //空白と改行を除外したテキスト配列
  const textArryNoSpacesBreaks = removeSpaceAndBreaksArray(text);

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

  //テキスト配列から漢字／かな／カタ（異体字含む）を抜き出し
  const fullWidthJapArray = (arr: string[]) => {
    return arr.filter((char) =>
      /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\u3400-\u4DBF\u{20000}-\u{2A6DF}\u{2A700}-\u{2B73F}\u{2B740}-\u{2B81F}\u{2B820}-\u{2CEAF}\u{2CEB0}-\u{2EBEF}]$/u.test(
        char
      )
    );
  };
  const textArryFullJap = fullWidthJapArray(textArryNoSpacesBreaks);

  //全角数字を抜き出し
  const filterFullWidthDigits = (arr: string[]) => {
    return arr.filter((char) => /[\uFF10-\uFF19]/.test(char));
  };
  const fullWidthDigits = filterFullWidthDigits(textArryNoSpacesBreaks);

  //句読点を抜き出し
  const filterFullDots = (arr: string[]) => {
    return arr.filter((char) => /[。、]/.test(char));
  };
  const fullDotsArray = filterFullDots(textArryNoSpacesBreaks);

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

  //ピリオドなどを抜き出し
  const extractPunctuation = (arr: string[]) => {
    return arr.filter((char) => /[.,:;]/.test(char));
  };
  const textArryPunctuations = extractPunctuation(textArryNoSpacesBreaks);

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
  count.allLength = textArray.length; //生の文字列
  count.withoutSpacesBreaks = textArryNoSpacesBreaks.length; //スペースと除外
  count.fullWidth = textArryFullWidth.length; //全角すべて
  count.fullWidthAlphabet = textArryFullAlphaChars.length; //全角アルファベット
  count.fullDots = fullDotsArray.length; //句読点
  count.fullWidthDigits = fullWidthDigits.length; //全角数字
  count.fullWidthSymbol = textArryFullSymbol.length; //全角記号
  count.halfWidthKana = textArryHalfKatakana.length; //半角カタカナ
  count.halfWidthCharas = halfWidthAlphaNumeric.length; //半角英数字
  count.halfWidthDigits = halfWidthDigitsArray.length; //半角数字
  count.halfSymbols = textArryHalfSymbol.length; //半角特殊記号
  count.emojis = emojiArray.length; //絵文字
  count.fullJap = textArryFullJap.length; //漢字・かな・カタ
  count.puncts = textArryPunctuations.length;
  count.halfAll =
    textArryHalfKatakana.length +
    halfWidthAlphaNumeric.length +
    halfWidthDigitsArray.length +
    textArryHalfSymbol.length;
  return count;
};
