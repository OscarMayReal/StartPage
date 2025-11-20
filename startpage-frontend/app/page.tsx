"use client"
import { Header } from "@/components/header";
import { SearchBox } from "@/components/searchbox";
import { useState, useEffect, useRef } from "react";
import { createContext } from "react";
import { useAuth } from "keystone-lib";
import { CalculatorCard, FacebookCard } from "@/components/cards";
import { createSwapy } from 'swapy'

export const StartPageContext = createContext({
  isEditing: false,
  setIsEditing: (value: boolean) => { },
  config: {
    searchbox: {
      shortcuts: [],
      color: "#097452"
    },
    columns: 3
  },
  usingWork: false,
  setUsingWork: (value: boolean) => { },
  hasWork: false,
  setConfig: (value: any) => { },
  authHook: null as any,
})

export default function Home() {
  const swappyAreaRef = useRef<HTMLDivElement>(null)
  const [swapy, setSwapy] = useState(null)
  useEffect(() => {
    var s = createSwapy(swappyAreaRef.current)
    setSwapy(s)
  }, [swappyAreaRef])
  const authHook = useAuth({ appId: process.env.NEXT_PUBLIC_APP_ID!, keystoneUrl: process.env.NEXT_PUBLIC_KEYSTONE_URL! });
  const [isEditing, setIsEditing] = useState(false);
  const [hasWork, setHasWork] = useState(false);
  useEffect(() => {
    if (authHook.data?.tenant) {
      setHasWork(true);
    }
  }, [authHook.data]);
  const [config, setConfig] = useState(JSON.parse(window?.localStorage.getItem("config") || null) || {
    searchbox: {
      shortcuts: [
        {
          id: new Date().toISOString() + "_ranid_" + Math.floor(Math.random() * 1000000),
          name: "Google",
          url: "https://www.google.com",
          icon: "https://www.google.com/favicon.ico"
        },
        {
          id: new Date().toISOString() + "_ranid_" + Math.floor(Math.random() * 1000000),
          name: "YouTube",
          url: "https://www.youtube.com",
          icon: "https://www.youtube.com/favicon.ico"
        }
      ],
      color: "#097452"
    },
    columns: 3
  });
  useEffect(() => {
    window.localStorage.setItem("config", JSON.stringify(config));
  }, [config]);
  const [usingWork, setUsingWork] = useState(false);
  return (
    <StartPageContext.Provider value={{ isEditing, setIsEditing, config, setConfig, usingWork, setUsingWork, hasWork, authHook: usingWork ? authHook : null }}>
      <div>
        <Header />
        <SearchBox />
        {/* <FacebookCard profileName="LinusTech"/> */}
        {/* <CalculatorCard /> */}
        <div className="flex flex-row w-full" ref={swappyAreaRef}>
          {Array.from({ length: config.columns }).map((_, index) => (
            <div key={index} className="flex-1">
              <div data-swapy-slot={"column_" + index}>
                Column {index}
                <div data-swapy-item={"column_" + index}>
                  test item {index}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StartPageContext.Provider>
  );
}
