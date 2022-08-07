const PageContainer = ({ children }) => {
  return (
    <div className="py-6 px-8">
      <div className="container mx-auto">{children}</div>
    </div>
  );
};

export default PageContainer;
