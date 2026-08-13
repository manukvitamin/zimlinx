import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  try {
    const { question } = await req.json();
    if (typeof question !== "string" || question.trim().length < 5 || question.length > 2000) {
      return new Response(JSON.stringify({ error: "Invalid question" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const apiKey = Deno.env.get("OPENAI_API_KEY");
    if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");

    const model = Deno.env.get("OPENAI_MODEL") || "gpt-5-mini";
    const prompt = `You are Zimlinx, a practical decision assistant. The user is asking: ${question.trim()}\n\nTurn the problem into a useful decision. Respond in Indonesian unless the user clearly asks in another language. Be concise but practical. Structure the answer as:\n1. Inti masalah\n2. Pilihan terbaik\n3. Pilihan alternatif\n4. Langkah berikutnya\nState assumptions when needed. Do not pretend to know current prices, laws, medical facts, or other time-sensitive facts unless supplied by the user.`;

    const aiResponse = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
      body: JSON.stringify({ model, input: prompt, max_output_tokens: 900 }),
    });

    const data = await aiResponse.json();
    if (!aiResponse.ok) {
      console.error("OpenAI error", data);
      throw new Error("AI request failed");
    }

    const answer = data.output_text || (data.output || [])
      .flatMap((item: any) => item.content || [])
      .map((part: any) => part.text || "")
      .join("\n")
      .trim();

    if (!answer) throw new Error("Empty AI response");

    return new Response(JSON.stringify({ answer }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Unable to process request" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
