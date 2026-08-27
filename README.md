# Farsio - فارسیو

**یار فارسی‌زبان**

Official website for the Farsio product family.

## Products

### NeveshtYar · نوشت‌یار
**NeveshtYar · نوشت‌یار by Farsio**

Persian & English writing assistant, keyboard-layout recovery and Finglish correction.

**بنویس، درست و روان**

Repository: https://github.com/FarsioIR/NeveshtYar

### AvaYar · آوایار
**Persian Reading & Listening Assistant by Farsio**

Persian-first web reading, translation and text-to-speech experience.

**بشنو، به فارسی**

Repository: https://github.com/FarsioIR/AvaYar

## Website

- Persian: https://farsio.ir/fa
- English: https://farsio.ir/en
- Languages: Persian / RTL and English
- Deployment: Cloudflare Pages
- Canonical domain: https://farsio.ir

## Product routes

- `/:lang/products/neveshtyar`
- `/:lang/products/ava`

The AvaYar route intentionally remains `/products/ava` for URL stability while the displayed product brand is AvaYar.

## Stack

- React 19
- Vite 8
- TypeScript 6
- Tailwind CSS 4
- React Router 7
- Iconify

## Development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `dist`

## Organization

GitHub: https://github.com/FarsioIR