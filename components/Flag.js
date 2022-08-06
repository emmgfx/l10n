const Flag = ({ iso, size = 32, ...props }) => {
  return (
    <img
      src={`https://hatscripts.github.io/circle-flags/flags/${iso.toLowerCase()}.svg`}
      width={size}
      height={size}
      alt={`${iso} flag`}
      {...props}
    />
  );
};

export default Flag;
