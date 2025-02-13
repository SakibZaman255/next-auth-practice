'use client';

import { useSession } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session } = useSession();

  if (session?.user?.role !== "admin") {
    return <p>Access Denied</p>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {session.user.email}</p>
    </div>
  );
}
