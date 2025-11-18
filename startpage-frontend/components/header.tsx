import { useContext } from "react";
import { StartPageContext } from "../app/page";
import { Button } from "./ui/button";
import { CheckIcon, PencilIcon } from "lucide-react";

export function Header() {
    const { isEditing, setIsEditing } = useContext(StartPageContext);
    return (
        <header>
            <img src="logotext.svg" alt="Logo" className="HeaderLogo" />
            <div style={{flex: 1}}/>
            <Button variant={isEditing ? "default" : "ghost"} size={"sm"} onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? <CheckIcon /> : <PencilIcon />}
                {isEditing ? "Save" : "Edit"}
            </Button>
            <div style={{width: 10}}/>
        </header>
    )
}