import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import Button from "../Button";
import Card from "../Card";
import {
  getLanguage,
  getLanguageNativeName,
  isValidLanguage,
} from "../../utils/languages";

const SettingsNewLocale = ({ project, refreshData = () => {} }) => {
  const [loading, setLoading] = useState(false);
  const [newLocale, setNewLocale] = useState("");
  const [newLocaleName, setNewLocaleName] = useState("");

  useEffect(() => {
    setNewLocaleName(getLanguageNativeName(newLocale));
  }, [newLocale, setNewLocaleName]);

  const addLocale = async (e) => {
    e.preventDefault();

    if (project.locales.includes(newLocale)) {
      toast.warn(`${project.name} already contains ${newLocale} locale`);
      return;
    }

    setLoading(true);

    const { data, error } = await supabaseClient
      .from("projects")
      .update({ locales: [...project.locales, newLocale] })
      .match({ id: project.id });

    if (error) {
      toast.error(error.message);
    } else {
      await refreshData();
      toast.success("Locale added");
      setNewLocale("");
    }

    setLoading(false);
  };

  const validNewLocale = isValidLanguage(newLocale);

  return (
    <>
      <Card>
        <Card.Header>Create new locale</Card.Header>
        <Card.Body>
          <form onSubmit={addLocale}>
            <div className="flex items-center gap-4 justify-between">
              <label htmlFor="name" className="w-1/3">
                New locale ISO
              </label>
              <input
                id="name"
                type="text"
                value={newLocale}
                onChange={(e) => setNewLocale(e.target.value)}
                placeholder="New locale ISO code (es, es-ES, es-MX, ca, ...)"
                disabled={loading}
                className="
                    mt-1
                    block
                    w-full
                    rounded
                    border-gray-300
                    shadow-sm
                    focus:border-emerald-300 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
              />
            </div>
            <div className="h-3" />
            <div className="text-right">
              <Button disabled={loading || !validNewLocale} type="submit">
                Create {newLocaleName ? `${newLocaleName} (${newLocale})` : ""}
              </Button>
            </div>
          </form>
        </Card.Body>
      </Card>
    </>
  );
};

export default SettingsNewLocale;
