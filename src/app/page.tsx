"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/utils/contexts/GlobalContext";
import MainContent from "@/components/modules/MainContent";
import GeneralErrorMessage from "@/components/modules/GeneralErrorMessage";

export default function Home() {
    const router = useRouter();
    const {
        authenticatedUser: { authenticated },
    } = useContext(GlobalContext);
    !authenticated && router.push("/login");
    return <main> {authenticated ? <MainContent /> : <GeneralErrorMessage message="Please Login to continue" />}</main>;
}
