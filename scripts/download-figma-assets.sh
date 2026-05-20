#!/bin/bash
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
MEDIA="$ROOT/public/media"
SHELL_DIR="$MEDIA/shell"
WAKE="$MEDIA/wake"
EASE="$MEDIA/ease"

mkdir -p "$SHELL_DIR" "$WAKE" "$EASE"

download() {
  local url="$1"
  local out="$2"
  if [ -f "$out" ]; then return 0; fi
  curl -fsSL "$url" -o "$out" || echo "WARN: failed $out"
}

# Shell (wake category frame — shared across registration screens)
download "https://www.figma.com/api/mcp/asset/4224ecf4-f4bd-4d35-b820-fade6d7065ec" "$SHELL_DIR/status-bar.png"
download "https://www.figma.com/api/mcp/asset/90bb979b-a5a1-42c8-87c6-af349ad4773c" "$SHELL_DIR/progress-track.png"
download "https://www.figma.com/api/mcp/asset/85f446cd-5001-4dea-a072-ec8de8ca821d" "$SHELL_DIR/progress-fill.png"
download "https://www.figma.com/api/mcp/asset/34981cd2-effc-4144-a33d-4954a298f168" "$SHELL_DIR/home-indicator.png"
download "https://www.figma.com/api/mcp/asset/55459dc2-7081-4e90-a2e7-a7180c8eaf70" "$SHELL_DIR/play-icon.png"
download "https://www.figma.com/api/mcp/asset/ca447216-5ce7-42dd-bc82-4657164a590a" "$SHELL_DIR/checkmark-filled.png"
download "https://www.figma.com/api/mcp/asset/df8407f4-48c8-44a1-94f4-34e0b2fc88c5" "$SHELL_DIR/checkmark-empty.png"

# Welcome hero
download "https://www.figma.com/api/mcp/asset/aa1d68c8-6cd8-43dd-bdb9-d0d0a8f54b9c" "$MEDIA/hero-clock.png"

# Wake content thumbnails (730)
download "https://www.figma.com/api/mcp/asset/5f9e998b-1b01-44b3-989d-bea482c60f5f" "$WAKE/morning-rave.png"
download "https://www.figma.com/api/mcp/asset/3c300810-e130-4d0c-9116-dde32653337c" "$WAKE/gold-medal-morning.png"
download "https://www.figma.com/api/mcp/asset/58d5de27-9e13-46e0-b958-03b4572c55fe" "$WAKE/nyc-morning.png"

# Wake summary (731)
download "https://www.figma.com/api/mcp/asset/d263f459-9fe1-4b45-8236-e37f747f89cd" "$WAKE/summary-alarm-art.png"
download "https://www.figma.com/api/mcp/asset/dadba3b9-0ac6-4241-9f03-beaa25bbf586" "$WAKE/summary-light-art.png"
download "https://www.figma.com/api/mcp/asset/d411c1ed-a1a5-4a59-8c1d-1eb8ec2b3682" "$MEDIA/summary-hero-bg.png"

echo "Done."
