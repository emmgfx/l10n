import languages from "../const/languages";
import { trimRight } from "./trimRight";

export default function findLanguage(lang) {
  return (
    languages.find((l) => l.ids.locale.toLowerCase() === lang.toLowerCase()) ??
    languages.find((l) => l.ids.ISO_639_1 === lang.toLowerCase()) ??
    languages.find((l) => l.ids.ISO_639_2 === lang.toLowerCase()) ??
    languages.find((l) => l.ids.ISO_639_3 === lang.toLowerCase()) ??
    languages.find((l) =>
      l.ids.locale.toLowerCase().includes(lang.toLowerCase())
    ) ??
    languages.find((l) => l.name.toLowerCase() === lang.toLowerCase()) ??
    languages.find((l) => l.name.toLowerCase().includes(lang.toLowerCase()))
  );
}

export const getLanguage = (iso) => {
  if (iso !== trimRight(iso, "-")) return null;
  const [language, country] = iso.trimEnd("-").split("-");

  if (country) return languages.find((l) => l.ids.locale === iso) || null;
  return (
    languages.find((l) => {
      return (
        (l.countryCode === language && l.ids.ISO_639_1 === language) ||
        l.ids.ISO_639_1 === language
      );
    }) || null
  );
};

export const getLanguageNativeName = (iso) => {
  return getLanguage(iso)?.nativeName || null;
};

export const isValidLanguage = (language) => getLanguage(language) !== null;
