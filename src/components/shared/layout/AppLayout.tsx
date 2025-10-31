import React from "react";
import { Outlet } from "react-router";
import { AppSidebar } from "./AppSidebar";
import { GlobalModalProvider } from "@/components/application/modals/AppModal";

export default function AppLayout() {
    return (
        <GlobalModalProvider>
            <div className="min-h-screen h-screen flex lg:flex-row flex-col">
                <AppSidebar></AppSidebar>
                <main className="flex-1 p-6 flex flex-col gap-4">
                    <Outlet />
                </main>
            </div>
        </GlobalModalProvider>
    );
}
