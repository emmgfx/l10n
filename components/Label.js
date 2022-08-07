const Label = ({ children, ...props }) => {
  return (
    <label className="font-semibold text-sm" {...props}>
      {children}
    </label>
  );
};

export default Label;
