"use client"
import { SettingsIcon, XIcon } from "lucide-react";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger, DrawerClose } from "./ui/drawer";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { useContext } from "react";
import { StartPageContext } from "../app/page";
import { Input } from "./ui/input";

export function EditDrawer() {
    const { config, setConfig } = useContext(StartPageContext)
    return (
        <Drawer direction="right">
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
                    <Input placeholder="Columns" type="number" value={config.columns} onChange={(e) => setConfig({ ...config, columns: parseInt(e.target.value) })} />
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