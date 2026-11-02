# liqinye.github.io — redesign

A small, dependency-light Jekyll site. No theme, no Bootstrap, no jQuery: one stylesheet
(`assets/css/site.css`, plus `cv.css` on the CV page), three self-hosted fonts (Newsreader, Inter, Lusitana),
a few Liquid includes, and YAML data files that hold all the content.

## Edit content

| What | Where |
|---|---|
| Bio paragraphs | `_includes/bio.md` (Markdown) |
| Name, email, website host (for the CV page/PDF), CV path, social links | `_config.yml` → `profile:` and `social:` |
| Publications (featured cards on the home page; the full list on `/publications/`) | `_data/publications.yml` |
| News (the home-page section shows the five newest items; a centred chevron under the list shows and hides the rest, no separate page) | `_data/news.yml` (newest first; each item opens with a decorative glyph hidden from screen readers — `icon:` (an inline SVG in `_includes/news-icons/`, a project's own mark; see "News marks") when set, else `emoji:`; `text` is written in the active voice, Markdown links allowed, and should fit two lines at the 38rem measure, ≈ 170 characters) |
| Experience / Education (each row starts with the organisation's logo in its own colours) / Teaching / Service / Honors | `_data/*.yml` — logos: see "Organisation logos" |
| Misc page (the photo collections: equal square tiles, three per place; the lede is the owner's text from the old site, verbatim, set full-width like the headings) | `misc.html` (title, lede), `_data/photos.yml` (`title` as "City, ST", `date` on the right, photos with optional `pos`) + images in `assets/img/photos/` |
| Temporary notice between the bio and the icon row ("I am looking for a research internship for Summer 2027. Feel free to reach out!"): a centred row of the hero grid (`notice` area, kept short enough for one line in the text column), highlighter-style, `text-wrap: balance` when a narrow viewport forces a wrap; the wording follows the usual PhD-homepage pattern (research notes: `~/Desktop/liqinye-icon-candidates/final/notice/CONVENTIONS.md`) | `_config.yml` → `profile.notice` (a list of lines or one string, Markdown allowed; delete the key to remove), `index.html` `.notice` |
| Header brand — a small `Liqin Ye` (Lusitana) as the home link on every page except the home page, which has none | `_includes/nav.html` (`.brand`); the retired Chinese marks `_includes/brand-mark-*.svg` |
| Hidden motto under the portrait ("Focus on Yourself" + crossed fingers, revealed by selecting it) | `_config.yml` → `profile.motto`; `index.html` (`.motto`), `_includes/icons/fingers-crossed.svg`, the reveal script at the end of `_includes/footer.html` |
| CV PDF | `assets/pdf/liqin-cv.pdf` — the owner's own compiled LaTeX CV, served as is (same URL as the old site, so shared links keep working), embedded on `/cv/`; to update it replace the file and the first-page image, see **CV** |

### Adding a paper

Append an entry to `_data/publications.yml`. Every entry is listed on `/publications/` (newest first, under its year, one `_includes/pub-row.html` per paper);
`featured: true` additionally renders a project card with the paper's figure under "Selected Publications" on the home page. Cards and
entries show title, authors, venue line and link buttons only (no summary, no first-author labels; `_includes/pubmeta.html` renders
`status: published` as "KDD 2025 · Research Track" and anything else as "Preprint · 2026"). Long author lists are elided by
`_includes/authors.html` only where the text column is narrow: up to `max` names in full (cards 6; `/publications/`,
whose author line spans the full width, passes 100 and so lists everyone), otherwise the first three, "…", Liqin Ye
if not already shown, "…", and always the last author; on the cards each "…" is a button that expands the full list in place
(one-way, until the page reloads; script at the end of `_includes/footer.html`) — "Liqin Ye*, Haorui Wang*, Fardin Ahmed, … Chao Zhang"; "Michael Galarnyk,
Siddharth Lohani, Vidhyakshaya Kannan, … Liqin Ye, … Sudheer Chava". Each "…" is a `<span class="ellipsis">` whose `title` reads
"n authors in total"; `count=true` would append "(n authors)" after the list (no page uses it now). Fields:

```yaml
- key: my-paper                 # used as the anchor id (#my-paper)
  featured: true
  title: "Full title"
  short: ShortName              # suffix of the buttons' accessible names ("arXiv: ShortName")
  authors:
    - { name: Liqin Ye, self: true, equal: true }   # self = highlighted; equal = equal contribution (*)
    - { name: Coauthor Name }
  venue: NeurIPS                # short venue name without year (use arXiv for preprints)
  track: Main Track             # optional
  year: 2027
  date: 2027-01-15              # used for ordering
  status: published             # published | preprint | under-review
  summary: One or two sentences, written as a claim.   # kept in the data, not rendered
  image: my-paper.jpg           # 3:2 figure, see "Figures" below
  media: my-paper.gif           # optional: an animated GIF shown instead of the image on the card (see "Figures")
  poster: my-paper-poster.jpg   # its still for visitors who prefer reduced motion
  motif: my-paper.svg           # fallback drawing when the jpg is absent
  links: { arxiv: "https://arxiv.org/abs/...", code: "...", website: "...", data: "..." }   # also abstract, pdf, slides, video
```

#### Link buttons

`_includes/links.html` renders one small icon-only button per link (`.chip.chip--arxiv` …; 28 × 28 px, 4 px radius), the label as
the tooltip (`title`) and the accessible name (`aria-label="arXiv: ShortName"`). Each type has a soft tint and an icon colour as
tokens in `site.css` — `--chip-TYPE-bg` / `--chip-TYPE-fg` for `arxiv` (cinnabar), `code` (slate), `website` (Tiffany), `data`
(Hugging Face: a neutral warm tint; its fg only tints the hover), `pdf` (grey), `abstract` (ochre) — with dark values in both dark
blocks; every glyph/tint pair is ≥ 3:1. The icons are the thin-outline set in `_includes/icons/links/` (stroke 1.7, drawn at 2 on the
tints), except Hugging Face, which shows the official full-colour logo (`hf-logo.svg`, 20 px); Slides and Video borrow the PDF and
website icons until they get their own.

### Figures for featured cards

Each card shows the paper's main figure as a photograph: a 1200 × 800 jpg (3:2) in `assets/img/projects/`, named by `image:`, in a
fixed 3:2 frame with a hairline edge, 4 px radius and paper matte (`.project__media`; `object-fit: cover`, so a replaced file can
never reflow the card; dark mode dims it to 88 % via `--figure-filter`). When `image` is absent — or names an `.svg` — the inline
drawing `_includes/motifs/<motif>.svg` is shown instead (drawing classes `m-ink`, `m-faint`, `m-accent`, `m-accent-fill`,
`m-seal-fill`, `m-dash`, `m-dot` follow the palette in both modes).

Raw figures (the papers' original PNGs) live in `_figures/`, which Jekyll does not publish. The shipped jpgs were made with ImageMagick:
saturation −35 %, contrast +1.5σ, multiply-blended onto warm paper `#F5F0E6` so white becomes the matte, 5 % padding, 3:2 crop or fit
(AlphaBet is the paper's overview figure, 2.3:1, fitted whole on the matte; the Forecast-Dojo jpg — the fallback behind its GIF — is
cropped to panel (a); EvoTD and SiDyP were desaturated a further 22 %). Regenerate from `_figures/`
with `magick <src> -modulate 100,65,100 … -resize 1200x800 -extent 1200x800 assets/img/projects/<key>.jpg` and keep the file names.

Animated media: `media: name.gif` (with `poster: name-poster.jpg`) shows the animation instead of `image:` on the card, letterboxed
(`object-fit: contain`) in the same 3:2 frame and multiplied onto the matte (`--media-blend`), so its white background becomes the
paper; in dark mode the matte takes the GIF's own dimmed off-white (`--media-matte`) so no letterbox bars show. Visitors who prefer
reduced motion get the poster through a `<picture>` source and never download the GIF. Keep GIFs ≤ 1200 px wide
(`magick in.gif -coalesce -resize 1000x -layers optimize name.gif`) and make the poster from the first frame:
`magick 'name.gif[0]' -coalesce -resize 1200x -quality 84 assets/img/projects/name-poster.jpg`. Forecast-Dojo's card uses its replay
animation this way — `forecast-dojo.gif` (1000 × 563, 54 frames, 158 KB) with `forecast-dojo-poster.jpg` (1200 × 675); `image:` stays
in the data as the fallback.

### Organisation logos

Experience and Education rows start with the organisation's logo, in its own colours and at one size for every row, in a fixed 7rem
column at the page's left text edge; after a 2rem gap the text block starts (every title on one vertical line, 9rem in),
with each line's period or place right-aligned at the far right (`index.html`, `_includes/logo.html`). `logo:` in
`_data/experience.yml` / `_data/education.yml` is a file stem in `assets/img/logos/` — seals load `STEM.png`, wordmarks (`wide: true`,
with `logo_size: "W H"` = the SVG's viewBox) load `STEM.svg` — or a full file name used as is (`amazon-logo.svg`). Every seal is a
6rem disc (96 px) and the Amazon wordmark, wide and short, is the column's 7rem wide (112 × 34 px); the logo cell stretches to the row
and the image is positioned absolutely inside it, centred on the row's height. The cell also sets the row's floor (`min-height: 6rem`),
so a text block shorter than a seal (UCI, three lines ≈ 76 px) grows its row to the disc and is centred on it instead of letting the
disc crowd the hairlines; taller blocks (GT and Amazon, four lines ≈ 97–104 px) centre the mark on themselves. Phones keep a small fixed box
(44 px seals, the wordmark 56 px wide, top-aligned with the title). Dark mode puts a paper-toned disc behind each seal (`--seal-plate:
#DCDAD5`; transparent in light mode and in print — the GT ring's interior is transparent, so its navy vanished on dark paper) and inverts
the black wordmark (`--wordmark-filter: invert(1) hue-rotate(180deg)`, which keeps the smile orange).

`gt.png` and `uci.png` are made from the original logos (`gt-logo.png`, `uci-logo.png`, kept unpublished in `_figures/logos/`): trimmed to the seal's
outer edge, padded square and downsized to 192 px, so both seals render at one diameter. `amazon-logo.svg` is the published wordmark
as is, under its raw file name.

```sh
seal() { magick "$1" -fuzz 2% -trim +repage -gravity center -background none \
  -extent "%[fx:max(w,h)]x%[fx:max(w,h)]" -resize 192x192 -strip "$2"; }
seal _figures/logos/gt-logo.png gt.png;  seal _figures/logos/uci-logo.png uci.png
```

### News marks

Two news items open with the project's own mark instead of an emoji (`icon:` in `_data/news.yml` names a file in `_includes/news-icons/`,
which `_includes/news-list.html` inlines as `<svg class="news__icon" aria-hidden="true">`): `forecast-dojo.svg` is the
Forecast-Dojo site's favicon as is (the orange swirl, 64 × 64 viewBox) and `alphabet.svg` is the AlphaBet site's favicon mark
(the α with the `#9D593F` star, redrawn from its data-URL favicon without the paper tile, viewBox re-centred on the mark). The marks
are inlined rather than linked as images so the α can be stroked in `currentColor`: it follows the text ink in both themes, and the swirl
keeps its own orange, so no tile is needed in dark mode. The box is the emoji's ink box — Apple Color Emoji at the 16 px news size
draws 20 × 20 px, from 1em above the baseline to .25em below — so a mark takes the same room as an emoji and the text after it starts
on the same x; the SVGs keep ~6 % air inside the box. To add one, drop a 1:1 SVG with `class="news__icon" width="20" height="20"
aria-hidden="true" focusable="false"` on its root into the folder and name it in the item's `icon:`.

### Adding photos

Export JPEGs at 2000, 1200 and 640 px on the long edge (plus WebP copies) into
`assets/img/photos/` named `name-2000.jpg`, `name-1200.jpg`, `name-640.jpg`, `name-*.webp`,
then add the photo to a collection in `_data/photos.yml` with its original pixel size (`w`, `h`, used for the srcset widths and the
lightbox). On the page every photo is the same square tile (3 per row, 1 on phones; `object-fit: cover`, centre crop — set `pos: "30% 50%"`
on a photo to move the crop); the lightbox shows the full frame. Collections are headed by the place as "City, ST" (`title`) with only the `date` at the right. A one-liner for all sizes:

```sh
for s in 2000 1200 640; do
  magick in.jpg -auto-orient -resize "${s}x${s}>" -strip -quality 84 "assets/img/photos/name-$s.jpg"
  magick in.jpg -auto-orient -resize "${s}x${s}>" -strip -quality 82 "assets/img/photos/name-$s.webp"
done
```

### Header brand, Chinese name, seal

The header's left side is empty on the home page — the hero already carries the name and the seal — and on every other page it holds a
small `Liqin Ye` in Lusitana (1.125rem, ink, seal-red on hover) as the home link (`_includes/nav.html`, `.brand`). On phones the home page's nav
and theme toggle share one 58 px row (`.site-header--home`, ≤560 px); other pages keep brand + toggle above the nav row. The Chinese marks tried
before are retired but kept for reference, none included anywhere: `_includes/brand-mark-xiaozhuan.svg` (說文小篆), `brand-mark-jinwen.svg`
(金文: 葉 拍敦 · 利 利簋 · 欽 魚顛匕 — oracle-bone script was ruled out, it attests 利 only), `brand-mark.svg` (the 角字 lattice wordmark) and the
王漢宗中隸書 / 霞鷺文楷 text version (3-glyph subsets `hanwang-lisu-name.woff2`, `lxgw-wenkai-tc-name.woff2` with their `@font-face` rules, GPL v2 /
OFL licences in `assets/fonts/`). The owner dropped the 小篆 mark on 2026-10-31 because it repeated the seal's three characters. The seal beside the hero name (`_includes/seal.html`) is the page's one vermilion mark: 葉利欽 carved white-on-red (白文), traced from the
owner's own impression (`~/Desktop/liqinye-icon-candidates/reference-vertical-seal-from-user.png`): `ref/trace_ref.py` in
`~/Desktop/liqinye-icon-candidates/final/seal-vertical/` segments the carved strokes and vectorises the three glyphs, `ref/compose2.py` lays them
into a 400 × 1089 face with the impression's own 1:2.72 proportions, margins, rounded corners and inner hairline (strokes fattened by 6/400 so
the carved lines hold at ~25 px wide; see `SOURCES.md` there, and `ref/compare2.png` for the reference-vs-vector check). The field is
`var(--seal)` and the carved parts `var(--seal-cut)` — the paper colour in light mode, warm ivory `#ECE8DF` in dark — so the seal stays
white-on-red in both themes like the impression. It is shown 1.3em tall (em of the h1 — Lusitana's ascender-to-descender span) and centred on the cap band: `.seal` stands it on the
baseline, clips its margin box to cap height so the h1 keeps its 1.1 line-height, then shifts it down with `position: relative` (details in
the `site.css` comment); it reaches ≈ .29em below the baseline, short of the bio. The favicon (`assets/img/favicon.svg`, `favicon-32.png`,
a heavier-stroked `favicon-16.png` for 1x tabs, `apple-touch-icon.png` — a 164 px disc on the 180 px paper tile so iOS's rounded mask leaves
an even margin) is the round vermilion disc with the 角字 lattice 葉, the first seal design, which the owner prefers as a tab icon over the
traced 小篆 葉 (its files live in `~/Desktop/liqinye-icon-candidates/final/seal-kakuji/`; `seal-vertical/ref/favicon-ref*.svg` keep the 小篆 version).

### Hidden motto

Under the portrait sits the owner's motto, "Focus on Yourself" in Forum (a light Roman display face, 16 px; SIL OFL, `assets/fonts/forum-latin-400.woff2` subset to Latin-1
with `LICENSE-forum.txt`, loaded only where the motto renders; the owner chose it from the numbered board
`~/Desktop/liqinye-icon-candidates/final/motto/motto-choices.png`, see also `motto-font-board.png` and `motto-font-board-2-simple.png`) with a crossed-fingers glyph (`profile.motto` in `_config.yml`; markup in
`index.html`, `.motto` in `site.css`). It is a small easter egg: the text is set in `color: transparent`, so it is invisible against the paper in
both themes and surfaces only when selected (`::selection` paints it ink on the selection tint; on phones a long-press selects it). The glyph is
`_includes/icons/fingers-crossed.svg` — the U+1F91E outline of Noto Emoji's monochrome font (SIL OFL 1.1; extracted with fontTools; sources and licence in `~/Desktop/liqinye-icon-candidates/final/motto/` — a solid
silhouette was tried and rejected), drawn in `currentColor`; since SVG is not selectable text, the last script in
`_includes/footer.html` toggles `.is-selected` on the paragraph whenever the selection touches it, which turns the glyph ink. On desktop the
motto flows under the photo (the column had the room); on phones it is absolutely positioned over the gap between the photo and the name so the
layout does not grow. Screen readers read it as ordinary text; print hides it. Remove `profile.motto` to drop it.

## Run locally

```sh
bundle install
bundle exec jekyll serve --livereload     # http://127.0.0.1:4000
```

## Deploy to GitHub Pages

The repository is built by `.github/workflows/pages.yml` (GitHub's standard Jekyll action).
In the repository settings choose **Pages → Build and deployment → Source: GitHub Actions**.
To replace the current site with this one:

1. In the `liqinye.github.io` repository, delete the al-folio files
   (`_bibliography _books _data _includes _layouts _news _pages _plugins _projects _sass _scripts
   _site assets bin lighthouse_results readme_preview .github/workflows Dockerfile docker-compose*.yml
   package*.json purgecss.config.js requirements.txt .devcontainer .all-contributorsrc .lycheeignore
   .pre-commit-config.yaml .prettier* CONTRIBUTING.md CUSTOMIZE.md FAQ.md INSTALL.md README.md`).
2. Copy everything in this folder (including the hidden `.github` and `.gitignore`) into the repository.
   `google43cd256a8fd6ad8e.html` (Search Console verification) is already included.
3. In the repository settings choose **Pages → Build and deployment → Source: GitHub Actions**.
4. Commit and push to `main`; the first run of the workflow publishes the site. The old `gh-pages`
   branch (if any) can be deleted after the first green deploy.

Old URLs keep working: `/publications/` is a real page again, `/#research` still lands on "Selected Publications",
`/photography/` → `/misc/` (the page is now called Misc; `redirects/photography.html`), and the old al-folio paths that Google may still hold —
`/blog/` → `/`, `/projects/` → `/publications/`, `/books/` → `/misc/`, and `/news/` → `/#news` since the separate News page was dropped on
2026-11-01 — the home section lists the five newest items with a chevron toggle for the rest (`redirects/*.html`, all `noindex` with a canonical to the target); `/cv/` embeds `assets/pdf/liqin-cv.pdf`,
which the viewer's toolbar also opens in a new tab and downloads.

## Things to confirm

- **Publication statuses** follow the October 2026 CV: AlphaBet and Forecast-Dojo "Under review"
  (submitted to ICLR 2027), EvoTD "Under review" (NAACL 2027), PRE-CONTROL preprint. Edit `status`
  in `_data/publications.yml` when decisions arrive; set `status: published` with `venue`/`track`.
- **WCB** uses the NeurIPS 2025 camera-ready title (without "Globally") and author order from
  OpenReview; the arXiv version differs slightly.
- **Reviewer list** (`_data/service.yml`) follows the CV (ICLR 2027, NeurIPS 2026/2024, ARR 2027/2026/2024,
  KDD 2025, Computational Economics). The old site also listed ICLR 2025, ACL 2024 and EMNLP 2024.
- **Teaching**: the site says "MGT 8803 AI in Finance". The GT catalogue lists MGT 8803 as the special-topics
  number students enrol in and MGT 8997 as the teaching-assistantship registration, and Scheller titles the
  course "AI in Finance"; the CV's "MGT 8997" may want correcting. Edit `_data/teaching.yml` if you disagree.
- **News** gained two items (Forecast-Dojo, Sep 24 2026; AlphaBet, Oct 15 2026) that were not on the old site.
- **Chinese name**: 葉利欽 appears only as the seal beside the hero name (the header mark was dropped on 2026-10-31 as a repeat of it); `profile.name_zh` would add the characters beside the hero name.
- **"Dr." honorifics** (added 2026-10-30): you asked for Dr. before Chao Zhang and Sudheer Chava; Stephan Mandt
  got it too so the paragraph is consistent (the old site did the same). Drop it in `_includes/bio.md` if you prefer.
- **Header brand**: a small Lusitana `Liqin Ye` on subpages, nothing on the home page (2026-10-31) — see "Header brand, Chinese name, seal"
  above; the retired Chinese marks and their studies live in `_includes/brand-mark-*.svg` and `~/Desktop/liqinye-icon-candidates/final/brand-mark/`.
- **CV page** (2026-10-31): `/cv/` embeds the owner's own compiled LaTeX CV (October 2026) unchanged; the re-typeset HTML/print
  pipeline tried on 2026-10-30 (`cv-print.html`, `_data/cv.yml`) is gone. The PDF and the site differ in wording in three places —
  research interests "LLM agents, LLM reasoning, LLMs in finance" (site: "LLM forecasting"), "MGT 8997 AI in Finance" (site: MGT 8803,
  see **Teaching** above) and "ICS Honor Student" (site: "ICS Honors Program") — reconcile them in the `.tex` if you like.

## CV

The CV is the owner's own document: `assets/pdf/liqin-cv.pdf` is the compiled LaTeX CV (A4, two pages; the `.tex` lives in the old
repository as `assets/tex/liqin_cv.tex`), served exactly as compiled — nothing on the site re-typesets it.

`/cv/` (`cv.html`) shows it embedded, the way a Drive document embeds: the page head (title, "Last updated") and, under it, a viewer
frame 48 rem wide like the head, 82 vh tall, hairline edge and radius on the paper matte. The frame opens with a slim document toolbar
(`.cv-viewer__bar`, 2.75 rem, on the matte with a hairline under it): left, the file label "Liqin Ye · Curriculum Vitae" with a small
document glyph; right, two quiet icon + label buttons — "Open in new tab" (`target="_blank" rel="noopener"`) and "Download"
(`download="Liqin-Ye-CV.pdf"`) — so the way out of the embedded viewer is part of the viewer itself (the head carries no second
Download button). Below the toolbar an `<object type="application/pdf">` with `#view=FitH&toolbar=0` and an `<iframe>` of the same
file nested as its fallback (both `.cv-viewer__doc`) fill the rest of the frame. On phones (≤ 680 px), where inline PDFs are
unreliable, the viewer gives way to a card: the first page (`assets/pdf/liqin-cv-p1.jpg`) beside the title, with "Open PDF" and
"Download" side by side under them. Printing `/cv/` prints the title and one line pointing at the PDF (`.cv-viewer__print`). Styles:
`assets/css/cv.css`.

To update the CV, compile the LaTeX source, then replace the PDF and remake the first-page image, and set `updated:` in the front
matter of `cv.html` (a date; the page head renders it as "Last updated October 2026"):

```sh
cp path/to/liqin_cv.pdf assets/pdf/liqin-cv.pdf
pdftoppm -r 60 -jpeg -f 1 -l 1 -singlefile assets/pdf/liqin-cv.pdf assets/pdf/liqin-cv-p1   # 497 × 702 for A4
```

If the page size ever changes from A4, also update the `width`/`height` of `.cv-card__page` in `cv.html` and its `aspect-ratio` in `cv.css`.

## Design notes

- Palette "Xuan paper & ink": paper `#FAF8F2`, ink `#1F1D1A`, Tiffany-blue links — the old site's `#0ABAB5` kept as the hue and
  as the underline, the text darkened to `#0B8F8A` (3.7:1) for body links and `#0A857F` (4.2:1) for 13 px Inter links, hover
  `#0A7A75`; dark `#3CC6C0` / `#5FD3CE` with a muted `#2B8683` underline — one vermilion seal `#AE3A30`; warm charcoal dark mode
  (`prefers-color-scheme` + toggle). All text pairs meet WCAG AA except the Tiffany body links (3.7:1 by the owner's choice; 13 px meta links are 4.5:1); paper titles and nav labels stay ink and turn Tiffany only on hover — a deliberate exception to "all links Tiffany" so headings read as headings.   choice; body text exceeds 7:1.
- Type: Newsreader (headings + body, optical sizes), Inter (dates, labels, links), Lusitana 400 for the name and the small `Liqin Ye` header link on subpages; Forum 400 for the hidden motto only.
- Header (≈ 64 px, pinned to the top while scrolling — `position: sticky`, solid paper, `[id]` anchors carry a matching `scroll-margin-top`): a small `Liqin Ye` (Lusitana 18 px, ink; absent on the home page) left, nav (About · Publications · CV · Misc — the current page carries
  a Tiffany bar) and theme toggle right, on one row down to 560 px; below that the nav drops to its
  own row (five labels on one line down to ~350 px).
- Layout: 17 px root on desktop (16 px on phones), so every rem size runs 6 % above browser default; 60 rem shell, 38 rem prose measure, 8 px rhythm, hairline rules, no boxes or badges; sections 3.25 rem apart (2.5 rem on phones), News 2.75 rem under
  the hero (`.hero + .section`), whose profile row overhangs it by 1.5 rem, so the "News" title sits ≈ 44 px (ink to ink) under the glyphs.
- Social icons (`_includes/icons/*.svg`): Google Scholar, GitHub, LinkedIn and X redrawn as a thin-stroke set (stroke 1.7 on a
  24-unit grid, `currentColor`) so they share a hand with the sun/moon toggle; 48 px glyphs (stroke 1.5 at this size) in 64 px round
  hit areas, 4.5 rem apart (1.5 rem at ≤ 680 px, 1 rem at ≤ 390 px, 56 px discs at ≤ 350 px) — the row spans ≈ 78 % of the 38 rem
  measure — centred under the bio and set tight to it (.75 rem above the discs, −1.5 rem below).
  A normalised set of the official filled glyphs is kept in `_includes/icons/alt-official/` — to switch, copy those four files up
  one level. Both sets and an in-context comparison live in `~/Desktop/liqinye-icon-candidates/social-icons/`.
- Share metadata follows the bio: `description` (index front matter + `_config.yml`) and the OG card tagline both read
  "LLM agents · LLM forecasting · LLMs in finance"; the card (`assets/img/og-image.png`) carries the Lusitana name and the seal (1.3em, centred on the cap band; rebuilt with
  `~/Desktop/liqinye-icon-candidates/final/seal-vertical/gen_og2.py OUT.png 1.3`).
- Hero: one CSS grid with named areas (`text`, `notice`, `links` stacked beside `photo`); no eyebrow line above the name. On desktop the text column is exactly the 38 rem measure and the 14 rem portrait sits 2.5 rem after it (anchored to the text rather than the page edge); the portrait's
  top sits on the name's baseline (offset derived from Lusitana's metrics, see the comment in `site.css`; the photo column spans
  both rows, so the portrait may run past the bio beside the icons) and the profile icons form a centred row under the bio; at
  ≤680px the same items restack in one column as photo → name/bio → icons.
- E-mail: the bio ends "Drop me an email at liqiny at gatech dot edu if you would like to chat.", the address a monospace span in Tiffany on the Tiffany chip tint (`.email`, the `--chip-website-*` tokens, derived from `profile.email` in `_config.yml`)
  with no mailto link, so it is readable but not scrapeable.
- Featured cards: the text block is vertically centred on the 3:2 figure; Forecast-Dojo's figure is its replay GIF (see "Figures").
- Publication link rows: icon-only tinted buttons (see "Link buttons"), shared by the home cards (`_includes/project-card.html`) and
  the `/publications/` entries (`_includes/pub-row.html`).
- Experience / Education: the organisation's logo in its own colours in a 7rem left column, at one size for every row (seals 96 px
  discs, the wordmark the column's 7rem width) and centred on the row — a row shorter than a seal grows to it — the text block 9rem
  in, each line's period or place right-aligned in
  a narrow column at the far right (see "Organisation logos"); on phones the column narrows to 3.5rem + .75rem (44 px seals,
  top-aligned with the title), the text stays indented for the whole row and the dates drop under their lines.
- Teaching | Honors + Service (`.cols`): at ≥960px the two columns end on the same line — Service is pushed to the end of the right
  column and Teaching's ledger is a flex column that shares the slack between its rows: the first and last rows take half a share
  and keep their text 1rem in from the ledger's edges (as the Honors and Service rows beside them do), the rows between a full
  share with the text centred, so the ink of both columns starts and ends on the same lines and every hairline is midway between
  the texts around it; below 960px the columns stack at natural height.
- Print: light tokens, header and social row hidden, link buttons as outlined glyphs, the colour logos as they are.

### External links

Every link that leaves the site opens in a new tab: the templates put `target="_blank" rel="noopener"` on their own anchors (publication chips and
titles, the profile icons, the Google Scholar link, the CV actions), and the last script in `_includes/footer.html` adds the same to any other
link whose host is not the site's (the Markdown links in the bio and the news items). Same-host links — nav, section anchors, the lightbox frames —
stay in place.
