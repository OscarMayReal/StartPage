"use client"
import { Header } from "@/components/header";
import { SearchBox } from "@/components/searchbox";
import { useState } from "react";
import { createContext } from "react";

export const StartPageContext = createContext({
  isEditing: false,
  setIsEditing: (value: boolean) => {},
  config: {
    searchbox: {
      shortcuts: [],
      color: "#518DF5"
    }
  },
  setConfig: (value: any) => {}
})

export default function Home() {
  const [isEditing, setIsEditing] = useState(false);
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
      color: "#518DF5"
    }
  });
  return (
    <StartPageContext.Provider value={{ isEditing, setIsEditing, config, setConfig }}>
      <div>
        <Header />
        <SearchBox />
      </div>
    </StartPageContext.Provider>
  );
}
