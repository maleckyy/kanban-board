import React from "react";
import { Outlet } from "react-router";
import { AppSidebar } from "./AppSidebar";
import { GlobalModalProvider } from "@/components/application/modals/AppModal";

export default function AppLayout() {
    return (
        <GlobalModalProvider>
            <div className="w-full h-[calc(100vh-0rem)] min-h-0 overflow-hidden flex lg:flex-row flex-col">
                <AppSidebar></AppSidebar>
                <main className="flex-1 min-w-0 p-4 flex flex-col gap-4 min-h-0 overflow-auto ">
                    <Outlet />
                </main>
            </div>
        </GlobalModalProvider>
    );
}
