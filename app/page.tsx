"use client";
import Image from "next/image";
import { useState } from "react";

const initialCountings = {
  allLength: 0,
  noSpacesLength: 0,
  fullWidthLength: 0,
  halfWidthKanaLength: 0,
  fullAndHalfKanaLength: 0,
  halfWidthAllnumLength: 0,
  numLength: 0,
  fullWidthDigitsLength: 0,
  fullWidthAlphaLength: 0,
  halfWidthAlnumWords: 0,
  numberWords: 0,
  specialCharLength: 0,
};

export default function Home() {
  const [charCount, setCharCount] = useState(initialCountings);

  const counting = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newCountings = { ...initialCountings };
    const text = event.target.value;

    //生の長さ
    newCountings.allLength = text.length;

    // スペースや改行を削除
    newCountings.noSpacesLength = text.replace(/\s/g, "").length;

    // 全角文字数
    newCountings.fullWidthLength = (text.match(/[^\x00-\x7F]/g) || []).length;

    // 半角カタカナ文字数
    newCountings.halfWidthKanaLength = (
      text.match(/[\uFF61-\uFF9F]/g) || []
    ).length;

    //全角文字数と半角カタカナ文字数
    newCountings.fullAndHalfKanaLength =
      newCountings.fullWidthLength + newCountings.halfWidthKanaLength;

    // 半角英数字文字数
    newCountings.halfWidthAllnumLength = (
      text.match(/[a-zA-Z0-9]/g) || []
    ).length;

    // 半角英数字の単語数
    newCountings.halfWidthAlnumWords = (
      text.match(/\b[a-zA-Z0-9]+\b/g) || []
    ).length;

    //半角数字数
    newCountings.numLength = (text.match(/[0-9]/g) || []).length;

    // 全角数字文字数
    newCountings.fullWidthDigitsLength = (
      text.match(/[\uFF10-\uFF19]/g) || []
    ).length;

    // 全角英語文字数
    newCountings.fullWidthAlphaLength = (
      text.match(/[\uFF21-\uFF3A\uFF41-\uFF5A]/g) || []
    ).length;

    // 数字の単語数
    newCountings.numberWords = (text.match(/\b\d+\b/g) || []).length;

    //特殊文字の数
    newCountings.specialCharLength = (
      text.match(
        /[^a-zA-Z0-9\s\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uFF10-\uFF19]/g
      ) || []
    ).length;

    setCharCount(newCountings);
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
          />
          <div className="flex gap-2">
            <input
              type="reset"
              value={"リセット"}
              className="inline-block text-xl px-4 py-2 cursor-pointer bg-blue-900 text-neutral-200 rounded-md"
              onClick={() => {
                setCharCount(initialCountings);
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
          {charCount.fullWidthDigitsLength}文字)
        </p>
      </section>
    </main>
  );
}
