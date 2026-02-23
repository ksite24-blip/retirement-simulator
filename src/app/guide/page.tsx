import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "脱出の設計図 | このまま10年働く自分を想像してゾッとしたあなたへ",
  description:
    "工場勤務の苦悩からWebへの出会いまで。たった3日で工場を抜け出す準備が完了する実践型ノート。",
};

const ACCENT_BTN =
  "bg-teal-400 hover:bg-teal-300 hover:scale-[1.02] active:scale-[0.98] text-slate-900 font-black shadow-2xl shadow-teal-500/30 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-slate-950 transition-all duration-200 cursor-pointer";

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 1 : HERO
          画像: first-view-factory-sunset.png（夕暮れ工場を背に歩く人物）
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
        {/* 背景画像 */}
        <Image
          src="/guide/first-view-factory-sunset.png"
          alt="夕暮れの工場を背に道を歩く人物"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* 暗いグラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(20,184,166,0.12)_0%,_transparent_60%)]" />

        <div className="relative z-10 mx-auto max-w-4xl">
          {/* ⚠️ launch banner */}
          <div className="mb-10 inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-5 py-2 backdrop-blur-sm">
            <span className="text-sm font-bold text-amber-400 sm:text-base">
              ⚠️ ローンチ記念価格は予告なく終了します
            </span>
          </div>

          {/* MAIN CATCHPHRASE */}
          <h1 className="mb-8 text-4xl font-black leading-tight tracking-tight drop-shadow-2xl sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block text-white">「このまま10年働く自分」を</span>
            <span className="block text-white">
              想像して<span className="text-teal-400">ゾッとした</span>あなたへ。
            </span>
          </h1>

          <p className="mb-3 text-xl leading-relaxed text-slate-200 drop-shadow sm:text-2xl">
            体が壊れる前に、心が折れる前に。
          </p>
          <p className="mb-3 text-lg leading-relaxed text-slate-200 drop-shadow sm:text-xl">
            たった3日で「工場を抜け出す準備」が完了する
          </p>
          <p className="mb-6 text-xl font-bold text-white drop-shadow sm:text-2xl">
            実践型ノートが完成しました。
          </p>

          <p className="mb-10 text-base leading-relaxed text-slate-300 sm:text-lg">
            元・工場勤務者が実際に使った「退職までの設計図」を
            <br />
            あなた専用にカスタマイズできる書き込み式ノート
          </p>

          <Link
            href="#purchase"
            className={`inline-flex items-center gap-2 rounded-xl px-8 py-5 text-lg sm:text-xl ${ACCENT_BTN}`}
          >
            今すぐ「脱出の設計図」を手に入れる →
          </Link>

          <p className="mt-4 text-sm text-slate-400">
            ※ Notion + PDF版セット / 1,480円（税込）/ 購入後すぐ利用可能
          </p>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 2 : QUESTION — ✖ リスト
          画像: factory-assembly-line.png（ライン作業の暗い工場）
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-2xl font-bold text-white sm:text-3xl">
            まずは3秒だけ、この質問に答えてください
          </h2>
          <p className="mb-12 text-center text-xl font-bold text-white sm:text-2xl">
            あなたは、こんな未来を
            <br />
            本気で望んでいますか？
          </p>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* ✖ リスト */}
            <div className="space-y-4">
              {[
                "10年後も同じライン作業を繰り返し、腰と膝を痛めながら働く自分",
                "日曜の夕方になると憂鬱で、「明日が来なければいい」と願う生活",
                "体が動かなくなった瞬間に収入ゼロという恐怖を抱えたまま老いていく人生",
                "会社に「取り替え可能なパーツ」として扱われ続ける毎日",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-xl border border-red-900/50 bg-red-950/40 p-5"
                >
                  <span className="mt-0.5 shrink-0 text-2xl font-black text-red-400">
                    ✖
                  </span>
                  <p className="text-base leading-relaxed text-slate-200 sm:text-lg">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            {/* 工場ライン画像 */}
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/guide/factory-assembly-line.png"
                alt="暗い工場内でライン作業に従事する人物"
                width={600}
                height={400}
                className="h-auto w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          </div>

          <div className="mt-12 space-y-4 text-center">
            <p className="text-xl text-slate-300 sm:text-2xl">
              もし少しでも「正直、そんな未来は嫌だ」と思ったなら…
            </p>
            <p className="text-lg font-bold leading-relaxed text-teal-400 sm:text-xl">
              このノートは、あなたが「人間としての尊厳」を取り戻すための、最初で最後のチャンスかもしれません。
            </p>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 3 : CREATOR STORY — 全画面告白スタイル
          画像①: locker-room-weary.png（AM3:12の更衣室）
          画像②: cafe-vs-street-worker.png（カフェを外から見る工場員）
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-slate-900 py-24 px-4">
        <div className="mx-auto max-w-4xl">
          {/* 見出し */}
          <div className="mb-16 text-center">
            <p className="mb-3 text-lg font-bold text-teal-400">
              制作者の実体験ストーリー
            </p>
            <h2 className="text-3xl font-black text-white sm:text-4xl md:text-5xl">
              僕も、毎日
              <br />
              <span className="[color:theme(colors.teal.400)]">「ここから逃げたい」と思ってました</span>
            </h2>
          </div>

          <p className="mb-12 text-center text-lg leading-relaxed text-slate-300 sm:text-xl">
            少しだけ、僕(このノートの制作者)の話をさせてください。
          </p>

          {/* 自分の境遇 */}
          <div className="mb-10 space-y-4">
            {[
              "自動車関連の工場で、毎日ライン作業",
              "同じ動きを、ひたすらくり返す毎日",
              "夜勤・残業で、体はずっとだるい",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 px-2">
                <span className="mt-1 shrink-0 text-xl text-teal-400">•</span>
                <p className="text-lg text-slate-300 sm:text-xl">{item}</p>
              </div>
            ))}
          </div>

          {/* 画像①: 夜勤明けの更衣室 */}
          <div className="mb-12 overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="/guide/locker-room-weary.png"
              alt="AM3:12、夜勤明けの更衣室でひとりうなだれる工場員"
              width={900}
              height={500}
              className="h-auto w-full object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <p className="mb-10 text-center text-lg leading-relaxed text-slate-300 sm:text-xl">
            そんな環境で働きながら、周りを見回すと、そこには…
          </p>

          <div className="mb-12 space-y-4">
            {[
              "腰をさすりながらラインに立つ先輩",
              "膝をかばいながらゆっくり歩く上司",
              "体を壊して辞めた人の話",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 px-2">
                <span className="mt-1 shrink-0 text-xl text-slate-600">•</span>
                <p className="text-lg italic text-slate-400 sm:text-xl">{item}</p>
              </div>
            ))}
          </div>

          {/* 核心の一文 */}
          <div className="my-16 border-y border-slate-700 py-12 text-center">
            <p className="text-2xl font-black leading-relaxed text-white sm:text-3xl md:text-4xl">
              「これが10年後・20年後の自分かもしれない」
            </p>
            <p className="mt-4 text-xl text-slate-300 sm:text-2xl">
              と思うと、正直、めちゃくちゃ怖かった。
            </p>
          </div>

          <p className="mb-12 text-center text-lg leading-relaxed text-slate-300 sm:text-xl">
            頭では分かってるのに、お金と将来が怖すぎて、具体的な一歩は何も踏み出せない。
            <br />
            そんなとき出会ったのが…
          </p>

          <p className="mb-10 text-center text-xl font-bold text-white sm:text-2xl">
            そんなときに出会ったのが「Webで稼いでいる人たち」でした。
          </p>

          {/* 画像②: カフェのPCワーカーを外から見る工場員 */}
          <div className="mb-10 overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="/guide/cafe-vs-street-worker.png"
              alt="カフェでPCを使い自由に働く人を、作業着姿で外から羨ましそうに眺める工場員"
              width={900}
              height={500}
              className="h-auto w-full object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <div className="mb-12 space-y-4">
            {[
              "ノートPC1台で、どこでも仕事をしている人",
              "通勤ゼロ・夜勤ゼロで、自分で時間を決めて働く人",
              "体を酷使しなくても収入を作っている人たち",
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl bg-slate-800/60 px-5 py-4"
              >
                <span className="mt-1 shrink-0 text-xl text-teal-400">•</span>
                <p className="text-lg text-slate-200 sm:text-xl">{item}</p>
              </div>
            ))}
          </div>

          <p className="mb-10 text-center text-lg leading-relaxed text-slate-300 sm:text-xl">
            最初は「どうせ一部の天才だけでしょ」と思ってました。でも話を聞いていくと、元フリーター、元工場勤務、元接客業みたいな、自分とほぼ同じスタートラインから始めた人も多かった。
          </p>

          <div className="rounded-2xl border border-teal-400/30 bg-teal-400/10 p-8 text-center">
            <p className="mb-4 text-xl font-bold leading-relaxed text-teal-300 sm:text-2xl">
              「あっち側に行きたい。このまま、体ひとつだけで働き続ける未来から抜け出すための、3日間の準備」
            </p>
            <p className="text-lg leading-relaxed text-slate-300">
              そこで必要だったのは、「勢いで辞める勇気」ではなく、
              <br />
              &#34;致命傷を避けながら抜け出すための、3日間の準備&#34;でした。
            </p>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 4 : 3 CHANGES — プレミアムカード
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-16 text-center text-3xl font-black text-white sm:text-4xl">
            <span>このノートで得られる3つの変化</span>
          </h2>

          <div className="space-y-8">
            {/* ① */}
            <div className="rounded-2xl bg-white p-8 text-slate-900 shadow-2xl">
              <div className="flex items-start gap-4">
                <span className="shrink-0 text-3xl font-black text-teal-600">①</span>
                <div>
                  <h3 className="mb-4 text-lg font-black text-slate-900 sm:text-xl">
                    「なぜ辞めたいのか?」が、感情ではなく言葉になる
                  </h3>
                  <p className="mb-3 text-base leading-relaxed text-slate-700 sm:text-lg">
                    「しんどい」「ムカつく」「なんとなく嫌だ」から卒業して、今の仕事の「マシなところ」と「限界なところ」、このまま10年続けたときの未来を、ワークを通して書き出します。
                  </p>
                  <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
                    「だから、自分はこのままじゃ嫌なんだ」と、自分で自分に説明できるレベルまで、辞めたい理由がハッキリします。
                  </p>
                </div>
              </div>
            </div>

            {/* ② */}
            <div className="rounded-2xl bg-white p-8 text-slate-900 shadow-2xl">
              <div className="flex items-start gap-4">
                <span className="shrink-0 text-3xl font-black text-teal-600">②</span>
                <div>
                  <h3 className="mb-4 text-lg font-black text-slate-900 sm:text-xl">
                    「今辞めたら詰むのか/準備次第でいけるのか」が数字で分かる
                  </h3>
                  <p className="mb-3 text-base leading-relaxed text-slate-700 sm:text-lg">
                    毎月の生活費、現在の貯金、3ヶ月分の最低限の生活費を計算しながら、今辞めたら何が危ないのか、あとどれくらい貯金があれば安心か、退職後3ヶ月をどう過ごせばいいのかを、感情ではなく数字ベースで見える化します。
                  </p>
                  <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
                    「とりあえず辞めちゃえ」でも「一生このまま我慢」でもない。その間にある&#34;現実的な逃げ方&#34;が見えてきます。
                  </p>
                </div>
              </div>
            </div>

            {/* ③ */}
            <div className="rounded-2xl bg-white p-8 text-slate-900 shadow-2xl">
              <div className="flex items-start gap-4">
                <span className="shrink-0 text-3xl font-black text-teal-600">③</span>
                <div>
                  <h3 className="mb-4 text-lg font-black text-slate-900 sm:text-xl">
                    「いつ・誰に・どう伝えるか」まで、台本レベルで決まる
                  </h3>
                  <p className="mb-3 text-base leading-relaxed text-slate-700 sm:text-lg">
                    3日目のワークでは、退職を伝える目標日、最初に話す相手、どんなタイミング・場所で切り出すか、実際に話すときの「30秒トーク台本」、引き止められたときの「返しフレーズ」、退職までにやることリストまで、すべて自分で書き出して決めます。
                  </p>
                  <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
                    「辞めたいけど、何から手をつければ…」という状態から、「あとは、この日、このセリフで伝えるだけ」というところまで持っていくのが、このノートの役割です。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 5 : VS SELF-HELP BOOKS
          画像: before-after-factory-to-web.png（工場 vs Web仕事のビフォーアフター）
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-slate-900 py-24 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-12 text-2xl font-black text-white sm:text-3xl">
            普通の自己啓発本と何が違うの?
          </h2>

          <div className="mb-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-red-900/50 bg-red-950/40 p-8">
              <span className="mb-4 block text-4xl font-black text-red-400">✖</span>
              <p className="text-lg text-slate-300">
                読んで「いい話だった」で終わる本
              </p>
            </div>

            <div className="flex flex-col items-center justify-center text-slate-400 sm:hidden">
              <p className="text-lg">ではなく、</p>
            </div>

            <div className="rounded-2xl border border-teal-500/40 bg-teal-900/30 p-8">
              <span className="mb-4 block text-4xl font-black text-teal-400">✔</span>
              <p className="text-lg font-bold text-white">
                書き込んで「3日後の行動」が変わるノートです。
              </p>
            </div>
          </div>

          <p className="mb-10 hidden text-lg text-slate-400 sm:block">ではなく、</p>

          {/* Before/After 画像 */}
          <div className="mb-10 overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="/guide/before-after-factory-to-web.png"
              alt="工場での肉体労働（Before）とPCで自由に働く姿（After）の対比イラスト"
              width={900}
              height={500}
              className="h-auto w-full object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
            このノートには、元・工場勤務のリアルなストーリー、感情を整理するワーク、お金・生活の数字を整理するワーク、上司に伝えるセリフを作るワーク、不安を扱うQ&A、3ヶ月後の自分への手紙が、すべて書き込み式でまとまっています。
          </p>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 6 : NOTEBOOK CONTENTS — Day カード
          画像①: checklist-hands.png（チェックリストを記入する手）
          画像②: resignation-letter-locker.png（辞表を見つめる男性）
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-3xl font-black text-white sm:text-4xl">
            ノートの中身(ざっくり)
          </h2>

          {/* チェックリスト画像 */}
          <div className="mb-12 overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="/guide/checklist-hands.png"
              alt="退職準備チェックリストを記入する手元"
              width={900}
              height={500}
              className="h-auto w-full object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>

          {/* 0章 */}
          <div className="mb-8 rounded-2xl border border-slate-700 bg-slate-800/60 p-8">
            <h3 className="mb-6 text-xl font-black text-teal-400">
              0章:はじめに + Beforeチェック
            </h3>
            <ul className="space-y-3">
              {[
                "元・工場勤務の僕のリアルストーリー",
                "このノートの進め方",
                "「今すぐ辞めたい度」の自己チェック",
                "退職に関する不安TOP3を書き出すワーク",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 text-teal-400">•</span>
                  <span className="text-base text-slate-300 sm:text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Day 1 */}
          <div className="mb-8 rounded-2xl bg-white p-8 text-black shadow-2xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-teal-500 px-3 py-1 text-sm font-black text-white">DAY 1</span>
              <h3 className="text-lg font-black text-slate-900 sm:text-xl">
                Day1:本当に今のままでいいのか?現状と感情を見切る
              </h3>
            </div>
            <ul className="space-y-3">
              {[
                "今の仕事の「マシなところ/限界なところ」を仕分け",
                "工場で働き続けた10年後の自分をイメージするワーク",
                "「それでも抜け出したい」理由を1行宣言にまとめる",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 text-teal-600">•</span>
                  <span className="text-base text-slate-700 sm:text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Day 2 */}
          <div className="mb-8 rounded-2xl bg-white p-8 text-black shadow-2xl">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-teal-500 px-3 py-1 text-sm font-black text-white">DAY 2</span>
              <h3 className="text-lg font-black text-slate-900 sm:text-xl">
                Day2:お金と退職後3ヶ月の「最低限の安全ライン」を決める
              </h3>
            </div>
            <ul className="space-y-3">
              {[
                "毎月の生活費と貯金を見える化",
                "3ヶ月分の生活費はいくら必要か?を計算",
                "「今辞めたら足りない分」も数字で把握",
                "退職後3ヶ月のざっくりプランを作る",
                "Web/PCで目指すなら「まずやること3つ」を決める",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 text-teal-600">•</span>
                  <span className="text-base text-slate-700 sm:text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Day 3 + 辞表画像 */}
          <div className="mb-8 grid gap-6 lg:grid-cols-2 lg:items-start">
            <div className="rounded-2xl bg-white p-8 text-black shadow-2xl">
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-teal-500 px-3 py-1 text-sm font-black text-white">DAY 3</span>
                <h3 className="text-lg font-black text-slate-900 sm:text-xl">
                  Day3:退職日・伝え方・段取りを決めて「宣言」する
                </h3>
              </div>
              <ul className="space-y-3">
                {[
                  "退職の意思を伝える目標日を決める",
                  "最初に話す相手&タイミングを決める",
                  "上司に伝える「30秒トーク台本」を作る",
                  "引き止められたときの返しフレーズを用意する",
                  "退職までにやることTODOリストを作る",
                  "3日間のラスト宣言を書く",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 shrink-0 text-teal-600">•</span>
                    <span className="text-base text-slate-700 sm:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 辞表画像 */}
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/guide/resignation-letter-locker.png"
                alt="ロッカーに貼られた辞表を静かに見つめる男性"
                width={600}
                height={700}
                className="h-full w-full object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* おまけ */}
          <div className="rounded-2xl border border-slate-700 bg-slate-800/60 p-8">
            <h3 className="mb-6 text-xl font-black text-amber-400">おまけ①②③</h3>
            <ul className="space-y-3">
              {[
                "退職準備チェックリスト",
                "上司に伝える台本テンプレ集",
                "よくある不安とQ&A/NGパターン",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1 shrink-0 text-amber-400">•</span>
                  <span className="text-base text-slate-300 sm:text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 7 : TARGET AUDIENCE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-slate-900 py-24 px-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-14 text-center text-2xl font-black text-white sm:text-3xl">
            このノートは、こんなあなたのために作りました。
          </h2>

          <div className="grid gap-10 sm:grid-cols-2">
            <div>
              <h3 className="mb-6 flex items-center gap-2 text-xl font-black text-teal-400">
                <span>✔</span><span>向いている人</span>
              </h3>
              <ul className="space-y-4">
                {[
                  "工場・製造・倉庫など、体を使う現場で働いている",
                  "25〜30歳前後で、「このまま歳を取るのが怖い」と感じている",
                  "退職したい気持ちはすでに9割固まっている",
                  "お金が不安、辞めたあとどうするか見えてない",
                  "WebやPCの仕事に興味がある",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 shrink-0 text-teal-400">•</span>
                    <span className="text-base text-slate-300 sm:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-6 flex items-center gap-2 text-xl font-black text-red-400">
                <span>✖</span><span>向いていない人</span>
              </h3>
              <ul className="space-y-4">
                {[
                  "まだ「辞めたいかどうか分からない」段階の人",
                  "今の職場に大きな不満はなく、転職するつもりも特にない人",
                  "「勢いで明日辞めてやる!」という気持ちで、とにかく現場に爆弾を投げたい人",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 shrink-0 text-red-400">•</span>
                    <span className="text-base text-slate-400 sm:text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 8 : NOTION + PDF + PRICE
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-24 px-4">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-3 text-center text-2xl font-black text-white sm:text-3xl">
            Notionテンプレ+PDFで、すぐに使い始められます。
          </h2>
          <p className="mb-12 text-center text-slate-400">この商品は、</p>

          <div className="mb-6 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8">
              <h3 className="mb-6 text-xl font-black text-white">1. Notionテンプレート</h3>
              <ul className="space-y-4">
                {[
                  "購入後に届くページから「複製」するだけ",
                  "あなたのNotionワークスペースに自分専用のノートがコピーされます",
                  "スマホからでもPCからでも、どこでも書き込み可能",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="shrink-0 text-teal-400">✅</span>
                    <span className="text-sm text-slate-300 sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-8">
              <h3 className="mb-6 text-xl font-black text-white">2. PDF版</h3>
              <ul className="space-y-4">
                {[
                  "「紙に書きながら考えたい」「iPadで書き込みたい」という方向け",
                  "同じ内容を1ファイルのPDFとしてお渡し",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="shrink-0 text-teal-400">✅</span>
                    <span className="text-sm text-slate-300 sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="mb-16 text-center text-lg text-slate-400">の2つセットです。</p>

          {/* PRICE BOX */}
          <div
            id="purchase"
            className="rounded-3xl border border-slate-700 bg-slate-900 p-10 text-center"
          >
            <h3 className="mb-8 text-2xl font-black text-white">価格について</h3>
            <p className="mb-6 text-slate-400">
              もし、ここに書いてある内容を1対1の個別相談で3回(60分×3)やろうとしたら…
            </p>

            <div className="mb-6 flex flex-col items-center gap-3">
              <p className="text-slate-500 line-through">1回5,000円でも → 合計15,000円</p>
              <p className="text-slate-500 line-through">1回10,000円なら → 合計30,000円</p>
            </div>

            <p className="mb-10 text-slate-400">くらいは、普通にかかってきます。</p>

            <div className="mb-8 border-t border-slate-700 pt-10">
              <p className="mb-1 text-lg text-slate-400">
                通常価格：<span className="line-through">1,980円</span>（税込）
              </p>
              <p className="mb-4 font-bold text-amber-400">
                👇 ローンチ記念(予告なく終了する可能性あり)
              </p>
              <p
                className="font-black leading-none text-teal-400"
                style={{ fontSize: "clamp(4rem, 18vw, 8rem)" }}
              >
                1,480円
              </p>
              <p className="mt-2 text-lg text-slate-400">（税込）</p>
            </div>

            <ul className="mx-auto mb-10 inline-flex flex-col items-start gap-3 text-left">
              {[
                "Notionテンプレート(書き込み放題)",
                "PDF版(印刷・iPadなどで利用可)",
                "おまけ3つセット",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-teal-400">✅</span>
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>

            <Link
              href="#"
              className={`inline-flex w-full max-w-lg items-center justify-center gap-2 rounded-xl px-8 py-5 text-base sm:text-lg ${ACCENT_BTN}`}
            >
              工場から抜け出す『3日で退職準備ノート』を購入する
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          SECTION 9 : LAST LETTER — 完全な黒
          画像: hope-hill-city.png（丘の上から都市を見下ろす青年）
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-black px-4 py-36">
        <div className="mx-auto max-w-2xl space-y-14 text-center">
          <h2 className="text-2xl font-black leading-relaxed text-white sm:text-3xl md:text-4xl">
            「いつか」ではなく、「今」行動するあなたへ。
          </h2>

          <p className="text-lg leading-loose text-slate-300 sm:text-xl">
            あなたは、このLPを最後まで読み終えました。それは、あなたが「機械の歯車」として人生を終えることを、心の底から拒否している証拠です。
          </p>

          <p className="text-lg leading-loose text-slate-300 sm:text-xl">
            このノートを閉じ、またいつもの日常に戻ることもできます。しかし、その選択は、あなたの「10年後の自分」を、また同じ不安と後悔の中に置き去りにすることになります。
          </p>

          <p className="text-2xl font-black leading-relaxed text-teal-400 sm:text-3xl md:text-4xl">
            未来のあなたは、今日のあなたの決断を待っています。
          </p>

          {/* 希望の画像 */}
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="/guide/hope-hill-city.png"
              alt="丘の上に立ち、広がる都市の夜景を見下ろす男性。自由な未来を象徴するシーン"
              width={800}
              height={500}
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>

          <p className="text-lg leading-loose text-slate-300 sm:text-xl">
            「勢いで辞める勇気」は必要ありません。必要なのは、「二度と工場に戻らない」という、静かで揺るぎない「確信」です。
          </p>

          <p className="text-xl font-bold leading-relaxed text-white sm:text-2xl">
            その確信を、たった3日間で手に入れてください。
          </p>

          <div className="border-y border-slate-800 py-10">
            <p className="mb-4 text-slate-400">決済完了後、自動で</p>
            <div className="mb-4 space-y-2">
              <p className="text-slate-300">• Notionテンプレートの複製リンク</p>
              <p className="text-slate-300">• PDFダウンロードリンク</p>
            </div>
            <p className="text-slate-400">をまとめたページに遷移します。</p>
          </div>

          <p className="text-lg leading-loose text-slate-300 sm:text-xl">
            「このままは嫌だ」と思った自分の気持ちを、なかったことにしないためにも。
          </p>

          <p className="text-xl font-bold leading-relaxed text-white sm:text-2xl">
            たった3日だけ、自分の人生と本気で向き合う時間を作ってみてください。
          </p>

          <Link
            href="#purchase"
            className={`inline-flex w-full max-w-lg items-center justify-center gap-2 rounded-xl px-8 py-5 text-lg sm:text-xl ${ACCENT_BTN}`}
          >
            今すぐ「脱出の設計図」を手に入れる →
          </Link>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FOOTER
      ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer className="border-t border-slate-800 bg-slate-950 px-4 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 flex flex-wrap justify-center gap-6">
            <a href="#" className="text-sm text-slate-400 underline transition hover:text-teal-400">
              特定商取引法に基づく表記
            </a>
            <a href="#" className="text-sm text-slate-400 underline transition hover:text-teal-400">
              プライバシーポリシー
            </a>
          </div>
          <p className="mb-3 text-xs text-slate-600">
            ※本コンテンツの無断転載・転売・再配布は禁止しています。
          </p>
          <p className="mb-10 text-xs text-slate-600">
            発覚した場合は、利用停止および必要な法的措置をとらせていただくことがあります。
          </p>
          <Link
            href="/"
            className="text-sm font-medium text-teal-400 underline transition hover:text-teal-300"
          >
            退職シミュレーターに戻る
          </Link>
        </div>
      </footer>
    </main>
  );
}
