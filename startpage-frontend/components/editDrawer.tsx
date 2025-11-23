"use client"
import { ArrowDownToLineIcon, ArrowUpToLineIcon, SettingsIcon, XIcon } from "lucide-react";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose } from "./ui/drawer";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { useContext } from "react";
import { StartPageContext } from "../app/page";
import { Input } from "./ui/input";

export function EditDrawer() {
    const { config, setConfig } = useContext(StartPageContext)
    return (
        <Drawer handleOnly direction="right">
            <DrawerTrigger>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <SettingsIcon size={18} className="mr-[15px]" />
                    </TooltipTrigger>
                    <TooltipContent>
                        StartPage Settings
                    </TooltipContent>
                </Tooltip>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader style={{ gap: 0 }}>
                    <DrawerTitle>StartPage Settings</DrawerTitle>
                    <DrawerDescription>Customize your StartPage</DrawerDescription>
                </DrawerHeader>
                <div style={{ flex: 1, backgroundColor: "var(--qu-background)", borderColor: "var(--qu-border-color)", borderTopWidth: 1, borderBottomWidth: 1, borderStyle: "solid" }}>
                    <div style={{ padding: 20, paddingBottom: 0 }}>
                        <div style={{ fontSize: 16 }}>Columns</div>
                        <div style={{ marginBottom: 10, fontSize: 12, color: "var(--qu-text-secondary)" }}>Number of columns for widgets</div>
                        <Input style={{ backgroundColor: "var(--header-background)", color: "var(--qu-text-color)" }} placeholder="Columns" type="number" value={config.columns} onChange={(e) => setConfig({ ...config, columns: parseInt(e.target.value) })} />
                    </div>
                    <div style={{ padding: 20, paddingBottom: 0 }}>
                        <div style={{ fontSize: 16 }}>Config</div>
                        <div style={{ marginBottom: 10, fontSize: 12, color: "var(--qu-text-secondary)" }}>Download or upload a custom config</div>
                        <div className="flex flex-row gap-[10px]">
                            <Button variant="outline" className="flex-1" onClick={() => {
                                const blob = new Blob([JSON.stringify(config)], { type: "application/json" });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement("a");
                                a.href = url;
                                a.download = "config.json";
                                a.click();
                                URL.revokeObjectURL(url);
                            }}><ArrowDownToLineIcon /> Download</Button>
                            <Button variant="outline" className="flex-1" onClick={() => {
                                const file = document.createElement("input");
                                file.type = "file";
                                file.accept = ".json";
                                file.onchange = (e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onload = (e) => {
                                            const config = JSON.parse(e.target?.result as string);
                                            setConfig(config);
                                        };
                                        reader.readAsText(file);
                                    }
                                };
                                file.click();
                            }}><ArrowUpToLineIcon /> Upload</Button>
                        </div>
                        <div style={{ marginTop: 10, fontSize: 12, color: "var(--qu-text-secondary)" }}>Warning: This will override your current config. if you upload an invalid config, run <code>localStorage.removeItem("config")</code> in your browser console</div>
                    </div>
                </div>
                <DrawerFooter style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                    <DrawerClose asChild>
                        <Button variant="outline"><XIcon />Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}