import "@/libs/types";
export const countFuncs = (text: string): CountingsObj => {
  const count = {} as CountingsObj;

  //生の長さ
  count.allLength = text.length;

  // スペースや改行を削除
  count.noSpacesLength = text.replace(/\s/g, "").length;

  // 全角文字数
  count.fullWidthLength = (text.match(/[^\x00-\x7F]/g) || []).length;

  // 半角カタカナ文字数
  count.halfWidthKanaLength = (text.match(/[\uFF61-\uFF9F]/g) || []).length;

  //全角文字数と半角カタカナ文字数
  count.fullAndHalfKanaLength =
    count.fullWidthLength + count.halfWidthKanaLength;

  // 半角英数字文字数
  count.halfWidthAllnumLength = (text.match(/[a-zA-Z0-9]/g) || []).length;

  // 半角英数字の単語数
  count.halfWidthAlnumWords = (text.match(/\b[a-zA-Z0-9]+\b/g) || []).length;

  //半角数字数
  count.numLength = (text.match(/[0-9]/g) || []).length;

  // 全角数字文字数
  count.fullWidthDigitsLength = (text.match(/[\uFF10-\uFF19]/g) || []).length;

  // 全角英語文字数
  count.fullWidthAlphaLength = (
    text.match(/[\uFF21-\uFF3A\uFF41-\uFF5A]/g) || []
  ).length;

  // 数字の単語数
  count.numberWords = (text.match(/\b\d+\b/g) || []).length;

  //特殊文字の数
  count.specialCharLength = (
    text.match(
      /[^a-zA-Z0-9\s\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uFF10-\uFF19]/g
    ) || []
  ).length;

  // 全角特殊文字の数（英数字、ひらがな、カタカナ、漢字、数字を除く）
  count.fullWidthSpecialCharLength = (
    text.match(
      /[^\x00-\x7F\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/g
    ) || []
  ).length;

  return count;
};
