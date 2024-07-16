"use client";
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
  latinWordsArray,
  removeSpaceAndBreaksArray,
} from "@/libs/countFuncs";
import { useRef, useState } from "react";

const initialLetters =
  "ここに「文字」を入れたら、カウントするよ🧜‍♀️ Type here, then I'll count them all! Escriba aquí, y los contaré👩🏻‍💻";

export default function Home() {
  const [charCount, setCharCount] = useState(countFuncs(initialLetters));
  const textareaEle = useRef<HTMLTextAreaElement>(null);
  const btnStyle =
    "text-sm bg-blue-950 text-neutral-100 rounded-sm cursor-pointer py-2 px-4 min-w-44";

  const countResultStyle = "max-w-24 text-right";

  const counting: (event: React.ChangeEvent<HTMLTextAreaElement>) => void = (
    event
  ) => {
    const text = event.target.value;
    const countObj = countFuncs(text);
    setCharCount(countObj);
  };

  const copyToClipboard = async () => {
    const textarea = document.querySelector("#textarea") as HTMLTextAreaElement;
    const text: string = textarea.value || "";
    await navigator.clipboard.writeText(text);
    alert("コピーしたよ!");
  };

  const deleteSpacesBreaks = () => {
    const text = textareaEle.current!.value;
    textareaEle.current!.value = removeSpaceAndBreaksArray(text).join("");
    setCharCount(countFuncs(textareaEle.current!.value));
  };

  const deleteFullWidthChars = () => {
    const text = textareaEle.current!.value;
    textareaEle.current!.value = fullWidthCharactersArray(text).join("");
    setCharCount(countFuncs(textareaEle.current!.value));
  };

  const deleteFullWidthNum = () => {
    const text = textareaEle.current!.value;
    textareaEle.current!.value = deleteFullWidthNumArray(text).join("");
    setCharCount(countFuncs(textareaEle.current!.value));
  };

  const deleteFullLatinChars = () => {
    const text = textareaEle.current!.value;
    textareaEle.current!.value = deleteFullWidthLatinCharsArray(text).join("");
    setCharCount(countFuncs(textareaEle.current!.value));
  };
  const deleteJapDots = () => {
    const text = textareaEle.current!.value;
    textareaEle.current!.value = deleteJapDotsArray(text).join("");
    setCharCount(countFuncs(textareaEle.current!.value));
  };

  const deleteHalfKata = () => {
    const text = textareaEle.current!.value;
    textareaEle.current!.value = deleteHalfKataArray(text).join("");
    setCharCount(countFuncs(textareaEle.current!.value));
  };
  const deleteHalfNum = () => {
    const text = textareaEle.current!.value;
    textareaEle.current!.value = deleteHalfNumArray(text).join("");
    setCharCount(countFuncs(textareaEle.current!.value));
  };
  const deleteHalfAlphaNum = () => {
    const text = textareaEle.current!.value;
    textareaEle.current!.value = deleteHalfAlphaNumArray(text).join("");
    setCharCount(countFuncs(textareaEle.current!.value));
  };
  const deleteSymbol = () => {
    const text = textareaEle.current!.value;
    textareaEle.current!.value = deleteSymbolArray(text).join("");
    setCharCount(countFuncs(textareaEle.current!.value));
  };
  const deleteFullWidthSymbol = () => {
    const text = textareaEle.current!.value;
    textareaEle.current!.value = deleteFullWidthSymbolArray(text).join("");
    setCharCount(countFuncs(textareaEle.current!.value));
  };
  const deleteHalfSymbol = () => {
    const text = textareaEle.current!.value;
    textareaEle.current!.value = deleteHalfSymbolArray(text).join("");
    setCharCount(countFuncs(textareaEle.current!.value));
  };
  const deleteEmojis = () => {
    const text = textareaEle.current!.value;
    textareaEle.current!.value = deleteEmojiArray(text).join("");
    setCharCount(countFuncs(textareaEle.current!.value));
  };
  const deleteJapChars = () => {
    const text = textareaEle.current!.value;
    textareaEle.current!.value = deleteJapArray(text).join("");
    setCharCount(countFuncs(textareaEle.current!.value));
  };
  const deletePunctuations = () => {
    const text = textareaEle.current!.value;
    textareaEle.current!.value = deletePunctuationsArray(text).join("");
    setCharCount(countFuncs(textareaEle.current!.value));
  };

  const showLatinWords = () => {
    const text = textareaEle.current!.value;
    const latinWords = text ? latinWordsArray(text).join(" ") : "";
    textareaEle.current!.value = latinWords;
    setCharCount(countFuncs(textareaEle.current!.value));
  };

  return (
    <main>
      <section className="min-h-screen p-5 mx-auto w-full">
        <h1 className="text-3xl">文字・単語カウント</h1>
        <div className="mt-10">
          <form action="/" className="block w-full max-w-256 m-auto">
            <textarea
              ref={textareaEle}
              id="textarea"
              className="block w-full p-3 text-base bg-slate-500 text-neutral-50"
              rows={10}
              onChange={counting}
              defaultValue={initialLetters}
            />
            <div className="flex gap-5 mt-4">
              <input
                type="reset"
                value={"リセット"}
                className="inline-block text-xl px-4 py-2 cursor-pointer bg-gray-600 text-neutral-200 rounded-md"
                onClick={() => {
                  setCharCount(countFuncs(initialLetters));
                }}
              />
              <button
                type="button"
                className="inline-block text-xl px-4 py-2 cursor-pointer bg-blue-900 text-neutral-200 rounded-md"
                onClick={copyToClipboard}
              >
                コピー
              </button>
            </div>
          </form>
          <div className=" w-full max-w-256 m-auto">
            <div className="mt-2">
              <dl className="grid grid-cols-3 gap-y-3 ">
                <dt className="text-xl font-bold">単語数</dt>
                <dd className={`{countResultStyle}`}>{charCount.words}単語</dd>
                <dd>数字の単語は{charCount.digitWords}単語</dd>
                <dt className="text-xl font-bold col-span-3">
                  文字数
                  <small className="text-sm pl-2">
                    *絵文字は1文字としてカウントされます。
                  </small>
                </dt>
                <dd className="mt-2">
                  文字数 <span className="text-xs">*改行・スペース含む</span>
                </dd>
                <dd className={`col-span-2 ${countResultStyle}`}>
                  <span className="text-2xl">{charCount.allLength}</span>
                  文字
                </dd>
                <dd className="mt-2">
                  文字数 <span className="text-xs">*改行・スペースなし</span>
                </dd>
                <dd className={` ${countResultStyle}`}>
                  <span className="text-2xl">
                    {charCount.withoutSpacesBreaks}
                  </span>
                  文字
                </dd>
                <dd>
                  <button className={btnStyle} onClick={deleteSpacesBreaks}>
                    改行・スペースを消す
                  </button>
                </dd>
                <dt className="text-xl font-bold col-span-3 border-b-2 border-y-indigo-950">
                  文字数の内訳
                </dt>
                <dd className="mt-2 font-bold">全ての全角文字</dd>
                <dd className={` ${countResultStyle}`}>
                  <span className="text-2xl">{charCount.fullWidth}</span>
                  文字
                </dd>
                <dd>
                  <button className={btnStyle} onClick={deleteFullWidthChars}>
                    全角文字を消す
                  </button>
                </dd>
                <dd className="pl-3">▻漢字・かな・カタ</dd>
                <dd className={` ${countResultStyle}`}>
                  <span className="pl-2">{charCount.fullJap}</span>
                  文字
                </dd>
                <dd>
                  <button className={btnStyle} onClick={deleteJapChars}>
                    日本語全角文字を消す
                  </button>
                </dd>

                <dd className="pl-3">▻全角数字</dd>
                <dd className={` ${countResultStyle}`}>
                  <span className="pl-2">{charCount.fullWidthDigits}</span>
                  文字
                </dd>
                <dd>
                  <button className={btnStyle} onClick={deleteFullWidthNum}>
                    全角数字を消す
                  </button>
                </dd>
                <dd className="pl-3">▻全角ＡＢＣ</dd>
                <dd className={` ${countResultStyle}`}>
                  <span className="pl-2">{charCount.fullWidthAlphabet}</span>
                  文字
                </dd>
                <dd>
                  <button className={btnStyle} onClick={deleteFullLatinChars}>
                    全角ＡＢＣを消す
                  </button>
                </dd>
                <dd className="pl-3">
                  ▻全角の記号<span className="text-xs"> *句読点含む</span>
                </dd>
                <dd className={` ${countResultStyle}`}>
                  <span className="pl-2">{charCount.fullWidthSymbol}</span>
                  文字
                </dd>
                <dd>
                  <button className={btnStyle} onClick={deleteFullWidthSymbol}>
                    全角記号を消す
                  </button>
                </dd>
                <dd className="pl-6">（句読点 、。）</dd>
                <dd className={` ${countResultStyle}`}>
                  （<span className="pl-2">{charCount.fullDots}</span>
                  文字）
                </dd>
                <dd>
                  <button className={btnStyle} onClick={deleteJapDots}>
                    句読点を消す
                  </button>
                </dd>
                <dd className="mt-2 font-bold">全ての半角文字</dd>
                <dd className={`col-span-2 ${countResultStyle}`}>
                  <span className="text-2xl">{charCount.halfAll}</span>
                  文字
                </dd>
                <dd className="pl-3 mt-2">▻半角ｶﾀｶﾅ</dd>
                <dd className={` ${countResultStyle}`}>
                  <span className="">{charCount.halfWidthKana}</span>
                  文字
                </dd>
                <dd>
                  <button className={btnStyle} onClick={deleteHalfKata}>
                    半角ｶﾀを消す
                  </button>
                </dd>
                <dd className="pl-3 mt-2">▻半角ABC</dd>
                <dd className={` ${countResultStyle}`}>
                  <span className="">{charCount.halfWidthCharas}</span>
                  文字
                </dd>
                <dd>
                  <button className={btnStyle} onClick={deleteHalfAlphaNum}>
                    半角英数字を消す
                  </button>
                </dd>
                <dd className="pl-3">▻半角数字</dd>
                <dd className={` ${countResultStyle}`}>
                  <span className="pl-2">{charCount.halfWidthDigits}</span>
                  文字
                </dd>
                <dd>
                  <button className={btnStyle} onClick={deleteHalfNum}>
                    半角数字を消す
                  </button>
                </dd>
                <dd className="pl-3">
                  ▻半角の記号<span className="text-xs"> *文末記号含む</span>
                </dd>
                <dd className={` ${countResultStyle}`}>
                  <span className="pl-2">{charCount.halfSymbols}</span>
                  文字
                </dd>
                <dd>
                  <button className={btnStyle} onClick={deleteHalfSymbol}>
                    半角記号を消す
                  </button>
                </dd>
                <dd className="pl-3">（文末記号 .,:;）</dd>
                <dd className={` ${countResultStyle}`}>
                  （<span className="pl-2">{charCount.puncts}</span>
                  文字）
                </dd>
                <dd>
                  <button className={btnStyle} onClick={deletePunctuations}>
                    文末記号を消す
                  </button>
                </dd>
                <dd className="mt-3 font-bold">絵文字</dd>
                <dd className={` ${countResultStyle}`}>
                  <span className="text-2xl">{charCount.emojis}</span>
                  文字
                </dd>
                <dd>
                  <button className={btnStyle} onClick={deleteEmojis}>
                    絵文字を消す
                  </button>
                </dd>
                <dt className="text-xl font-bold col-span-3 border-b-2 border-y-indigo-950">
                  指定した文字を消す
                </dt>
                <dd>
                  <input
                    type="text"
                    className="block w-full p-3 text-base bg-slate-500 text-neutral-50"
                  />
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
