"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import PathWidget from "./components/navigation";


const ClientWrapper = ({ children }: { children: React.ReactNode }) => {

  return (
    <SessionProvider>
      <PathWidget/>
      {children}
    </SessionProvider>
  );
};

export default ClientWrapper;
