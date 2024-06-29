"use client";
import { countFuncs } from "@/libs/countFuncs";
import { useState } from "react";

const initialLetters =
  "ここに「文字」を入れたら、カウントするよ🧜‍♀️ Type here, then I'll count them all! Escriba aquí, y los contaré👩🏻‍💻";

export default function Home() {
  const [charCount, setCharCount] = useState(countFuncs(initialLetters));

  const counting = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
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

  return (
    <main>
      <section className="min-h-screen p-5 mx-auto w-full">
        <h1 className="text-3xl">文字・単語カウント</h1>
        <div className="flex flex-wrap gap-16 mt-10 justify-center">
          <form action="/" className="block w-128">
            <textarea
              id="textarea"
              className="block w-full p-3 text-base bg-slate-500 text-neutral-50"
              rows={10}
              onChange={counting}
              placeholder={initialLetters}
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
          <div className="w-96">
            <dl className="grid grid-cols-2 gap-y-3">
              <dt className="text-xl font-bold">単語数</dt>
              <dd>
                <span className="text-2xl">{charCount.words}</span>
                単語
                <br />
                *内、数字の単語は{charCount.digitWords}単語
              </dd>
            </dl>

            <div className="mt-2">
              <dl className="grid grid-cols-2 gap-y-3 ">
                <dt className="text-xl font-bold col-span-2">
                  文字数
                  <small className="text-sm pl-2">
                    *絵文字は1文字としてカウントされます。
                  </small>
                </dt>
                <dd className="mt-2">全文字数</dd>
                <dd>
                  <span className="text-2xl">{charCount.allLength}</span>文字
                </dd>
                <dd className="mt-2">
                  全文字数
                  <br />
                  *スペース・改行を除く
                </dd>
                <dd>
                  <span className="text-2xl">
                    {charCount.withoutSpacesBreaks}
                  </span>
                  文字
                </dd>
                <dd className="mt-2">全角文字</dd>
                <dd>
                  <span className="text-2xl">
                    {charCount.fullWidth - charCount.fullWidthSymbol}
                  </span>
                  文字
                </dd>
                <dd className="pl-3">▻全角数字</dd>
                <dd>
                  <span className="pl-2">{charCount.fullWidthDigits}</span>
                  文字
                </dd>
                <dd className="pl-3">▻全角ＡＢＣ</dd>
                <dd>
                  <span className="pl-2">{charCount.fullWidthAlphabet}</span>
                  文字
                </dd>
                <dd className="mt-2">半角カタカナ</dd>
                <dd>
                  <span className="text-2xl">{charCount.halfWidthKana}</span>
                  文字
                </dd>
                <dd className="mt-2">半角英数字</dd>
                <dd>
                  <span className="text-2xl">{charCount.halfWidthCharas}</span>
                  文字
                </dd>
                <dd className="pl-3">▻半角数字</dd>
                <dd>
                  <span className="pl-2">{charCount.halfWidthDigits}</span>
                  文字
                </dd>
                <dd className="mt-2">記号</dd>
                <dd>
                  <span className="text-2xl">
                    {charCount.halfSymbols + charCount.fullWidthSymbol}
                  </span>
                  文字
                </dd>
                <dd className="pl-3">▻半角記号</dd>
                <dd>
                  <span className="pl-2">{charCount.halfSymbols}</span>
                  文字
                </dd>
                <dd className="pl-3">▻全角記号</dd>
                <dd>
                  <span className="pl-2">{charCount.fullWidthSymbol}</span>
                  文字
                </dd>
                <dd className="mt-3">絵文字</dd>
                <dd>
                  <span className="text-2xl">{charCount.emojis}</span>
                  文字
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
