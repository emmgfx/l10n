import { useState } from "react";
import { toast } from "react-toastify";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

import Button from "../Button";
import Card from "../Card";
import Flag from "../Flag";
import LanguageChip from "../LanguageChip";

const SettingsCurrentLocales = ({ project, refreshData = () => {} }) => {
  const [loading, setLoading] = useState(false);

  const removeLocale = async (locale) => {
    const confirmIntent = () =>
      window.confirm(
        "Are you sure you want to delete this locale? This action is not reversible and all the translations under this locale would be deleted."
      );

    const confirmName = () =>
      locale ===
      window.prompt(
        "To avoid errors, please write the locale iso code to confirm his permanent removal"
      );

    if (!confirmIntent()) return;

    if (!confirmName()) {
      toast.warn("Locale verification failed, please try again");
      return;
    }

    setLoading(true);

    const { data: dataStrings, error: errorStrings } = await supabaseClient
      .from("locales")
      .delete()
      .match({ project: project.id, locale });

    if (errorStrings) {
      toast.error("Error deleting strings");
      return;
    }

    const { data: dataLocales, error: errorLocales } = await supabaseClient
      .from("projects")
      .update({ locales: project.locales.filter((l) => l !== locale) })
      .match({ id: project.id });

    if (errorLocales) {
      toast.error("Error deleting locale");
      return;
    }

    await refreshData();
    setLoading(false);
    toast.success("Locale and his strings removed");
  };

  const setDefault = async (locale) => {
    if (!project.locales.includes(locale)) return;
    setLoading(true);
    const { data, error } = await supabaseClient
      .from("projects")
      .update({ default_locale: locale })
      .match({ id: project.id });

    console.log({ data, error });

    if (error) {
      toast.error("Error updating default locale");
      return;
    }

    await refreshData();
    setLoading(false);
    toast.success("Default locale udpated");
  };

  return (
    <>
      <Card>
        <Card.Header>Available localizations</Card.Header>
        <Card.Body>
          {project?.locales.map((locale) => (
            <div key={locale} className="flex items-center mb-1">
              <LanguageChip iso={locale} />
              <div className="grow" />
              <div className="flex gap-2">
                <Button
                  onClick={() => removeLocale(locale)}
                  disabled={locale === project.default_locale || loading}
                >
                  Remove
                </Button>
                <Button
                  onClick={() => setDefault(locale)}
                  disabled={locale === project.default_locale || loading}
                >
                  Make default
                </Button>
              </div>
            </div>
          ))}
        </Card.Body>
      </Card>
    </>
  );
};

export default SettingsCurrentLocales;
