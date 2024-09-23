"use client";
import { useState } from "react";
import { useTextManipulation } from "@/hooks/useTextManipulation";
import { makeTextArray } from "@/libs/countFuncs";
import Button from "@/components/Button";
import { countCharsWithFilter, countTextAll } from "@/libs/charCount";
import {
  combinedAllFilters,
  isCircledNumber,
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

const initialLetters =
  "ここに「文字」を入れたら、カウントするよ🧜‍♀️ Type here, then I'll count them all! Escriba aquí, y los contaré👩🏻‍💻";

export default function Home() {
  const [chars, setChars] = useState<string>(""); //消す文字のインプット管理

  const { text, setText, charCount, clearTexts } =
    useTextManipulation(initialLetters);

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

  return (
    <main>
      <section className="min-h-screen p-5 mx-auto w-full">
        <h1 className="text-3xl">文字・単語カウント</h1>
        <div className="mt-10">
          <form action="/" className="block w-full max-w-256 m-auto">
            <label htmlFor="textarea" className="block text-lg">
              カウントしたいテキストを入力してください。
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
          <div className=" w-full max-w-256 m-auto">
            <div className="mt-2">
              <dl className="grid grid-cols-3 gap-y-3 ">
                <dt className="text-xl font-bold">単語数</dt>
                <dd className={`{countResultStyle}`}>{charCount.words}単語</dd>
                <dd>数字の単語は{charCount.digitWords}単語</dd>

                <dt className="text-xl font-bold">文字数</dt>
                <dd className={`col-span-2`} aria-live="polite">
                  <span className="text-2xl">{countTextAll(text)}</span>
                  文字
                  <span className="text-xs">
                    {" "}
                    *
                    {`全角スペース${countCharsWithFilter(
                      text,
                      isFullWidthSpace
                    )}、半角スペース${countCharsWithFilter(
                      text,
                      isHalfWidthSpace
                    )}`}
                    、段落{countCharsWithFilter(text, isParagraph)}を含む
                  </span>
                </dd>
                <dd className={`col-start-2`}>
                  <span className="text-2xl">
                    {countTextAll(text) -
                      countCharsWithFilter(text, isParagraph) -
                      (countCharsWithFilter(text, isFullWidthSpace) +
                        countCharsWithFilter(text, isHalfWidthSpace))}
                  </span>
                  文字<span className="text-xs"> *改行・スペースなし</span>
                </dd>

                <dt className="text-xl font-bold col-span-3 border-b-2 border-y-indigo-950">
                  文字数の内訳
                </dt>
                <dd className="mt-2 font-bold col-span-3">日本語文字</dd>
                <dd className="pl-3">▻漢字・かな・カタ</dd>
                <dd className={` ${countResultStyle}`}>
                  <span className="pl-2">
                    {countCharsWithFilter(text, isFullWidthJapanese)}
                  </span>
                  文字
                </dd>
                <dd className="pl-3">
                  ▻半角ｶﾀｶﾅ（半角の句読点等の記号は除く）
                </dd>
                <dd className={` ${countResultStyle}`}>
                  <span className="pl-2">
                    {countCharsWithFilter(text, isHalfWidthKatakana)}
                  </span>
                  文字
                </dd>
                <dd className="pl-3 mt-2">▻全角の句読点(。や、)</dd>
                <dd className={` ${countResultStyle}`}>
                  <span className="">
                    {countCharsWithFilter(text, isPunctuation)}
                  </span>
                  文字
                </dd>
                <dd className="mt-2 font-bold col-span-3">アルファベット</dd>
                <dd className="pl-3 mt-2">▻半角ABC</dd>
                <dd className={` ${countResultStyle}`}>
                  <span className="">
                    {countCharsWithFilter(text, isHalfWidthAlphabet)}
                  </span>
                  文字
                </dd>
                <dd className="pl-3 mt-2">▻特殊な半角ABC（í, ñ, etc.）</dd>
                <dd className={` ${countResultStyle}`}>
                  <span className="">
                    {countCharsWithFilter(text, isSpecialAlphabet)}
                  </span>
                  文字
                </dd>
                <dd className="pl-3">▻全角ＡＢＣ</dd>
                <dd className={` ${countResultStyle}`}>
                  <span className="pl-2">{charCount.fullWidthAlphabet}</span>
                  文字
                </dd>

                <dd className="mt-2 font-bold col-span-3">数字</dd>
                <dd className="pl-3 mt-2">▻半角数字</dd>
                <dd className={` ${countResultStyle}`}>
                  <span className="">
                    {countCharsWithFilter(text, isHalfWidthDigit)}
                  </span>
                  文字
                </dd>
                <dd className="pl-3 mt-2">▻全角数字</dd>
                <dd className={` ${countResultStyle}`}>
                  <span className="">
                    {countCharsWithFilter(text, isFullWidthDigit)}
                  </span>
                  文字
                </dd>
                <dd className="pl-3 mt-2">▻囲み数字</dd>
                <dd className={` ${countResultStyle}`}>
                  <span className="">
                    {countCharsWithFilter(text, isCircledNumber)}
                  </span>
                  文字
                </dd>
                <dd className="mt-2 font-bold col-span-3">
                  その他記号 *スペース、段落、句読点を除く
                </dd>

                <dd className="pl-3 mt-2">▻上記以外の記号や絵文字</dd>
                <dd className={` ${countResultStyle}`} aria-live="polite">
                  <span className="text-2xl">
                    {countTextAll(text) -
                      countCharsWithFilter(text, combinedAllFilters)}
                  </span>
                  文字
                </dd>
              </dl>
              <p className="text-xl font-bold border-b-2 border-y-indigo-950 mt-12">
                指定した文字を消す
              </p>
              <form action="" className="w-full flex gap-2 flex-wrap mt-2">
                <label htmlFor="chars" className="block text-md">
                  削除したい文字を入力
                </label>
                <input
                  id="chars"
                  type="text"
                  value={chars}
                  className="block w-3/5 p-3 text-base bg-slate-500 text-neutral-50"
                  onChange={(e) => {
                    setChars(e.target.value);
                  }}
                  placeholder="ここに消したい文字を入力してください。"
                />
                <input
                  type="submit"
                  value={"指定した文字を消す"}
                  onClick={deleteChars}
                  className={btnStyle}
                  aria-label="指定した文字を削除"
                />
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
