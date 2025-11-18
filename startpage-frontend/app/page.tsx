"use client"
import { Header } from "@/components/header";
import { SearchBox } from "@/components/searchbox";
import { useState, useEffect } from "react";
import { createContext } from "react";
import { useAuth } from "keystone-lib";

export const StartPageContext = createContext({
  isEditing: false,
  setIsEditing: (value: boolean) => {},
  config: {
    searchbox: {
      shortcuts: [],
      color: "#097452"
    }
  },
  usingWork: false,
  setUsingWork: (value: boolean) => {},
  hasWork: false,
  setConfig: (value: any) => {},
  authHook: null as any
})

export default function Home() {
  const authHook = useAuth({appId: process.env.NEXT_PUBLIC_APP_ID!, keystoneUrl: process.env.NEXT_PUBLIC_KEYSTONE_URL!});
  const [isEditing, setIsEditing] = useState(false);
  const [hasWork, setHasWork] = useState(false);
  useEffect(() => {
    if (authHook.data?.tenant) {
      setHasWork(true);
    }
  }, [authHook.data]);
  const [config, setConfig] = useState({
    searchbox: {
      shortcuts: [
        {
          name: "Google",
          url: "https://www.google.com",
          icon: "https://www.google.com/favicon.ico"
        },
        {
          name: "YouTube",
          url: "https://www.youtube.com",
          icon: "https://www.youtube.com/favicon.ico"
        }
      ],
      color: "#097452"
    }
  });
  const [usingWork, setUsingWork] = useState(false);
  return (
    <StartPageContext.Provider value={{ isEditing, setIsEditing, config, setConfig, usingWork, setUsingWork, hasWork, authHook: usingWork ? authHook : null }}>
      <div>
        <Header />
        <SearchBox />
      </div>
    </StartPageContext.Provider>
  );
}
