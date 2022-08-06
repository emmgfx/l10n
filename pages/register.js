import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

const Register = ({}) => {
  const { user } = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("emmgfx@gmail.com");
  const [password, setPassword] = useState("123456");

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { user, session, error } = await supabaseClient.auth.signUp({
        email,
        password,
      });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={loading}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={loading}
      />
      <button disabled={loading}>Create account</button>
    </form>
  );
};

export default Register;
