import React from "react";
import Header from "../components/Header";

import { useSession } from "next-auth/client";
import Dashboard from "../components/Dashboard/Dashboard";
import App_loading from "../components/App_loading";
import { useCookie } from "next-cookie";

export default function Home(props) {
  const [session, loading] = useSession();
  return loading ? (
    <App_loading />
  ) : session ? (
    <Dashboard session={session} conversations={props.conversations} />
  ) : (
    <Header />
  );
}

export async function getServerSideProps(ctx) {
  const cookie = useCookie(ctx);
  const conversations = cookie.get("conversations") || [];
  return {
    props: { conversations }, // will be passed to the page component as props
  };
}
