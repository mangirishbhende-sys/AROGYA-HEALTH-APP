// Arogya Saathi cloud settings.
// These two keys are "publishable" keys: they are designed to be public and are safe to put here.
// Never put a Clerk SECRET key (sk_...) or a Supabase SECRET / service_role key in this file.
window.SAATHI_CONFIG = {
  // Clerk → Configure → API keys → "Publishable key" (starts with pk_test_ or pk_live_)
  clerkPublishableKey: "",

  // Supabase project URL (already filled in)
  supabaseUrl: "https://eblcxbuiocvnjtxkrcvh.supabase.co",

  // Supabase → Project Settings → API Keys → "Publishable key" (starts with sb_publishable_)
  supabaseKey: ""
};
