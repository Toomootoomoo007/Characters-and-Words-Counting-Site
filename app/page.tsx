"use client";
import { countFuncs } from "@/libs/countFuncs";
import { useState } from "react";

const initialLetters = "ここに文字を入れてください！";

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
      <section className="min-h-screen p-7">
        <h1 className="text-3xl">文字／単語カウント</h1>
        <form action="/" className="p-5">
          <textarea
            id="textarea"
            className="w-4/5 p-3 text-xl bg-slate-500 text-neutral-50"
            rows={10}
            onChange={counting}
            placeholder={initialLetters}
          />
          <div className="flex gap-2">
            <input
              type="reset"
              value={"リセット"}
              className="inline-block text-xl px-4 py-2 cursor-pointer bg-blue-900 text-neutral-200 rounded-md"
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
        <p className="text-xl">
          {charCount.allLength}文字（スペース・改行・その他特殊文字含む）
        </p>
        <p className="text-xl">
          {charCount.noSpacesLength}文字（スペース・改行含まない）
        </p>
        <p className="text-xl">
          半角英数字の文字数：{charCount.halfWidthAllnumLength}文字（内、数字
          {charCount.numLength}文字）
        </p>
        <p className="text-xl">
          特殊文字の文字数：{charCount.specialCharLength}文字
        </p>
        <p className="text-xl">
          半角英数字の単語数：{charCount.halfWidthAlnumWords}
          単語（内、数字の単語数は
          {charCount.numberWords}単語）
        </p>
        <p className="text-xl">
          全角文字と半角カタカナ：{charCount.fullWidthLength}
          文字(内、半角カタカナ：{charCount.halfWidthKanaLength}文字、全角数字：
          {charCount.fullWidthDigitsLength}文字、全角特殊文字：
          {charCount.fullWidthSpecialCharLength}文字)
        </p>
      </section>
    </main>
  );
}
