const Settings = () => {
  return (
    <div className="py-6 px-8">
      <div className="container mx-auto">
        <section className="">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl text-gray-800">
              Account settings
            </h1>
          </div>
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
        </section>
      </div>
    </div>
  );
};

export default Settings;
