// Router Component.

import { Route, Routes } from "react-router-dom";
import { TableView, Workflow , NotFound  } from "../pages";


export const RoutersComponent = () => {

    /**
     * Hooks.
     */

    return (

        <Routes>
            <Route element={<TableView />}>
                <Route index element={<TableView />} />
                <Route path="workflow" element={<TableView />} />
                <Route path="workflows/current-workflow/" element={<Workflow />} />
                <Route path="*" element={<p>There's nothing here: 404!</p>} />
            </Route>
        </Routes>
    )
} 