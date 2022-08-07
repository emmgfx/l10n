import PageContainer from "../components/PageContainer";
import PageHeading from "../components/PageHeading";

const Settings = () => {
  return (
    <PageContainer>
      <PageHeading title="Account settings" />
      <div className="h-6" />
      <div className="max-w-lg w-full h-0 pb-96 relative mx-auto">
        <iframe
          src="https://giphy.com/embed/dWa2rUaiahx1FB3jor"
          width="100%"
          height="100%"
          className="absolute"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <p className="text-center">
        <a href="https://giphy.com/gifs/wiesemann1893-transparent-logo-wiesemann-dWa2rUaiahx1FB3jor">
          via GIPHY
        </a>
      </p>
    </PageContainer>
  );
};

export default Settings;
