import { useCallback, useMemo, useState } from "react";
import { countFuncs } from "@/libs/countFuncs";

export const useTextManipulation = (initialText: string) => {
  const [text, setText] = useState(() => initialText);
  const charCount = useMemo(() => countFuncs(text), [text]);

  const updateText = useCallback((newText: string) => {
    setText(newText);
  }, []);

  const clearTexts = useCallback(() => {
    updateText("");
  }, [text, updateText]);

  return {
    text,
    setText,
    charCount,
    clearTexts,
  };
};
