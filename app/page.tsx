"use client";
import { useState } from "react";
import { debounce } from "lodash";
import { useTextManipulation } from "@/hooks/useTextManipulation";
import { makeTextArray } from "@/libs/countFuncs";

const initialLetters =
  "ここに「文字」を入れたら、カウントするよ🧜‍♀️ Type here, then I'll count them all! Escriba aquí, y los contaré👩🏻‍💻";

export default function Home() {
  const [chars, setChars] = useState<string>(""); //消す文字のインプット管理

  const {
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
  } = useTextManipulation(initialLetters);

  //debounceで300ms待ってから、カウントの関数を実行。
  const handleTextChange = debounce(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(event.target.value);
    },
    300
  );

  // クラスリスト
  const btnStyle =
    "text-xs bg-blue-950 text-neutral-100 rounded-sm cursor-pointer py-2 px-4 w-28 text-left sm:min-w-44 sm:text-sm";
  const countResultStyle = "max-w-24 text-right";

  const copyToClipboard = async () => {
    const textarea = document.querySelector("#textarea") as HTMLTextAreaElement;
    const text: string = textarea.value || "";
    await navigator.clipboard.writeText(text);
    alert("コピーしたよ!");
  };

  const deleteChars = (e: any) => {
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
            <textarea
              value={text}
              id="textarea"
              className="block w-full p-3 text-base bg-slate-500 text-neutral-50"
              rows={10}
              onChange={handleTextChange}
              aria-label="カウントしたいテキストの入力"
              placeholder="ここにテキストを入力してください。"
            />
            <div className="flex gap-5 mt-4">
              <input
                type="reset"
                value={"クリア"}
                className="inline-block text-xl px-4 py-2 cursor-pointer bg-gray-600 text-neutral-200 rounded-md"
                onClick={() => {
                  clearTexts();
                }}
                aria-label="入力されたテキストをクリア"
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
              </dl>
              <p className="text-xl font-bold border-b-2 border-y-indigo-950 mt-12">
                指定した文字を消す
              </p>
              <form action="" className="w-full flex gap-2 flex-wrap mt-2">
                <input
                  type="text"
                  value={chars}
                  className="block w-3/5 p-3 text-base bg-slate-500 text-neutral-50"
                  onChange={(e) => {
                    setChars(e.target.value);
                  }}
                  aria-label="削除したい文字を入力して指定"
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
