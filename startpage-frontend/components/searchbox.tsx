"use client"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PaletteIcon, PencilIcon, PlusIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import { StartPageContext } from "../app/page";
import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { TrashIcon } from "lucide-react";
import { SketchPicker } from "react-color";

export function SearchBox() {
    const { isEditing, config, setConfig } = useContext(StartPageContext);
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement> | null) => {
        if (e?.key === "Enter") {
            setSearchQuery("");
            window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
        } else if (e === null) {
            setSearchQuery("");
            window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
        }
    };
    return (
        <AnimatePresence>
            <div className="SearchBoxArea" style={{backgroundColor: config.searchbox.color}}>
                {isEditing && <motion.div key="searchbox-customization" exit={{opacity: 0}} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                    <Popover key="searchbox-customization-popover">
                        <PopoverTrigger asChild>
                            <Button size={"sm"} variant="outline" style={{position: "absolute", top: 10, right: 10}}><PaletteIcon />Customize</Button>
                        </PopoverTrigger>
                        <PopoverContent side="bottom" align="end" sideOffset={10} style={{minWidth: "0px", width: "auto", padding: 0, boxShadow: "none"}}>
                            <SketchPicker onChange={(e) => {
                                setConfig({
                                    ...config,
                                    searchbox: {
                                        ...config.searchbox,
                                        color: e.hex
                                    }
                                });
                            }} color={config.searchbox.color} />
                        </PopoverContent>
                    </Popover>
                </motion.div>}

                <div className="SearchBoxRow">
                    <Input className="bg-white" placeholder="Search with Google" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyPress={handleSearch} />
                    <Button variant="outline" onClick={() => {handleSearch(null)}}><SearchIcon />Search</Button>
                </div>
                {(isEditing || config.searchbox.shortcuts.length > 0) && <div className="SearchBoxShortcutsRow">
                    {config.searchbox.shortcuts.map((shortcut, index) => (
                        <ShortcutItem key={index} shortcut={shortcut}/>
                    ))}
                    {isEditing && <AddShortcutItem/>}
                </div>}
            </div>
        </AnimatePresence>
    )
}

function ShortcutItem({shortcut}: {shortcut: any}) {
    const { isEditing, setIsEditing } = useContext(StartPageContext);
    return (
        <div className="SearchBoxShortcutItem" onClick={() => {
            window.open(shortcut.url, "_blank");
        }}>
            {isEditing && <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="SearchBoxShortcutEdit" variant="outline" size="icon-sm" onClick={e => {
                        e.stopPropagation();
                    }}><PencilIcon /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem><PencilIcon />Edit</DropdownMenuItem>
                    <DropdownMenuItem><TrashIcon />Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>}
            <img src={shortcut.icon} alt={shortcut.name} className="SearchBoxShortcutIcon"/>
            <div className="SearchBoxShortcutText">{shortcut.name}</div>
            {/* <div className="SearchBoxShortcutSubText">Quickly Access Websites</div> */}
        </div>
    )
}

function AddShortcutItem() {
    return (
        <motion.div key="add-shortcut" exit={{opacity: 0}} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="SearchBoxShortcutItem">
            <div className="SearchBoxShortcutIcon"><PlusIcon size={25} /></div>
            <div className="SearchBoxShortcutText">Add Shortcut</div>
            {/* <div className="SearchBoxShortcutSubText">Quickly Access Websites</div> */}
        </motion.div>
    )
}
    
