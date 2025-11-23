"use client"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PaletteIcon, PencilIcon, PlusIcon, SearchIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { StartPageContext } from "../app/page";
import { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { TrashIcon } from "lucide-react";
import { SketchPicker } from "react-color";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";

export function SearchBox() {
    const { isEditing, config, setConfig } = useContext(StartPageContext);
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement> | null) => {
        if (e?.key === "Enter") {
            setSearchQuery("");
            window.open(`https://www.google.com/search?q=${searchQuery}`, "_self");
        } else if (e === null) {
            setSearchQuery("");
            window.open(`https://www.google.com/search?q=${searchQuery}`, "_self");
        }
    };
    return (
        <AnimatePresence>
            <div className="SearchBoxArea" style={{ backgroundColor: config.searchbox.color }}>
                {isEditing && <motion.div key="searchbox-customization" exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>
                    <Popover key="searchbox-customization-popover">
                        <PopoverTrigger asChild>
                            <Button size={"sm"} variant="outline" style={{ position: "absolute", top: 10, right: 10 }}><PaletteIcon />Customize</Button>
                        </PopoverTrigger>
                        <PopoverContent side="bottom" align="end" sideOffset={10} style={{ minWidth: "0px", width: "auto", padding: 0, boxShadow: "none" }}>
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
                    <Button variant="outline" onClick={() => { handleSearch(null) }}><SearchIcon />Search</Button>
                </div>
                {(isEditing || config.searchbox.shortcuts.length > 0) && <div className="SearchBoxShortcutsRow">
                    {config.searchbox.shortcuts.map((shortcut, index) => (
                        <ShortcutItem key={index} shortcut={shortcut} />
                    ))}
                    {isEditing && <AddShortcutItem />}
                </div>}
            </div>
        </AnimatePresence>
    )
}

function ShortcutItem({ shortcut }: { shortcut: any }) {
    const { isEditing, setIsEditing, config, setConfig } = useContext(StartPageContext);
    return (
        <div className="SearchBoxShortcutItem" onClick={() => {
            window.open(shortcut.url, "_self");
        }}>
            {isEditing && <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="SearchBoxShortcutEdit" variant="outline" size="icon-sm" onClick={e => {
                        e.stopPropagation();
                    }}><PencilIcon /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent onClick={e => {
                    e.stopPropagation();
                }}>
                    {/* <DropdownMenuItem onClick={() => {

                    }}><PencilIcon />Edit</DropdownMenuItem> */}
                    <DropdownMenuItem onClick={() => {
                        setConfig({
                            ...config,
                            searchbox: {
                                ...config.searchbox,
                                shortcuts: config.searchbox.shortcuts.filter((item) => item.id !== shortcut.id)
                            }
                        });
                    }}><TrashIcon />Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>}
            <img src={shortcut.icon} alt={shortcut.name} className="SearchBoxShortcutIcon" />
            <div className="SearchBoxShortcutText">{shortcut.name}</div>
            {/* <div className="SearchBoxShortcutSubText">Quickly Access Websites</div> */}
        </div>
    )
}

function AddShortcutItem() {
    const { config, setConfig } = useContext(StartPageContext);
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false)
    useEffect(() => {
        if (name === "" && url && typeof url === "string" && url.length > 0) {
            let urlsplit = url.split(".")[1] || "";
            let firstLetter = urlsplit.charAt(0).toLocaleUpperCase();
            let restOfName = urlsplit.substring(1, urlsplit.length);
            setName(firstLetter + restOfName || "");
        }
    }, [url, name]);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <motion.div key="add-shortcut" exit={{ opacity: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="SearchBoxShortcutItem">
                    <div className="SearchBoxShortcutIcon"><PlusIcon size={25} /></div>
                    <div className="SearchBoxShortcutText">Add Shortcut</div>
                    {/* <div className="SearchBoxShortcutSubText">Quickly Access Websites</div> */}
                </motion.div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Shortcut</DialogTitle>
                    <DialogDescription>Add a new shortcut to your StartPage</DialogDescription>
                </DialogHeader>
                <Input placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)} />
                <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <DialogFooter>
                    <Button variant={"outline"} onClick={() => {
                        setConfig({
                            ...config,
                            searchbox: {
                                ...config.searchbox,
                                shortcuts: [
                                    ...config.searchbox.shortcuts,
                                    {
                                        id: new Date().toISOString() + "_ranid_" + Math.floor(Math.random() * 1000000),
                                        name: name,
                                        url: url,
                                        icon: "https://" + url.split("/")[2] + "/favicon.ico"
                                    }
                                ]
                            }
                        });
                        setOpen(false);
                    }}><PlusIcon />Add</Button>
                    <DialogClose asChild>
                        <Button variant="outline"><XIcon />Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

