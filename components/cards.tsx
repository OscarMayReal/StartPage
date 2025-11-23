import { useContext, useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Parser } from 'expr-eval';
import { StartPageContext } from "@/app/page";
import { ActivityIcon, BitcoinIcon, BookIcon, BookmarkIcon, BoxIcon, CalculatorIcon, CatIcon, CheckIcon, ClockIcon, FacebookIcon, LinkIcon, ListTodoIcon, MessageSquareIcon, PencilIcon, QuoteIcon, RotateCwIcon, SearchIcon, SendIcon, Sparkle, SparkleIcon, SparklesIcon, SunIcon, TextIcon, TrashIcon, XIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";

const parser = new Parser();

export function FacebookCard({
    profileName
}: {
    profileName: string
}) {
    const ref = useRef<HTMLDivElement>(null)
    const iframeRef = useRef<HTMLIFrameElement>(null)
    useEffect(() => {
        iframeRef.current?.contentWindow?.postMessage({
            type: "resize",
            width: ref.current?.offsetWidth,
            height: ref.current?.offsetHeight
        }, "*")
    }, [ref.current?.offsetWidth, ref.current?.offsetHeight]);
    return (
        <div ref={ref} style={{ width: "100%", height: "100%" }}>
            <iframe ref={iframeRef} src={"https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F" + profileName + "&tabs=timeline&width=" + ref.current?.offsetWidth + "&height=" + ref.current?.offsetHeight + "&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"} width={ref.current?.offsetWidth} height={ref.current?.offsetHeight} style={{ border: "none", overflow: "hidden" }} scrolling="no" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
        </div>
    )
}

type WeatherData = {
    temperature: string;
    wind: string;
    description: string;
    forecast: {
        day: string;
        temperature: string;
        wind: string;
    }[];
}

export function ClockCard() {
    const [time, setTime] = useState(new Date())
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date())
        }, 1000)
        return () => clearInterval(interval)
    }, [])
    return (
        <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <h2 className="text-5xl">{time.getHours().toString().padStart(2, "0") + ":" + time.getMinutes().toString().padStart(2, "0") + ":" + time.getSeconds().toString().padStart(2, "0")}</h2>
            <div>{time.toLocaleDateString()}</div>
        </div>
    )
}

export type HackclubSiegeLeaderboardPlayer = {
    id: number
    slack_id: string
    name: string
    display_name: string
    coins: number
    rank: string
}

export function HackclubSiegeLeaderboardCard() {
    const [leaderboard, setLeaderboard] = useState({ data: {} as HackclubSiegeLeaderboardPlayer[], loaded: false })
    useEffect(() => {
        if (leaderboard.loaded) return;
        fetch("https://api.thebugging.com/cors-proxy?" + encodeURIComponent("https://siege.hackclub.com/api/public-beta/leaderboard"))
            .then(response => response.json())
            .then(data => setLeaderboard({ data: data.leaderboard as HackclubSiegeLeaderboardPlayer[], loaded: true }))
    }, [leaderboard])
    return (
        <div style={{ maxHeight: "100%", width: "100%", height: "100%", overflowY: "scroll", padding: "10px" }}>
            {leaderboard.loaded ? (
                <div>
                    {leaderboard.data?.map((player: HackclubSiegeLeaderboardPlayer, index: number) => (
                        <div key={player.id} style={{ display: "flex", flexDirection: "row", gap: "10px", minWidth: "0" }}>
                            <h3 style={{ minWidth: "0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: "bold", color: index === 0 ? "#FFD700" : index === 1 ? "#C0C0C0" : index === 2 ? "#CD7F32" : "var(--qu-text-color)" }}>{player.name}</h3>
                            <div style={{ flex: 1 }} />
                            <h4 style={{ color: index === 0 ? "#FFD700" : index === 1 ? "#C0C0C0" : index === 2 ? "#CD7F32" : "var(--qu-text-color)" }}>{player.coins}</h4>
                        </div>
                    ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}

export function AskChatGPTCard() {
    const [query, setQuery] = useState("");
    return (
        <div>
            <h1 className="text-2xl mb-2">Ask ChatGPT</h1>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                <Input placeholder="Ask ChatGPT" onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        window.open("https://chatgpt.com?q=" + encodeURIComponent(query), "_blank");
                        setQuery("");
                    }
                }} value={query} onChange={(e) => setQuery(e.target.value)} />
                <Button onClick={() => {
                    window.open("https://chatgpt.com?q=" + encodeURIComponent(query), "_blank");
                    setQuery("");
                }} variant={"outline"}><SendIcon />Ask</Button>
            </div>
        </div>
    )
}

export function WeatherCard({ location }: { location: string }) {
    const [weather, setWeather] = useState({ data: {} as WeatherData, loaded: false })
    useEffect(() => {
        if (weather.loaded) return;
        fetch("https://goweather.xyz/weather/" + location)
            .then(response => response.json())
            .then(data => setWeather({ data: data as WeatherData, loaded: true }))
    }, [weather])
    return (
        <div>
            {weather.loaded ? (
                <div className="flex flex-col w-full h-full gap-2">
                    <h1>{location}</h1>
                    <h2>{weather.data?.temperature}</h2>
                    <h2>{weather.data?.wind}</h2>
                    <h2>{weather.data?.description}</h2>
                    <div style={{ flex: 1 }} />
                    <div>Powered by <a className="underline" href="https://github.com/robertoduessmann/weather-api">Weather-API</a></div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}

export function RandomcatImageCard() {
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src="https://cataas.com/cat" alt="Random cat" />
        </div>
    )
}

export type DictionaryDefinition = {
    word: string
    phonetic: string
    meanings: {
        partOfSpeech: string
        definitions: {
            definition: string
            example: string
        }[]
    }[]
}

export function DictionaryCard() {
    const [query, setQuery] = useState("");
    const [definition, setDefinition] = useState({ data: {} as DictionaryDefinition[], loaded: false })
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div style={{ borderBottom: "1px solid var(--qu-border-color)", display: "flex", flexDirection: "column", gap: "10px", alignItems: "start", padding: "10px", width: "100%" }}>
                <div className="text-2xl">Dictionary</div>
                <div className="flex flex-row gap-2 w-full">
                    <Input type="text" value={query} placeholder="Search" onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            if (query === "") return;
                            fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + query)
                                .then(response => response.json())
                                .then(data => setDefinition({ data: data as DictionaryDefinition[], loaded: true }))
                        }
                    }} onChange={(e) => setQuery(e.target.value)} />
                    <Button variant={"outline"} onClick={() => {
                        if (query === "") return;
                        fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + query)
                            .then(response => response.json())
                            .then(data => setDefinition({ data: data as DictionaryDefinition[], loaded: true }))
                    }}><SearchIcon /></Button>
                </div>
            </div>
            {definition.loaded ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "start", overflowY: "auto", height: "calc(100% - 99px)", maxHeight: "calc(100% - 99px)", padding: "10px" }}>
                    {definition.data[0]?.meanings?.map((meaning: any, index: number) => (
                        <div key={index} style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "start" }}>
                            <div className="flex flex-row gap-2 items-center">
                                {meaning.partOfSpeech === "noun" ? <BoxIcon size={20} /> : meaning.partOfSpeech === "verb" ? <ActivityIcon size={20} /> : meaning.partOfSpeech === "adjective" ? <SparkleIcon size={20} /> : meaning.partOfSpeech === "adverb" ? <SparkleIcon size={20} /> : null}
                                <h3 style={{ fontWeight: "bold" }}>{meaning.partOfSpeech}</h3>
                            </div>
                            {meaning.definitions.map((definition: any, index: number) => (
                                <div key={index}>
                                    <h4 style={{ textAlign: "left" }}>{definition.definition}</h4>
                                    <p style={{ textAlign: "left" }}>{definition.example}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    )
}

// export function CalculatorCard() {
//     const screenref = useRef<HTMLInputElement>(null)
//     const [screenDisplay, setScreenDisplay] = useState("1234")
//     useEffect(() => {
//         screenref.current?.scrollTo({ left: screenref.current?.scrollWidth || 0 });
//         screenref.current?.focus();
//     }, [screenDisplay]);
//     return <div className="w-[204px] p-4 flex flex-col gap-2 bg-[#d6d6d6] rounded-xl">
//         <input ref={screenref} value={screenDisplay} onChange={(e) => setScreenDisplay(e.target.value)} className="text-4xl w-full bg-[#dbffe0] color-[#3c4d3e] text-shadow-sm inset-shadow-md p-1 rounded-sm" style={{fontFamily: "Calculator"}}/>
//         <div className="flex flex-col gap-1">
//             <div className="flex gap-1 w-fit">
//                 <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "1")}>1</Button>
//                 <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "2")}>2</Button>
//                 <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "3")}>3</Button>
//                 <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "/")}>/</Button>
//             </div>
//             <div className="flex gap-1 w-fit">
//                 <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "4")}>4</Button>
//                 <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "5")}>5</Button>
//                 <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "6")}>6</Button>
//                 <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "-")}>-</Button>
//             </div>
//             <div className="flex gap-1 w-fit">
//                 <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "7")}>7</Button>
//                 <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "8")}>8</Button>
//                 <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "9")}>9</Button>
//                 <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "+")}>+</Button>
//             </div>
//             <div className="flex gap-1 w-fit">
//                 <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "0")}>0</Button>
//                 <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + ".")}>.</Button>
//                 <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "=")}>=</Button>
//                 <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "*")}>*</Button>
//             </div>
//         </div>
//     </div>
// }

export function CalculatorCard() {
    const screenref = useRef<HTMLInputElement>(null)
    const [screenDisplay, setScreenDisplay] = useState("")
    useEffect(() => {
        screenref.current?.scrollTo({ left: screenref.current?.scrollWidth || 0 });
        screenref.current?.focus();
    }, [screenDisplay]);
    return <div className="w-[204px] p-4 flex flex-col gap-2 bg-[var(--background)] rounded-xl" style={{ borderColor: "var(--qu-border-color)", border: "1px solid var(--qu-border-color)" }}>
        <input ref={screenref} value={screenDisplay} inputMode="numeric" onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "=") {
                e.preventDefault();
                let result = parser.evaluate(screenDisplay);
                setScreenDisplay(result.toString());
            }
        }} onChange={(e) => setScreenDisplay(e.target.value)} className="text-4xl w-full p-1 rounded-sm" style={{ backgroundColor: "var(--qu-background)", color: "var(--qu-text)", borderColor: "var(--qu-border-color)", border: "1px solid var(--qu-border-color)" }} />
        <div className="flex flex-col gap-1">
            <div className="flex gap-1 w-fit">
                <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "1")}>1</Button>
                <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "2")}>2</Button>
                <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "3")}>3</Button>
                <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "/")}>/</Button>
            </div>
            <div className="flex gap-1 w-fit">
                <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "4")}>4</Button>
                <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "5")}>5</Button>
                <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "6")}>6</Button>
                <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "-")}>-</Button>
            </div>
            <div className="flex gap-1 w-fit">
                <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "7")}>7</Button>
                <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "8")}>8</Button>
                <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "9")}>9</Button>
                <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "+")}>+</Button>
            </div>
            <div className="flex gap-1 w-fit">
                <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "0")}>0</Button>
                <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + ".")}>.</Button>
                <Button className="w-10 h-10" onClick={() => {
                    let result = parser.evaluate(screenDisplay);
                    setScreenDisplay(result.toString());
                }}>=</Button>
                <Button className="w-10 h-10" onClick={() => setScreenDisplay(screenDisplay + "*")}>*</Button>
            </div>
        </div>
    </div>
}

export function IframeCard({ url }: { url: string }) {
    return (
        <iframe src={url} style={{ width: "100%", height: "100%" }}></iframe>
    )
}

export function CardBase({ id, name, content, globalConfig, setGlobalConfig, widgetConfig, setWidgetConfig, type }: { id: string, name: string, content: React.ReactNode, globalConfig: any, setGlobalConfig: any, widgetConfig: any, setWidgetConfig: any, type: WidgetType }) {
    const { isEditing } = useContext(StartPageContext);
    const [isEditingCard, setIsEditingCard] = useState(false);
    return (
        <div className="card-base">
            <div className="card-title" style={{ cursor: isEditing ? "move" : "default", pointerEvents: isEditing ? "auto" : "none" }}>
                {isEditing && <div style={{ width: 10, flexShrink: 0 }} />}
                <div className="card-title-text" style={{ flexShrink: 0 }}>{name}</div>
                {isEditing && <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ type: "tween", duration: 0.1 }}></motion.div>}
                {isEditing && CardInfo[type].canEdit && <>
                    <PencilIcon style={{ flexShrink: 0, cursor: "pointer" }} className="card-title-edit card-title-nodrag" size={16} onClick={(e) => {
                        e.stopPropagation();
                        console.log("editing");
                        setIsEditingCard(true);
                    }} />
                    <div style={{ width: 5, flexShrink: 0 }} />
                </>}
                {isEditing && <XIcon style={{ flexShrink: 0, cursor: "pointer" }} className="card-title-close card-title-nodrag" size={16} onClick={(e) => {
                    e.stopPropagation();
                    console.log("editing");
                    let widgets = globalConfig.widgets.filter((widget: any) => widget.id !== id);
                    setGlobalConfig({ ...globalConfig, widgets });
                }} />}
                {isEditing && <div style={{ width: 5, flexShrink: 0 }} />}
            </div>
            <div className="card-content">
                {content}
            </div>
            {CardInfo[type].canEdit && <EditCard open={isEditingCard} setOpen={setIsEditingCard} widgetConfig={widgetConfig} setWidgetConfig={setWidgetConfig} type={type} />}
        </div>

    )
}

export function BitCoinCard({ currency }: { currency: string }) {
    const [price, setPrice] = useState(0);
    useEffect(() => {
        fetch(`https://mempool.space/api/v1/prices`)
            .then(response => response.json())
            .then(data => setPrice(data[currency]));
    }, [currency]);
    return (
        <div>
            <div>Bitcoin Price in {currency}</div>
            <div>1 BTC = {price}</div>
            <Button onClick={() => { }}><RotateCwIcon />Update</Button>
        </div>
    )
}

export function BookmarksCard({ config, setConfig }: { config: any, setConfig: (config: any) => void }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-between", padding: 10, borderBottom: "1px solid #e4e4e7" }}>
                <div className="text-2xl">{config.name}</div>
                <Button variant="outline" size={"sm"} onClick={() => {
                    let bookmarks = JSON.parse(config.bookmarks || "[]");
                    let name = prompt("Enter bookmark name");
                    let url = prompt("Enter bookmark url");
                    if (!name || !url) return;
                    bookmarks.push({ id: Date.now(), name, url });
                    setConfig({ ...config, bookmarks: JSON.stringify(bookmarks) });
                }}><BookmarkIcon />Add</Button>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%", overflowY: "auto" }}>
                {JSON.parse(config.bookmarks || "[]").map((bookmark: any) => {
                    return (
                        <a href={bookmark.url} key={bookmark.id} style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10, width: "100%", padding: 10, borderBottom: "1px solid #e4e4e7" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                <div className="text-lg">{bookmark.name}</div>
                                <div className="text-sm" style={{ color: "var(--qu-text-secondary)" }}>{bookmark.url}</div>
                            </div>
                            <div style={{ flex: 1 }} />
                            <Button variant="ghost" size={"icon-sm"} onClick={() => {
                                let bookmarks = JSON.parse(config.bookmarks || "[]");
                                bookmarks = bookmarks.filter((b: any) => b.id !== bookmark.id);
                                setConfig({ ...config, bookmarks: JSON.stringify(bookmarks) });
                            }}><TrashIcon /></Button>
                        </a>
                    )
                })}
                {JSON.parse(config.bookmarks || "[]").length === 0 && <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, justifyContent: "center", alignItems: "center", width: "100%" }}>
                    <BookmarkIcon size={24} />
                    <div>No bookmarks found</div>
                </div>}
            </div>
        </div>
    )
}

export function ToDoCard({ config, setConfig }: { config: any, setConfig: (config: any) => void }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%", justifyContent: "space-between", padding: 10, borderBottom: "1px solid #e4e4e7" }}>
                <div className="text-2xl">{config.name}</div>
                <Button variant="outline" size={"sm"} onClick={() => {
                    let todos = JSON.parse(config.todos || "[]");
                    let name = prompt("Enter todo name");
                    if (!name) return;
                    todos.push({ id: Date.now(), name, completed: false });
                    setConfig({ ...config, todos: JSON.stringify(todos) });
                }}><BookmarkIcon />Add</Button>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", width: "100%", overflowY: "auto" }}>
                {JSON.parse(config.todos || "[]").map((todo: any) => {
                    return (
                        <div key={todo.id} style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10, width: "100%", padding: 10, borderBottom: "1px solid #e4e4e7" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                <div className="text-lg" style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.name}</div>
                            </div>
                            <div style={{ flex: 1 }} />
                            <Button variant="ghost" size={"icon-sm"} onClick={() => {
                                let todos = JSON.parse(config.todos || "[]");
                                todos = todos.map((t: any) => t.id === todo.id ? { ...t, completed: !t.completed } : t);
                                setConfig({ ...config, todos: JSON.stringify(todos) });
                            }}><CheckIcon /></Button>
                            <Button variant="ghost" size={"icon-sm"} onClick={() => {
                                let todos = JSON.parse(config.todos || "[]");
                                todos = todos.filter((t: any) => t.id !== todo.id);
                                setConfig({ ...config, todos: JSON.stringify(todos) });
                            }}><TrashIcon /></Button>
                        </div>
                    )
                })}
                {JSON.parse(config.todos || "[]").length === 0 && <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10, justifyContent: "center", alignItems: "center", width: "100%" }}>
                    <ListTodoIcon size={24} />
                    <div>No todos found</div>
                </div>}
            </div>
        </div>
    )
}

type Quote = {
    content: string;
    author: string;
    authorSlug: string;
    length: number;
}



export function QuoteCard() {
    const [quote, setQuote] = useState<Quote[]>([]);
    useEffect(() => {
        fetch("https://api.realinspire.live/v1/quotes/random")
            .then(response => response.json())
            .then(data => setQuote(data as Quote[]));
    }, []);
    return (
        quote.length > 0 ? <div style={{ display: "flex", flexDirection: "column", alignItems: "start", justifyContent: "center", height: "100%", width: "100%", padding: 20, gap: 10 }}>
            <QuoteIcon size={24} />
            <div style={{ fontSize: 20, textAlign: "start" }}>{quote[0].content}</div>
            <div style={{ fontSize: 14, color: "var(--qu-text-secondary)", textAlign: "start" }}> - {quote[0].author}</div>
        </div> : <div>Loading quote...</div>
    )
}

export function EditCard({ open, setOpen, widgetConfig, setWidgetConfig, type }: { open: boolean, setOpen: (open: boolean) => void, widgetConfig: any, setWidgetConfig: (config: any) => void, type: WidgetType }) {
    const [localconfig, setLocalConfig] = useState(widgetConfig);
    useEffect(() => {
        if (!open) {
            setWidgetConfig(localconfig);
        } else {
            setLocalConfig(widgetConfig);
        }
    }, [open]);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit {CardInfo[type].name}</DialogTitle>
                    <DialogDescription>Edit the configuration of {CardInfo[type].name}</DialogDescription>
                </DialogHeader>
                {Object.entries(CardInfo[type].configOptions).map(([key, option]) => {
                    if (option.hide) return null;
                    return (
                        <div key={key}>
                            <div style={{ marginBottom: 5 }}>{option.name}</div>
                            <Input type={option.type} value={localconfig[key]} onChange={(e) => setLocalConfig({ ...localconfig, [key]: e.target.value })} />
                        </div>
                    )
                })}
                <DialogFooter style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
                    <DialogClose asChild>
                        <Button variant="outline"><XIcon />Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export function TextCard({ text }: { text: string }) {
    return (
        <div>
            <div>{text}</div>
        </div>
    )
}

export type WidgetType = "facebook" | "weather" | "chatgpt" | "siegeleaderboard" | "quote" | "calculator" | "clock" | "catphoto" | "dictionary" | "iframe" | "text" | "bitcoin" | "bookmarks" | "todo";

export type WidgetInfo = {
    name: string;
    description: string;
    icon: any;
    createComponent: (config: any, setConfig: any) => React.ReactNode;
    type: WidgetType;
    configOptions: Record<string, WidgetConfigSchema>;
    canEdit: boolean;
}

export type WidgetConfigSchema = {
    name: string;
    type: "text" | "number" | "boolean";
    defaultValue: any;
    field: string;
    hide?: boolean;
}

export const CardInfo: Record<WidgetType, WidgetInfo> = {
    siegeleaderboard: {
        name: "Hack Club Siege Leaderboard",
        description: "View the leaderboard for Hack Club Siege",
        icon: SparkleIcon,
        createComponent: (config: any, setConfig: any) => <HackclubSiegeLeaderboardCard />,
        type: "siegeleaderboard",
        configOptions: {

        },
        canEdit: false
    },
    todo: {
        name: "Todo",
        description: "A simple todo list",
        icon: ListTodoIcon,
        createComponent: (config: any, setConfig: any) => <ToDoCard config={config} setConfig={setConfig} />,
        type: "todo",
        configOptions: {
            todos: {
                name: "Todos",
                type: "text",
                defaultValue: "[]",
                field: "todos"
            },
            name: {
                name: "Name",
                type: "text",
                defaultValue: "Todo",
                field: "name"
            }
        },
        canEdit: true
    },
    calculator: {
        name: "Calculator",
        description: "A simple calculator",
        icon: CalculatorIcon,
        createComponent: (config: any, setConfig: any) => <CalculatorCard />,
        type: "calculator",
        configOptions: {

        },
        canEdit: false
    },
    bitcoin: {
        name: "Bitcoin",
        description: "View the price of Bitcoin",
        icon: BitcoinIcon,
        createComponent: (config: any, setConfig: any) => <BitCoinCard currency={config.currency} />,
        type: "bitcoin",
        configOptions: {
            currency: {
                name: "Currency",
                type: "text",
                defaultValue: "GBP",
                field: "currency"
            }
        },
        canEdit: true
    },
    weather: {
        name: "Weather",
        description: "View the weather",
        icon: SunIcon,
        createComponent: (config: any, setConfig: any) => <WeatherCard location={config.location} />,
        type: "weather",
        configOptions: {
            location: {
                name: "Location",
                type: "text",
                defaultValue: "London",
                field: "location"
            }
        },
        canEdit: true
    },
    clock: {
        name: "Clock",
        description: "View the time",
        icon: ClockIcon,
        createComponent: (config: any, setConfig: any) => <ClockCard />,
        type: "clock",
        configOptions: {

        },
        canEdit: false
    },
    facebook: {
        name: "Facebook",
        description: "View a Facebook feed",
        icon: FacebookIcon,
        createComponent: (config: any, setConfig: any) => <FacebookCard profileName={config.page} />,
        type: "facebook",
        configOptions: {
            page: {
                name: "Page",
                type: "text",
                defaultValue: "facebook",
                field: "page"
            }
        },
        canEdit: true
    },
    chatgpt: {
        name: "ChatGPT",
        description: "Quickly get an answer to your question",
        icon: SparklesIcon,
        createComponent: (config: any, setConfig: any) => <AskChatGPTCard />,
        type: "chatgpt",
        configOptions: {

        },
        canEdit: false
    },
    catphoto: {
        name: "Random Cat Photo",
        description: "View a random cat photo",
        icon: CatIcon,
        createComponent: (config: any, setConfig: any) => <RandomcatImageCard />,
        type: "catphoto",
        configOptions: {

        },
        canEdit: false
    },
    dictionary: {
        name: "Dictionary",
        description: "View the definition of a word",
        icon: BookIcon,
        createComponent: (config: any, setConfig: any) => <DictionaryCard />,
        type: "dictionary",
        configOptions: {

        },
        canEdit: false
    },
    iframe: {
        name: "Iframe",
        description: "View an iframe",
        icon: LinkIcon,
        createComponent: (config: any, setConfig: any) => <IframeCard url={config.url} />,
        type: "iframe",
        configOptions: {
            url: {
                name: "URL",
                type: "text",
                defaultValue: "https://www.google.com",
                field: "url"
            }
        },
        canEdit: true
    },
    text: {
        name: "Text",
        description: "View some text",
        icon: TextIcon,
        createComponent: (config: any, setConfig: any) => <TextCard text={config.text} />,
        type: "text",
        configOptions: {
            text: {
                name: "Text",
                type: "text",
                defaultValue: "Hello World",
                field: "text"
            }
        },
        canEdit: true
    },
    quote: {
        name: "Quote",
        description: "View a random quote",
        icon: QuoteIcon,
        createComponent: (config: any, setConfig: any) => <QuoteCard />,
        configOptions: {

        },
        type: "quote",
        canEdit: false
    },
    bookmarks: {
        name: "Bookmarks",
        description: "View your bookmarks",
        icon: BookmarkIcon,
        createComponent: (config: any, setConfig: any) => <BookmarksCard config={config} setConfig={setConfig} />,
        type: "bookmarks",
        configOptions: {
            bookmarks: {
                name: "Bookmarks",
                type: "text",
                defaultValue: "[]",
                field: "bookmarks",
                hide: true
            },
            name: {
                name: "Name",
                type: "text",
                defaultValue: "Bookmarks",
                field: "name"
            }
        },
        canEdit: true
    }
}