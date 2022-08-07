const PageHeading = ({ title = "", children }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="font-bold text-2xl text-gray-800">{title}</h1>
      {children && <div>{children}</div>}
    </div>
  );
};

export default PageHeading;
