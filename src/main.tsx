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
import BoardContent from "./components/board/BoardContent";
import AddNewBoardPage from "./components/board/add-new-board/AddNewBoardPage";
import DataPage from "./pages/DataPage";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider>
            <BrowserRouter>
                <RouteProvider>
                    <Routes>
                        <Route path="/" element={<LoadingPage />} />
                        <Route path="/app" element={<AppLayout />}>
                            <Route index element={<HomePage />} />

                            <Route path="board" element={<BoardPage />}>
                                <Route index element={<AddNewBoardPage />} />
                                <Route path=":boardId" element={<BoardContent />} />
                            </Route>

                            <Route path="task" element={<TaskPage />} />
                            <Route path="data" element={<DataPage />} />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </RouteProvider>
            </BrowserRouter>
        </ThemeProvider>
    </StrictMode>,
);
