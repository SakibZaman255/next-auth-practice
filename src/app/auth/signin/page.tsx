  'use client';

  import { signIn } from "next-auth/react";
  import { useState } from "react";
  import { useRouter } from 'next/navigation';

  export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [error, setError] = useState("");

    interface SignInResponse {
      error?: string | null;
      user?: {
        role: string;
      };
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      const res: SignInResponse | undefined = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
    
      console.log("SignIn response:", res);  // Log the full response
    
      if (res?.error) {
        console.log(res);  // Log error if any
        setError("Invalid email or password");
      } else {
        const response = await fetch("/api/auth/session");
        const session = await response.json();

        if (session?.user?.role === "admin") {
          router.push("/dashboard/admin"); // Redirect admin users
        } else if (session?.user?.role === "user") {
          router.push("/dashboard/user"); // Redirect standard users
        } else {
          router.push("/auth/signin"); // Default fallback route
        }
      }
    };
    

    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    );
  }
