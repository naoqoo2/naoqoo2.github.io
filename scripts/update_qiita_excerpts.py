#!/usr/bin/env python3
"""
Qiita記事をブログ抜粋に書き換えるスクリプト。

- _posts配下のMarkdownからタイトル・カテゴリ・本文を取得
- 各記事の要点を自動抽出して箇条書きを生成
- Qiita API経由で該当記事の本文を置き換える

Usage:
    python3 scripts/update_qiita_excerpts.py           # ドライラン（更新しない）
    python3 scripts/update_qiita_excerpts.py --apply   # Qiita記事を更新
"""
from __future__ import annotations

import argparse
import json
import re
import ssl
import sys
import time
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path
from typing import Dict, List, Optional

BASE_BLOG_URL = "https://naoqoo2.com"
QIITA_API_BASE = "https://qiita.com/api/v2"
TOKEN_PATH = Path(".qiita_token")
POSTS_DIR = Path("_posts")
SITE_DIR = Path("_site")
SSL_CONTEXT = ssl._create_unverified_context()
SITE_TITLE_CACHE: Dict[str, Dict[str, str]] = {}


def read_token() -> str:
    if not TOKEN_PATH.exists():
        raise SystemExit("Qiitaトークン(.qiita_token)が見つかりません。")
    token = TOKEN_PATH.read_text(encoding="utf-8").strip()
    if not token:
        raise SystemExit(".qiita_token が空です。")
    return token


def parse_front_matter(text: str) -> Dict[str, object]:
    """yamlモジュールなしで必要な項目だけ抜き出す"""
    data: Dict[str, object] = {}
    lines = text.splitlines()
    idx = 0
    while idx < len(lines):
        line = lines[idx]
        if ":" not in line:
            idx += 1
            continue
        key, raw_value = line.split(":", 1)
        key = key.strip()
        value = raw_value.strip()
        if key not in {"title", "categories", "slug"}:
            idx += 1
            continue
        if key in {"title", "slug"}:
            cleaned = value.strip().strip('"').strip("'")
            data[key] = cleaned
            idx += 1
            continue
        # categories
        items: List[str] = []
        if value:
            items.append(value.strip().strip('"').strip("'"))
            idx += 1
            data[key] = items
            continue
        idx += 1
        while idx < len(lines):
            child = lines[idx].strip()
            if not child:
                idx += 1
                continue
            if child.startswith("- "):
                entry = child[2:].strip().strip('"').strip("'")
                if entry:
                    items.append(entry)
                idx += 1
                continue
            break
        data[key] = items
    return data


def slug_from_filename(path: Path) -> str:
    stem = path.stem
    return re.sub(r"^\d{4}-\d{2}-\d{2}-", "", stem)


def category_path(categories: List[str]) -> str:
    if not categories:
        return ""
    normalized = [c.strip("/") for c in categories if c.strip("/")]
    return "/".join(normalized)


def slugify_text(value: str) -> str:
    if not value:
        return ""
    normalized = unicodedata.normalize("NFKC", value).strip()
    normalized = re.sub(r"\s+", "-", normalized)
    normalized = re.sub(r"[^\w\-\u3040-\u30ff\u3400-\u9fff]", "-", normalized, flags=re.UNICODE)
    normalized = re.sub(r"-{2,}", "-", normalized)
    return normalized.strip("-")


def load_site_title_map(cat_path: str) -> Dict[str, str]:
    if cat_path in SITE_TITLE_CACHE:
        return SITE_TITLE_CACHE[cat_path]
    base = SITE_DIR
    if cat_path:
        base = base.joinpath(*cat_path.split("/"))
    mapping: Dict[str, str] = {}
    if not base.exists():
        SITE_TITLE_CACHE[cat_path] = mapping
        return mapping
    for child in base.iterdir():
        if not child.is_dir():
            continue
        index_path = child / "index.html"
        if not index_path.is_file():
            continue
        try:
            html = index_path.read_text(encoding="utf-8", errors="ignore")
        except OSError:
            continue
        title_match = re.search(r"<title>(.*?)</title>", html, flags=re.S)
        if not title_match:
            continue
        title_text = title_match.group(1).strip()
        if " - " in title_text:
            title_text = title_text.split(" - ")[0].strip()
        mapping[title_text] = child.name
    SITE_TITLE_CACHE[cat_path] = mapping
    return mapping


def resolve_slug(title: str, cat_path: str, slug_hint: str) -> str:
    mapping = load_site_title_map(cat_path)
    if title in mapping:
        return mapping[title]
    fallback = slugify_text(slug_hint or title)
    return fallback or slug_hint


def load_posts() -> Dict[str, Dict[str, str]]:
    posts: Dict[str, Dict[str, str]] = {}
    for path in POSTS_DIR.rglob("*.md"):
        text = path.read_text(encoding="utf-8")
        if not text.startswith("---"):
            continue
        parts = text.split("---", 2)
        if len(parts) < 3:
            continue
        front_matter = parse_front_matter(parts[1])
        title = front_matter.get("title")
        if not title:
            continue
        categories = front_matter.get("categories") or []
        if isinstance(categories, str):
            categories = [categories]
        cat_path = category_path(categories)
        slug_hint = front_matter.get("slug") or slug_from_filename(path)
        slug = resolve_slug(title, cat_path, slug_hint)
        posts[title] = {
            "content": parts[2].strip(),
            "category_path": cat_path,
            "slug": slug,
        }
    return posts


def strip_markdown(text: str) -> str:
    text = re.sub(r"```.*?```", "", text, flags=re.S)
    text = re.sub(r"`([^`]*)`", r"\1", text)
    text = re.sub(r"!\[[^\]]*\]\([^)]+\)", "", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"\1", text)
    text = re.sub(r"<br\s*/?>", " ", text, flags=re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"[*>_#~]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def extract_sections(markdown: str) -> List[Dict[str, List[str]]]:
    sections: List[Dict[str, List[str]]] = []
    lines = markdown.splitlines()
    current = {"heading": None, "content": []}  # type: ignore
    in_code_block = False
    for raw_line in lines:
        line = raw_line.rstrip()
        if line.strip().startswith("```"):
            in_code_block = not in_code_block
            continue
        if in_code_block:
            continue
        heading_match = re.match(r"^(#{2,6})\s+(.*)", line)
        if heading_match:
            if current and (current.get("heading") or any(l.strip() for l in current.get("content", []))):
                sections.append(current)
            current = {"heading": heading_match.group(2).strip(), "content": []}  # type: ignore
            continue
        current.setdefault("content", []).append(line)
    if current and (current.get("heading") or any(l.strip() for l in current.get("content", []))):
        sections.append(current)
    return sections


def summarize_section(section: Dict[str, object]) -> Optional[str]:
    content_lines = []
    for line in section.get("content", []):  # type: ignore
        stripped = line.strip()
        if not stripped:
            continue
        if stripped.startswith(">"):
            stripped = stripped.lstrip(">").strip()
        if stripped.startswith(("-", "*")):
            stripped = stripped.lstrip("-*").strip()
        if stripped.startswith("|") or ("|" in stripped and " | " in stripped):
            continue
        content_lines.append(stripped)
    if not content_lines:
        return None
    text = strip_markdown(" ".join(content_lines))
    if not text:
        return None
    sentences = re.findall(r"[^。．.!！？?]+[。．.!！？?]", text)
    if sentences:
        summary = "".join(sentences[:2]).strip()
    else:
        summary = text.strip()
    if len(summary) > 140:
        summary = summary[:137].rstrip() + "..."
    heading = section.get("heading")
    if heading:
        heading_text = strip_markdown(str(heading))
        if heading_text and not summary.startswith(heading_text):
            summary = f"{heading_text} — {summary}"
    return summary


LOW_PRIORITY_HEADINGS = ["余談", "おわり", "まとめ", "所感", "あとがき", "雑記"]


def is_low_priority(section: Dict[str, object]) -> bool:
    heading = section.get("heading")
    if not heading:
        return False
    text = str(heading)
    return any(keyword in text for keyword in LOW_PRIORITY_HEADINGS)


def normalize_summary(text: str) -> str:
    cleaned = re.sub(r"\s+", "", text)
    cleaned = re.sub(r"[。、！!？?\-ー―—（）()・〜～]", "", cleaned)
    return cleaned


def is_duplicate_summary(seen: List[str], candidate: str) -> bool:
    for existing in seen:
        if candidate == existing:
            return True
        if candidate.startswith(existing) or existing.startswith(candidate):
            return True
    return False


GENERIC_POINT_TEMPLATES = [
    "{title}の実装手順やハマりどころはブログ本文で詳しく紹介しています。",
    "{title}のコード全文と設定例はブログをご覧ください。",
    "{title}の応用パターンや補足リンクもブログに追記しています。",
]


def extract_points(content: str, title: str, max_points: int = 3) -> List[str]:
    sections = extract_sections(content)
    has_any_heading = any(section.get("heading") for section in sections)
    priority_sections = []
    fallback_sections = []
    for section in sections:
        if section.get("heading") and not is_low_priority(section):
            priority_sections.append(section)
        else:
            fallback_sections.append(section)
    ordered_sections = priority_sections + fallback_sections if priority_sections else fallback_sections
    points: List[str] = []
    normalized_seen: List[str] = []
    for section in ordered_sections:
        summary = summarize_section(section)
        if summary:
            normalized = normalize_summary(summary)
            if is_duplicate_summary(normalized_seen, normalized):
                continue
            normalized_seen.append(normalized)
            points.append(summary)
        if len(points) >= max_points:
            break
    if len(points) < max_points and not has_any_heading:
        fallback = strip_markdown(content)
        sentences = re.findall(r"(.+?[。．.!！？?])", fallback)
        for sentence in sentences:
            sentence = sentence.strip()
            if not sentence:
                continue
            normalized = normalize_summary(sentence)
            if is_duplicate_summary(normalized_seen, normalized):
                continue
            if len(sentence) < 30:
                continue
            normalized_seen.append(normalized)
            points.append(sentence if len(sentence) <= 140 else sentence[:137] + "...")
            if len(points) >= max_points:
                break
    if not points:
        points.append(f"{title}の詳細はブログ版で解説しています。")
    idx = 0
    while len(points) < max_points and idx < len(GENERIC_POINT_TEMPLATES):
        generic = GENERIC_POINT_TEMPLATES[idx].format(title=title)
        if generic not in points:
            points.append(generic)
        idx += 1
    return points[:max_points]


def build_blog_url(cat_path: str, slug: str) -> str:
    parts: List[str] = []
    if cat_path:
        parts.append(cat_path.strip("/"))
    if slug:
        parts.append(slug.strip("/"))
    encoded_parts = [urllib.parse.quote(p) for p in parts if p]
    path = "/".join(encoded_parts)
    return urllib.parse.urljoin(BASE_BLOG_URL, f"/{path}/")


def build_excerpt(body: str, blog_url: str, title: str) -> str:
    bullets = extract_points(body, title)
    bullet_lines = "\n".join(f"- {point}" for point in bullets)
    more_lines = "\n".join(
        [
            "- ブログではコード全文や補足資料を継続的に更新しています",
            "- 気になる点があればコメントください🙌",
        ]
    )
    return (
        f"> この記事は個人ブログに移行しました。最新情報は[ブログ版]({blog_url})をご覧ください。\n\n"
        f"## 要点\n{bullet_lines}\n\n"
        f"## もっと詳しく\n{more_lines}\n"
    )


def fetch_qiita_items(token: str) -> List[dict]:
    headers = {"Authorization": f"Bearer {token}", "User-Agent": "qiita-excerpt-updater/1.0"}
    items: List[dict] = []
    page = 1
    while True:
        url = f"{QIITA_API_BASE}/authenticated_user/items?page={page}&per_page=100"
        data = request_json(url, headers)
        if not data:
            break
        items.extend(data)
        if len(data) < 100:
            break
        page += 1
    return items


def request_json(url: str, headers: Dict[str, str]) -> List[dict]:
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req, context=SSL_CONTEXT) as resp:
        payload = resp.read()
    return json.loads(payload.decode("utf-8"))


def patch_qiita_item(item: dict, body: str, token: str) -> None:
    item_id = item["id"]
    url = f"{QIITA_API_BASE}/items/{item_id}"
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
        "User-Agent": "qiita-excerpt-updater/1.0",
    }
    tags = []
    for tag in item.get("tags", []):
        name = tag.get("name")
        if not name:
            continue
        tags.append({"name": name, "versions": tag.get("versions") or []})
    payload_dict = {
        "title": item.get("title"),
        "body": body,
        "tags": tags,
        "private": item.get("private", False),
        "coediting": item.get("coediting", False),
        "gist": item.get("gist", False),
        "tweet": item.get("tweet", False),
    }
    if item.get("group_url_name"):
        payload_dict["group_url_name"] = item["group_url_name"]
    if item.get("organization_url_name"):
        payload_dict["organization_url_name"] = item["organization_url_name"]
    payload = json.dumps(payload_dict).encode("utf-8")
    req = urllib.request.Request(url, data=payload, headers=headers, method="PATCH")
    with urllib.request.urlopen(req, context=SSL_CONTEXT) as resp:
        resp.read()


def main() -> None:
    parser = argparse.ArgumentParser(description="Qiita記事をブログ抜粋に更新する")
    parser.add_argument("--apply", action="store_true", help="Qiita記事を実際に更新する")
    parser.add_argument("--limit", type=int, help="処理する記事数を制限する（テスト用）")
    args = parser.parse_args()

    token = read_token()
    posts = load_posts()
    items = fetch_qiita_items(token)
    if args.limit:
        items = items[: args.limit]

    missing_titles: List[str] = []
    updated_titles: List[str] = []

    for item in items:
        title = item.get("title")
        if title not in posts:
            missing_titles.append(title)
            continue
        post = posts[title]
        blog_url = build_blog_url(post["category_path"], post["slug"])
        body = build_excerpt(post["content"], blog_url, title)
        if args.apply:
            try:
                patch_qiita_item(item, body, token)
                time.sleep(1)
            except urllib.error.HTTPError as err:
                sys.stderr.write(f"[ERROR] {title} ({item['id']}) 更新失敗: {err.read().decode('utf-8', errors='ignore')}\n")
                continue
        else:
            print("=" * 80)
            print(f"Title: {title}")
            print(body)
        updated_titles.append(title)

    print(f"対象記事: {len(items)}件, 更新可能: {len(updated_titles)}件, 未マッチ: {len(missing_titles)}件")
    if missing_titles:
        print("未マッチタイトル:")
        for t in missing_titles:
            print(f"- {t}")


if __name__ == "__main__":
    main()
