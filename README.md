# مدرسة مسار الغد للتكوين والتدريب
Static site, FR/AR (Plus Jakarta Sans + Almarai), ready for Vercel. Pages: `index.html` (public), `admin.html` (admin).
1. Supabase: run `supabase.sql` (set YOUR admin e-mail), create that user in Authentication, put URL + anon key in `config.js`.
2. Vercel: import the folder (framework "Other", no build).
3. Without Supabase, the form opens WhatsApp and admin.html shows demo data.
Courses in `common.js` are samples: edit them or use the `courses` table.

## Pages (public)
`index.html` (accueil) · `apropos.html` · `formations.html` · `acces.html` · `inscription.html` · `contact.html`, plus `admin.html`.
Header/footer menu is shared: edit `layout.js`. Courses: `common.js`. Layout width: `--gx` and `.wrap` in `style.css`.

## Admin (admin.html)
Full-screen dashboard (`admin.html`, `admin.css`, `admin.js`): dashboard, registrations (search, status filter, course filter, CSV export, call/WhatsApp, delete), courses.
Courses can be added, edited, hidden or deleted from the Formations tab (image upload goes to the `course-images` Storage bucket). Works with Supabase (login + live updates) or in demo mode when `config.js` is empty. Run `supabase.sql` once (set your admin e-mail on line 6): it works on a new or an existing project and can be re-run safely. On first use, click "Importer les formations d'exemple" in the Formations tab.
