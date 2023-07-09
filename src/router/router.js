// Router Component.

import { Route, Routes, useParams } from "react-router-dom";
import { TableView, Workflow, NotFound } from "../pages";

export const RoutersComponent = () => {
    /**
     * Hooks.
     */

    const { useId } = useParams()

    return (

        <Routes>
            <Route >
                <Route index element={<TableView />} />
                <Route path="workflow" element={<TableView />} />
                <Route path="workflows/current-workflow" element={<Workflow />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
} 