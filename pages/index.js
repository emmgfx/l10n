import Head from "next/head";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useRouter } from "next/router";

import PageContainer from "../components/PageContainer";

export default function Home() {
  const { user, isLoading } = useUser();
  const { push } = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (user) push("/projects");
  }, [isLoading, user]);
  return (
    <div>
      <Head>
        <title>L10N</title>
        <meta name="description" content="Localize your app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>
        <div className="text-center font-extrabold text-6xl lg:text-8xl h-full">
          This unnamed project helps you with your project locales
        </div>
      </PageContainer>
    </div>
  );
}
