import { getLanguageNativeName } from "../utils/languages";

const LanguageChip = ({ iso, arbitray, size = 32 }) => {
  return (
    <div
      className="bg-slate-600 drop-shadow-md p-1 px-3 rounded-full h-7 flex items-center justify-center text-sm
    font-bold text-white"
    >
      {arbitray || getLanguageNativeName(iso) || "Unknown"}
    </div>
  );
};

export default LanguageChip;
