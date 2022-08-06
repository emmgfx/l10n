import LanguageChip from "./LanguageChip";

const LanguageChipList = ({ isos = [] }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {isos.map((iso, index) => (
        <LanguageChip key={iso} iso={iso} />
      ))}
    </div>
  );
};

export default LanguageChipList;
