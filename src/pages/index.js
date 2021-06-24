import React from "react";
import Header from "../components/Header";

import { useSession } from "next-auth/client";
import Dashboard from "../components/Dashboard/Dashboard";
import App_loading from "../components/App_loading";

export default function Home(props) {
  const [session, loading] = useSession();
  return loading ? (
    <App_loading />
  ) : session ? (
    <Dashboard session={session} />
  ) : (
    <Header />
  );
}
