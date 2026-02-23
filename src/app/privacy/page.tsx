import Link from "next/link";

export const metadata = {
  title: "プライバシーポリシー | UNLOOP",
  description: "UNLOOPのプライバシーポリシーです。",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* ヘッダー */}
      <div className="border-b border-slate-800 bg-slate-900 px-4 py-6">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/guide"
            className="text-sm text-teal-400 underline hover:text-teal-300 transition"
          >
            ← LPに戻る
          </Link>
        </div>
      </div>

      {/* 本文 */}
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="mb-4 text-3xl font-black text-white sm:text-4xl">
          プライバシーポリシー
        </h1>
        <p className="mb-12 text-slate-400 text-sm">
          制定日：2025年11月30日　／　最終改定日：2025年11月30日
        </p>

        <div className="space-y-10 text-slate-300 leading-relaxed">
          <p>
            【販売業者名（UNLOOP）】（以下、「当社」といいます。）は、当社が提供するサービス（以下、「本サービス」といいます。）において取得するお客様の個人情報について、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
            本サービスをご利用いただくにあたり、本ポリシーの内容をご確認いただき、同意のうえでご利用くださいますようお願いいたします。
          </p>

          {/* 第1条 */}
          <section>
            <h2 className="mb-4 text-xl font-black text-white border-l-4 border-teal-400 pl-4">
              第1条（取得する情報）
            </h2>
            <p className="mb-4">
              当社は、本サービスの提供・運営にあたり、以下の情報を取得する場合があります。
            </p>
            <div className="space-y-4">
              <div className="rounded-xl bg-slate-800/60 p-5">
                <p className="font-bold text-white mb-2">1. お客様から直接ご提供いただく情報</p>
                <ul className="space-y-1 text-slate-300 text-sm">
                  {[
                    "氏名（ニックネームを含む）",
                    "メールアドレス",
                    "SNSアカウント名",
                    "その他、お問い合わせフォーム等にご入力いただいた情報",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-teal-400 shrink-0">・</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl bg-slate-800/60 p-5">
                <p className="font-bold text-white mb-2">2. 決済に関する情報</p>
                <ul className="space-y-1 text-slate-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400 shrink-0">・</span>
                    <span>決済サービス事業者（Stripe等）を通じて取得する決済関連情報 ※当社は、クレジットカード番号等の機微な情報そのものを保持しません。</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-xl bg-slate-800/60 p-5">
                <p className="font-bold text-white mb-2">3. アクセスに関する情報</p>
                <ul className="space-y-1 text-slate-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-teal-400 shrink-0">・</span>
                    <span>クッキー（Cookie）、アクセスログ、端末情報等 ※Notionや決済サービス提供会社等の外部サービス側で取得される情報を含みます。</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 第2条 */}
          <section>
            <h2 className="mb-4 text-xl font-black text-white border-l-4 border-teal-400 pl-4">
              第2条（利用目的）
            </h2>
            <p className="mb-4">当社は、取得した情報を、以下の目的で利用します。</p>
            <ul className="space-y-2">
              {[
                "本サービスの提供・運営のため",
                "本サービスに関するご案内・お問い合わせ対応のため",
                "ご購入いただいた商品・コンテンツの提供・サポートのため",
                "代金の請求・決済の確認のため",
                "利用状況の分析・サービス改善・新サービスの企画開発のため",
                "キャンペーン・アンケート等のご案内（任意）のため",
                "不正行為や規約違反等への対応・トラブル防止のため",
                "法令・行政機関等により必要とされる対応のため",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-teal-400 shrink-0 font-bold">{i + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 第3条 */}
          <section>
            <h2 className="mb-4 text-xl font-black text-white border-l-4 border-teal-400 pl-4">
              第3条（利用目的の変更）
            </h2>
            <p className="text-sm">
              利用目的が、変更前と関連性を有すると合理的に認められる範囲を超える場合には、あらためてお客様の同意を得るものとします。
            </p>
          </section>

          {/* 第4条 */}
          <section>
            <h2 className="mb-4 text-xl font-black text-white border-l-4 border-teal-400 pl-4">
              第4条（個人情報の第三者提供）
            </h2>
            <p className="mb-4 text-sm">
              当社は、次のいずれかに該当する場合を除き、あらかじめお客様の同意を得ることなく、個人情報を第三者に提供しません。
            </p>
            <ul className="space-y-2">
              {[
                "法令に基づく場合",
                "人の生命・身体・財産の保護のために必要がある場合であり、本人の同意を得ることが困難であるとき",
                "公衆衛生の向上・児童の健全な育成の推進のために特に必要がある場合であり、本人の同意を得ることが困難であるとき",
                "国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要があり、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき",
                "利用目的の達成に必要な範囲で、個人情報の取扱いの全部または一部を委託する場合",
                "事業の承継に伴って個人情報が提供される場合",
                "その他、本人の同意がある場合",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-teal-400 shrink-0 font-bold">{i + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 第5条 */}
          <section>
            <h2 className="mb-4 text-xl font-black text-white border-l-4 border-teal-400 pl-4">
              第5条（個人情報の共同利用）
            </h2>
            <p className="text-sm">
              現時点では、当社は個人情報の共同利用を行っておりません。共同利用を行う場合は、その目的・範囲等をあらためて本ページにて公表します。
            </p>
          </section>

          {/* 第6条 */}
          <section>
            <h2 className="mb-4 text-xl font-black text-white border-l-4 border-teal-400 pl-4">
              第6条（個人情報の管理）
            </h2>
            <p className="text-sm">
              当社は、個人情報の漏えい・滅失・毀損を防止するため、必要かつ適切な安全管理措置を講じます。また、個人情報の取扱いを外部に委託する場合には、委託先に対して必要かつ適切な監督を行います。
            </p>
          </section>

          {/* 第7条 */}
          <section>
            <h2 className="mb-4 text-xl font-black text-white border-l-4 border-teal-400 pl-4">
              第7条（個人情報の開示・訂正・利用停止等）
            </h2>
            <p className="mb-4 text-sm">
              お客様から、当社が保有するご自身の個人情報について、
            </p>
            <ul className="mb-4 space-y-1">
              {["開示", "訂正・追加・削除", "利用停止・消去", "第三者提供の停止"].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-teal-400 shrink-0">・</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm">
              等のお申し出があった場合には、ご本人確認のうえ、法令に基づき適切に対応いたします。お問い合わせは、第11条のお問い合わせ窓口までご連絡ください。
            </p>
          </section>

          {/* 第8条 */}
          <section>
            <h2 className="mb-4 text-xl font-black text-white border-l-4 border-teal-400 pl-4">
              第8条（クッキー等の利用）
            </h2>
            <p className="text-sm">
              当社は、本サービスの利用状況の把握やサービス改善のため、クッキー（Cookie）その他の類似技術を利用する場合があります。お使いのブラウザの設定により、クッキーの受け入れを拒否することも可能ですが、その場合、本サービスの一部機能がご利用いただけないことがあります。また、Notion、決済サービス（Stripe等）その他外部サービスの提供事業者も、それぞれのプライバシーポリシーに基づきクッキー等を利用することがあります。
            </p>
          </section>

          {/* 第9条 */}
          <section>
            <h2 className="mb-4 text-xl font-black text-white border-l-4 border-teal-400 pl-4">
              第9条（外部サービスの利用について）
            </h2>
            <p className="mb-4 text-sm">当社は、以下の外部サービスを利用する場合があります。</p>
            <ul className="mb-4 space-y-1">
              {[
                "ノート・ワークブックの提供：Notion",
                "決済の処理：Stripe ほか決済サービス",
                "アクセス解析・広告配信ツール（利用する場合）",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <span className="text-teal-400 shrink-0">・</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm">
              各サービスにおける個人情報の取扱い等については、それぞれの事業者が定めるプライバシーポリシーをご確認ください。
            </p>
          </section>

          {/* 第10条 */}
          <section>
            <h2 className="mb-4 text-xl font-black text-white border-l-4 border-teal-400 pl-4">
              第10条（未成年の利用）
            </h2>
            <p className="text-sm">
              未成年のお客様が本サービスをご利用になる場合は、必ず保護者の同意を得たうえでご利用ください。保護者の同意なく未成年者による利用が行われた場合でも、当社は通常のご利用と同様の対応を行うものとします。
            </p>
          </section>

          {/* 第11条 */}
          <section>
            <h2 className="mb-4 text-xl font-black text-white border-l-4 border-teal-400 pl-4">
              第11条（お問い合わせ窓口）
            </h2>
            <p className="mb-4 text-sm">
              本ポリシーに関するお問い合わせ、個人情報の取扱いに関するご質問・開示請求等は、下記窓口までご連絡ください。
            </p>
            <div className="rounded-xl bg-slate-800/60 p-5 space-y-2 text-sm">
              {[
                ["販売業者名", "UNLOOP"],
                ["担当者名", "笹田 康太"],
                ["メールアドレス", "k.site24@gmail.com"],
                ["対応時間", "平日 10:00〜18:00"],
              ].map(([label, value], i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-slate-400 shrink-0 w-28">{label}</span>
                  <span className="text-white">{value}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 第12条 */}
          <section>
            <h2 className="mb-4 text-xl font-black text-white border-l-4 border-teal-400 pl-4">
              第12条（プライバシーポリシーの変更）
            </h2>
            <p className="text-sm">
              当社は、必要に応じて本ポリシーの内容を変更することがあります。重要な変更がある場合は、本サービス上での告知またはその他適切な方法によりお知らせします。変更後のプライバシーポリシーは、本ページに掲載された時点から効力を生じるものとします。
            </p>
          </section>

          {/* 制定日 */}
          <div className="border-t border-slate-700 pt-8 text-sm text-slate-400 space-y-1">
            <p>制定日：2025年11月30日</p>
            <p>最終改定日：2025年11月30日</p>
          </div>
        </div>
      </div>

      {/* フッター */}
      <div className="border-t border-slate-800 bg-slate-900 px-4 py-8 text-center">
        <Link
          href="/guide"
          className="text-sm text-teal-400 underline hover:text-teal-300 transition"
        >
          ← LPに戻る
        </Link>
      </div>
    </main>
  );
}
