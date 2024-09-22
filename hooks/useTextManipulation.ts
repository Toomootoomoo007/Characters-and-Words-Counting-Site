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
  const [text, setText] = useState(initialText);
  const charCount = useMemo(() => countFuncs(text), [text]);

  const updateText = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const updateWithArray = useCallback(
    (arrayFunc: (text: string) => string[]) => {
      updateText(arrayFunc(text).join(""));
    },
    []
  );

  const clearTexts = useCallback(() => {
    updateText("");
  }, [updateText]);

  const deleteSpacesBreaks = useCallback(() => {
    updateWithArray(removeSpaceAndBreaksArray);
  }, [updateText]);

  const deleteFullWidthChars = useCallback(() => {
    updateWithArray(fullWidthCharactersArray);
  }, [updateText]);

  const deleteFullWidthNum = useCallback(() => {
    updateWithArray(deleteFullWidthNumArray);
  }, [updateText]);

  const deleteFullLatinChars = useCallback(() => {
    updateWithArray(deleteFullWidthLatinCharsArray);
  }, [updateText]);

  const deleteJapDots = useCallback(() => {
    updateWithArray(deleteJapDotsArray);
  }, [updateText]);

  const deleteHalfKata = useCallback(() => {
    updateWithArray(deleteHalfKataArray);
  }, [updateText]);

  const deleteHalfNum = useCallback(() => {
    updateWithArray(deleteHalfNumArray);
  }, [updateText]);

  const deleteHalfAlphaNum = useCallback(() => {
    updateWithArray(deleteHalfAlphaNumArray);
  }, [updateText]);

  const deleteSymbol = useCallback(() => {
    updateWithArray(deleteSymbolArray);
  }, [updateText]);

  const deleteFullWidthSymbol = useCallback(() => {
    updateWithArray(deleteFullWidthSymbolArray);
  }, [updateText]);

  const deleteHalfSymbol = useCallback(() => {
    updateWithArray(deleteHalfSymbolArray);
  }, [updateText]);

  const deleteEmojis = useCallback(() => {
    updateWithArray(deleteEmojiArray);
  }, [updateText]);

  const deleteJapChars = useCallback(() => {
    updateWithArray(deleteJapArray);
  }, [updateText]);

  const deletePunctuations = useCallback(() => {
    updateWithArray(deletePunctuationsArray);
  }, [updateText]);

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
