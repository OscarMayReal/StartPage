"use client"
import { Header } from "@/components/header";
import { SearchBox } from "@/components/searchbox";
import { useState, useEffect, useRef, useContext } from "react";
import { createContext } from "react";
import { useAuth } from "keystone-lib";
import { CalculatorCard, CardBase, ClockCard, FacebookCard, HackclubSiegeLeaderboardCard, WeatherCard } from "@/components/cards";
import { createSwapy, Swapy } from 'swapy'
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { Button } from "@/components/ui/button";
import "@/node_modules/react-grid-layout/css/styles.css"
import "@/node_modules/react-resizable/css/styles.css"
import GridLayout, { Responsive } from "react-grid-layout";
import { useWindowSize } from "@/lib/screensize";

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
  const screenSize = useWindowSize();
  return (
    <StartPageContext.Provider value={{ isEditing, setIsEditing, config, setConfig, usingWork, setUsingWork, hasWork, authHook: usingWork ? authHook : null }}>
      <div>
        <Header />
        <SearchBox />
        {/* <FacebookCard profileName="LinusTech"/> */}
        {/* <CalculatorCard /> */}
        <GridLayout
          cols={config.columns}
          allowOverlap={false}
          className="layout"
          rowHeight={50}
          width={screenSize.width}
          draggableHandle=".card-title"
          isDraggable={isEditing}
          isResizable={isEditing}
        >
          <div key={"a"} data-grid={{ x: 0, y: 0, w: 1, h: 6, minH: 6, maxH: 6 }}>
            <CardBase content={<CalculatorCard />} name="Calc 1" />
          </div>
          <div key={"b"} data-grid={{ x: 1, y: 0, w: 1, h: 6 }}>
            <CardBase content={<FacebookCard profileName="LinusTech" />} name="LinusTech on Facebook" />
          </div>
          <div key={"c"} data-grid={{ x: 2, y: 0, w: 1, h: 6 }}>
            <CardBase content={<WeatherCard location="london" />} name="Weather in London" />
          </div>
          <div key={"d"} data-grid={{ x: 3, y: 0, w: 1, h: 3 }}>
            <CardBase content={<ClockCard />} name="Clock" />
          </div>
          <div key={"e"} data-grid={{ x: 4, y: 0, w: 1, h: 6 }}>
            <CardBase content={<HackclubSiegeLeaderboardCard />} name="Hackclub Siege Leaderboard" />
          </div>
        </GridLayout>
      </div>
    </StartPageContext.Provider>
  );
}