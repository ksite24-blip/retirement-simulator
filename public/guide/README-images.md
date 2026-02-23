# /guide ページ用画像の差し替え

このフォルダ内の PNG を差し替えると、`/guide` ページのビジュアルが更新されます。
`src/app/guide/page.tsx` の定数 `IMG` で参照しているファイル名は以下のとおりです。

| ファイル名 | 用途（page.tsx のコメント） |
|-----------|------------------------------|
| `first-view-factory-sunset.png` | ファーストビュー：夕暮れの工場を背にした人物 |
| `factory-assembly-line.png` | 工場内の組立作業（苦悩） |
| `hope-hill-city.png` | 丘の上で街を眺める人物（希望） |
| `resignation-letter-locker.png` | 辞表を入れた作業服とロッカー（決断） |
| `before-after-factory-to-web.png` | ビフォアアフター（工場⇔Web） |
| `checklist-hands.png` | 転職・退職準備チェックリストを書く手元 |
| `locker-room-weary.png` | 休憩室で疲れた人物 |
| `cafe-vs-street-worker.png` | カフェ内と路上の作業服男性の対比 |

同じファイル名で上書きするか、新しいファイル名にした場合は `src/app/guide/page.tsx` の `IMG` オブジェクトを編集してください。
