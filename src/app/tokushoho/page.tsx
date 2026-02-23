import Link from "next/link";

export const metadata = {
  title: "特定商取引法に基づく表記 | UNLOOP",
  description: "UNLOOPの特定商取引法に基づく表記です。",
};

const rows = [
  {
    label: "販売業者",
    value: "UNLOOP",
  },
  {
    label: "運営統括責任者",
    value: "笹田 康太",
  },
  {
    label: "所在地",
    value: "お客様からの請求があった場合、遅滞なくメールにて開示いたします。",
  },
  {
    label: "電話番号",
    value:
      "お電話番号については、お客様からの請求があった場合、遅滞なくメールにて開示いたします。",
  },
  {
    label: "メールアドレス",
    value:
      "k.site24@gmail.com\n※お問い合わせは、上記メールアドレス宛にお願いいたします。",
  },
  {
    label: "販売URL",
    value:
      "https://lopsided-tax-b57.notion.site/3-2bbc73c7bc78803f8aaec46162a8dca8?source=copy_link",
  },
  {
    label: "販売価格",
    value:
      "各商品ページに税込価格を表示しております。\n\n本商品『工場から抜け出す 3日で退職準備ノート』については、\n・通常価格：2,480円（税込）\n・ローンチ記念価格：1,480円（税込）\nとして販売しています。\n\n※キャンペーン・セール等により価格が変動する場合があります。",
  },
  {
    label: "商品代金以外に\n必要な料金",
    value:
      "・クレジットカード決済手数料（各カード会社所定の手数料）\n・銀行振込の場合の振込手数料（銀行振込を利用する場合）\n・インターネット接続にかかる通信料（お客様のご負担となります）",
  },
  {
    label: "申込の有効期限",
    value:
      "原則として、販売ページに記載の販売期間内に限りお申し込みいただけます。\n販売数の上限に達した場合や、販売者の判断により予告なく販売を終了する場合があります。",
  },
  {
    label: "販売数量",
    value:
      "商品ごとに販売数の上限を設ける場合があります。上限数に達した時点で受付を終了させていただきます。",
  },
  {
    label: "商品の引き渡し時期",
    value:
      "クレジットカード決済完了後、自動的に表示されるサンクスページにて、\n・Notionテンプレートの複製用リンク\n・PDF版（印刷用）のダウンロードリンク\nをご案内いたします。\n\n決済完了後、即時に閲覧・ダウンロードが可能です。",
  },
  {
    label: "お支払い方法",
    value:
      "クレジットカード決済（Stripeを利用）\n（VISA／Mastercard／その他対応ブランド）\n\n※利用可能なブランドは、Stripeの仕様に準じます。",
  },
  {
    label: "お支払い時期",
    value:
      "クレジットカード決済：各カード会社の会員規約に基づき、ご利用のクレジットカード会社よりご請求させていただきます。",
  },
  {
    label: "返品・キャンセル\nについて",
    value:
      "本商品はデジタルコンテンツ（オンライン上で閲覧・ダウンロードする商品）という性質上、以下の方針とさせていただきます。\n\n・お客様のご都合による購入後のキャンセル・返品・返金はお受けしておりません。\n（例：イメージと違う／必要なくなった／誤って購入した 等）\n\n・二重決済など、明らかに当方または決済システムの不備によるエラーが確認できる場合には、個別に対応いたしますので、k.site24@gmail.com までご連絡ください。",
  },
  {
    label: "動作環境",
    value:
      "本商品は、以下の環境での利用を想定しています。\n・インターネット接続環境\n・Notionをご利用いただける端末（PC／スマートフォン／タブレット）\n・PDFファイルを閲覧できる環境（Adobe Acrobat Reader 等）\n\n※全ての端末環境での動作を保証するものではありません。\n※Notionの仕様変更等により、画面や挙動が一部変更される場合があります。",
  },
  {
    label: "表現および商品に\n関する注意書き",
    value:
      "本商品に記載された内容は、あくまで工場勤務からの退職準備・キャリア検討をサポートするための情報提供・ワークシートであり、特定の結果（退職の成功・転職成功・収入の増加など）を保証するものではありません。\n\nまた、効果の感じ方には個人差があり、必ずしも全ての方に同様の結果が得られることをお約束するものではありません。",
  },
  {
    label: "著作権・\n二次利用について",
    value:
      "本商品および付随するテキスト・PDF・データ等のコンテンツの著作権は、UNLOOPに帰属します。\n\n購入者ご本人による個人的な利用の範囲を超える、無断での転載・複製・転売・再配布等の行為は禁止しております。\n\n無断利用が確認された場合は、利用停止・損害賠償請求等、必要な措置を講じる場合があります。",
  },
  {
    label: "お問い合わせ窓口",
    value:
      "商品に関するお問い合わせは、下記までお願いいたします。\n\nメールアドレス：k.site24@gmail.com\n\n原則として、平日10:00〜18:00に順次対応させていただきます。\n内容によっては、ご返信までにお時間をいただく場合がございます。",
  },
];

export default function TokushohoPage() {
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
        <h1 className="mb-12 text-3xl font-black text-white sm:text-4xl">
          特定商取引法に基づく表記
        </h1>

        {/* テーブル */}
        <div className="space-y-0 overflow-hidden rounded-2xl border border-slate-700">
          {rows.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 sm:grid-cols-[180px_1fr] ${
                i % 2 === 0 ? "bg-slate-800/60" : "bg-slate-900/60"
              } ${i !== rows.length - 1 ? "border-b border-slate-700" : ""}`}
            >
              {/* ラベル */}
              <div className="px-5 pt-4 pb-1 sm:py-5 sm:border-r sm:border-slate-700">
                <span className="text-sm font-bold text-teal-400 whitespace-pre-line">
                  {row.label}
                </span>
              </div>
              {/* 値 */}
              <div className="px-5 pb-4 pt-1 sm:py-5">
                <p className="text-sm leading-relaxed text-slate-300 whitespace-pre-line">
                  {row.value}
                </p>
              </div>
            </div>
          ))}
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
