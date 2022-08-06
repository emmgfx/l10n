import Head from "next/head";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const { user, isLoading } = useUser();
  const { push } = useRouter();

  useEffect(() => {
    if (isLoading) return;
    push(user ? "/projects" : "/login");
  }, [isLoading, user]);
  return (
    <div>
      <Head>
        <title>L10N</title>
        <meta name="description" content="Localize your app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
