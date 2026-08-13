# Zimlinx AI setup

The frontend uses Supabase Anonymous Auth and calls the `zimlinx-ai` Edge Function. The OpenAI API key is server-side only and must never be placed in `assets/js` or HTML.

## 1. Enable anonymous sign-ins
In Supabase Dashboard: Authentication → Providers → Anonymous Sign-Ins → enable it.

## 2. Deploy the Edge Function
From a local clone with Supabase CLI linked to project `ftpywqwlxtrwncuwcokb`, deploy `supabase/functions/zimlinx-ai`.

## 3. Add server secrets
Set these Edge Function secrets:
- `OPENAI_API_KEY` = your OpenAI API key
- `OPENAI_MODEL` = a model enabled for your API project (optional; defaults to `gpt-5-mini`)

Never put `OPENAI_API_KEY` in the browser or GitHub repository.

## 4. Test
Open the site, choose one of the example questions, then click `Tanya Zimlinx`. The browser creates an anonymous Supabase session and invokes the Edge Function. The Edge Function calls OpenAI and returns only the generated answer to the browser.
