import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

import { useUser } from "@supabase/auth-helpers-react";

import Input from "../components/Input";
import Button from "../components/Button";

const Login = ({}) => {
  const { user } = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("emmgfx@gmail.com");
  const [password, setPassword] = useState("123456");

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { user, session, error } = await supabaseClient.auth.signIn({
        email,
        password,
      });
      if (error) throw error;
      // alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-8" />
      <form onSubmit={handleLogin} className="w-96 mx-auto">
        <h1 className="text-xl font-semibold">Sign in</h1>
        <div className="h-2" />
        <label htmlFor="email" className="font-semibold text-sm">
          Email address
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <div className="h-2" />
        <label htmlFor="password" className="font-semibold text-sm">
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <div className="h-4" />
        <div className="text-right">
          <Button disabled={loading}>Sign in</Button>
        </div>
      </form>
    </>
  );
};

export default Login;
