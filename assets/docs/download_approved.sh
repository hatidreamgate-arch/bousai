#!/bin/bash
set -euo pipefail
base="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$base/source" "$base/images"
fetch_pdf() {
  local name="$1" url="$2" tmp
  if [ -e "$base/source/$name" ]; then printf '既存ファイルを保護: %s\n' "$name"; return; fi
  tmp="$(mktemp "$base/source/.download.XXXXXX")"
  if ! curl --fail --location --retry 2 --max-time 120 --silent --show-error "$url" -o "$tmp"; then rm -f "$tmp"; return 1; fi
  if [ "$(head -c 5 "$tmp")" != '%PDF-' ]; then rm -f "$tmp"; printf 'PDFではない応答: %s\n' "$name" >&2; return 1; fi
  if ! (set -C; cat "$tmp" > "$base/source/$name") 2>/dev/null; then rm -f "$tmp"; printf '既存ファイルを保護: %s\n' "$name"; return; fi
  rm -f "$tmp"
  printf '取得: %s\n' "$name"
}
fetch_pdf 'I01_weather_guide_JMA_20260923_original.pdf' 'https://www.jma.go.jp/jma/kishou/know/bosai/keiho-update2026/pdf/info2026_leaflet.pdf'
fetch_pdf 'I02_weather_kids_JMA_20260923_original.pdf' 'https://www.jma.go.jp/jma/kishou/know/bosai/keiho-update2026/pdf/info2026_kids.pdf'
