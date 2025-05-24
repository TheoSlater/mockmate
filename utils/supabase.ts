import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dfyuhjbnghtcnowlzobe.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmeXVoamJuZ2h0Y25vd2x6b2JlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMzkzMzMsImV4cCI6MjA2MjkxNTMzM30.GfArefY-ZoNdFte3SWCXNLSE_EvFdwj6zISzzlnv2zc";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: "pkce",
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  },
});
