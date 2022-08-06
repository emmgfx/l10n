import Link from "next/link";
import { useUser } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

import IconTranslate from "../public/images/icons/translate.svg";

const Header = () => {
  const { user } = useUser();

  const logout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) toast.error(error.message);
  };

  return (
    <header className="py-6 px-8 bg-gray-100">
      <div className="container flex gap-8 mx-auto">
        {user ? (
          <>
            <Link href="/projects">
              <a className="flex items-center">
                <IconTranslate className="bg-emerald-500 w-6 h-6 text-white rounded-full p-1" />
                <span className="ml-3">Projects</span>
              </a>
            </Link>
            <Link href="/settings">Settings</Link>
            <div className="grow" />
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/">
              <a className="flex items-center">
                <IconTranslate className="bg-emerald-500 w-6 h-6 text-white rounded-full p-1" />
                <span className="ml-3">L10N</span>
              </a>
            </Link>
            <div className="grow" />
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
