"use client";
import { useState } from "react";
import { useTextManipulation } from "@/hooks/useTextManipulation";
import { makeTextArray } from "@/libs/charCount";
import Button from "@/components/Button";
import { countCharsWithFilter, countTextAll } from "@/libs/charCount";
import {
  combinedAllFilters,
  isCircledNumber,
  isFullWidthAlphabet,
  isFullWidthDigit,
  isFullWidthJapanese,
  isFullWidthSpace,
  isHalfWidthAlphabet,
  isHalfWidthDigit,
  isHalfWidthKatakana,
  isHalfWidthSpace,
  isParagraph,
  isPunctuation,
  isSpecialAlphabet,
} from "@/libs/charUtils";
import { regexes } from "@/libs/regexs";
import DeleteBtn from "@/components/DeleteBtn";
import DarkMode from "@/components/DarkMode";

export default function Home() {
  const [chars, setChars] = useState<string>(""); //消す文字のインプット管理

  const { text, setText, charCount, clearTexts } = useTextManipulation("");

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  // クラスリスト
  const btnStyle =
    "text-xs bg-blue-950 text-neutral-100 rounded-sm cursor-pointer py-2 px-4 w-28 text-left sm:min-w-44 sm:text-sm";
  const countResultStyle = "text-right col-span-2";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      alert("コピーしたよ!");
    } catch (error) {
      console.log("コピーに失敗しました：", error);
    }
  };

  const deleteChars = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const textArray = makeTextArray(text);
    const charsArray = chars.split("");
    const deleteCharsArray = (arr: string[]) => {
      return arr.filter((char) => !charsArray.includes(char));
    };
    setText(deleteCharsArray(textArray).join(""));
    setChars("");
  };

  const deleteCharsNew = (regex: RegExp) => {
    setText((prev) => {
      const textArray = makeTextArray(prev);
      const newCharsArray = textArray.filter((char) => !regex.test(char));
      return newCharsArray.join("");
    });
  };

  const deleteBtns = [
    {
      label: "改行削除",
      fn: () => deleteCharsNew(regexes.paragraph),
    },
    {
      label: "スペース削除",
      fn: () => {
        deleteCharsNew(regexes.halfWidthSpace);
        deleteCharsNew(regexes.fullWidthSpace);
      },
    },
    {
      label: "全角の日本語削除",
      fn: () => deleteCharsNew(regexes.fullWidthJap),
    },
    {
      label: "半角カタカナ削除",
      fn: () => deleteCharsNew(regexes.halfWidthKatakana),
    },
    {
      label: "全角句読点削除",
      fn: () => deleteCharsNew(regexes.punctuation),
    },
    {
      label: "半角ABC削除",
      fn: () => deleteCharsNew(regexes.halfWidthAlphabet),
    },
    {
      label: "全角ＡＢＣ削除",
      fn: () => deleteCharsNew(regexes.fullWidthAlphabet),
    },
    {
      label: "特殊ABC削除",
      fn: () => deleteCharsNew(regexes.specialAlphabet),
    },
    {
      label: "半角数字削除",
      fn: () => deleteCharsNew(regexes.halfWidthDigit),
    },
    {
      label: "全角数字削除",
      fn: () => deleteCharsNew(regexes.fullWidthDigit),
    },
    {
      label: "丸囲み数字削除",
      fn: () => deleteCharsNew(regexes.circledNumber),
    },
    {
      label: "その他記号削除",
      fn: () => {
        const textArray = makeTextArray(text);
        const newTextArray = textArray.filter((char) => {
          return combinedAllFilters(char);
        });
        setText(newTextArray.join(""));
      },
    },
  ];
  const tableData = [
    {
      type: "title",
      label: "日本語文字",
    },
    {
      type: "data",
      label: "▻漢字・かな・カタ",
      countFn: countCharsWithFilter(text, isFullWidthJapanese),
    },
    {
      type: "data",
      label: "▻半角ｶﾀｶﾅ（半角の句読点等の記号は除く）",
      countFn: countCharsWithFilter(text, isHalfWidthKatakana),
    },
    {
      type: "data",
      label: "▻全角の句読点（。や、）",
      countFn: countCharsWithFilter(text, isPunctuation),
    },
    {
      type: "title",
      label: "アルファベット",
    },
    {
      type: "data",
      label: "▻半角ABC",
      countFn: countCharsWithFilter(text, isHalfWidthAlphabet),
    },
    {
      type: "data",
      label: "▻全角ＡＢＣ",
      countFn: countCharsWithFilter(text, isFullWidthAlphabet),
    },
    {
      type: "data",
      label: "▻特殊なABC（é,í,ñ,etc.）",
      countFn: countCharsWithFilter(text, isSpecialAlphabet),
    },
    {
      type: "title",
      label: "数字",
    },
    {
      type: "data",
      label: "▻半角123",
      countFn: countCharsWithFilter(text, isHalfWidthDigit),
    },
    {
      type: "data",
      label: "▻全角１２３",
      countFn: countCharsWithFilter(text, isFullWidthDigit),
    },
    {
      type: "data",
      label: "▻丸囲み数字①②③",
      countFn: countCharsWithFilter(text, isCircledNumber),
    },
    {
      type: "title",
      label: "上記以外",
    },
    {
      type: "data",
      label: "▻記号・特殊文字・絵文字",
      countFn:
        countTextAll(text) - countCharsWithFilter(text, combinedAllFilters),
    },
  ];

  return (
    <main className="m-auto max-w-256 mb-10">
      <section className="min-h-screen p-5 mx-auto w-full">
        <div className="flex justify-between">
          <h1 className="text-3xl">文字カウントアプリ</h1>
          <DarkMode />
        </div>
        <div className="mt-10">
          <form action="/" className="block w-full m-auto">
            <label htmlFor="textarea" className="block text-lg">
              テキストを入力したら自動的にカウントされます。
            </label>
            <textarea
              value={text}
              id="textarea"
              className="block w-full p-3 text-base bg-slate-500 text-neutral-50"
              rows={10}
              onChange={handleTextChange}
              placeholder="ここにテキストを入力してください。"
            />
            <div className="flex gap-5 mt-4">
              <Button
                className="inline-block text-xl px-4 py-2 cursor-pointer bg-gray-600 text-neutral-200 rounded-md"
                onClick={() => {
                  clearTexts();
                  setChars("");
                }}
                ariaLabel="テキストを消去します"
                label="クリア"
              />
              <Button
                className="inline-block text-xl px-4 py-2 cursor-pointer bg-blue-900 text-neutral-200 rounded-md"
                onClick={copyToClipboard}
                ariaLabel="テキストをクリップボードにコピー"
                label="コピー"
              />
            </div>
          </form>

          {/* ボタンで指定文字削除 */}
          <div className="mt-8 p-4 bg-slate-300 rounded-md shadow-lg">
            <p className="text-lg font-medium text-gray-800 mb-4">
              ボタンで文字を削除
            </p>
            <div className="flex flex-wrap gap-3">
              {deleteBtns.map((deleteBtn) => (
                <DeleteBtn
                  key={deleteBtn.label}
                  label={deleteBtn.label}
                  className="bg-green-700 hover:bg-green-600 text-white rounded-md px-4 py-2 shadow-md"
                  onClick={deleteBtn.fn}
                />
              ))}
            </div>
          </div>

          {/* 文字指定削除 */}
          <form className="mt-10 bg-slate-300 p-6 rounded-md shadow-lg mx-auto">
            <label
              htmlFor="chars"
              className="block text-lg font-medium text-gray-800"
            >
              自由に文字指定して削除（下にテキストを入力）
            </label>
            <div className="mt-4 flex gap-3 justify-center items-center flex-wrap">
              <input
                id="chars"
                type="text"
                value={chars}
                className="block flex-1 p-3 text-base bg-slate-500 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setChars(e.target.value)}
                placeholder="ここに削除する文字を入力"
              />
              <DeleteBtn
                label="指定した文字を消す"
                className="bg-green-700 hover:bg-green-600 text-white rounded px-4 py-2 shadow-md"
                onClick={deleteChars}
                aria-label="指定した文字を削除"
              />
            </div>
          </form>

          <table className="table-auto text-left w-full max-w-xl mx-auto mt-10 border-collapse">
            <caption className="text-xl font-bold mb-4">全文字数</caption>
            <thead className="bg-slate-500 text-white text-lg">
              <tr className="">
                <th className="p-2">スペース・段落あり</th>
                <th className="p-2">スペース・段落なし</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4">
                  <p>
                    <span className="text-2xl font-semibold">
                      {countTextAll(text)}
                    </span>{" "}
                    文字
                  </p>
                  <div className="text-xs flex gap-2 flex-wrap">
                    <div>
                      全角スペース:{" "}
                      {countCharsWithFilter(text, isFullWidthSpace)}
                    </div>
                    <div>
                      半角スペース:{" "}
                      {countCharsWithFilter(text, isHalfWidthSpace)}
                    </div>
                    <div>段落: {countCharsWithFilter(text, isParagraph)}</div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-2xl font-semibold">
                    {countTextAll(text) -
                      countCharsWithFilter(text, isParagraph) -
                      (countCharsWithFilter(text, isFullWidthSpace) +
                        countCharsWithFilter(text, isHalfWidthSpace))}
                  </span>{" "}
                  文字
                </td>
              </tr>
            </tbody>
          </table>

          <table className="table-auto m-auto mt-10 w-full max-w-xl">
            <caption className="text-xl font-bold mb-4">内訳</caption>
            <thead className="bg-slate-500 text-white text-lg">
              <tr>
                <th className="p-2 text-left">文字種別</th>
                <th className="p-2 pr-4 text-right">文字数</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((data) => {
                if (data.type === "title") {
                  return (
                    <tr
                      className="bg-blue-100 dark:bg-blue-900"
                      key={data.label}
                    >
                      <th colSpan={2} className="p-2 text-left">
                        {data.label}
                      </th>
                    </tr>
                  );
                }
                if (data.type === "data") {
                  return (
                    <tr
                      className="border-b dark:border-cyan-900"
                      key={data.label}
                    >
                      <td className="p-2 pl-4">{data.label}</td>
                      <td className="p-2 pr-4 text-right">
                        <span className="text-2xl font-semibold">
                          {data.countFn}
                        </span>
                        文字
                      </td>
                    </tr>
                  );
                }
                return null;
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
