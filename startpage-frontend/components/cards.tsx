import { useContext, useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Parser } from 'expr-eval';
import { StartPageContext } from "@/app/page";

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
                    {leaderboard.data?.map((player: HackclubSiegeLeaderboardPlayer) => (
                        <div key={player.id} style={{ display: "flex", flexDirection: "row", gap: "10px", minWidth: "0" }}>
                            <h3 style={{ minWidth: "0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: "bold" }}>{player.name}</h3>
                            <div style={{ flex: 1 }} />
                            <h4>{player.coins}</h4>
                        </div>
                    ))}
                </div>
            ) : (
                <div>Loading...</div>
            )}
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

export function CardBase({ name, content }: { name: string, content: React.ReactNode }) {
    const { isEditing } = useContext(StartPageContext);
    return (
        <div className="card-base">
            <div className="card-title" style={{ cursor: isEditing ? "move" : "default", pointerEvents: isEditing ? "auto" : "none" }} data-swapy-handle>{name}</div>
            <div className="card-content">
                {content}
            </div>
        </div>
    )
}