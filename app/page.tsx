"use client";
import { countFuncs } from "@/libs/countFuncs";
import { useState } from "react";

const initialLetters =
  "ここに「文字」を入れたら、カウントするよ🧜‍♀️ Type here, then I'll count them all🥷 Escriba aquí, y se contaré👩🏻‍💻";

export default function Home() {
  const [charCount, setCharCount] = useState(countFuncs(initialLetters));

  const counting = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const text = event.target.value;

    setCharCount(countFuncs(text));
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
        <form action="/" className="mt-4">
          <textarea
            id="textarea"
            className="block w-full p-3 text-xl bg-slate-500 text-neutral-50"
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
        <div className="mt-6">
          <dl className="mt-2 grid md:grid-cols-[1fr_3fr] grid-cols-2 gap-y-3">
            <dt>半角英数字の単語数</dt>
            <dd>
              <span className="text-2xl">{charCount.halfWidthAlnumWords}</span>
              単語（内、数字の単語数は
              {charCount.numberWords}単語）
            </dd>
          </dl>

          <div className="mt-2">
            <dl className="grid md:grid-cols-[1fr_3fr] grid-cols-2 gap-y-3 ">
              <dt className="text-xl font-bold col-span-2">
                文字数{" "}
                <small className="text-sm">
                  *絵文字は２文字としてカウントされます。
                </small>
              </dt>
              <dd className="mt-2">全文字数</dd>
              <dd>
                <span className="text-2xl">{charCount.allLength}</span>文字
              </dd>
              <dd className="mt-2">スペース・改行を除く</dd>
              <dd>
                <span className="text-2xl">{charCount.noSpacesLength}</span>
                文字
              </dd>
              <dd className="mt-2">全角文字と半角カタカナのみ</dd>
              <dd>
                <span className="text-2xl">{charCount.fullWidthLength}</span>
                文字
              </dd>
              <dd className="pl-3">▻半角カタカナ</dd>
              <dd>
                <span className="text-2xl">
                  {charCount.halfWidthKanaLength}
                </span>
                文字
              </dd>
              <dd className="pl-3">▻全角数字</dd>
              <dd>
                <span className="text-2xl">
                  {charCount.fullWidthDigitsLength}
                </span>
                文字
              </dd>
              <dd className="pl-3">▻全角特殊文字</dd>
              <dd>
                <span className="text-2xl">
                  {charCount.fullWidthSpecialCharLength}
                </span>
                文字
              </dd>
              <dd className="mt-2">半角英数字</dd>
              <dd>
                <span className="text-2xl">
                  {charCount.halfWidthAllnumLength}
                </span>
                文字
              </dd>
              <dd className="pl-3">▻数字</dd>
              <dd>
                <span className="text-2xl">{charCount.numLength}</span>文字
              </dd>
              <dd className="mt-2">特殊文字</dd>
              <dd>
                <span className="text-2xl">{charCount.specialCharLength}</span>
                文字
              </dd>
              <dd className="pl-3">▻全角特殊文字</dd>
              <dd>
                <span className="text-2xl">
                  {charCount.fullWidthSpecialCharLength}
                </span>
                文字
              </dd>
            </dl>
          </div>
        </div>
      </section>
    </main>
  );
}
