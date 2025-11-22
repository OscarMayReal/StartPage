"use client"
import { Header } from "@/components/header";
import { SearchBox } from "@/components/searchbox";
import { useState, useEffect, useRef, useContext } from "react";
import { createContext } from "react";
import { useAuth } from "keystone-lib";
import { AskChatGPTCard, CalculatorCard, CardBase, CardInfo, ClockCard, DictionaryCard, FacebookCard, HackclubSiegeLeaderboardCard, RandomcatImageCard, WeatherCard, WidgetInfo, WidgetType } from "@/components/cards";
import { createSwapy, Swapy } from 'swapy'
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { Button } from "@/components/ui/button";
import "@/node_modules/react-grid-layout/css/styles.css"
import "@/node_modules/react-resizable/css/styles.css"
import GridLayout, { Responsive } from "react-grid-layout";
import { useWindowSize } from "@/lib/screensize";
import { CalculatorIcon, CloudIcon, FacebookIcon, ListIcon, PlusIcon, SearchIcon, SettingsIcon, SparkleIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type ShortcutType = {
  id: string;
  name: string;
  url: string;
  icon: string;
}

type WidgetConfigType = {
  id: string;
  position: { x: number, y: number, w: number, h: number };
  component: {
    type: WidgetType;
    config: any;
  };
}

type configType = {
  searchbox: {
    shortcuts: ShortcutType[],
    color: string
  },
  columns: number,
  widgets: WidgetConfigType[]
}

export const StartPageContext = createContext({
  isEditing: false,
  setIsEditing: (value: boolean) => { },
  config: {
    searchbox: {
      shortcuts: [],
      color: "#097452"
    },
    columns: 3,
    widgets: [
      {
        id: new Date().toISOString() + "_ranid_" + Math.floor(Math.random() * 1000000),
        position: { x: 0, y: 0, w: 1, h: 6 },
        component: {
          type: "facebook",
          config: {
            profileName: "LinusTech"
          }
        }
      },
      {
        id: new Date().toISOString() + "_ranid_" + Math.floor(Math.random() * 1000000),
        position: { x: 1, y: 0, w: 1, h: 6 },
        component: {
          type: "weather",
          config: {
            location: "london"
          }
        }
      }
    ]
  } as configType,
  usingWork: false,
  setUsingWork: (value: boolean) => { },
  hasWork: false,
  setConfig: (value: any) => { },
  authHook: null as any,
})

function addWidget({ widgetInfo }: { widgetInfo: WidgetInfo }, config: any, setConfig: (value: any) => void) {
  const newItem = {
    id: new Date().toISOString() + "_ranid_" + Math.floor(Math.random() * 1000000),
    position: { x: 0, y: 0, w: 1, h: 6 },
    component: {
      type: widgetInfo.type,
      config: Object.fromEntries(Object.entries(widgetInfo.configOptions).map(([key, value]) => [key, value.defaultValue]))
    }
  }
  setConfig({
    ...config,
    widgets: [
      ...config.widgets,
      newItem
    ]
  })
}

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
    columns: 3,
    widgets: [
      {
        id: "facebook_1",
        position: { i: "facebook_1", x: 0, y: 0, w: 1, h: 6 },
        component: {
          type: "facebook",
          config: {
            profileName: "LinusTech"
          }
        }
      },
      {
        id: "weather_1",
        position: { i: "weather_1", x: 1, y: 0, w: 1, h: 6 },
        component: {
          type: "weather",
          config: {
            location: "london"
          }
        }
      }
    ]
  });
  useEffect(() => {
    window.localStorage.setItem("config", JSON.stringify(config));
    console.log(config);
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
        <AnimatePresence>
          {isEditing && <motion.div initial={{ height: 0, margin: 0, width: "calc(100% - 0px)", opacity: 0 }} animate={{ height: "auto", margin: "20px", width: "calc(100% - 40px)", opacity: 1 }} exit={{ height: 0, margin: 0, width: "calc(100% - 0px)", opacity: 0 }} transition={{ duration: 0.2 }} className="flex items-center justify-between w-full">
            <div className="text-2xl">Widgets</div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline"><PlusIcon />Add Widget</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {Object.entries(CardInfo).map(([key, value]) => (
                  <DropdownMenuItem key={key} onClick={() => addWidget({ widgetInfo: value }, config, setConfig)}><value.icon />{value.name}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>}
        </AnimatePresence>
        <GridLayout
          cols={config.columns}
          allowOverlap={false}
          className="layout"
          rowHeight={50}
          width={screenSize.width}
          draggableHandle=".card-title"
          isDraggable={isEditing}
          isResizable={isEditing}
          draggableCancel=".card-title-nodrag"
          onLayoutChange={(layout: any) => {
            setConfig({
              ...config,
              widgets: config.widgets.map((widget: any) => {
                return {
                  ...widget,
                  position: layout.find((l: any) => l.i === widget.id)
                }
              })
            })
          }}
        >
          {config.widgets.map((widget: WidgetConfigType) => (
            <div key={widget.id} data-grid={widget.position}>
              <CardBase id={widget.id} globalConfig={config} setGlobalConfig={setConfig} content={CardInfo[widget.component.type].createComponent(widget.component.config, setConfig)} name={CardInfo[widget.component.type].name} />
            </div>
          ))}
        </GridLayout>
      </div>
    </StartPageContext.Provider>
  );
}