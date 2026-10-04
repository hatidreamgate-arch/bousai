# 素材パッケージ

調査日：2026-09-23。Mac の `/Users/hachi/Desktop/bousai` には直接アクセスできないため、このパッケージは既存ファイルを変更していません。`source/` と `images/` は空です。CSV の「未取得」は正しい状態です。

`download_approved.sh` は Mac 上で実行する補助スクリプトです。気象庁が周知広報用に自由利用可能と明記した PDF 2件のみを取得し、同名ファイルがあれば何も上書きしません。ダウンロード成功後に PDF ヘッダを確認し、CSV の取得日を実日付へ更新してください。PDF の中身を最終確認してから Web に載せてください。原本の単独図版を画像化して `images/` に入れる処理は行いません。

Mac のターミナルで `cd /Users/hachi/Desktop/bousai && bash assets/docs/download_approved.sh` を実行できます。配布パッケージをコピーする際も、同名の既存ファイルがある場合はコピーを中止し、差分を確認してください。

権利確認元：
- https://www.jma.go.jp/jma/kishou/know/bosai/keiho-update2026/
- https://www.jma.go.jp/jma/kishou/info/coment.html
- https://disaportal.gsi.go.jp/hazardmapportal/hazardmap/copyright/copyright_data.html
- https://disaportal.gsi.go.jp/hazardmap/copyright/copyright.html
- https://www.river.go.jp/kawabou/kwb_apend/html/caution.html
- https://www.mlit.go.jp/link.html

## 追加した図解

`images/` に O01～O12 のオリジナルSVGを作成しました。公式サイトのキャプチャではなく模式図で、既存の素材や地図タイルは取り込んでいません。画像の一覧は `original_illustrations.csv` と `page_asset_map.md` を参照してください。SVGはテキスト編集で配色や文言を変更できます。サイト公開前に、具体的な避難情報や警戒レベルの文言を最新の公式情報と照合してください。
