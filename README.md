# مدرسة مسار الغد للتكوين والتدريب
Static site, FR/AR (Plus Jakarta Sans + Almarai), ready for Vercel. Pages: `index.html` (public), `admin.html` (admin).
1. Supabase: run `supabase.sql` (set YOUR admin e-mail), create that user in Authentication, put URL + anon key in `config.js`.
2. Vercel: import the folder (framework "Other", no build).
3. Without Supabase, the form opens WhatsApp and admin.html shows demo data.
Courses in `common.js` are samples: edit them or use the `courses` table.

## Pages (public)
`index.html` (accueil) · `formations.html` · `acces.html` · `inscription.html` · `contact.html`, plus `admin.html`.
Header/footer menu is shared: edit `layout.js`. Courses: `common.js`. Layout width: `--gx` and `.wrap` in `style.css`.
