import { useContext } from "react";
import { StartPageContext } from "../app/page";
import { Button } from "./ui/button";
import { BuildingIcon, CheckIcon, PencilIcon, UserIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { EditDrawer } from "./editDrawer";

export function Header() {
    const { isEditing, setIsEditing, authHook, usingWork, setUsingWork, hasWork } = useContext(StartPageContext);
    return (
        <header>
            {!isEditing ? <img src={authHook?.data?.tenant?.logo || "logotext.svg"} alt="Logo" className="HeaderLogo" style={{ height: usingWork && authHook?.data?.tenant?.logo ? 40 : 25 }} /> : <div className="HeaderLogo">Editing Your StartPage</div>}
            {/* <Button style={{position: "absolute", left: "50%", transform: "translateX(-50%)"}} variant="ghost" size={"sm"}>
                <BuildingIcon size={20}/>
                Managed By {authHook?.data?.tenant?.displayName || authHook?.data?.tenant?.name}
            </Button> */}
            {hasWork && !isEditing && <Tabs style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }} value={usingWork ? "work" : "personal"} onValueChange={(value) => setUsingWork(value === "work")}>
                <TabsList>
                    <TabsTrigger value="personal"><UserIcon />Personal</TabsTrigger>
                    <TabsTrigger value="work"><BuildingIcon />Work</TabsTrigger>
                </TabsList>
            </Tabs>}
            <div style={{ flex: 1 }} />
            {isEditing && <EditDrawer />}
            {!usingWork && <Button variant={isEditing ? "default" : "ghost"} size={"sm"} onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? <CheckIcon /> : <PencilIcon />}
                {isEditing ? "Save" : "Edit"}
            </Button>}
            <div style={{ width: 10 }} />
        </header>
    )
}