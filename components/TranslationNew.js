import { useState } from "react";
import { toast } from "react-toastify";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

import Button from "./Button";

import Flag from "./Flag";

const TranslationNew = ({ project, onAdded }) => {
  const [key, setKey] = useState("keeeey");
  const [translations, setTranslations] = useState(
    project.locales.map((locale) => ({
      locale: locale,
      value: locale,
    }))
  );

  const submit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabaseClient
      .from("locales")
      // .insert([{ key: key, project: project.id }]);
      .insert(
        translations.map((translation) => ({
          key: key,
          project: project.id,
          locale: translation.locale,
          value: translation.value,
        }))
      );
    console.log({ data, error });
    if (error) toast.error(error.message);
    if (!error) onAdded();
  };

  return (
    <form onSubmit={submit}>
      <label htmlFor="key">Key (required, unique)</label>
      <input
        id="key"
        type="text"
        placeholder="kebab-case-identifier"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />

      <ul className="grid grid-cols-5">
        {project.locales.map((iso) => {
          const required = iso === project.default_locale;
          return (
            <li key={iso}>
              <label htmlFor={iso} className="flex items-center font-mono">
                <Flag iso={iso} size={18} className="grow-0 shrink-0" />
                {iso}
                {required ? "*" : ""}:
              </label>
              <input
                id={iso}
                type="text"
                required={required}
                value={translations.find((t) => t.locale === iso).value}
                onChange={(e) =>
                  setTranslations((current) => [
                    ...current.filter((t) => t.locale !== iso),
                    { locale: iso, value: e.target.value },
                  ])
                }
              />
            </li>
          );
        })}
      </ul>
      <Button>Submit</Button>
    </form>
  );
};

export default TranslationNew;
