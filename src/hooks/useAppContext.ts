import { appContext } from "@/contexts/appContext";
import { useContext } from "react";

export const useAppContext = () => useContext(appContext);
