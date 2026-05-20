# Hatch Sleep Clock — onboarding prototype

Interactive HSC D0 onboarding prototype (Vite + React).

## Local preview

```bash
npm install
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) — defaults to the HSC flow.

- Full flow: `/?p=hsc`
- Deep link: `/?p=hsc&step=wakeContent`
- Legacy: `/?p=night` or `/?p=new`

## Audio

Drop preview MP3s in `public/audio/wake/` and `public/audio/ease/` (see `src/hsc/contentManifest.ts` for filenames). Play icon previews; row tap selects.

## Deploy (Vercel)

Connect this repo in [Vercel](https://vercel.com): Framework **Vite**, build `npm run build`, output `dist`.

Production URL: `https://<project>.vercel.app/?p=hsc`
