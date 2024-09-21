import { useState } from "react";
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
  const [charCount, setCharCount] = useState(countFuncs(initialText));

  const updateText = (newText: string) => {
    setText(newText);
    setCharCount(countFuncs(newText));
  };

  const clearTexts = () => {
    updateText("");
  };

  const deleteSpacesBreaks = () => {
    updateText(removeSpaceAndBreaksArray(text).join(""));
  };

  const deleteFullWidthChars = () => {
    updateText(fullWidthCharactersArray(text).join(""));
  };

  const deleteFullWidthNum = () => {
    updateText(deleteFullWidthNumArray(text).join(""));
  };

  const deleteFullLatinChars = () => {
    updateText(deleteFullWidthLatinCharsArray(text).join(""));
  };

  const deleteJapDots = () => {
    updateText(deleteJapDotsArray(text).join(""));
  };

  const deleteHalfKata = () => {
    updateText(deleteHalfKataArray(text).join(""));
  };

  const deleteHalfNum = () => {
    updateText(deleteHalfNumArray(text).join(""));
  };

  const deleteHalfAlphaNum = () => {
    updateText(deleteHalfAlphaNumArray(text).join(""));
  };

  const deleteSymbol = () => {
    updateText(deleteSymbolArray(text).join(""));
  };

  const deleteFullWidthSymbol = () => {
    updateText(deleteFullWidthSymbolArray(text).join(""));
  };

  const deleteHalfSymbol = () => {
    updateText(deleteHalfSymbolArray(text).join(""));
  };

  const deleteEmojis = () => {
    updateText(deleteEmojiArray(text).join(""));
  };

  const deleteJapChars = () => {
    updateText(deleteJapArray(text).join(""));
  };
  const deletePunctuations = () => {
    updateText(deletePunctuationsArray(text).join(""));
  };

  return {
    text,
    charCount,
    setText,
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
