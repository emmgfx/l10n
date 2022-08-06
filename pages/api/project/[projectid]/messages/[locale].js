import { supabaseClient } from "@supabase/auth-helpers-nextjs";

export default async function handler(req, res) {
  const { data, error } = await supabaseClient
    .from("locales_locale_secret")
    .select(`key,value`)
    .eq("project", req.query.projectid)
    .eq("locale", req.query.locale)
    .eq("secret_key", req.query.secret)
    .order("key", { ascending: true });

  // console.log({ data, error });

  if (data.length === 0) {
    res.status(403);
    res.json({ error: "Project, secret key or locale are invalid or empty" });
    return;
  }

  res.json(Object.fromEntries(data.map((item) => [item.key, item.value])));
}

// (EXISTS ( SELECT 1
//    FROM projects
//   WHERE ((projects.secret_key = secret_key) AND (projects.id = locales.project))))
