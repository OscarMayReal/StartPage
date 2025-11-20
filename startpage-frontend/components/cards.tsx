import { useEffect, useRef, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Parser } from 'expr-eval';

const parser = new Parser();

export function FacebookCard({
    profileName
}: {
    profileName: string
}) {
    return (
        <div>
            <iframe src={"https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F" + profileName + "&tabs=timeline&width=340&height=331&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"} width="340" height="331" style={{border: "none", overflow: "hidden"}} scrolling="no" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
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
    return <div className="w-[204px] p-4 flex flex-col gap-2 bg-[var(--background)] rounded-xl" style={{borderColor: "var(--qu-border-color)", border: "1px solid var(--qu-border-color)"}}>
        <input ref={screenref} value={screenDisplay} inputMode="numeric" onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === "=") {
                e.preventDefault();
                let result = parser.evaluate(screenDisplay);
                setScreenDisplay(result.toString());
            }
        }} onChange={(e) => setScreenDisplay(e.target.value)} className="text-4xl w-full p-1 rounded-sm" style={{backgroundColor: "var(--qu-background)", color: "var(--qu-text)", borderColor: "var(--qu-border-color)", border: "1px solid var(--qu-border-color)"}}/>
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