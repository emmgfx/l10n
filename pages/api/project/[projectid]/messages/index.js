import { supabaseClient } from "@supabase/auth-helpers-nextjs";

export default async function handler(req, res) {
  const { data, error } = await supabaseClient
    .from("project_locales_secret")
    .select(`locale`)
    .eq("project", req.query.projectid)
    .eq("secret_key", req.query.secret)
    .order("locale", { ascending: true });

  console.log({ data, error });

  if (data.length === 0) {
    res.status(403);
    res.json({ error: "Project or secret key are invalid or empty" });
    return;
  }

  res.json(data.map((entry) => entry.locale));
}

// (EXISTS ( SELECT 1
//    FROM projects
//   WHERE ((projects.secret_key = secret_key) AND (projects.id = locales.project))))
