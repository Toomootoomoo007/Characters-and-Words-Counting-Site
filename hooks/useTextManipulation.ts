import { useCallback, useMemo, useState } from "react";
import {
  countFuncs,
  deleteEmojiArray,
  deleteFullWidthLatinCharsArray,
  deleteFullWidthNumArray,
  deleteFullWidthSymbolArray,
  deleteHalfAlphaNumArray,
  deleteHalfKataArray,
  deleteHalfNumArray,
  deleteHalfSymbolArray,
  deleteJapArray,
  deleteJapDotsArray,
  deletePunctuationsArray,
  deleteSymbolArray,
  fullWidthCharactersArray,
  removeSpaceAndBreaksArray,
} from "@/libs/countFuncs";

export const useTextManipulation = (initialText: string) => {
  const [text, setText] = useState(() => initialText);
  const charCount = useMemo(() => countFuncs(text), [text]);

  const updateText = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const updateWithArray = useCallback(
    (arrayFunc: (text: string) => string[]) => {
      updateText(arrayFunc(text).join(""));
    },
    [text, updateText]
  );

  const clearTexts = useCallback(() => {
    updateText("");
  }, [text, updateText]);

  const deleteSpacesBreaks = useCallback(() => {
    updateWithArray(removeSpaceAndBreaksArray);
  }, [text, updateText]);

  const deleteFullWidthChars = useCallback(() => {
    updateWithArray(fullWidthCharactersArray);
  }, [text, updateText]);

  const deleteFullWidthNum = useCallback(() => {
    updateWithArray(deleteFullWidthNumArray);
  }, [text, updateText]);

  const deleteFullLatinChars = useCallback(() => {
    updateWithArray(deleteFullWidthLatinCharsArray);
  }, [text, updateText]);

  const deleteJapDots = useCallback(() => {
    updateWithArray(deleteJapDotsArray);
  }, [text, updateText]);

  const deleteHalfKata = useCallback(() => {
    updateWithArray(deleteHalfKataArray);
  }, [text, updateText]);

  const deleteHalfNum = useCallback(() => {
    updateWithArray(deleteHalfNumArray);
  }, [text, updateText]);

  const deleteHalfAlphaNum = useCallback(() => {
    updateWithArray(deleteHalfAlphaNumArray);
  }, [text, updateText]);

  const deleteSymbol = useCallback(() => {
    updateWithArray(deleteSymbolArray);
  }, [text, updateText]);

  const deleteFullWidthSymbol = useCallback(() => {
    updateWithArray(deleteFullWidthSymbolArray);
  }, [text, updateText]);

  const deleteHalfSymbol = useCallback(() => {
    updateWithArray(deleteHalfSymbolArray);
  }, [text, updateText]);

  const deleteEmojis = useCallback(() => {
    updateWithArray(deleteEmojiArray);
  }, [text, updateText]);

  const deleteJapChars = useCallback(() => {
    updateWithArray(deleteJapArray);
  }, [text, updateText]);

  const deletePunctuations = useCallback(() => {
    updateWithArray(deletePunctuationsArray);
  }, [text, updateText]);

  return {
    text,
    setText,
    charCount,
    clearTexts,
    deleteSpacesBreaks,
    deleteEmojis,
    deleteFullLatinChars,
    deleteFullWidthChars,
    deleteFullWidthNum,
    deleteFullWidthSymbol,
    deleteJapDots,
    deleteHalfNum,
    deleteHalfAlphaNum,
    deleteHalfKata,
    deleteJapChars,
    deleteHalfSymbol,
    deleteSymbol,
    deletePunctuations,
  };
};
