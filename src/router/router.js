// Router Component.

import { Route, Routes, useLocation } from "react-router-dom";
import { TableView, Workflow, NotFound } from "../pages";

export const RoutersComponent = () => {
    /**
     * Hooks.
     */

    const locations = useLocation();

    const useId = locations?.state?.itemInfo?.id;

    return (

        <Routes>
            <Route >
                <Route index element={<TableView />} />
                <Route path="workflow" element={<TableView />} />
                <Route path="workflows/current-workflow" element={<Workflow />} />
                <Route path={`workflows/current-workflow/${useId}`} element={<Workflow />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
} 