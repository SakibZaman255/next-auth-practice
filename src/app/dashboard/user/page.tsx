'use client';

import { useSession, signOut } from "next-auth/react";
import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
    };
  }
}

export default function UserDashboard() {
  const { data: session } = useSession();

  if (session?.user?.role !== "user") {
    return <p>Access Denied</p>;
  }

  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Welcome, {session.user.email}</p>
    </div>
  );
}
