"use client"
import { Header } from "@/components/header";
import { SearchBox } from "@/components/searchbox";
import { useState, useEffect, useRef, useContext } from "react";
import { createContext } from "react";
import { useAuth } from "keystone-lib";
import { CalculatorCard, CardBase, FacebookCard } from "@/components/cards";
import { createSwapy, Swapy } from 'swapy'
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { Button } from "@/components/ui/button";

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
  const swapy = useRef<Swapy | null>(null)
  const [slotItemMap, setSlotItemMap] = useState<Record<string, string | null>>({});

  useEffect(() => {
    if (swappyAreaRef.current) {
      swapy.current = createSwapy(swappyAreaRef.current, {
        animation: 'dynamic',
      })

      // Listen for swap events and update the map
      swapy.current.onSwap((event) => {
        // Update the slot item map based on the swap event
        setSlotItemMap(event.newSlotItemMap.asObject);
      })
    }
    return () => {
      swapy.current?.destroy()
    }
  }, [swappyAreaRef, config.columns])
  return (
    <StartPageContext.Provider value={{ isEditing, setIsEditing, config, setConfig, usingWork, setUsingWork, hasWork, authHook: usingWork ? authHook : null }}>
      <div>
        <Header />
        <SearchBox />
        {/* <FacebookCard profileName="LinusTech"/> */}
        {/* <CalculatorCard /> */}
        <div className="flex flex-row w-full gap-3 px-3" ref={swappyAreaRef}>
          {Array.from({ length: config.columns }).map((_, index) => (
            <Column index={index} key={index} swapy={swapy} />
          ))}
          <div data-swapy-slot="add-column">
            <div data-swapy-item="calc1">
              <CardBase name="Calculator" content={<CalculatorCard />} />
            </div>
          </div>
        </div>
      </div>
    </StartPageContext.Provider>
  );
}

function Column({ index, swapy }: { index: number, swapy: React.RefObject<Swapy | null> }) {
  const { isEditing } = useContext(StartPageContext);
  return (
    <div className="flex-1">
      <AnimatePresence>
        {isEditing ? <motion.div key={"column_" + index + "_title"} initial={{ opacity: 0, height: 0, margin: 0 }} animate={{ opacity: 1, height: "auto", margin: 10 }} exit={{ opacity: 0, height: 0, margin: 0 }} style={{ textAlign: "center" }}>
          Column {index}
        </motion.div> : null}
        {/* <CardBase index={index} /> */}
        {Array.from({ length: 5 }).map((_, index2) => (
          <div key={index2}>
            <div>Slot {index2}</div>
            <div style={{ minHeight: 100 }} data-swapy-slot={"column_" + index + "_" + index2}>

            </div>
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}