# Replacing photos

Every image on the site is a real file in `public/`. To swap any photo, just
**overwrite the file with the same name** — no code changes needed. Then rebuild
(`npm run build`) or, in dev, the change appears on refresh.

## The 5 "News & Highlights" photos

These were pasted in chat and could not be saved automatically, so each slot
currently holds a real campus stand-in. Drop your exact photo in with the same
filename to replace it:

| Save your photo as…                              | It shows up as        |
| ------------------------------------------------ | --------------------- |
| `public/photos/highlights/assembly.jpg`          | Morning Assembly      |
| `public/photos/highlights/iso-certification.jpg` | ISO Certification     |
| `public/photos/highlights/toppers.jpg`           | Felicitating Toppers  |
| `public/photos/highlights/congratulations.jpg`   | Congratulations march |
| `public/photos/highlights/green-day.jpg`         | Eco & Green Day       |

Tip: keep them roughly landscape (4:3 or 16:9) and under ~1 MB each for speed.

## The admission poster pop-up

The pop-up is a responsive rebuild of the poster (always works). To show the
exact poster image instead, save it as `public/announcement.jpg` and set
`SHOW_POSTER_IMAGE = true` in `src/components/announcement-modal.tsx`.

## Things to confirm before going live

- Official email address (currently a placeholder: `info@newhorizon.edu.np`).
- Exact ISO standard/number and any SEE result figures.
- Social media profile URLs (set them in `src/lib/school.ts` → `social`).
- Principal's name on the About page.
