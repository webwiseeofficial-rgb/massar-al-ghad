# مدرسة مسار الغد للتكوين والتدريب
Static site (FR/AR, Almarai), ready for Vercel.
1. Supabase: create a project, run `supabase.sql`, put URL + anon key in `config.js`.
2. Vercel: import the folder (no build step, framework "Other") or `vercel --prod`.
3. Without Supabase configured, the form opens WhatsApp with the request.
Courses/durations in `app.js` are samples: edit them or manage them in the `courses` table.
