export const makeTextArray = (text: string): string[] => {
  const segmenter = new Intl.Segmenter("jp-JP", {
    granularity: "grapheme",
  });
  return [...segmenter.segment(text)]
    .map((segment) => segment.segment)
    .filter((char) => !/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(char));
};

export const countTextAll = (text: string) => makeTextArray(text).length;

export const countCharsWithFilter = (
  text: string,
  filterFunc: (input: string) => boolean
) => {
  const textArray = makeTextArray(text);
  return textArray.filter((char) => filterFunc(char)).length;
};
