import { useEffect } from "react";
import { Slide, ToastContainer } from "react-toastify";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

import { ModalProvider } from "../contexts/modal";

import Header from "../components/header";

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const { push } = useRouter();

  useEffect(() => {
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event) => {
        if (event === "SIGNED_OUT") push("/");
      }
    );

    return () => authListener?.unsubscribe();
  }, [push]);

  return (
    <UserProvider supabaseClient={supabaseClient}>
      <ModalProvider>
        <ToastContainer
          pauseOnFocusLoss={false}
          transition={Slide}
          autoClose={2000}
        />
        <Header />
        <Component {...pageProps} />
      </ModalProvider>
    </UserProvider>
  );
}

export default MyApp;
