"use server";
import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

export const sessionData = async () => {
  const session = await getSession ();
  return session
};
