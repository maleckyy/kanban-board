import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import { NotFound } from "@/pages/not-found";
import { RouteProvider } from "@/providers/router-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "@/styles/globals.css";
import LoadingPage from "./pages/LoadingPage";
import HomePage from "./pages/HomePage";
import AppLayout from "./components/shared/layout/AppLayout";
import BoardPage from "./pages/BoardPage";
import TaskPage from "./pages/TaskPage";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <RouteProvider>
                    <Routes>
                        <Route path="/" element={<LoadingPage />} />
                        <Route path="/app" element={<AppLayout />} >
                            <Route index element={<HomePage />} />
                            <Route path="/app/board" element={<BoardPage />} />
                            <Route path="/app/task" element={<TaskPage />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </RouteProvider>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>,
);
