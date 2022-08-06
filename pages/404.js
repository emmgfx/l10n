import Head from "next/head";

const NotFound = () => {
  return (
    <>
      <Head>
        <title>Ups</title>
      </Head>
      <div className="container mx-auto p-6 flex items-center justify-center flex-col h-full">
        <h1 className="text-2xl font-bold mb-3">404</h1>
        <p>Page not found</p>
      </div>
    </>
  );
};

export default NotFound;
